# `router/`

Routing con **React Router DOM 7**.

## `AppRouter.tsx`

```tsx
<BrowserRouter>
  <Routes>
    <Route path="/"        element={<ExplorerPage />} />
    <Route path="/compare" element={<ComparePage />} />
    <Route path="/core"    element={<CrossSectionPage />} />
    <Route path="*"        element={<ExplorerPage />} /> {/* fallback */}
  </Routes>
</BrowserRouter>
```

## Por qué no hay layout compartido

Cada página tiene un layout muy distinto:
- `/` es de pantalla completa con 3 columnas absolute-positioned
- `/compare` y `/core` son single-column con scroll vertical normal

Un `<Outlet />` con layout común complicaría más de lo que ahorra. Si más rutas comparten layout en el futuro, extraemos a `templates/`.

## Integración con plataforma madre

Cuando este módulo se integre al host:
- Puede vivir como una **ruta hija** dentro del router del host (sin `BrowserRouter` propio) — habría que cambiar a `<Routes>` directo.
- O como **iframe / micro-frontend** — el `BrowserRouter` actual funciona.
- El botón "Volver a la plataforma" (`BackToPlatform.tsx`) actualmente hace `history.back()`; al integrar, debe disparar el sistema de navegación del host (postMessage, callback prop, etc.).
