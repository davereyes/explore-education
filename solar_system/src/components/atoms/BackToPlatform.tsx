import { motion } from 'framer-motion';
import type { FC } from 'react';

/**
 * Botón global "volver a la plataforma madre".
 * Por ahora hace history.back(); cuando integremos al host real
 * conectaremos a su sistema de navegación.
 */
export const BackToPlatform: FC = () => {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Hook para la plataforma madre: window.parent.postMessage(...) etc.
      // eslint-disable-next-line no-console
      console.log('[cosmos] back-to-platform requested');
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleBack}
      whileHover={{ x: -3 }}
      whileTap={{ scale: 0.96 }}
      className="cosmos-back-to-platform"
      aria-label="Regresar a la plataforma"
    >
      <span className="cosmos-back-to-platform__arrow" aria-hidden>
        ←
      </span>
      <span className="cosmos-back-to-platform__label">Regresar</span>
    </motion.button>
  );
};
