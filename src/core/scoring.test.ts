import { describe, expect, it } from "vitest";
import { calculateAttemptScore, calculateChallengeScore } from "./scoring.ts";

describe("calculateAttemptScore", () => {
  it("rewards correct answers and subtracts attempt/time penalties without going below zero", () => {
    expect(
      calculateAttemptScore({
        isCorrect: true,
        attempts: 1,
        elapsedSeconds: 12,
      }),
    ).toBe(976);
    expect(
      calculateAttemptScore({
        isCorrect: true,
        attempts: 4,
        elapsedSeconds: 120,
      }),
    ).toBe(610);
    expect(
      calculateAttemptScore({
        isCorrect: true,
        attempts: 20,
        elapsedSeconds: 999,
      }),
    ).toBe(0);
  });

  it("returns zero for incorrect answers", () => {
    expect(
      calculateAttemptScore({
        isCorrect: false,
        attempts: 1,
        elapsedSeconds: 5,
      }),
    ).toBe(0);
  });
});

describe("calculateChallengeScore", () => {
  it("rewards speed and streak while penalizing wrong submissions", () => {
    expect(
      calculateChallengeScore({
        isCorrect: true,
        levelNumber: 5,
        elapsedSeconds: 18,
        wrongSubmissions: 0,
        streak: 3,
      }),
    ).toEqual({ points: 1918, nextStreak: 4 });
  });

  it("breaks the streak and returns no points for incorrect submissions", () => {
    expect(
      calculateChallengeScore({
        isCorrect: false,
        levelNumber: 3,
        elapsedSeconds: 22,
        wrongSubmissions: 1,
        streak: 2,
      }),
    ).toEqual({ points: 0, nextStreak: 0 });
  });
});
