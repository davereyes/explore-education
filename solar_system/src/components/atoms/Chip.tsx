import type { FC, ReactNode } from 'react';

interface ChipProps {
  icon?: ReactNode;
  children: ReactNode;
  tone?: 'neutral' | 'coral' | 'teal' | 'warm';
}

export const Chip: FC<ChipProps> = ({ icon, children, tone = 'neutral' }) => (
  <span className={`cosmos-chip cosmos-chip--${tone}`}>
    {icon && <span className="cosmos-chip__icon">{icon}</span>}
    <span className="cosmos-chip__label">{children}</span>
  </span>
);
