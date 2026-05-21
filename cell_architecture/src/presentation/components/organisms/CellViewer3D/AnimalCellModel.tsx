import * as THREE from 'three';
import { MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import OrganelleGroup from './OrganelleGroup';
import { useClippingPlanes, useViewModeOpacity } from './useClipping';

export default function AnimalCellModel() {
  return (
    <group>
      <Membrane />
      <Cytoplasm />
      <Nucleus />
      <Mitochondria />
      <RoughER />
      <Golgi />
      <Lysosomes />
    </group>
  );
}

function Membrane() {
  const clipping = useClippingPlanes();
  const opacity = useViewModeOpacity(0.22, 0.65);
  return (
    <OrganelleGroup organelleId="membrane" keepInIsolate>
      <mesh name="Membrane" castShadow receiveShadow>
        <sphereGeometry args={[2.6, 96, 96]} />
        <meshPhysicalMaterial
          color="#b7e3d3"
          transparent
          opacity={opacity}
          roughness={0.32}
          transmission={0.5}
          thickness={0.6}
          clearcoat={0.7}
          sheen={0.3}
          sheenColor="#d3f3e6"
          side={THREE.DoubleSide}
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
      <icosahedronGeometry args={[2.48, 4]} />
      <MeshDistortMaterial
        color="#c5b8ff"
        transparent
        opacity={0.12}
        roughness={0.6}
        distort={0.08}
        speed={0.3}
        clippingPlanes={clipping ?? []}
      />
    </mesh>
  );
}

function Nucleus() {
  const clipping = useClippingPlanes();
  const opacity = useViewModeOpacity(0.95);
  return (
    <OrganelleGroup organelleId="nucleus">
      <group position={[0.6, 0.3, 0.3]}>
        <mesh name="Nucleus" castShadow>
          <icosahedronGeometry args={[1.05, 4]} />
          <meshPhysicalMaterial
            color="#a87cff"
            roughness={0.4}
            clearcoat={0.6}
            sheen={0.4}
            sheenColor="#d3bdff"
            transparent
            opacity={opacity}
            clippingPlanes={clipping ?? []}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.12, 48, 48]} />
          <meshStandardMaterial
            color="#5b3ad6"
            transparent
            opacity={0.18}
            roughness={0.5}
            clippingPlanes={clipping ?? []}
          />
        </mesh>
        <mesh position={[0.25, 0.2, 0.25]}>
          <sphereGeometry args={[0.32, 24, 24]} />
          <meshStandardMaterial color="#3d2c80" roughness={0.45} clippingPlanes={clipping ?? []} />
        </mesh>
      </group>
    </OrganelleGroup>
  );
}

function Mitochondria() {
  const clipping = useClippingPlanes();
  const positions: Array<[number, number, number, number]> = [
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
            <capsuleGeometry args={[0.22, 0.55, 16, 24]} />
            <MeshWobbleMaterial
              color="#ff8a7a"
              roughness={0.35}
              factor={0.06}
              speed={0.5}
              clippingPlanes={clipping ?? []}
            />
          </mesh>
          {Array.from({ length: 3 }).map((_, j) => (
            <mesh key={j} position={[0, (j - 1) * 0.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.15, 0.025, 8, 20]} />
              <meshStandardMaterial color="#b8392f" clippingPlanes={clipping ?? []} />
            </mesh>
          ))}
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

function Golgi() {
  const clipping = useClippingPlanes();
  return (
    <OrganelleGroup organelleId="golgi">
      <group position={[-1.1, 0.9, -0.5]} rotation={[0.2, -0.4, 0.3]}>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} name={`Golgi_${i}`} position={[0, i * 0.13 - 0.26, 0]} castShadow>
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
