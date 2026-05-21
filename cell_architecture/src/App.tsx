import { Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from '@/presentation/context/LanguageContext';
import StudioPage from '@/presentation/components/pages/StudioPage/StudioPage';

export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<StudioPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LanguageProvider>
  );
}
