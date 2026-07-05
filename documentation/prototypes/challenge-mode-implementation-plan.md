# Challenge Mode 6A implementation plan

## Status

- Phase: **6A — Challenge Mode base**
- Status: **Done**
- Scope: Make Challenge Mode consistent with the product promise: 7 levels, timer, points, streak, submit action, no truth table during active challenge attempts.
- Open Design iterations completed: **2 / 3 allowed**
- Artifacts:
  - `digital-logic-lab-challenge-mode-v1.html`
  - `digital-logic-lab-challenge-mode-v2-final.html`

## Product decision

Challenge Mode should feel like a test of mastery, not a second guided practice route.

- Practice keeps truth tables and explanatory help.
- Challenge hides truth tables during attempts.
- Challenge uses pressure: timer, score, streak, wrong-submit penalty, and a deliberate `Enviar respuesta` action.
- Challenge difficulty increases through 7 circuits that reuse the 7 learned gates: AND, OR, NOT, XOR, NAND, NOR and XNOR.

## Challenge route

| Level | Focus | Circuit |
| --- | --- | --- |
| 1 | XOR | `(A XOR B) AND C` |
| 2 | OR | `(A OR B) AND C` |
| 3 | NOT | `(NOT A AND B) AND C` |
| 4 | NAND | `NAND(A, B) AND C` |
| 5 | NOR | `(NOR(A, B) XOR C) AND D` |
| 6 | XNOR | `XNOR(A, B) AND XOR(C, D)` |
| 7 | Boss XNOR/NAND | `XNOR(A, B) AND NAND(C, D)` |

Initial states are configured so levels do not start solved and are not solved by a single random click.

## Implementation decisions

1. No new dependencies.
2. Use React state + pure scoring helpers.
3. Keep timer as a bonus clock, not an accessibility-hostile hard game-over.
4. Keep `localStorage` out of this slice; persistence remains for the later progress phase.
5. Use a deterministic SVG tree renderer in `CircuitBoard` for current challenge circuits instead of hardcoding every board or building a heavy graph layout engine.
6. Results screen displays challenge score and streak when the completed route is `hard`.

## Files touched

- `src/core/gameTypes.ts`
- `src/core/scoring.ts`
- `src/core/scoring.test.ts`
- `src/core/evaluateCircuit.test.ts`
- `src/core/truthTable.test.ts`
- `src/data/levels.ts`
- `src/data/levels.test.ts`
- `src/app/App.tsx`
- `src/app/App.test.tsx`
- `src/screens/LevelScreen.tsx`
- `src/screens/ModeSelectScreen.tsx`
- `src/screens/ResultsScreen.tsx`
- `src/components/CircuitBoard/CircuitBoard.tsx`
- `src/styles/components.css`
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

- Completed all 7 challenge levels manually through browser automation.
- Challenge results showed `7/7`, score and streak.
- Challenge has no truth table during attempts.
- Practice still has truth table and no `Enviar respuesta` button.
- Responsive checked at 320x720, 375x812, 768x1024, 1024x768, 1365x646 and 1440x900.
- No horizontal overflow.
- Buttons remain >= 44px.
- SVG board visible.
- Reduced motion max duration: 0.001ms.
- Console: 0 warnings/errors.

Note: `git --no-pager diff --check` only reports the expected CRLF warning for `index.html`.
