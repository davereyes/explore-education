import { motion } from 'framer-motion';
import type { FC } from 'react';
import type { Planet } from '../../types/planet';
import { useExplorerStore } from '../../store/useExplorerStore';

interface ComparisonPairProps {
  a: Planet;
  b: Planet;
}

/**
 * El planeta MÁS GRANDE de la pareja se muestra al tamaño máximo de
 * referencia (≈ el tamaño que la Tierra tiene en su vista individual).
 * El otro se renderiza proporcional al diámetro real.
 *
 * Esto evita que un par "tierra vs marte" se vea minúsculo (antes ambos
 * salían a 60px porque la escala global era muy agresiva) y al mismo
 * tiempo evita que "tierra vs júpiter" haga a Júpiter monstruoso.
 */
const MAX_SIZE_PX = 380;
const MIN_SIZE_PX = 36;

export const ComparisonPair: FC<ComparisonPairProps> = ({ a, b }) => {
  const zoom = useExplorerStore((s) => s.cameraZoom);
  const biggerDiameter = Math.max(a.diameterKm, b.diameterKm);
  const max = MAX_SIZE_PX * zoom;
  const sizeOf = (p: Planet) => {
    const raw = max * (p.diameterKm / biggerDiameter);
    return Math.max(MIN_SIZE_PX, raw);
  };
  const sizeA = sizeOf(a);
  const sizeB = sizeOf(b);

  return (
    <div className="cosmos-pair">
      <PairBody planet={a} size={sizeA} delay={0} />
      <div className="cosmos-pair__vs">VS</div>
      <PairBody planet={b} size={sizeB} delay={0.06} />
    </div>
  );
};

const PairBody: FC<{ planet: Planet; size: number; delay: number }> = ({
  planet,
  size,
  delay,
}) => {
  const isSquare = planet.thumbnailShape === 'square';
  const containerW = isSquare ? size * 2.3 : size;
  return (
    <motion.div
      key={planet.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="cosmos-pair__body"
    >
      <div
        className={`cosmos-pair__planet${isSquare ? ' cosmos-pair__planet--square' : ''}`}
        style={{ width: containerW, height: size }}
      >
        {planet.thumbnailUrl ? (
          <img src={planet.thumbnailUrl} alt={planet.name} draggable={false} />
        ) : (
          <div
            className="cosmos-pair__planet-fallback"
            style={{
              background: `radial-gradient(circle at 30% 28%, ${planet.color}, ${planet.colorAccent})`,
            }}
          />
        )}
      </div>
      <div className="cosmos-pair__meta">
        <div className="cosmos-pair__name" style={{ color: planet.titleColor ?? planet.color }}>
          {planet.name.toUpperCase()}
        </div>
        <div className="cosmos-pair__dia cosmos-mono">
          {planet.diameterKm.toLocaleString('es-MX')} km
        </div>
      </div>
    </motion.div>
  );
};
