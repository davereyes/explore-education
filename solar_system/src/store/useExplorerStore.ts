import { create } from 'zustand';
import type { PlanetId } from '../types/planet';

export type ThemeMode = 'light' | 'dark';
export type ViewMode = 'explore' | 'core';

const ZOOM_MIN = 0.4;
const ZOOM_MAX = 2.5;
const ZOOM_STEP = 1.25;

interface ExplorerState {
  selectedPlanetId: PlanetId;
  compareLeft: PlanetId;
  compareRight: PlanetId;
  expandedFactIndex: number | null;
  theme: ThemeMode;
  viewMode: ViewMode;
  cameraZoom: number;
  setSelectedPlanet: (id: PlanetId) => void;
  setCompareLeft: (id: PlanetId) => void;
  setCompareRight: (id: PlanetId) => void;
  toggleFact: (index: number) => void;
  setTheme: (mode: ThemeMode) => void;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

export const useExplorerStore = create<ExplorerState>((set) => ({
  selectedPlanetId: 'marte',
  compareLeft: 'tierra',
  compareRight: 'marte',
  expandedFactIndex: 0,
  theme: 'dark',
  viewMode: 'explore',
  cameraZoom: 1,
  // Changing planet resets zoom and returns to explore view.
  setSelectedPlanet: (id) => set({ selectedPlanetId: id, cameraZoom: 1, viewMode: 'explore' }),
  setCompareLeft: (id) => set({ compareLeft: id }),
  setCompareRight: (id) => set({ compareRight: id }),
  toggleFact: (index) =>
    set((state) => ({ expandedFactIndex: state.expandedFactIndex === index ? null : index })),
  setTheme: (mode) => set({ theme: mode }),
  setViewMode: (mode) => set({ viewMode: mode, cameraZoom: 1 }),
  toggleViewMode: () =>
    set((state) => ({
      viewMode: state.viewMode === 'explore' ? 'core' : 'explore',
      cameraZoom: 1,
    })),
  zoomIn: () =>
    set((state) => ({ cameraZoom: Math.min(state.cameraZoom * ZOOM_STEP, ZOOM_MAX) })),
  zoomOut: () =>
    set((state) => ({ cameraZoom: Math.max(state.cameraZoom / ZOOM_STEP, ZOOM_MIN) })),
}));
