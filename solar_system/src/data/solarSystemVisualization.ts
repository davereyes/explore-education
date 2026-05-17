import type { PlanetId } from '../types/planet';

/**
 * Configuración visual de la vista 3D del Sistema Solar.
 *
 * Las distancias y tamaños NO son escala real (Mercurio está a 0.4 UA y
 * Neptuno a 30 UA — imposible mostrarlos juntos). Aquí se balancean para
 * que todos sean visibles y comprensibles en la vista alejada.
 *
 * El SolarSystem3DCanvas solo consume esto; cualquier ajuste de
 * proporciones, velocidades o tilts vive aquí, separado de la presentación.
 */

export interface SolarSystemPlanetCfg {
  id: PlanetId;
  textureUrl: string;
  orbitRadius: number; // distancia al sol (unidades world)
  size: number;        // radio visual (no real)
  orbitSec: number;    // segundos para una vuelta
  rotationSec: number; // segundos para girar sobre eje
  tilt?: number;       // inclinación axial (radianes)
  ringUrl?: string;
  ringInner?: number;
  ringOuter?: number;
  /** Hace al planeta más luminoso. Útil para destacar la Tierra. */
  extraEmissive?: number;
}

export const SUN_RADIUS = 1.8;

export const SOLAR_SYSTEM_PLANETS: SolarSystemPlanetCfg[] = [
  { id: 'mercurio', textureUrl: '/textures/mercury.jpg',          orbitRadius: 3.5,  size: 0.22, orbitSec: 12,  rotationSec: 60 },
  { id: 'venus',    textureUrl: '/textures/venus_atmosphere.jpg', orbitRadius: 4.8,  size: 0.36, orbitSec: 20,  rotationSec: 90 },
  { id: 'tierra',   textureUrl: '/textures/earth_daymap.jpg',     orbitRadius: 6.2,  size: 0.38, orbitSec: 26,  rotationSec: 14, tilt: 0.41, extraEmissive: 0.18 },
  { id: 'marte',    textureUrl: '/textures/mars.jpg',             orbitRadius: 7.8,  size: 0.28, orbitSec: 36,  rotationSec: 15 },
  { id: 'jupiter',  textureUrl: '/textures/jupiter.jpg',          orbitRadius: 10.5, size: 0.95, orbitSec: 70,  rotationSec: 7  },
  {
    id: 'saturno',
    textureUrl: '/textures/saturn.jpg',
    orbitRadius: 13.5,
    size: 0.85,
    orbitSec: 100,
    rotationSec: 8,
    ringUrl: '/textures/saturn_ring_alpha.png',
    ringInner: 1.2,
    ringOuter: 2.0,
  },
  { id: 'urano',    textureUrl: '/textures/uranus.jpg',           orbitRadius: 16.5, size: 0.6,  orbitSec: 130, rotationSec: 10 },
  { id: 'neptuno',  textureUrl: '/textures/neptune.jpg',          orbitRadius: 19.5, size: 0.6,  orbitSec: 160, rotationSec: 12 },
];
