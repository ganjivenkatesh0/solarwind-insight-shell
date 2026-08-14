import { createFileRoute } from "@tanstack/react-router";

import { PageContainer, PageHeader } from "@/components/layout/page-container";
import { EmptyState } from "@/components/ui/states";

export const Route = createFileRoute("/new-analysis")({
  head: () => ({
    meta: [
      { title: "New Analysis — Solar & Wind Deployment Intelligence" },
      { name: "description", content: "Enter site details, project parameters and preferences to generate an AI-powered site suitability analysis." },
      { property: "og:title", content: "New Analysis — Solar & Wind Deployment Intelligence" },
      { property: "og:description", content: "Enter site details, project parameters and preferences to generate an AI-powered site suitability analysis." },
    ],
  }),
  component: NewAnalysisPage,
});

function NewAnalysisPage() {
  return (
    <PageContainer>
      <PageHeader title="New Analysis" description="Run a new AI site suitability analysis in four guided steps." />
      <EmptyState
        title="New Analysis coming next"
        description="The global shell and design system are ready. This screen will be built in a following task."
      />
    </PageContainer>
  );
}
