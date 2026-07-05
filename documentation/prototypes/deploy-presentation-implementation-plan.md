# Fase 9 — Deploy y presentación profesional

Este plan documenta el cierre de presentación pública para la V2 de **Lógica Digital / Digital Logic Lab**.

## Objetivo

Preparar la app para compartirse como producto educativo profesional: metadata clara, assets públicos, README actualizado, configuración de Vercel y validación de build.

## Open Design

Artifact creado para alinear la dirección visual de presentación:

```text
digital-logic-lab-phase9-presentation.html
```

Uso del artifact:

- Referencia de composición para `social-preview.svg`.
- Copy corto para metadata y README.
- Mantener el estilo retro-futuristic Digital Lab sin añadir dependencias ni animación decorativa.

## Cambios planeados

| Área | Decisión |
| --- | --- |
| Metadata | Título y descripción centrados en laboratorio interactivo de compuertas. |
| Social preview | SVG estático 1200x630 para compartir el producto. |
| Favicon | Icono SVG de circuito/gate consistente con la identidad V2. |
| Vercel | `vercel.json` con build Vite, output `dist` y rewrites SPA. |
| README | Reescritura completa desde V1 a V2 con comandos, arquitectura y deploy. |

## Resultado

URL pública creada por Vercel:

```text
https://logis-gates-challenge-game.vercel.app/
```

Preview final de Fase 9:

```text
https://logis-gates-challenge-game-6fr2amh8d-sam-24-devs-projects.vercel.app
```

Inspect URL del preview final:

```text
https://vercel.com/sam-24-devs-projects/logis-gates-challenge-game/xhieyyDnLAcnS2EN457p8ZD6Echu
```

Nota: el primer deploy con `npx vercel deploy . -y --name logis-gates-challenge-game` creó el proyecto y Vercel lo publicó con alias estable. El flag `--name` aparece como deprecated, pero permitió resolver el rechazo inicial del nombre derivado del directorio.

## Criterios de aceptación

- `npm run build` genera `dist` correctamente.
- `public/favicon.svg`, `public/favicon.ico`, `public/social-preview.svg`, `public/robots.txt` y `public/site.webmanifest` no dan 404 en preview local.
- README ya no describe la V1 vanilla ni GitHub Pages como deploy principal.
- Existe deployment público de Vercel.

## Fuera de alcance

- Auditoría Lighthouse completa.
- PR final.
- Correcciones amplias de accesibilidad/performance. Eso queda para Fase 10.
