# Cell Architecture Studio

Plataforma educativa interactiva para que niños de 9 a 13 años exploren la arquitectura de las células: visor 3D de la célula animal con organelos seleccionables, panel de detalles biológicos, vistas de microscopio y comparación entre tipos de célula.

> Proyecto independiente que vive dentro del paraguas [`explore-education`](https://github.com/davereyes/explore-education) y que eventualmente se integrará como módulo de la plataforma `word-rush-kids-web`.

## Estado actual (MVP)

| Característica | Estado |
|---|---|
| Visor 3D de **Célula Animal** con OrbitControls | ✅ |
| Organelos seleccionables (núcleo, nucléolo, mitocondrias, RE rugoso, RE liso, Golgi, lisosomas, membrana) | ✅ |
| Panel de detalles + notas biológicas + "dónde ocurre" | ✅ |
| Modos de vista: sólido / capas / sección transversal con plano de corte | ✅ |
| Acciones: Aislar / Ocultar otros / Restablecer / Captura PNG | ✅ |
| Sección microscopio (placeholders + slot para imágenes reales) | ✅ |
| Comparador de células (stub) | ✅ |
| Bilingüe es / en | ✅ |
| Resto de células (vegetal, neurona, etc.) | 🔒 deshabilitadas — replicar patrón cuando la animal quede pulida |
| Exportación 3D | ⏸ próximamente |

## Stack

- **Vite 5 + React 18 + TypeScript** (strict)
- **three.js + @react-three/fiber + @react-three/drei + @react-three/postprocessing** (visor 3D, outline highlight)
- **Zustand** para estado del estudio (célula activa, organelo, view mode, isolate/hide, cross-section)
- **CSS Modules + BEM `ca-`** + paleta clara propia en `src/styles/variables.css`
- **React Router DOM 7** (ruta única por ahora)
- **Framer Motion** disponible para futuras animaciones de panel

Stack y convenciones alineadas con `word-rush-kids-web` para que la integración futura sea de bajo costo.

## Arquitectura

Atomic Design + Clean Architecture:

```
src/
  domain/           # entidades + interfaces (sin dependencias de framework)
  application/      # casos de uso
  infrastructure/   # repositorio local + datos estáticos de células
  presentation/
    components/{atoms,molecules,organisms,templates,pages}
    context/        # LanguageContext (es/en)
    store/          # Zustand
  styles/           # tokens + global
```

El modelo 3D **es procedural** (esferas, torus knots, capsules) construido con primitivas de three.js. Cada organelo es un `<group>` con `userData.organelleId` que reacciona a hover/click y se conecta al store. Esto se puede reemplazar luego por un GLB descargado de Sketchfab sin tocar la API del `CellViewer3D`: basta con cargar el GLB con `useGLTF`, mapear `meshName → organelleId` y mantener los wrappers `OrganelleGroup`.

### Reemplazar la geometría procedural por un GLB

1. Descargar un modelo CC-BY de Sketchfab con organelos en meshes separados y nombrados (candidatos: [James_Anthony](https://sketchfab.com/3d-models/animal-cell-737b35f5b779418998d834c28ed15295), [montanna anotado](https://sketchfab.com/3d-models/animal-cell-20-annotated-in-english-0d9f7f4257224975b2ef83a283709b2f), [AnatoCells](https://sketchfab.com/3d-models/animal-cell-e2fc495016ca4542b4ff424e22e62277)).
2. Optimizar con `gltf-pipeline` + Draco (`gltf-pipeline -i input.glb -o public/models/animal-cell.glb -d`).
3. En `src/infrastructure/data/cells.ts`, llenar `modelPath` y los `meshName` por organelo.
4. En `AnimalCellModel.tsx` reemplazar las primitivas por `useGLTF` + recorrer `nodes` aplicando los wrappers `OrganelleGroup`.

## Scripts

```bash
npm install
npm run dev         # http://localhost:3000
npm run build       # tsc --noEmit && vite build
npm run typecheck
npm run lint
npm run format
```

## Atribuciones

- Geometría procedural propia inspirada en diagramas biológicos estándar.
- Contenido biológico basado en referencias generales (Britannica, Khan Academy).
- Cuando se sustituyan los placeholders del microscopio por imágenes reales, listar la fuente y licencia aquí (preferir Wikimedia Commons / NIH Image Gallery).

## Próximos pasos

1. Replicar la pantalla para las 6 células restantes una vez aprobada Animal Cell.
2. Reemplazar la geometría procedural por GLB optimizado.
3. Imágenes de microscopio reales con créditos CC.
4. Vista de comparación lado a lado.
5. Integración con Firebase de `word-rush-kids-web` (auth + notebooks).
