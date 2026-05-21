import { Suspense, useEffect, useMemo, useRef, createContext, useContext } from 'react';
import type { ReactNode, MutableRefObject } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { useStudioStore } from '@/presentation/store/useStudioStore';
import { useLanguage } from '@/presentation/context/LanguageContext';
import { getCellById } from '@/infrastructure/data/cells';
import AnimalCellModel from './AnimalCellModel';
import PlantCellModel from './PlantCellModel';
import GLBCellModel from './GLBCellModel';
import ModelErrorBoundary from './ModelErrorBoundary';
import ControlsHint from '@/presentation/components/molecules/ControlsHint/ControlsHint';
import ViewerActionBar from '@/presentation/components/molecules/ViewerActionBar/ViewerActionBar';
import ViewModeSelector from '@/presentation/components/molecules/ViewModeSelector/ViewModeSelector';
import './CellViewer3D.css';

export const ActiveOrganelleContext = createContext<string | null>(null);
export const useActiveOrganelle = () => useContext(ActiveOrganelleContext);

function ResetHandler({ controls }: { controls: MutableRefObject<any> }) {
  const resetSignal = useStudioStore((s) => s.resetSignal);
  useEffect(() => {
    if (controls.current?.reset) controls.current.reset();
  }, [resetSignal, controls]);
  return null;
}

function ClippingSetup() {
  const { gl } = useThree();
  useEffect(() => {
    gl.localClippingEnabled = true;
  }, [gl]);
  return null;
}

export default function CellViewer3D() {
  const controlsRef = useRef<any>(null);
  const { t, language } = useLanguage();
  const selectedCellId = useStudioStore((s) => s.selectedCellId);
  const hovered = useStudioStore((s) => s.hoveredOrganelleId);
  const selected = useStudioStore((s) => s.selectedOrganelleId);
  const activeId = hovered ?? selected;

  const cell = getCellById(selectedCellId);
  const cellName = useMemo(
    () => (cell ? (language === 'es' ? cell.name : cell.nameEn) : ''),
    [cell, language],
  );
  const cellSub = useMemo(
    () => (cell ? (language === 'es' ? cell.subtitle : cell.subtitleEn) : ''),
    [cell, language],
  );

  return (
    <div className="ca-viewer">
      <div className="ca-viewer__top">
        <div className="ca-viewer__heading">
          <h2 className="ca-viewer__title">{cellName}</h2>
          <p className="ca-viewer__subtitle">{cellSub}</p>
        </div>
        <ViewModeSelector />
      </div>

      <div className="ca-viewer__canvas">
        <div className="ca-viewer__hint">
          <ControlsHint
            tip={t(
              'Tip: Arrastra para rotar  ·  Scroll para hacer zoom  ·  Ctrl + arrastra para mover',
              'Tip: Drag to rotate  ·  Scroll to zoom  ·  Ctrl + drag to pan',
            )}
          />
        </div>

        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [7.5, 4, 9], fov: 38, near: 0.1, far: 100 }}
          gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        >
          <color attach="background" args={['#fbf6ee']} />
          <fog attach="fog" args={['#fbf6ee', 16, 28]} />
          <ambientLight intensity={0.45} />
          <directionalLight
            position={[6, 9, 5]}
            intensity={1.4}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-bias={-0.0005}
          />
          <directionalLight position={[-6, 4, -3]} intensity={0.55} color="#b8e0a0" />
          <pointLight position={[0, -4, 0]} intensity={0.3} color="#ffd6a5" />

          <ClippingSetup />

          <Suspense fallback={null}>
            <ActiveOrganelleContext.Provider value={activeId}>
              {cell?.modelPath ? (
                <ModelErrorBoundary
                  fallback={
                    selectedCellId === 'plant' ? <PlantCellModel /> : <AnimalCellModel />
                  }
                  resetKey={selectedCellId}
                >
                  <GLBCellModel cell={cell} />
                </ModelErrorBoundary>
              ) : selectedCellId === 'plant' ? (
                <PlantCellModel />
              ) : (
                <AnimalCellModel />
              )}
            </ActiveOrganelleContext.Provider>
            <Environment preset="apartment" />
          </Suspense>

          <ContactShadows
            position={[0, -2.6, 0]}
            opacity={0.4}
            scale={14}
            blur={2.6}
            far={4}
            color="#2a1d0a"
          />

          <OrbitControls
            ref={controlsRef}
            enablePan
            enableZoom
            enableRotate
            minDistance={5}
            maxDistance={18}
            makeDefault
          />
          <ResetHandler controls={controlsRef} />
        </Canvas>

        <ViewerActionBar />
      </div>
    </div>
  );
}

export function ViewerSlot({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
