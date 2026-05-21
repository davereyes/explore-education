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

El visor ya carga GLB automáticamente cuando `cell.modelPath` está definido (ver `src/presentation/components/organisms/CellViewer3D/GLBCellModel.tsx`). Pasos:

1. Descargar un GLB. Recomendado: **[NIH 3D Print Exchange](https://3d.nih.gov/)** — modelos hechos por biólogos, gratuitos. Cuidado: revisar la licencia por modelo (CC-BY, CC-BY-NC-SA, dominio público, etc.).
2. Colocar en `public/models/{cell-id}.glb` (por ejemplo `public/models/plant-cell.glb`).
3. Comprimir con Draco: `npm run compress:models`. Reduce típicamente 5–30×.
4. En `src/infrastructure/data/cells.ts`, añadir al cell:
   ```ts
   modelPath: '/models/plant-cell.glb',
   modelTransform: { scale: 1 },        // se auto-ajusta a 5 unidades
   modelCredit: { author, source, license },
   ```
5. Si el GLB tiene **meshes separados y nombrados** (mejor caso), el componente los recorre y se pueden mapear a `Organelle.meshName` para que click/hover funcione por organelo. Si es un mesh único (como el de `3DPX-015797`), el modelo se ve pero los controles Aislar/Ocultar pierden efecto.

### Modelo actual

- **Animal Cell** carga `/models/animal-cell.glb` (NIH 3DPX-015797, comprimido a 44 KB).
- **Plant Cell** sigue usando geometría procedural (`PlantCellModel.tsx`). Para reemplazarla, descarga una de NIH (busca "plant cell" en 3d.nih.gov) y aplica los pasos de arriba.

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

- **Animal Cell GLB**: "Animal Cell 2.0" by *destacados tv* — [NIH 3D Print Exchange · 3DPX-015797](https://3d.nih.gov/entries/3DPX-015797), licencia **CC-BY-NC-SA 4.0** (uso no comercial con atribución, derivados con la misma licencia). Para uso comercial, sustituir por un GLB con licencia compatible (CC0 / CC-BY / dominio público).
- Geometría procedural de la célula vegetal: propia, inspirada en diagramas biológicos estándar.
- Contenido biológico basado en referencias generales (Britannica, Khan Academy).
- Cuando se sustituyan los placeholders del microscopio por imágenes reales, listar la fuente y licencia aquí (preferir Wikimedia Commons / NIH Image Gallery).

## Próximos pasos

1. Replicar la pantalla para las 6 células restantes una vez aprobada Animal Cell.
2. Reemplazar la geometría procedural por GLB optimizado.
3. Imágenes de microscopio reales con créditos CC.
4. Vista de comparación lado a lado.
5. Integración con Firebase de `word-rush-kids-web` (auth + notebooks).
