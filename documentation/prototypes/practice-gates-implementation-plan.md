# Practice gates implementation plan

## Status

- Phase: **5A — Practice curriculum + correct gate symbols**
- Scope: Make practice a guided 7-gate curriculum and render each logic gate with a recognizable SVG symbol.
- React implementation: **completed**
- Open Design iterations completed: **2 / 2**
- Artifacts:
  - `digital-logic-lab-practice-gates-v1.html`
  - `digital-logic-lab-practice-gates-v2-final.html`

## User observation

The practice flow should teach how gates work. It should not ask for an extra difficulty after the user already chose `Modo práctica`. The current `easy` route is really practice, while `hard` should act as the temporary challenge route until Phase 8 adds real scoring/timer/streak.

The gate visuals must also be accurate. Reusing the same AND-like body for OR/XOR/NAND/etc. is educationally wrong.

## Final UX decision

Recommended route:

```text
Welcome
→ ModeSelect
  → Modo práctica
    → AND
    → OR
    → NOT
    → XOR
    → NAND
    → NOR
    → XNOR
    → ResultsScreen
  → Modo reto
    → current hard route for now
```

## Implementation decisions

1. Keep the current internal `Difficulty` names for a minimal change:
   - `easy` = guided practice route
   - `hard` = temporary challenge route
2. Change `Entrar a práctica` to start the practice route directly.
3. Keep the old level-selection screen code unreachable for now rather than deleting it in this slice.
4. Extend gate logic and data to support:
   - `NOR`
   - `XNOR`
5. Update practice levels to seven single-gate lessons:
   - AND, OR, NOT, XOR, NAND, NOR, XNOR
6. Render each gate with a real SVG silhouette:
   - AND: flat left + round right
   - OR: curved input side + curved output side
   - NOT: triangle + output bubble
   - XOR: OR + extra input-side curve
   - NAND: AND + output bubble
   - NOR: OR + output bubble
   - XNOR: XOR + output bubble
7. Use CSS/SVG motion only:
   - signal wire dash flow when live
   - one-shot input pulses already present
   - no Three.js/canvas/JS animation loop
8. Keep reduced-motion support through existing global styles and avoid adding new continuous decorative animations.

## Files to touch

- `src/core/gameTypes.ts`
- `src/data/gates.ts`
- `src/core/evaluateGate.ts`
- `src/core/evaluateGate.test.ts`
- `src/data/levels.ts`
- `src/data/levels.test.ts`
- `src/screens/LevelScreen.tsx`
- `src/screens/ModeSelectScreen.tsx`
- `src/screens/ResultsScreen.tsx`
- `src/app/App.tsx`
- `src/app/App.test.tsx`
- `src/styles/components.css`
- `documentation/v2-product-implementation-plan.md`

## Implementation result

Implemented:

- `Entrar a práctica` now starts the guided practice route directly.
- Practice contains AND, OR, NOT, XOR, NAND, NOR and XNOR.
- `NOR` and `XNOR` are supported in type definitions, gate definitions and evaluation logic.
- `LevelScreen` renders recognizable SVG silhouettes for each single-gate lesson.
- `ResultsScreen` reports `7/7` and lists all seven learned gates.
- Current challenge route still starts from `Iniciar reto` and remains separate from practice.

## Validation run

Run:

```sh
npm run test
npm run lint
npm run build
npm audit --audit-level=high
git --no-pager diff --check
```

Manual browser validation:

- Practice button enters `Nivel 1: compuerta AND` directly.
- No difficulty selection appears when entering practice.
- Practice completion shows `7/7` on `ResultsScreen`.
- Challenge button still starts current hard route.
- Gate symbols are visually distinct for AND, OR, NOT, XOR, NAND, NOR, XNOR.
- Responsive check at 320/375/768/1024/1440.
- Console has no relevant errors/warnings.
- Button target height remains at least 44px.
- `prefers-reduced-motion` clamps animations.
