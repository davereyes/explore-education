import type { FC } from 'react';
import { AMAZING_FACTS } from '../../../data/amazingFacts';
import { getPlanet } from '../../../data/planets';
import { useExplorerStore } from '../../../store/useExplorerStore';
import type { Planet } from '../../../types/planet';
import { AmazingFactCard } from '../../molecules/AmazingFactCard';
import { ComparisonInfoCard } from '../ComparisonInfoCard';

interface Props {
  planet: Planet;
}

/**
 * Variante del panel derecho para viewMode 'compare' —
 * tabla comparativa + ¿Sabías qué?.
 */
export const CompareDetails: FC<Props> = ({ planet }) => {
  const comparePartnerId = useExplorerStore((s) => s.comparePartnerId);
  const expandedAmazingId = useExplorerStore((s) => s.expandedAmazingId);
  const toggleAmazingFact = useExplorerStore((s) => s.toggleAmazingFact);

  const partner = getPlanet(comparePartnerId);

  return (
    <>
      <ComparisonInfoCard a={planet} b={partner} />

      <section className="cosmos-details__section">
        <header className="cosmos-details__header">
          <h2 className="cosmos-details__title">¿SABÍAS QUÉ?</h2>
        </header>
        <div className="cosmos-details__facts">
          {AMAZING_FACTS.map((fact) => (
            <AmazingFactCard
              key={fact.id}
              fact={fact}
              expanded={expandedAmazingId === fact.id}
              onToggle={() => toggleAmazingFact(fact.id)}
            />
          ))}
        </div>
      </section>
    </>
  );
};
