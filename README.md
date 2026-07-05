# Lógica Digital — Digital Logic Lab

**Lógica Digital** es un laboratorio interactivo para aprender compuertas lógicas resolviendo circuitos, siguiendo señales SVG y superando retos con puntos, racha y progreso guardado.

La V2 convierte el juego original en una experiencia educativa más clara, responsive y lista para presentarse como producto de portafolio.

## Vista rápida

| Área | Estado V2 |
| --- | --- |
| Stack | Vite + React + TypeScript |
| Circuitos | SVG responsive |
| Modos | Práctica guiada y reto |
| Tests | Vitest para lógica y flujo principal |
| Deploy | Preparado para Vercel (`dist`) |

## Qué puedes hacer

- Practicar compuertas **AND**, **OR**, **NOT**, **XOR**, **NAND**, **NOR** y **XNOR**.
- Cambiar entradas binarias y ver cómo viaja la señal por el circuito.
- Aprender con feedback educativo y tablas de verdad en modo práctica.
- Jugar un modo reto con tiempo, puntos, racha y resultados.
- Retomar tu avance desde el mismo dispositivo.

## Ejecutar localmente

```sh
npm install
npm run dev
```

Comandos útiles:

```sh
npm run test
npm run lint
npm run build
npm run preview
```

## Deploy en Vercel

URL pública actual:

```text
https://logis-gates-challenge-game.vercel.app/
```

Vercel es el deploy oficial de la V2. GitHub Pages quedó fuera del flujo para evitar mantener dos versiones públicas distintas.

La app es una SPA de Vite. La configuración esperada está en `vercel.json`:

| Campo | Valor |
| --- | --- |
| Framework | `vite` |
| Build command | `npm run build` |
| Output directory | `dist` |

Deploy preview con Vercel CLI:

```sh
vercel deploy . -y
```

## Arquitectura

```text
src/
├── app/              # Orquestación principal de pantallas y progreso
├── components/       # Componentes reutilizables, incluido CircuitBoard SVG
├── core/             # Lógica pura: evaluación, scoring, feedback, progreso
├── data/             # Definición declarativa de niveles y compuertas
├── screens/          # Welcome, selección de modo, niveles y resultados
└── styles/           # Tokens, base, layout y componentes visuales
```

Decisiones principales:

- La lógica de compuertas vive fuera de React para poder testearla sin DOM.
- Los circuitos se renderizan con SVG para mantener claridad visual y buen rendimiento.
- El progreso usa persistencia liviana en el dispositivo; no hay backend, login ni ranking online.
- Las animaciones están limitadas a señales, feedback y comprensión del circuito.

## Calidad esperada

Antes de publicar o abrir PR:

```sh
npm run test
npm run lint
npm run build
npm audit --audit-level=high
git --no-pager diff --check
```

También se recomienda revisar manualmente:

- Mobile: `320px` y `375px`.
- Tablet: `768px`.
- Desktop: `1024px`, `1365px` y `1440px`.
- Consola del navegador sin errores relevantes.
- Navegación con teclado y foco visible.
- Preferencia de movimiento reducido.

## Documentación del rediseño

- Plan maestro: `documentation/v2-product-implementation-plan.md`.
- Análisis inicial del repo: `documentation/repository-analysis.md`.
- Prototipos y planes por pantalla/fase: `documentation/prototypes/`.

## Autor

Desarrollado por **Sam-24-dev** como proyecto educativo de lógica digital.
