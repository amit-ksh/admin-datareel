import { TrendingUp, Folder, LayoutDashboard, PlusCircle, Users } from "lucide-react";
import { MetricCard, StatBadge, ProgressBar } from "./shared-components";

export function ProjectMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Projects */}
      <MetricCard 
        title="Total Projects" 
        value="12"
        subtitle={
          <p className="text-sm text-emerald-500 font-medium flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            +12% this month
          </p>
        }
        icon={
          <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <Folder className="h-5 w-5 text-blue-500 fill-blue-500" />
          </div>
        }
      />

      {/* Video Layouts */}
      <MetricCard 
        title="Video Layouts" 
        value="4"
        subtitle={
          <p className="text-sm text-emerald-500 font-medium flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            1 new
          </p>
        }
        icon={
          <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
            <LayoutDashboard className="h-5 w-5 text-purple-500 fill-purple-500" />
          </div>
        }
      />

      {/* Persona */}
      <MetricCard 
        title="Persona" 
        value="23"
        icon={
          <div className="h-10 w-10 rounded-lg bg-orange-50 flex items-center justify-center">
            <Users className="h-5 w-5 text-orange-500 fill-orange-500" />
          </div>
        }
      >
        <div className="space-y-1 mt-1">
          <div className="flex justify-between text-[11px] font-medium text-muted-foreground">
            <span>Onboarded: 18</span>
            <span className="text-blue-500">Total: 23</span>
          </div>
          <ProgressBar segments={[{ width: '78%', colorClass: 'bg-blue-500' }]} className="h-1.5 bg-muted/50" />
        </div>
        <div className="flex gap-2 pt-2">
          <StatBadge label="ONBOARDED" value="18" valueClassName="text-blue-500" />
          <StatBadge label="PENDING" value="5" valueClassName="text-muted-foreground" />
        </div>
      </MetricCard>
    </div>
  );
}
