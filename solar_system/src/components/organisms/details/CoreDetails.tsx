import type { FC } from 'react';
import type { Planet } from '../../../types/planet';

interface Props {
  planet: Planet;
}

const formatKm = (km: number) => km.toLocaleString('es-MX');

/**
 * Variante del panel derecho para viewMode 'core' — lista las capas
 * internas del planeta con su explicación.
 */
export const CoreDetails: FC<Props> = ({ planet }) => {
  const layers = planet.coreLayers ?? [];

  return (
    <section className="cosmos-details__section">
      <header className="cosmos-details__header">
        <h2 className="cosmos-details__title">CAPAS DEL NÚCLEO</h2>
        <span className="cosmos-details__pulse" aria-hidden />
      </header>
      <div className="cosmos-details__facts">
        {layers.map((layer, i) => (
          <article key={layer.id} className="cosmos-core-card">
            <header className="cosmos-core-card__header">
              <span className="cosmos-core-card__index" style={{ background: layer.color }}>
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
  );
};
