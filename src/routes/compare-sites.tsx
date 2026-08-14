import { createFileRoute } from "@tanstack/react-router";

import { PageContainer, PageHeader } from "@/components/layout/page-container";
import { EmptyState } from "@/components/ui/states";

export const Route = createFileRoute("/compare-sites")({
  head: () => ({
    meta: [
      { title: "Compare Sites — Solar & Wind Deployment Intelligence" },
      { name: "description", content: "Benchmark multiple renewable energy sites on suitability, generation potential and cost." },
      { property: "og:title", content: "Compare Sites — Solar & Wind Deployment Intelligence" },
      { property: "og:description", content: "Benchmark multiple renewable energy sites on suitability, generation potential and cost." },
    ],
  }),
  component: CompareSitesPage,
});

function CompareSitesPage() {
  return (
    <PageContainer>
      <PageHeader title="Compare Sites" description="Compare candidate sites side by side across key metrics." />
      <EmptyState
        title="Compare Sites coming next"
        description="The global shell and design system are ready. This screen will be built in a following task."
      />
    </PageContainer>
  );
}
