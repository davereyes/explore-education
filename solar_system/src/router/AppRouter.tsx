import type { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ComparePage } from '../pages/ComparePage';
import { CrossSectionPage } from '../pages/CrossSectionPage';
import { ExplorerPage } from '../pages/ExplorerPage';

export const AppRouter: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ExplorerPage />} />
      <Route path="/compare" element={<ComparePage />} />
      <Route path="/core" element={<CrossSectionPage />} />
      <Route path="*" element={<ExplorerPage />} />
    </Routes>
  </BrowserRouter>
);
