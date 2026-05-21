import CaCard from '@/presentation/components/atoms/CaCard/CaCard';
import { useLanguage } from '@/presentation/context/LanguageContext';
import type { Cell } from '@/domain/entities';
import './EnrichmentCards.css';

export default function TryAtHomeCard({ cell }: { cell: Cell }) {
  const { t } = useLanguage();
  if (!cell.tryAtHome) return null;
  return (
    <CaCard
      title={
        <>
          <span style={{ color: 'var(--ca-amber)' }}>🧪</span>
          {t('Pruébalo en casa', 'Try it at home')}
        </>
      }
    >
      <p className="ca-try__text">{t(cell.tryAtHome, cell.tryAtHomeEn ?? cell.tryAtHome)}</p>
    </CaCard>
  );
}
