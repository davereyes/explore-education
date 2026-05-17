# `utils/`

Helpers puros sin estado ni side-effects. Cada función es testeable de forma aislada.

## Archivos

| Archivo            | Contenido |
|--------------------|-----------|
| `statProgress.ts`  | `computeStatProgress(stat)` — heurística para fill ratio y tono de la barra en `StatRow`. |
| `telemetry.ts`     | `getSectorCode(id)` y `getDistanceAU(planet)` — textos de la telemetría del hero ("SECTOR SOL-04 · DIST 1.52 UA"). |
| `comparison.ts`    | `getDefaultPartner(id)`, `getPairMetaphor(a,b)`, `getPlanetTip(p)`, `compareRows(a,b)` + `COMPARABLE_IDS` — helpers para la vista Comparar. |

## `comparison.ts` — detalles

- **`getDefaultPartner(id)`**: devuelve `'tierra'` siempre, EXCEPTO cuando `id === 'tierra'` → devuelve `'marte'`. La Tierra es la referencia natural para que un niño dimensione cualquier otro planeta.
- **`getPairMetaphor(a, b)`**: tabla `PAIR_METAPHORS` de metáforas kid-friendly por pareja. Si no hay específica, genera con ratio de diámetros.
- **`getPlanetTip(p)`**: una línea memorable por planeta.
- **`compareRows(a, b)`**: extrae 7 stats clave (diámetro, gravedad, temperatura, día, año, lunas, distancia) y los formatea para tabla side-by-side.

## `statProgress.ts` — detalles

Devuelve `{ filled, total, tone }` con `filled ∈ [0, 10]`, `tone ∈ 'teal' | 'coral' | 'muted'`.

| Label             | Domain                   | Tone si extremo    |
|-------------------|--------------------------|--------------------|
| Gravedad          | 0–30 m/s²                | coral si > 15      |
| Atmósfera         | 0–100% (parsea hex)      | muted si "traza"   |
| Temperatura       | -500 → +500 °C abs       | coral si |T| > 100 |
| Día / Rotación    | 0–250 días               | teal               |
| Año / Edad        | normalize a días (log)   | teal               |
| Distancia al Sol  | 0–5,000 M km (log)       | muted (siempre)    |
| Lunas             | clamp directo            | muted si 0         |
| Campo magnético   | texto → 0/1/2/5/7/10     | muted si débil     |

Si quieres añadir un nuevo tipo de stat, agrega un `case` con su lógica. Default es `filled: 5, tone: 'teal'`.

## `telemetry.ts` — detalles

- `getSectorCode(id)`: convierte `PlanetId` → string tipo "SOL-04" (basado en orden del array PLANET_ORDER + 1, cero-padded). El Sol = "SOL-00", Sistema Solar no aplica.
- `getDistanceAU(planet)`: lee `stats[].label === 'Distancia al Sol'` del planeta y lo convierte de M km a Unidades Astronómicas.
