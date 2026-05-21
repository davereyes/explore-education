import type { HTMLAttributes, ReactNode } from 'react';
import './CaCard.css';

interface CaCardProps extends HTMLAttributes<HTMLDivElement> {
  title?: ReactNode;
  accessory?: ReactNode;
  padded?: boolean;
}

export default function CaCard({
  title,
  accessory,
  padded = true,
  className = '',
  children,
  ...rest
}: CaCardProps) {
  return (
    <div className={`ca-card ${padded ? 'ca-card--padded' : ''} ${className}`} {...rest}>
      {(title || accessory) && (
        <div className="ca-card__head">
          {title && <div className="ca-card__title">{title}</div>}
          {accessory && <div className="ca-card__accessory">{accessory}</div>}
        </div>
      )}
      <div className="ca-card__body">{children}</div>
    </div>
  );
}
