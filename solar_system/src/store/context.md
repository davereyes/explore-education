# `store/`

Estado global con **Zustand**. Una sola tienda, sin slices ni middleware por ahora.

## `useExplorerStore.ts`

### Estado

```ts
{
  // ====== Selección / navegación ======
  selectedPlanetId,        // 'mercurio' | 'venus' | … | 'sol' | 'sistema-solar'
  comparePartnerId,        // segundo planeta del par en Compare (default 'tierra')
  viewMode,                // 'explore' | 'core' | 'compare'
  systemView,              // 'strip' | '3d'  (solo aplica cuando selectedPlanetId === 'sistema-solar')

  // ====== Theming ======
  theme,                   // 'light' | 'dark'

  // ====== Vista 3D ======
  cameraZoom,              // factor de escala aplicado al centro

  // ====== Expansion / UI ephemeral compartida ======
  expandedFactIndex,       // qué FunFact (Explore) está expandido
  expandedAmazingId,       // qué AmazingFact (Compare) está expandido
}
```

### Acciones

```ts
setSelectedPlanet(id)                  // cambia planeta + reset zoom + viewMode='explore'
setComparePartner(id)                  // cambia solo el partner del par
setComparisonPair(a, b)                // ATÓMICO: cambia ambos + viewMode='compare' + reset zoom
setViewMode(mode)                      // al entrar en 'compare' resetea partner al default
setSystemView(view)                    // 'strip' | '3d'
setTheme(mode)
toggleFact(index)
toggleAmazingFact(id)
zoomIn() / zoomOut()                   // escala * ZOOM_STEP, clamp [ZOOM_MIN, ZOOM_MAX]
```

### Comportamientos importantes

- **Cambiar planeta**: `setSelectedPlanet` también resetea `viewMode='explore'` y `cameraZoom=1`. Si vienes de compare/core, vuelves a la vista normal del nuevo planeta.
- **Entrar a Compare**: `setViewMode('compare')` siempre resetea `comparePartnerId` al default (Tierra para todos; Marte si el actual es Tierra). Así nunca se queda "pegado" un partner manual.
- **Default partner**: `getDefaultPartner(id)` en `utils/comparison.ts`.
- **Initial state (home)**: arranca en `selectedPlanetId: 'sistema-solar'` + `systemView: '3d'` — primera impresión potente del sistema completo.

## Reglas

- Selectores granulares en consumidores: `useExplorerStore(s => s.x)` (NO desestructurar todo).
- Sin async/effects en la store — todo síncrono.
- Si necesitas estado derivado, calcúlalo en el componente (con `useMemo` si es caro).

## Cuándo agregar al store vs `useState` local

- **Store**: si el dato lo lee más de un componente cross-tree, o sobrevive al re-mount (ej: planeta seleccionado, zoom, expanded facts).
- **useState local**: si es UI ephemeral de un solo componente (hover state, drag handle, input controlado).
