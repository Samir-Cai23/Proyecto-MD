import { useEffect, useMemo, useRef, useState } from "react";
import { evaluateCircuit } from "../core/evaluateCircuit";
import {
  loadStoredProgress,
  mergeProgress,
  saveStoredProgress,
  type ProgressPatch,
} from "../core/progress";
import { calculateChallengeScore } from "../core/scoring";
import { getFirstLevel, levelsByDifficulty } from "../data/levels";
import { LevelScreen } from "../screens/LevelScreen";
import { ModeSelectScreen } from "../screens/ModeSelectScreen";
import { ResultsScreen } from "../screens/ResultsScreen";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import type {
  Difficulty,
  InputName,
  InputStates,
  LevelDefinition,
  Screen,
} from "./appTypes";

const firstLevel = 1;

function createInitialInputStates(level: LevelDefinition): InputStates {
  const states = Object.fromEntries(
    level.inputs.map((input) => [input, false]),
  ) as InputStates;

  if (level.initialInputStates) {
    return { ...states, ...level.initialInputStates };
  }

  if (level.difficulty !== "easy" || level.gates.length !== 1) {
    return states;
  }

  switch (level.gates[0]) {
    case "AND":
    case "NOT":
    case "NAND":
    case "NOR":
    case "XNOR":
      states.A = true;
      break;
    case "OR":
    case "XOR":
      break;
  }

  if (level.gates[0] === "NAND") {
    states.B = true;
  }

  return states;
}

export function App() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [currentLevel, setCurrentLevel] = useState(firstLevel);
  const activeLevel = levelsByDifficulty[difficulty][currentLevel];
  const [inputStates, setInputStates] = useState<InputStates>(() =>
    createInitialInputStates(activeLevel),
  );
  const [challengeScore, setChallengeScore] = useState(0);
  const [challengeStreak, setChallengeStreak] = useState(0);
  const [challengeWrongSubmissions, setChallengeWrongSubmissions] = useState(0);
  const [challengeLastPoints, setChallengeLastPoints] = useState<number | null>(
    null,
  );
  const [challengeLastWasCorrect, setChallengeLastWasCorrect] = useState<
    boolean | null
  >(null);
  const [levelStartedAt, setLevelStartedAt] = useState(() => Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [storedProgress, setStoredProgress] = useState(loadStoredProgress);
  const [challengeRunIsBest, setChallengeRunIsBest] = useState(false);
  const hasFocusedInitialScreen = useRef(false);
  const totalLevels = Object.keys(levelsByDifficulty[difficulty]).length;
  const practiceTotalLevels = Object.keys(levelsByDifficulty.easy).length;
  const challengeTotalLevels = Object.keys(levelsByDifficulty.hard).length;

  const result = useMemo(
    () => evaluateCircuit(activeLevel.circuit, inputStates),
    [activeLevel, inputStates],
  );

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    if (!hasFocusedInitialScreen.current) {
      hasFocusedInitialScreen.current = true;
      return undefined;
    }

    const focusHandle = window.requestAnimationFrame(() => {
      document.querySelector<HTMLElement>("h1")?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(focusHandle);
  }, [currentLevel, screen]);

  useEffect(() => {
    if (screen !== "game" || difficulty !== "hard") {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - levelStartedAt) / 1000));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [difficulty, levelStartedAt, screen]);

  function persistProgress(patch: ProgressPatch) {
    setStoredProgress((previous) => {
      const nextProgress = mergeProgress(previous, patch);
      saveStoredProgress(nextProgress);
      return nextProgress;
    });
  }

  function resetChallengeRun() {
    setChallengeScore(0);
    setChallengeStreak(0);
    setChallengeWrongSubmissions(0);
    setChallengeLastPoints(null);
    setChallengeLastWasCorrect(null);
    setChallengeRunIsBest(false);
  }

  function resetLevelClock() {
    setLevelStartedAt(Date.now());
    setElapsedSeconds(0);
  }

  function startLevel(selectedDifficulty: Difficulty) {
    const selectedLevel = getFirstLevel(selectedDifficulty);
    setDifficulty(selectedDifficulty);
    setCurrentLevel(firstLevel);
    setInputStates(createInitialInputStates(selectedLevel));
    resetLevelClock();

    if (selectedDifficulty === "hard") {
      resetChallengeRun();
    }

    setScreen("game");
  }

  function retryLevel() {
    setInputStates(createInitialInputStates(activeLevel));
    setChallengeWrongSubmissions(0);
    setChallengeLastPoints(null);
    setChallengeLastWasCorrect(null);
    resetLevelClock();
  }

  function goHome() {
    const firstEasyLevel = getFirstLevel("easy");
    setDifficulty("easy");
    setCurrentLevel(firstLevel);
    setInputStates(createInitialInputStates(firstEasyLevel));
    setScreen("intro");
  }

  function startNextLevel() {
    const nextLevel = currentLevel + 1;

    if (difficulty === "easy") {
      persistProgress({ practiceCompletedLevels: currentLevel });
    }

    if (levelsByDifficulty[difficulty][nextLevel]) {
      setCurrentLevel(nextLevel);
      setInputStates(
        createInitialInputStates(levelsByDifficulty[difficulty][nextLevel]),
      );
      setChallengeWrongSubmissions(0);
      resetLevelClock();
      return;
    }

    if (difficulty === "easy") {
      persistProgress({ practiceCompletedLevels: totalLevels });
    }

    setScreen("results");
  }

  function submitChallengeAnswer() {
    const scoreResult = calculateChallengeScore({
      isCorrect: result,
      levelNumber: activeLevel.levelNumber,
      elapsedSeconds,
      wrongSubmissions: challengeWrongSubmissions,
      streak: challengeStreak,
    });

    setChallengeLastWasCorrect(result);
    setChallengeLastPoints(scoreResult.points);

    if (!result) {
      setChallengeWrongSubmissions((previous) => previous + 1);
      setChallengeStreak(0);
      return;
    }

    const nextLevel = currentLevel + 1;
    const finalScore = challengeScore + scoreResult.points;
    const finalStreak = scoreResult.nextStreak;
    const isCompletingChallenge = !levelsByDifficulty.hard[nextLevel];

    setChallengeScore(finalScore);
    setChallengeStreak(finalStreak);
    persistProgress({
      bestChallengeScore: isCompletingChallenge ? finalScore : 0,
      bestChallengeStreak: finalStreak,
      challengeCompletedLevels: currentLevel,
    });
    setChallengeRunIsBest(
      isCompletingChallenge && finalScore > storedProgress.bestChallengeScore,
    );
    startNextLevel();
  }

  function toggleInput(input: InputName) {
    setInputStates((previous) => ({
      ...previous,
      [input]: !previous[input],
    }));
  }

  if (screen === "intro") {
    return (
      <WelcomeScreen
        onDemo={() => startLevel("easy")}
        onStart={() => setScreen("modeSelection")}
      />
    );
  }

  if (screen === "modeSelection") {
    return (
      <ModeSelectScreen
        challengeTotalLevels={challengeTotalLevels}
        progress={storedProgress}
        practiceTotalLevels={practiceTotalLevels}
        onChallenge={() => startLevel("hard")}
        onPractice={() => startLevel("easy")}
      />
    );
  }

  if (screen === "levelSelection") {
    return (
      <main className="app-shell" data-screen="level-selection">
        <a className="skip-link" href="#level-select-title">
          Saltar al contenido principal
        </a>
        <section
          className="level-selection lab-panel"
          aria-labelledby="level-select-title"
        >
          <span className="screen-kicker">Selecciona misión</span>
          <h1 id="level-select-title" tabIndex={-1}>
            Selecciona el nivel de dificultad para empezar:
          </h1>
          <div className="command-row">
            <button
              className="level-button"
              type="button"
              onClick={() => startLevel("easy")}
            >
              Nivel Bajo (Fácil)
            </button>
            <button
              className="level-button"
              type="button"
              onClick={() => startLevel("hard")}
            >
              Nivel Alto (Difícil)
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (screen === "results") {
    return (
      <ResultsScreen
        challengeSummary={{
          score: challengeScore,
          streak: challengeStreak,
        }}
        completedDifficulty={difficulty}
        completedLevels={Object.values(levelsByDifficulty[difficulty])}
        isNewBestChallengeScore={challengeRunIsBest}
        progress={storedProgress}
        onChallenge={() => startLevel("hard")}
        onHome={goHome}
        onPracticeAgain={() => startLevel("easy")}
      />
    );
  }

  return (
    <LevelScreen
      currentLevel={currentLevel}
      difficulty={difficulty}
      inputStates={inputStates}
      level={activeLevel}
      result={result}
      totalLevels={totalLevels}
      challengeState={{
        elapsedSeconds,
        lastPoints: challengeLastPoints,
        lastWasCorrect: challengeLastWasCorrect,
        score: challengeScore,
        streak: challengeStreak,
        wrongSubmissions: challengeWrongSubmissions,
      }}
      onBackToMode={() => setScreen("modeSelection")}
      onNextLevel={startNextLevel}
      onRetry={retryLevel}
      onSubmitAnswer={submitChallengeAnswer}
      onToggleInput={toggleInput}
    />
  );
}
