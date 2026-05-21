import CaButton from '@/presentation/components/atoms/CaButton/CaButton';
import { useLanguage } from '@/presentation/context/LanguageContext';
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
  return (
    <div className="ca-exportbar">
      <CaButton iconLeft={<span>📷</span>} variant="soft" onClick={takeScreenshot}>
        {t('Captura', 'Screenshot')}
      </CaButton>
    </div>
  );
}
