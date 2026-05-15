import { motion } from 'framer-motion';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExplorerStore } from '../../store/useExplorerStore';
import type { Planet } from '../../types/planet';
import { getDistanceAU, getSectorCode } from '../../utils/telemetry';
import { Button } from '../atoms/Button';
import { Chip } from '../atoms/Chip';
import { ZoomControls } from '../atoms/ZoomControls';
import { PlanetViewer3D } from './PlanetViewer3D';

interface ExplorerHeroProps {
  planet: Planet;
}

/**
 * Hero del explorer.
 * En modo `core` el texto y los chips se mantienen iguales (eyebrow, título,
 * apodo, descripción, quickFacts) — solo cambian la escena 3D y el panel
 * derecho. Los botones funcionan como filtros segmented control.
 */
export const ExplorerHero: FC<ExplorerHeroProps> = ({ planet }) => {
  const navigate = useNavigate();
  const viewMode = useExplorerStore((s) => s.viewMode);
  const setViewMode = useExplorerStore((s) => s.setViewMode);

  const isCore = viewMode === 'core';
  const hasCoreData = !!planet.coreLayers && planet.coreLayers.length > 0;
  const facts = planet.quickFacts;

  return (
    <section className="cosmos-hero">
      <header className="cosmos-hero__top">
        <div className="cosmos-hero__heading">
          <div className="cosmos-hero__eyebrow">
            <span className="cosmos-hero__crosshair" aria-hidden>
              ◎
            </span>
            <span className="cosmos-mono">PLANETA SELECCIONADO</span>
          </div>
          <motion.h1
            key={planet.id}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="cosmos-hero__title"
            style={{ color: planet.titleColor ?? planet.color }}
          >
            {planet.name.toUpperCase()}
          </motion.h1>
          <p className="cosmos-hero__nickname">{planet.nickname}</p>
        </div>
        <div className="cosmos-hero__telemetry cosmos-mono">
          <div>
            SECTOR <strong>{getSectorCode(planet.id)}</strong>
          </div>
          <div>
            DIST <strong>{getDistanceAU(planet)}</strong>
          </div>
          <div>
            ESCANEO <strong className="cosmos-hero__telemetry-active">ACTIVO</strong>
          </div>
        </div>
      </header>

      <p className="cosmos-hero__description">{planet.shortDescription}</p>

      {!isCore && facts && (
        <div className="cosmos-hero__chips">
          <Chip icon="🌡️" tone="warm">
            {facts.temperature}
          </Chip>
          <Chip icon="🌬️" tone="coral">
            {facts.atmosphere}
          </Chip>
          <Chip icon={planet.id === 'sol' ? '🌐' : '🌕'} tone="teal">
            {facts.moons}
          </Chip>
        </div>
      )}

      <div className="cosmos-hero__viewer">
        <PlanetViewer3D planetId={planet.id} />
      </div>

      <div className="cosmos-hero__actions">
        <div className="cosmos-hero__actions-side" aria-hidden />
        <div className="cosmos-hero__actions-center">
          <Button
            variant={!isCore ? 'primary' : 'secondary'}
            icon="🚀"
            onClick={() => setViewMode('explore')}
          >
            Explorar
          </Button>
          {hasCoreData && (
            <Button
              variant={isCore ? 'primary' : 'secondary'}
              icon="🧭"
              onClick={() => setViewMode('core')}
            >
              Ver núcleo
            </Button>
          )}
          <Button variant="secondary" icon="⚖️" onClick={() => navigate('/compare')}>
            Comparar
          </Button>
        </div>
        <div className="cosmos-hero__actions-side cosmos-hero__actions-side--end">
          {!isCore && <ZoomControls />}
        </div>
      </div>
    </section>
  );
};
