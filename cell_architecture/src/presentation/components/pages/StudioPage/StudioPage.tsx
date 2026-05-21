import StudioTemplate from '@/presentation/components/templates/StudioTemplate/StudioTemplate';
import CellSidebar from '@/presentation/components/organisms/CellSidebar/CellSidebar';
import CellViewer3D from '@/presentation/components/organisms/CellViewer3D/CellViewer3D';
import OrganellesCard from '@/presentation/components/organisms/OrganellesCard/OrganellesCard';
import OrganelleDetailsPanel from '@/presentation/components/organisms/OrganelleDetailsPanel/OrganelleDetailsPanel';
import BiologicalNotesCard from '@/presentation/components/organisms/BiologicalNotesCard/BiologicalNotesCard';
import OccurrenceCard from '@/presentation/components/organisms/OccurrenceCard/OccurrenceCard';
import MicroscopeSection from '@/presentation/components/organisms/MicroscopeSection/MicroscopeSection';
import CompareCellsCard from '@/presentation/components/organisms/CompareCellsCard/CompareCellsCard';

export default function StudioPage() {
  return (
    <StudioTemplate
      sidebar={<CellSidebar />}
      viewer={<CellViewer3D />}
      details={
        <>
          <OrganellesCard />
          <OrganelleDetailsPanel />
          <BiologicalNotesCard />
          <OccurrenceCard />
        </>
      }
      bottomLeft={null}
      bottomCenter={<MicroscopeSection />}
      bottomRight={<CompareCellsCard />}
    />
  );
}
