# ModeSelectScreen — Open Design final prototype and implementation plan

## Status

- Phase: **4 — Pantallas principales**
- Scope: next screen after `WelcomeScreen`
- Implementation status: **planned only — not implemented in React yet**
- Open Design project: `brand-digital-logic-lab-design-md-4c16fb`
- Final artifact: `digital-logic-lab-mode-select-v3-final.html`
- Preview URL:

```text
http://127.0.0.1:52261/api/projects/brand-digital-logic-lab-design-md-4c16fb/raw/digital-logic-lab-mode-select-v3-final.html
```

## Iterations completed

Maximum requested iterations: **3**.

| Iteration | Artifact | Purpose | Outcome |
| --- | --- | --- | --- |
| 1 | `digital-logic-lab-mode-select-v1.html` | Establish base hierarchy and two-mode decision layout. | Validated direction: Practice primary, Challenge secondary. |
| 2 | `digital-logic-lab-mode-select-v2.html` | Add motion language, SVG mini-circuits, responsive card system. | Improved energy and clearer visual relationship to circuit learning. |
| 3 | `digital-logic-lab-mode-select-v3-final.html` | Finalize style consistency with current Welcome screen and define implementation target. | Approved implementation target for React/Vite conversion. |

## Final screen goal

The screen should answer one question clearly:

> “How do you want to continue learning?”

It appears after the Welcome screen and before entering the actual level experience.

The user chooses between:

1. **Modo práctica** — recommended route for beginners.
2. **Modo reto** — faster game-like route for users who want score/timer/streak.

## Product decision

`Modo práctica` should be visually primary.

Reason:

- The current V2 vision is educational first.
- Beginners should not feel pushed into timed play too early.
- Challenge mode should feel exciting, but not compete with the recommended learning path.

## UX content

### Header

- Brand: `Lógica Digital`
- Nav labels:
  - `Modo`
  - `Práctica`
  - `Reto`
- HUD/status:
  - `Lección AND completada`

### Hero copy

Kicker:

```text
Selecciona tu ruta
```

Title:

```text
Ahora elige
cómo avanzar
```

Lead:

```text
La siguiente pantalla convierte el aprendizaje en decisión: puedes practicar con ayuda o entrar al reto cuando ya domines la señal.
```

### Progress map

Use a compact learning map:

| Step | Label | Meaning |
| --- | --- | --- |
| Done | `AND listo` | User understood the initial signal. |
| Active | `Elegir modo` | Current screen. |
| Upcoming | `Resolver` | Next screen / level flow. |

### Cards

#### Primary card — Practice

```text
Modo práctica
Feedback educativo, pistas y tabla de verdad. La interfaz explica por qué cada combinación funciona o falla.
```

Chips:

```text
Sin timer · Pistas · Tabla lógica
```

CTA:

```text
Entrar a práctica
```

#### Secondary card — Challenge

```text
Modo reto
Timer, score y streak. Menos ayuda, más ritmo de juego y feedback resumido al terminar.
```

Chips:

```text
Timer · Score · Streak
```

CTA:

```text
Iniciar reto
```

### Context note

```text
Regla UX
Práctica debe ser la ruta primaria. Reto se ve atractivo, pero no compite con aprender primero.
```

## Visual design direction

Keep the current approved direction:

```text
Retro-futuristic Digital Lab
```

The screen should feel like the same product as `WelcomeScreen`, not a separate landing page.

### Must preserve from current Welcome style

- dark deep lab background;
- subtle grid/circuit pattern;
- cyan signal accent;
- warm primary action for the recommended route;
- compact mono labels;
- big display title with tight tracking;
- console/lab cards with controlled glow;
- Spanish-first beginner-friendly copy.

### Avoid

- SaaS pricing-card look;
- purple AI gradients;
- excessive glassmorphism;
- emojis as primary icons;
- terminal jargon that beginners do not understand;
- decorative animation spam.

## Motion plan

Use **CSS-first motion** for this screen.

### Entrance sequence

1. Shell fades/slides in.
2. Kicker fades up.
3. Title reveals line by line.
4. Accent underline sweeps under `cómo avanzar`.
5. Lead and progress map fade up.
6. Cards enter with a short stagger.
7. Context note fades up last.

Recommended timings:

| Element | Duration | Delay | Properties |
| --- | ---: | ---: | --- |
| shell | 520ms | 0ms | `opacity`, `transform` |
| kicker | 420ms | 80ms | `opacity`, `transform` |
| title lines | 760ms | 0/130ms | `opacity`, `transform`, `clip-path`, short blur |
| lead | 460ms | 360ms | `opacity`, `transform` |
| progress map | 420ms | 520ms | `opacity`, `transform` |
| cards | 560ms | 0/90ms | `opacity`, `transform` |
| context | 440ms | 680ms | `opacity`, `transform` |

### Continuous motion

Allowed:

- SVG signal dash movement inside the small previews.
- LED opacity pulse inside each card.

Keep continuous motion limited to small isolated SVG regions.

### Interaction motion

Desktop/laptop:

- card hover lift: `translateY(-6px)` + tiny `rotateX(1.4deg)`;
- border/glow intensifies;
- one sweep highlight on hover.

Tablet/mobile:

- no hover dependency;
- card remains readable and static;
- use tap/click feedback later when implemented as buttons.

### Reduced motion

Required:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Text animation recommendation

Use the same family as Welcome:

- `mask-reveal-up` style for the title lines;
- `soft-blur-in` only as a short entrance detail;
- avoid typewriter here because it may feel slower and less direct for a decision screen.

## Three.js decision

Do **not** use Three.js for this screen in V2 initial implementation.

Reason:

- Project rules explicitly say no Three.js in the core game.
- This screen only needs 2.5D visual depth, which CSS + SVG already covers.
- Adding Three.js here would increase bundle/runtime complexity without improving learning clarity.

If a future V3 wants Three.js, use it only as an optional non-core decorative background and lazy-load it behind reduced-motion/device checks. Do not block this V2 screen on it.

## Implementation plan

### Files to add/change

Expected React implementation:

```text
src/screens/ModeSelectScreen.tsx
src/app/App.tsx
src/app/appTypes.ts
src/styles/components.css
src/styles/layout.css
src/app/App.test.tsx
```

Optional later split if the screen grows:

```text
src/components/ModeCard.tsx
src/components/LabProgressMap.tsx
```

### Component API

Recommended props:

```ts
type ModeSelectScreenProps = {
  onPractice: () => void;
  onChallenge: () => void;
  onBack?: () => void;
};
```

Mode type:

```ts
type GameMode = "practice" | "challenge";
```

Add mode to app state only if the next implementation step needs it immediately. If not, route both CTAs to the current level flow temporarily, with a clear TODO in the next phase plan.

### Accessibility requirements

- Use native `<button>` for CTAs.
- Cards can be `<article>` but the actionable element should be the button.
- Maintain one `<h1>`.
- Do not rely on color only: use labels like `Recomendado para aprender`.
- Keep focus visible from global styles.
- SVG previews should be `aria-hidden="true"` unless they communicate unique content.
- The current route/progress map should have a useful `aria-label`.

### Responsive behavior

| Width | Layout |
| --- | --- |
| `>= 980px` | Two-column hero: copy/progress left, cards/context right. |
| `< 980px` | Single-column flow; cards stack vertically. |
| `< 540px` | Hide nav/HUD extras, stack progress steps, reduce card height/padding. |

### Performance constraints

Follow `fixing-motion-performance`:

- animate primarily `transform` and `opacity`;
- no JS animation loop;
- no scroll polling;
- no layout-property animation (`width`, `height`, `top`, `left`, margin);
- keep blur short and one-time only;
- keep continuous SVG animations small;
- avoid new animation dependencies.

## Validation checklist for implementation

Run:

```sh
npm run test
npm run lint
npm run build
npm audit --audit-level=high
git --no-pager diff --check
```

Browser validation:

- console errors = 0;
- no horizontal overflow;
- reduced motion works;
- keyboard focus visible;
- CTAs are reachable by keyboard;
- responsive check at:

```text
320x720
375x812
768x1024
1024x768
1440x900
```

Additional visual checks:

- `Modo práctica` feels primary but not cartoonish;
- `Modo reto` feels exciting but secondary;
- layout remains consistent with `WelcomeScreen`;
- mini SVG previews do not distract from the decision.

## Open Design validation notes

Validated final artifact in browser:

- no console errors;
- no horizontal overflow at `320`, `375`, `768`, `1024`, `1440`;
- `prefers-reduced-motion` collapses max animation duration to `0.001ms`;
- repeated 320px FPS sampling returned ~60 FPS after initial measurement noise;
- final screenshots captured:
  - `mode-select-v3-final-1440.png`
  - `mode-select-v3-final-375.png`

## Final recommendation

Implement `ModeSelectScreen` from `digital-logic-lab-mode-select-v3-final.html`, but translate it manually into React/CSS using the current token/style system.

Do not copy the artifact blindly. Use it as the design target and preserve existing project conventions.
