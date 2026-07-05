# WelcomeScreen — Plan de implementación desde prototipo MCP

Fecha: 2026-06-28

## Estado

La primera pantalla fue iterada con Open Design MCP en 3 rondas máximas, usando Stitch imagen 1 como dirección visual y `digital-logic-lab-v4-stitch-refined.html` como base de experiencia.

Artifact recomendado para implementar:

```text
digital-logic-lab-welcome-v3-mcp.html
```

URL local cuando Open Design MCP esté activo:

```text
http://127.0.0.1:64570/api/projects/brand-digital-logic-lab-design-md-4c16fb/raw/digital-logic-lab-welcome-v3-mcp.html
```

## Iteraciones realizadas

| Iteración | Archivo | Resultado |
| --- | --- | --- |
| 1 | `digital-logic-lab-welcome-v1-mcp.html` | Mejoró identidad Stitch-like, pero en ~1024px apilaba demasiado pronto. |
| 2 | `digital-logic-lab-welcome-v2-mcp.html` | Mejoró responsive, pero en 1440px el título quedaba demasiado alto. |
| 3 | `digital-logic-lab-welcome-v3-mcp.html` | Versión recomendada: hero compacto, split estable en 1024/1440 y móvil legible. |

## Dirección aprobada para esta pantalla

```text
Retro-futuristic Digital Lab · LOGIC_LAB_V1.0
```

Debe sentirse como:

- laboratorio digital;
- circuito vivo;
- consola técnica compacta;
- producto educativo serio;
- no SaaS genérico.

Anchor memorable:

```text
Hero split con copy técnico a la izquierda y PCB/circuit preview vivo a la derecha.
```

## Copy recomendado

Título:

```text
Domina lógica digital con circuitos vivos.
```

Lead:

```text
Activa entradas binarias, mira cómo viaja la señal y entiende por qué una compuerta entrega 0 o 1. Cada intento convierte teoría en feedback visual.
```

CTA principal:

```text
Iniciar laboratorio →
```

CTA secundario:

```text
Ver demo lógica
```

Microcopy:

```text
Modo práctica primero · reto y score después
```

## Estructura React sugerida

Implementar en Fase 4 con cambios mínimos:

```text
src/screens/WelcomeScreen.tsx
```

Si hace falta separar solo una pieza reusable:

```text
src/components/HeroCircuitPreview.tsx
```

Evitar crear más componentes todavía. `ponytail`: si solo se usa una vez y no estorba, mantenerlo dentro de `WelcomeScreen`.

## CSS / tokens a reutilizar

Usar tokens existentes de Fase 3 cuando existan equivalentes:

- fondo oscuro + grid;
- acento cian para señal;
- amarillo/amber para CTA principal;
- verde para salida activa;
- mono para labels técnicos;
- display técnica para título.

Si falta algún token, agregar el mínimo necesario en los CSS de Fase 3. No introducir Tailwind/shadcn ni dependencia visual nueva.

## Responsive plan

### Desktop — 1440px

Objetivo:

- hero visible completo above-the-fold;
- layout split estable;
- título grande, pero sin empujar CTA fuera del viewport;
- circuito visual dominante sin tapar la jerarquía del copy.

Parámetros desde v3:

- grid aproximado: `0.9fr / 1.1fr`;
- `h1` máximo alrededor de `6.25rem`;
- panel visual máximo alrededor de `560px` de alto;
- topbar compacto.

### Laptop/tablet horizontal — 1024px

Objetivo:

- mantener split en 1024px;
- no apilar antes de tiempo;
- botones y chips deben quedar visibles;
- circuito reducido pero legible.

Parámetros desde v3:

- breakpoint de apilado cerca de `920px`, no `1060px`;
- copy mínimo `430px`;
- panel mínimo `420px`;
- nav aún visible a 1024px si cabe.

### Tablet vertical — 768px

Objetivo:

- apilar copy arriba y circuito abajo;
- mantener ritmo compacto;
- evitar cards gigantes;
- CTA principal visible antes del circuito.

Regla:

- usar una sola columna bajo `920px`;
- panel alrededor de `450px`;
- reducir gaps, no reducir demasiado la tipografía.

### Mobile — 375px

Objetivo:

- lectura clara;
- CTAs full-width;
- sin overflow horizontal;
- circuito como preview, no como interacción completa todavía.

Parámetros desde v3:

- `h1` entre `2.5rem` y `4.2rem`;
- botones full-width;
- ocultar readout strip superior del panel;
- truth mini en 2 columnas;
- panel alrededor de `345px`.

## Motion plan

Usar motion mínimo y útil:

1. Entrada del copy tipo `soft-blur-in` / reveal breve.
2. Entrada del panel con `translateY + opacity`.
3. Señal del circuito con `stroke-dashoffset`.

Reglas:

- respetar `prefers-reduced-motion`;
- usar CSS primero;
- no agregar GSAP/Motion para esta pantalla;
- no animar todo constantemente, solo la señal y la entrada inicial.

## Accesibilidad

Checklist para implementación:

- `main` con `section aria-labelledby`;
- `h1` único;
- SVG con `role="img"` y `aria-label` descriptivo;
- nav decorativa marcada correctamente si no es funcional todavía;
- focus visible para CTAs;
- contraste suficiente en cian/amber;
- no depender solo del color: labels `A:1`, `B:1`, `OUT:1`, truth mini.

## Validación requerida al implementar

Comandos:

```sh
npm run test
npm run lint
npm run build
git --no-pager diff --check
```

Manual:

- 375px: sin overflow horizontal, CTAs full-width, texto legible;
- 768px: una columna ordenada;
- 1024px: split todavía estable;
- 1440px: hero above-the-fold;
- consola sin errores relevantes;
- focus visible con teclado;
- reduced motion activo.

## Pendientes antes de código

- Confirmar si el botón secundario `Ver demo lógica` debe ir a `LevelScreen` o a una mini demo dentro de Welcome.
- Definir si el brand final queda como `LOGIC_LAB_V1.0` o `DIGITAL_LOGIC_LAB`.
- Al pasar a React, conectar CTA principal a `ModeSelectScreen`.
