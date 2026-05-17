import { create } from 'zustand';
import { getDefaultPartner } from '../utils/comparison';
import type { PlanetId } from '../types/planet';

export type ThemeMode = 'light' | 'dark';
export type ViewMode = 'explore' | 'core' | 'compare';
export type SystemView = 'strip' | '3d';

const ZOOM_MIN = 0.4;
const ZOOM_MAX = 2.5;
const ZOOM_STEP = 1.25;

interface ExplorerState {
  selectedPlanetId: PlanetId;
  /** Partner para modo Comparar — el otro planeta que se compara con el actual. */
  comparePartnerId: PlanetId;
  expandedFactIndex: number | null;
  expandedAmazingId: string | null;
  theme: ThemeMode;
  viewMode: ViewMode;
  systemView: SystemView;
  cameraZoom: number;
  setSelectedPlanet: (id: PlanetId) => void;
  setComparePartner: (id: PlanetId) => void;
  /** Set both sides of a Compare pair atomically, leaving the user in
   *  compare viewMode. Use this from the right-panel selectors instead of
   *  calling setSelectedPlanet + setViewMode separately. */
  setComparisonPair: (a: PlanetId, b: PlanetId) => void;
  toggleFact: (index: number) => void;
  toggleAmazingFact: (id: string) => void;
  setTheme: (mode: ThemeMode) => void;
  setViewMode: (mode: ViewMode) => void;
  setSystemView: (view: SystemView) => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

export const useExplorerStore = create<ExplorerState>((set) => ({
  // El "home" inicial es la vista 3D del sistema solar — primera impresión
  // potente que muestra todo el contexto antes de que el niño entre a un
  // planeta individual.
  selectedPlanetId: 'sistema-solar',
  comparePartnerId: 'tierra',
  expandedFactIndex: 0,
  expandedAmazingId: null,
  theme: 'dark',
  viewMode: 'explore',
  systemView: '3d',
  cameraZoom: 1,
  // Changing planet resets zoom and returns to explore view by default.
  // Si entras a "Sistema Solar" no hay viewMode aplicable — el hero se encarga.
  setSelectedPlanet: (id) =>
    set({ selectedPlanetId: id, cameraZoom: 1, viewMode: 'explore' }),
  setComparePartner: (id) => set({ comparePartnerId: id }),
  setComparisonPair: (a, b) =>
    set({
      selectedPlanetId: a,
      comparePartnerId: b,
      viewMode: 'compare',
      cameraZoom: 1,
    }),
  toggleFact: (index) =>
    set((state) => ({ expandedFactIndex: state.expandedFactIndex === index ? null : index })),
  toggleAmazingFact: (id) =>
    set((state) => ({ expandedAmazingId: state.expandedAmazingId === id ? null : id })),
  setTheme: (mode) => set({ theme: mode }),
  setSystemView: (view) => set({ systemView: view, cameraZoom: 1 }),
  setViewMode: (mode) =>
    set((state) => {
      // Al entrar en compare SIEMPRE reseteamos al partner por defecto
      // (Tierra para todos los planetas; Marte si el actual es Tierra).
      // Así no "se queda pegado" el último partner manualmente elegido.
      const partner =
        mode === 'compare' ? getDefaultPartner(state.selectedPlanetId) : state.comparePartnerId;
      return { viewMode: mode, cameraZoom: 1, comparePartnerId: partner };
    }),
  zoomIn: () =>
    set((state) => ({ cameraZoom: Math.min(state.cameraZoom * ZOOM_STEP, ZOOM_MAX) })),
  zoomOut: () =>
    set((state) => ({ cameraZoom: Math.max(state.cameraZoom / ZOOM_STEP, ZOOM_MIN) })),
}));
