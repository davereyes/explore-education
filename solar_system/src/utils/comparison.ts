import { PLANET_ORDER, PLANETS } from '../data/planets';
import type { Planet, PlanetId } from '../types/planet';

/**
 * Planetas comparables (sin Sol ni Sistema Solar — el Sol es desproporcionado
 * a la escala normal de planetas, y Sistema Solar es la vista macro).
 */
export const COMPARABLE_IDS: PlanetId[] = [...PLANET_ORDER];

/**
 * Partner por defecto al activar Comparar: la Tierra (referencia natural
 * para que el niño dimensione cualquier planeta). Si el actual ya es la
 * Tierra, usamos Marte como contraste.
 */
export function getDefaultPartner(id: PlanetId): PlanetId {
  if (id === 'tierra') return 'marte';
  return 'tierra';
}

/**
 * Metáfora kid-friendly por pareja. Si no hay específica, devolvemos una
 * descripción generada a partir de los diámetros.
 */
const PAIR_METAPHORS: Record<string, string> = {
  'mercurio-tierra': 'Mercurio es como una pelota de tenis al lado de un balón de basket: nuestra Tierra.',
  'tierra-mercurio': 'La Tierra es como un balón de basket comparado con una pelota de tenis: Mercurio.',
  'tierra-marte': 'Marte es como una lonchera al lado de tu mochila escolar (la Tierra).',
  'marte-tierra': 'La Tierra es como una mochila escolar al lado de una lonchera: Marte.',
  'tierra-jupiter': 'Si la Tierra fuera una canica, Júpiter sería una pelota de fútbol.',
  'jupiter-tierra': 'Si Júpiter fuera una pelota de fútbol, la Tierra sería una canica a su lado.',
  'tierra-saturno': 'Saturno cabría 763 veces dentro de la Tierra… pero al revés: en Saturno caben 763 Tierras.',
  'saturno-tierra': 'Dentro de Saturno cabrían 763 planetas Tierra.',
  'tierra-urano': 'En Urano cabrían 63 planetas Tierra.',
  'tierra-neptuno': 'En Neptuno cabrían 57 planetas Tierra.',
  'mercurio-jupiter': 'Júpiter es ~29 veces más grande que Mercurio.',
  'venus-tierra': 'Venus y la Tierra son casi gemelos en tamaño — Venus es solo un poquito más pequeño.',
  'marte-jupiter': 'Júpiter cabría unas 4.500 veces dentro de Marte… al revés: Marte cabe 4.500 veces en Júpiter.',
};

export function getPairMetaphor(a: PlanetId, b: PlanetId): string {
  const key = `${a}-${b}`;
  if (PAIR_METAPHORS[key]) return PAIR_METAPHORS[key];
  const big = PLANETS[a].diameterKm >= PLANETS[b].diameterKm ? PLANETS[a] : PLANETS[b];
  const small = big.id === a ? PLANETS[b] : PLANETS[a];
  const ratio = big.diameterKm / small.diameterKm;
  if (ratio < 1.2) return `${big.name} y ${small.name} son casi del mismo tamaño.`;
  return `${big.name} es aproximadamente ${ratio.toFixed(1)} veces más grande que ${small.name}.`;
}

/**
 * Tip rápido por planeta (para mostrar al lado de cada uno en la comparación).
 * Solo lo más característico — el "wow" de cada planeta en una línea.
 */
const PLANET_TIP: Partial<Record<PlanetId, string>> = {
  mercurio: 'Tan pequeño que cabría dentro del Atlántico.',
  venus: 'El planeta más caliente: 464 °C en la superficie.',
  tierra: 'El único con vida y agua líquida que conocemos.',
  marte: 'Tiene el volcán más grande: el Monte Olimpo (22 km).',
  jupiter: 'Su tormenta gigante lleva 350 años girando.',
  saturno: 'Sus anillos miden 282.000 km pero solo 10 m de grosor.',
  urano: 'Rota acostado, como si rodara alrededor del Sol.',
  neptuno: 'Vientos a 2.100 km/h, los más rápidos del Sistema.',
  sol: 'Una estrella enana amarilla con 4.600 M años.',
};

export function getPlanetTip(p: Planet): string {
  return PLANET_TIP[p.id] ?? p.shortDescription ?? '';
}

/**
 * Comparación numérica entre dos planetas para mostrar en tabla.
 * Devolvemos pares (label, valueA, valueB) listos para renderizar.
 */
export interface CompareRow {
  label: string;
  icon: string;
  a: string;
  b: string;
}

const ICON = {
  size: '📏',
  gravity: '⬇️',
  temp: '🌡️',
  day: '🕐',
  year: '📅',
  moons: '🌕',
  distance: '☀️',
};

export function compareRows(a: Planet, b: Planet): CompareRow[] {
  const fmt = (n: number) => n.toLocaleString('es-MX');
  const find = (p: Planet, key: string) => p.stats?.find((s) => s.label.toLowerCase().includes(key));

  const grav = (p: Planet) => find(p, 'gravedad')?.value ?? '—';
  const temp = (p: Planet) => {
    const s = find(p, 'temperatura') ?? find(p, 'superficie');
    return s ? `${s.value} ${s.unit ?? ''}`.trim() : '—';
  };
  const day = (p: Planet) => find(p, 'día')?.value ?? find(p, 'rotación')?.value ?? '—';
  const year = (p: Planet) => {
    const s = find(p, 'año') ?? find(p, 'edad');
    return s ? `${s.value} ${s.unit ?? ''}`.trim() : '—';
  };
  const moons = (p: Planet) => find(p, 'lunas')?.value ?? '—';
  const dist = (p: Planet) => {
    const s = find(p, 'distancia') ?? find(p, 'tierra');
    return s ? `${s.value} ${s.unit ?? ''}`.trim() : '—';
  };

  return [
    { label: 'Diámetro', icon: ICON.size, a: `${fmt(a.diameterKm)} km`, b: `${fmt(b.diameterKm)} km` },
    { label: 'Gravedad', icon: ICON.gravity, a: grav(a), b: grav(b) },
    { label: 'Temperatura', icon: ICON.temp, a: temp(a), b: temp(b) },
    { label: 'Día', icon: ICON.day, a: day(a), b: day(b) },
    { label: 'Año', icon: ICON.year, a: year(a), b: year(b) },
    { label: 'Lunas', icon: ICON.moons, a: moons(a), b: moons(b) },
    { label: 'Distancia al Sol', icon: ICON.distance, a: dist(a), b: dist(b) },
  ];
}
