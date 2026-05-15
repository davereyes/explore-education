import { motion } from 'framer-motion';
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'
>;

interface ButtonProps extends NativeButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  variant = 'secondary',
  icon,
  children,
  className,
  ...rest
}) => (
  <motion.button
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.97 }}
    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
    className={`cosmos-btn cosmos-btn--${variant}${className ? ` ${className}` : ''}`}
    {...rest}
  >
    {icon && <span className="cosmos-btn__icon">{icon}</span>}
    <span className="cosmos-btn__label">{children}</span>
  </motion.button>
);
