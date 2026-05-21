import { useState } from 'react';
import CaCard from '@/presentation/components/atoms/CaCard/CaCard';
import { useLanguage } from '@/presentation/context/LanguageContext';
import { useStudioStore } from '@/presentation/store/useStudioStore';
import { getCellById } from '@/infrastructure/data/cells';
import './MicroscopeSection.css';

export default function MicroscopeSection() {
  const { t } = useLanguage();
  const { selectedCellId } = useStudioStore();
  const cell = getCellById(selectedCellId);
  const [active, setActive] = useState<string | null>(null);
  if (!cell || !cell.microscope.length) return null;

  return (
    <CaCard
      title={
        <>
          {t('Vista al microscopio', 'Microscope view')}
          <span className="ca-micro__info" title={t('Imágenes ilustrativas', 'Illustrative images')}>
            ⓘ
          </span>
        </>
      }
    >
      <div className="ca-micro__grid">
        {cell.microscope.map((m) => (
          <button
            key={m.type}
            type="button"
            className={`ca-micro__thumb ${active === m.type ? 'ca-micro__thumb--active' : ''}`}
            onClick={() => setActive(m.type)}
          >
            <div className="ca-micro__swatch" style={{ background: m.swatch }} />
            <span className="ca-micro__label">{t(m.label, m.labelEn)}</span>
          </button>
        ))}
        <button
          type="button"
          className="ca-micro__add"
          disabled
          title={t('Próximamente', 'Coming soon')}
        >
          <span className="ca-micro__plus">+</span>
          <span className="ca-micro__add-label">{t('Agregar imagen', 'Add Image')}</span>
        </button>
      </div>
    </CaCard>
  );
}
