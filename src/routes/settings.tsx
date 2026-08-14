import { createFileRoute } from "@tanstack/react-router";

import { PageContainer, PageHeader } from "@/components/layout/page-container";
import { EmptyState } from "@/components/ui/states";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Solar & Wind Deployment Intelligence" },
      { name: "description", content: "Configure default analysis type, units, currency, notifications and data sources." },
      { property: "og:title", content: "Settings — Solar & Wind Deployment Intelligence" },
      { property: "og:description", content: "Configure default analysis type, units, currency, notifications and data sources." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <PageContainer>
      <PageHeader title="Settings" description="Manage platform, account and data source preferences." />
      <EmptyState
        title="Settings coming next"
        description="The global shell and design system are ready. This screen will be built in a following task."
      />
    </PageContainer>
  );
}
