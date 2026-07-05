import type { StoredProgress } from "../core/progress";

type ModeSelectScreenProps = {
  challengeTotalLevels: number;
  onChallenge: () => void;
  onPractice: () => void;
  practiceTotalLevels: number;
  progress: StoredProgress;
};

const progressSteps = [
  {
    className: "is-done",
    label: "Elegir modo",
    text: "Define tu ruta",
  },
  {
    className: "is-active",
    label: "Práctica",
    text: "7 compuertas guiadas",
  },
  {
    className: "",
    label: "Reto",
    text: "7 circuitos con presión",
  },
];

function PracticePreview() {
  return (
    <svg viewBox="0 0 520 170" aria-hidden="true" focusable="false">
      <path className="mode-preview-wire" d="M60 55 H210 V85 H280" />
      <path className="mode-preview-wire is-warm" d="M60 115 H210 V95 H280" />
      <path
        className="mode-preview-gate"
        d="M280 52H330A38 38 0 0 1 330 128H280Z"
      />
      <path className="mode-preview-wire" d="M372 90 H455" />
      <rect
        className="mode-preview-led"
        x="454"
        y="64"
        width="48"
        height="48"
        rx="12"
      />
      <text className="mode-preview-label" x="306" y="98">
        AND
      </text>
    </svg>
  );
}

function ChallengePreview() {
  return (
    <svg viewBox="0 0 520 170" aria-hidden="true" focusable="false">
      <path className="mode-preview-wire" d="M62 86 H180 L224 52 H304" />
      <path
        className="mode-preview-wire is-warm"
        d="M62 118 H185 L224 118 H304"
      />
      <rect
        className="mode-preview-gate"
        x="304"
        y="58"
        width="86"
        height="72"
        rx="8"
      />
      <path className="mode-preview-wire" d="M390 94 H455" />
      <rect
        className="mode-preview-led"
        x="454"
        y="68"
        width="44"
        height="44"
        rx="11"
      />
      <text className="mode-preview-label" x="325" y="101">
        XOR
      </text>
    </svg>
  );
}

export function ModeSelectScreen({
  challengeTotalLevels,
  onChallenge,
  onPractice,
  practiceTotalLevels,
  progress,
}: ModeSelectScreenProps) {
  return (
    <main className="mode-shell" data-screen="mode-selection">
      <a className="skip-link" href="#mode-select-title">
        Saltar al contenido principal
      </a>
      <div className="mode-shell-inner">
        <header
          className="mode-topbar"
          aria-label="Navegación de selección de modo"
        >
          <div className="mode-brand">Lógica Digital</div>
          <nav className="mode-nav" aria-label="Mapa de la experiencia">
            <span aria-current="page">Modo</span>
            <span>Compuertas</span>
            <span>Reto</span>
          </nav>
          <div className="mode-hud" aria-hidden="true">
            <span />
            Ruta de compuertas lista
          </div>
        </header>

        <section className="mode-hero" aria-labelledby="mode-select-title">
          <div className="mode-copy">
            <p className="mode-kicker">Selecciona tu ruta</p>
            <h1
              id="mode-select-title"
              aria-label="Ahora elige cómo avanzar"
              tabIndex={-1}
            >
              <span className="mode-title-line">Ahora elige</span>
              <span className="mode-title-line is-accent">cómo avanzar</span>
            </h1>
            <p className="mode-lead">
              Elige tu ruta: practica las 7 compuertas una por una o entra al
              reto de 7 circuitos con tiempo, puntos y racha.
            </p>

            <div
              className="mode-map"
              aria-label="Mapa de progreso del laboratorio"
            >
              <div className="mode-map-label">
                <span>Progreso del laboratorio</span>
                <span>1/3</span>
              </div>
              <ol className="mode-steps">
                {progressSteps.map((step) => (
                  <li className={step.className} key={step.label}>
                    <strong>{step.label}</strong>
                    <span>{step.text}</span>
                  </li>
                ))}
              </ol>
              <div className="mode-save-card" aria-label="Tu avance">
                <p>Tu avance</p>
                <div>
                  <strong>
                    Práctica {progress.practiceCompletedLevels}/
                    {practiceTotalLevels}
                  </strong>
                  <strong>
                    Reto {progress.challengeCompletedLevels}/
                    {challengeTotalLevels}
                  </strong>
                </div>
                <div>
                  <span>Mejor puntaje {progress.bestChallengeScore}</span>
                  <span>Mejor racha x{progress.bestChallengeStreak}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mode-stage">
            <div className="mode-cards" aria-label="Modos disponibles">
              <article className="mode-card is-primary">
                <div>
                  <p className="mode-card-tag">Recomendado para aprender</p>
                  <h2>Modo práctica</h2>
                  <p>
                    Aprende AND, OR, NOT, XOR, NAND, NOR y XNOR sin presión, con
                    tabla de verdad y explicación clara en cada paso.
                  </p>
                  <div className="mode-preview">
                    <PracticePreview />
                  </div>
                  <ul
                    className="mode-metrics"
                    aria-label="Beneficios de práctica"
                  >
                    <li>Sin reloj</li>
                    <li>7 lecciones</li>
                    <li>Tabla lógica</li>
                  </ul>
                </div>
                <button
                  className="mode-button is-primary"
                  type="button"
                  onClick={onPractice}
                >
                  Entrar a práctica
                </button>
              </article>

              <article className="mode-card">
                <div>
                  <p className="mode-card-tag">Para comprobar dominio</p>
                  <h2>Modo reto</h2>
                  <p>
                    Juega 7 circuitos contra el tiempo con puntos y racha. Menos
                    ayudas, más presión y una meta clara por resolver.
                  </p>
                  <div className="mode-preview">
                    <ChallengePreview />
                  </div>
                  <ul className="mode-metrics" aria-label="Beneficios de reto">
                    <li>7 retos</li>
                    <li>Puntos</li>
                    <li>Racha</li>
                  </ul>
                </div>
                <button
                  className="mode-button"
                  type="button"
                  onClick={onChallenge}
                >
                  Iniciar reto
                </button>
              </article>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
