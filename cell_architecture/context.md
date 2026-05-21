# Cell Architecture Studio — current context

Living snapshot of the project state. Update when something material
changes (assets, decisions, open questions). Pair with `CLAUDE.md` which
describes the conventions; this file describes the situation right now.

## What works today

- **Studio page** at `/` — header, sidebar (cell types + organelle list),
  centred 3D viewer with OrbitControls, right-side details panel, bottom
  row with microscope thumbs and compare cells card.
- **Plant Cell** is the default. Procedural model: flattened icosahedron
  cell wall (green, sheen), large bluish central vacuole, 6 chloroplasts
  with grana, nucleus with chromatin texture, mitochondria with cristae,
  rough ER + Golgi, lysosomes scattered. 8 organelles in the data layer
  with bilingual notes and fun facts.
- **Animal Cell** loads `public/models/animal-cell.glb` (NIH 3DPX-015797,
  44 KB after Draco). The GLB is a single sculpted mesh with no per-
  organelle children. We currently bake a soft vertex-color palette into
  it to break the monotone — the user says the colors "no corresponden"
  to real organelle positions, so this is a known compromise pending a
  better source.
- **Microscope view** for Plant Cell shows 3 real Wikimedia Commons
  micrographs (Elodea light, red onion stained, Lettuce chloroplast STEM)
  served from `public/microscope/` (Chrome ORB blocks hot-linking). Click
  a thumb → `MicroscopeModal` opens the full image with credit. Animal
  Cell still uses the gradient swatches.
- **Bilingual toggle** in the header (ES/EN). Default ES.
- **View modes** Solid / Layered / Cross-section — last one drives a
  `THREE.Plane(x, 0, 0)` clipping plane through every material.
- **Action bar** at the bottom of the viewer: Rotate, Isolate, Hide
  Others, Reset View, Screenshot (downloads PNG). "Exportar 3D" stays
  disabled (out of MVP scope).
- **Cells locked**: Glóbulo blanco, Neurona, Célula epitelial, Bacteria,
  Célula muscular — visible in sidebar with 🔒 icon, click is a no-op.

## Assets in the repo

```
public/
├── models/
│   └── animal-cell.glb            44 KB  (NIH 3DPX-015797, Draco lvl 10)
└── microscope/
    ├── plant-light-elodea.jpg     28 KB
    ├── plant-stained-red-onion.jpg 10 KB
    └── plant-electron-lettuce.jpg  54 KB
```

Total shipped assets: ~135 KB. The user is sensitive to bundle weight.

## Recent decisions

- Cell viewer is intentionally non-interactive (no pointer events on
  meshes, no auto-rotate). Discovered the user wants the sidebar list as
  the sole driver of "which organelle is selected".
- Dropped `@react-three/postprocessing` from the render tree (Selection +
  EffectComposer + Outline). It kept breaking with newer drei and the
  outline is irrelevant since the 3D is non-interactive.
- Switched the procedural plant cell wall from `RoundedBox` to a
  flattened `icosahedronGeometry` so the silhouette reads as a sculpted
  disc, matching the animal cell's visual vocabulary.
- The microscope thumb behavior is "click to enlarge" via a centred
  lightbox modal (`MicroscopeModal`). The "Add image" affordance was
  removed; so was "Open Comparison View".
- Studio is locked to `100vh` with `overflow: hidden` on desktop. Below
  980 px the layout collapses to a single column and allows scroll.

## Open questions / next steps

1. **Animal cell colorization** — vertex-baked palette doesn't match real
   organelle positions ("no corresponden"). Two paths:
   - Find / generate a Tripo3D-style animal GLB with painted textures
     (would match the plant cell aesthetic directly).
   - Author per-organelle materials by inspecting the NIH mesh and
     manually splitting it — much more work.
2. **Plant cell GLB upgrade** — there's a 5.3 MB Tripo3D-generated plant
   cell in cclank's repo. User has authorized using it; pending a
   commit that swaps the procedural for the GLB. Procedural stays as
   the documented fallback in case the GLB ever fails to load.
3. **Other 5 cells** — none have data. When unlocking one, follow the
   recipe in `CLAUDE.md` ("Adding a new cell").
4. **Animal cell microscope photos** — still gradient swatches. Need
   downloads + Wikimedia attribution.
5. **i18n coverage** — most strings flow through `t(es, en)`. New
   strings must follow the same pattern.
6. **No tests yet** — the parent project (word-rush-kids-web) didn't
   have a runner either, so we mirrored that decision. Revisit if the
   project grows.

## Things that have been tried and did NOT work

- Procedural plant cell made from primitives — looked geometric, not
  organic. Replaced silhouette with icosahedron disc; the materials
  inside are still primitives but the overall vocabulary now matches.
- Hot-linking Wikimedia images — Chrome's Opaque Response Blocking
  rejects them; must be served locally.
- Sprite-based pseudo-3D (rotating between AI-generated angle images) —
  considered and rejected; would lose all our interactivity (isolate,
  hide-others, cross-section).
- Procedural vertex-color shader to "paint" the NIH animal mesh — works
  technically (the colors render) but they don't align with real
  organelle positions, so the result is misleading.

## Where things live (quick map)

| Concern | File |
|---|---|
| Data catalog | `src/infrastructure/data/cells.ts` |
| Studio state | `src/presentation/store/useStudioStore.ts` |
| Language toggle | `src/presentation/context/LanguageContext.tsx` |
| Layout shell | `src/presentation/components/templates/StudioTemplate/` |
| 3D viewer + dispatch | `src/presentation/components/organisms/CellViewer3D/CellViewer3D.tsx` |
| Procedural plant | `…/CellViewer3D/PlantCellModel.tsx` |
| Procedural animal | `…/CellViewer3D/AnimalCellModel.tsx` |
| GLB loader | `…/CellViewer3D/GLBCellModel.tsx` |
| Microscope lightbox | `…/molecules/MicroscopeModal/MicroscopeModal.tsx` |
| Design tokens | `src/styles/variables.css` |
