# `molecules/`

Combinaciones de atoms con propósito específico. Pueden leer del store.

## Inventario

| Archivo                | Qué hace |
|------------------------|----------|
| `PlanetListItem.tsx`   | Card de planeta en el sidebar: thumbnail (`PlanetSphere`) + nombre + apodo. Estado seleccionado con tab "ACTIVO" vertical pegado a la derecha. Grid layout en móvil. |
| `StatRow.tsx`          | Una fila de "Datos del planeta": `[icono] LABEL [valor]` + barra de progreso debajo. Usa `computeStatProgress` para calcular fill ratio y tono (teal/coral/muted). |
| `FunFactCard.tsx`      | Card expandible con emoji + título + cuerpo. Animación de altura con framer-motion. Usado en `ExploreDetails`. |
| `AmazingFactCard.tsx`  | Card expandible para "¿Sabías qué?" en `CompareDetails`. Igual que FunFactCard pero con un **banner superior** que muestra los PNG thumbnails de los planetas protagonistas del dato. |
| `PageHeader.tsx`       | Header con botón "← Volver" + eyebrow + título + subtítulo. Hoy solo lo usaban `/compare` y `/core` (rutas deprecadas) — queda disponible para futuras páginas. |
| `ThemeToggle.tsx`      | Switch ☀️ Claro / 🌙 Oscuro. Setea `theme` en el store. Aplica overrides de `dark-theme.css` vía `data-theme` en `.cosmos-explorer`. |
| `ZoomControls.tsx`     | Botones +/− que escriben `cameraZoom` en el store. **Antes vivía en atoms/ pero se movió aquí** porque accede al store (regla atómica). |

## Reglas

- Pueden leer del `useExplorerStore` (selecciones, theme, etc.).
- No deberían hacer side-effects fuera del store.
- Componer atoms, no duplicar su lógica.
