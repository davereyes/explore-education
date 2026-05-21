import CaDot from '@/presentation/components/atoms/CaDot/CaDot';
import { useLanguage } from '@/presentation/context/LanguageContext';
import { useStudioStore } from '@/presentation/store/useStudioStore';
import { getCellById } from '@/infrastructure/data/cells';
import './OrganelleList.css';

export default function OrganelleList() {
  const { t } = useLanguage();
  const { selectedCellId, selectedOrganelleId, selectOrganelle, hoverOrganelle } = useStudioStore();
  const cell = getCellById(selectedCellId);
  if (!cell) return null;

  return (
    <ul className="ca-organelle-list">
      {cell.organelles.map((o) => {
        const active = o.id === selectedOrganelleId;
        return (
          <li key={o.id}>
            <button
              type="button"
              className={`ca-organelle-list__row ${active ? 'ca-organelle-list__row--active' : ''}`}
              onClick={() => selectOrganelle(o.id)}
              onMouseEnter={() => hoverOrganelle(o.id)}
              onMouseLeave={() => hoverOrganelle(null)}
            >
              <CaDot colorVar={o.colorVar} />
              <span className="ca-organelle-list__name">{t(o.name, o.nameEn)}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
