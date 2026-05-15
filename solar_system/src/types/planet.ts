export type PlanetId =
  | 'mercurio'
  | 'venus'
  | 'tierra'
  | 'marte'
  | 'jupiter'
  | 'saturno'
  | 'urano'
  | 'neptuno'
  | 'sol';

export interface PlanetStat {
  label: string;
  value: string;
  unit?: string;
  icon: string;
}

export interface FunFact {
  title: string;
  body: string;
  emoji: string;
}

export interface CoreLayer {
  id: string;
  name: string;
  outerRadiusKm: number;
  innerRadiusKm: number;
  color: string;
  childSummary: string;
  detail: string;
}

export interface Moon3D {
  name: string;
  radius: number; // tamaño relativo (planeta = 1)
  orbitRadius: number; // distancia al centro del planeta (en unidades del planeta)
  orbitPeriodSec: number; // segundos para una vuelta completa (animación)
  tint?: string; // color de tinte sobre la textura genérica de luna
}

export interface PlanetRender3D {
  textureUrl: string;
  cloudsUrl?: string;
  ringUrl?: string;
  ringInner?: number; // múltiplo del radio del planeta
  ringOuter?: number;
  axialTiltDeg: number; // inclinación del eje
  rotationPeriodSec: number; // segundos para rotar sobre su eje (animación)
  scale?: number; // multiplicador visual del planeta (1 = default)
  /** Si es true, el cuerpo es emisivo (caso Sol): no recibe sombras y emite luz/glow. */
  emissive?: boolean;
  /** Color del corona/glow externo (solo aplica si emissive). */
  glowColor?: string;
  moons?: Moon3D[];
}

export interface Planet {
  id: PlanetId;
  name: string;
  nickname: string;
  diameterKm: number;
  color: string;
  colorAccent: string;
  /** Vibrant variant of `color` used for the hero title on the dark background.
   *  Some natural planet colors (browns, beiges, deep blues) read as too dim
   *  over space-black, so each planet gets a punched-up display tint. */
  titleColor?: string;
  /** Image used as the circular thumbnail in the sidebar list.
   *  If not set, falls back to the CSS radial-gradient sphere. */
  thumbnailUrl?: string;
  available: boolean;
  shortDescription?: string;
  quickFacts?: { temperature: string; atmosphere: string; moons: string };
  stats?: PlanetStat[];
  funFacts?: FunFact[];
  coreLayers?: CoreLayer[];
  render3D?: PlanetRender3D;
}
