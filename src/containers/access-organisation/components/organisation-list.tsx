"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Filter, LogIn, Users } from "lucide-react";

interface Organisation {
  id: string;
  name: string;
  activeTenants: number;
}

interface OrganisationListProps {
  organisations: Organisation[];
  onLogin: (org: Organisation) => void;
}

function OrganisationCard({
  org,
  onLogin,
}: {
  org: Organisation;
  onLogin: (org: Organisation) => void;
}) {
  return (
    <Card className="border shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="h-12 w-12 rounded-lg bg-muted/60 flex items-center justify-center flex-shrink-0 border">
            <Building2 className="h-6 w-6 text-muted-foreground" />
          </div>

          {/* Org Info */}
          <div>
            <p className="text-sm font-bold text-foreground">{org.name}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Users className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {org.activeTenants} Active Tenants
              </span>
            </div>
          </div>
        </div>

        {/* Login Button */}
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-4 text-sm font-medium text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-300 transition-colors"
          onClick={() => onLogin(org)}
        >
          Login
          <LogIn className="ml-2 h-3.5 w-3.5" />
        </Button>
      </CardContent>
    </Card>
  );
}

export function OrganisationList({
  organisations,
  onLogin,
}: OrganisationListProps) {
  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Organisations
          </h2>
          <span className="inline-flex items-center justify-center h-6 min-w-6 px-1.5 rounded-full bg-muted text-muted-foreground text-xs font-semibold">
            {organisations.length}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-4 text-sm font-medium bg-background hover:bg-muted/50"
        >
          <Filter className="mr-2 h-3.5 w-3.5" />
          Filter
        </Button>
      </div>

      {/* Organisation Cards */}
      <div className="flex flex-col gap-3">
        {organisations.map((org) => (
          <OrganisationCard key={org.id} org={org} onLogin={onLogin} />
        ))}
      </div>
    </div>
  );
}
