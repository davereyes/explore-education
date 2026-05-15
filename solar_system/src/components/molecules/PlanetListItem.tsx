import { motion } from 'framer-motion';
import type { FC } from 'react';
import type { Planet } from '../../types/planet';
import { PlanetSphere } from '../atoms/PlanetSphere';

interface PlanetListItemProps {
  planet: Planet;
  selected: boolean;
  onSelect: () => void;
}

export const PlanetListItem: FC<PlanetListItemProps> = ({ planet, selected, onSelect }) => {
  const disabled = !planet.available;
  return (
    <motion.button
      whileHover={!disabled && !selected ? { x: 4 } : undefined}
      onClick={onSelect}
      disabled={disabled}
      className={`cosmos-planet-item${selected ? ' cosmos-planet-item--selected' : ''}${
        disabled ? ' cosmos-planet-item--disabled' : ''
      }`}
      aria-pressed={selected}
    >
      <PlanetSphere
        color={planet.color}
        accent={planet.colorAccent}
        size={36}
        imageUrl={planet.thumbnailUrl}
        withRing={planet.id === 'saturno' && !planet.thumbnailUrl}
      />
      <div className="cosmos-planet-item__text">
        <div className="cosmos-planet-item__name">{planet.name.toUpperCase()}</div>
        <div className="cosmos-planet-item__nickname">{planet.nickname}</div>
      </div>
      {selected && (
        <span className="cosmos-planet-item__active-tab" aria-hidden>
          ACTIVO
        </span>
      )}
    </motion.button>
  );
};
