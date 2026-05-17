import type { FC } from 'react';
import { getPlanet } from '../../data/planets';
import { useExplorerStore } from '../../store/useExplorerStore';
import type { Planet } from '../../types/planet';
import { ComparisonPair } from './ComparisonPair';
import { PlanetViewer3D } from './PlanetViewer3D';
import { ScaleStrip } from './ScaleStrip';
import { SolarSystem3D } from './SolarSystem3D';

/**
 * Router de qué se renderiza en el centro del hero.
 *
 * Open/Closed: agregar una nueva vista =
 *   1) Definir un `CenterViewId`
 *   2) Registrarla en `CENTER_VIEW_COMPONENTS`
 *   3) Mapear el estado a su id en `resolveCenterViewId`
 *
 * El `ExplorerHero` consume este componente como una caja negra y no tiene
 * que tocarse al sumar nuevas vistas.
 */

type CenterViewId = 'system-3d' | 'system-strip' | 'compare' | 'planet';

interface CenterViewProps {
  planet: Planet;
  partner: Planet;
}

const CENTER_VIEW_COMPONENTS: Record<CenterViewId, FC<CenterViewProps>> = {
  'system-3d': () => <SolarSystem3D />,
  'system-strip': () => <ScaleStrip />,
  compare: ({ planet, partner }) => <ComparisonPair a={planet} b={partner} />,
  planet: ({ planet }) => <PlanetViewer3D planetId={planet.id} />,
};

function resolveCenterViewId(
  planetId: string,
  viewMode: 'explore' | 'core' | 'compare',
  systemView: 'strip' | '3d',
): CenterViewId {
  if (planetId === 'sistema-solar') {
    return systemView === '3d' ? 'system-3d' : 'system-strip';
  }
  if (viewMode === 'compare') return 'compare';
  // 'explore' y 'core' usan el mismo componente; éste decide su variante
  // internamente leyendo `viewMode` del store.
  return 'planet';
}

interface HeroCenterViewProps {
  planet: Planet;
}

export const HeroCenterView: FC<HeroCenterViewProps> = ({ planet }) => {
  const viewMode = useExplorerStore((s) => s.viewMode);
  const systemView = useExplorerStore((s) => s.systemView);
  const comparePartnerId = useExplorerStore((s) => s.comparePartnerId);
  const partner = getPlanet(comparePartnerId);

  const viewId = resolveCenterViewId(planet.id, viewMode, systemView);
  const ViewComponent = CENTER_VIEW_COMPONENTS[viewId];
  return <ViewComponent planet={planet} partner={partner} />;
};
