import CaButton from '@/presentation/components/atoms/CaButton/CaButton';
import { useLanguage } from '@/presentation/context/LanguageContext';
import { useStudioStore } from '@/presentation/store/useStudioStore';
import './ViewerActionBar.css';

function takeScreenshot() {
  const canvas = document.querySelector('.ca-viewer__canvas canvas') as HTMLCanvasElement | null;
  if (!canvas) return;
  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = `cell-architecture-${Date.now()}.png`;
  a.click();
}

export default function ViewerActionBar() {
  const { t } = useLanguage();
  const { isolate, hideOthers, toggleIsolate, toggleHideOthers, resetView } = useStudioStore();

  return (
    <>
      <div className="ca-actionbar">
        <CaButton iconLeft={<span>↻</span>} variant="pill" onClick={resetView}>
          {t('Rotar', 'Rotate')}
        </CaButton>
        <span className="ca-actionbar__sep" />
        <CaButton
          iconLeft={<span>◉</span>}
          variant="pill"
          active={isolate}
          onClick={toggleIsolate}
        >
          {t('Aislar', 'Isolate')}
        </CaButton>
        <span className="ca-actionbar__sep" />
        <CaButton
          iconLeft={<span>◐</span>}
          variant="pill"
          active={hideOthers}
          onClick={toggleHideOthers}
        >
          {t('Ocultar otros', 'Hide Others')}
        </CaButton>
        <span className="ca-actionbar__sep" />
        <CaButton iconLeft={<span>⟲</span>} variant="pill" onClick={resetView}>
          {t('Restablecer', 'Reset View')}
        </CaButton>
      </div>

      <div className="ca-exportbar">
        <CaButton iconLeft={<span>📷</span>} variant="soft" onClick={takeScreenshot}>
          {t('Captura', 'Screenshot')}
        </CaButton>
        <CaButton
          iconLeft={<span>⊡</span>}
          variant="soft"
          disabled
          title={t('Próximamente', 'Coming soon')}
        >
          {t('Exportar 3D', '3D Export')}
        </CaButton>
      </div>
    </>
  );
}
