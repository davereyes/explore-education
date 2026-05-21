import CaCard from '@/presentation/components/atoms/CaCard/CaCard';
import { useLanguage } from '@/presentation/context/LanguageContext';
import type { Cell } from '@/domain/entities';
import './EnrichmentCards.css';

export default function AmazingNumbersCard({ cell }: { cell: Cell }) {
  const { t } = useLanguage();
  if (!cell.amazingNumbers?.length) return null;
  return (
    <CaCard
      title={
        <>
          <span style={{ color: 'var(--ca-coral)' }}>💫</span>
          {t('Números que sorprenden', 'Wow numbers')}
        </>
      }
    >
      <ul className="ca-stats">
        {cell.amazingNumbers.map((n, i) => (
          <li key={i} className="ca-stats__row">
            <span className="ca-stats__emoji">{n.emoji}</span>
            <span>{t(n.es, n.en)}</span>
          </li>
        ))}
      </ul>
    </CaCard>
  );
}
