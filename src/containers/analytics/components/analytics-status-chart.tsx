"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface AnalyticsStatusChartProps {
  title: string;
  description?: string;
  data: any[];
  config: ChartConfig;
  totalLabel: string;
  dataKey: string;
  nameKey: string;
}

export function AnalyticsStatusChart({
  title,
  description,
  data,
  config,
  totalLabel,
  dataKey,
  nameKey,
}: AnalyticsStatusChartProps) {
  const total = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr[dataKey], 0);
  }, [data, dataKey]);

  return (
    <Card className="flex flex-col gap-2">
      <CardHeader className="items-center py-0">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 pb-0 p-0 pr-2">
        <div className="flex items-center justify-between gap-8 w-full">
          <ChartContainer
            config={config}
            className="aspect-square max-h-50 w-50"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={data}
                dataKey={dataKey}
                nameKey={nameKey}
                innerRadius={55}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {total.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            {totalLabel}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>

          <div className="flex flex-col flex-1 gap-2">
            {data.map((item, index) => {
              const percentage = ((item[dataKey] / total) * 100).toFixed(2);
              return (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b last:border-0 border-border/50"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-muted-foreground">
                      {item[nameKey]}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{item[dataKey]}</span>
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-sm min-w-[4rem] text-center">
                      {percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
