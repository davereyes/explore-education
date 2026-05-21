import CaCard from '@/presentation/components/atoms/CaCard/CaCard';
import { useLanguage } from '@/presentation/context/LanguageContext';
import { useStudioStore } from '@/presentation/store/useStudioStore';
import { getCellById } from '@/infrastructure/data/cells';
import './OccurrenceCard.css';

export default function OccurrenceCard() {
  const { t, language } = useLanguage();
  const { selectedCellId } = useStudioStore();
  const cell = getCellById(selectedCellId);
  if (!cell) return null;

  const species = language === 'es' ? cell.occurrence.speciesEs : cell.occurrence.speciesEn;

  return (
    <CaCard title={t('Dónde ocurre', 'Where it occurs')}>
      <div className="ca-occur">
        <div className="ca-occur__hosts">{cell.occurrence.imageEmoji}</div>
        <ul className="ca-occur__list">
          {species.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </CaCard>
  );
}
