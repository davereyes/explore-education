import CaCard from '@/presentation/components/atoms/CaCard/CaCard';
import { useLanguage } from '@/presentation/context/LanguageContext';
import { useStudioStore } from '@/presentation/store/useStudioStore';
import { cells } from '@/infrastructure/data/cells';
import OrganelleList from '@/presentation/components/molecules/OrganelleList/OrganelleList';
import './CellSidebar.css';

export default function CellSidebar() {
  const { t } = useLanguage();
  const { selectedCellId, selectCell } = useStudioStore();
  const sorted = [...cells].sort((a, b) => (b.enabled ? 1 : 0) - (a.enabled ? 1 : 0));

  return (
    <>
      <CaCard
        title={
          <>
            <span style={{ color: 'var(--ca-mint)' }}>🌱</span>
            {t('Tipos de célula', 'Cell types')}
          </>
        }
        accessory={<span style={{ fontSize: 12 }}>▾</span>}
      >
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
                  title={!cell.enabled ? t('Próximamente', 'Coming soon') : undefined}
                >
                  <span className="ca-cell-list__thumb">{cell.thumbnailEmoji}</span>
                  <span className="ca-cell-list__text">
                    <span className="ca-cell-list__name">{t(cell.name, cell.nameEn)}</span>
                    <span className="ca-cell-list__sub">{t(cell.subtitle, cell.subtitleEn)}</span>
                  </span>
                  {active && <span className="ca-cell-list__star">★</span>}
                  {!cell.enabled && <span className="ca-cell-list__lock">🔒</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </CaCard>

      <CaCard
        title={
          <>
            <span style={{ color: 'var(--ca-accent)' }}>✦</span>
            {t('Organelos', 'Organelles')}
          </>
        }
        accessory={<span style={{ fontSize: 12 }}>▾</span>}
      >
        <OrganelleList />
      </CaCard>
    </>
  );
}
