import { motion } from 'framer-motion';
import type { FC } from 'react';
import { getPlanet } from '../../data/planets';
import { useExplorerStore } from '../../store/useExplorerStore';
import type { Planet } from '../../types/planet';
import { getDistanceAU, getSectorCode } from '../../utils/telemetry';
import { Button } from '../atoms/Button';
import { Chip } from '../atoms/Chip';
import { StripNav } from '../atoms/StripNav';
import { ZoomControls } from '../atoms/ZoomControls';
import { ComparisonPair } from './ComparisonPair';
import { PlanetViewer3D } from './PlanetViewer3D';
import { getStripKmPerPx, ScaleStrip } from './ScaleStrip';
import { SolarSystem3D } from './SolarSystem3D';

interface ExplorerHeroProps {
  planet: Planet;
}

/**
 * Hero del explorer — orquesta qué se ve en el centro según el contexto:
 *
 *  - selectedPlanetId === 'sistema-solar' → ScaleStrip (todos los planetas
 *    a escala real). Sin botones de acción.
 *  - viewMode === 'compare'               → ComparisonPair (2 planetas).
 *  - viewMode === 'core'                  → Planet3DCanvas en modo núcleo.
 *  - viewMode === 'explore' (default)     → Planet3DCanvas normal.
 */
export const ExplorerHero: FC<ExplorerHeroProps> = ({ planet }) => {
  const viewMode = useExplorerStore((s) => s.viewMode);
  const setViewMode = useExplorerStore((s) => s.setViewMode);
  const systemView = useExplorerStore((s) => s.systemView);
  const setSystemView = useExplorerStore((s) => s.setSystemView);
  const comparePartnerId = useExplorerStore((s) => s.comparePartnerId);

  const cameraZoom = useExplorerStore((s) => s.cameraZoom);

  const isSistemaSolar = planet.id === 'sistema-solar';
  const isCore = viewMode === 'core' && !isSistemaSolar;
  const isCompare = viewMode === 'compare' && !isSistemaSolar;
  const isExplore = !isCore && !isCompare && !isSistemaSolar;
  const isStripView = isSistemaSolar && systemView === 'strip';

  const hasCoreData = !!planet.coreLayers && planet.coreLayers.length > 0;
  const facts = planet.quickFacts;
  const partner = getPlanet(comparePartnerId);

  return (
    <section className="cosmos-hero">
      <header className="cosmos-hero__top">
        <div className="cosmos-hero__heading">
          <div className="cosmos-hero__eyebrow">
            <span className="cosmos-hero__crosshair" aria-hidden>
              ◎
            </span>
            <span className="cosmos-mono">
              {isSistemaSolar ? 'VISTA GENERAL' : 'PLANETA SELECCIONADO'}
            </span>
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
        {!isSistemaSolar && (
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
        )}
      </header>

      {!isSistemaSolar && (
        <p className="cosmos-hero__description">{planet.shortDescription}</p>
      )}

      {isExplore && facts && (
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

      {isStripView && (
        <div className="cosmos-hero__chips">
          <Chip icon="📏" tone="neutral">
            1 px = {Math.round(getStripKmPerPx(cameraZoom)).toLocaleString('es-MX')} km
          </Chip>
        </div>
      )}

      <div className="cosmos-hero__viewer">
        {isSistemaSolar ? (
          systemView === '3d' ? (
            <SolarSystem3D />
          ) : (
            <ScaleStrip />
          )
        ) : isCompare ? (
          <ComparisonPair a={planet} b={partner} />
        ) : (
          <PlanetViewer3D planetId={planet.id} />
        )}
      </div>

      <div className="cosmos-hero__actions">
        <div className="cosmos-hero__actions-side">
          {isStripView && <StripNav />}
        </div>
        <div className="cosmos-hero__actions-center">
          {isSistemaSolar && (
            <>
              <Button
                variant={systemView === 'strip' ? 'primary' : 'secondary'}
                icon="📏"
                onClick={() => setSystemView('strip')}
              >
                Escala
              </Button>
              <Button
                variant={systemView === '3d' ? 'primary' : 'secondary'}
                icon="🌐"
                onClick={() => setSystemView('3d')}
              >
                Vista 3D
              </Button>
            </>
          )}
          {!isSistemaSolar && (
            <>
              <Button
                variant={isExplore ? 'primary' : 'secondary'}
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
              <Button
                variant={isCompare ? 'primary' : 'secondary'}
                icon="⚖️"
                onClick={() => setViewMode('compare')}
              >
                Comparar
              </Button>
            </>
          )}
        </div>
        <div className="cosmos-hero__actions-side cosmos-hero__actions-side--end">
          {!isCore && <ZoomControls />}
        </div>
      </div>
    </section>
  );
};
