import type { FC } from 'react';
import { useExplorerStore } from '../../store/useExplorerStore';
import type { Planet } from '../../types/planet';
import { ThemeToggle } from '../molecules/ThemeToggle';
import { CompareDetails } from './details/CompareDetails';
import { CoreDetails } from './details/CoreDetails';
import { ExploreDetails } from './details/ExploreDetails';

interface DetailsPanelProps {
  planet: Planet;
}

/**
 * Panel derecho — solo orquesta cuál variante de detalle renderizar
 * según el `viewMode` activo. Cada variante vive en `./details/` y maneja
 * su propio estado (favoritos, expansión, etc).
 */
export const DetailsPanel: FC<DetailsPanelProps> = ({ planet }) => {
  const viewMode = useExplorerStore((s) => s.viewMode);

  const isSistemaSolar = planet.id === 'sistema-solar';
  const isCore = viewMode === 'core' && !isSistemaSolar;
  const isCompare = viewMode === 'compare' && !isSistemaSolar;

  return (
    <aside className="cosmos-details">
      <div className="cosmos-details__static">
        <ThemeToggle />
      </div>

      <div className="cosmos-details__scroll">
        {isCompare ? (
          <CompareDetails planet={planet} />
        ) : isCore ? (
          <CoreDetails planet={planet} />
        ) : (
          <ExploreDetails planet={planet} />
        )}
      </div>
    </aside>
  );
};
