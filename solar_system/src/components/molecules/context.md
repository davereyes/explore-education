# `molecules/`

Combinaciones de atoms con propósito específico. Pueden leer del store.

## Inventario

| Archivo                | Qué hace |
|------------------------|----------|
| `PlanetListItem.tsx`   | Card de planeta en el sidebar: thumbnail (`PlanetSphere`) + nombre + apodo. Estado seleccionado con tab "ACTIVO" vertical pegado a la derecha. Grid layout en móvil. |
| `StatRow.tsx`          | Una fila de "Datos del planeta": `[icono] LABEL [valor]` + barra de progreso punteada debajo. Usa `computeStatProgress` para calcular cuántas rayitas se rellenan y de qué color (teal/coral/muted). |
| `FunFactCard.tsx`      | Card expandible con emoji + título + cuerpo. Animación de altura con framer-motion. |
| `PageHeader.tsx`       | Header para `/compare` y `/core`: botón "← Volver" + eyebrow + título + subtítulo. |
| `ThemeToggle.tsx`      | Switch ☀️ Claro / 🌙 Oscuro. Setea `theme` en el store. Temporal — actualmente solo afecta el fondo del Explorer. |

## Reglas

- Pueden leer del `useExplorerStore` (selecciones, theme, etc.).
- No deberían hacer side-effects fuera del store.
- Componer atoms, no duplicar su lógica.
