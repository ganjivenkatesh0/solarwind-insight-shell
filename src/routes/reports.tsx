import { createFileRoute } from "@tanstack/react-router";

import { PageContainer, PageHeader } from "@/components/layout/page-container";
import { EmptyState } from "@/components/ui/states";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — Solar & Wind Deployment Intelligence" },
      { name: "description", content: "Create, preview and export professional renewable energy site assessment reports." },
      { property: "og:title", content: "Reports — Solar & Wind Deployment Intelligence" },
      { property: "og:description", content: "Create, preview and export professional renewable energy site assessment reports." },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  return (
    <PageContainer>
      <PageHeader title="Reports" description="Generate and download detailed analysis reports." />
      <EmptyState
        title="Reports coming next"
        description="The global shell and design system are ready. This screen will be built in a following task."
      />
    </PageContainer>
  );
}
