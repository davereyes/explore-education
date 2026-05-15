# `store/`

Estado global con **Zustand**. Una sola tienda, sin slices ni middleware por ahora.

## `useExplorerStore.ts`

```ts
{
  selectedPlanetId,      // qué planeta se está viendo en el Explorer
  compareLeft,           // selección izquierda en /compare
  compareRight,          // selección derecha en /compare
  expandedFactIndex,     // qué fun fact está expandido (null = ninguno)
  theme,                 // 'light' | 'dark' — temporal, solo afecta el fondo
  setSelectedPlanet(id),
  setCompareLeft(id),
  setCompareRight(id),
  toggleFact(index),     // toggle (si ya estaba expandido, colapsa)
  setTheme(mode),
}
```

## Reglas

- Selectores granulares en consumidores: `const x = useExplorerStore(s => s.x)` (no `const { x } = useExplorerStore()` para evitar re-renders innecesarios).
- Sin async/effects en la store por ahora — todo es síncrono.
- Si necesitas estado derivado, calcúlalo en el componente (con `useMemo` si es caro).

## Cuándo agregar al store vs `useState` local

- **Store**: si el dato lo lee más de un componente cross-tree, o sobrevive al re-mount (ej: rotación de cámara, planeta seleccionado).
- **useState local**: si es UI ephemeral de un solo componente (ej: hover state, input controlado).
