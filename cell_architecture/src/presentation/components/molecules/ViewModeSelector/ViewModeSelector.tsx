import CaToggle from '@/presentation/components/atoms/CaToggle/CaToggle';
import { useLanguage } from '@/presentation/context/LanguageContext';
import { useStudioStore, type ViewMode } from '@/presentation/store/useStudioStore';
import './ViewModeSelector.css';

const MODES: { id: ViewMode; icon: string; es: string; en: string }[] = [
  { id: 'solid', icon: '◧', es: 'Sólido', en: 'Solid' },
  { id: 'layered', icon: '◑', es: 'Capas', en: 'Layered' },
  { id: 'cross-section', icon: '◎', es: 'Corte', en: 'Cross-section' },
];

export default function ViewModeSelector() {
  const { t } = useLanguage();
  const { viewMode, setViewMode, crossSection, setCrossSection } = useStudioStore();

  return (
    <div className="ca-vmode">
      <div className="ca-vmode__label">{t('Modo de vista', 'View mode')}</div>
      <div className="ca-vmode__row">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`ca-vmode__btn ${viewMode === m.id ? 'ca-vmode__btn--active' : ''}`}
            onClick={() => setViewMode(m.id)}
            title={t(m.es, m.en)}
            aria-label={t(m.es, m.en)}
          >
            <span>{m.icon}</span>
          </button>
        ))}
      </div>
      <div className="ca-vmode__cross">
        <CaToggle
          id="cross-section"
          label={t('Sección transversal', 'Cross-Section')}
          checked={crossSection}
          onChange={setCrossSection}
        />
      </div>
    </div>
  );
}
