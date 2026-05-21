import CaCard from '@/presentation/components/atoms/CaCard/CaCard';
import CaButton from '@/presentation/components/atoms/CaButton/CaButton';
import { useLanguage } from '@/presentation/context/LanguageContext';
import './CompareCellsCard.css';

export default function CompareCellsCard() {
  const { t } = useLanguage();

  return (
    <CaCard
      title={
        <>
          {t('Comparar células', 'Compare cells')}
          <span className="ca-compare__info">ⓘ</span>
        </>
      }
    >
      <div className="ca-compare__row">
        <div className="ca-compare__pill">
          <span className="ca-compare__emoji">🐾</span>
          <div className="ca-compare__pill-text">
            <span className="ca-compare__name">{t('Célula animal', 'Animal Cell')}</span>
            <span className="ca-compare__sub">{t('(estás aquí)', '(You are here)')}</span>
          </div>
        </div>
        <div className="ca-compare__vs">VS</div>
        <div className="ca-compare__pill">
          <span className="ca-compare__emoji">🌿</span>
          <div className="ca-compare__pill-text">
            <span className="ca-compare__name">{t('Célula vegetal', 'Plant Cell')}</span>
            <span className="ca-compare__sub">{t('Eucariota', 'Eukaryotic')}</span>
          </div>
        </div>
      </div>
      <CaButton
        variant="soft"
        className="ca-compare__cta"
        disabled
        title={t('Próximamente', 'Coming soon')}
        iconRight={<span>›</span>}
      >
        {t('Abrir comparación', 'Open Comparison View')}
      </CaButton>
    </CaCard>
  );
}
