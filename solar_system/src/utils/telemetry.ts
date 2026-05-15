import { PLANET_ORDER } from '../data/planets';
import type { Planet, PlanetId } from '../types/planet';

const AU_KM = 149_597_870.7;

/** SECTOR · SOL-NN — Sol = 00, planets numbered 01..08 from inner to outer. */
export function getSectorCode(id: PlanetId): string {
  if (id === 'sol') return 'SOL-00';
  const index = PLANET_ORDER.indexOf(id) + 1;
  return `SOL-${String(index).padStart(2, '0')}`;
}

/** Distance from the Sun in Astronomical Units, derived from the planet's
 *  "Distancia al Sol" stat. Returns "0.00 UA" for the Sun itself. */
export function getDistanceAU(planet: Planet): string {
  if (planet.id === 'sol') return '0.00 UA';
  const stat = planet.stats?.find((s) => /distancia/i.test(s.label));
  if (!stat) return '— UA';
  const mKm = parseFloat(stat.value.replace(/,/g, ''));
  if (!Number.isFinite(mKm)) return '— UA';
  const au = (mKm * 1_000_000) / AU_KM;
  return au < 10 ? `${au.toFixed(2)} UA` : `${au.toFixed(1)} UA`;
}
