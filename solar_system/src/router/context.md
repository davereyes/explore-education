# `router/`

Routing con **React Router DOM 7**.

## `AppRouter.tsx`

```tsx
<BrowserRouter>
  <Routes>
    <Route path="/"        element={<ExplorerPage />} />
    <Route path="/compare" element={<Navigate to="/" replace />} />
    <Route path="/core"    element={<Navigate to="/" replace />} />
    <Route path="*"        element={<Navigate to="/" replace />} />
  </Routes>
</BrowserRouter>
```

## Una sola ruta

`/compare` y `/core` eran rutas separadas (`ComparePage.tsx`, `CrossSectionPage.tsx`) pero ahora son **viewModes** dentro del Explorer principal. Mantenemos las URLs como redirect para no romper links viejos / favoritos. Los archivos `pages/ComparePage.tsx` y `pages/CrossSectionPage.tsx` ya fueron eliminados.

Cada planeta tiene su propio viewMode (`'explore' | 'core' | 'compare'`) controlado desde el store. La entrada "Sistema Solar" del sidebar usa otro mecanismo (`systemView: 'strip' | '3d'`).

## Integración con plataforma madre

Cuando este módulo se integre al host:
- Puede vivir como una **ruta hija** dentro del router del host (sin `BrowserRouter` propio) — habría que cambiar a `<Routes>` directo.
- O como **iframe / micro-frontend** — el `BrowserRouter` actual funciona.
- El botón "← Regresar" (`BackToPlatform.tsx`) actualmente hace `history.back()`; al integrar, debe disparar el sistema de navegación del host (postMessage, callback prop, etc.).
