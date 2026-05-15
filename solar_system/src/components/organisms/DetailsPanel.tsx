import type { FC } from 'react';
import type { Planet } from '../../types/planet';
import { useExplorerStore } from '../../store/useExplorerStore';
import { FunFactCard } from '../molecules/FunFactCard';
import { StatRow } from '../molecules/StatRow';
import { ThemeToggle } from '../molecules/ThemeToggle';

interface DetailsPanelProps {
  planet: Planet;
}

const formatKm = (km: number) => km.toLocaleString('es-MX');

export const DetailsPanel: FC<DetailsPanelProps> = ({ planet }) => {
  const expandedFactIndex = useExplorerStore((s) => s.expandedFactIndex);
  const toggleFact = useExplorerStore((s) => s.toggleFact);
  const viewMode = useExplorerStore((s) => s.viewMode);

  const isCore = viewMode === 'core';
  const stats = planet.stats ?? [];
  const facts = planet.funFacts ?? [];
  const layers = planet.coreLayers ?? [];

  return (
    <aside className="cosmos-details">
      <div className="cosmos-details__static">
        <ThemeToggle />
      </div>

      <div className="cosmos-details__scroll">
        {isCore ? (
          <>
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
          </>
        ) : (
          <>
            <section className="cosmos-details__section">
              <header className="cosmos-details__header">
                <h2 className="cosmos-details__title">DATOS DEL PLANETA</h2>
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
                <h2 className="cosmos-details__title">DATOS CURIOSOS</h2>
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
      </div>
    </aside>
  );
};
