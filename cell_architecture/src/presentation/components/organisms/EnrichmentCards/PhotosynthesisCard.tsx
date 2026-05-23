import CaCard from '@/presentation/components/atoms/CaCard/CaCard';
import { useLanguage } from '@/presentation/context/LanguageContext';
import type { Cell } from '@/domain/entities';
import './EnrichmentCards.css';

export default function PhotosynthesisCard({ cell }: { cell: Cell }) {
  const { t } = useLanguage();
  if (cell.id !== 'plant') return null;
  return (
    <CaCard
      title={
        <>
          <span style={{ color: '#3d9239' }}>☀️</span>
          {t('Fotosíntesis', 'Photosynthesis')}
        </>
      }
    >
      <p className="ca-photo-eq__lead">
        {t(
          'Es cómo las plantas se hacen su propia comida: la clorofila atrapa la luz y la usa para convertir agua y aire en azúcar.',
          'How plants make their own food: chlorophyll catches light and uses it to turn water and air into sugar.',
        )}
      </p>

      <div className="ca-photo-eq">
        <span className="ca-photo-eq__item" title={t('Luz solar', 'Sunlight')}>
          <span className="ca-photo-eq__icon">☀️</span>
          <span className="ca-photo-eq__lbl">{t('luz', 'light')}</span>
        </span>
        <span className="ca-photo-eq__op">+</span>
        <span className="ca-photo-eq__item" title={t('Agua (de la raíz)', 'Water (from the root)')}>
          <span className="ca-photo-eq__icon">💧</span>
          <span className="ca-photo-eq__lbl">H₂O</span>
        </span>
        <span className="ca-photo-eq__op">+</span>
        <span className="ca-photo-eq__item" title={t('Dióxido de carbono (del aire)', 'Carbon dioxide (from the air)')}>
          <span className="ca-photo-eq__icon">🌫️</span>
          <span className="ca-photo-eq__lbl">CO₂</span>
        </span>
        <span className="ca-photo-eq__op">→</span>
        <span className="ca-photo-eq__item" title={t('Azúcar (glucosa)', 'Sugar (glucose)')}>
          <span className="ca-photo-eq__icon">🍬</span>
          <span className="ca-photo-eq__lbl">C₆H₁₂O₆</span>
        </span>
        <span className="ca-photo-eq__op">+</span>
        <span className="ca-photo-eq__item" title={t('Oxígeno (lo respiramos)', 'Oxygen (we breathe it)')}>
          <span className="ca-photo-eq__icon">💨</span>
          <span className="ca-photo-eq__lbl">O₂</span>
        </span>
      </div>

      <ul className="ca-photo-steps">
        <li>
          <span className="ca-photo-steps__num">1</span>
          <span>
            {t(
              'La raíz absorbe agua; los estomas de la hoja dejan entrar CO₂.',
              'The root takes in water; the leaf\'s stomata let CO₂ in.',
            )}
          </span>
        </li>
        <li>
          <span className="ca-photo-steps__num">2</span>
          <span>
            {t(
              'En los cloroplastos, la clorofila atrapa la luz y rompe el agua — libera O₂.',
              'In the chloroplasts, chlorophyll catches the light and splits the water — releasing O₂.',
            )}
          </span>
        </li>
        <li>
          <span className="ca-photo-steps__num">3</span>
          <span>
            {t(
              'Esa energía combina CO₂ + hidrógeno para fabricar glucosa, el alimento de la planta.',
              'That energy combines CO₂ + hydrogen into glucose — the plant\'s food.',
            )}
          </span>
        </li>
      </ul>

      <p className="ca-photo-eq__why">
        {t(
          'Casi todo el oxígeno que respiramos viene de aquí.',
          'Almost all the oxygen we breathe comes from this.',
        )}
      </p>
    </CaCard>
  );
}
