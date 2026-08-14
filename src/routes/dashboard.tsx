import { createFileRoute } from "@tanstack/react-router";

import { PageContainer, PageHeader } from "@/components/layout/page-container";
import { EmptyState } from "@/components/ui/states";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Solar & Wind Deployment Intelligence" },
      { name: "description", content: "Track suitability scores, energy generation and resource assessment for your renewable energy sites." },
      { property: "og:title", content: "Dashboard — Solar & Wind Deployment Intelligence" },
      { property: "og:description", content: "Track suitability scores, energy generation and resource assessment for your renewable energy sites." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader title="Dashboard" description="Overview of your latest renewable energy site analyses." />
      <EmptyState
        title="Dashboard coming next"
        description="The global shell and design system are ready. This screen will be built in a following task."
      />
    </PageContainer>
  );
}
