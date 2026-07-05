# LevelScreen implementation plan

## Status

- Phase: **4 — Pantallas principales**
- Scope: `LevelScreen` design prototype and implementation guidance
- React implementation: **not started**
- Open Design iterations completed: **3 / 3**
- Final artifact: `digital-logic-lab-level-screen-v3-final.html`
- Current preview URL: `http://127.0.0.1:53288/api/projects/brand-digital-logic-lab-design-md-4c16fb/raw/digital-logic-lab-level-screen-v3-final.html`

> Note: the Open Design daemon port can change. If this URL stops working, open the artifact `digital-logic-lab-level-screen-v3-final.html` inside project `brand-digital-logic-lab-design-md-4c16fb`.

## Iteration summary

| Iteration | Artifact | Purpose | Result |
| --- | --- | --- | --- |
| 1 | `digital-logic-lab-level-screen-v1.html` | Establish base structure: header, SVG board, input buttons, feedback, truth table and actions. | Good foundation, but still too basic. |
| 2 | `digital-logic-lab-level-screen-v2.html` | Improve visual hierarchy, beginner copy, responsive layout, touch controls, feedback panel and motion plan. | Stronger UX and clearer learning flow. |
| 3 | `digital-logic-lab-level-screen-v3-final.html` | Final target prototype with lightweight interaction, validated responsiveness, reduced motion and performance. | Approved implementation target. |

## UX goals

The screen should make the first playable level feel clear, educational and satisfying:

1. User instantly understands where they are: **Práctica · Nivel 1 de 6**.
2. User knows the goal: produce output `1` for an AND gate.
3. User can toggle inputs without guessing what ON/OFF means.
4. The circuit visually explains signal flow.
5. Feedback explains **why** the output is `0` or `1`, not only whether the user is correct.
6. Truth table reinforces the rule without overwhelming mobile users.
7. The screen stays fast and responsive on phone, tablet and desktop.

## Final screen copy

### Header

- Brand: `Lógica Digital`
- Mode pill: `Práctica · Nivel 1 de 6`
- Secondary action: `Cambiar modo`

### Main panel

- Eyebrow: `Circuito activo`
- Title: `Nivel 1: compuerta AND`
- Lead:
  - `Tu objetivo es conseguir una salida 1. Cambia las entradas y observa cómo la señal viaja por el circuito.`
- Progress card:
  - `Progreso`
  - `16%`

### Controls

- `Entrada A`
  - ON: `Encendida · valor 1`
  - OFF: `Apagada · valor 0`
- `Entrada B`
  - ON: `Encendida · valor 1`
  - OFF: `Apagada · valor 0`

### Feedback states

- Output `1`:
  - `¡Correcto! En AND, la salida se enciende porque A y B están activas al mismo tiempo.`
  - Next step: `Buen trabajo: ya puedes avanzar al siguiente circuito.`
  - Primary button: `Continuar`
- One input active:
  - `Vas bien: una señal ya llegó a la compuerta, pero AND necesita las dos entradas en 1.`
  - Next step: `Siguiente acción: activa la entrada que falta y vuelve a comprobar.`
- No inputs active:
  - `Ahora no entra ninguna señal activa. AND mantiene la salida en 0 hasta que A y B sean 1.`
  - Next step: `Siguiente acción: activa A y B para formar la combinación 1 · 1.`

### Actions

- Primary: `Comprobar señal` / `Continuar`
- Secondary: `Reiniciar`
- Tertiary: `Volver al modo`

## Layout plan

### Desktop: 1024px+

- Two-column layout:
  - Left: main level/circuit panel.
  - Right: feedback, truth table and actions.
- Board stays large enough for SVG readability.
- Inputs remain side by side.
- Feedback panel and truth table are visible without requiring much scrolling.

### Tablet: 768px–1023px

- Main panel becomes full width.
- Side panels become a compact two-column row when space allows.
- Actions span full width under feedback/table.
- Maintain 44px minimum touch target.

### Mobile: 320px–767px

- Single-column layout.
- Header wraps cleanly.
- Progress card becomes full width.
- Inputs stack vertically.
- Truth table remains readable and compact.
- No horizontal overflow at 320px.

## Motion plan

Use ponytail/simple motion only:

1. One-shot screen entry animation for topbar, main panel and side panels.
2. Continuous signal animation only on active SVG wires.
3. Animate only compositor-friendly or cheap SVG properties:
   - `opacity`
   - `transform`
   - `stroke-dashoffset`
4. Do not animate layout properties like `width`, `height`, `top`, `left`, margins or grid placement.
5. Respect `prefers-reduced-motion: reduce`:
   - animation duration forced to `0.001ms`
   - signal flow disabled
6. If implementation validation shows FPS loss on tablet/mobile, cut continuous wire animation before adding complexity.

## Accessibility requirements

- `LevelScreen` should use semantic regions:
  - main level section
  - side help/feedback aside
  - action group
- Input toggles must be real `button`s with `aria-pressed`.
- Feedback panel should use `aria-live="polite"`.
- SVG must have an accessible label describing current circuit state.
- Touch targets must be at least `44px` high/wide.
- Do not rely only on color:
  - show ON/OFF text
  - show numeric value
  - update feedback copy
  - highlight truth table current row
- Focus visible must be obvious with high contrast.
- Reduced motion must be supported.

## Performance constraints

- No new animation library for this screen.
- No Three.js, canvas, particles or JS animation loop.
- Use SVG and CSS only for circuit motion.
- Keep the board as one small SVG component for Phase 4; avoid premature generic circuit renderer abstraction until Phase 5.
- Keep copy/state mapping simple and data-driven from existing level data where possible.

## Suggested React implementation files

Likely files to touch in the next implementation pass:

- `src/screens/LevelScreen.tsx` — new screen component.
- `src/app/App.tsx` — route current level flow into `LevelScreen` instead of the temporary baseline game view.
- `src/app/appTypes.ts` — only if screen state types need a small update.
- `src/styles/components.css` — LevelScreen component styles.
- `src/styles/layout.css` — only if shared layout helpers are needed.
- `src/app/App.test.tsx` — update interaction tests for toggling A/B and seeing output/feedback.

Avoid creating many tiny components in this phase unless repeated code becomes obvious. Phase 5 can extract `CircuitBoard`, `SignalWire`, `InputToggle`, `FeedbackPanel` and `TruthTable` properly.

## Implementation notes

- Start with the first easy AND level using existing pure logic/data.
- Keep screen state minimal:
  - current input values
  - computed output
  - current row key for truth table
- The output should update live when toggles change.
- `Comprobar señal` can become `Continuar` once the target state is reached.
- `Reiniciar` returns inputs to the level's initial/default state.
- `Volver al modo` should return to `ModeSelectScreen` or current mode/difficulty selection depending on existing app flow.
- Keep Spanish-first user-facing copy.

## Validation completed for prototype

Browser artifact validated in Open Design / Playwright.

### Console

- Console errors: `0`
- Console warnings: `0`

### Responsive matrix

| Size | Horizontal overflow | Minimum button size |
| --- | ---: | ---: |
| 320x720 | 0px | 44px |
| 360x800 | none | 44px |
| 375x812 | none | 44px |
| 390x844 | none | 44px |
| 414x896 | none | 44px |
| 768x1024 | none | 44px |
| 820x1180 | 0px | 44px |
| 912x1368 | 0px | 44px |
| 1024x768 | none | 44px |
| 1280x800 | none | 44px |
| 1440x900 | none | 44px |
| 1536x864 | none | 44px |

### Interaction

- Toggling `Entrada B` from the default `A=1`, `B=0` state updates:
  - output to `1`
  - truth table current row to `1, 1`
  - feedback to success copy
  - primary button to `Continuar`

### Reduced motion

- `prefers-reduced-motion: reduce` max animation duration: `0.001ms`

### FPS samples

| Size | FPS sample |
| --- | ---: |
| 320x720 | 60 |
| 375x812 | 60 |
| 768x1024 | 60 |
| 1024x768 | 60 |
| 1440x900 | 60 |

## Screenshots captured

- `level-screen-v3-final-1440.png`
- `level-screen-v3-final-768.png`
- `level-screen-v3-final-375.png`

These screenshots were captured from the final Open Design artifact.

## Next step

After user approval, implement `LevelScreen` in React/Vite using this prototype as the target, then run:

```sh
npm run test
npm run lint
npm run build
git --no-pager diff --check
```

Manual browser validation should repeat the responsive matrix, console check, keyboard/focus check and reduced motion check.
