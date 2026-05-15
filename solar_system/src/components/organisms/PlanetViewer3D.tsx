import { motion } from 'framer-motion';
import { lazy, Suspense, type FC } from 'react';
import { getPlanet } from '../../data/planets';
import type { PlanetId } from '../../types/planet';

const Planet3DCanvas = lazy(() =>
  import('./Planet3DCanvas').then((mod) => ({ default: mod.Planet3DCanvas })),
);

interface PlanetViewer3DProps {
  planetId: PlanetId;
}

/**
 * Viewer del planeta:
 * - Si el planeta tiene `render3D`, monta una escena WebGL realista con R3F
 *   (texturas NASA/SolarSystemScope, lunas con órbita punteada, anillos, drag).
 * - Si no, usa el placeholder CSS (caso Sol por ahora).
 * - Mientras carga la escena 3D se muestra el placeholder CSS para evitar flash.
 */
export const PlanetViewer3D: FC<PlanetViewer3DProps> = ({ planetId }) => {
  const planet = getPlanet(planetId);
  const has3D = !!planet.render3D;

  const fallback = (
    <div className="cosmos-viewer3d" data-planet-id={planetId}>
      <div className="cosmos-viewer3d__stage">
        <div className="cosmos-viewer3d__halo" />
        <div className="cosmos-viewer3d__orbit" />
        <div className="cosmos-viewer3d__planet-anchor">
          <motion.div
            key={planet.id}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="cosmos-viewer3d__planet-wrap"
          >
            <div
              className="cosmos-viewer3d__planet"
              style={{
                background: `radial-gradient(circle at 30% 28%, ${planet.color} 0%, ${planet.color} 32%, ${planet.colorAccent} 78%, #1d1410 100%)`,
              }}
            >
              <div className="cosmos-viewer3d__planet-shade" />
            </div>
            <div className="cosmos-viewer3d__shadow" aria-hidden />
          </motion.div>
        </div>
      </div>
    </div>
  );

  if (!has3D || !planet.render3D) return fallback;

  return (
    <div className="cosmos-viewer3d cosmos-viewer3d--webgl" data-planet-id={planetId}>
      <Suspense fallback={fallback}>
        <Planet3DCanvas render3D={planet.render3D} planetId={planet.id} planet={planet} />
      </Suspense>
    </div>
  );
};
