import CaCard from '@/presentation/components/atoms/CaCard/CaCard';
import { useLanguage } from '@/presentation/context/LanguageContext';
import type { Cell } from '@/domain/entities';
import './EnrichmentCards.css';

export default function UniqueFeaturesCard({ cell }: { cell: Cell }) {
  const { t } = useLanguage();
  if (!cell.uniqueFeatures?.length) return null;
  return (
    <CaCard
      title={
        <>
          <span style={{ color: 'var(--ca-mint)' }}>✦</span>
          {t('Solo en esta célula', 'Unique to this cell')}
        </>
      }
    >
      <div className="ca-feat-chips">
        {cell.uniqueFeatures.map((f) => (
          <div key={f.nameEn} className="ca-feat-chip">
            <span className="ca-feat-chip__emoji">{f.emoji}</span>
            <span>{t(f.name, f.nameEn)}</span>
          </div>
        ))}
      </div>
    </CaCard>
  );
}
