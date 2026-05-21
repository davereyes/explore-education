import CaCard from '@/presentation/components/atoms/CaCard/CaCard';
import { useLanguage } from '@/presentation/context/LanguageContext';
import type { Cell } from '@/domain/entities';
import './EnrichmentCards.css';

export default function SpecializedCellsCard({ cell }: { cell: Cell }) {
  const { t } = useLanguage();
  if (!cell.specializedCells?.length) return null;
  return (
    <CaCard
      title={
        <>
          <span style={{ color: 'var(--ca-org-chloroplast)' }}>🧬</span>
          {t('Tipos especializados', 'Specialized types')}
        </>
      }
    >
      <ul className="ca-spec-list">
        {cell.specializedCells.map((s) => (
          <li key={s.nameEn} className="ca-spec-row">
            <span className="ca-spec-row__emoji">{s.emoji}</span>
            <div>
              <div className="ca-spec-row__name">{t(s.name, s.nameEn)}</div>
              <div className="ca-spec-row__role">{t(s.role, s.roleEn)}</div>
            </div>
          </li>
        ))}
      </ul>
    </CaCard>
  );
}
