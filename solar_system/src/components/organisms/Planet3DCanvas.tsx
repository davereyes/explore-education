import { Html, Line, OrbitControls, useTexture } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, type FC } from 'react';
import { useExplorerStore } from '../../store/useExplorerStore';
import {
  AdditiveBlending,
  BackSide,
  BufferAttribute,
  DoubleSide,
  Group,
  MathUtils,
  Mesh,
  RingGeometry,
  type Texture,
  Vector3,
} from 'three';
import type { CoreLayer, Moon3D, Planet, PlanetRender3D } from '../../types/planet';

interface Planet3DCanvasProps {
  render3D: PlanetRender3D;
  planetId: string;
  /** Datos completos del planeta — necesarios para la vista de núcleo. */
  planet?: Planet;
}

/* ----- Saturn-style rings with radial UV mapping. The standard ringGeometry
   uses cartesian UVs, which maps a strip texture as a flat square behind the
   ring. Here we remap UVs so U = (radius - inner) / (outer - inner). That
   makes each concentric band sample one column of the texture and follow the
   ring's curvature correctly. ----- */
export const RadialRing: FC<{ inner: number; outer: number; texture: Texture }> = ({
  inner,
  outer,
  texture,
}) => {
  const geometry = useMemo(() => {
    const g = new RingGeometry(inner, outer, 192, 4);
    const pos = g.attributes.position;
    const uvs = new Float32Array(pos.count * 2);
    const v3 = new Vector3();
    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i);
      const r = v3.length();
      uvs[i * 2] = (r - inner) / (outer - inner);
      uvs[i * 2 + 1] = 0.5;
    }
    g.setAttribute('uv', new BufferAttribute(uvs, 2));
    return g;
  }, [inner, outer]);

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} geometry={geometry}>
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={1}
        side={DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
};

/* ----- Planet body (textured sphere + optional clouds + optional rings) ----- */
interface PlanetBodyProps {
  render3D: PlanetRender3D;
}

const PlanetBody: FC<PlanetBodyProps> = ({ render3D }) => {
  const surfaceTex = useTexture(render3D.textureUrl);
  const cloudsTex = useTexture(render3D.cloudsUrl ?? render3D.textureUrl);
  const ringTex = useTexture(render3D.ringUrl ?? '/textures/saturn_ring_alpha.png');

  const planetRef = useRef<Mesh>(null);
  const cloudsRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    const angularSpeed = (Math.PI * 2) / render3D.rotationPeriodSec;
    if (planetRef.current) planetRef.current.rotation.y += delta * angularSpeed;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * angularSpeed * 1.15;
  });

  /* ----- Emissive body (Sun): glowing surface only, sin corona.
     meshBasicMaterial → texture a brillo pleno sin necesidad de luces. ----- */
  if (render3D.emissive) {
    return (
      <mesh ref={planetRef}>
        <sphereGeometry args={[1, 96, 96]} />
        <meshBasicMaterial map={surfaceTex} toneMapped={false} />
      </mesh>
    );
  }

  return (
    <>
      {/* Planet surface */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[1, 96, 96]} />
        <meshStandardMaterial map={surfaceTex} roughness={0.95} metalness={0.02} />
      </mesh>

      {/* Cloud layer — uses the brightness of the cloud texture as an alpha mask
          so dark areas of the texture are transparent (let the surface show)
          and bright areas (clouds) are visible white. */}
      {render3D.cloudsUrl && (
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[1.012, 96, 96]} />
          <meshStandardMaterial
            alphaMap={cloudsTex}
            color="#ffffff"
            transparent
            depthWrite={false}
            roughness={1}
          />
        </mesh>
      )}

      {/* Atmosphere fresnel glow (subtle) */}
      <mesh scale={1.035}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.05}
          side={BackSide}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Rings (Saturn) — uses a custom geometry with RADIAL UV mapping so the
          horizontal strip texture wraps as concentric bands following the
          ring's curvature (not as a flat square behind the ring). */}
      {render3D.ringUrl && render3D.ringInner && render3D.ringOuter && (
        <RadialRing
          inner={render3D.ringInner}
          outer={render3D.ringOuter}
          texture={ringTex}
        />
      )}
    </>
  );
};

/* ----- Dashed orbit circle (in the XZ plane) ----- */
const DashedOrbit: FC<{ radius: number }> = ({ radius }) => {
  const points = useMemo(() => {
    const arr: Vector3[] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      arr.push(new Vector3(Math.cos(t) * radius, 0, Math.sin(t) * radius));
    }
    return arr;
  }, [radius]);

  return (
    <Line
      points={points}
      color="#ffffff"
      lineWidth={1}
      dashed
      dashSize={0.08}
      gapSize={0.06}
      transparent
      opacity={0.4}
    />
  );
};

/* ----- Moon (orbits the planet, rotates on its own axis) ----- */
const MoonBody: FC<{ moon: Moon3D }> = ({ moon }) => {
  const moonTex = useTexture('/textures/moon.jpg');
  const orbitRef = useRef<Group>(null);
  const moonRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    const orbitSpeed = (Math.PI * 2) / moon.orbitPeriodSec;
    if (orbitRef.current) orbitRef.current.rotation.y += delta * orbitSpeed;
    if (moonRef.current) moonRef.current.rotation.y += delta * orbitSpeed * 0.5;
  });

  return (
    <>
      <DashedOrbit radius={moon.orbitRadius} />
      <group ref={orbitRef}>
        <mesh ref={moonRef} position={[moon.orbitRadius, 0, 0]}>
          <sphereGeometry args={[moon.radius, 48, 48]} />
          <meshStandardMaterial
            map={moonTex}
            color={moon.tint ?? '#ffffff'}
            roughness={0.95}
            metalness={0.02}
          />
        </mesh>
      </group>
    </>
  );
};

/* ----- Core cross-section view: concentric half-spheres + 3D labels.
   Each layer is rendered as a half-sphere (phiLength = PI, theta full),
   facing the camera so the cavity is visible. Inside, smaller half-spheres
   for each successive layer. The textured outer hemisphere shows the
   planet's surface on the un-cut side. Html labels live at each layer's
   exposed edge and follow the rotation. ----- */
interface CoreViewProps {
  render3D: PlanetRender3D;
  layers: CoreLayer[];
  surfaceTex: Texture;
}

const CoreView: FC<CoreViewProps> = ({ render3D, layers, surfaceTex }) => {
  const maxRadius = layers[0]?.outerRadiusKm ?? 1;
  const phiStart = Math.PI / 2;
  const phiLength = Math.PI;

  // Layout for labels + connector lines.
  // Anchors: on the LEFT edge of each layer's middle radius (on the cut plane).
  // Labels: stacked vertically at a fixed x, outside the planet's silhouette.
  // The outermost layer's label sits at the top; the innermost at the bottom.
  // This way the connector lines fan out without crossing.
  const labelPositions = useMemo(() => {
    const n = layers.length;
    const labelX = -1.7;
    // Tighter spacing for more layers so labels don't fly off-screen
    const verticalStep = n <= 3 ? 0.6 : n === 4 ? 0.45 : 0.36;
    return layers.map((layer, i) => {
      const outerR = layer.outerRadiusKm / maxRadius;
      const innerR = layer.innerRadiusKm / maxRadius;
      const midR = (outerR + innerR) / 2;
      const anchor = new Vector3(-midR, 0, 0.001);
      const labelY = ((n - 1) / 2 - i) * verticalStep;
      const labelPos = new Vector3(labelX, labelY, 0.02);
      return { anchor, labelPos };
    });
  }, [layers, maxRadius]);

  return (
    <group rotation={[0, 0, MathUtils.degToRad(render3D.axialTiltDeg * 0.4)]}>
      {/* Outer planet shell — textured, hemisphere away from camera */}
      <mesh>
        <sphereGeometry args={[1.001, 96, 96, phiStart, phiLength]} />
        <meshStandardMaterial
          map={surfaceTex}
          side={DoubleSide}
          roughness={0.95}
          metalness={0.02}
        />
      </mesh>

      {/* Concentric inner layers + connector lines + labels */}
      {layers.map((layer, i) => {
        const r = (layer.outerRadiusKm / maxRadius) * 0.998;
        const { anchor, labelPos } = labelPositions[i];
        return (
          <group key={layer.id}>
            <mesh>
              <sphereGeometry args={[r, 80, 80, phiStart, phiLength]} />
              <meshStandardMaterial
                color={layer.color}
                side={DoubleSide}
                roughness={0.55}
                metalness={0.05}
                emissive={layer.color}
                emissiveIntensity={0.08}
              />
            </mesh>

            {/* Connector: from layer edge (anchor) to label position */}
            <Line
              points={[anchor.toArray(), labelPos.toArray()]}
              color="#ffffff"
              lineWidth={1}
              transparent
              opacity={0.55}
            />
            {/* Small anchor dot on the layer */}
            <mesh position={anchor.toArray()}>
              <sphereGeometry args={[0.022, 16, 16]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>

            {/* Label anchored in the planet's local space — follows rotation */}
            <Html
              position={labelPos.toArray() as [number, number, number]}
              center
              distanceFactor={4}
              occlude={false}
              zIndexRange={[100, 0]}
              style={{ pointerEvents: 'none' }}
            >
              <div className="cosmos-core-label">
                <span className="cosmos-core-label__dot" style={{ background: layer.color }} />
                <span className="cosmos-core-label__name">{layer.name}</span>
                <span className="cosmos-core-label__size">
                  {layer.outerRadiusKm.toLocaleString('es-MX')} km
                </span>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

/* ----- The whole scene ----- */
interface SceneProps extends Planet3DCanvasProps {
  zoomScale: number;
  viewMode: 'explore' | 'core' | 'compare';
}

const Scene: FC<SceneProps> = ({ render3D, zoomScale, viewMode, planet }) => {
  const basePlanetScale = render3D.scale ?? 0.55;
  const surfaceTex = useTexture(render3D.textureUrl);
  const isCore = viewMode === 'core' && !!planet?.coreLayers?.length;

  return (
    <>
      <ambientLight intensity={0.95} />
      <directionalLight position={[6, 3, 5]} intensity={2.4} color="#fff4e0" />
      <directionalLight position={[-5, 2, -3]} intensity={0.9} color="#cfd8ff" />
      <directionalLight position={[0, -4, 4]} intensity={0.4} color="#ffd9a8" />
      {/* Outer group: vertical offset + per-planet scale * user zoom */}
      <group position={[0, -0.4, 0]} scale={basePlanetScale * zoomScale}>
        {isCore && planet?.coreLayers ? (
          <CoreView render3D={render3D} layers={planet.coreLayers} surfaceTex={surfaceTex} />
        ) : (
          <group rotation={[0, 0, MathUtils.degToRad(render3D.axialTiltDeg)]}>
            <PlanetBody render3D={render3D} />
            {render3D.moons?.map((moon) => (
              <MoonBody key={moon.name} moon={moon} />
            ))}
          </group>
        )}
      </group>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate
        rotateSpeed={0.6}
        autoRotate={!isCore}
        autoRotateSpeed={0.35}
        minPolarAngle={Math.PI * 0.25}
        maxPolarAngle={Math.PI * 0.75}
      />
    </>
  );
};

/* ----- Public component. Zoom state lives in the store so the +/- buttons
        can live elsewhere in the DOM (action bar of the hero). ----- */
export const Planet3DCanvas: FC<Planet3DCanvasProps> = ({ render3D, planetId, planet }) => {
  const zoom = useExplorerStore((s) => s.cameraZoom);
  const viewMode = useExplorerStore((s) => s.viewMode);

  return (
    <Canvas
      key={planetId}
      camera={{ position: [0, 0.4, 4.2], fov: 35 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Scene
        render3D={render3D}
        planetId={planetId}
        planet={planet}
        zoomScale={zoom}
        viewMode={viewMode}
      />
    </Canvas>
  );
};
