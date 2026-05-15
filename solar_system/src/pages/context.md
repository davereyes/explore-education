# `pages/`

Las tres rutas top-level. Cada página tiene su CSS gemelo.

## Rutas

| Ruta        | Página                 | Qué hace |
|-------------|------------------------|----------|
| `/`         | `ExplorerPage.tsx`     | Vista principal: 3 columnas (Sidebar | Hero con planeta 3D | DetailsPanel). |
| `/compare`  | `ComparePage.tsx`      | Comparación de tamaños a escala real proporcional. Strip horizontal scrollable con los 9 cuerpos + comparador side-by-side + 4 datos asombrosos. |
| `/core`     | `CrossSectionPage.tsx` | Sección transversal de Marte (corteza, manto, núcleo) con SVG concéntrico + panel lateral de detalles. |

## Layout patterns

### `ExplorerPage`
Layout absolute-positioning con sidebar flotante a la izquierda, panel flotante a la derecha, y main al fondo:

- `.cosmos-explorer` = capa relativa con el fondo (gradiente o espacio + estrellas según `data-theme`).
- Sidebar y DetailsPanel son hijos directos con `position: absolute` y su propio `top/bottom/left/right`.
- `.cosmos-explorer__main` con `inset: 0` cubre todo, dentro va el hero.
- El planeta 3D vive en una capa absolute del hero con z-index: 0, y el contenido textual está en z-index: 2.

### `ComparePage` y `CrossSectionPage`
Layout flexible single-column con `PageHeader` arriba y secciones apiladas, scroll vertical normal.

## Responsive

- Desktop (>1180px): layout completo de 3 columnas
- Tablet (≤1180px): se oculta `DetailsPanel`, sidebar mantiene
- Móvil (≤820px): todo se apila vertical, sidebar pasa a grid 2×2 de planetas

## Reglas

- Páginas hacen mínima lógica — componen organisms y leen del store.
- Si una página crece > 100 líneas, considera extraer organisms.
