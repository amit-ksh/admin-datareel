import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";

export function AnalyticsHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="h-9 px-4 text-sm font-medium bg-background hover:bg-accent hover:text-accent-foreground shadow-sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button size="sm" className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow-sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
}
