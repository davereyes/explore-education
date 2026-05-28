import { create } from 'zustand';
import type { MicroscopeType } from '@/domain/entities';

export type ViewerSource = '3d' | MicroscopeType;

interface StudioState {
  selectedCellId: string;
  /** null → cell-level "general" info; string → specific organelle id. */
  selectedOrganelleId: string | null;
  viewerSource: ViewerSource;
  showLabels: boolean;
  sidebarCollapsed: boolean;

  selectCell: (id: string) => void;
  selectOrganelle: (id: string | null) => void;
  setViewerSource: (source: ViewerSource) => void;
  toggleLabels: () => void;
  toggleSidebar: () => void;
}

export const useStudioStore = create<StudioState>((set) => ({
  selectedCellId: 'plant',
  selectedOrganelleId: null,
  viewerSource: '3d',
  showLabels: true,
  sidebarCollapsed: false,

  selectCell: (id) =>
    set({
      selectedCellId: id,
      selectedOrganelleId: null,
      viewerSource: '3d',
    }),
  selectOrganelle: (id) => set({ selectedOrganelleId: id }),
  setViewerSource: (source) => set({ viewerSource: source }),
  toggleLabels: () => set((s) => ({ showLabels: !s.showLabels })),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
}));
