import { Suspense, useEffect, useMemo, useRef, createContext, useContext } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { useStudioStore, type ViewerSource } from '@/presentation/store/useStudioStore';
import { useLanguage } from '@/presentation/context/LanguageContext';
import { getCellById } from '@/infrastructure/data/cells';
import AnimalCellModel from './AnimalCellModel';
import PlantCellModel from './PlantCellModel';
import GLBCellModel from './GLBCellModel';
import ModelErrorBoundary from './ModelErrorBoundary';
import ViewerActionBar from '@/presentation/components/molecules/ViewerActionBar/ViewerActionBar';
import ViewerMicroscopeBar from '@/presentation/components/molecules/ViewerMicroscopeBar/ViewerMicroscopeBar';
import './CellViewer3D.css';

export const ActiveOrganelleContext = createContext<string | null>(null);
export const useActiveOrganelle = () => useContext(ActiveOrganelleContext);

function ClippingSetup() {
  const { gl } = useThree();
  useEffect(() => {
    gl.localClippingEnabled = true;
  }, [gl]);
  return null;
}

function ThreeDScene({ activeId }: { activeId: string | null }) {
  const controlsRef = useRef<any>(null);
  const selectedCellId = useStudioStore((s) => s.selectedCellId);
  const cell = getCellById(selectedCellId);
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [7.5, 4, 9], fov: 38, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
    >
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
        opacity={0.18}
        scale={14}
        blur={3.2}
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
    </Canvas>
  );
}

export default function CellViewer3D() {
  const { t, language } = useLanguage();
  const selectedCellId = useStudioStore((s) => s.selectedCellId);
  const selectedOrganelleId = useStudioStore((s) => s.selectedOrganelleId);
  const viewerSource: ViewerSource = useStudioStore((s) => s.viewerSource);

  const cell = getCellById(selectedCellId);
  const organelle = cell?.organelles.find((o) => o.id === selectedOrganelleId);
  const microscopeImage =
    viewerSource !== '3d' ? cell?.microscope.find((m) => m.type === viewerSource) : null;
  const showingPhoto = !!microscopeImage?.imageUrl;

  const cellName = useMemo(
    () => (cell ? (language === 'es' ? cell.name : cell.nameEn) : ''),
    [cell, language],
  );
  const cellSub = useMemo(
    () => (cell ? (language === 'es' ? cell.subtitle : cell.subtitleEn) : ''),
    [cell, language],
  );
  const description = useMemo(() => {
    if (!cell) return '';
    if (organelle) return t(organelle.notes, organelle.notesEn);
    return t(cell.generalSummary, cell.generalSummaryEn);
  }, [cell, organelle, t]);

  return (
    <div className="ca-viewer">
      <div className="ca-viewer__top">
        {!showingPhoto && (
          <div className="ca-viewer__heading">
            <h2 className="ca-viewer__title">{cellName}</h2>
            <p className="ca-viewer__subtitle">{cellSub}</p>
            {description && <p className="ca-viewer__desc">{description}</p>}
          </div>
        )}
        {showingPhoto && (
          <div className="ca-viewer__source-badge">
            <span className="ca-viewer__source-dot" />
            {t(cellName + ' · ' + microscopeImage!.label, cellName + ' · ' + microscopeImage!.labelEn)}
          </div>
        )}
      </div>

      <div className="ca-viewer__canvas">
        {showingPhoto ? (
          <div className="ca-viewer__photo">
            <img
              src={microscopeImage!.imageUrl!}
              alt={t(microscopeImage!.label, microscopeImage!.labelEn)}
              referrerPolicy="no-referrer"
            />
            {microscopeImage!.credit && (
              <a
                className="ca-viewer__photo-credit"
                href={microscopeImage!.credit!.source}
                target="_blank"
                rel="noopener noreferrer"
              >
                {microscopeImage!.credit!.author} · {microscopeImage!.credit!.license}
              </a>
            )}
          </div>
        ) : (
          <ThreeDScene activeId={selectedOrganelleId} />
        )}

        <ViewerMicroscopeBar />
        <ViewerActionBar />
      </div>
    </div>
  );
}
