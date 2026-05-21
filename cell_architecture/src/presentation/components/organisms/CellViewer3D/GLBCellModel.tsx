import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import type { Cell } from '@/domain/entities';
import OrganelleGroup from './OrganelleGroup';
import { useClippingPlanes } from './useClipping';

interface GLBCellModelProps {
  cell: Cell;
}

/**
 * GLBCellModel — loads an externally hosted glTF/GLB file and renders it.
 *
 * The GLB is wrapped in a single OrganelleGroup keyed on 'whole-cell' so the
 * standard hover/click/isolate plumbing keeps working at the cell level until
 * per-organelle mesh names are mapped in cells.ts.
 *
 * To enable per-organelle interactivity later, inspect the GLB's mesh names
 * (uncomment the console.log inside the traverse) and add `meshName` matches
 * to each Organelle entry. Then split the rendering loop to wrap each mesh
 * subset in its own OrganelleGroup.
 */
export default function GLBCellModel({ cell }: GLBCellModelProps) {
  const { scene } = useGLTF(cell.modelPath!);
  const clipping = useClippingPlanes();

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        const mat = obj.material as THREE.Material | THREE.Material[];
        const apply = (m: THREE.Material) => {
          m.clippingPlanes = clipping ?? [];
          m.clipShadows = !!clipping;
          m.side = THREE.DoubleSide;
          // Give the bare NIH mesh some warmth + sheen so it looks like a cell, not a 3D-print white blob.
          if (m instanceof THREE.MeshStandardMaterial || m instanceof THREE.MeshPhysicalMaterial) {
            m.color = new THREE.Color('#f0c8b8');
            m.roughness = 0.4;
            m.metalness = 0.05;
            if (m instanceof THREE.MeshPhysicalMaterial) {
              m.sheen = 0.6;
              m.sheenColor = new THREE.Color('#ffe0d0');
              m.clearcoat = 0.4;
            }
          }
          m.needsUpdate = true;
        };
        if (Array.isArray(mat)) mat.forEach(apply);
        else if (mat) apply(mat);
      }
    });
  }, [scene, clipping]);

  const t = cell.modelTransform ?? {};
  const TARGET_SIZE = 5;
  const { autoScale, centerOffset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return {
      autoScale: TARGET_SIZE / maxDim,
      centerOffset: center.clone().negate(),
    };
  }, [scene]);

  const finalScale = (t.scale ?? 1) * autoScale;

  return (
    <group
      scale={finalScale}
      position={t.position ?? [0, 0, 0]}
      rotation={t.rotation ?? [0, 0, 0]}
    >
      <group position={centerOffset.toArray()}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

// Preload at module load so the first paint is fast once the cell is selected.
useGLTF.preload('/models/animal-cell.glb');
