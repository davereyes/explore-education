import type { FC } from 'react';
import { useExplorerStore } from '../../../store/useExplorerStore';
import type { Planet } from '../../../types/planet';
import { FunFactCard } from '../../molecules/FunFactCard';
import { StatRow } from '../../molecules/StatRow';

interface Props {
  planet: Planet;
}

/**
 * Variante del panel derecho para viewMode 'explore' (y para Sistema Solar,
 * que reutiliza la misma estructura pero cambia los textos del título).
 */
export const ExploreDetails: FC<Props> = ({ planet }) => {
  const expandedFactIndex = useExplorerStore((s) => s.expandedFactIndex);
  const toggleFact = useExplorerStore((s) => s.toggleFact);

  const stats = planet.stats ?? [];
  const facts = planet.funFacts ?? [];
  const isSistemaSolar = planet.id === 'sistema-solar';

  return (
    <>
      <section className="cosmos-details__section">
        <header className="cosmos-details__header">
          <h2 className="cosmos-details__title">
            {isSistemaSolar ? 'DATOS DEL SISTEMA' : 'DATOS DEL PLANETA'}
          </h2>
          <span className="cosmos-details__pulse" aria-hidden />
        </header>
        <div className="cosmos-details__grid">
          {stats.map((stat) => (
            <StatRow key={stat.label} stat={stat} />
          ))}
        </div>
      </section>

      <section className="cosmos-details__section">
        <header className="cosmos-details__header">
          <h2 className="cosmos-details__title">
            {isSistemaSolar ? 'NUESTRA GALAXIA' : 'DATOS CURIOSOS'}
          </h2>
        </header>
        <div className="cosmos-details__facts">
          {facts.map((fact, i) => (
            <FunFactCard
              key={fact.title}
              fact={fact}
              expanded={expandedFactIndex === i}
              onToggle={() => toggleFact(i)}
            />
          ))}
        </div>
      </section>
    </>
  );
};
