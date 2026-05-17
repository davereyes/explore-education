import { Html, Line, OrbitControls, useTexture } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, type FC } from 'react';
import { Group, Mesh, Vector3 } from 'three';
import { useExplorerStore } from '../../store/useExplorerStore';
import { PLANETS } from '../../data/planets';
import {
  SOLAR_SYSTEM_PLANETS,
  SUN_RADIUS,
  type SolarSystemPlanetCfg,
} from '../../data/solarSystemVisualization';
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

// Config visual (distancias, tamaños, velocidades) vive en data/.
// Mira `src/data/solarSystemVisualization.ts` si necesitas ajustar.
type PlanetCfg = SolarSystemPlanetCfg;

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
      {SOLAR_SYSTEM_PLANETS.map((cfg) => (
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
            extraEmissive={cfg.extraEmissive ?? 0}
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
  /** Aumenta la intensidad emisiva del material (usa la propia textura como
   *  emissive map). Útil para que un planeta específico (la Tierra) se
   *  perciba más claro/luminoso que el resto. */
  extraEmissive?: number;
}> = ({ size, texture, rotationSec, ringTexture, ringInner, ringOuter, extraEmissive = 0 }) => {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * ((Math.PI * 2) / rotationSec);
  });
  return (
    <>
      <mesh ref={ref}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.85}
          metalness={0.04}
          emissiveMap={extraEmissive > 0 ? texture : undefined}
          emissive={extraEmissive > 0 ? '#ffffff' : '#000000'}
          emissiveIntensity={extraEmissive}
        />
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
