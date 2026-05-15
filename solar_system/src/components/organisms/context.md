# `organisms/`

Secciones completas con orquestación. Aquí vive la lógica de layout y la conexión con datos.

## Inventario

| Archivo                  | Qué hace |
|--------------------------|----------|
| `Sidebar.tsx`            | Columna izquierda. Zona **estática** arriba (back + COSMOS card) + zona **scrolleable** abajo (PLANETAS + NUESTRA ESTRELLA cards). |
| `ExplorerHero.tsx`       | Zona central del Explorer: eyebrow + título (color del planeta) + apodo + descripción + chips quick-facts + viewer 3D como capa de fondo + botones (Explorar / Ver núcleo / Comparar). |
| `DetailsPanel.tsx`       | Columna derecha. Zona **estática** arriba (`ThemeToggle`) + zona **scrolleable** abajo (DATOS DEL PLANETA + DATOS CURIOSOS cards). |
| `PlanetViewer3D.tsx`     | Wrapper que decide qué renderizar: si `planet.render3D` existe, monta `Planet3DCanvas` (lazy) con `Suspense`; si no, fallback a placeholder CSS animado. Caso Sol = placeholder CSS. |
| `Planet3DCanvas.tsx`     | **Escena R3F**. Canvas con: planet body texturizado (+ clouds layer si aplica, anillos si aplica), moons orbitando con líneas punteadas, lights, OrbitControls (drag + autorotate, sin zoom de scroll), botones +/- de zoom (escala el grupo del planeta vía state). |

## Capa 3D — detalles clave

- **Tilt axes**: el grupo padre rota en Z según `axialTiltDeg`. Las moons orbitan en el plano ecuatorial del planeta (no en el plano del mundo).
- **Cloud layer (Tierra)**: usa la textura como `alphaMap` (no `map`) para que las áreas oscuras del archivo sean transparentes y se vea la superficie debajo. Sin esto la Tierra se ve muy oscura.
- **Saturn rings**: `ringGeometry` rotado 90° en X con la textura del anillo como `meshBasicMaterial` con `DoubleSide` y `depthWrite={false}`.
- **Atmosphere fresnel**: una esfera ligeramente más grande con `BackSide` + `AdditiveBlending` y opacidad muy baja, da un halo sutil alrededor del planeta.
- **Zoom UI**: en vez de mover la cámara (que peleaba con OrbitControls + autoRotate), escalamos el grupo del planeta via React state. Bulletproof.
- **Lazy load**: el bundle de three.js (~230 KB gzip) se carga solo cuando se monta `Planet3DCanvas`. Mientras carga, se ve el placeholder CSS.

## Reglas

- Leen del store libremente.
- Importan de `data/` para acceder a planetas.
- NO importar otros organisms para evitar acoplamiento — si dos organisms necesitan comunicarse, va por el store.
