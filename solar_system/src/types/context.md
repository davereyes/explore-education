# `types/`

Contratos TypeScript compartidos por múltiples archivos. Cuando un tipo se usa solo dentro de un componente, vive inline en el `.tsx`.

## `planet.ts`

Tipos centrales de planetas, escena 3D y "¿Sabías qué?".

- **`PlanetId`** — union literal de **10 entradas**: los 8 planetas + `'sol'` + `'sistema-solar'` (entrada macro virtual del sidebar).
- **`PlanetStat`** — fila en "Datos del planeta": `{ label, value, unit?, icon }`.
- **`FunFact`** — card de datos curiosos del planeta: `{ emoji, title, body }`.
- **`AmazingFact`** — card de "¿Sabías qué?" en Compare: `{ id, emoji, title, body, bannerPlanetIds, accent }`. El banner usa los PNG thumbnails de los planetas indicados.
- **`CoreLayer`** — capa interna del planeta para vista de núcleo: radios + colores + summary kid-friendly + detail educativo.
- **`Moon3D`** — luna renderizable: `{ name, radius, orbitRadius, orbitPeriodSec, tint? }`.
- **`PlanetRender3D`** — config de la escena 3D del planeta: texturas, anillos, tilt, rotación, scale, opciones emisivas (caso Sol), lunas.
- **`Planet`** — contrato completo. Todos los campos secundarios son opcionales porque algunos cuerpos no aplican (ej: Sistema Solar no tiene `render3D` o `coreLayers`). Campos clave:
  - `thumbnailUrl?` — PNG redondo (o cuadrado si `thumbnailShape: 'square'` para Saturno con anillos)
  - `titleColor?` — versión vibrante del color del planeta usada SOLO para el título del hero (los `color`/`colorAccent` naturales son demasiado tenues sobre el fondo oscuro)
  - `coreLayers?` — si está poblado, "Ver núcleo" se habilita
  - `render3D?` — si está poblado, el viewer monta una escena R3F; si no, fallback CSS

## Reglas

- No incluir tipos derivados / utilitarios genéricos (`type X = Y[K]` etc) aquí — esos van inline cerca de donde se usan.
- Cambios a `PlanetId` requieren actualizar `data/planets.ts` y `PLANET_ORDER`.
- Tipos de UI puramente locales (estado de un componente, props específicas) NO van aquí — quedan junto al componente.
