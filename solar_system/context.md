# Cosmos Explorer

Módulo educativo interactivo del sistema solar para niños de 8-12 años, construido como proyecto aislado para iterar rápido. Eventualmente se integrará a una plataforma educativa madre que usa el mismo stack.

## Stack obligatorio (debe coincidir con la plataforma madre)

- **Vite 5** + **React 18** + **TypeScript** strict
- **React Router DOM 7**
- **framer-motion** para animaciones de UI
- **three** + **@react-three/fiber** + **@react-three/drei** para la escena 3D del planeta
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
  textures/          # texturas planetarias (NASA/SolarSystemScope, CC BY 4.0)
src/
  components/        # Atomic Design (atoms → molecules → organisms → templates)
  data/              # datos hardcodeados (planetas, lunas, NASA)
  pages/             # 3 rutas: ExplorerPage (/), ComparePage (/compare), CrossSectionPage (/core)
  router/            # AppRouter
  store/             # Zustand store global
  styles/            # tokens.css (design tokens) + global.css (resets + font import)
  types/             # contratos TypeScript
  utils/             # helpers puros (computeStatProgress, etc.)
```

## Convenciones

- **CSS**: BEM con prefijo `cosmos-*` (ej: `cosmos-planet-item__name--selected`)
- **Componentes**: `FC<Props>` con interface adyacente, exportación nombrada
- **Tipos**: en `src/types/` cuando se comparten, inline cuando son locales
- **Colores**: siempre via design tokens (`var(--cosmos-color-coral)`). NO hardcodear hex en componentes (excepción: theme overrides en ExplorerPage.css que viven cerca del data-theme)
- **Strict mode TypeScript**: sin `any`, sin imports no usados, sin parámetros sin uso

## Roadmap pendiente

- Integrar al host real (postMessage o ruta hija)
- Conectar el botón "Volver a la plataforma" al sistema de navegación del host
- Texture cores del Sol (actualmente CSS placeholder)
- Página `/core` (Cross-section) — actualmente solo Marte; añadir capas para otros planetas
- Página `/compare` — viewer Three.js opcional para ver los cuerpos lado a lado en 3D
