# `types/`

Contratos TypeScript compartidos por múltiples archivos. Cuando un tipo se usa solo dentro de un componente, vive inline en el `.tsx`.

## `planet.ts`

Tipos centrales de planetas y escena 3D.

- `PlanetId` — union literal de los 9 cuerpos (`'mercurio' | ... | 'sol'`).
- `PlanetStat` — entrada en el panel de "Datos del planeta": `{ label, value, unit?, icon }`.
- `FunFact` — tarjeta expandible de datos curiosos: `{ emoji, title, body }`.
- `CoreLayer` — capa interna del planeta (para `/core`): radios + nombre + summary kid-friendly + detail educativo.
- `Moon3D` — luna renderizable: `{ name, radius, orbitRadius, orbitPeriodSec, tint? }`.
- `PlanetRender3D` — config de escena 3D: textura, clouds, rings, tilt, rotación, scale, lunas.
- `Planet` — el contrato completo de un planeta, con todos los anteriores opcionales (porque algunos cuerpos no tienen `funFacts` o `render3D`).

## Reglas

- No incluir tipos derivados / utilitarios genéricos (`type X = Y[K]` etc) aquí — esos van inline cerca de donde se usan.
- Cambios a `PlanetId` requieren actualizar `data/planets.ts` y `PLANET_ORDER`.
