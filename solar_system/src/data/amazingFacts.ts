import type { AmazingFact } from '../types/planet';

/**
 * "¿Sabías qué?" — datos asombrosos sobre el sistema solar.
 * Cada uno se renderiza como card expandible con un banner que muestra
 * el/los thumbnail(s) PNG de los planetas protagonistas.
 */
export const AMAZING_FACTS: AmazingFact[] = [
  {
    id: 'jupiter-1300-tierras',
    emoji: '🌍',
    title: '1.300 Tierras caben dentro de Júpiter',
    body: 'Júpiter es tan enorme que si lo vaciaras, podrías meter más de mil trescientos planetas como el nuestro adentro. Y aún sobraría espacio.',
    bannerPlanetIds: ['jupiter', 'tierra'],
    accent: '#f4b485',
  },
  {
    id: 'sol-masa',
    emoji: '⚖️',
    title: 'El Sol contiene el 99,8% de la masa',
    body: 'Todo lo demás del Sistema Solar (planetas, lunas, asteroides, cometas) suma apenas el 0,2% del peso total. ¡El Sol es prácticamente todo!',
    bannerPlanetIds: ['sol'],
    accent: '#ffd166',
  },
  {
    id: 'saturno-flota',
    emoji: '🛁',
    title: 'Saturno flotaría en agua',
    body: 'Saturno está hecho casi todo de hidrógeno y helio: es tan poco denso que, si encontraras una bañera lo suficientemente grande, ¡flotaría como un patito de hule!',
    bannerPlanetIds: ['saturno'],
    accent: '#f5d885',
  },
  {
    id: 'tierra-canica-sol-coche',
    emoji: '🚗',
    title: 'Si la Tierra fuera una canica, el Sol sería un coche',
    body: 'A esa escala, el Sol estaría a unos 100 metros de tu canica. Para visitarlo en una hormiga (que camina ~1 cm/s) tardarías casi 3 horas.',
    bannerPlanetIds: ['tierra', 'sol'],
    accent: '#ffc55a',
  },
  {
    id: 'venus-dia-largo',
    emoji: '🙃',
    title: 'En Venus, un día dura más que un año',
    body: 'Venus rota tan despacio que tarda 243 días terrestres en girar sobre su eje, pero solo 225 en orbitar al Sol. Tu cumpleaños llegaría antes que tu siguiente desayuno.',
    bannerPlanetIds: ['venus'],
    accent: '#f5cc70',
  },
  {
    id: 'neptuno-vientos',
    emoji: '🌪️',
    title: 'Neptuno tiene vientos supersónicos',
    body: 'En Neptuno soplan vientos de 2.100 km/h, más rápido que el sonido. Son los vientos más veloces de todo el Sistema Solar.',
    bannerPlanetIds: ['neptuno'],
    accent: '#6c95e8',
  },
];
