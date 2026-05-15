# `atoms/`

Primitivos UI. Sin estado de negocio, sin acceso al store, sin lógica de planetas.

## Inventario

| Archivo            | Qué hace |
|--------------------|----------|
| `Button.tsx`       | Botón con variantes `primary` / `secondary` / `ghost`, animado con framer-motion. Acepta icono opcional. |
| `Badge.tsx`        | Tag pequeño en mayúsculas con tono `muted` / `coral` / `teal`. |
| `Chip.tsx`         | Pill con icono + label (usado en quick facts del hero). |
| `PlanetSphere.tsx` | Esfera CSS con `radial-gradient` simulando iluminación. Usado en thumbnails del sidebar y en `/compare`. Opcional anillo (`withRing`). |
| `BackToPlatform.tsx` | Botón "← Volver a la plataforma". Vive en el sidebar (zona estática). Por ahora hace `history.back()`; al integrar al host conectaremos a su navegación. |

## Reglas

- **No** importar del store ni de `data/`.
- **No** importar otros componentes.
- Props con interface explícita.
- CSS BEM en archivo gemelo `Component.css`.

## Notas

`Button` usa `framer-motion` con `motion.button`. Por compatibilidad con TS strict, omitimos las props nativas conflictivas (`onDrag`, `onAnimationStart`, etc.) del `ButtonHTMLAttributes` para que no colisionen con las props de framer.
