import { useMemo, type ReactNode } from 'react';
import { Select } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { useStudioStore } from '@/presentation/store/useStudioStore';
import { useActiveOrganelle } from './CellViewer3D';

interface OrganelleGroupProps {
  organelleId: string;
  children: ReactNode;
}

function OrganelleGroup({ organelleId, children }: OrganelleGroupProps) {
  const active = useActiveOrganelle();
  const selectedOrganelleId = useStudioStore((s) => s.selectedOrganelleId);
  const isolate = useStudioStore((s) => s.isolate);
  const hideOthers = useStudioStore((s) => s.hideOthers);
  const selectOrganelle = useStudioStore((s) => s.selectOrganelle);
  const hoverOrganelle = useStudioStore((s) => s.hoverOrganelle);

  let visible = true;
  if (isolate && selectedOrganelleId && selectedOrganelleId !== organelleId) visible = false;
  if (hideOthers && organelleId !== 'membrane' && selectedOrganelleId && selectedOrganelleId !== organelleId)
    visible = false;

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

function useClippingPlanes() {
  const crossSection = useStudioStore((s) => s.crossSection);
  const planes = useMemo(() => {
    const plane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0.4);
    return [plane];
  }, []);
  return crossSection ? planes : null;
}

function useTransparencyForMode(base: number): number {
  const viewMode = useStudioStore((s) => s.viewMode);
  if (viewMode === 'solid') return Math.min(1, base + 0.35);
  if (viewMode === 'cross-section') return base;
  return base; // layered
}

export default function AnimalCellModel() {
  const cellRef = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (cellRef.current) cellRef.current.rotation.y += dt * 0.05;
  });

  return (
    <group ref={cellRef} position={[0, 0, 0]} scale={1}>
      <Membrane />
      <Cytoplasm />
      <Nucleus />
      <Nucleolus />
      <Mitochondria />
      <RoughER />
      <SmoothER />
      <Golgi />
      <Lysosomes />
    </group>
  );
}

/* ---------- Organelle meshes ---------- */

function Membrane() {
  const clipping = useClippingPlanes();
  const opacity = useTransparencyForMode(0.18);
  return (
    <OrganelleGroup organelleId="membrane">
      <mesh name="Membrane" castShadow receiveShadow>
        <sphereGeometry args={[2.6, 64, 64]} />
        <meshPhysicalMaterial
          color="#b7e3d3"
          transparent
          opacity={opacity}
          roughness={0.35}
          metalness={0}
          transmission={0.4}
          thickness={0.6}
          clearcoat={0.6}
          side={THREE.DoubleSide}
          clippingPlanes={clipping ?? []}
        />
      </mesh>
      {/* subtle outer phospholipid bumps */}
      <mesh name="MembraneBumps">
        <sphereGeometry args={[2.62, 32, 32]} />
        <meshStandardMaterial
          color="#94d0bc"
          wireframe
          opacity={0.08}
          transparent
          clippingPlanes={clipping ?? []}
        />
      </mesh>
    </OrganelleGroup>
  );
}

function Cytoplasm() {
  const clipping = useClippingPlanes();
  return (
    <mesh name="Cytoplasm">
      <sphereGeometry args={[2.5, 48, 48]} />
      <meshStandardMaterial
        color="#c5b8ff"
        transparent
        opacity={0.12}
        roughness={0.6}
        clippingPlanes={clipping ?? []}
      />
    </mesh>
  );
}

function Nucleus() {
  const clipping = useClippingPlanes();
  const opacity = useTransparencyForMode(0.85);
  return (
    <OrganelleGroup organelleId="nucleus">
      <mesh name="Nucleus" position={[0.6, 0.3, 0.3]} castShadow>
        <sphereGeometry args={[1.05, 48, 48]} />
        <meshPhysicalMaterial
          color="#7c5cff"
          roughness={0.35}
          metalness={0.1}
          clearcoat={0.7}
          transparent
          opacity={opacity}
          clippingPlanes={clipping ?? []}
        />
      </mesh>
      {/* nuclear envelope */}
      <mesh position={[0.6, 0.3, 0.3]}>
        <sphereGeometry args={[1.12, 48, 48]} />
        <meshStandardMaterial
          color="#5b3ad6"
          transparent
          opacity={0.18}
          roughness={0.5}
          clippingPlanes={clipping ?? []}
        />
      </mesh>
    </OrganelleGroup>
  );
}

function Nucleolus() {
  const clipping = useClippingPlanes();
  return (
    <OrganelleGroup organelleId="nucleolus">
      <mesh name="Nucleolus" position={[0.85, 0.55, 0.55]} castShadow>
        <sphereGeometry args={[0.36, 32, 32]} />
        <meshStandardMaterial
          color="#3d2c80"
          roughness={0.45}
          clippingPlanes={clipping ?? []}
        />
      </mesh>
    </OrganelleGroup>
  );
}

function Mitochondria() {
  const clipping = useClippingPlanes();
  const positions: Array<[number, number, number, number]> = [
    // x, y, z, rotZ
    [-0.9, 0.7, 0.6, 0.7],
    [-1.3, -0.4, 0.2, -0.4],
    [0.2, -1.1, 0.9, 1.1],
    [-0.5, -0.8, -0.9, 0.3],
  ];
  return (
    <OrganelleGroup organelleId="mitochondrion">
      {positions.map(([x, y, z, rz], i) => (
        <group key={i} position={[x, y, z]} rotation={[0.4, 0.2, rz]}>
          <mesh name={`Mitochondrion_${i}`} castShadow>
            <capsuleGeometry args={[0.22, 0.55, 12, 24]} />
            <meshPhysicalMaterial
              color="#ff8a7a"
              roughness={0.35}
              clearcoat={0.5}
              clippingPlanes={clipping ?? []}
            />
          </mesh>
          {/* inner cristae hint */}
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.16, 0.04, 8, 24]} />
            <meshStandardMaterial color="#c14a3d" clippingPlanes={clipping ?? []} />
          </mesh>
        </group>
      ))}
    </OrganelleGroup>
  );
}

function RoughER() {
  const clipping = useClippingPlanes();
  return (
    <OrganelleGroup organelleId="rough-er">
      <group position={[-0.4, -0.2, 0.6]} rotation={[0.3, 0.5, 0.2]}>
        <mesh name="RoughER" castShadow>
          <torusKnotGeometry args={[0.55, 0.13, 96, 16, 2, 3]} />
          <meshPhysicalMaterial
            color="#f1a7c4"
            roughness={0.4}
            clearcoat={0.4}
            clippingPlanes={clipping ?? []}
          />
        </mesh>
        {/* ribosome dots */}
        {Array.from({ length: 22 }).map((_, i) => {
          const a = (i / 22) * Math.PI * 2;
          const r = 0.55;
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * r, Math.sin(a) * r * 0.4, Math.sin(a * 2) * 0.3]}
            >
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshStandardMaterial color="#ff5b6a" clippingPlanes={clipping ?? []} />
            </mesh>
          );
        })}
      </group>
    </OrganelleGroup>
  );
}

function SmoothER() {
  const clipping = useClippingPlanes();
  return (
    <OrganelleGroup organelleId="smooth-er">
      <group position={[1.1, -0.6, -0.4]} rotation={[0.6, 0.8, 0.4]}>
        <mesh name="SmoothER" castShadow>
          <torusKnotGeometry args={[0.45, 0.1, 80, 14, 3, 5]} />
          <meshPhysicalMaterial
            color="#f4b860"
            roughness={0.35}
            clearcoat={0.55}
            clippingPlanes={clipping ?? []}
          />
        </mesh>
      </group>
    </OrganelleGroup>
  );
}

function Golgi() {
  const clipping = useClippingPlanes();
  return (
    <OrganelleGroup organelleId="golgi">
      <group position={[-1.1, 0.9, -0.5]} rotation={[0.2, -0.4, 0.3]}>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} name={`Golgi_${i}`} position={[0, i * 0.13 - 0.26, 0]} castShadow>
            <torusGeometry args={[0.35 - i * 0.03, 0.06, 12, 32]} />
            <meshPhysicalMaterial
              color="#84d2c5"
              roughness={0.3}
              clearcoat={0.6}
              clippingPlanes={clipping ?? []}
            />
          </mesh>
        ))}
      </group>
    </OrganelleGroup>
  );
}

function Lysosomes() {
  const clipping = useClippingPlanes();
  const spots: Array<[number, number, number, number]> = [
    [1.4, 0.5, 0.7, 0.16],
    [0.9, -1.3, 0.4, 0.13],
    [-0.2, 1.2, -1.1, 0.18],
    [-1.5, 0.1, -0.6, 0.14],
    [0.4, -0.2, 1.4, 0.15],
  ];
  return (
    <OrganelleGroup organelleId="lysosome">
      {spots.map(([x, y, z, r], i) => (
        <mesh key={i} name={`Lysosome_${i}`} position={[x, y, z]} castShadow>
          <sphereGeometry args={[r, 24, 24]} />
          <meshPhysicalMaterial
            color="#ffd166"
            roughness={0.3}
            clearcoat={0.6}
            clippingPlanes={clipping ?? []}
          />
        </mesh>
      ))}
    </OrganelleGroup>
  );
}
