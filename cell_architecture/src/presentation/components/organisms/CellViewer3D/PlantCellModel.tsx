import { useMemo } from 'react';
import * as THREE from 'three';
import { MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import OrganelleGroup from './OrganelleGroup';
import { useClippingPlanes, useViewModeOpacity } from './useClipping';

/**
 * PlantCellModel — procedural model.
 *
 * Visual goal: a cushioned, slightly chunky illustration of a plant cell with
 * the characteristic boxy cell wall, an oversized blue-green central vacuole
 * that pushes everything to the edges, lens-shaped chloroplasts with grana
 * stacks, a nucleus shoved against the wall, mitochondria, and a small ER /
 * Golgi cluster.
 *
 * To upgrade visual quality, drop a CC-BY GLB at /public/models/plant-cell.glb
 * with meshes named after Organelle.meshName and switch this file to
 * useGLTF — the OrganelleGroup wrappers stay the same.
 */
export default function PlantCellModel() {
  return (
    <group>
      <CellWall />
      <Membrane />
      <Vacuole />
      <Nucleus />
      <Chloroplasts />
      <Mitochondria />
      <RoughER />
      <Golgi />
    </group>
  );
}

/* ------------------------ Cell wall (outer shell) ------------------------ */

function CellWall() {
  const clipping = useClippingPlanes();
  const opacity = useViewModeOpacity(0.38, 0.92);
  // Plant cells are not actually cube-shaped; this gives a rounded, sculpted
  // disc-like shape that visually matches the NIH-style sculpted animal cell.
  return (
    <OrganelleGroup organelleId="cell-wall" keepInIsolate>
      <mesh name="CellWall" scale={[1.5, 0.95, 1.5]} castShadow receiveShadow>
        <icosahedronGeometry args={[2.4, 4]} />
        <meshPhysicalMaterial
          color="#7fb069"
          roughness={0.5}
          metalness={0}
          clearcoat={0.5}
          clearcoatRoughness={0.5}
          sheen={0.8}
          sheenColor="#d6f0bd"
          transparent
          opacity={opacity}
          side={THREE.DoubleSide}
          clippingPlanes={clipping ?? []}
        />
      </mesh>
      {/* fibrous cellulose hint */}
      <mesh scale={[1.5, 0.95, 1.5]}>
        <icosahedronGeometry args={[2.42, 3]} />
        <meshStandardMaterial
          color="#3f7a2a"
          wireframe
          transparent
          opacity={0.14}
          clippingPlanes={clipping ?? []}
        />
      </mesh>
    </OrganelleGroup>
  );
}

/* ------------------------ Membrane (just inside wall) ------------------------ */

function Membrane() {
  const clipping = useClippingPlanes();
  const opacity = useViewModeOpacity(0.16, 0.5);
  return (
    <OrganelleGroup organelleId="membrane">
      <mesh name="Membrane" scale={[1.4, 0.88, 1.4]}>
        <icosahedronGeometry args={[2.3, 3]} />
        <meshPhysicalMaterial
          color="#b7e3d3"
          transparent
          opacity={opacity}
          transmission={0.4}
          thickness={0.4}
          roughness={0.35}
          clearcoat={0.5}
          side={THREE.DoubleSide}
          clippingPlanes={clipping ?? []}
        />
      </mesh>
    </OrganelleGroup>
  );
}

/* ------------------------ Vacuole ------------------------ */

function Vacuole() {
  const clipping = useClippingPlanes();
  const opacity = useViewModeOpacity(0.78, 0.92);
  return (
    <OrganelleGroup organelleId="vacuole">
      <group position={[-0.4, 0, 0.1]}>
        <mesh name="Vacuole" castShadow>
          <icosahedronGeometry args={[1.85, 4]} />
          <MeshDistortMaterial
            color="#3aa6c4"
            roughness={0.18}
            metalness={0.05}
            transmission={0.45}
            thickness={1.2}
            clearcoat={0.9}
            clearcoatRoughness={0.2}
            distort={0.18}
            speed={0.4}
            transparent
            opacity={opacity}
            clippingPlanes={clipping ?? []}
            ior={1.33}
          />
        </mesh>
        {/* highlight */}
        <mesh position={[-0.5, 0.7, 0.5]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshBasicMaterial color="#cfeff5" transparent opacity={0.18} />
        </mesh>
      </group>
    </OrganelleGroup>
  );
}

/* ------------------------ Nucleus (pushed against wall) ------------------------ */

function Nucleus() {
  const clipping = useClippingPlanes();
  const opacity = useViewModeOpacity(0.95);
  return (
    <OrganelleGroup organelleId="nucleus">
      <group position={[1.6, 0.7, 0.4]}>
        <mesh name="Nucleus" castShadow>
          <icosahedronGeometry args={[0.9, 4]} />
          <meshPhysicalMaterial
            color="#7c4dff"
            roughness={0.4}
            clearcoat={0.7}
            sheen={0.5}
            sheenColor="#d3bdff"
            transparent
            opacity={opacity}
            clippingPlanes={clipping ?? []}
          />
        </mesh>
        {/* nuclear envelope */}
        <mesh>
          <sphereGeometry args={[0.98, 48, 48]} />
          <meshStandardMaterial
            color="#5b3ad6"
            transparent
            opacity={0.15}
            roughness={0.7}
            clippingPlanes={clipping ?? []}
          />
        </mesh>
        {/* chromatin texture: tiny dark blobs */}
        {Array.from({ length: 10 }).map((_, i) => {
          const phi = Math.acos(1 - 2 * ((i + 0.5) / 10));
          const theta = Math.PI * (1 + Math.sqrt(5)) * i;
          const r = 0.55;
          return (
            <mesh
              key={i}
              position={[
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi),
              ]}
            >
              <sphereGeometry args={[0.09, 12, 12]} />
              <meshStandardMaterial
                color="#5b3ad6"
                roughness={0.5}
                clippingPlanes={clipping ?? []}
              />
            </mesh>
          );
        })}
        {/* nucleolus */}
        <mesh position={[0.25, 0.15, 0.2]}>
          <sphereGeometry args={[0.25, 24, 24]} />
          <meshStandardMaterial color="#3d2c80" roughness={0.45} clippingPlanes={clipping ?? []} />
        </mesh>
      </group>
    </OrganelleGroup>
  );
}

/* ------------------------ Chloroplasts (lens-shaped, with grana stacks) ------------------------ */

function Chloroplast({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const clipping = useClippingPlanes();
  return (
    <group position={position} rotation={rotation}>
      {/* outer envelope: ellipsoid via scaled sphere */}
      <mesh name="Chloroplast" castShadow scale={[1, 0.45, 0.6]}>
        <sphereGeometry args={[0.55, 48, 48]} />
        <meshPhysicalMaterial
          color="#3d9239"
          roughness={0.35}
          clearcoat={0.7}
          sheen={0.6}
          sheenColor="#9fd698"
          clippingPlanes={clipping ?? []}
        />
      </mesh>
      {/* grana stacks: small flattened cylinders inside */}
      {Array.from({ length: 6 }).map((_, i) => {
        const t = (i / 5) * 2 - 1;
        return (
          <group key={i} position={[t * 0.35, 0, 0]}>
            {Array.from({ length: 4 }).map((__, j) => (
              <mesh key={j} position={[0, 0, (j - 1.5) * 0.04]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.06, 0.06, 0.025, 16]} />
                <meshStandardMaterial
                  color="#c84c3e"
                  roughness={0.35}
                  emissive="#7a1f1a"
                  emissiveIntensity={0.45}
                  clippingPlanes={clipping ?? []}
                />
              </mesh>
            ))}
          </group>
        );
      })}
      {/* thylakoid connections */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.012, 8, 32]} />
        <meshStandardMaterial color="#2d5a28" clippingPlanes={clipping ?? []} />
      </mesh>
    </group>
  );
}

function Chloroplasts() {
  const spots: Array<{ position: [number, number, number]; rotation: [number, number, number] }> = [
    { position: [-2.0, 1.2, 1.5], rotation: [0.3, 0.5, 0.4] },
    { position: [-2.1, -1.2, -1.0], rotation: [-0.4, -0.3, 0.2] },
    { position: [1.5, -1.4, 1.4], rotation: [0.2, 1.2, -0.3] },
    { position: [-0.5, 1.6, -1.8], rotation: [0.6, -0.7, 0.5] },
    { position: [2.0, 0.4, -1.8], rotation: [-0.2, 0.8, 0.1] },
    { position: [-1.6, -0.4, 2.0], rotation: [0.5, -1.1, 0.3] },
  ];
  return (
    <OrganelleGroup organelleId="chloroplast">
      {spots.map((s, i) => (
        <Chloroplast key={i} {...s} />
      ))}
    </OrganelleGroup>
  );
}

/* ------------------------ Mitochondria ------------------------ */

function Mitochondria() {
  const clipping = useClippingPlanes();
  const positions: Array<[number, number, number, number]> = [
    [1.7, -1.2, 0.6, 0.7],
    [-2.2, 0.4, 0.5, -0.4],
    [0.5, -1.7, -1.6, 1.1],
    [-0.8, 1.8, 1.4, 0.3],
  ];
  return (
    <OrganelleGroup organelleId="mitochondrion">
      {positions.map(([x, y, z, rz], i) => (
        <group key={i} position={[x, y, z]} rotation={[0.4, 0.2, rz]}>
          <mesh name={`Mitochondrion_${i}`} castShadow>
            <capsuleGeometry args={[0.22, 0.5, 16, 24]} />
            <MeshWobbleMaterial
              color="#ff8a7a"
              roughness={0.35}
              factor={0.06}
              speed={0.6}
              clippingPlanes={clipping ?? []}
            />
          </mesh>
          {/* cristae inside */}
          {Array.from({ length: 3 }).map((_, j) => (
            <mesh key={j} position={[0, (j - 1) * 0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.15, 0.025, 8, 20]} />
              <meshStandardMaterial color="#b8392f" clippingPlanes={clipping ?? []} />
            </mesh>
          ))}
        </group>
      ))}
    </OrganelleGroup>
  );
}

/* ------------------------ Rough ER (network + ribosomes) ------------------------ */

function RoughER() {
  const clipping = useClippingPlanes();
  const ribosomes = useMemo(() => {
    const arr: Array<[number, number, number]> = [];
    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * Math.PI * 2;
      const r = 0.7;
      arr.push([
        Math.cos(a * 2) * r + 0.05 * (i % 3),
        Math.sin(a) * 0.4 + ((i % 5) - 2) * 0.08,
        Math.sin(a * 3) * 0.35,
      ]);
    }
    return arr;
  }, []);
  return (
    <OrganelleGroup organelleId="rough-er">
      <group position={[1.2, 0.0, -1.4]} rotation={[0.3, 0.5, 0.2]}>
        <mesh name="RoughER" castShadow>
          <torusKnotGeometry args={[0.55, 0.13, 128, 18, 2, 3]} />
          <meshPhysicalMaterial
            color="#f1a7c4"
            roughness={0.4}
            clearcoat={0.5}
            sheen={0.3}
            sheenColor="#ffd2e1"
            clippingPlanes={clipping ?? []}
          />
        </mesh>
        {ribosomes.map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshStandardMaterial color="#ff5b6a" clippingPlanes={clipping ?? []} />
          </mesh>
        ))}
      </group>
    </OrganelleGroup>
  );
}

/* ------------------------ Golgi ------------------------ */

function Golgi() {
  const clipping = useClippingPlanes();
  return (
    <OrganelleGroup organelleId="golgi">
      <group position={[1.9, 1.4, -1.3]} rotation={[0.2, -0.4, 0.3]}>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} name={`Golgi_${i}`} position={[0, i * 0.14 - 0.28, 0]} castShadow>
            <torusGeometry args={[0.35 - i * 0.03, 0.06, 16, 40]} />
            <meshPhysicalMaterial
              color="#84d2c5"
              roughness={0.3}
              clearcoat={0.6}
              sheen={0.3}
              clippingPlanes={clipping ?? []}
            />
          </mesh>
        ))}
      </group>
    </OrganelleGroup>
  );
}
