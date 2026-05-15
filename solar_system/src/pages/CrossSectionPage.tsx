import { motion } from 'framer-motion';
import { useState, type FC } from 'react';
import { PageHeader } from '../components/molecules/PageHeader';
import { getPlanet } from '../data/planets';

const PLANET_ID = 'marte' as const;

export const CrossSectionPage: FC = () => {
  const planet = getPlanet(PLANET_ID);
  const layers = planet.coreLayers ?? [];
  const [activeLayerId, setActiveLayerId] = useState(layers[0]?.id ?? '');
  const activeLayer = layers.find((l) => l.id === activeLayerId) ?? layers[0];

  const maxRadius = layers[0]?.outerRadiusKm ?? 1;
  const svgSize = 520;
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const scale = (svgSize / 2 - 40) / maxRadius;

  return (
    <div className="cosmos-page cosmos-core">
      <PageHeader
        eyebrow="MÓDULO 03 · INTERIOR"
        title={`POR DENTRO DE ${planet.name.toUpperCase()}`}
        subtitle="Imagina que cortamos Marte por la mitad como una manzana. Toca cada capa para descubrir cómo es por dentro."
      />

      <div className="cosmos-core__layout">
        <section className="cosmos-core__stage">
          <svg
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            className="cosmos-core__svg"
            role="img"
            aria-label={`Sección transversal de ${planet.name}`}
          >
            <defs>
              <radialGradient id="cosmos-core-light" cx="32%" cy="28%" r="78%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="60%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
            </defs>

            {layers.map((layer) => {
              const r = layer.outerRadiusKm * scale;
              const isActive = activeLayer?.id === layer.id;
              return (
                <motion.circle
                  key={layer.id}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={layer.color}
                  stroke="#ffffff"
                  strokeWidth={isActive ? 4 : 2}
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.05 * layers.indexOf(layer) }}
                  onClick={() => setActiveLayerId(layer.id)}
                  style={{ cursor: 'pointer', transformOrigin: 'center' }}
                />
              );
            })}

            <circle cx={cx} cy={cy} r={maxRadius * scale} fill="url(#cosmos-core-light)" />

            {/* Connector lines + labels */}
            {layers.map((layer, i) => {
              const r = ((layer.outerRadiusKm + layer.innerRadiusKm) / 2) * scale;
              const angle = (-35 - i * 28) * (Math.PI / 180);
              const sx = cx + Math.cos(angle) * r;
              const sy = cy + Math.sin(angle) * r;
              const ex = cx + Math.cos(angle) * (svgSize / 2 + 4);
              const ey = cy + Math.sin(angle) * (svgSize / 2 + 4);
              const labelX = ex + (ex > cx ? 8 : -8);
              const labelAnchor = ex > cx ? 'start' : 'end';
              return (
                <g key={`${layer.id}-line`} className="cosmos-core__connector">
                  <line x1={sx} y1={sy} x2={ex} y2={ey} stroke="#4a5161" strokeWidth={1.5} />
                  <circle cx={sx} cy={sy} r={4} fill="#fff" stroke="#4a5161" strokeWidth={1.5} />
                  <text
                    x={labelX}
                    y={ey + 4}
                    textAnchor={labelAnchor}
                    className="cosmos-core__connector-label"
                  >
                    {layer.name.toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="cosmos-core__layer-buttons">
            {layers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => setActiveLayerId(layer.id)}
                className={`cosmos-core__layer-btn${
                  activeLayer?.id === layer.id ? ' cosmos-core__layer-btn--active' : ''
                }`}
                style={
                  activeLayer?.id === layer.id ? { backgroundColor: layer.color, color: '#fff' } : {}
                }
              >
                <span className="cosmos-core__layer-btn-dot" style={{ background: layer.color }} />
                {layer.name}
              </button>
            ))}
          </div>
        </section>

        <aside className="cosmos-core__detail">
          {activeLayer && (
            <motion.div
              key={activeLayer.id}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="cosmos-core__detail-inner"
            >
              <div
                className="cosmos-core__detail-chip"
                style={{ background: activeLayer.color, color: '#fff' }}
              >
                Capa {layers.indexOf(activeLayer) + 1} de {layers.length}
              </div>
              <h2 className="cosmos-core__detail-title">{activeLayer.name}</h2>
              <p className="cosmos-core__detail-summary">{activeLayer.childSummary}</p>
              <p className="cosmos-core__detail-body">{activeLayer.detail}</p>

              <div className="cosmos-core__detail-stats">
                <div>
                  <div className="cosmos-core__detail-stat-label">Radio exterior</div>
                  <div className="cosmos-core__detail-stat-value cosmos-mono">
                    {activeLayer.outerRadiusKm.toLocaleString('es-MX')} km
                  </div>
                </div>
                <div>
                  <div className="cosmos-core__detail-stat-label">Radio interior</div>
                  <div className="cosmos-core__detail-stat-value cosmos-mono">
                    {activeLayer.innerRadiusKm.toLocaleString('es-MX')} km
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </aside>
      </div>
    </div>
  );
};
