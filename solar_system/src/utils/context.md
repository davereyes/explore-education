# `utils/`

Helpers puros sin estado ni side-effects. Cada función es testeable de forma aislada.

## `statProgress.ts`

`computeStatProgress(stat: PlanetStat): { filled, total, tone }`

Heurística para decidir cuántas de las 10 rayitas de la barra de progreso se rellenan, y de qué color (`teal` / `coral` / `muted`), basándose en el `label` y `value` del stat.

**No es estricto científicamente.** Solo busca visualizar magnitud relativa y resaltar valores extremos (gravedad muy alta → coral, atmósfera de "Traza" → muted gris, campo magnético "Muy fuerte" → 10 rayitas teal, etc.).

Reglas heurísticas por label:

| Label             | Domain              | Tone si extremo |
|-------------------|---------------------|-----------------|
| Gravedad          | 0–30 m/s²           | coral si > 15   |
| Atmósfera         | 0–100%              | muted si traza  |
| Temperatura       | -500 → +500 °C abs  | coral si |T| > 100 |
| Día               | 0–250 días          | teal            |
| Año               | 0–200 años          | teal            |
| Distancia al Sol  | 0–5,000 M km        | muted (siempre) |
| Lunas             | log(n+1) × 5        | muted si 0      |
| Campo magnético   | texto → 0/1/2/5/7/10 | muted si débil |

Si quieres agregar un nuevo tipo de stat, añade un `case` en el `if` con su lógica. El default es `filled: 5, tone: 'teal'`.
