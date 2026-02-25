import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

export interface MetricCardProps {
  title: string;
  value?: ReactNode;
  icon?: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function MetricCard({ title, value, icon, subtitle, children, className }: MetricCardProps) {
  return (
    <Card className={`border p-4 rounded-xl flex flex-col ${className || ""}`}>
      <CardContent className="p-0 flex flex-col h-full flex-1">
        <div className="flex justify-between items-start h-full">
          <div className="flex flex-col gap-1.5 w-full h-full justify-between">
            <div>
              <p className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">{title}</p>
              {value !== undefined && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-3xl font-bold">{value}</span>
                </div>
              )}
            </div>
            {subtitle && (
              <div className="mt-auto pt-1.5">
                {subtitle}
              </div>
            )}
            {children && (
              <div className="mt-auto pt-1.5 w-full">
                {children}
              </div>
            )}
          </div>
          {icon && icon}
        </div>
      </CardContent>
    </Card>
  );
}

export function StatBadge({ 
  label, 
  value, 
  valueClassName = "" 
}: { 
  label: string; 
  value: string | number; 
  valueClassName?: string;
}) {
  return (
    <div className="flex-1 bg-muted/20 rounded-lg py-1 flex flex-col items-center justify-center border border-muted/30">
      <span className="text-[10px] font-bold text-muted-foreground">{label}</span>
      <span className={`font-bold text-sm leading-tight ${valueClassName}`}>{value}</span>
    </div>
  );
}

export function ProgressBar({ 
  segments,
  className = "h-2 bg-muted/50" 
}: { 
  segments: { width: string | number, colorClass: string }[];
  className?: string;
}) {
  return (
    <div className={`flex w-full rounded-full overflow-hidden ${className}`}>
      {segments.map((s, i) => (
        <div key={i} className={`h-full ${s.colorClass}`} style={{ width: typeof s.width === 'number' ? `${s.width}%` : s.width }} />
      ))}
    </div>
  );
}

export function DistributionItem({ 
  label, 
  count, 
  width, 
  barColor,
  countColor 
}: { 
  label: string; 
  count: number; 
  width: number | string; 
  barColor: string; 
  countColor: string; 
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm font-bold">
        <span>{label}</span>
        <span className={`${countColor} font-semibold`}>{count}</span>
      </div>
      <ProgressBar segments={[{ width, colorClass: barColor }]} className="h-2 bg-muted/30" />
    </div>
  );
}

export function DistributionCard({ title, children }: { title: string, children: ReactNode }) {
  return (
    <Card className="border gap-0 rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 pt-4 pb-6">
        {children}
      </CardContent>
    </Card>
  );
}
