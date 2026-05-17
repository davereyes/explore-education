# `src/`

Código fuente de Cosmos Explorer. Arquitectura: **Atomic Design** + **Zustand** + **React Router** + **R3F**.

## Mapa de dependencias

```
main.tsx (entry)
  └─ AppRouter (router/) — /compare, /core redirigen a /
       └─ ExplorerPage (única ruta activa)
            └─ organisms/
                 ├─ Sidebar          (back, COSMOS, Sistema Solar, planetas, sol)
                 ├─ ExplorerHero     (chrome: título, chips, telemetría, botones)
                 │    └─ HeroCenterView ← router de qué se renderiza al centro:
                 │          ├─ SolarSystem3D (Sistema Solar / vista 3D)
                 │          ├─ ScaleStrip    (Sistema Solar / vista Escala)
                 │          ├─ ComparisonPair (planeta + Comparar)
                 │          └─ PlanetViewer3D (planeta + Explorar/Núcleo)
                 └─ DetailsPanel     ← router del panel derecho:
                      ├─ ExploreDetails (DATOS DEL PLANETA + DATOS CURIOSOS)
                      ├─ CoreDetails    (CAPAS DEL NÚCLEO)
                      └─ CompareDetails (COMPARAR + ¿SABÍAS QUÉ?)

store/useExplorerStore.ts → fuente única de verdad
data/{planets, amazingFacts, solarSystemVisualization}.ts → datos puros
types/planet.ts → contratos compartidos
utils/{telemetry, comparison, statProgress}.ts → helpers puros
```

## Reglas de capas

1. **Atoms**: primitivos puros. No importan moléculas/organismos. **No tocan el store** (si necesitan estado, son molecule).
2. **Molecules**: combinan atoms. Pueden leer del store.
3. **Organisms**: orquestan moléculas. Leen del store, ruedean lógica de UI.
4. **Pages**: componen organisms. Mínima lógica.
5. **Store** es la única fuente de verdad para estado compartido. No `useState` cross-component.

## Carga del CSS

CSS imports explícitos en `main.tsx`. Orden importa porque `dark-theme.css` debe cargar AL FINAL para que sus overrides ganen:

1. `styles/global.css` (importa `tokens.css`)
2. Atoms CSS
3. Molecules CSS
4. Organisms CSS
5. Pages CSS
6. **`styles/dark-theme.css`** (último — overrides para `[data-theme='dark']`)

## Routing de vistas — patrón Open/Closed

Cuando agregues un nuevo "qué se renderiza al centro" (timeline, quiz, etc.):

1. Crear componente nuevo en `organisms/`
2. Registrarlo en `CENTER_VIEW_COMPONENTS` de `HeroCenterView.tsx`
3. Mapear el estado a su id en `resolveCenterViewId`

**No se toca `ExplorerHero.tsx`** — es el patrón ViewRouter / Registry.

Lo mismo para el panel derecho: agrega un componente en `organisms/details/` y un branch en `DetailsPanel.tsx`.

## Estado global

Ver `store/context.md`. Resumido:
- `selectedPlanetId` — qué planeta/entidad se ve (incluye `'sistema-solar'`)
- `comparePartnerId` — segundo planeta del par en Compare
- `viewMode` — `'explore' | 'core' | 'compare'`
- `systemView` — `'strip' | '3d'` (solo aplica si `selectedPlanetId === 'sistema-solar'`)
- `theme` — `'light' | 'dark'`
- `cameraZoom` — zoom global aplicado al centro
- `expandedFactIndex / expandedAmazingId` — qué card está expandida en el panel
