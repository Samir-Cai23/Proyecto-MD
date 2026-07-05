# CircuitBoard SVG implementation plan

## Status

- Phase: **5B — CircuitBoard SVG formal + combined challenge circuits**
- Status: **Done**
- Scope: Extract the SVG circuit renderer out of `LevelScreen` and render challenge circuits as real connected gates instead of `MIX`.
- Open Design iterations completed: **2 / 2**
- Artifacts:
  - `digital-logic-lab-circuit-board-v1.html`
  - `digital-logic-lab-circuit-board-v2-final.html`

## UX problem

Practice gates now have correct SVG shapes, but challenge circuits still collapse multiple gates into one `MIX` block. That hides the learning value of the reto mode because the user cannot see how intermediate signals combine.

## Final direction

Use a reusable SVG renderer with:

- `CircuitBoard` for board orchestration.
- `GateNode` for correct gate silhouettes.
- `SignalWire` for active/inactive wires.
- `OutputNode` for final output.

Keep the implementation simple and deterministic for the current data set:

- Single-gate practice uses a simple centered layout.
- `hard-1` uses a specific combined layout: `(A XOR B) AND NOT C`.
- `hard-2` uses a specific combined layout: `(A AND B) XOR NAND(C, D)`.

This avoids overengineering a generic graph layout engine before the level catalog grows.

## Implementation decisions

1. Keep SVG/CSS only; no Three.js, canvas, Framer Motion or runtime animation library.
2. Keep existing CSS signal animation classes and reduced-motion behavior.
3. Move the gate shape logic out of `LevelScreen` into `src/components/CircuitBoard`.
4. Show intermediate branch values through active wires/gate highlight.
5. Use accessible `role="img"` and a descriptive `aria-label` on the board.
6. Keep mobile responsive through the existing scalable SVG viewport.
7. Preserve current interactions: input toggles still update circuit/table/live feedback.

## Files to touch

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

Notes:

- `npm run test`: 20 tests passed.
- `npm run lint`: passed.
- `npm run build`: passed, 42 modules transformed.
- `npm audit --audit-level=high`: 0 vulnerabilities.
- `git --no-pager diff --check`: only the expected CRLF warning for `index.html`.

Manual browser validation:

- Practice renders AND/OR/NOT/XOR/NAND/NOR/XNOR and completes at `7/7`.
- `Iniciar reto` shows separate XOR, NOT and AND gates for reto 1.
- Reto 2 shows separate AND, NAND and XOR gates.
- `MIX` is absent in both challenge circuits.
- Input toggles update intermediate wires and final output live.
- Responsive checked at 320x720, 375x812, 768x1024, 1024x768, 1365x646 and 1440x900.
- Console has 0 errors/warnings.
- Reduced motion clamps animation duration to 0.001ms.
- Button targets remain at least 44px.

Screenshots captured:

- `circuit-board-hard1-react-1440.png`
- `circuit-board-hard1-react-375.png`
- `circuit-board-hard2-react-1440.png`
- `results-after-circuit-board-react-1365x646.png`
