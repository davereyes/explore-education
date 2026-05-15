import type { FC, ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  tone?: 'muted' | 'coral' | 'teal';
}

export const Badge: FC<BadgeProps> = ({ children, tone = 'muted' }) => (
  <span className={`cosmos-badge cosmos-badge--${tone}`}>{children}</span>
);
