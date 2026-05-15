import type { FC } from 'react';
import type { PlanetStat } from '../../types/planet';
import { computeStatProgress } from '../../utils/statProgress';

interface StatRowProps {
  stat: PlanetStat;
}

export const StatRow: FC<StatRowProps> = ({ stat }) => {
  const { filled, total, tone } = computeStatProgress(stat);
  const percent = Math.max(0, Math.min(1, filled / total)) * 100;
  return (
    <div className="cosmos-stat">
      <div className="cosmos-stat__header">
        <span className="cosmos-stat__icon" aria-hidden>
          {stat.icon}
        </span>
        <span className="cosmos-stat__label">{stat.label}</span>
        <span className="cosmos-stat__value cosmos-mono">
          {stat.value}
          {stat.unit && <span className="cosmos-stat__unit"> {stat.unit}</span>}
        </span>
      </div>
      <div
        className={`cosmos-stat__bar cosmos-stat__bar--${tone}`}
        role="img"
        aria-label={`${filled} de ${total}`}
      >
        <div className="cosmos-stat__bar-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};
