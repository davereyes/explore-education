# `pages/`

Una sola página activa. Las antiguas `/compare` y `/core` ahora viven como `viewMode` dentro del Explorer.

## Rutas

| Ruta        | Página                 | Qué hace |
|-------------|------------------------|----------|
| `/`         | `ExplorerPage.tsx`     | Vista principal: 3 columnas (Sidebar / Hero / DetailsPanel). Toda la app vive aquí. |
| `/compare`  | redirige a `/`         | Ruta deprecada. La función ahora es un viewMode en el Explorer. |
| `/core`     | redirige a `/`         | Ídem. |

## Layout pattern de `ExplorerPage`

Absolute-positioning con sidebar flotante a la izquierda, panel flotante a la derecha, y main al fondo:

- `.cosmos-explorer` = capa relativa con el fondo espacial + starfield SVG (theme-agnostic, siempre dark).
- Sidebar y DetailsPanel son hijos directos con `position: absolute` y su propio `top/bottom/left/right`.
- `.cosmos-explorer__main` con `inset: 0` cubre todo; dentro va el hero.
- El "centro" del hero vive en una capa absolute con z-index: 0, y el contenido textual está en z-index: 2.
- El centro CONSTRAÑE al área visible (margins que evitan los paneles flotantes) para ciertos modos: ScaleStrip y SolarSystem3D, vía margin-left/right calculados.

## Responsive

- Desktop (>1180px): layout completo de 3 columnas.
- Tablet (≤1180px): se oculta DetailsPanel, sidebar mantiene.
- Móvil (≤820px): todo se apila vertical, sidebar pasa a grid 2×2 de planetas.

## Reglas

- Páginas hacen mínima lógica — componen organisms y leen del store.
- Si una página crece > 100 líneas, considera extraer organisms.
