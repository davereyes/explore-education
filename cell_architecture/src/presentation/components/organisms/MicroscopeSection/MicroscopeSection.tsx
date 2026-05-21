import CaCard from '@/presentation/components/atoms/CaCard/CaCard';
import { useLanguage } from '@/presentation/context/LanguageContext';
import { useStudioStore, type ViewerSource } from '@/presentation/store/useStudioStore';
import { getCellById } from '@/infrastructure/data/cells';
import './MicroscopeSection.css';

interface Option {
  source: ViewerSource;
  label: string;
  labelEn: string;
  imageUrl?: string;
  swatch?: string;
}

export default function MicroscopeSection() {
  const { t } = useLanguage();
  const selectedCellId = useStudioStore((s) => s.selectedCellId);
  const viewerSource = useStudioStore((s) => s.viewerSource);
  const setViewerSource = useStudioStore((s) => s.setViewerSource);
  const cell = getCellById(selectedCellId);
  if (!cell) return null;

  const options: Option[] = [
    {
      source: '3d',
      label: 'Vista 3D',
      labelEn: '3D model',
      swatch: 'linear-gradient(135deg, #b8a4ff 0%, #84d2c5 60%, #ffd6a5 100%)',
    },
    ...cell.microscope.map<Option>((m) => ({
      source: m.type,
      label: m.label,
      labelEn: m.labelEn,
      imageUrl: m.imageUrl,
      swatch: m.swatch,
    })),
  ];

  return (
    <CaCard
      title={
        <>
          {t('Vista al microscopio', 'Microscope view')}
          <span
            className="ca-micro__info"
            title={t('Toca para mostrar en el centro', 'Tap to show in the centre')}
          >
            ⓘ
          </span>
        </>
      }
    >
      <div className="ca-micro__grid">
        {options.map((o) => {
          const active = viewerSource === o.source;
          return (
            <button
              key={o.source}
              type="button"
              className={`ca-micro__thumb ${active ? 'ca-micro__thumb--active' : ''}`}
              onClick={() => setViewerSource(o.source)}
              title={t(o.label, o.labelEn)}
            >
              <div
                className="ca-micro__swatch"
                style={
                  o.imageUrl
                    ? undefined
                    : { background: o.swatch }
                }
              >
                {o.imageUrl && (
                  <img
                    src={o.imageUrl}
                    alt={t(o.label, o.labelEn)}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                )}
                {o.source === '3d' && (
                  <span className="ca-micro__3d-glyph" aria-hidden>
                    ◉
                  </span>
                )}
              </div>
              <span className="ca-micro__label">{t(o.label, o.labelEn)}</span>
            </button>
          );
        })}
      </div>
    </CaCard>
  );
}
