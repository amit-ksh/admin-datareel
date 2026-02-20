import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";

export function OrganisationsHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Organisations</h1>
        <p className="text-muted-foreground text-sm">
          Track & manage the organisations
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="hidden sm:flex h-9 px-4 text-sm font-medium bg-background hover:bg-muted/50">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button size="sm" className="hidden sm:flex h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow-sm">
          <Plus className="mr-2 h-4 w-4" />
          Onboard
        </Button>
      </div>
    </div>
  );
}
