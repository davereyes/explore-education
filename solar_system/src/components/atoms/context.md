# `atoms/`

Primitivos UI. Sin estado de negocio, sin acceso al store, sin lógica de planetas.

## Inventario

| Archivo                | Qué hace |
|------------------------|----------|
| `Button.tsx`           | Botón con variantes `primary` / `secondary` / `ghost`, animado con framer-motion. Acepta icono opcional. |
| `Badge.tsx`            | Tag pequeño en mayúsculas con tono `muted` / `coral` / `teal`. |
| `Chip.tsx`             | Pill con icono + label. Tones: `neutral` / `coral` / `teal` / `warm`. En dark mode todos los tonos se aplanan a liquid-glass uniforme con edge highlight (override en `dark-theme.css`). |
| `PlanetSphere.tsx`     | Esfera CSS con `radial-gradient` o imagen PNG. Usado como fallback cuando no hay thumbnail PNG. Opcional anillo (`withRing`). |
| `BackToPlatform.tsx`   | Botón "← Regresar". Vive arriba del COSMOS card en el sidebar. Por ahora hace `history.back()`; al integrar al host conectaremos a su navegación. |
| `StripNav.tsx`         | Flechas ← / → para navegar horizontalmente el `ScaleStrip` (Sistema Solar / Escala). Aplica `scrollBy` via `document.querySelector` — el strip es global, no se justifica un ref forwarded. |

## Reglas

- **No** importar del store ni de `data/`.
- **No** importar otros componentes.
- Props con interface explícita.
- CSS BEM en archivo gemelo `Component.css`.

## Notas

- `Button` usa `framer-motion` con `motion.button`. Por compatibilidad con TS strict, omitimos las props nativas conflictivas (`onDrag`, `onAnimationStart`, etc.) del `ButtonHTMLAttributes` para que no colisionen con las props de framer.
- `ZoomControls` **vivía aquí pero se movió a `molecules/`** porque accede al store (regla: si un átomo necesita el store, es molécula).
