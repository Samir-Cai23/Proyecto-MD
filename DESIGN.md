# Digital Logic Lab — DESIGN.md

Design contract for the V2 prototype of **Logic Gates Challenge Game**.

Use this file as the design system source for Open Design, prototype tools, and future implementation decisions.

## 1. Product Essence

**Product name:** Digital Logic Lab

**Current repo name:** Logic Gates Challenge Game

**Category:** educational web game / interactive digital logic lab

**Audience:** students, self-learners, portfolio reviewers, junior developers, electronics beginners

Digital Logic Lab teaches digital logic gates through short interactive circuits. The experience should feel like entering a compact futuristic learning console: fast, clear, playful, precise, and memorable.

The product is not a generic quiz. It is a tiny circuit laboratory where the user learns by toggling inputs, seeing signal behavior, receiving feedback, and progressing through challenges.

## 2. Visual Direction

**Aesthetic name:** Retro-futuristic Digital Lab

The interface should feel like:

- a dark educational circuit lab;
- an interactive signal console;
- a modern learning game;
- a polished portfolio product;
- technical, but not intimidating;
- playful, but not childish.

Avoid:

- generic SaaS landing page style;
- purple AI gradients;
- overdone glassmorphism;
- excessive neon;
- emoji-led UI;
- random 3D decoration;
- heavy sci-fi clutter;
- templates that look like shadcn/Tailwind defaults.

## 3. Memorable Differentiation Anchor

If the logo is removed, users should recognize the product by this combination:

> A dark circuit-lab console with luminous signal rails, physical-feeling gate modules, LED output states, and educational feedback panels that behave like lab readouts.

Every screen should include at least one of these anchors:

- signal rail;
- glowing input node;
- gate module;
- truth-table fragment;
- lab console frame;
- animated pulse of logic signal;
- measurement/readout panel.

## 4. Color System

Use a controlled dark technical palette.

```css
--void: #05070D;
--panel: #0D1424;
--panel-strong: #121D33;
--panel-soft: #17243E;
--text: #EDF8FF;
--muted: #9FB8C9;
--dim: #647B8E;
--signal-cyan: #47F3FF;
--signal-cyan-strong: #9FFBFF;
--action-amber: #FFD166;
--success-green: #42FF9E;
--danger-red: #FF5F7A;
--ink: #061018;
```

### Usage

- Background: `--void` with subtle grid/circuit texture.
- Main panels: `--panel` and `--panel-strong`.
- Primary signal: `--signal-cyan`.
- Primary action or special callout: `--action-amber`.
- Correct/on state: `--success-green`.
- Incorrect/off/error state: `--danger-red`.
- Body text: `--text` and `--muted`.

### Do not

- Do not use large rainbow gradients.
- Do not make every element glow.
- Do not make red/green the only status indicator; pair color with labels or shape.

## 5. Typography

Recommended fonts:

- Display/control font: `Oxanium`.
- Technical/body mono font: `Share Tech Mono`.

Typography should feel engineered, readable, and game-like.

### Hierarchy

- Hero titles: large, compressed, high-confidence.
- Section labels: uppercase, letter-spaced, mono.
- Body text: readable, short, educational.
- Gate labels: compact, uppercase, high contrast.
- Feedback: calm and explanatory, not noisy.

Avoid generic typography such as Inter/Roboto/Arial as the main identity.

## 6. Layout Principles

Use responsive, mobile-first layouts.

### Mobile 375px

- Single-column console.
- Large touch targets.
- No horizontal overflow.
- Inputs must be reachable with thumb.
- Circuit visualization can stack vertically.

### Tablet 768px

- Console expands.
- Mode cards can become two columns.
- Circuit and explanation can sit in stronger visual relationship.

### Desktop 1024px / 1440px

- Use asymmetric lab dashboard composition.
- Main circuit area gets visual priority.
- Supporting panels can sit beside the circuit.
- Avoid centered SaaS hero sameness.

## 7. Components

### Lab Panel

A dark rounded rectangular panel with:

- thin cyan border;
- subtle inner highlight;
- small lab label/chip;
- optional corner notches or rail lines;
- shadow that suggests depth, not glass.

### Buttons

Buttons should feel like console controls.

Types:

- Primary action: cyan/amber fill, strong contrast.
- Secondary action: dark panel with cyan border.
- Danger/retry: red border or red low-glow.
- Input toggle: physical state button, clearly ON/OFF.

Requirements:

- visible focus;
- large touch size;
- `aria-pressed` for toggles;
- not color-only.

### Gate Module

Gate modules should look like small circuit blocks:

- label: AND, OR, XOR, NAND, NOT;
- visible input/output sockets;
- wire connections;
- state pulse when signal changes;
- avoid photorealistic chips.

### Output LED

The output should be emotionally satisfying:

- OFF: dark red/low state, readable `0`.
- ON: green high-energy glow, readable `1`.
- Use transition pulse, not constant flashing.

### Truth Table

Truth table should feel like a lab reference card:

- compact;
- highlighted current row;
- binary values aligned;
- not spreadsheet-heavy.

## 8. Motion Principles

Motion should teach, not decorate.

Use motion for:

- signal traveling through a wire;
- gate pulse when recalculating;
- LED state transition;
- success confirmation;
- screen transition between learning stages.

Avoid:

- infinite decorative movement;
- large parallax that distracts;
- heavy 3D runtime in gameplay;
- motion that cannot be disabled.

Always support `prefers-reduced-motion`.

## 9. 3D / Image / Video Guidance

3D, images, and video can be used for prototype/marketing moments, not for the core logic engine.

Good uses:

- welcome hero illustration of a floating circuit board;
- short intro video for portfolio presentation;
- subtle 2.5D gate modules in static/artifact prototype;
- background image/texture derived from circuit traces;
- final achievement card with dimensional lab badge.

Avoid:

- Three.js as required gameplay core;
- heavy animated 3D behind every screen;
- visual effects that hide circuit clarity;
- images that make controls look non-interactive.

## 10. Accessibility

Accessibility is required.

- Contrast must be strong on dark background.
- Keyboard focus must be visible.
- Toggle states must use text/shape, not only color.
- Use semantic headings.
- Feedback should be announced with `role="status"` or equivalent.
- Motion must respect reduced motion.
- Touch targets should be comfortable on mobile.

## 11. Copy Voice

Tone:

- clear;
- encouraging;
- precise;
- educational;
- not childish;
- not corporate.

Use copy like:

- “Toggle the inputs. Watch the signal path.”
- “AND only outputs 1 when both inputs are active.”
- “Good signal. You completed the gate condition.”
- “Not yet. Check which input the NOT gate is inverting.”

Avoid:

- vague hype;
- too many exclamation marks;
- jokes that reduce clarity;
- generic gamification language without teaching value.

## 12. Prototype Goal

The Open Design prototype should define the screen experience before React implementation.

Prototype screens:

1. Welcome / product promise.
2. Mode selection: Practice vs Challenge.
3. Level screen: circuit, input controls, output, feedback, truth-table preview.
4. Results screen: summary, score/progress, next actions.

The prototype should be visually ambitious but implementation-realistic with Vite + React + TypeScript + SVG + CSS.

## 13. Implementation Guardrails

When translating prototype to React:

- keep logic in `src/core` and `src/data`;
- use SVG for circuits;
- use CSS tokens from `src/styles/tokens.css`;
- no heavy dependencies unless justified;
- keep the app fast;
- validate responsive at 375, 768, 1024, 1440;
- preserve accessibility.
