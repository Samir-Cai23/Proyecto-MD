# Open Design prompts — Fase 3.5 Digital Logic Lab

Este documento contiene prompts listos para usar en Open Design cuando esté instalado en Windows.

Objetivo: generar prototipos visuales antes de implementar Fase 4 en React.

## Cómo usar

1. Instala Open Design en Windows.
2. Abre este repositorio/proyecto si Open Design lo permite.
3. Usa `DESIGN.md` de la raíz como design system/contexto.
4. Genera primero el prototipo completo.
5. Luego genera pantallas individuales si hace falta refinar.
6. Exporta HTML/screenshots y guárdalos en:

```text
documentation/prototypes/open-design-exports/
```

Importante:

- No copiar código generado directo a producción sin revisión.
- Usar los artifacts como referencia visual/UX.
- La implementación final debe hacerse en el repo React/Vite siguiendo fases.

## Prompt maestro

```text
You are designing a high-end interactive educational web game prototype called “Digital Logic Lab”, the V2 evolution of a vanilla JavaScript game named “Logic Gates Challenge Game”.

Use the attached/project DESIGN.md as the source of truth.

Create a polished multi-screen prototype for a responsive web app. The product teaches digital logic gates through interactive circuits, binary inputs, animated signal paths, immediate educational feedback, and progression.

Aesthetic direction: Retro-futuristic Digital Lab.

The prototype must not look like a generic SaaS dashboard, a purple AI landing page, or a Tailwind/shadcn template. It should feel like a compact futuristic circuit laboratory: dark technical background, luminous signal rails, physical-feeling gate modules, LED output states, truth-table fragments, and lab readout panels.

Screens to design:
1. Welcome screen
2. Mode selection screen: Practice vs Challenge
3. Level screen: circuit, inputs, output LED, feedback, truth table preview
4. Results screen: score/progress, learning summary, next actions

Functional expectations:
- Mobile-first responsive layout.
- Must work conceptually at 375px, 768px, 1024px, and 1440px.
- No horizontal overflow.
- Large touch targets.
- Visible keyboard focus style.
- Reduced motion should be considered.
- Use SVG-style circuit visuals, not canvas-heavy or WebGL-heavy gameplay.
- 3D/2.5D can be used as a visual accent, but not as the core interaction.

Deliverable:
- A single navigable HTML prototype or artifact with all four screens.
- Include realistic copy in Spanish.
- Include notes or labels explaining key design decisions.
```

## Prompt 1 — WelcomeScreen

```text
Design the Welcome screen for Digital Logic Lab.

Use the project DESIGN.md.

Goal: In the first 3 seconds, the user should think: “This is a professional interactive circuit learning game.”

Screen content:
- Product name: Digital Logic Lab
- Small legacy subtitle: Logic Gates Challenge Game V2
- Main headline in Spanish: “Aprende compuertas lógicas resolviendo circuitos vivos.”
- Short explanation: “Activa entradas binarias, observa cómo viaja la señal y descubre por qué cada compuerta responde con 0 o 1.”
- Primary CTA: “Iniciar laboratorio”
- Secondary CTA: “Ver cómo funciona”
- Small status chips: “AND”, “OR”, “XOR”, “NAND”, “NOT”

Visual requirements:
- Dark lab console background.
- A memorable hero visual: a floating 2.5D circuit board or SVG circuit slab with glowing input nodes and a pulsing output LED.
- No generic laptop mockup.
- No generic SaaS cards.
- Use cyan signal accents, amber CTA, green LED highlight.
- Include subtle grid/circuit traces.

Responsive notes:
- On mobile, hero visual should stack under headline.
- On desktop, use asymmetry: text block left, circuit artifact right.

Interaction/motion notes:
- Signal pulse should run once or subtly when the screen loads.
- Reduced motion variant should freeze the circuit in a clear state.
```

## Prompt 2 — ModeSelectScreen

```text
Design the Mode Selection screen for Digital Logic Lab.

Use the project DESIGN.md.

Goal: Make the user clearly understand the difference between Practice and Challenge.

Screen content in Spanish:
- Kicker: “Selecciona misión”
- Heading: “Elige cómo quieres entrenar tu lógica.”
- Practice mode card:
  - Title: “Modo Práctica”
  - Description: “Aprende sin presión. Recibe pistas, explicación de compuertas y tabla de verdad.”
  - CTA: “Practicar”
  - Signals: “Pistas”, “Tabla de verdad”, “Feedback guiado”
- Challenge mode card:
  - Title: “Modo Reto”
  - Description: “Resuelve circuitos con menos ayuda, mide intentos y mejora tu score.”
  - CTA: “Entrar al reto”
  - Signals: “Score”, “Intentos”, “Progreso local”
- Small progress/readout strip: “Laboratorio inicial · 6 circuitos calibrados”

Visual requirements:
- Two mode cards that feel like selectable lab modules, not pricing cards.
- Practice card should feel calmer/educational.
- Challenge card should feel higher-energy but not aggressive.
- Use a small circuit preview inside each card.
- Include a lock/coming-soon style only if needed, but avoid making Challenge feel unavailable.

Responsive:
- Mobile: cards stacked.
- Tablet/desktop: two-column layout.

Accessibility:
- Cards must look clickable but should also have clear CTA buttons.
- Strong focus style.
```

## Prompt 3 — LevelScreen

```text
Design the Level screen for Digital Logic Lab.

Use the project DESIGN.md.

Goal: The user should immediately know what to do: toggle inputs, observe the circuit, understand output.

Level example:
- Level title: “Nivel Bajo · Circuito 01”
- Gate: AND
- Learning objective: “AND produce 1 solo cuando A y B están activos.”
- Inputs: A and B
- Current output: 0 or 1

Layout requirements:
- Main circuit board should be the visual center.
- Left/top area: level header, objective, progress.
- Main area: SVG-style circuit with input nodes A/B, AND gate block, wire path, output LED.
- Control area: large toggle buttons A and B with ON/OFF labels.
- Feedback panel: explains current result in Spanish.
- Truth table preview: compact 4-row table with current row highlighted.
- Small educational card: “Regla de la compuerta AND”.

Visual requirements:
- Wires should feel alive when active.
- Gate block should pulse only on input change.
- LED output should have satisfying ON state.
- Do not overload the screen with constant animation.
- Use lab readout panels and technical labels.

Responsive:
- Mobile: header → circuit → controls → feedback → truth table.
- Desktop: circuit large center/left, explanation/truth table side panel.

Accessibility:
- Toggle states must show text, not only color.
- Output must have readable number.
- Feedback must be clear for incorrect state.

Prototype interaction suggestion:
- Include two visual states: unsolved/off and solved/on.
- If the artifact supports interaction, let A/B toggles update the LED and highlighted truth-table row.
```

## Prompt 4 — ResultsScreen

```text
Design the Results screen for Digital Logic Lab.

Use the project DESIGN.md.

Goal: Replace the old alert() ending with a real completion moment that feels rewarding and educational.

Screen content in Spanish:
- Kicker: “Reporte de laboratorio”
- Heading: “Circuitos completados.”
- Summary: “Dominaste las primeras señales y entendiste cómo responden las compuertas base.”
- Stats/readouts:
  - “Circuitos resueltos: 6”
  - “Precisión: 83%”
  - “Mejor señal: XOR”
  - “Tiempo estimado: 04:32”
- Learning recap:
  - AND: “ambas entradas activas”
  - OR: “al menos una entrada activa”
  - XOR: “entradas diferentes”
  - NAND: “inverso de AND”
- Primary CTA: “Continuar entrenando”
- Secondary CTA: “Volver al menú”
- Optional CTA: “Ver tabla de verdad completa”

Visual requirements:
- Feel like a lab report, not a SaaS analytics dashboard.
- Use achievement badge or circuit-calibration seal.
- Include a subtle 2.5D completion card or lab certificate.
- Keep it educational: reward + what was learned.

Responsive:
- Stats stack on mobile.
- Desktop can use dashboard-like readout grid, but avoid generic KPI card style.
```

## Prompt 5 — Full interactive prototype refinement

```text
Refine the prototype into a cohesive navigable flow.

Use the existing Digital Logic Lab design direction and DESIGN.md.

Requirements:
- The four screens should feel like one product, not separate mockups.
- Add consistent top/bottom lab navigation.
- Add clear transition between screens.
- Keep motion sparse and meaningful.
- Make the Level screen the most important screen visually.
- Make all CTAs clear in Spanish.
- Preserve accessibility: contrast, focus, readable labels, reduced motion plan.
- Output should be implementation-realistic in React + TypeScript + SVG + CSS.

Do not add login, backend, leaderboard, multiplayer, or full circuit editor.
```

## Prompt 6 — 3D/2.5D hero asset

```text
Create a 2.5D hero asset concept for Digital Logic Lab.

Use the project DESIGN.md.

Asset goal:
A floating educational circuit board that communicates “interactive logic lab”.

Visual elements:
- Dark circuit slab with cyan traces.
- Input nodes labeled A and B.
- One AND gate module.
- Output LED labeled 1.
- Subtle amber action marker.
- Technical grid shadow below.

Style:
- Retro-futuristic but restrained.
- Clean enough to be translated into SVG/CSS later.
- No photorealistic motherboard.
- No excessive neon.
- No random sci-fi clutter.

Use cases:
- Welcome screen hero.
- Social preview image.
- Portfolio thumbnail.
```

## Prompt 7 — Short video / motion concept

```text
Create a short 6–8 second motion concept for Digital Logic Lab.

Use the project DESIGN.md.

Storyboard:
1. Dark grid appears.
2. Input nodes A and B activate.
3. Cyan signal travels through two wires.
4. AND gate pulses.
5. Output LED flips from 0 to 1.
6. Text appears: “Aprende lógica digital jugando.”

Motion rules:
- Smooth and precise.
- No chaotic camera movement.
- No heavy 3D flythrough.
- The animation should teach the idea of signal flow.
- Must work as a portfolio intro or landing hero animation.

Output target:
- HTML/CSS/SVG motion or video artifact.
- 16:9 and optionally 1:1 crop.
```

## Prompt 8 — Portfolio/social image

```text
Create a portfolio cover image for Digital Logic Lab.

Use the project DESIGN.md.

Format:
- 16:9 hero image.
- Also provide square crop guidance.

Content:
- Product title: “Digital Logic Lab”
- Subtitle: “Aprende compuertas lógicas resolviendo circuitos vivos”
- Show a circuit lab interface with signal rails, input toggles, AND/XOR/NAND modules, output LED, and a truth-table fragment.

Style:
- Premium educational tech.
- Retro-futuristic digital lab.
- Dark background with cyan signal accents.
- Clear, readable, professional.

Avoid:
- generic AI purple gradients;
- stock laptop mockup;
- photorealistic electronics;
- unreadable tiny UI.
```

## Prompt 9 — Critique prompt

Usa este prompt después de generar una variante:

```text
Critique this Digital Logic Lab prototype using five dimensions:

1. Learning clarity
2. Game feel
3. Visual distinctiveness
4. Accessibility
5. Implementation feasibility in React + TypeScript + SVG + CSS

Be strict. Identify what looks generic, what distracts, what may be too heavy, and what should be simplified before implementation.

Then propose the top 5 changes to improve the prototype without losing the Retro-futuristic Digital Lab direction.
```

## Prompt 10 — Handoff prompt for implementation

Usa este cuando ya haya una variante aprobada:

```text
Summarize this approved Digital Logic Lab prototype for implementation.

Output:
1. Screen-by-screen UX spec.
2. Component list.
3. CSS token additions needed.
4. SVG circuit requirements.
5. Responsive behavior at 375, 768, 1024, 1440.
6. Accessibility requirements.
7. Motion requirements and reduced-motion alternatives.
8. What should be implemented in Phase 4 vs deferred to Phase 5/6/7.

Keep the handoff realistic for a Vite + React + TypeScript app.
```

## Qué exportar desde Open Design

Idealmente exportar:

```text
documentation/prototypes/open-design-exports/full-flow.html
documentation/prototypes/open-design-exports/welcome.png
documentation/prototypes/open-design-exports/mode-select.png
documentation/prototypes/open-design-exports/level.png
documentation/prototypes/open-design-exports/results.png
documentation/prototypes/open-design-exports/motion-concept.mp4
```

Si solo puedes exportar screenshots, también sirve.

## Criterios para aprobar una variante

- Se entiende qué hacer en el primer nivel.
- Se ve como producto educativo profesional.
- No parece dashboard SaaS.
- No parece plantilla AI genérica.
- El circuito es protagonista.
- La UI no sacrifica claridad por estética.
- Mobile 375px parece diseñado, no comprimido.
- Motion/3D aportan comprensión o emoción, no ruido.
- Es implementable con React + SVG + CSS sin dependencias pesadas.
