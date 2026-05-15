# `src/components/`

Atomic Design. Cada nivel sube en complejidad. Un componente NUNCA importa de un nivel superior.

```
atoms/        → primitivos sin lógica de negocio (Button, Chip, Badge, etc.)
molecules/    → combinaciones de atoms con propósito (StatRow, PlanetListItem, etc.)
organisms/    → secciones completas con orquestación (Sidebar, ExplorerHero, Planet3DCanvas, etc.)
templates/    → (vacío por ahora) layouts reutilizables
```

## Convención de archivos

Cada componente vive en **dos archivos**:

```
ComponentName.tsx   ← export nombrado, FC<Props>
ComponentName.css   ← BEM con prefijo cosmos-*
```

El CSS se importa en `src/main.tsx`, no en el `.tsx` del componente. Esto mantiene orden de cascade predecible.

## Naming BEM

```
.cosmos-block                    /* bloque raíz */
.cosmos-block__element           /* descendiente */
.cosmos-block__element--modifier /* variante */
.cosmos-block--state             /* estado del bloque */
```

Ejemplos en el repo:
- `.cosmos-planet-item` / `.cosmos-planet-item__name` / `.cosmos-planet-item--selected`
- `.cosmos-stat` / `.cosmos-stat__bar--coral` / `.cosmos-stat__dash--on`

## Reglas de import

| Nivel       | Puede importar de       |
|-------------|-------------------------|
| atoms       | types, utils, framer-motion, react |
| molecules   | atoms + lo anterior     |
| organisms   | molecules + atoms + store + data + lo anterior |
| templates   | organisms + lo anterior |

Si necesitas que un atom acceda al store, **es señal de que debería ser molecule**.
