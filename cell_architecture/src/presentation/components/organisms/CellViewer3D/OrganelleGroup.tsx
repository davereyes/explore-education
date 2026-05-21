import type { ReactNode } from 'react';
import { useStudioStore } from '@/presentation/store/useStudioStore';

interface OrganelleGroupProps {
  organelleId: string;
  children: ReactNode;
  keepInIsolate?: boolean;
}

/**
 * Wraps a sub-tree that represents a single organelle. Drives visibility based
 * on the store's isolate / hide-others state.
 *
 * The 3D model is intentionally NOT interactive — the user picks organelles
 * from the sidebar list, so no pointer/click handlers here.
 */
export default function OrganelleGroup({
  organelleId,
  children,
  keepInIsolate = false,
}: OrganelleGroupProps) {
  const selectedOrganelleId = useStudioStore((s) => s.selectedOrganelleId);
  const isolate = useStudioStore((s) => s.isolate);
  const hideOthers = useStudioStore((s) => s.hideOthers);

  let visible = true;
  if (isolate && selectedOrganelleId && selectedOrganelleId !== organelleId && !keepInIsolate) {
    visible = false;
  }
  if (
    hideOthers &&
    organelleId !== 'cell-wall' &&
    organelleId !== 'membrane' &&
    selectedOrganelleId &&
    selectedOrganelleId !== organelleId
  ) {
    visible = false;
  }

  return <group visible={visible}>{children}</group>;
}
