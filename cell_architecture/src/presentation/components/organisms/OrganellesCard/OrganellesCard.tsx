import CaCard from '@/presentation/components/atoms/CaCard/CaCard';
import OrganelleList from '@/presentation/components/molecules/OrganelleList/OrganelleList';
import { useLanguage } from '@/presentation/context/LanguageContext';

export default function OrganellesCard() {
  const { t } = useLanguage();
  return (
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
  );
}
