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
          'La fotosíntesis es cómo las plantas se hacen su propia comida. Atrapan luz solar con la clorofila (lo verde de los cloroplastos) y la usan para combinar agua y aire en azúcar — soltando oxígeno al hacerlo.',
          'Photosynthesis is how plants make their own food. They catch sunlight with chlorophyll (the green inside chloroplasts) and use it to combine water and air into sugar — releasing oxygen in the process.',
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
              'La raíz absorbe agua del suelo y la sube por el xilema hasta las hojas.',
              'The root absorbs water from the soil and pushes it up through the xylem to the leaves.',
            )}
          </span>
        </li>
        <li>
          <span className="ca-photo-steps__num">2</span>
          <span>
            {t(
              'Los estomas (poros) de la hoja se abren y dejan entrar CO₂ del aire.',
              'The stomata (pores) on the leaf open and let CO₂ in from the air.',
            )}
          </span>
        </li>
        <li>
          <span className="ca-photo-steps__num">3</span>
          <span>
            {t(
              'Dentro de los cloroplastos, la clorofila atrapa la luz y rompe el agua: libera oxígeno y guarda la energía.',
              'Inside the chloroplasts, chlorophyll catches the light and splits the water: it releases oxygen and stores the energy.',
            )}
          </span>
        </li>
        <li>
          <span className="ca-photo-steps__num">4</span>
          <span>
            {t(
              'Esa energía combina el CO₂ con hidrógeno para fabricar glucosa — el azúcar que la planta usa para vivir y crecer.',
              'That energy combines CO₂ with hydrogen to build glucose — the sugar the plant uses to live and grow.',
            )}
          </span>
        </li>
      </ul>

      <p className="ca-photo-eq__why">
        {t(
          'Por qué importa: casi todo el oxígeno que respiramos viene de la fotosíntesis. Sin plantas, no hay aire para nosotros.',
          'Why it matters: almost all the oxygen we breathe comes from photosynthesis. No plants → no air for us.',
        )}
      </p>
    </CaCard>
  );
}
