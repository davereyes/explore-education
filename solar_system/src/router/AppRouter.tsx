import type { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ExplorerPage } from '../pages/ExplorerPage';

/**
 * Routing.
 * Las antiguas rutas /compare y /core ahora viven como `viewMode` dentro
 * del Explorer principal — sus URLs redirigen a `/` para mantener links
 * antiguos funcionales.
 */
export const AppRouter: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ExplorerPage />} />
      <Route path="/compare" element={<Navigate to="/" replace />} />
      <Route path="/core" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
