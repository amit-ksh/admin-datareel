import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Building2 } from "lucide-react";
import { CloneOrganisationDialog } from "./clone-organisation-dialog";

export function OrganisationViewHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-16 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-500">
            <Building2 className="size-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Acme Inc.</h1>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400">
                Active
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground text-sm mt-1">
              <span className="flex items-center gap-1.5">
                <span className="font-medium text-foreground">ID:</span> ORG-123456
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Joined Oct 12, 2026
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <CloneOrganisationDialog />
      </div>
    </div>
  );
}
