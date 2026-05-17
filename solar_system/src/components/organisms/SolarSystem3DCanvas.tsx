import { Html, Line, OrbitControls, useTexture } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, type FC } from 'react';
import { Group, Mesh, Vector3 } from 'three';
import { useExplorerStore } from '../../store/useExplorerStore';
import { PLANETS } from '../../data/planets';
import type { PlanetId } from '../../types/planet';
import { RadialRing } from './Planet3DCanvas';

/**
 * Vista 3D del sistema solar:
 *   • Sol emisivo al centro (corona)
 *   • 8 planetas orbitando en distancias COMPRIMIDAS (no escala real,
 *     porque Mercurio está a 0.4 UA y Neptuno a 30 UA — imposibles
 *     de mostrar juntos sin desaparecer Mercurio)
 *   • Cada planeta rota sobre su eje
 *   • Solo la Luna terrestre se renderiza orbitando la Tierra (las
 *     demás se omiten para mantener el peso bajo)
 *   • Líneas punteadas de las órbitas
 *   • OrbitControls + zoom de la store
 *
 * Texturas reutilizadas: ya están descargadas para Planet3DCanvas.
 * Esferas de baja densidad (32 segmentos) para mantener fps.
 */

interface PlanetCfg {
  id: PlanetId;
  textureUrl: string;
  orbitRadius: number; // distancia al sol (unidades world)
  size: number;        // radio visual (no real)
  orbitSec: number;    // segundos para una vuelta
  rotationSec: number; // segundos para girar sobre eje
  tilt?: number;       // inclinación axial (radianes)
  ringUrl?: string;
  ringInner?: number;
  ringOuter?: number;
}

// Distancias y tamaños VISUALMENTE balanceados (no escala real).
const SUN_RADIUS = 1.8;
const PLANETS_3D: PlanetCfg[] = [
  { id: 'mercurio', textureUrl: '/textures/mercury.jpg',          orbitRadius: 3.5,  size: 0.22, orbitSec: 12,  rotationSec: 60 },
  { id: 'venus',    textureUrl: '/textures/venus_atmosphere.jpg', orbitRadius: 4.8,  size: 0.36, orbitSec: 20,  rotationSec: 90 },
  { id: 'tierra',   textureUrl: '/textures/earth_daymap.jpg',     orbitRadius: 6.2,  size: 0.38, orbitSec: 26,  rotationSec: 14, tilt: 0.41 },
  { id: 'marte',    textureUrl: '/textures/mars.jpg',             orbitRadius: 7.8,  size: 0.28, orbitSec: 36,  rotationSec: 15 },
  { id: 'jupiter',  textureUrl: '/textures/jupiter.jpg',          orbitRadius: 10.5, size: 0.95, orbitSec: 70,  rotationSec: 7  },
  {
    id: 'saturno',
    textureUrl: '/textures/saturn.jpg',
    orbitRadius: 13.5,
    size: 0.85,
    orbitSec: 100,
    rotationSec: 8,
    ringUrl: '/textures/saturn_ring_alpha.png',
    ringInner: 1.2,
    ringOuter: 2.0,
  },
  { id: 'urano',    textureUrl: '/textures/uranus.jpg',           orbitRadius: 16.5, size: 0.6,  orbitSec: 130, rotationSec: 10 },
  { id: 'neptuno',  textureUrl: '/textures/neptune.jpg',          orbitRadius: 19.5, size: 0.6,  orbitSec: 160, rotationSec: 12 },
];

export const SolarSystem3DCanvas: FC = () => {
  const zoom = useExplorerStore((s) => s.cameraZoom);

  return (
    <Canvas
      camera={{ position: [0, 18, 32], fov: 32 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Scene zoom={zoom} />
    </Canvas>
  );
};

const Scene: FC<{ zoom: number }> = ({ zoom }) => (
  <>
    {/* Ambient generoso para que ningún planeta quede oscuro. */}
    <ambientLight intensity={0.95} />
    {/* Sol como punto de luz central — calentito. */}
    <pointLight position={[0, 0, 0]} intensity={3.5} color="#fff4d6" distance={80} decay={0.8} />
    {/* Fill lights direccionales para limpiar la cara nocturna de los planetas
        y aumentar el "claro" general que pidió el usuario. */}
    <directionalLight position={[10, 15, 10]} intensity={0.9} color="#ffffff" />
    <directionalLight position={[-10, -8, -10]} intensity={0.5} color="#cfd8ff" />

    <group scale={zoom}>
      <Sun />
      {PLANETS_3D.map((cfg) => (
        <PlanetOrbit key={cfg.id} cfg={cfg} />
      ))}
    </group>

    <OrbitControls
      enableZoom={false}
      enablePan={false}
      enableRotate
      rotateSpeed={0.5}
      autoRotate
      autoRotateSpeed={0.18}
      minPolarAngle={Math.PI * 0.18}
      maxPolarAngle={Math.PI * 0.82}
    />
  </>
);

/* ----- Sol (sin corona, solo el cuerpo emisivo) ----- */
const Sun: FC = () => {
  const sunRef = useRef<Mesh>(null);
  const sunTex = useTexture('/textures/sun.jpg');
  useFrame((_, delta) => {
    if (sunRef.current) sunRef.current.rotation.y += delta * 0.05;
  });
  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[SUN_RADIUS, 48, 48]} />
      <meshBasicMaterial map={sunTex} toneMapped={false} />
    </mesh>
  );
};

/* ----- Planeta orbitando + label opcional ----- */
const PlanetOrbit: FC<{ cfg: PlanetCfg }> = ({ cfg }) => {
  const orbitRef = useRef<Group>(null);
  const tex = useTexture(cfg.textureUrl);
  const ringTex = useTexture(cfg.ringUrl ?? '/textures/saturn_ring_alpha.png');

  useFrame((_, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += delta * ((Math.PI * 2) / cfg.orbitSec);
    }
  });

  return (
    <>
      <DashedOrbit radius={cfg.orbitRadius} />
      <group ref={orbitRef}>
        <group position={[cfg.orbitRadius, 0, 0]} rotation={[0, 0, cfg.tilt ?? 0]}>
          <PlanetSphere
            size={cfg.size}
            texture={tex}
            rotationSec={cfg.rotationSec}
            ringTexture={cfg.ringUrl ? ringTex : undefined}
            ringInner={cfg.ringInner}
            ringOuter={cfg.ringOuter}
          />
          {/* Solo la Tierra trae luna */}
          {cfg.id === 'tierra' && <EarthMoon parentSize={cfg.size} />}
          {/* Label flotante */}
          <Html
            position={[0, cfg.size + 0.35, 0]}
            center
            distanceFactor={8}
            zIndexRange={[100, 0]}
            style={{ pointerEvents: 'none' }}
          >
            <span className="cosmos-solar3d__label">{PLANETS[cfg.id].name}</span>
          </Html>
        </group>
      </group>
    </>
  );
};

const PlanetSphere: FC<{
  size: number;
  texture: import('three').Texture;
  rotationSec: number;
  ringTexture?: import('three').Texture;
  ringInner?: number;
  ringOuter?: number;
}> = ({ size, texture, rotationSec, ringTexture, ringInner, ringOuter }) => {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * ((Math.PI * 2) / rotationSec);
  });
  return (
    <>
      <mesh ref={ref}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial map={texture} roughness={0.85} metalness={0.04} />
      </mesh>
      {ringTexture && ringInner && ringOuter && (
        <RadialRing inner={size * ringInner} outer={size * ringOuter} texture={ringTexture} />
      )}
    </>
  );
};

/* ----- Luna de la Tierra (sin línea de órbita visible) ----- */
const EarthMoon: FC<{ parentSize: number }> = ({ parentSize }) => {
  const orbitRef = useRef<Group>(null);
  const moonTex = useTexture('/textures/moon.jpg');
  const orbitRadius = parentSize * 2.6;
  useFrame((_, delta) => {
    if (orbitRef.current) orbitRef.current.rotation.y += delta * 0.6;
  });
  return (
    <group ref={orbitRef}>
      <mesh position={[orbitRadius, 0, 0]}>
        <sphereGeometry args={[parentSize * 0.27, 24, 24]} />
        <meshStandardMaterial map={moonTex} roughness={0.95} />
      </mesh>
    </group>
  );
};

/* ----- Línea punteada de la órbita ----- */
const DashedOrbit: FC<{
  radius: number;
  color?: string;
  opacity?: number;
  thinner?: boolean;
}> = ({ radius, color = '#88a8d8', opacity = 0.35, thinner }) => {
  const points = useMemo(() => {
    const arr: Vector3[] = [];
    const segments = 96;
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      arr.push(new Vector3(Math.cos(t) * radius, 0, Math.sin(t) * radius));
    }
    return arr;
  }, [radius]);
  return (
    <Line
      points={points}
      color={color}
      lineWidth={thinner ? 0.8 : 1.2}
      dashed
      dashSize={0.18}
      gapSize={0.14}
      transparent
      opacity={opacity}
    />
  );
};
