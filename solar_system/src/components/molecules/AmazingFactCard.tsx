import { AnimatePresence, motion } from 'framer-motion';
import type { FC } from 'react';
import { getPlanet } from '../../data/planets';
import type { AmazingFact } from '../../types/planet';

interface AmazingFactCardProps {
  fact: AmazingFact;
  expanded: boolean;
  onToggle: () => void;
}

/**
 * Card "¿Sabías qué?" — mismo formato que FunFactCard pero con un BANNER
 * superior que muestra el thumbnail PNG de uno o varios planetas (los
 * protagonistas del dato).
 */
export const AmazingFactCard: FC<AmazingFactCardProps> = ({ fact, expanded, onToggle }) => {
  const banners = fact.bannerPlanetIds.map((id) => getPlanet(id));

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      className={`cosmos-amazing${expanded ? ' cosmos-amazing--expanded' : ''}`}
    >
      <div
        className="cosmos-amazing__banner"
        style={{
          background: `linear-gradient(135deg, ${fact.accent}33 0%, ${fact.accent}11 100%)`,
        }}
        aria-hidden
      >
        <div className="cosmos-amazing__banner-planets">
          {banners.map((p) => {
            const isSquare = p.thumbnailShape === 'square';
            const cls = `cosmos-amazing__banner-img${
              isSquare ? ' cosmos-amazing__banner-img--square' : ''
            }`;
            return p.thumbnailUrl ? (
              <img key={p.id} src={p.thumbnailUrl} alt={p.name} className={cls} />
            ) : (
              <div
                key={p.id}
                className={`${cls} cosmos-amazing__banner-img--fallback`}
                style={{
                  background: `radial-gradient(circle at 30% 28%, ${p.color}, ${p.colorAccent})`,
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="cosmos-amazing__header">
        <span className="cosmos-amazing__emoji" aria-hidden>
          {fact.emoji}
        </span>
        <span className="cosmos-amazing__title">{fact.title}</span>
        <span className="cosmos-amazing__chevron" aria-hidden>
          {expanded ? '−' : '+'}
        </span>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="cosmos-amazing__body-wrap"
          >
            <p className="cosmos-amazing__body">{fact.body}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};
