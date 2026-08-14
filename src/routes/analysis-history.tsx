import { createFileRoute } from "@tanstack/react-router";

import { PageContainer, PageHeader } from "@/components/layout/page-container";
import { EmptyState } from "@/components/ui/states";

export const Route = createFileRoute("/analysis-history")({
  head: () => ({
    meta: [
      { title: "Analysis History — Solar & Wind Deployment Intelligence" },
      { name: "description", content: "Review past site analyses with suitability scores, recommended technology and status." },
      { property: "og:title", content: "Analysis History — Solar & Wind Deployment Intelligence" },
      { property: "og:description", content: "Review past site analyses with suitability scores, recommended technology and status." },
    ],
  }),
  component: AnalysisHistoryPage,
});

function AnalysisHistoryPage() {
  return (
    <PageContainer>
      <PageHeader title="Analysis History" description="Browse, filter and revisit every analysis you have run." />
      <EmptyState
        title="Analysis History coming next"
        description="The global shell and design system are ready. This screen will be built in a following task."
      />
    </PageContainer>
  );
}
