import CaDot from '@/presentation/components/atoms/CaDot/CaDot';
import { useLanguage } from '@/presentation/context/LanguageContext';
import { useStudioStore } from '@/presentation/store/useStudioStore';
import { cells } from '@/infrastructure/data/cells';
import './CellSidebar.css';

function handleBackToPlatform() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    // Hook for parent platform integration later: window.parent.postMessage(...)
    // eslint-disable-next-line no-console
    console.log('[cell] back-to-platform requested');
  }
}

export default function CellSidebar() {
  const { t } = useLanguage();
  const selectedCellId = useStudioStore((s) => s.selectedCellId);
  const selectedOrganelleId = useStudioStore((s) => s.selectedOrganelleId);
  const selectCell = useStudioStore((s) => s.selectCell);
  const selectOrganelle = useStudioStore((s) => s.selectOrganelle);
  const collapsed = useStudioStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useStudioStore((s) => s.toggleSidebar);
  const { language, toggle: toggleLanguage } = useLanguage();
  const sorted = [...cells].sort((a, b) => (b.enabled ? 1 : 0) - (a.enabled ? 1 : 0));

  return (
    <div className={`ca-sb ${collapsed ? 'ca-sb--collapsed' : ''}`}>
      {/* Nav card: back to platform + collapse toggle */}
      <div className="ca-sb__nav-card">
        <button
          type="button"
          className="ca-sb__back"
          onClick={handleBackToPlatform}
          aria-label={t('Regresar a la plataforma', 'Back to platform')}
          title={t('Regresar', 'Back')}
        >
          <span className="ca-sb__back-arrow" aria-hidden>←</span>
          {!collapsed && <span className="ca-sb__back-label">{t('Regresar', 'Back')}</span>}
        </button>
        <button
          type="button"
          className="ca-sb__collapse"
          onClick={toggleSidebar}
          aria-label={collapsed ? t('Mostrar paneles', 'Show panels') : t('Ocultar paneles', 'Hide panels')}
          aria-expanded={!collapsed}
          title={collapsed ? t('Mostrar', 'Show') : t('Ocultar', 'Hide')}
        >
          <SidebarGlyph />
          {!collapsed && <span className="ca-sb__collapse-label">{t('Ocultar', 'Hide')}</span>}
        </button>
      </div>

      {/* Main sidebar card: logo + cell list + lang footer */}
      <div className="ca-sidebar">
        <header className="ca-sidebar__head">
          <div className="ca-sidebar__brand">
            <div className="ca-sidebar__logo" aria-hidden="true">
              <span>🧫</span>
            </div>
            {!collapsed && (
              <div className="ca-sidebar__title-stack">
                <strong className="ca-sidebar__title">Cell Architecture</strong>
                <span className="ca-sidebar__subtitle">Studio</span>
              </div>
            )}
          </div>
        </header>

        <ul className="ca-cell-list ca-cell-list--scroll">
          {sorted.map((cell) => {
            const active = cell.id === selectedCellId;
            return (
              <li key={cell.id}>
                <button
                  type="button"
                  className={`ca-cell-list__item ${active ? 'ca-cell-list__item--active' : ''} ${
                    !cell.enabled ? 'ca-cell-list__item--disabled' : ''
                  }`}
                  disabled={!cell.enabled}
                  onClick={() => cell.enabled && selectCell(cell.id)}
                  title={collapsed ? t(cell.name, cell.nameEn) : !cell.enabled ? t('Próximamente', 'Coming soon') : undefined}
                >
                  <span className="ca-cell-list__thumb">{cell.thumbnailEmoji}</span>
                  {!collapsed && (
                    <span className="ca-cell-list__text">
                      <span className="ca-cell-list__name">{t(cell.name, cell.nameEn)}</span>
                      <span className="ca-cell-list__sub">{t(cell.subtitle, cell.subtitleEn)}</span>
                    </span>
                  )}
                  {!collapsed && !cell.enabled && <span className="ca-cell-list__lock">🔒</span>}
                </button>

                {!collapsed && active && cell.enabled && (
                  <ul className="ca-cell-list__children">
                    <li>
                      <button
                        type="button"
                        className={`ca-cell-list__child ${
                          selectedOrganelleId === null ? 'ca-cell-list__child--active' : ''
                        }`}
                        onClick={() => selectOrganelle(null)}
                      >
                        <span className="ca-cell-list__child-bullet" aria-hidden>
                          ✦
                        </span>
                        <span className="ca-cell-list__child-label">
                          {t('General', 'General')}
                        </span>
                      </button>
                    </li>
                    {cell.organelles.map((o) => (
                      <li key={o.id}>
                        <button
                          type="button"
                          className={`ca-cell-list__child ${
                            selectedOrganelleId === o.id ? 'ca-cell-list__child--active' : ''
                          }`}
                          onClick={() => selectOrganelle(o.id)}
                        >
                          <CaDot colorVar={o.colorVar} size={8} />
                          <span className="ca-cell-list__child-label">
                            {t(o.name, o.nameEn)}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        <footer className="ca-sidebar__foot">
          <button
            type="button"
            className="ca-sidebar__lang"
            onClick={toggleLanguage}
            title={t('Cambiar idioma', 'Switch language')}
          >
            {language.toUpperCase()}
          </button>
        </footer>
      </div>
    </div>
  );
}

function SidebarGlyph() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="1.5" y="2.5" width="13" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <line x1="6" y1="3" x2="6" y2="13" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
