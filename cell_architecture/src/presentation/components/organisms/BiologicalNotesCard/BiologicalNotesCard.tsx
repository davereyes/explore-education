import CaCard from '@/presentation/components/atoms/CaCard/CaCard';
import { useLanguage } from '@/presentation/context/LanguageContext';
import { useStudioStore } from '@/presentation/store/useStudioStore';
import { getCellById } from '@/infrastructure/data/cells';
import './BiologicalNotesCard.css';

export default function BiologicalNotesCard() {
  const { t } = useLanguage();
  const { selectedCellId, selectedOrganelleId } = useStudioStore();
  const cell = getCellById(selectedCellId);
  if (!cell) return null;

  // Cell-level
  if (selectedOrganelleId === null) {
    return (
      <CaCard title={t('Notas biológicas', 'Biological notes')}>
        <p className="ca-bio__text">{t(cell.generalSummary, cell.generalSummaryEn)}</p>
        {cell.generalFunFact && (
          <p className="ca-bio__fun">
            <span className="ca-bio__fun-label">{t('Dato curioso:', 'Fun fact:')}</span>{' '}
            {t(cell.generalFunFact, cell.generalFunFactEn ?? cell.generalFunFact)}
            <span className="ca-bio__sparkle"> ✦</span>
          </p>
        )}
      </CaCard>
    );
  }

  const organelle = cell.organelles.find((o) => o.id === selectedOrganelleId);
  if (!organelle) return null;

  return (
    <CaCard title={t('Notas biológicas', 'Biological notes')}>
      <p className="ca-bio__text">{t(organelle.notes, organelle.notesEn)}</p>
      <p className="ca-bio__fun">
        <span className="ca-bio__fun-label">{t('Dato curioso:', 'Fun fact:')}</span>{' '}
        {t(organelle.funFact, organelle.funFactEn)}
        <span className="ca-bio__sparkle"> ✦</span>
      </p>
    </CaCard>
  );
}
