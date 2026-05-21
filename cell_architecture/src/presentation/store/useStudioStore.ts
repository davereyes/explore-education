import { create } from 'zustand';
import { getCellById } from '@/infrastructure/data/cells';

export type ViewMode = 'solid' | 'layered' | 'cross-section';

interface StudioState {
  selectedCellId: string;
  selectedOrganelleId: string | null;
  hoveredOrganelleId: string | null;
  viewMode: ViewMode;
  crossSection: boolean;
  isolate: boolean;
  hideOthers: boolean;
  showLabels: boolean;
  resetSignal: number;

  selectCell: (id: string) => void;
  selectOrganelle: (id: string | null) => void;
  hoverOrganelle: (id: string | null) => void;
  setViewMode: (mode: ViewMode) => void;
  setCrossSection: (on: boolean) => void;
  toggleIsolate: () => void;
  toggleHideOthers: () => void;
  toggleLabels: () => void;
  resetView: () => void;
}

export const useStudioStore = create<StudioState>((set) => ({
  selectedCellId: 'plant',
  selectedOrganelleId: 'chloroplast',
  hoveredOrganelleId: null,
  viewMode: 'layered',
  crossSection: false,
  isolate: false,
  hideOthers: false,
  showLabels: true,
  resetSignal: 0,

  selectCell: (id) => {
    const firstOrganelle = getCellById(id)?.organelles[0]?.id ?? null;
    set({ selectedCellId: id, selectedOrganelleId: firstOrganelle, isolate: false, hideOthers: false });
  },
  selectOrganelle: (id) => set({ selectedOrganelleId: id }),
  hoverOrganelle: (id) => set({ hoveredOrganelleId: id }),
  setViewMode: (mode) => set({ viewMode: mode, crossSection: mode === 'cross-section' }),
  setCrossSection: (on) => set({ crossSection: on, viewMode: on ? 'cross-section' : 'layered' }),
  toggleIsolate: () => set((s) => ({ isolate: !s.isolate, hideOthers: false })),
  toggleHideOthers: () => set((s) => ({ hideOthers: !s.hideOthers, isolate: false })),
  toggleLabels: () => set((s) => ({ showLabels: !s.showLabels })),
  resetView: () =>
    set((s) => ({
      resetSignal: s.resetSignal + 1,
      isolate: false,
      hideOthers: false,
      viewMode: 'layered',
      crossSection: true,
    })),
}));
