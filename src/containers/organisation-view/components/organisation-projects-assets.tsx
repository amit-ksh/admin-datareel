import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

import { ProjectMetrics } from "./projects-assets/project-metrics";
import { AssetMetrics } from "./projects-assets/asset-metrics";
import { DistributionCharts } from "./projects-assets/distribution-charts";
import { ActiveProjectsTable } from "./projects-assets/active-projects-table";

export function OrganisationProjectsAssets() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Projects & Assets Overview</h2>
          <p className="text-sm text-muted-foreground">
            Detailed analytics for your video content platform.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-background shadow-none border">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </Button>
        </div>
      </div>

      <ProjectMetrics />

      <AssetMetrics />

      <DistributionCharts />

      <ActiveProjectsTable />
    </div>
  );
}
