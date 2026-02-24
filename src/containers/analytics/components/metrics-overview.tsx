import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricValue {
  value: string | number;
  trend: string;
  trendColor: string;
}

export interface MetricsOverviewProps {
  organization: {
    count: string | number;
    trend: string;
    onboardedPercent: number;
  };
  metrics: {
    totalVideos: MetricValue;
    approved: MetricValue;
    delivered: MetricValue;
    seen: MetricValue;
  };
  completion: {
    value: string | number;
    trend: string;
  };
}

export function MetricsOverview({
  organization,
  metrics,
  completion,
}: MetricsOverviewProps) {
  return (
    <div className="flex flex-col xl:flex-row w-full rounded-xl border border-border/50 bg-card/50 overflow-hidden mb-8 dark:bg-accent">
      {/* 1. ORGANIZATION SECTION */}
      <div className="flex-none w-full xl:w-[360px] p-6 xl:px-8 flex flex-row items-center justify-between border-b xl:border-b-0 xl:border-r border-border/50 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold tracking-widest text-blue-600 dark:text-blue-500 uppercase mb-1">
            Organisation
          </span>
          <span className="text-4xl font-bold text-slate-900 dark:text-white">
            {organization.count}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
            <span>Total Count</span>
            <span className="text-emerald-500 flex items-center font-semibold">
              <TrendingUp className="w-3 h-3 mr-0.5" /> {organization.trend}
            </span>
          </div>
        </div>

        {/* Circle Chart */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 36 36"
          >
            <path
              className="text-slate-200 dark:text-slate-800/80"
              strokeDasharray="100, 100"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              stroke="currentColor"
              strokeWidth="3.5"
              fill="none"
            />
            <path
              className="text-blue-600 dark:text-blue-500"
              strokeDasharray={`${organization.onboardedPercent}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[15px] font-bold text-slate-900 dark:text-white leading-none mt-1">
              {organization.onboardedPercent}%
            </span>
            <span className="text-[7px] font-extrabold tracking-wider text-slate-500 uppercase leading-none mt-1">
              Onboarded
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row items-center p-4 md:p-6 xl:px-8 gap-6 lg:gap-4 xl:gap-0">
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 w-full gap-6 md:gap-4 lg:gap-2 xl:gap-0">
          <MetricItem
            title="TOTAL VIDEOS"
            value={String(metrics.totalVideos.value)}
            trend={metrics.totalVideos.trend}
            trendColor={metrics.totalVideos.trendColor}
          />
          <MetricItem
            title="APPROVED"
            value={String(metrics.approved.value)}
            trend={metrics.approved.trend}
            trendColor={metrics.approved.trendColor}
          />
          <MetricItem
            title="DELIVERED"
            value={String(metrics.delivered.value)}
            trend={metrics.delivered.trend}
            trendColor={metrics.delivered.trendColor}
          />
          <MetricItem
            title="SEEN"
            value={String(metrics.seen.value)}
            trend={metrics.seen.trend}
            trendColor={metrics.seen.trendColor}
          />
        </div>

        <div className="flex-none lg:ml-4 bg-slate-100 dark:bg-[#1a2542] rounded-xl px-6 py-4 xl:px-10 xl:py-5 flex flex-col items-center justify-center border border-slate-200 dark:border-transparent w-full md:w-[60%] lg:w-auto min-h-[120px]">
          <span className="text-[10px] font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3 text-center">
            75%+ COMPLETION
          </span>
          <span className="text-[32px] font-bold text-slate-900 dark:text-white mb-2 leading-none">
            {completion.value}
          </span>
          <span className="text-emerald-500 text-xs font-semibold mt-1">
            {completion.trend}
          </span>
        </div>
      </div>
    </div>
  );
}

function MetricItem({
  title,
  value,
  trend,
  trendColor,
}: {
  title: string;
  value: string;
  trend: string;
  trendColor: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-2">
      <span className="text-[10px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-3">
        {title}
      </span>
      <span className="text-[32px] font-bold text-slate-900 dark:text-white mb-2 leading-none">
        {value}
      </span>
      <span className={cn("text-xs font-semibold mt-1", trendColor)}>
        {trend}
      </span>
    </div>
  );
}
