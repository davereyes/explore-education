import { motion } from 'framer-motion';
import type { FC } from 'react';

/**
 * Flechas back / forward que mueven el scroll horizontal del ScaleStrip.
 * Usan querySelector porque el strip es un único elemento global en la
 * pantalla — más simple que pasar refs por 3 niveles.
 */
const scrollStrip = (delta: number) => {
  const el = document.querySelector<HTMLDivElement>('.cosmos-strip__scroll');
  if (!el) return;
  el.scrollBy({ left: delta, behavior: 'smooth' });
};

export const StripNav: FC = () => (
  <div className="cosmos-stripnav">
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      onClick={() => scrollStrip(-360)}
      className="cosmos-stripnav__btn"
      aria-label="Planetas anteriores"
    >
      ←
    </motion.button>
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      onClick={() => scrollStrip(360)}
      className="cosmos-stripnav__btn"
      aria-label="Planetas siguientes"
    >
      →
    </motion.button>
  </div>
);
