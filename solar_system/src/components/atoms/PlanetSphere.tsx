import type { CSSProperties, FC } from 'react';

interface PlanetSphereProps {
  color: string;
  accent: string;
  size: number;
  /** Si se pasa, usa esta imagen en lugar del radial-gradient CSS. */
  imageUrl?: string;
  withRing?: boolean;
  className?: string;
}

/**
 * Esfera estilizada para thumbnails y vistas previas.
 * - Si recibe `imageUrl`, renderiza un círculo con la imagen `object-fit: cover`.
 * - Si no, cae al radial-gradient CSS (basado en `color` + `accent`).
 */
export const PlanetSphere: FC<PlanetSphereProps> = ({
  color,
  accent,
  size,
  imageUrl,
  withRing = false,
  className,
}) => {
  const baseStyle: CSSProperties = {
    width: size,
    height: size,
  };

  const gradientStyle: CSSProperties = {
    ...baseStyle,
    background: `radial-gradient(circle at 32% 28%, ${color} 0%, ${color} 38%, ${accent} 88%, rgba(0,0,0,0.35) 100%)`,
    boxShadow: `inset -${size * 0.08}px -${size * 0.1}px ${size * 0.18}px rgba(0,0,0,0.3), 0 ${
      size * 0.04
    }px ${size * 0.18}px rgba(20, 26, 40, 0.18)`,
  };

  const imageStyle: CSSProperties = {
    ...baseStyle,
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: `0 ${size * 0.04}px ${size * 0.18}px rgba(20, 26, 40, 0.18)`,
  };

  return (
    <div
      className={`cosmos-sphere${className ? ` ${className}` : ''}`}
      style={imageUrl ? imageStyle : gradientStyle}
      aria-hidden="true"
    >
      {withRing && (
        <div
          className="cosmos-sphere__ring"
          style={{
            width: size * 1.8,
            height: size * 0.32,
            borderColor: accent,
          }}
        />
      )}
    </div>
  );
};
