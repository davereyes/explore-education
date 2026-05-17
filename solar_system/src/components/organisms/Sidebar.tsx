import { motion } from 'framer-motion';
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

  const isSystemSelected = selectedPlanetId === 'sistema-solar';

  return (
    <aside className="cosmos-sidebar">
      {/* Static top zone: back button + brand card + system shortcut never scroll */}
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

        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('sistema-solar')}
          aria-pressed={isSystemSelected}
          className={`cosmos-sidebar__card cosmos-sidebar__brand-card cosmos-sidebar__system-card${
            isSystemSelected ? ' cosmos-sidebar__system-card--selected' : ''
          }`}
        >
          <SystemSolarIcon />
          <div className="cosmos-sidebar__brand-text">
            <div className="cosmos-sidebar__brand-name">SISTEMA SOLAR</div>
            <div className="cosmos-sidebar__brand-sub">VISTA GENERAL</div>
          </div>
          {isSystemSelected && (
            <span className="cosmos-sidebar__system-tab" aria-hidden>
              ACTIVO
            </span>
          )}
        </motion.button>
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

/**
 * Vista top-down del sistema solar: sol grande al centro + 3 órbitas
 * concéntricas con planetitas en cada una. Mismo tamaño y proporciones
 * que el logo COSMOS.
 */
const SystemSolarIcon: FC = () => (
  <div className="cosmos-sidebar__system-icon" aria-hidden>
    <svg viewBox="0 0 44 44" width="44" height="44">
      {/* Orbits */}
      <circle cx="22" cy="22" r="10" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="0.6" />
      <circle cx="22" cy="22" r="15" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.6" />
      <circle cx="22" cy="22" r="20" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="0.6" />
      {/* Sun */}
      <circle cx="22" cy="22" r="4.5" fill="#ffd166">
        <animate attributeName="r" values="4.5;5;4.5" dur="2.4s" repeatCount="indefinite" />
      </circle>
      {/* Planets on orbits */}
      <circle cx="32" cy="22" r="1.6" fill="#5ab6ff" />
      <circle cx="14" cy="35" r="1.4" fill="#ff8a6b" />
      <circle cx="34" cy="9" r="1.8" fill="#f4b485" />
    </svg>
  </div>
);
