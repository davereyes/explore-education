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
          <span className="ca-micro__info" title={t('Imágenes Wikimedia Commons', 'Wikimedia Commons images')}>
            ⓘ
          </span>
        </>
      }
    >
      <div className="ca-micro__grid">
        {cell.microscope.map((m) => {
          const tooltip = m.credit
            ? `${m.credit.author} · ${m.credit.license}`
            : t(m.label, m.labelEn);
          return (
            <button
              key={m.type}
              type="button"
              className={`ca-micro__thumb ${active === m.type ? 'ca-micro__thumb--active' : ''}`}
              onClick={() => setActive(m.type)}
              title={tooltip}
            >
              <div className="ca-micro__swatch" style={m.imageUrl ? undefined : { background: m.swatch }}>
                {m.imageUrl && (
                  <img
                    src={m.imageUrl}
                    alt={t(m.label, m.labelEn)}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                )}
              </div>
              <span className="ca-micro__label">{t(m.label, m.labelEn)}</span>
            </button>
          );
        })}
      </div>
    </CaCard>
  );
}
