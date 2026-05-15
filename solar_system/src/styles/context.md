# `styles/`

Estilos globales y design tokens. **No** vive aquí CSS de componentes individuales — ese vive junto a su `.tsx`.

## Archivos

### `tokens.css`

Single source of truth para todos los valores de diseño. **Todo** se referencia con `var(--cosmos-*)`.

Grupos de tokens:
- **Color palette**: `bg`, `ink`, `line`, brand (coral / teal), planet accents, semantic (warning, info, purple)
- **Typography**: families (display, body, mono), sizes (xs → 4xl), weights, leading
- **Spacing**: escala de 4px (space-1 = 4px, space-2 = 8px, ..., space-10 = 64px)
- **Radii**: xs (6) / sm (10) / md (14) / lg (20) / xl (28) / pill (9999)
- **Shadows**: xs / sm / md / lg + glow-coral / glow-teal
- **Motion**: ease curves + duraciones (fast 140ms, base 240ms, slow 420ms)
- **Layout**: sidebar-width, rail-width, touch-min

### `global.css`

Reset mínimo + imports de fuentes (Space Grotesk, Inter, JetBrains Mono desde Google Fonts) + reglas globales:
- Box-sizing border-box
- Body fill viewport sin scroll
- Scrollbar styling
- Buttons reset
- Helper `.cosmos-mono` para texto monoespaciado (números tabulares, telemetría)

## Reglas

- **No hardcodear hex** en componentes. Si necesitas un color nuevo, agrégalo a `tokens.css`.
- **No usar `px` directos** para spacing — usa `var(--cosmos-space-N)`.
- Si un valor se va a repetir > 2 veces, es candidato a token.
- Fuentes solo cargadas en `global.css` (no en componentes individuales).
