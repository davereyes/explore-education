import { motion } from 'framer-motion';
import type { FC } from 'react';
import { useExplorerStore } from '../../store/useExplorerStore';

/**
 * +/− buttons que controlan el zoom del planeta 3D vía el store.
 * El Planet3DCanvas lee `cameraZoom` y aplica el scale.
 */
export const ZoomControls: FC = () => {
  const zoomIn = useExplorerStore((s) => s.zoomIn);
  const zoomOut = useExplorerStore((s) => s.zoomOut);

  return (
    <div className="cosmos-zoom">
      <motion.button
        type="button"
        whileTap={{ scale: 0.92 }}
        onClick={zoomOut}
        className="cosmos-zoom__btn"
        aria-label="Alejar"
      >
        −
      </motion.button>
      <motion.button
        type="button"
        whileTap={{ scale: 0.92 }}
        onClick={zoomIn}
        className="cosmos-zoom__btn"
        aria-label="Acercar"
      >
        +
      </motion.button>
    </div>
  );
};
