import { lazy, Suspense, type FC } from 'react';

const SolarSystem3DCanvas = lazy(() =>
  import('./SolarSystem3DCanvas').then((mod) => ({ default: mod.SolarSystem3DCanvas })),
);

/**
 * Wrapper que lazy-loadea la escena 3D del sistema solar (con Three.js + R3F).
 * Mientras carga muestra un fondo vacío — el bundle de three ya está cacheado
 * desde Planet3DCanvas en la mayoría de los casos, así que es instantáneo.
 */
export const SolarSystem3D: FC = () => (
  <div className="cosmos-solar3d">
    <Suspense fallback={<div className="cosmos-solar3d__loading" />}>
      <SolarSystem3DCanvas />
    </Suspense>
  </div>
);
