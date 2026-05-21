import CaCard from '@/presentation/components/atoms/CaCard/CaCard';
import CaButton from '@/presentation/components/atoms/CaButton/CaButton';
import { useLanguage } from '@/presentation/context/LanguageContext';
import { useStudioStore } from '@/presentation/store/useStudioStore';
import { cells, getCellById } from '@/infrastructure/data/cells';
import './CompareCellsCard.css';

export default function CompareCellsCard() {
  const { t } = useLanguage();
  const selectedCellId = useStudioStore((s) => s.selectedCellId);
  const current = getCellById(selectedCellId);
  // Pick the first OTHER enabled cell as comparison candidate
  const other = cells.find((c) => c.enabled && c.id !== selectedCellId) ?? cells.find((c) => c.id !== selectedCellId);
  if (!current || !other) return null;

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
          <span className="ca-compare__emoji">{current.thumbnailEmoji}</span>
          <div className="ca-compare__pill-text">
            <span className="ca-compare__name">{t(current.name, current.nameEn)}</span>
            <span className="ca-compare__sub">{t('(estás aquí)', '(You are here)')}</span>
          </div>
        </div>
        <div className="ca-compare__vs">VS</div>
        <div className="ca-compare__pill">
          <span className="ca-compare__emoji">{other.thumbnailEmoji}</span>
          <div className="ca-compare__pill-text">
            <span className="ca-compare__name">{t(other.name, other.nameEn)}</span>
            <span className="ca-compare__sub">{t(other.subtitle, other.subtitleEn)}</span>
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
