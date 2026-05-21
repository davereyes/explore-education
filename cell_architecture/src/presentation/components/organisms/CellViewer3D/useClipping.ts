import { useMemo } from 'react';
import * as THREE from 'three';
import { useStudioStore } from '@/presentation/store/useStudioStore';

export function useClippingPlanes(): THREE.Plane[] | null {
  const crossSection = useStudioStore((s) => s.crossSection);
  const planes = useMemo(() => [new THREE.Plane(new THREE.Vector3(1, 0, 0), 0.2)], []);
  return crossSection ? planes : null;
}

export function useViewModeOpacity(base: number, solid = 1, crossOpacity?: number): number {
  const viewMode = useStudioStore((s) => s.viewMode);
  if (viewMode === 'solid') return solid;
  if (viewMode === 'cross-section' && crossOpacity !== undefined) return crossOpacity;
  return base;
}
