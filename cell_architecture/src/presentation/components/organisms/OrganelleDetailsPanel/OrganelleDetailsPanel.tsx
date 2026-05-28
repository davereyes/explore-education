import CaCard from '@/presentation/components/atoms/CaCard/CaCard';
import CaToggle from '@/presentation/components/atoms/CaToggle/CaToggle';
import { useLanguage } from '@/presentation/context/LanguageContext';
import { useStudioStore } from '@/presentation/store/useStudioStore';
import { getCellById } from '@/infrastructure/data/cells';
import './OrganelleDetailsPanel.css';

const VIS_MAP: Record<'yes' | 'barely' | 'no', { es: string; en: string }> = {
  yes: { es: 'Sí', en: 'Yes' },
  barely: { es: 'Apenas', en: 'Barely' },
  no: { es: 'No', en: 'No' },
};

export default function OrganelleDetailsPanel() {
  const { t } = useLanguage();
  const { selectedCellId, selectedOrganelleId, showLabels, toggleLabels } = useStudioStore();
  const cell = getCellById(selectedCellId);
  if (!cell) return null;

  // Cell-level "General" view
  if (selectedOrganelleId === null) {
    return (
      <CaCard
        title={t('Detalles de la célula', 'Cell details')}
        accessory={<span className="ca-details__heart">♥</span>}
      >
        <div className="ca-details__head">
          <div className="ca-details__avatar ca-details__avatar--cell">
            <span>{cell.thumbnailEmoji}</span>
          </div>
          <div>
            <h3 className="ca-details__name">{t(cell.name, cell.nameEn)}</h3>
            <p className="ca-details__tag">{t(cell.subtitle, cell.subtitleEn)}</p>
          </div>
        </div>
        <dl className="ca-details__list">
          <div className="ca-details__row">
            <dt>{t('Clasificación', 'Classification')}</dt>
            <dd>
              {cell.classification === 'eukaryotic'
                ? t('Eucariota', 'Eukaryotic')
                : t('Procariota', 'Prokaryotic')}
            </dd>
          </div>
          <div className="ca-details__row">
            <dt>{t('Organelos', 'Organelles')}</dt>
            <dd>{cell.organelles.length}</dd>
          </div>
        </dl>
      </CaCard>
    );
  }

  const organelle = cell.organelles.find((o) => o.id === selectedOrganelleId);
  if (!organelle) return null;

  return (
    <CaCard
      title={t('Detalles del organelo', 'Organelle details')}
      accessory={<span className="ca-details__heart">♥</span>}
    >
      <div className="ca-details__head">
        <div className="ca-details__avatar" style={{ background: `var(${organelle.colorVar})` }}>
          <span>●</span>
        </div>
        <div>
          <h3 className="ca-details__name">{t(organelle.name, organelle.nameEn)}</h3>
          <p className="ca-details__tag">{t(organelle.tagline, organelle.taglineEn)}</p>
        </div>
      </div>

      <dl className="ca-details__list">
        <div className="ca-details__row">
          <dt>{t('Tamaño', 'Size')}</dt>
          <dd>{t(organelle.size, organelle.sizeEn)}</dd>
        </div>
        <div className="ca-details__row">
          <dt>{t('Ubicación', 'Location')}</dt>
          <dd>{t(organelle.location, organelle.locationEn)}</dd>
        </div>
        <div className="ca-details__row">
          <dt>{t('Visible al microscopio óptico', 'Visible in LM')}</dt>
          <dd>
            {t(
              VIS_MAP[organelle.visibleInLightMicroscope].es,
              VIS_MAP[organelle.visibleInLightMicroscope].en,
            )}
          </dd>
        </div>
        <div className="ca-details__row ca-details__row--toggle">
          <dt>{t('Etiqueta', 'Label')}</dt>
          <dd>
            <CaToggle checked={showLabels} onChange={toggleLabels} />
            <span
              className="ca-details__color-chip"
              style={{ background: `var(${organelle.colorVar})` }}
            />
          </dd>
        </div>
      </dl>
    </CaCard>
  );
}
