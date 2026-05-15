# `src/`

Código fuente de Cosmos Explorer. Arquitectura: **Atomic Design** + **Zustand** + **React Router** + **R3F**.

## Mapa de dependencias

```
main.tsx (entry)
  └─ AppRouter (router/)
       └─ pages/ (ExplorerPage, ComparePage, CrossSectionPage)
            └─ organisms/ (Sidebar, ExplorerHero, DetailsPanel, Planet3DCanvas...)
                 └─ molecules/ (PlanetListItem, StatRow, FunFactCard, ThemeToggle...)
                      └─ atoms/ (Button, Chip, Badge, PlanetSphere, BackToPlatform)

store/useExplorerStore.ts → consumido por pages + organisms + molecules
data/planets.ts → consumido por todo lo que necesita datos de planetas
types/planet.ts → contratos de Planet, Moon3D, PlanetRender3D, etc.
utils/statProgress.ts → puro, sin estado, consumido por StatRow
```

## Reglas

1. **Atoms** no importan moléculas ni organismos. Solo pueden depender de tipos, utils y `framer-motion`.
2. **Molecules** combinan atoms. Pueden leer del store.
3. **Organisms** combinan moléculas y orquestan lógica de UI. Leen del store, navegan, etc.
4. **Pages** componen organisms y dan layout. Mínima lógica.
5. **Store** es la única fuente de verdad para estado compartido (planeta seleccionado, theme, comparaciones, etc.). No `useState` cross-component.

## Carga del CSS

Todos los CSS por archivo se importan explícitamente en `main.tsx` (sin CSS modules ni @import por componente) para que el orden sea predecible y los tokens estén disponibles primero.

Order:
1. `styles/global.css` (que importa `tokens.css`)
2. Atoms CSS
3. Molecules CSS
4. Organisms CSS
5. Pages CSS

## Estado global

Ver `store/context.md`. Resumido:
- `selectedPlanetId` — qué planeta se está viendo en el Explorer
- `compareLeft / compareRight` — selección en `/compare`
- `expandedFactIndex` — qué fun fact está expandido
- `theme` — `'light' | 'dark'` (toggle temporal en panel derecho)
