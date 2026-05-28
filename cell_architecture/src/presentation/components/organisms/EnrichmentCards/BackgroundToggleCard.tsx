import CaCard from '@/presentation/components/atoms/CaCard/CaCard';
import CaToggle from '@/presentation/components/atoms/CaToggle/CaToggle';
import { useLanguage } from '@/presentation/context/LanguageContext';
import { useStudioStore } from '@/presentation/store/useStudioStore';

export default function BackgroundToggleCard() {
  const { t } = useLanguage();
  const flat = useStudioStore((s) => s.flatBackground);
  const toggleFlat = useStudioStore((s) => s.toggleFlatBackground);
  return (
    <CaCard
      title={
        <>
          <span style={{ color: 'var(--ca-text-muted)' }}>◫</span>
          {t('Apariencia', 'Appearance')}
        </>
      }
    >
      <CaToggle
        checked={flat}
        onChange={toggleFlat}
        label={t('Fondo plano (#F8F8F8)', 'Flat background (#F8F8F8)')}
        id="bg-flat-toggle"
      />
    </CaCard>
  );
}
