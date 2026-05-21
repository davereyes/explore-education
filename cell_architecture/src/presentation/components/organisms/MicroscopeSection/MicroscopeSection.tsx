import { useState } from 'react';
import CaCard from '@/presentation/components/atoms/CaCard/CaCard';
import MicroscopeModal from '@/presentation/components/molecules/MicroscopeModal/MicroscopeModal';
import { useLanguage } from '@/presentation/context/LanguageContext';
import { useStudioStore } from '@/presentation/store/useStudioStore';
import { getCellById } from '@/infrastructure/data/cells';
import type { MicroscopeImage } from '@/domain/entities';
import './MicroscopeSection.css';

export default function MicroscopeSection() {
  const { t } = useLanguage();
  const { selectedCellId } = useStudioStore();
  const cell = getCellById(selectedCellId);
  const [zoomed, setZoomed] = useState<MicroscopeImage | null>(null);
  if (!cell || !cell.microscope.length) return null;

  return (
    <>
      <CaCard
        title={
          <>
            {t('Vista al microscopio', 'Microscope view')}
            <span
              className="ca-micro__info"
              title={t('Click para ampliar', 'Click to enlarge')}
            >
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
                className="ca-micro__thumb"
                onClick={() => m.imageUrl && setZoomed(m)}
                title={tooltip}
                disabled={!m.imageUrl}
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
                  {m.imageUrl && <span className="ca-micro__zoom-icon" aria-hidden>⤢</span>}
                </div>
                <span className="ca-micro__label">{t(m.label, m.labelEn)}</span>
              </button>
            );
          })}
        </div>
      </CaCard>
      <MicroscopeModal image={zoomed} onClose={() => setZoomed(null)} />
    </>
  );
}
