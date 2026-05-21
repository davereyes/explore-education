import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import type { Cell } from '@/domain/entities';
import { useClippingPlanes } from './useClipping';

interface GLBCellModelProps {
  cell: Cell;
}

/**
 * Color palette applied to single-mesh GLBs (e.g. NIH 3DPX-015797) so the
 * sculpted relief gets a colorful organelle look instead of staying uniformly
 * peach. Each entry is a "soft attractor": every vertex's color is the inverse-
 * distance weighted average of all attractors. Positions are normalized to
 * [-1, 1] inside the model's local bounding box.
 */
const ANIMAL_PALETTE: Array<{ pos: [number, number, number]; color: string; weight?: number }> = [
  { pos: [0.35, 0.5, 0.25], color: '#7c5cff', weight: 1.4 },   // nucleus
  { pos: [-0.55, 0.2, -0.25], color: '#ff8a7a', weight: 1.0 }, // mitochondria cluster
  { pos: [0.0, -0.45, 0.35], color: '#f1a7c4', weight: 1.0 },  // rough ER
  { pos: [-0.35, 0.35, 0.4], color: '#84d2c5', weight: 0.9 },  // golgi
  { pos: [0.45, -0.3, -0.25], color: '#ffd166', weight: 0.8 },// lysosomes
  { pos: [0.0, 0.0, 0.0], color: '#ffd8c2', weight: 0.6 },     // cytoplasm warm fill
];

function bakeVertexColors(geometry: THREE.BufferGeometry, palette: typeof ANIMAL_PALETTE) {
  const positionAttr = geometry.attributes.position as THREE.BufferAttribute;
  geometry.computeBoundingBox();
  const bbox = geometry.boundingBox!;
  const center = bbox.getCenter(new THREE.Vector3());
  const size = bbox.getSize(new THREE.Vector3());
  const halfMax = Math.max(size.x, size.y, size.z) * 0.5 || 1;

  const palettePoints = palette.map((p) => ({
    pos: new THREE.Vector3(...p.pos),
    color: new THREE.Color(p.color),
    weight: p.weight ?? 1,
  }));

  const colors = new Float32Array(positionAttr.count * 3);
  const v = new THREE.Vector3();
  const c = new THREE.Color();
  for (let i = 0; i < positionAttr.count; i++) {
    v.fromBufferAttribute(positionAttr, i).sub(center).divideScalar(halfMax);
    let rSum = 0, gSum = 0, bSum = 0, wSum = 0;
    for (const p of palettePoints) {
      const d = v.distanceToSquared(p.pos);
      const w = p.weight / (d * 3 + 0.06);
      rSum += p.color.r * w;
      gSum += p.color.g * w;
      bSum += p.color.b * w;
      wSum += w;
    }
    c.setRGB(rSum / wSum, gSum / wSum, bSum / wSum);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
}

export default function GLBCellModel({ cell }: GLBCellModelProps) {
  const { scene } = useGLTF(cell.modelPath!);
  const clipping = useClippingPlanes();

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;

        // Bake colors into the geometry once per scene.
        if (!obj.geometry.attributes.color) {
          bakeVertexColors(obj.geometry, ANIMAL_PALETTE);
        }

        const mat = obj.material as THREE.Material | THREE.Material[];
        const apply = (m: THREE.Material) => {
          m.clippingPlanes = clipping ?? [];
          m.clipShadows = !!clipping;
          m.side = THREE.DoubleSide;
          if (m instanceof THREE.MeshStandardMaterial || m instanceof THREE.MeshPhysicalMaterial) {
            m.vertexColors = true;
            m.color = new THREE.Color('#ffffff'); // let vertex colors drive hue
            m.roughness = 0.45;
            m.metalness = 0.05;
            if (m instanceof THREE.MeshPhysicalMaterial) {
              m.sheen = 0.5;
              m.sheenColor = new THREE.Color('#ffeed6');
              m.clearcoat = 0.35;
              m.clearcoatRoughness = 0.6;
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

useGLTF.preload('/models/animal-cell.glb');
