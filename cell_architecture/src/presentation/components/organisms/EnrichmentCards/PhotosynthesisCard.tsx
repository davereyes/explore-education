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
      <div className="ca-photo-eq">
        <span className="ca-photo-eq__item" title={t('Luz solar', 'Sunlight')}>
          <span className="ca-photo-eq__icon">☀️</span>
          <span className="ca-photo-eq__lbl">{t('luz', 'light')}</span>
        </span>
        <span className="ca-photo-eq__op">+</span>
        <span className="ca-photo-eq__item" title={t('Agua', 'Water')}>
          <span className="ca-photo-eq__icon">💧</span>
          <span className="ca-photo-eq__lbl">H₂O</span>
        </span>
        <span className="ca-photo-eq__op">+</span>
        <span className="ca-photo-eq__item" title={t('Dióxido de carbono', 'Carbon dioxide')}>
          <span className="ca-photo-eq__icon">🌫️</span>
          <span className="ca-photo-eq__lbl">CO₂</span>
        </span>
        <span className="ca-photo-eq__op">→</span>
        <span className="ca-photo-eq__item" title={t('Azúcar', 'Sugar')}>
          <span className="ca-photo-eq__icon">🍬</span>
          <span className="ca-photo-eq__lbl">{t('azúcar', 'sugar')}</span>
        </span>
        <span className="ca-photo-eq__op">+</span>
        <span className="ca-photo-eq__item" title={t('Oxígeno', 'Oxygen')}>
          <span className="ca-photo-eq__icon">💨</span>
          <span className="ca-photo-eq__lbl">O₂</span>
        </span>
      </div>
      <p className="ca-photo-eq__note">
        {t(
          'Los cloroplastos atrapan la luz del sol y la usan para fabricar azúcar y liberar oxígeno.',
          'Chloroplasts catch sunlight and use it to make sugar and release oxygen.',
        )}
      </p>
    </CaCard>
  );
}
