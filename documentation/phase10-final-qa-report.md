# Fase 10 — QA final, accesibilidad, performance y PR

## Resultado

La V2 queda lista para revisión final como producto público en Vercel.

URL oficial Vercel:

```text
https://logis-gates-challenge-game.vercel.app/
```

Preview de Fase 9 usado como referencia:

```text
https://logis-gates-challenge-game-6fr2amh8d-sam-24-devs-projects.vercel.app
```

## Decisiones de cierre

| Tema | Decisión |
| --- | --- |
| Deploy oficial | Vercel es la única URL pública recomendada para V2. |
| GitHub Pages | Desactivado para evitar mantener dos versiones públicas distintas. |
| Archivos V1 | Eliminados del árbol principal: `Proyecto MD.js`, `styles.css`, `assets/`. |
| Accesibilidad SPA | Agregado skip link y foco programático al título principal al cambiar pantalla/nivel. |
| Producción | No hacer merge directo a `main`; preparar PR desde `feature/ui-ux-v2`. |

## Lighthouse local

Ejecutado contra preview local `http://127.0.0.1:4173/` con build de producción.

| Categoría | Score |
| --- | ---: |
| Performance | 90 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

No hubo fallos binarios en Lighthouse.

## QA manual/automatizado en navegador

Validado con Playwright/browser MCP:

- Responsive sin overflow horizontal en `320x720`, `375x812`, `768x1024`, `1024x768`, `1365x646`, `1440x900`.
- Targets interactivos principales y skip link con mínimo `44px`.
- Consola sin warnings/errors.
- `favicon.svg`, `favicon.ico`, `social-preview.svg`, `robots.txt` y `site.webmanifest` responden `200` localmente.
- Un solo `h1` y un `main` por pantalla renderizada.
- SVGs informativos con `role="img"` tienen `aria-label`.
- Copy interna prohibida ausente en UI principal: `registro local`, `mejor local`, `navegador`, `storage`, `sin tabla de verdad`.
- Reduced motion clamped a `0.001ms` desde CSS global.
- Skip link enfoca el `h1` correspondiente.
- Cambios SPA enfocan el título de la nueva pantalla.

## Comandos de validación

```sh
npm run test
npm run lint
npm run build
npm audit --audit-level=high
git --no-pager diff --check
```

Resultados esperados al cierre:

- Tests: `34 passed`.
- Lint: sin errores.
- Build: genera `dist` correctamente.
- Audit: `0 vulnerabilities`.
- `git diff --check`: solo puede mostrar el warning esperado de CRLF en `index.html`.

## Pendiente operativo

- Commit y push de `feature/ui-ux-v2`.
- Crear PR final hacia `main` con resumen, checklist y URL Vercel.
- Después del merge, Vercel debe publicar producción desde GitHub.
