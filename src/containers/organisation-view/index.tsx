"use client";

import { OrganisationViewHeader } from "./components/organisation-view-header";
import { OrganisationAnalytics } from "./components/organisation-analytics";
import { OrganisationOverview } from "./components/organisation-overview";
import { OrganisationTenants } from "./components/organisation-tenants";
import { OrganisationFeedback } from "./components/organisation-feedback";
import { OrganisationProjectsAssets } from "./components/organisation-projects-assets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function OrganisationViewContainer() {
  return (
    <div className="flex flex-col min-h-screen">
      <OrganisationViewHeader />

      <Tabs defaultValue="overview" className="flex-1 w-full space-y-0 relative">
        <div className="sticky top-18 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm rounded-lg">
          <TabsList className="w-full justify-start h-12 p-1 bg-muted/50 rounded-lg">
            <TabsTrigger value="overview" className="h-full rounded-md px-6 text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="tenants" className="h-full rounded-md px-6 text-sm">
              Tenants
            </TabsTrigger>
            <TabsTrigger value="analytics" className="h-full rounded-md px-6 text-sm">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="feedback" className="h-full rounded-md px-6 text-sm">
              Feedback
            </TabsTrigger>
            <TabsTrigger value="projects-assets" className="h-full pnpmrounded-md px-6 text-sm">
              Project & Assets
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="p-2 focus-visible:outline-none focus-visible:ring-0 ring-0 pb-16">
          <OrganisationOverview />
        </TabsContent>

        <TabsContent value="tenants" className="p-2 focus-visible:outline-none focus-visible:ring-0 ring-0 pb-16">
          <OrganisationTenants />
        </TabsContent>

        <TabsContent value="analytics" className="p-2 focus-visible:outline-none focus-visible:ring-0 ring-0 pb-16">
          <OrganisationAnalytics />
        </TabsContent>

        <TabsContent value="feedback" className="p-2 focus-visible:outline-none focus-visible:ring-0 ring-0 pb-16">
          <OrganisationFeedback />
        </TabsContent>

        <TabsContent value="projects-assets" className="p-2 focus-visible:outline-none focus-visible:ring-0 ring-0 pb-16">
          <OrganisationProjectsAssets />
        </TabsContent>
      </Tabs>
    </div>
  );
}
