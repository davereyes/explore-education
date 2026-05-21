import { useLanguage } from '@/presentation/context/LanguageContext';
import { useStudioStore, type ViewerSource } from '@/presentation/store/useStudioStore';
import { getCellById } from '@/infrastructure/data/cells';
import './ViewerMicroscopeBar.css';

interface Option {
  source: ViewerSource;
  label: string;
  labelEn: string;
  imageUrl?: string;
  swatch?: string;
}

export default function ViewerMicroscopeBar() {
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
    <div className="ca-vbar">
      {options.map((o) => {
        const active = viewerSource === o.source;
        return (
          <button
            key={o.source}
            type="button"
            className={`ca-vbar__thumb ${active ? 'ca-vbar__thumb--active' : ''}`}
            onClick={() => setViewerSource(o.source)}
            title={t(o.label, o.labelEn)}
            aria-label={t(o.label, o.labelEn)}
          >
            <div
              className="ca-vbar__swatch"
              style={o.imageUrl ? undefined : { background: o.swatch }}
            >
              {o.imageUrl && (
                <img src={o.imageUrl} alt="" referrerPolicy="no-referrer" loading="lazy" />
              )}
              {o.source === '3d' && <span className="ca-vbar__3d-glyph" aria-hidden>◉</span>}
            </div>
          </button>
        );
      })}
    </div>
  );
}
