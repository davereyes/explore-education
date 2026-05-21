import { useEffect, useState } from 'react';
import CaCard from '@/presentation/components/atoms/CaCard/CaCard';
import { useLanguage } from '@/presentation/context/LanguageContext';
import { useStudioStore } from '@/presentation/store/useStudioStore';
import { getCellById } from '@/infrastructure/data/cells';
import type { QuizQuestion } from '@/domain/entities';
import './EnrichmentCards.css';

export default function QuickQuizCard() {
  const { t } = useLanguage();
  const { selectedCellId, selectedOrganelleId } = useStudioStore();
  const cell = getCellById(selectedCellId);
  const organelle = cell?.organelles.find((o) => o.id === selectedOrganelleId);
  const quiz: QuizQuestion | undefined =
    selectedOrganelleId === null ? cell?.cellQuiz : organelle?.quiz;

  const [picked, setPicked] = useState<number | null>(null);
  // Reset answer whenever the question changes
  useEffect(() => {
    setPicked(null);
  }, [selectedCellId, selectedOrganelleId]);

  if (!quiz) return null;
  const isCorrect = picked === quiz.correctIndex;

  return (
    <CaCard
      title={
        <>
          <span style={{ color: 'var(--ca-coral)' }}>?</span>
          {t('Pon a prueba', 'Test yourself')}
        </>
      }
    >
      <p className="ca-quiz__prompt">{t(quiz.prompt, quiz.promptEn)}</p>
      <div className="ca-quiz__options">
        {quiz.options.map((o, i) => {
          const state =
            picked === null
              ? ''
              : i === quiz.correctIndex
                ? ' ca-quiz__opt--correct'
                : i === picked
                  ? ' ca-quiz__opt--wrong'
                  : '';
          return (
            <button
              key={i}
              type="button"
              className={`ca-quiz__opt${state}`}
              onClick={() => picked === null && setPicked(i)}
              disabled={picked !== null}
            >
              <span className="ca-quiz__opt-letter">{String.fromCharCode(65 + i)}</span>
              {t(o.es, o.en)}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className={`ca-quiz__feedback ${isCorrect ? 'ca-quiz__feedback--ok' : 'ca-quiz__feedback--bad'}`}>
          <strong>{isCorrect ? t('¡Correcto! ✨', 'Correct! ✨') : t('Casi 😊', 'Almost 😊')}</strong>
          {quiz.explanation && <p>{t(quiz.explanation, quiz.explanationEn ?? quiz.explanation)}</p>}
          <button type="button" className="ca-quiz__retry" onClick={() => setPicked(null)}>
            {t('Probar de nuevo', 'Try again')}
          </button>
        </div>
      )}
    </CaCard>
  );
}
