# Cosmos Explorer

Módulo educativo interactivo del sistema solar para niños de 8-12 años, construido como proyecto aislado para iterar rápido. Eventualmente se integrará a una plataforma educativa madre que usa el mismo stack.

## Stack obligatorio (debe coincidir con la plataforma madre)

- **Vite 5** + **React 18** + **TypeScript** strict
- **React Router DOM 7**
- **framer-motion** para animaciones de UI
- **three** + **@react-three/fiber** + **@react-three/drei** para escenas 3D
- **Zustand** para estado global
- **CSS plano** con metodología BEM, prefijo `cosmos-*`
- Design tokens en `src/styles/tokens.css`
- ESLint + Prettier
- **NO** Tailwind, CSS-in-JS ni styled-components

## Cómo correrlo

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # tsc -b && vite build
npm run lint
```

## Estructura

```
public/
  textures/                              # texturas planetarias (CC BY 4.0)
    tumbnails/                           # thumbnails PNG para sidebar/compare
src/
  components/                            # Atomic Design
    atoms/                               # primitivos (Button, Chip, PlanetSphere, …)
    molecules/                           # combinaciones (StatRow, PlanetListItem, ZoomControls, …)
    organisms/                           # secciones (Sidebar, ExplorerHero, …)
      details/                           # variantes del panel derecho según viewMode
  data/                                  # datos hardcodeados (NASA + visuales)
  pages/                                 # 1 ruta activa (ExplorerPage)
  router/                                # AppRouter (redirige /compare y /core a /)
  store/                                 # Zustand global (single source of truth)
  styles/                                # tokens.css + global.css + dark-theme.css
  types/                                 # contratos TypeScript compartidos
  utils/                                 # helpers puros (telemetry, comparison, …)
```

## Modelo mental del Explorer

Una sola ruta (`/`) con un layout fijo de **3 columnas**:

```
[Sidebar]            [Hero - centro]                       [DetailsPanel]
 - Back              - Eyebrow + título (color por planeta)  - ThemeToggle
 - COSMOS card       - Apodo + descripción + chips           - Datos variantes:
 - Sistema Solar     - Centro 3D / strip / pair               · ExploreDetails
   (entry macro)     - Botones de acción (filter group)       · CoreDetails
 - Planetas          - Zoom controls                          · CompareDetails
 - Nuestra estrella
```

**Lo que vive en el CENTRO depende del estado del store**, decidido por `HeroCenterView`:

| selectedPlanetId | viewMode | systemView | Centro |
|---|---|---|---|
| `sistema-solar` | — | `3d` | `SolarSystem3D` (R3F, planetas orbitando) |
| `sistema-solar` | — | `strip` | `ScaleStrip` (PNGs a escala real, drag horizontal) |
| planeta | `compare` | — | `ComparisonPair` (2 planetas lado a lado) |
| planeta | `core` o `explore` | — | `Planet3DCanvas` (decide internamente cross-section o esfera) |

**Lo que vive en el PANEL DERECHO** depende solo de viewMode (ver `organisms/details/`).

## Convenciones

- **CSS BEM** con prefijo `cosmos-*` (ej: `cosmos-planet-item__name--selected`)
- **Componentes**: `FC<Props>` con interface adyacente, exportación nombrada
- **Tipos**: en `src/types/` cuando se comparten, inline cuando son locales
- **Colores**: siempre via design tokens (`var(--cosmos-color-coral)`). NO hardcodear hex en componentes
- **Strict TypeScript**: sin `any`, sin imports no usados
- **Atomic Design**: atom no importa molecule ni organism. Atom NO accede al store (si lo necesita, es molecule)
- **Dark mode**: overrides en `src/styles/dark-theme.css`, activado por `data-theme="dark"` en `.cosmos-explorer`. Light = estilo base de cada componente

## Roadmap pendiente

- Integrar al host real (postMessage o ruta hija)
- Conectar `BackToPlatform` al sistema de navegación del host
- Vista de núcleo (`Core`) para más planetas — actualmente solo Marte y Tierra tienen `coreLayers`
- Más metáforas kid-friendly en `utils/comparison.ts` para pares de planetas
- Posible Quiz / Timeline mode (agregar viewMode → registrar en `HeroCenterView`)
