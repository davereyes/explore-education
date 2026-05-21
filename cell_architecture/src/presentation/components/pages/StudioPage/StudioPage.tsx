import StudioTemplate from '@/presentation/components/templates/StudioTemplate/StudioTemplate';
import CellSidebar from '@/presentation/components/organisms/CellSidebar/CellSidebar';
import CellViewer3D from '@/presentation/components/organisms/CellViewer3D/CellViewer3D';
import MicroscopeSection from '@/presentation/components/organisms/MicroscopeSection/MicroscopeSection';
import OrganelleDetailsPanel from '@/presentation/components/organisms/OrganelleDetailsPanel/OrganelleDetailsPanel';
import BiologicalNotesCard from '@/presentation/components/organisms/BiologicalNotesCard/BiologicalNotesCard';
import OccurrenceCard from '@/presentation/components/organisms/OccurrenceCard/OccurrenceCard';

export default function StudioPage() {
  return (
    <StudioTemplate
      sidebar={<CellSidebar />}
      viewer={<CellViewer3D />}
      details={
        <>
          <MicroscopeSection />
          <OrganelleDetailsPanel />
          <BiologicalNotesCard />
          <OccurrenceCard />
        </>
      }
    />
  );
}
