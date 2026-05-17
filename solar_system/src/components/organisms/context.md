# `organisms/`

Secciones completas con orquestación. Aquí vive la lógica de layout y la conexión con datos del store.

## Inventario

| Archivo                    | Qué hace |
|----------------------------|----------|
| `Sidebar.tsx`              | Columna izquierda. Zona estática: back + COSMOS + **Sistema Solar shortcut** (clickable, ACTIVO tab). Zona scroll: PLANETAS + NUESTRA ESTRELLA. |
| `ExplorerHero.tsx`         | "Chrome" del centro: eyebrow + título (color del planeta) + apodo + descripción + chips + viewer slot + fila de botones (filter group). |
| `HeroCenterView.tsx`       | **Router del centro** (registry pattern). Mapea `selectedPlanetId + viewMode + systemView` → componente. Agregar vista = registrar en el map. |
| `DetailsPanel.tsx`         | Panel derecho (router de ~30 líneas). Decide cuál variante de `details/` mostrar según viewMode. |
| `details/`                 | Variantes del panel derecho: `ExploreDetails`, `CoreDetails`, `CompareDetails`. Cada una maneja su propio estado de expandido. |
| `PlanetViewer3D.tsx`       | Wrapper para el planeta individual. Si hay `render3D` → `Planet3DCanvas` (lazy); si no → placeholder CSS (caso Sol fallback). |
| `Planet3DCanvas.tsx`       | **Escena R3F** de un planeta. Modo `explore` (esfera + clouds + anillos + lunas + auto-rotate) o modo `core` (cross-section concéntrica con clipping + labels Html). Exporta `RadialRing` para reuso. |
| `ScaleStrip.tsx`           | Tira horizontal de los 8 planetas (sin Sol) a escala real proporcional usando PNG thumbnails. Scroll horizontal nativo + flechas back/forward (StripNav) + zoom (ZoomControls). |
| `ComparisonPair.tsx`       | 2 planetas lado a lado. El mayor ocupa ~tamaño solo de la Tierra; el menor proporcional. Saturno usa overflow visible (anillos sin reservar espacio). |
| `ComparisonInfoCard.tsx`   | Card del panel derecho cuando comparas: 2 selectores + tabla de stats + tip por planeta + metáfora kid-friendly. Usa `setComparisonPair` atómico. |
| `SolarSystem3D.tsx`        | Wrapper lazy del canvas 3D del sistema solar. |
| `SolarSystem3DCanvas.tsx`  | Sol + 8 planetas orbitando + Luna terrestre + anillos Saturno (radial UV reusando `RadialRing`) + labels Html. La config (distancias/tamaños/velocidades) vive en `data/solarSystemVisualization.ts`. |

## Capa 3D — detalles clave

- **Tilt axes**: grupo padre rota Z según `axialTiltDeg`. Moons orbitan en plano ecuatorial.
- **Cloud layer (Tierra)**: textura como `alphaMap` (no `map`) → solo las nubes brillantes son visibles.
- **Saturn rings**: `RingGeometry` con UVs REMAPEADOS radialmente (componente `RadialRing` exportado de `Planet3DCanvas`). El strip de textura se mapea como bandas concéntricas, no como cuadrado plano.
- **Atmosphere fresnel**: esfera ligeramente mayor con `BackSide` + `AdditiveBlending`.
- **Sol**: sin corona — solo cuerpo emisivo con `meshBasicMaterial + toneMapped=false`. Decisión del usuario; antes había 3 capas de glow.
- **Earth extra glow** en SolarSystem3D: `extraEmissive: 0.18` (configurado en `solarSystemVisualization.ts`) para que destaque entre los planetas.
- **Zoom UI**: escala el grupo del planeta vía React state (`cameraZoom` en store). NO mueve la cámara (que peleaba con OrbitControls).
- **Lazy load**: bundle three.js (~233 KB gzip) solo se carga al montar canvas.

## ViewRouter pattern

`HeroCenterView` es el ejemplo de Open/Closed Principle en el proyecto. Agregar un nuevo modo:

```tsx
// 1. Añadir id al union
type CenterViewId = 'system-3d' | 'system-strip' | 'compare' | 'planet' | 'timeline';

// 2. Registrar componente
const CENTER_VIEW_COMPONENTS: Record<CenterViewId, FC<CenterViewProps>> = {
  // …
  timeline: ({ planet }) => <Timeline planet={planet} />,
};

// 3. Mapear estado a id en resolveCenterViewId
```

ExplorerHero no se toca. Lo mismo aplica al panel derecho: nuevo componente en `details/` + branch en `DetailsPanel.tsx`.

## Reglas

- Leen del store libremente.
- Importan de `data/` para datos / `utils/` para helpers.
- NO importar otros organisms salvo wrappers claros (HeroCenterView importa view components; DetailsPanel importa variantes de `details/`). Comunicación entre organisms va por el store.
