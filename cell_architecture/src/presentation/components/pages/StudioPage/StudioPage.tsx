import StudioTemplate from '@/presentation/components/templates/StudioTemplate/StudioTemplate';
import CellSidebar from '@/presentation/components/organisms/CellSidebar/CellSidebar';
import CellViewer3D from '@/presentation/components/organisms/CellViewer3D/CellViewer3D';
import OrganelleDetailsPanel from '@/presentation/components/organisms/OrganelleDetailsPanel/OrganelleDetailsPanel';
import OccurrenceCard from '@/presentation/components/organisms/OccurrenceCard/OccurrenceCard';
import UniqueFeaturesCard from '@/presentation/components/organisms/EnrichmentCards/UniqueFeaturesCard';
import PhotosynthesisCard from '@/presentation/components/organisms/EnrichmentCards/PhotosynthesisCard';
import QuickQuizCard from '@/presentation/components/organisms/EnrichmentCards/QuickQuizCard';
import SpecializedCellsCard from '@/presentation/components/organisms/EnrichmentCards/SpecializedCellsCard';
import TryAtHomeCard from '@/presentation/components/organisms/EnrichmentCards/TryAtHomeCard';
import DiscoveryTimelineCard from '@/presentation/components/organisms/EnrichmentCards/DiscoveryTimelineCard';
import AmazingNumbersCard from '@/presentation/components/organisms/EnrichmentCards/AmazingNumbersCard';
import BackgroundToggleCard from '@/presentation/components/organisms/EnrichmentCards/BackgroundToggleCard';
import { useStudioStore } from '@/presentation/store/useStudioStore';
import { getCellById } from '@/infrastructure/data/cells';

function DetailsColumn() {
  const selectedCellId = useStudioStore((s) => s.selectedCellId);
  const selectedOrganelleId = useStudioStore((s) => s.selectedOrganelleId);
  const cell = getCellById(selectedCellId);
  if (!cell) return null;

  const onGeneral = selectedOrganelleId === null;

  return (
    <>
      <BackgroundToggleCard />
      <OrganelleDetailsPanel />
      {onGeneral && <UniqueFeaturesCard cell={cell} />}
      {onGeneral && <PhotosynthesisCard cell={cell} />}
      <QuickQuizCard />
      {onGeneral && <AmazingNumbersCard cell={cell} />}
      {onGeneral && <SpecializedCellsCard cell={cell} />}
      <TryAtHomeCard cell={cell} />
      {onGeneral && <DiscoveryTimelineCard cell={cell} />}
      <OccurrenceCard />
    </>
  );
}

export default function StudioPage() {
  return (
    <StudioTemplate
      sidebar={<CellSidebar />}
      viewer={<CellViewer3D />}
      details={<DetailsColumn />}
    />
  );
}
