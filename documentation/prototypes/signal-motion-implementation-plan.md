# Signal Motion 6B implementation plan

## Status

- Phase: **6B — Signal motion polish**
- Status: **Done**
- Scope: Make circuit signals easier to follow and feedback more expressive without adding heavy animation dependencies.
- Open Design iterations completed: **1**
- Artifact:
  - `digital-logic-lab-signal-motion-v1-final.html`

## Product decision

Motion should explain the circuit, not decorate it.

- Active wires show a moving signal packet to guide the eye from inputs to gates to output.
- Incorrect challenge submissions trigger a correction pulse and explicit feedback.
- Board pulse sweep is short and tied to user action.
- Reduced motion keeps the state visible but clamps animation duration.

## Implementation decisions

1. No new dependencies.
2. Use SVG + CSS only.
3. Avoid layout animation and scroll-driven animation.
4. Use existing React state to trigger one-shot pulses.
5. Keep continuous motion limited to small SVG wire strokes on active paths.
6. Respect `prefers-reduced-motion`.

## Files touched

- `src/components/CircuitBoard/CircuitBoard.tsx`
- `src/screens/LevelScreen.tsx`
- `src/styles/components.css`
- `src/app/App.test.tsx`
- `documentation/v2-product-implementation-plan.md`
- `AGENTS.md`

## Validation result

Passed:

```sh
npm run test
npm run lint
npm run build
npm audit --audit-level=high
git --no-pager diff --check
```

Browser validation:

- Challenge checked across desktop 1440x900, tablet 768x1024 and mobile 375x812.
- All 7 challenge levels complete to Results.
- Active wires expose `.level-wire-packet.is-on` and `.level-wire-signal.is-on` where expected.
- Incorrect challenge submission shows `Pulso de corrección activo` and remains on the same level.
- Practice still shows truth table and no challenge submit action.
- Challenge still hides truth table and keeps `Enviar respuesta`.
- No horizontal overflow.
- Buttons remain >= 44px.
- SVG board exists in page and has no gate shell overlaps.
- Reduced motion max duration: 0.001ms.
- Console: 0 warnings/errors.

Note: `git --no-pager diff --check` may only report the expected CRLF warning for `index.html`.
