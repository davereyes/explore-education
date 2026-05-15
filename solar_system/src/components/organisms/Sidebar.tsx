import type { FC } from 'react';
import { PLANET_ORDER, PLANETS } from '../../data/planets';
import { useExplorerStore } from '../../store/useExplorerStore';
import type { PlanetId } from '../../types/planet';
import { BackToPlatform } from '../atoms/BackToPlatform';
import { PlanetListItem } from '../molecules/PlanetListItem';

export const Sidebar: FC = () => {
  const selectedPlanetId = useExplorerStore((s) => s.selectedPlanetId);
  const setSelectedPlanet = useExplorerStore((s) => s.setSelectedPlanet);

  const onSelect = (id: PlanetId) => {
    if (PLANETS[id].available) setSelectedPlanet(id);
  };

  return (
    <aside className="cosmos-sidebar">
      {/* Static top zone: back button + brand card never scroll */}
      <div className="cosmos-sidebar__static">
        <BackToPlatform />
        <header className="cosmos-sidebar__card cosmos-sidebar__brand-card">
          <div className="cosmos-sidebar__logo" aria-hidden>
            <span className="cosmos-sidebar__logo-dot" />
          </div>
          <div className="cosmos-sidebar__brand-text">
            <div className="cosmos-sidebar__brand-name">COSMOS</div>
            <div className="cosmos-sidebar__brand-sub">EXPLORER · MISIÓN 01</div>
          </div>
        </header>
      </div>

      {/* Scrollable zone: planet sections */}
      <div className="cosmos-sidebar__scroll">
        <section className="cosmos-sidebar__card cosmos-sidebar__section">
          <div className="cosmos-sidebar__section-title">Planetas</div>
          <ul className="cosmos-sidebar__list">
            {PLANET_ORDER.map((id) => (
              <li key={id}>
                <PlanetListItem
                  planet={PLANETS[id]}
                  selected={selectedPlanetId === id}
                  onSelect={() => onSelect(id)}
                />
              </li>
            ))}
          </ul>
        </section>

        <section className="cosmos-sidebar__card cosmos-sidebar__section">
          <div className="cosmos-sidebar__section-title">Nuestra Estrella</div>
          <ul className="cosmos-sidebar__list">
            <li>
              <PlanetListItem
                planet={PLANETS.sol}
                selected={selectedPlanetId === 'sol'}
                onSelect={() => onSelect('sol')}
              />
            </li>
          </ul>
        </section>
      </div>
    </aside>
  );
};
