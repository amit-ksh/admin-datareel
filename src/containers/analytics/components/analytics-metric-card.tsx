"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Cell } from "recharts";

interface AnalyticsMetricCardProps {
  title: string;
  value: string;
  subtext?: string;
  trend?: {
    value: number;
    label: string;
    direction: "up" | "down";
  };
  chartData: any[];
  chartConfig: ChartConfig;
  chartType: "bar" | "line";
  dataKey: string;
}

export function AnalyticsMetricCard({
  title,
  value,
  subtext,
  trend,
  chartData,
  chartConfig,
  chartType,
  dataKey,
}: AnalyticsMetricCardProps) {
  return (
    <Card className="gap-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-medium">{title}</CardTitle>
          {trend && (
            <div className={`flex items-center text-xs px-2 py-1 rounded-full ${
              trend.direction === "up"
                ? "text-green-600 bg-green-100"
                : "text-red-600 bg-red-100"
            }`}>
              {trend.direction === "up" ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              <span className="font-medium">{trend.value}%</span>
            </div>
          )}
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between h-[80px]">
          <div className="flex flex-col justify-end h-full w-1/2">
            <div className="text-3xl font-bold">{value}</div>
            
            {subtext && (
               <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
            )}
          </div>
          <div className="h-full w-1/2 flex items-end justify-end">
            <ChartContainer config={chartConfig} className="h-[60px] w-full">
              {chartType === "bar" ? (
                <BarChart data={chartData}>
                  <Bar
                    dataKey={dataKey}
                    radius={[4, 4, 0, 0]}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill || `var(--color-${dataKey})`} />
                    ))}
                  </Bar>
                </BarChart>
              ) : (
                <LineChart data={chartData}>
                  <Line
                    type="monotone"
                    dataKey={dataKey}
                    stroke={`var(--color-${dataKey})`}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              )}
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
