import { MetricCard, StatBadge, ProgressBar } from "./shared-components";
import { User, Video, Mic } from "lucide-react";

export function AssetMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Avatars */}
      <MetricCard 
        title="Avatars" 
        value="12"
        icon={
          <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center">
            <User className="h-5 w-5 text-emerald-500 fill-emerald-500" />
          </div>
        }
      >
        <div className="space-y-1 mt-1">
          <div className="flex justify-between text-[11px] font-medium text-muted-foreground">
            <span>Normal: 4</span>
            <span className="text-blue-500">AI: 8</span>
          </div>
          <ProgressBar segments={[
            { width: '33.3%', colorClass: 'bg-muted-foreground/30' },
            { width: '66.6%', colorClass: 'bg-blue-500' }
          ]} className="h-1.5" />
        </div>
        <div className="flex gap-2 pt-2">
          <StatBadge label="COMPLETED" value="5" valueClassName="text-emerald-500" />
          <StatBadge label="PENDING" value="2" valueClassName="text-orange-500" />
          <StatBadge label="FAILED" value="1" valueClassName="text-red-500" />
        </div>
      </MetricCard>

      {/* Content Videos */}
      <MetricCard 
        title="Content Videos" 
        value="4"
        icon={
          <div className="h-10 w-10 rounded-lg bg-rose-50 flex items-center justify-center">
            <Video className="h-5 w-5 text-rose-500 fill-rose-500" />
          </div>
        }
      >
        <div className="space-y-1 mt-1">
          <div className="flex justify-between text-[11px] font-medium text-muted-foreground">
            <span>Normal: 1</span>
            <span className="text-blue-500">AI: 3</span>
          </div>
          <ProgressBar segments={[
            { width: '25%', colorClass: 'bg-muted-foreground/30' },
            { width: '75%', colorClass: 'bg-blue-500' }
          ]} className="h-1.5" />
        </div>
        <div className="flex gap-2 pt-2">
          <StatBadge label="COMPLETED" value="2" valueClassName="text-emerald-500" />
          <StatBadge label="PENDING" value="1" valueClassName="text-orange-500" />
          <StatBadge label="FAILED" value="0" valueClassName="text-red-500" />
        </div>
      </MetricCard>

      {/* Voices */}
      <MetricCard 
        title="Voices" 
        value="23"
        icon={
          <div className="h-10 w-10 rounded-lg bg-cyan-50 flex items-center justify-center">
            <Mic className="h-5 w-5 text-cyan-500 fill-cyan-500" />
          </div>
        }
      >
        <div className="space-y-3 mt-1">
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-medium">
              <span className="text-blue-500">Eleven Labs</span>
              <span className="font-bold">15</span>
            </div>
            <ProgressBar segments={[{ width: '65%', colorClass: 'bg-blue-500' }]} className="h-1.5 bg-muted/50" />
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-medium">
              <span className="text-purple-500">Sarvam</span>
              <span className="font-bold">8</span>
            </div>
            <ProgressBar segments={[{ width: '35%', colorClass: 'bg-purple-500' }]} className="h-1.5 bg-muted/50" />
          </div>
        </div>
      </MetricCard>
    </div>
  );
}
