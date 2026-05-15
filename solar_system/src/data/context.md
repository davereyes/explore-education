# `data/`

Datos hardcodeados de planetas y cuerpos del sistema solar.

## Archivos

- `planets.ts` — diccionario `Record<PlanetId, Planet>` con los 9 cuerpos (8 planetas + Sol).

## Estructura por planeta

```ts
{
  id: 'tierra',
  name: 'Tierra',
  nickname: 'Nuestro Hogar',
  diameterKm: 12_756,
  color: '#3c83b8',
  colorAccent: '#1f5a85',
  available: true,
  shortDescription: 'Nuestro planeta: el único...',
  quickFacts: { temperature, atmosphere, moons },
  stats: [{ label, value, unit, icon }, ...],
  funFacts: [{ emoji, title, body }, ...],
  coreLayers: [{ id, name, outerRadiusKm, innerRadiusKm, color, childSummary, detail }, ...],
  render3D: {
    textureUrl,
    cloudsUrl?, ringUrl?, ringInner?, ringOuter?,
    axialTiltDeg,
    rotationPeriodSec,
    scale,           // multiplicador visual (Mercurio 0.72, resto 0.55)
    moons: [{ name, radius, orbitRadius, orbitPeriodSec, tint }, ...]
  }
}
```

## Fuente de datos científicos

NASA Planetary Fact Sheets: <https://nssdc.gsfc.nasa.gov/planetary/factsheet/>

Inclinaciones, períodos de rotación, gravedades, atmósferas, lunas, distancias — todo verificado contra NASA. Donde el stat es muy variable (ej: número de lunas de Saturno cambia con descubrimientos), usamos la cifra oficial al momento de implementar.

## Lunas renderizadas (vs cantidad real)

Renderizar las 146 lunas de Saturno es absurdo visualmente. Por eso solo mostramos las "famosas" por planeta:

| Planeta  | Renderizadas                                       | Real |
|----------|----------------------------------------------------|------|
| Mercurio | —                                                  | 0    |
| Venus    | —                                                  | 0    |
| Tierra   | Luna                                               | 1    |
| Marte    | Phobos, Deimos                                     | 2    |
| Júpiter  | Ío, Europa, Ganímedes, Calisto (galileanas)        | 95   |
| Saturno  | Titán, Encélado                                    | 146  |
| Urano    | Titania, Oberón                                    | 27   |
| Neptuno  | Tritón                                             | 16   |

El **stat "Lunas"** sí muestra la cifra real, así el dato educativo es preciso.

## Cómo agregar un planeta nuevo

1. Añadir su `id` a `PlanetId` en `src/types/planet.ts`
2. Agregar el objeto al diccionario `PLANETS`
3. Agregar el `id` a `PLANET_ORDER` (o `ALL_BODIES_ORDER` si aplica)
4. Si tiene 3D: descargar textura a `public/textures/` (CC BY 4.0 desde solarsystemscope.com), llenar `render3D`
