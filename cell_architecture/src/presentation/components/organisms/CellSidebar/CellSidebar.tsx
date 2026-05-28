import CaDot from '@/presentation/components/atoms/CaDot/CaDot';
import { useLanguage } from '@/presentation/context/LanguageContext';
import { useStudioStore } from '@/presentation/store/useStudioStore';
import { cells } from '@/infrastructure/data/cells';
import './CellSidebar.css';

export default function CellSidebar() {
  const { t } = useLanguage();
  const selectedCellId = useStudioStore((s) => s.selectedCellId);
  const selectedOrganelleId = useStudioStore((s) => s.selectedOrganelleId);
  const selectCell = useStudioStore((s) => s.selectCell);
  const selectOrganelle = useStudioStore((s) => s.selectOrganelle);
  const collapsed = useStudioStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useStudioStore((s) => s.toggleSidebar);
  const sorted = [...cells].sort((a, b) => (b.enabled ? 1 : 0) - (a.enabled ? 1 : 0));

  return (
    <div className={`ca-sidebar ${collapsed ? 'ca-sidebar--collapsed' : ''}`}>
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
        <button
          type="button"
          className="ca-sidebar__collapse"
          onClick={toggleSidebar}
          aria-label={collapsed ? t('Expandir panel', 'Expand panel') : t('Colapsar panel', 'Collapse panel')}
          title={collapsed ? t('Expandir', 'Expand') : t('Colapsar', 'Collapse')}
        >
          {collapsed ? '›' : '‹'}
        </button>
      </header>

      <ul className="ca-cell-list">
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
    </div>
  );
}
