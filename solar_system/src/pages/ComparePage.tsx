import { motion } from 'framer-motion';
import { type FC } from 'react';
import { ALL_BODIES_ORDER, PLANETS } from '../data/planets';
import { useExplorerStore } from '../store/useExplorerStore';
import type { PlanetId } from '../types/planet';
import { PageHeader } from '../components/molecules/PageHeader';
import { PlanetSphere } from '../components/atoms/PlanetSphere';

const KM_PER_PX = 600;
const MIN_VISIBLE_PX = 6;
const formatKm = (km: number) => km.toLocaleString('es-MX');

const SELECTABLE_IDS: PlanetId[] = ALL_BODIES_ORDER;

const AMAZING_FACTS = [
  {
    emoji: '🌍',
    title: '1.300 Tierras caben dentro de Júpiter',
    body: 'Si vaciaras a Júpiter, podrías meter más de mil trescientos planetas como el nuestro adentro.',
  },
  {
    emoji: '☀️',
    title: 'El Sol contiene el 99.8% de toda la masa',
    body: 'Todo lo demás (planetas, lunas, asteroides) suma apenas el 0.2% del sistema solar.',
  },
  {
    emoji: '🛁',
    title: 'Saturno flotaría en agua',
    body: 'Es tan poco denso que, si encontraras una bañera lo suficientemente grande, ¡flotaría!',
  },
  {
    emoji: '🚗',
    title: 'Tierra = canica, Sol = un coche',
    body: 'Si nuestro planeta fuera del tamaño de una canica, el Sol sería tan grande como un coche estacionado.',
  },
];

const KID_METAPHORS: Record<string, string> = {
  'mercurio-tierra': 'Mercurio es como una pelota de tenis al lado de un balón de basket: nuestra Tierra.',
  'tierra-marte': 'Marte es como una lonchera al lado de tu mochila escolar (la Tierra).',
  'tierra-jupiter': 'Si la Tierra fuera una canica, Júpiter sería una pelota de fútbol al lado.',
  'tierra-sol': 'Si la Tierra fuera una canica, el Sol sería un coche estacionado a su lado.',
  'marte-jupiter': 'Marte cabría dentro de Júpiter más de 4.500 veces.',
  'tierra-luna': 'Caben 50 Tierras entre la Tierra y la Luna.',
};

const getMetaphor = (a: PlanetId, b: PlanetId): string => {
  const key1 = `${a}-${b}`;
  const key2 = `${b}-${a}`;
  if (KID_METAPHORS[key1]) return KID_METAPHORS[key1];
  if (KID_METAPHORS[key2]) return KID_METAPHORS[key2];
  const big = PLANETS[a].diameterKm >= PLANETS[b].diameterKm ? PLANETS[a] : PLANETS[b];
  const small = big.id === a ? PLANETS[b] : PLANETS[a];
  const ratio = big.diameterKm / small.diameterKm;
  return `${big.name} es aproximadamente ${ratio.toFixed(1)} veces más grande que ${small.name}.`;
};

const sizePx = (km: number) => Math.max(MIN_VISIBLE_PX, km / KM_PER_PX);

export const ComparePage: FC = () => {
  const compareLeft = useExplorerStore((s) => s.compareLeft);
  const compareRight = useExplorerStore((s) => s.compareRight);
  const setCompareLeft = useExplorerStore((s) => s.setCompareLeft);
  const setCompareRight = useExplorerStore((s) => s.setCompareRight);

  const left = PLANETS[compareLeft];
  const right = PLANETS[compareRight];
  const metaphor = getMetaphor(left.id, right.id);

  return (
    <div className="cosmos-page cosmos-compare">
      <PageHeader
        eyebrow="MÓDULO 02 · ESCALA"
        title="COMPARAR TAMAÑOS"
        subtitle="Desliza horizontalmente para ver los 9 cuerpos del sistema solar a escala real. ¡Vas a ver qué tan gigante es el Sol!"
      />

      <section className="cosmos-compare__strip-wrap">
        <div className="cosmos-compare__strip">
          <div className="cosmos-compare__baseline" />
          {SELECTABLE_IDS.map((id) => {
            const p = PLANETS[id];
            const px = sizePx(p.diameterKm);
            return (
              <div key={id} className="cosmos-compare__item">
                <div className="cosmos-compare__item-circle" style={{ height: px }}>
                  <PlanetSphere
                    color={p.color}
                    accent={p.colorAccent}
                    size={px}
                    withRing={p.id === 'saturno'}
                  />
                </div>
                <div className="cosmos-compare__item-meta">
                  <div className="cosmos-compare__item-name">{p.name}</div>
                  <div className="cosmos-compare__item-dia cosmos-mono">
                    {formatKm(p.diameterKm)} km
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="cosmos-compare__scale-hint cosmos-mono">
          ESCALA · 1 px = {formatKm(KM_PER_PX)} km
        </div>
      </section>

      <section className="cosmos-compare__pair">
        <header className="cosmos-compare__pair-header">
          <h2 className="cosmos-compare__pair-title">Compara dos cuerpos lado a lado</h2>
          <div className="cosmos-compare__pair-selectors">
            <label className="cosmos-compare__select">
              <span>Comparar</span>
              <select
                value={compareLeft}
                onChange={(e) => setCompareLeft(e.target.value as PlanetId)}
              >
                {SELECTABLE_IDS.map((id) => (
                  <option key={id} value={id}>
                    {PLANETS[id].name}
                  </option>
                ))}
              </select>
            </label>
            <span className="cosmos-compare__pair-vs">con</span>
            <label className="cosmos-compare__select">
              <select
                value={compareRight}
                onChange={(e) => setCompareRight(e.target.value as PlanetId)}
              >
                {SELECTABLE_IDS.map((id) => (
                  <option key={id} value={id}>
                    {PLANETS[id].name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </header>

        <div className="cosmos-compare__pair-stage">
          <motion.div
            key={`${left.id}-${right.id}-l`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="cosmos-compare__pair-body"
          >
            <PlanetSphere
              color={left.color}
              accent={left.colorAccent}
              size={Math.min(sizePx(left.diameterKm), 420)}
              withRing={left.id === 'saturno'}
            />
            <div className="cosmos-compare__pair-label">
              <div>{left.name}</div>
              <div className="cosmos-mono">{formatKm(left.diameterKm)} km</div>
            </div>
          </motion.div>
          <motion.div
            key={`${left.id}-${right.id}-r`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="cosmos-compare__pair-body"
          >
            <PlanetSphere
              color={right.color}
              accent={right.colorAccent}
              size={Math.min(sizePx(right.diameterKm), 420)}
              withRing={right.id === 'saturno'}
            />
            <div className="cosmos-compare__pair-label">
              <div>{right.name}</div>
              <div className="cosmos-mono">{formatKm(right.diameterKm)} km</div>
            </div>
          </motion.div>
        </div>

        <div className="cosmos-compare__metaphor">
          <span className="cosmos-compare__metaphor-emoji" aria-hidden>
            🧠
          </span>
          <p>{metaphor}</p>
        </div>
      </section>

      <section className="cosmos-compare__amazing">
        <h2 className="cosmos-compare__amazing-title">Datos asombrosos</h2>
        <div className="cosmos-compare__amazing-grid">
          {AMAZING_FACTS.map((fact) => (
            <article key={fact.title} className="cosmos-compare__amazing-card">
              <span className="cosmos-compare__amazing-emoji" aria-hidden>
                {fact.emoji}
              </span>
              <h3>{fact.title}</h3>
              <p>{fact.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
