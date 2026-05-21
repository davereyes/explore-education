import type { ReactNode } from 'react';
import { Select } from '@react-three/postprocessing';
import { useStudioStore } from '@/presentation/store/useStudioStore';
import { useActiveOrganelle } from './CellViewer3D';

interface OrganelleGroupProps {
  organelleId: string;
  children: ReactNode;
  keepInIsolate?: boolean;
}

export default function OrganelleGroup({
  organelleId,
  children,
  keepInIsolate = false,
}: OrganelleGroupProps) {
  const active = useActiveOrganelle();
  const selectedOrganelleId = useStudioStore((s) => s.selectedOrganelleId);
  const isolate = useStudioStore((s) => s.isolate);
  const hideOthers = useStudioStore((s) => s.hideOthers);
  const selectOrganelle = useStudioStore((s) => s.selectOrganelle);
  const hoverOrganelle = useStudioStore((s) => s.hoverOrganelle);

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

  return (
    <Select enabled={active === organelleId}>
      <group
        visible={visible}
        onPointerOver={(e) => {
          e.stopPropagation();
          hoverOrganelle(organelleId);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          hoverOrganelle(null);
          document.body.style.cursor = '';
        }}
        onClick={(e) => {
          e.stopPropagation();
          selectOrganelle(organelleId);
        }}
      >
        {children}
      </group>
    </Select>
  );
}
