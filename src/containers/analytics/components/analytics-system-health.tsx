import { Fingerprint, Video, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function AnalyticsSystemHealth() {
  const containers = [
    "running", "running", "running",
    "running", "running", "running",
    "running", "running", "running"
  ];
  
  const activeCount = containers.filter(c => c === "running").length;

  return (
    <Card className="bg-card w-full">
      <CardContent className="flex flex-col lg:flex-row items-center justify-between p-4 px-4 sm:px-6 w-full gap-4 lg:gap-0">
        
        <div className="flex items-center justify-between w-full lg:w-auto min-w-max">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center justify-center p-2 rounded-full bg-emerald-500/10">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] sm:text-sm font-bold uppercase tracking-wider text-foreground">
                System Health
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-emerald-500 uppercase tracking-wider">
                All Services Operational
              </span>
            </div>
          </div>
          <button className="lg:hidden p-2 hover:bg-muted rounded-md transition-colors">
            <ExternalLink className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <div className="w-px h-8 bg-border/50 hidden lg:block mx-4" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between sm:justify-around flex-1 w-full lg:max-w-4xl gap-4 sm:gap-2 pt-4 lg:pt-0 border-t lg:border-t-0 border-border/50">
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Fingerprint className="w-5 h-5 text-muted-foreground" />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-bold text-foreground">Auth Service</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[11px] font-medium text-emerald-500">Running</span>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-px h-px sm:h-8 bg-border/50 sm:hidden block" />

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Video className="w-5 h-5 text-muted-foreground" />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-bold text-foreground">Video Service</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[11px] font-medium text-emerald-500">Running</span>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-px h-px sm:h-8 bg-border/50 sm:hidden block" />

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="grid grid-cols-3 gap-1">
              {containers.map((status, i) => (
                <div 
                  key={i} 
                  className={`size-2 rounded-full ${
                    status === "running" ? "bg-emerald-500" :
                    status === "warning" ? "bg-amber-500" : "bg-rose-500"
                  }`} 
                />
              ))}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-bold text-foreground">Containers</span>
              <span className="text-[11px] font-medium text-blue-400">{activeCount}/{containers.length} Running</span>
            </div>
          </div>

        </div>

        <div className="w-px h-8 bg-border/50 hidden lg:block mx-4" />

        <div className="hidden lg:flex items-center min-w-max">
          <button className="p-2 hover:bg-muted rounded-md transition-colors">
            <ExternalLink className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

      </CardContent>
    </Card>
  );
}
