import type * as THREE from 'three';

/**
 * Cross-section / view-mode were removed from the UI. These helpers stay as
 * no-ops so the existing material wiring keeps compiling. Drop them entirely
 * if we ever delete the procedural models.
 */
export function useClippingPlanes(): THREE.Plane[] | null {
  return null;
}

export function useViewModeOpacity(base: number): number {
  return base;
}
