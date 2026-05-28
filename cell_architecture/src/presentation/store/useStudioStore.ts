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
  /** When true, body background is flat #F8F8F8 (no gradient) and the
   *  center cards adopt the same gray. Default false = gradient + white cards. */
  flatBackground: boolean;

  selectCell: (id: string) => void;
  selectOrganelle: (id: string | null) => void;
  setViewerSource: (source: ViewerSource) => void;
  toggleLabels: () => void;
  toggleSidebar: () => void;
  toggleFlatBackground: () => void;
}

export const useStudioStore = create<StudioState>((set) => ({
  selectedCellId: 'plant',
  selectedOrganelleId: null,
  viewerSource: '3d',
  showLabels: true,
  sidebarCollapsed: false,
  flatBackground: false,

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
  toggleFlatBackground: () => set((s) => ({ flatBackground: !s.flatBackground })),
}));
