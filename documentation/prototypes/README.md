# Prototipos V2

Esta carpeta guarda materiales de Fase 3.5 antes de implementar Fase 4.

## Archivos

- `open-design-prompts.md` — prompts listos para usar en Open Design.
- `welcome-screen-implementation-plan.md` — plan para convertir la WelcomeScreen iterada por MCP a React.

## Dirección prototipo actual

Decisión actual de Fase 3.5:

```text
Base funcional: Open Design v3/v4
Dirección visual: Stitch imagen 1 dark LOGIC_LAB_V1.0
Artifact MCP creado: digital-logic-lab-v4-stitch-refined.html
Welcome recomendado: digital-logic-lab-welcome-v3-mcp.html
```

El artifact `digital-logic-lab-v4-stitch-refined.html` vive en el proyecto local de Open Design:

```text
Digital Logic Lab — DESIGN.md Design System
```

Ruta física conocida:

```text
C:\Users\USER\AppData\Roaming\Open Design\namespaces\release-stable-win\data\projects\brand-digital-logic-lab-design-md-4c16fb\digital-logic-lab-v4-stitch-refined.html
```

Usarlo como referencia visual/UX, no como código final copiado sin revisión.

## Skills recomendadas para Fase 4

| Momento | Skill/recurso |
| --- | --- |
| Evitar sobreingeniería | `ponytail` |
| Construir pantallas con identidad | `frontend-design` |
| Animar títulos/readouts puntuales | `animate-text` |
| Pulir microinteracciones | `emilkowalski-motion` |
| Revisar motion/performance | `gsap-performance` solo si aplica |
| Revisar accesibilidad/UX | `web-design-guidelines` |
| Revisar diff antes de cerrar | `ponytail-review` |
| Validar cambios | `lint-and-validate` |

Regla: primero claridad funcional; después motion mínimo. No agregar dependencias nuevas solo por estética.

## Flujo recomendado

1. Instalar Open Design en Windows.
2. Abrir o vincular este repositorio.
3. Usar `DESIGN.md` de la raíz como design system.
4. Generar prototipo completo con el prompt maestro.
5. Refinar pantalla por pantalla.
6. Exportar HTML/screenshots/video a `open-design-exports/`.
7. Elegir una variante aprobada.
8. Implementar Fase 4 en React usando el prototipo como referencia.

## Regla importante

El prototipo es referencia de producto/diseño. La implementación final debe respetar la arquitectura del repo:

- lógica en `src/core`;
- niveles en `src/data`;
- pantallas/componentes en React;
- circuitos en SVG;
- estilos con CSS tokens propios;
- accesibilidad y responsive obligatorios.
