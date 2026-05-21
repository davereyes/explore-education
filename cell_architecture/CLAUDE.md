# Cell Architecture Studio — guide for future Claude sessions

Educational web platform for kids 9–13 to study cell architecture (organelles,
microscope views, biological notes). Bilingual ES/EN. Currently focused on
Plant Cell (default) and Animal Cell (visible); 5 other cell types are
locked placeholders.

## How to run

```bash
npm install
npm run dev          # → http://localhost:3000
npm run typecheck
npm run lint
npm run compress:models   # Draco-compress every *.glb in public/models/
```

When iterating with the Claude Code preview tool, the launch config is
named **`cell-architecture`** in `/Users/dave/Documents/work/development/.claude/launch.json`.

After ANY visible change, restart or reload the preview and confirm the
screenshot looks right before committing. R3F errors are often invisible
in console — verify the canvas pixel is not (0,0,0,0).

## Stack & conventions (intentional, mirror of word-rush-kids-web)

- Vite 5 + React 18.3 + TypeScript strict
- React Router DOM 7 (only `/` for now)
- three.js 0.169 + `@react-three/fiber` 8 + `@react-three/drei` 9
- Zustand 5 for studio state (selected cell, organelle, view mode, etc.)
- framer-motion (animations) — sparingly
- CSS Modules **not** used; instead colocated `Component.css` files with
  **BEM + `ca-` prefix** (e.g. `ca-button`, `ca-button--primary`)
- Path alias **`@/`** → `./src/*`
- Bilingual ES/EN through `LanguageContext` and the helper
  `t('texto en español', 'english text')`
- Design tokens in `src/styles/variables.css` — never hardcode hex in
  components; use CSS custom properties

## Architecture (Atomic Design + Clean layers)

```
src/
├── domain/         entities (Cell, Organelle, MicroscopeImage), interfaces
├── application/    use cases (currently thin)
├── infrastructure/ data/cells.ts catalog, CellRepositoryLocal
├── presentation/
│   ├── components/
│   │   ├── atoms/      CaButton, CaCard, CaToggle, CaDot
│   │   ├── molecules/  ControlsHint, ViewModeSelector, ViewerActionBar,
│   │   │               OrganelleList, MicroscopeModal
│   │   ├── organisms/  AppHeader, CellSidebar, CellViewer3D (+ subfiles),
│   │   │               OrganelleDetailsPanel, BiologicalNotesCard,
│   │   │               OccurrenceCard, MicroscopeSection, CompareCellsCard
│   │   ├── templates/  StudioTemplate
│   │   └── pages/      StudioPage
│   ├── context/    LanguageContext
│   └── store/      useStudioStore (Zustand)
└── styles/         variables.css + global.css
```

When adding a component, **colocate** its `.tsx` + `.css` and place it at
the right level (atom/molecule/organism). Do not introduce a new top-level
folder without a strong reason.

## Critical product rules (user feedback, do not regress)

1. **No auto-rotate** — the cell only spins when the user drags. No
   `useFrame` rotation in any model.
2. **3D is non-interactive** — no hover/click handlers on meshes. Users
   pick organelles from the left sidebar list; the right panel is
   pre-populated with the default organelle of each cell.
3. **No scroll on desktop** — the whole studio (header + viewer +
   microscope row + side panels) must fit in 100vh at ≥980 px. Below
   that, vertical scroll is OK.
4. **Weight conscious** — local assets must stay small. Always Draco-
   compress GLBs (`npm run compress:models`) and downscale images
   (`sips -Z 400 -s formatOptions 70`). The user has reported size
   warnings from Google before.
5. **Same visual vocabulary for every cell** — disc-shaped sculpted look
   (don't ship boxy primitives next to organic GLBs).
6. **Sidebar list is the only entry to details** — the right card shows
   details of the selected organelle by default, no "click 3D to see
   info" UX.

## How the 3D viewer works

- `CellViewer3D` decides per cell: if `cell.modelPath` is present, render
  `GLBCellModel` (via drei's `useGLTF`, auto-scales to TARGET_SIZE 5);
  otherwise fall back to `PlantCellModel` / `AnimalCellModel` (procedural).
- `OrganelleGroup` wraps each procedural organelle so the store can
  drive `visible` for Isolate / Hide-Others. No pointer events on it.
- `useClippingPlanes()` returns a single x-axis plane when
  `crossSection` is on; passed into every material via `clippingPlanes`.
- `Selection` + `EffectComposer` + `Outline` from `@react-three/postprocessing`
  are **intentionally NOT used**. They broke the canvas in past attempts and
  the 3D is non-interactive so an outline effect adds nothing.
- `<Environment preset="apartment" />` provides IBL — it loads from a CDN
  and lives behind a `<Suspense fallback={null}>`. First paint of the cell
  takes ~1–3 s while the HDR streams in. Don't remove it.
- Camera position `[7.5, 4, 9]`, fov 38°, OrbitControls min/max 5/18.

## Gotchas (learned the hard way)

- **Wikimedia is blocked by Chrome's ORB** when hot-linked. All micrograph
  images must be downloaded locally to `public/microscope/` and served from
  the same origin.
- **NIH 3D Print Exchange GLBs are single uncolored meshes** (built for
  3D printing). They have no per-organelle children. Don't promise click-
  to-isolate over them without re-authoring the mesh.
- **useGLTF.preload at module scope** triggers a load on import. If the
  preload target doesn't exist, the cache stores an error and Suspense
  later throws into the error boundary. Always make sure preloaded paths
  exist in `public/models/`.
- **`Could not Fast Refresh ('ActiveOrganelleContext' export …')`** is a
  benign HMR warning in `CellViewer3D.tsx`. Full reload after edits.
- **The screenshot capture is a downscaled JPEG** — never judge color or
  font size from it. Use `preview_eval` to read DOM dimensions or
  `preview_inspect` for computed styles.

## Asset placement & compression

- GLBs → `public/models/{cell-id}.glb`, run `npm run compress:models`
  (uses gltf-pipeline + Draco level 10). Target < 1 MB per cell, hard
  ceiling 5 MB.
- Microscope photos → `public/microscope/{cell-id}-{type}.jpg`, 400 px
  wide, JPEG quality 70.
- 3D model credit + license go in `Cell.modelCredit` (entity field).

## Adding a new cell (recipe)

1. Drop GLB in `public/models/` and compress.
2. In `infrastructure/data/cells.ts`, fill the `Cell` entry: bilingual
   labels, organelle list (id, color CSS var, size, location, notes,
   funFact — all bilingual), microscope images (3 entries), occurrence,
   `modelPath` + `modelTransform`, `modelCredit`.
3. Set `enabled: true`. Sidebar shows the entry as clickable.
4. If you need a procedural fallback, add a `{Cell}CellModel.tsx` next
   to the others and wire it in `CellViewer3D`'s dispatch.
5. Microscope photos for that cell type go in `public/microscope/`.

## Commit style

Conventional commits scoped to the project: `feat(cell_architecture): …`,
`fix(cell_architecture): …`. Body explains WHY, not just what. The
trailing co-author line `Co-Authored-By: Claude Opus 4.7 (1M context)
<noreply@anthropic.com>` is added by the harness automatically.

Only commit when the user asks. Never push to a branch other than `main`
without explicit instruction. The remote is
`github.com/davereyes/explore-education` and this project lives at
`cell_architecture/` — `solar_system/` is a sibling project we do not
touch.

## What NOT to do

- Don't add new dependencies without asking the user. The stack is
  intentionally small.
- Don't introduce a CSS framework (Tailwind, Bootstrap, etc.) — we use
  hand-written BEM with design tokens.
- Don't generate documentation files (`*.md`) unless explicitly asked.
- Don't run `gh repo create`, `git push --force`, or change git config.
- Don't optimistically mark tasks completed; only after the change is
  visible in the preview.
