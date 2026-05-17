# `data/`

Datos hardcoded — única fuente de verdad para planetas, datos curiosos y config visual.

## Archivos

| Archivo                          | Contenido |
|----------------------------------|-----------|
| `planets.ts`                     | Diccionario `Record<PlanetId, Planet>`. Incluye los 8 planetas + Sol + `'sistema-solar'` (entrada macro virtual con sus propias stats sobre el sistema). |
| `amazingFacts.ts`                | 6 "¿Sabías qué?" para mostrar en CompareDetails. Cada uno tiene emoji, título, body, `bannerPlanetIds` (qué thumbnails mostrar como banner) y un `accent` para el gradient del banner. |
| `solarSystemVisualization.ts`    | Config 3D del sistema solar (distancias, tamaños, velocidades, tilts, anillos). Separa visual de presentación: si quieres ajustar el sistema 3D, editas aquí. |

## Estructura del Planet

```ts
{
  id: 'tierra',
  name: 'Tierra',
  nickname: 'Nuestro Hogar',
  diameterKm: 12_756,
  color: '#3c83b8',                       // base
  colorAccent: '#1f5a85',                 // versión oscura (sombras)
  titleColor: '#5ab6ff',                  // versión vibrante (usado en hero title)
  thumbnailUrl: '/textures/tumbnails/earth.png',
  thumbnailShape: 'circle' | 'square',    // 'square' para Saturno (anillos)
  available: true,
  shortDescription: '…',
  quickFacts: { temperature, atmosphere, moons },
  stats: [{ label, value, unit, icon }, …],
  funFacts: [{ emoji, title, body }, …],
  coreLayers: [{ id, name, outerRadiusKm, innerRadiusKm, color, childSummary, detail }, …],
  render3D: {
    textureUrl,
    cloudsUrl?, ringUrl?, ringInner?, ringOuter?,
    axialTiltDeg, rotationPeriodSec,
    scale,                                // multiplicador visual en Planet3DCanvas
    emissive?, glowColor?,                // caso Sol
    moons: [{ name, radius, orbitRadius, orbitPeriodSec, tint }, …],
  }
}
```

## Fuente de datos científicos

NASA Planetary Fact Sheets — <https://nssdc.gsfc.nasa.gov/planetary/factsheet/>.
Distancias, masas, períodos, lunas: verificados. Donde el dato es muy variable (ej: lunas de Saturno cambian con cada misión nueva), usamos la cifra oficial al momento de implementar.

## Lunas renderizadas (3D singular) vs reales

Renderizar las 146 lunas de Saturno es absurdo visualmente. Mostramos las "famosas":

| Planeta  | Renderizadas en 3D singular                  | Reales |
|----------|----------------------------------------------|--------|
| Mercurio | —                                            | 0      |
| Venus    | —                                            | 0      |
| Tierra   | Luna                                         | 1      |
| Marte    | Phobos, Deimos                               | 2      |
| Júpiter  | Ío, Europa, Ganímedes, Calisto (galileanas)  | 95     |
| Saturno  | Titán, Encélado                              | 146    |
| Urano    | Titania, Oberón                              | 27     |
| Neptuno  | Tritón                                       | 16     |

El stat "Lunas" en el panel derecho sí muestra la cifra REAL para que el dato educativo sea preciso. En la vista de Sistema Solar 3D solo orbita la Luna de la Tierra (para mantener peso).

## Cómo agregar un planeta nuevo

1. Añadir su `id` a `PlanetId` en `src/types/planet.ts`
2. Agregar el objeto al diccionario `PLANETS`
3. Agregar el `id` a `PLANET_ORDER` (o `ALL_BODIES_ORDER` si aplica)
4. Si tiene 3D: descargar textura a `public/textures/` (CC BY 4.0 de solarsystemscope.com), llenar `render3D`
5. Agregar entrada en `solarSystemVisualization.ts` si debe aparecer en la vista 3D del sistema

## Cómo agregar un dato curioso ("¿Sabías qué?")

Editar `amazingFacts.ts`. Cada entry necesita:
- `id` (único, kebab-case)
- `emoji`, `title`, `body`
- `bannerPlanetIds`: array de uno o varios PlanetId — sus PNG thumbnails se renderizan como banner del card
- `accent`: hex usado en el gradient sutil del banner
