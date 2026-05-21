import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './CaButton.css';

type Variant = 'primary' | 'ghost' | 'soft' | 'pill';

interface CaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  active?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export default function CaButton({
  variant = 'ghost',
  active = false,
  iconLeft,
  iconRight,
  className = '',
  children,
  ...rest
}: CaButtonProps) {
  const classes = [
    'ca-button',
    `ca-button--${variant}`,
    active ? 'ca-button--active' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...rest}>
      {iconLeft && <span className="ca-button__icon">{iconLeft}</span>}
      {children && <span className="ca-button__label">{children}</span>}
      {iconRight && <span className="ca-button__icon">{iconRight}</span>}
    </button>
  );
}
