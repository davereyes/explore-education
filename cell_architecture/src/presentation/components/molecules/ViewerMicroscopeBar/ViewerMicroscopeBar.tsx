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
  tooltip: string;
  tooltipEn: string;
}

// Per-view-type descriptions kid-friendly.
const TYPE_DESCRIPTIONS: Record<ViewerSource, { es: string; en: string }> = {
  '3d': {
    es: 'Vista 3D — modelo tridimensional, lo puedes rotar arrastrando con el mouse',
    en: '3D view — rotate the model by dragging with the mouse',
  },
  light: {
    es: 'Microscopio óptico — usa luz visible, muestra las células casi como las verías en vivo (100–400×)',
    en: 'Light microscope — uses visible light to show cells almost as they look alive (100–400×)',
  },
  stained: {
    es: 'Tinción — la muestra se tiñe con colorantes para que cada parte de la célula resalte',
    en: 'Stained — the sample is dyed so each part of the cell stands out',
  },
  electron: {
    es: 'Microscopio electrónico — usa electrones en vez de luz, ve detalles diminutos (hasta 10,000,000×) pero solo en escala de grises',
    en: 'Electron microscope — uses electrons instead of light to see tiny details (up to 10,000,000×) but only in grayscale',
  },
};

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
      tooltip: TYPE_DESCRIPTIONS['3d'].es,
      tooltipEn: TYPE_DESCRIPTIONS['3d'].en,
    },
    ...cell.microscope.map<Option>((m) => ({
      source: m.type,
      label: m.label,
      labelEn: m.labelEn,
      imageUrl: m.imageUrl,
      swatch: m.swatch,
      tooltip: TYPE_DESCRIPTIONS[m.type].es,
      tooltipEn: TYPE_DESCRIPTIONS[m.type].en,
    })),
  ];

  return (
    <div className="ca-vbar">
      <span className="ca-vbar__title">{t('Tipo de vista', 'View type')}</span>
      <div className="ca-vbar__thumbs">
        {options.map((o) => {
          const active = viewerSource === o.source;
          return (
            <button
              key={o.source}
              type="button"
              className={`ca-vbar__thumb ${active ? 'ca-vbar__thumb--active' : ''}`}
              onClick={() => setViewerSource(o.source)}
              title={t(o.tooltip, o.tooltipEn)}
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
    </div>
  );
}
