import CaCard from '@/presentation/components/atoms/CaCard/CaCard';
import { useLanguage } from '@/presentation/context/LanguageContext';
import type { Cell } from '@/domain/entities';
import './EnrichmentCards.css';

export default function DiscoveryTimelineCard({ cell }: { cell: Cell }) {
  const { t } = useLanguage();
  if (!cell.discoveryTimeline?.length) return null;
  return (
    <CaCard
      title={
        <>
          <span style={{ color: 'var(--ca-accent)' }}>🕰</span>
          {t('Línea de tiempo', 'Timeline')}
        </>
      }
    >
      <ol className="ca-timeline">
        {cell.discoveryTimeline.map((e) => (
          <li key={e.year} className="ca-timeline__row">
            <span className="ca-timeline__year">{e.year}</span>
            <span className="ca-timeline__bullet">{e.emoji}</span>
            <span className="ca-timeline__text">{t(e.es, e.en)}</span>
          </li>
        ))}
      </ol>
    </CaCard>
  );
}
