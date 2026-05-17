import type { FC } from 'react';
import { AMAZING_FACTS } from '../../data/amazingFacts';
import { getPlanet } from '../../data/planets';
import { useExplorerStore } from '../../store/useExplorerStore';
import type { Planet } from '../../types/planet';
import { AmazingFactCard } from '../molecules/AmazingFactCard';
import { FunFactCard } from '../molecules/FunFactCard';
import { StatRow } from '../molecules/StatRow';
import { ThemeToggle } from '../molecules/ThemeToggle';
import { ComparisonInfoCard } from './ComparisonInfoCard';

interface DetailsPanelProps {
  planet: Planet;
}

const formatKm = (km: number) => km.toLocaleString('es-MX');

/**
 * Panel derecho. El contenido cambia según contexto:
 *  - Sistema Solar      → stats del sistema + funFacts (vista macro)
 *  - viewMode = compare → ComparisonInfoCard + ¿Sabías qué? (amazingFacts)
 *  - viewMode = core    → CAPAS DEL NÚCLEO
 *  - viewMode = explore → DATOS DEL PLANETA + DATOS CURIOSOS
 */
export const DetailsPanel: FC<DetailsPanelProps> = ({ planet }) => {
  const expandedFactIndex = useExplorerStore((s) => s.expandedFactIndex);
  const toggleFact = useExplorerStore((s) => s.toggleFact);
  const expandedAmazingId = useExplorerStore((s) => s.expandedAmazingId);
  const toggleAmazingFact = useExplorerStore((s) => s.toggleAmazingFact);
  const viewMode = useExplorerStore((s) => s.viewMode);
  const comparePartnerId = useExplorerStore((s) => s.comparePartnerId);

  const isSistemaSolar = planet.id === 'sistema-solar';
  const isCore = viewMode === 'core' && !isSistemaSolar;
  const isCompare = viewMode === 'compare' && !isSistemaSolar;

  const stats = planet.stats ?? [];
  const facts = planet.funFacts ?? [];
  const layers = planet.coreLayers ?? [];

  return (
    <aside className="cosmos-details">
      <div className="cosmos-details__static">
        <ThemeToggle />
      </div>

      <div className="cosmos-details__scroll">
        {isCompare ? (
          <CompareContent planetA={planet} partnerId={comparePartnerId} />
        ) : isCore ? (
          <section className="cosmos-details__section">
            <header className="cosmos-details__header">
              <h2 className="cosmos-details__title">CAPAS DEL NÚCLEO</h2>
              <span className="cosmos-details__pulse" aria-hidden />
            </header>
            <div className="cosmos-details__facts">
              {layers.map((layer, i) => (
                <article key={layer.id} className="cosmos-core-card">
                  <header className="cosmos-core-card__header">
                    <span
                      className="cosmos-core-card__index"
                      style={{ background: layer.color }}
                    >
                      {i + 1}
                    </span>
                    <h3 className="cosmos-core-card__name">{layer.name}</h3>
                  </header>
                  <p className="cosmos-core-card__summary">{layer.childSummary}</p>
                  <p className="cosmos-core-card__body">{layer.detail}</p>
                  <dl className="cosmos-core-card__stats">
                    <div>
                      <dt>Radio exterior</dt>
                      <dd className="cosmos-mono">{formatKm(layer.outerRadiusKm)} km</dd>
                    </div>
                    <div>
                      <dt>Radio interior</dt>
                      <dd className="cosmos-mono">{formatKm(layer.innerRadiusKm)} km</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </section>
        ) : (
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
        )}

        {isCompare && (
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
        )}
      </div>
    </aside>
  );
};

const CompareContent: FC<{ planetA: Planet; partnerId: Planet['id'] }> = ({
  planetA,
  partnerId,
}) => {
  const partner = getPlanet(partnerId);
  return <ComparisonInfoCard a={planetA} b={partner} />;
};
