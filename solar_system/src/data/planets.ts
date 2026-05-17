import type { Planet, PlanetId } from '../types/planet';

/**
 * Datos científicos basados en NASA Planetary Fact Sheets.
 * https://nssdc.gsfc.nasa.gov/planetary/factsheet/
 */

const STAT_ICONS = {
  gravity: '⬇️',
  atmosphere: '🌫️',
  temperature: '🌡️',
  day: '🕐',
  year: '📅',
  distance: '📏',
  moons: '🌕',
  magnetic: '🧲',
  composition: '🧪',
  bodies: '🪐',
} as const;

export const PLANETS: Record<PlanetId, Planet> = {
  mercurio: {
    id: 'mercurio',
    name: 'Mercurio',
    nickname: 'El Veloz',
    diameterKm: 4_879,
    color: '#b1a59a',
    colorAccent: '#8c7f73',
    titleColor: '#e8c9a0',
    thumbnailUrl: '/textures/tumbnails/mercury.png',
    available: true,
    render3D: {
      textureUrl: '/textures/mercury.jpg',
      axialTiltDeg: 0.034,
      rotationPeriodSec: 60,
      scale: 0.55,
      moons: [],
    },
    shortDescription:
      'El planeta más cercano al Sol, sin atmósfera para protegerse. De día se cuece y de noche se congela. ¡Y es el más rápido orbitando!',
    quickFacts: {
      temperature: '167 °C',
      atmosphere: 'Casi ninguna',
      moons: '0 lunas',
    },
    stats: [
      { label: 'Gravedad', value: '3.7', unit: 'm/s²', icon: STAT_ICONS.gravity },
      { label: 'Atmósfera', value: 'Traza', icon: STAT_ICONS.atmosphere },
      { label: 'Temperatura', value: '167', unit: '°C', icon: STAT_ICONS.temperature },
      { label: 'Día', value: '58.6', unit: 'días', icon: STAT_ICONS.day },
      { label: 'Año', value: '88', unit: 'días', icon: STAT_ICONS.year },
      { label: 'Distancia al Sol', value: '57.9', unit: 'M km', icon: STAT_ICONS.distance },
      { label: 'Lunas', value: '0', icon: STAT_ICONS.moons },
      { label: 'Campo magnético', value: 'Muy débil', icon: STAT_ICONS.magnetic },
    ],
    funFacts: [
      {
        emoji: '💨',
        title: 'El planeta más veloz',
        body: 'Mercurio orbita al Sol a casi 47 km por segundo. Si tú fueras así de rápido, le darías la vuelta a la Tierra en menos de 15 minutos.',
      },
      {
        emoji: '☀️',
        title: 'Un día allá dura meses',
        body: 'Mercurio rota tan despacio que un día solar (de un amanecer al siguiente) ¡dura 176 días terrestres! Más que dos años marcianos.',
      },
      {
        emoji: '🧊',
        title: 'Tiene hielo escondido',
        body: 'En los cráteres polares donde nunca llega la luz del Sol, hay hielo de agua atrapado a −173 °C aunque el resto del planeta sea un horno.',
      },
    ],
  },
  venus: {
    id: 'venus',
    name: 'Venus',
    nickname: 'La Estrella del Alba',
    diameterKm: 12_104,
    color: '#e0c089',
    colorAccent: '#b89758',
    titleColor: '#f5cc70',
    thumbnailUrl: '/textures/tumbnails/venus.png',
    available: true,
    render3D: {
      textureUrl: '/textures/venus_atmosphere.jpg',
      axialTiltDeg: 177.4,
      rotationPeriodSec: 90,
      scale: 0.55,
      moons: [],
    },
    shortDescription:
      'El planeta más caliente del sistema solar gracias a un efecto invernadero descontrolado. Sus nubes son de ácido sulfúrico y la presión te aplastaría como un papel.',
    quickFacts: {
      temperature: '464 °C',
      atmosphere: '96% CO₂',
      moons: '0 lunas',
    },
    stats: [
      { label: 'Gravedad', value: '8.87', unit: 'm/s²', icon: STAT_ICONS.gravity },
      { label: 'Atmósfera', value: '96% CO₂', icon: STAT_ICONS.atmosphere },
      { label: 'Temperatura', value: '464', unit: '°C', icon: STAT_ICONS.temperature },
      { label: 'Día', value: '243', unit: 'días', icon: STAT_ICONS.day },
      { label: 'Año', value: '225', unit: 'días', icon: STAT_ICONS.year },
      { label: 'Distancia al Sol', value: '108.2', unit: 'M km', icon: STAT_ICONS.distance },
      { label: 'Lunas', value: '0', icon: STAT_ICONS.moons },
      { label: 'Campo magnético', value: 'Inducido', icon: STAT_ICONS.magnetic },
    ],
    funFacts: [
      {
        emoji: '🙃',
        title: 'Su día dura más que su año',
        body: '¡Venus rota tan despacio que un día (243 días terrestres) es más largo que dado una vuelta al Sol (225 días)! Y rota al revés que los demás.',
      },
      {
        emoji: '☁️',
        title: 'Llueve ácido',
        body: 'En las nubes altas hay gotitas de ácido sulfúrico que se evaporan antes de tocar el suelo porque hace demasiado calor.',
      },
      {
        emoji: '⚖️',
        title: 'Te aplastaría',
        body: 'La presión atmosférica en Venus es 90 veces mayor que en la Tierra. Sería como estar a 900 m bajo el océano.',
      },
    ],
  },
  tierra: {
    id: 'tierra',
    name: 'Tierra',
    nickname: 'Nuestro Hogar',
    diameterKm: 12_756,
    color: '#3c83b8',
    colorAccent: '#1f5a85',
    titleColor: '#5ab6ff',
    thumbnailUrl: '/textures/tumbnails/earth.png',
    available: true,
    render3D: {
      textureUrl: '/textures/earth_daymap.jpg',
      cloudsUrl: '/textures/earth_clouds.jpg',
      axialTiltDeg: 23.4,
      rotationPeriodSec: 30,
      scale: 0.55,
      moons: [
        {
          name: 'Luna',
          radius: 0.27,
          orbitRadius: 2.4,
          orbitPeriodSec: 25,
          tint: '#cfcfcf',
        },
      ],
    },
    shortDescription:
      'Nuestro planeta: el único que conocemos con vida. Tiene agua líquida en su superficie, una atmósfera respirable y una luna que estabiliza su clima.',
    quickFacts: {
      temperature: '15 °C',
      atmosphere: '78% N₂ · 21% O₂',
      moons: '1 luna',
    },
    stats: [
      { label: 'Gravedad', value: '9.81', unit: 'm/s²', icon: STAT_ICONS.gravity },
      { label: 'Atmósfera', value: '78% N₂', icon: STAT_ICONS.atmosphere },
      { label: 'Temperatura', value: '15', unit: '°C', icon: STAT_ICONS.temperature },
      { label: 'Día', value: '24', unit: 'horas', icon: STAT_ICONS.day },
      { label: 'Año', value: '365.25', unit: 'días', icon: STAT_ICONS.year },
      { label: 'Distancia al Sol', value: '149.6', unit: 'M km', icon: STAT_ICONS.distance },
      { label: 'Lunas', value: '1', icon: STAT_ICONS.moons },
      { label: 'Campo magnético', value: 'Fuerte', icon: STAT_ICONS.magnetic },
    ],
    funFacts: [
      {
        emoji: '🌊',
        title: 'Más agua que tierra',
        body: 'El 71% de nuestro planeta está cubierto de agua. Por eso desde el espacio se ve azul y a veces lo llaman "el planeta azul".',
      },
      {
        emoji: '🧬',
        title: 'El único con vida (que conozcamos)',
        body: 'Hay más de 8 millones de especies diferentes viviendo aquí, ¡desde bacterias hasta ballenas azules!',
      },
      {
        emoji: '🛡️',
        title: 'Un escudo invisible',
        body: 'El campo magnético de la Tierra desvía las partículas peligrosas del Sol. Sin él, la atmósfera se habría escapado al espacio hace mucho.',
      },
    ],
    coreLayers: [
      {
        id: 'corteza',
        name: 'Corteza',
        outerRadiusKm: 6_371,
        innerRadiusKm: 6_336,
        color: '#6b7c8a',
        childSummary: 'La capa más fina y donde vivimos: tierra firme y océanos.',
        detail:
          'La corteza tiene entre 5 km (océanos) y 70 km (continentes) de grosor. Está dividida en placas tectónicas que se mueven muy despacio, lo que provoca terremotos, volcanes y cordilleras.',
      },
      {
        id: 'manto',
        name: 'Manto',
        outerRadiusKm: 6_336,
        innerRadiusKm: 3_486,
        color: '#c1543b',
        childSummary: 'Una capa enorme de roca caliente que fluye despacito.',
        detail:
          'El manto mide casi 2.900 km de profundidad. Está hecho de silicatos ricos en hierro y magnesio. Aunque parece sólido, se mueve como plastilina espesa y arrastra las placas tectónicas.',
      },
      {
        id: 'nucleo-externo',
        name: 'Núcleo externo',
        outerRadiusKm: 3_486,
        innerRadiusKm: 1_216,
        color: '#e76f51',
        childSummary: 'Un océano de hierro y níquel líquido a 5.000 °C.',
        detail:
          'El núcleo externo es metal líquido en movimiento constante. Esos remolinos de hierro generan corrientes eléctricas que crean el campo magnético de la Tierra: el escudo que nos protege del viento solar.',
      },
      {
        id: 'nucleo-interno',
        name: 'Núcleo interno',
        outerRadiusKm: 1_216,
        innerRadiusKm: 0,
        color: '#ffd166',
        childSummary: 'Una bola sólida de hierro tan caliente como el Sol.',
        detail:
          'A pesar de los 5.400 °C, la presión aquí es tan brutal que el hierro y el níquel se mantienen sólidos. Es del tamaño de la Luna y se cree que crece alrededor de 1 mm cada año.',
      },
    ],
  },
  marte: {
    id: 'marte',
    name: 'Marte',
    nickname: 'El Planeta Rojo',
    diameterKm: 6_792,
    color: '#e76f51',
    colorAccent: '#a8412a',
    titleColor: '#ff8a6b',
    thumbnailUrl: '/textures/tumbnails/mars.png',
    available: true,
    render3D: {
      textureUrl: '/textures/mars.jpg',
      axialTiltDeg: 25.2,
      rotationPeriodSec: 30,
      scale: 0.55,
      moons: [
        { name: 'Phobos', radius: 0.05, orbitRadius: 1.9, orbitPeriodSec: 6, tint: '#a89788' },
        { name: 'Deimos', radius: 0.03, orbitRadius: 2.7, orbitPeriodSec: 22, tint: '#9a8978' },
      ],
    },
    shortDescription:
      'Un mundo polvoriento y oxidado con volcanes gigantes, casquetes de hielo en sus polos y enormes tormentas de polvo que pueden cubrir todo el planeta.',
    quickFacts: {
      temperature: '−63 °C',
      atmosphere: '95% CO₂',
      moons: '2 lunas',
    },
    stats: [
      { label: 'Gravedad', value: '3.71', unit: 'm/s²', icon: STAT_ICONS.gravity },
      { label: 'Atmósfera', value: '95% CO₂', icon: STAT_ICONS.atmosphere },
      { label: 'Temperatura', value: '−63', unit: '°C', icon: STAT_ICONS.temperature },
      { label: 'Día', value: '24h 37m', icon: STAT_ICONS.day },
      { label: 'Año', value: '687', unit: 'días', icon: STAT_ICONS.year },
      { label: 'Distancia al Sol', value: '227.9', unit: 'M km', icon: STAT_ICONS.distance },
      { label: 'Lunas', value: '2', icon: STAT_ICONS.moons },
      { label: 'Campo magnético', value: 'Muy débil', icon: STAT_ICONS.magnetic },
    ],
    funFacts: [
      {
        emoji: '🌋',
        title: 'El volcán más grande del sistema solar',
        body: 'El Monte Olimpo mide 22 km de alto: ¡casi tres veces el Everest! Es tan grande como el estado de Arizona.',
      },
      {
        emoji: '🌬️',
        title: 'Tormentas de polvo gigantes',
        body: 'En Marte hay tormentas de polvo que pueden cubrir todo el planeta y durar varios meses sin parar.',
      },
      {
        emoji: '🧊',
        title: 'Tiene hielo en los polos',
        body: 'En sus dos polos hay hielo de agua y de dióxido de carbono (¡hielo seco!) que crece en invierno y se encoge en verano.',
      },
    ],
    coreLayers: [
      {
        id: 'corteza',
        name: 'Corteza',
        outerRadiusKm: 3_390,
        innerRadiusKm: 3_340,
        color: '#e76f51',
        childSummary: 'La piel rocosa de Marte, llena de polvo rojo y cráteres.',
        detail:
          'La corteza marciana tiene entre 30 y 50 km de espesor (más gruesa que la de la Tierra). Está hecha de roca volcánica rica en hierro oxidado, lo que le da su color rojizo característico.',
      },
      {
        id: 'manto',
        name: 'Manto',
        outerRadiusKm: 3_340,
        innerRadiusKm: 1_830,
        color: '#c1543b',
        childSummary: 'Una capa de roca caliente y casi sólida, mucho más densa que la corteza.',
        detail:
          'El manto se extiende hasta unos 1.560 km de profundidad. Está formado por silicatos ricos en hierro y magnesio. Hace miles de millones de años, el calor del manto alimentó los volcanes gigantes de Marte.',
      },
      {
        id: 'nucleo',
        name: 'Núcleo',
        outerRadiusKm: 1_830,
        innerRadiusKm: 0,
        color: '#7a2a1d',
        childSummary: 'El corazón metálico de Marte, hecho de hierro líquido.',
        detail:
          'Gracias a la misión InSight de la NASA sabemos que el núcleo de Marte mide unos 1.830 km de radio y es líquido. Está hecho de hierro, níquel y azufre. ¡Es proporcionalmente más grande que el de la Tierra!',
      },
    ],
  },
  jupiter: {
    id: 'jupiter',
    name: 'Júpiter',
    nickname: 'El Gigante',
    diameterKm: 142_984,
    color: '#c89572',
    colorAccent: '#946a4e',
    titleColor: '#f4b485',
    thumbnailUrl: '/textures/tumbnails/jupiter.png',
    available: true,
    render3D: {
      textureUrl: '/textures/jupiter.jpg',
      axialTiltDeg: 3.13,
      rotationPeriodSec: 18,
      scale: 0.55,
      moons: [
        { name: 'Ío', radius: 0.07, orbitRadius: 1.85, orbitPeriodSec: 9, tint: '#f5d05c' },
        { name: 'Europa', radius: 0.07, orbitRadius: 2.2, orbitPeriodSec: 14, tint: '#d4b594' },
        { name: 'Ganímedes', radius: 0.11, orbitRadius: 2.7, orbitPeriodSec: 22, tint: '#a89788' },
        { name: 'Calisto', radius: 0.10, orbitRadius: 3.3, orbitPeriodSec: 32, tint: '#7d6e5e' },
      ],
    },
    shortDescription:
      'El planeta más grande del sistema solar, un gigante gaseoso con tormentas más antiguas que tus bisabuelos y un ejército de lunas a su alrededor.',
    quickFacts: {
      temperature: '−110 °C',
      atmosphere: '90% H₂',
      moons: '95 lunas',
    },
    stats: [
      { label: 'Gravedad', value: '24.79', unit: 'm/s²', icon: STAT_ICONS.gravity },
      { label: 'Atmósfera', value: '90% H₂', icon: STAT_ICONS.atmosphere },
      { label: 'Temperatura', value: '−110', unit: '°C', icon: STAT_ICONS.temperature },
      { label: 'Día', value: '9h 56m', icon: STAT_ICONS.day },
      { label: 'Año', value: '11.9', unit: 'años', icon: STAT_ICONS.year },
      { label: 'Distancia al Sol', value: '778.5', unit: 'M km', icon: STAT_ICONS.distance },
      { label: 'Lunas', value: '95', icon: STAT_ICONS.moons },
      { label: 'Campo magnético', value: 'Enorme', icon: STAT_ICONS.magnetic },
    ],
    funFacts: [
      {
        emoji: '🌀',
        title: 'Una tormenta de 350 años',
        body: 'La Gran Mancha Roja es un huracán gigantesco que lleva al menos 350 años girando. Cabrían dos Tierras dentro de ella.',
      },
      {
        emoji: '🌍',
        title: '1.300 Tierras caben dentro',
        body: 'Júpiter es tan enorme que, si lo vaciaras, podrías meter más de mil trescientos planetas como el nuestro adentro.',
      },
      {
        emoji: '🛡️',
        title: 'Nuestro guardaespaldas cósmico',
        body: 'Con su gravedad descomunal, Júpiter atrae cometas y asteroides que podrían chocar contra la Tierra. ¡Nos protege!',
      },
    ],
  },
  saturno: {
    id: 'saturno',
    name: 'Saturno',
    nickname: 'El Señor de los Anillos',
    diameterKm: 120_536,
    color: '#e3c98e',
    colorAccent: '#a88f5c',
    titleColor: '#f5d885',
    thumbnailUrl: '/textures/tumbnails/saturn.png',
    thumbnailShape: 'square',
    available: true,
    render3D: {
      textureUrl: '/textures/saturn.jpg',
      ringUrl: '/textures/saturn_ring_alpha.png',
      ringInner: 1.25,
      ringOuter: 2.3,
      axialTiltDeg: 26.7,
      rotationPeriodSec: 20,
      scale: 0.55,
      moons: [
        { name: 'Titán', radius: 0.10, orbitRadius: 3.2, orbitPeriodSec: 28, tint: '#d8a96a' },
        { name: 'Encélado', radius: 0.05, orbitRadius: 2.6, orbitPeriodSec: 18, tint: '#f4f4f4' },
      ],
    },
    shortDescription:
      'El planeta de los anillos espectaculares: miles de millones de pedazos de hielo y roca girando alrededor. Es tan poco denso que flotaría en agua.',
    quickFacts: {
      temperature: '−140 °C',
      atmosphere: '96% H₂',
      moons: '146 lunas',
    },
    stats: [
      { label: 'Gravedad', value: '10.44', unit: 'm/s²', icon: STAT_ICONS.gravity },
      { label: 'Atmósfera', value: '96% H₂', icon: STAT_ICONS.atmosphere },
      { label: 'Temperatura', value: '−140', unit: '°C', icon: STAT_ICONS.temperature },
      { label: 'Día', value: '10h 42m', icon: STAT_ICONS.day },
      { label: 'Año', value: '29.5', unit: 'años', icon: STAT_ICONS.year },
      { label: 'Distancia al Sol', value: '1,434', unit: 'M km', icon: STAT_ICONS.distance },
      { label: 'Lunas', value: '146', icon: STAT_ICONS.moons },
      { label: 'Campo magnético', value: 'Fuerte', icon: STAT_ICONS.magnetic },
    ],
    funFacts: [
      {
        emoji: '🛁',
        title: 'Flotaría en una bañera',
        body: 'Saturno está hecho casi todo de hidrógeno y helio. Es tan poco denso que, si tuvieras una bañera lo suficientemente grande, ¡flotaría!',
      },
      {
        emoji: '💍',
        title: 'Anillos finísimos y enormes',
        body: 'Sus anillos miden 282.000 km de ancho pero solo unos 10 metros de grosor. Están hechos de billones de pedazos de hielo.',
      },
      {
        emoji: '🌧️',
        title: 'Titán llueve metano',
        body: 'Su luna más grande, Titán, tiene lagos y ríos… pero de metano líquido en vez de agua. ¡Y atmósfera más densa que la Tierra!',
      },
    ],
  },
  urano: {
    id: 'urano',
    name: 'Urano',
    nickname: 'El Inclinado',
    diameterKm: 51_118,
    color: '#9fd3d1',
    colorAccent: '#6ba9a6',
    titleColor: '#a6ece8',
    thumbnailUrl: '/textures/tumbnails/uranus.png',
    available: true,
    render3D: {
      textureUrl: '/textures/uranus.jpg',
      axialTiltDeg: 97.8,
      rotationPeriodSec: 24,
      scale: 0.45,
      moons: [
        { name: 'Titania', radius: 0.06, orbitRadius: 2.2, orbitPeriodSec: 18, tint: '#b9b1a8' },
        { name: 'Oberón', radius: 0.06, orbitRadius: 2.8, orbitPeriodSec: 26, tint: '#a8a098' },
      ],
    },
    shortDescription:
      'Un gigante de hielo azulado que rota acostado de lado. Tan inclinado que cada uno de sus polos pasa 42 años en luz y 42 años en oscuridad.',
    quickFacts: {
      temperature: '−195 °C',
      atmosphere: '83% H₂',
      moons: '27 lunas',
    },
    stats: [
      { label: 'Gravedad', value: '8.87', unit: 'm/s²', icon: STAT_ICONS.gravity },
      { label: 'Atmósfera', value: '83% H₂', icon: STAT_ICONS.atmosphere },
      { label: 'Temperatura', value: '−195', unit: '°C', icon: STAT_ICONS.temperature },
      { label: 'Día', value: '17h 14m', icon: STAT_ICONS.day },
      { label: 'Año', value: '84', unit: 'años', icon: STAT_ICONS.year },
      { label: 'Distancia al Sol', value: '2,871', unit: 'M km', icon: STAT_ICONS.distance },
      { label: 'Lunas', value: '27', icon: STAT_ICONS.moons },
      { label: 'Campo magnético', value: 'Inclinado', icon: STAT_ICONS.magnetic },
    ],
    funFacts: [
      {
        emoji: '🛏️',
        title: 'Rota acostado',
        body: 'Urano está inclinado 98°: prácticamente rueda alrededor del Sol en lugar de girar como un trompo, como los otros planetas.',
      },
      {
        emoji: '🎭',
        title: 'Lunas con nombres de Shakespeare',
        body: 'Sus 27 lunas se llaman como personajes de Shakespeare y Alexander Pope: Miranda, Titania, Oberón, Ariel, Umbriel...',
      },
      {
        emoji: '💎',
        title: 'Quizás llueven diamantes',
        body: 'Los científicos creen que en lo profundo de Urano hay tanta presión que el carbono se aplasta y forma diamantes que caen como lluvia.',
      },
    ],
  },
  neptuno: {
    id: 'neptuno',
    name: 'Neptuno',
    nickname: 'El Azul Profundo',
    diameterKm: 49_528,
    color: '#3d5fa3',
    colorAccent: '#243d70',
    titleColor: '#6c95e8',
    thumbnailUrl: '/textures/tumbnails/neptune.png',
    available: true,
    render3D: {
      textureUrl: '/textures/neptune.jpg',
      axialTiltDeg: 28.3,
      rotationPeriodSec: 22,
      scale: 0.55,
      moons: [
        { name: 'Tritón', radius: 0.08, orbitRadius: 2.4, orbitPeriodSec: 20, tint: '#cfd6dc' },
      ],
    },
    shortDescription:
      'El planeta más lejano del Sol, con vientos más rápidos que el sonido y un color azul intenso que parece tinta. Tarda 165 años en dar una vuelta al Sol.',
    quickFacts: {
      temperature: '−200 °C',
      atmosphere: '80% H₂',
      moons: '16 lunas',
    },
    stats: [
      { label: 'Gravedad', value: '11.15', unit: 'm/s²', icon: STAT_ICONS.gravity },
      { label: 'Atmósfera', value: '80% H₂', icon: STAT_ICONS.atmosphere },
      { label: 'Temperatura', value: '−200', unit: '°C', icon: STAT_ICONS.temperature },
      { label: 'Día', value: '16h 6m', icon: STAT_ICONS.day },
      { label: 'Año', value: '165', unit: 'años', icon: STAT_ICONS.year },
      { label: 'Distancia al Sol', value: '4,495', unit: 'M km', icon: STAT_ICONS.distance },
      { label: 'Lunas', value: '16', icon: STAT_ICONS.moons },
      { label: 'Campo magnético', value: 'Fuerte', icon: STAT_ICONS.magnetic },
    ],
    funFacts: [
      {
        emoji: '🌪️',
        title: 'Vientos supersónicos',
        body: 'En Neptuno los vientos soplan a 2.100 km/h, ¡más rápido que el sonido! Son los vientos más rápidos de todo el sistema solar.',
      },
      {
        emoji: '🔭',
        title: 'Lo descubrieron con matemáticas',
        body: 'Es el único planeta que se descubrió haciendo cálculos antes de verlo: notaron que algo invisible jalaba la órbita de Urano.',
      },
      {
        emoji: '🌀',
        title: 'Tritón gira al revés',
        body: 'Su luna más grande, Tritón, orbita en sentido contrario a la rotación del planeta. Probablemente fue capturada al pasar cerca.',
      },
    ],
  },
  sol: {
    id: 'sol',
    name: 'Sol',
    nickname: 'Nuestra Estrella',
    diameterKm: 1_392_700,
    color: '#f5a93b',
    colorAccent: '#d97e0a',
    titleColor: '#ffd166',
    thumbnailUrl: '/textures/tumbnails/sun.png',
    available: true,
    render3D: {
      textureUrl: '/textures/sun.jpg',
      axialTiltDeg: 7.25,
      rotationPeriodSec: 80, // rota lento (real ~25 días)
      scale: 0.66, // 15% más pequeño que el resto de planetas (0.78 * 0.85)
      emissive: true,
      glowColor: '#ffb74a',
      moons: [],
    },
    shortDescription:
      'Nuestra estrella, una bola gigante de plasma que crea energía fusionando hidrógeno. Contiene casi toda la masa del sistema solar y nos da luz y calor.',
    quickFacts: {
      temperature: '5,500 °C',
      atmosphere: '73% H · 25% He',
      moons: '8 planetas',
    },
    stats: [
      { label: 'Gravedad', value: '274', unit: 'm/s²', icon: STAT_ICONS.gravity },
      { label: 'Composición', value: '73% H · 25% He', icon: STAT_ICONS.composition },
      { label: 'Superficie', value: '5,500', unit: '°C', icon: STAT_ICONS.temperature },
      { label: 'Rotación', value: '25–35', unit: 'días', icon: STAT_ICONS.day },
      { label: 'Edad', value: '4,600', unit: 'M años', icon: STAT_ICONS.year },
      { label: 'A la Tierra', value: '149.6', unit: 'M km', icon: STAT_ICONS.distance },
      { label: 'Planetas', value: '8', icon: STAT_ICONS.bodies },
      { label: 'Campo magnético', value: 'Muy fuerte', icon: STAT_ICONS.magnetic },
    ],
    funFacts: [
      {
        emoji: '⚖️',
        title: 'Contiene el 99.8% de la masa',
        body: 'Todo lo demás del sistema solar (planetas, lunas, asteroides, cometas) suma apenas el 0.2% del peso total. ¡El Sol es casi todo!',
      },
      {
        emoji: '⚡',
        title: 'Su luz tarda 8 minutos',
        body: 'La luz viaja a 300.000 km/s, pero el Sol está tan lejos que cuando ves un amanecer, esa luz salió del Sol hace 8 minutos.',
      },
      {
        emoji: '🌍',
        title: 'Caben 1.3 millones de Tierras',
        body: 'Si vaciáramos el Sol, podríamos meter dentro más de un millón trescientas mil Tierras. ¡Es realmente gigantesco!',
      },
    ],
  },

  /* -------- Sistema Solar (entrada "macro" del sidebar) -------- */
  'sistema-solar': {
    id: 'sistema-solar',
    name: 'Sistema Solar',
    nickname: 'Nuestro vecindario cósmico',
    diameterKm: 9_000_000_000, // ~diámetro de la órbita de Neptuno (referencia)
    color: '#6c95e8',
    colorAccent: '#243d70',
    titleColor: '#a6c8ff',
    thumbnailUrl: undefined, // CSS sphere por ahora
    available: true,
    shortDescription:
      'Un sol, 8 planetas, decenas de lunas, asteroides y cometas viajando juntos por la Vía Láctea. Todo lo que conoces (incluida tú) vive aquí.',
    quickFacts: {
      temperature: '4,600 M años',
      atmosphere: '8 planetas + 1 estrella',
      moons: 'Vía Láctea',
    },
    stats: [
      { label: 'Edad', value: '4,600', unit: 'M años', icon: STAT_ICONS.year },
      { label: 'Planetas', value: '8', icon: STAT_ICONS.bodies },
      { label: 'Lunas conocidas', value: '290+', icon: STAT_ICONS.moons },
      {
        label: 'Diámetro orbital',
        value: '9,000',
        unit: 'M km',
        icon: STAT_ICONS.distance,
      },
      { label: 'Velocidad orbital', value: '220', unit: 'km/s', icon: STAT_ICONS.day },
      { label: 'Año galáctico', value: '225', unit: 'M años', icon: STAT_ICONS.year },
      { label: 'Brazo galáctico', value: 'Orión', icon: STAT_ICONS.composition },
      { label: 'Distancia al centro', value: '26,000', unit: 'a-luz', icon: STAT_ICONS.distance },
    ],
    funFacts: [
      {
        emoji: '🌌',
        title: 'La Vía Láctea',
        body: 'Vivimos en una galaxia espiral con unos 100.000 millones de estrellas que mide ~100.000 años luz de ancho. Nuestro Sistema Solar es un puntito en uno de sus brazos.',
      },
      {
        emoji: '🪨',
        title: 'Cinturón de asteroides',
        body: 'Entre Marte y Júpiter hay miles de rocas orbitando: el cinturón de asteroides. Si las juntaras todas, no harían ni media Luna.',
      },
      {
        emoji: '❄️',
        title: 'Más allá de Neptuno',
        body: 'Existe el cinturón de Kuiper, una zona helada con planetas enanos como Plutón. Y más lejos aún está la nube de Oort, donde nacen los cometas.',
      },
      {
        emoji: '🌀',
        title: 'Todos giramos juntos',
        body: 'El Sol y los planetas orbitan el centro de la Vía Láctea a 220 km/s. Dar una vuelta completa tarda 225 millones de años — una "año galáctico".',
      },
    ],
  },
};

export const PLANET_ORDER: PlanetId[] = [
  'mercurio',
  'venus',
  'tierra',
  'marte',
  'jupiter',
  'saturno',
  'urano',
  'neptuno',
];

export const ALL_BODIES_ORDER: PlanetId[] = [...PLANET_ORDER, 'sol'];

export const getPlanet = (id: PlanetId): Planet => PLANETS[id];
