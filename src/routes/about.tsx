import { createFileRoute } from "@tanstack/react-router";

import { PageContainer, PageHeader } from "@/components/layout/page-container";
import { EmptyState } from "@/components/ui/states";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Platform — Solar & Wind Deployment Intelligence" },
      { name: "description", content: "Learn about the platform mission, AI capabilities and the data sources powering the analyses." },
      { property: "og:title", content: "About Platform — Solar & Wind Deployment Intelligence" },
      { property: "og:description", content: "Learn about the platform mission, AI capabilities and the data sources powering the analyses." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageContainer>
      <PageHeader title="About Platform" description="Mission, capabilities and data sources behind the platform." />
      <EmptyState
        title="About Platform coming next"
        description="The global shell and design system are ready. This screen will be built in a following task."
      />
    </PageContainer>
  );
}
