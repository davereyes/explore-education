import type { ReactNode } from 'react';

interface OrganelleGroupProps {
  organelleId: string;
  children: ReactNode;
  keepInIsolate?: boolean;
}

/**
 * The 3D model is intentionally non-interactive, so this is currently just a
 * pass-through group. Kept as a wrapper for procedural models because the
 * isolate / hide-others controls may come back later.
 */
export default function OrganelleGroup({ children }: OrganelleGroupProps) {
  return <group>{children}</group>;
}
