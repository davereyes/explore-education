import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import './components/atoms/BackToPlatform.css';
import './components/atoms/Badge.css';
import './components/atoms/Button.css';
import './components/atoms/Chip.css';
import './components/atoms/PlanetSphere.css';
import './components/atoms/StripNav.css';
import './components/atoms/ZoomControls.css';
import './components/molecules/AmazingFactCard.css';
import './components/molecules/FunFactCard.css';
import './components/molecules/PageHeader.css';
import './components/molecules/PlanetListItem.css';
import './components/molecules/StatRow.css';
import './components/molecules/ThemeToggle.css';
import './components/organisms/ComparisonInfoCard.css';
import './components/organisms/ComparisonPair.css';
import './components/organisms/DetailsPanel.css';
import './components/organisms/ExplorerHero.css';
import './components/organisms/PlanetViewer3D.css';
import './components/organisms/ScaleStrip.css';
import './components/organisms/Sidebar.css';
import './components/organisms/SolarSystem3D.css';
import './pages/ExplorerPage.css';
// Dark-mode liquid-glass overrides for the cards (sidebar, details panel,
// theme toggle, etc.). Must load LAST so it overrides base component styles.
import './styles/dark-theme.css';
import { AppRouter } from './router/AppRouter';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);
