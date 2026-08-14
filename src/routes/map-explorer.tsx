import { createFileRoute } from "@tanstack/react-router";

import { PageContainer, PageHeader } from "@/components/layout/page-container";
import { EmptyState } from "@/components/ui/states";

export const Route = createFileRoute("/map-explorer")({
  head: () => ({
    meta: [
      { title: "Map Explorer — Solar & Wind Deployment Intelligence" },
      { name: "description", content: "Interactive map to explore solar irradiance, wind speed and grid infrastructure worldwide." },
      { property: "og:title", content: "Map Explorer — Solar & Wind Deployment Intelligence" },
      { property: "og:description", content: "Interactive map to explore solar irradiance, wind speed and grid infrastructure worldwide." },
    ],
  }),
  component: MapExplorerPage,
});

function MapExplorerPage() {
  return (
    <PageContainer>
      <PageHeader title="Map Explorer" description="Explore solar and wind resource potential on the map." />
      <EmptyState
        title="Map Explorer coming next"
        description="The global shell and design system are ready. This screen will be built in a following task."
      />
    </PageContainer>
  );
}
