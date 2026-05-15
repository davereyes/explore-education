import type { FC } from 'react';
import { getPlanet } from '../data/planets';
import { useExplorerStore } from '../store/useExplorerStore';
import { DetailsPanel } from '../components/organisms/DetailsPanel';
import { ExplorerHero } from '../components/organisms/ExplorerHero';
import { Sidebar } from '../components/organisms/Sidebar';

export const ExplorerPage: FC = () => {
  const selectedPlanetId = useExplorerStore((s) => s.selectedPlanetId);
  const theme = useExplorerStore((s) => s.theme);
  const planet = getPlanet(selectedPlanetId);

  return (
    <div className="cosmos-explorer" data-theme={theme}>
      <Sidebar />
      <main className="cosmos-explorer__main">
        <ExplorerHero planet={planet} />
      </main>
      <DetailsPanel planet={planet} />
    </div>
  );
};
