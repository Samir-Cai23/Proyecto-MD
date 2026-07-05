# Nota previa a Fase 4 — Prototipo, Open Design, npm/pnpm y tooling AI

Fecha: 2026-06-25

## 1. Decisión recomendada

Sí conviene hacer un **prototipo de pantallas antes de implementar Fase 4**.

La Fase 4 construirá pantallas principales reales (`WelcomeScreen`, `ModeSelectScreen`, `LevelScreen`, `ResultsScreen`). Si se implementan directamente sin prototipo, existe riesgo de:

- crear pantallas funcionales pero con composición visual débil;
- repetir patrones genéricos de SaaS;
- rediseñar varias veces componentes ya implementados;
- mezclar decisiones de UX con decisiones de código;
- perder la oportunidad de probar jerarquía visual, flujo y tono antes de producir componentes.

Recomendación:

```text
Fase 3.5 — Prototipo UX/UI antes de Fase 4
```

Esta fase debe ser corta y no destructiva. Puede producir un prototipo estático navegable o un documento de especificación visual, sin reemplazar todavía la arquitectura de pantallas.

## 2. Qué debería prototiparse

Antes de Fase 4, prototipar:

1. `WelcomeScreen`
   - Promesa principal del producto.
   - CTA de iniciar práctica/reto.
   - Tono educativo + juego.

2. `ModeSelectScreen`
   - Diferencia clara entre práctica y reto.
   - Beneficio de cada modo.
   - Señal visual de progreso o desbloqueo.

3. `LevelScreen`
   - Layout base del circuito.
   - Panel de entradas.
   - Output LED.
   - Feedback educativo.
   - Espacio futuro para tabla de verdad.

4. `ResultsScreen`
   - Resultado final sin `alert()`.
   - Resumen de aprendizaje.
   - Score/progreso futuro.
   - CTA para repetir, continuar o volver.

## 3. Open Design investigado

Sitio revisado:

```text
https://open-design.ai/es/
```

Repositorio oficial:

```text
https://github.com/nexu-io/open-design
```

Última release revisada:

```text
open-design-v0.11.0 — The Bazaar
```

Open Design se presenta como una alternativa open source, local-first y agent-native a Claude Design. Puntos relevantes para este proyecto:

- Genera prototipos, artifacts, dashboards, decks, imágenes y video.
- Usa `DESIGN.md` como contrato de sistema visual.
- Tiene app desktop para Windows/macOS.
- Tiene flujo local-first/BYOK.
- Soporta múltiples coding agents y MCP.
- Ofrece design systems, plugins y skills.
- Puede producir artifacts HTML/CSS reales, útiles para handoff a implementación.

## 4. Encaje de Open Design con este proyecto

Open Design puede ser útil para **prototipar la experiencia antes de Fase 4**, especialmente para:

- explorar composición visual sin tocar la app React principal;
- generar 1–2 variantes de layout;
- evaluar jerarquía y narrativa de pantallas;
- convertir la dirección `Retro-futuristic Digital Lab` en un artifact visual más completo;
- producir referencias de interacción para luego implementar manualmente en React.

Pero no debería reemplazar el trabajo de implementación del repo.

Uso recomendado:

```text
Open Design = herramienta de exploración/prototipo
React/Vite repo = implementación final controlada
```

No se recomienda copiar código generado directamente sin revisión. Lo correcto sería usar el prototipo como referencia visual/producto y luego implementar de forma limpia con los componentes del proyecto.

## 5. Recomendación sobre prototipo

Crear una fase intermedia:

```text
Fase 3.5 — Prototipo de experiencia V2
```

Entregables sugeridos:

- `documentation/prototypes/v2-screen-flow-prototype.md`
- opcional: `documentation/prototypes/v2-screen-flow-prototype.html`
- mapa de pantallas
- wireframe textual o visual
- criterios de aceptación para Fase 4
- decisiones de copy/jerarquía
- notas responsive para 375/768/1024/1440

Definition of Done sugerida:

- Flujo completo definido: Welcome → Mode Select → Level → Results.
- Layout de cada pantalla validado conceptualmente.
- Componentes de Fase 4 definidos antes de codificar.
- No se cambia lógica de Fase 2.
- No se reemplaza el sistema visual de Fase 3, solo se extiende.

## 6. Estado npm y vulnerabilidades

Comandos ejecutados:

```sh
npm audit --json
npm audit --audit-level=high
npm outdated --json
npm update
npm run test
npm run lint
npm run build
```

Resultado de seguridad:

```text
0 vulnerabilities
```

El proyecto no tiene vulnerabilidades reportadas por `npm audit` en este momento.

Se ejecutó `npm update`, que actualizó paquetes dentro de los rangos permitidos por `package.json`. Cambio relevante observado:

```text
vite: 7.3.5 → 7.3.6
```

Validación posterior:

- `npm run test`: 17 tests pasan.
- `npm run lint`: pasa.
- `npm run build`: pasa.
- `npm audit --audit-level=high`: 0 vulnerabilidades.

## 7. ¿Conviene migrar a pnpm ahora?

Estado local:

```sh
pnpm --version
```

Resultado:

```text
pnpm: command not found
```

Conclusión:

No conviene migrar a pnpm ahora para este proyecto.

Razones:

- El proyecto es pequeño.
- `npm` ya funciona correctamente.
- `npm audit` está limpio.
- Migrar a pnpm agregaría ruido: lockfile nuevo, instalación de herramienta, posible ajuste de scripts/CI/Vercel.
- La prioridad actual es UX/producto, no optimización del package manager.

Recomendación:

```text
Mantener npm durante V2 inicial.
```

Reevaluar pnpm solo si:

- el repo crece a monorepo;
- se agregan workspaces;
- hay problemas reales de velocidad o reproducibilidad;
- Vercel/CI se configura explícitamente con pnpm;
- el equipo lo prefiere como estándar.

## 8. Dependencias con major updates pendientes

`npm outdated` muestra majors disponibles, pero no se recomienda actualizarlos todavía:

- `vite` 7.x → 8.x
- `@vitejs/plugin-react` 5.x → 6.x
- `eslint` 9.x → 10.x
- `@eslint/js` 9.x → 10.x
- `jsdom` 27.x → 29.x
- `typescript` 5.9.x → 6.x
- `globals` 16.x → 17.x

Motivo para diferir:

- Son cambios major o potencialmente disruptivos.
- No hay vulnerabilidad activa que lo obligue.
- La base actual está validada.
- Actualizarlos ahora podría desviar el objetivo de Fase 4.

Recomendación:

```text
No hacer major upgrades antes de Fase 4 salvo vulnerabilidad real o necesidad técnica.
```

## 9. Engram actualizado

Antes:

```text
engram 1.16.1
```

Después:

```text
engram 1.17.0
```

Comando usado:

```sh
go install github.com/Gentleman-Programming/engram/cmd/engram@latest
```

La release `v1.17.0` incluye mejoras relevantes para setup, sync, relaciones/memoria y soporte de agentes.

## 10. Gentle AI instalado/actualizado

Repositorio:

```text
https://github.com/Gentleman-Programming/gentle-ai
```

Última release revisada:

```text
v1.42.0
```

Se instaló correctamente:

```text
gentle-ai 1.42.0
```

Comando usado:

```sh
go install github.com/gentleman-programming/gentle-ai/cmd/gentle-ai@latest
```

Nota: el primer intento con casing `Gentleman-Programming` falló porque el módulo Go declara el path en minúsculas.

## 11. Gentle AI doctor

Comando:

```sh
gentle-ai doctor
```

Resultado resumido:

- `gentle-ai`: OK.
- `engram`: OK.
- `state.json`: OK, 1 agent instalado: `codex`.
- disco: OK.
- warning: `gga` duplicado en PATH.
- falla esperada: `claude` no está en PATH.
- falla esperada: `opencode` no está en PATH.
- falla: endpoint HTTP de Engram no está corriendo en `localhost:7437`.

Interpretación:

El CLI está instalado, pero el ecosistema no está 100% healthy porque no todos los agents están instalados y el servidor HTTP de Engram no está levantado. Esto no bloquea el trabajo actual en Zed porque Engram funciona vía herramientas MCP disponibles en la sesión.

No se corrigió automáticamente el duplicado de `gga` ni se instalaron Claude/OpenCode porque eso afecta el entorno global del usuario y debe decidirse aparte.

## 12. Skill registry

Comando ejecutado:

```sh
gentle-ai skill-registry refresh
```

Resultado inicial:

```text
Skill registry refreshed (35 skills): .atl/skill-registry.md
```

Después de instalar skills adicionales de diseño/simplificación se refrescó de nuevo:

```text
Skill registry refreshed (42 skills): .atl/skill-registry.md
```

La carpeta `.atl/` está ignorada en `.gitignore`, por lo que no ensucia el repo.

## 13. Skills y recursos investigados para Fase 4

### Instaladas globalmente

Se instalaron como skills globales para Zed/Codex y otros agentes compatibles:

```sh
npx skills add DietrichGebert/ponytail --global --skill '*' --agent '*' --yes
npx skills add pixel-point/animate-text --global --skill animate-text --agent '*' --yes
```

Verificación local:

```text
~/.agents/skills/animate-text/SKILL.md — OK
~/.agents/skills/ponytail/SKILL.md — OK
~/.agents/skills/ponytail-review/SKILL.md — OK
~/.agents/skills/ponytail-audit/SKILL.md — OK
~/.agents/skills/ponytail-debt/SKILL.md — OK
~/.agents/skills/ponytail-gain/SKILL.md — OK
~/.agents/skills/ponytail-help/SKILL.md — OK
```

Notas de instalación:

- La instalación reportó `Safe`, `0 alerts`, `Low Risk` para las skills instaladas.
- Falló solo para agentes `Eve` y `PromptScript` porque no soportan instalación global. No afecta Zed/Codex.

### Cuándo usarlas

| Skill/recurso | Uso recomendado en este proyecto |
| --- | --- |
| `frontend-design` | Diseñar o pulir pantallas React con identidad fuerte, evitando UI genérica. |
| `animate-text` | Elegir una animación de texto concreta para títulos/readouts si aporta claridad o impacto. Usar con moderación. |
| `emilkowalski-motion` | Pulir microinteracciones después de que la pantalla ya exista. No usar para definir todo el sistema. |
| `gsap-performance` | Revisar rendimiento de motion si se usa GSAP/Motion o si una animación se siente pesada. |
| `ponytail` | Mantener Fase 4 simple: menor cantidad de componentes/abstracciones que cumpla el plan. |
| `ponytail-review` | Revisar diffs de Fase 4 para detectar sobreingeniería antes de avanzar a Fase 5. |
| `web-design-guidelines` | Revisión de accesibilidad/UX/responsive antes de cerrar una pantalla. |
| `lint-and-validate` | Validación después de modificar código. |

Regla de uso para Fase 4:

```text
Primero construir pantallas claras y accesibles. Luego añadir motion mínimo. No agregar librerías nuevas por una animación que CSS/WAAPI pueda resolver.
```

### Investigadas pero no instaladas

#### `ui-skills`

Sitio:

```text
https://www.ui-skills.com/
```

CLI documentada:

```sh
npx ui-skills start
npx ui-skills categories
npx ui-skills list --category motion
npx ui-skills get baseline-ui
```

Hallazgo:

- La web funciona como catálogo/router de skills UI.
- Los primeros comandos `npx ui-skills ...` quedaron bloqueados con errores de cache/tar de npm en `_npx`.
- Se ejecutó `npm cache verify`, que verificó y limpió cache.
- Después de eso, la CLI respondió correctamente.
- No se instaló como skill global porque su modelo de uso principal es `npx ui-skills ...`.

Comandos verificados:

```sh
npm cache verify
npx --yes ui-skills@0.2.3 categories
npx --yes ui-skills@0.2.3 list --category motion
npx --yes ui-skills@0.2.3 get baseline-ui
npx --yes ui-skills@0.2.3 get fixing-motion-performance
```

Categorías disponibles observadas:

```text
accessibility, motion, systems, visual, interaction, performance, craft, taste,
typography, color, 3d, frontend, architecture, testing, tooling, video,
nextjs, nuxt, vue, react-native, threejs, remotion, swiftui, frameworks
```

Skills útiles observadas para este proyecto:

| Skill UI | Uso |
| --- | --- |
| `baseline-ui` | Checklist rápido contra UI genérica/slop. Adaptar porque asume Tailwind, y este proyecto usa CSS propio. |
| `fixing-motion-performance` | Reglas buenas para motion: `transform/opacity`, evitar layout thrash, blur grande, scroll polling y loops sin stop. |
| `pbakaus/animate` | Referencia para microinteracciones con propósito. |
| `wshobson/interaction-design` | Referencia para feedback/microinteracciones educativas. |

Uso recomendado:

```text
Usarlo on-demand como catálogo/checklist, no como dependencia del repo. Para Fase 4, preferir nuestras skills locales (`frontend-design`, `animate-text`, `emilkowalski-motion`, `web-design-guidelines`) y consultar `ui-skills` cuando haga falta criterio extra.
```

#### `VoltAgent/awesome-design-md`

Repositorio:

```text
https://github.com/VoltAgent/awesome-design-md
```

Hallazgo:

- Es una colección de `DESIGN.md` de marcas populares.
- Sirve para aprender estructura de design systems y comparar calidad de contratos visuales.
- No conviene copiar una identidad de marca externa para Digital Logic Lab.

Uso recomendado:

```text
Referencia para mejorar `DESIGN.md`, no fuente directa de UI.
```

## 14. Guía de skills para implementar Fase 4

Para Fase 4 usar esta secuencia:

1. `ponytail` mental/default: implementar lo mínimo que cubre las pantallas, sin abstracciones prematuras.
2. `frontend-design`: traducir el prototipo aprobado (`v4` + Stitch imagen 1) a componentes React con identidad propia.
3. `animate-text`: solo si hace falta un efecto de título/readout; preferir efectos breves como line reveal, soft blur in o shared-axis, con `prefers-reduced-motion`.
4. `emilkowalski-motion`: pulir 1–2 microinteracciones útiles después de tener UI funcional.
5. `web-design-guidelines`: revisar accesibilidad, responsive, focus y legibilidad.
6. `ponytail-review`: revisar el diff para borrar complejidad innecesaria antes de cerrar fase.
7. `lint-and-validate`: ejecutar validación.

No usar en Fase 4 salvo necesidad real:

- GSAP como dependencia nueva.
- Motion pesado en cada pantalla.
- `ui-skills` CLI si sigue fallando por cache.
- Plantillas externas que cambien la identidad aprobada.

## 15. Decisión operativa actual: Stitch + Open Design MCP

Flujo recomendado para Fase 3.5/Fase 4:

```text
Stitch = referencia visual
Open Design MCP = prototipado/ajustes directos
Repo React/Vite = implementación final
```

Motivo:

- reduce gasto de tokens frente a encadenar varios agentes generativos;
- permite combinar dirección visual moderna con control técnico del repo;
- mantiene Open Design como apoyo de diseño, no como fuente ciega de código;
- evita doble trabajo entre Zed, Codex/Open Design y la implementación React.

Regla de delegación:

- Por defecto no usar subagentes.
- Solo delegar en tareas extremadamente complejas/riesgosas donde dos revisiones paralelas reduzcan riesgo real.
- Máximo 2 subagentes adicionales.
- Cada subagente debe tener un alcance pequeño, concreto y sin solapamiento.

## 16. Recomendación final antes de Fase 4

Antes de implementar Fase 4, hacer una mini-fase:

```text
Fase 3.5 — Prototipo UX/UI de pantallas principales
```

Objetivo:

- decidir pantalla por pantalla antes de codificar;
- validar copy, layout, jerarquía y navegación;
- usar Open Design como apoyo opcional, no como fuente ciega de código;
- mantener npm por ahora;
- no hacer major upgrades todavía;
- continuar con Engram/Gentle AI ya actualizados.

Después de esa fase, Fase 4 debería implementarse con mucha más precisión y menos retrabajo.
