import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { PageContainer, PageHeader } from "@/components/layout/page-container";
import { AIInsights } from "@/components/dashboard/ai-insights";
import { DashboardTabs, type DashboardTabId } from "@/components/dashboard/dashboard-tabs";
import { DeploymentRecommendation } from "@/components/dashboard/deployment-recommendation";
import { EnergyAnalysis } from "@/components/dashboard/energy-analysis";
import { FeasibilityBreakdown } from "@/components/dashboard/feasibility-breakdown";
import { FinancialAnalysis } from "@/components/dashboard/financial-analysis";
import {
  EnergyGenerationCard,
  FeasibilityCard,
  SuitabilityCard,
  TechnologyCard,
} from "@/components/dashboard/highlight-cards";
import { ResourceAssessment } from "@/components/dashboard/resource-assessment";
import { ResourcesTab } from "@/components/dashboard/resources/resources-tab";
import { SiteLocationCard } from "@/components/dashboard/site-location-card";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { EmptyState } from "@/components/ui/states";
import { dashboardData } from "@/lib/dashboard-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Solar & Wind Deployment Intelligence" },
      {
        name: "description",
        content:
          "Site analysis results: suitability score, recommended technology, energy generation, feasibility and financial outlook.",
      },
      { property: "og:title", content: "Dashboard — Solar & Wind Deployment Intelligence" },
      {
        property: "og:description",
        content:
          "Site analysis results: suitability score, recommended technology, energy generation, feasibility and financial outlook.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const [tab, setTab] = useState<DashboardTabId>("overview");
  const data = dashboardData;

  const notReady = (section: string) => () =>
    toast.info(`${section} details are coming in a later release.`);

  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="Overview of your latest renewable energy site analyses."
      />

      <div className="space-y-4">
        <SummaryCards
          site={data.site}
          onDownload={() => toast.success("Report export will be available once the analysis API is connected.")}
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SuitabilityCard data={data.suitability} />
          <TechnologyCard data={data.technology} />
          <FeasibilityCard data={data.feasibility} />
          <EnergyGenerationCard data={data.energy} />
        </div>

        <DashboardTabs value={tab} onChange={setTab}>
          {tab === "overview" ? (
            <div className="space-y-4">
              <div className="grid gap-4 xl:grid-cols-[1.35fr_1.1fr_1.1fr]">
                <ResourceAssessment data={data.resources} onViewDetails={() => setTab("resources")} />
                <FeasibilityBreakdown
                  data={data.feasibility}
                  onViewDetails={() => setTab("feasibility")}
                />
                <SiteLocationCard site={data.site} />
              </div>

              <div className="grid gap-4 xl:grid-cols-[1fr_1.05fr_1.05fr]">
                <EnergyAnalysis data={data.energy} />
                <FinancialAnalysis data={data.financial} />
                <AIInsights data={data.ai} onViewDetails={notReady("AI model")} />
              </div>

              <DeploymentRecommendation data={data.recommendation} />
            </div>
          ) : (
            <EmptyState
              title="Section coming next"
              description="This tab will show the detailed breakdown for the selected analysis area."
            />
          )}
        </DashboardTabs>
      </div>
    </PageContainer>
  );
}
