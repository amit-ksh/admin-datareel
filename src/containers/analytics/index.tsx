"use client";

import { useAnalytics } from "./use-analytics.hook";
import { AnalyticsHeader } from "./components/analytics-header";
import { AnalyticsMetricCard } from "./components/analytics-metric-card";
import { AnalyticsStatusChart } from "./components/analytics-status-chart";
import { AnalyticsBarChart } from "./components/analytics-bar-chart";
import { TopOrganizationsTable } from "./components/top-organizations-table";
import { ChartConfig } from "@/components/ui/chart";

const chartConfig = {
  viewers: {
    label: "Viewers",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const sparklineData = [
  { value: 10 },
  { value: 20 },
  { value: 15 },
  { value: 25 },
  { value: 30 },
  { value: 20 },
  { value: 35 },
];

const runsStatusData = [
  { status: "Processing", value: 1307, fill: "#3b82f6" },
  { status: "Completed", value: 7100, fill: "#22c55e" },
  { status: "Failed", value: 30, fill: "#ef4444" },
];

const approvalStatusData = [
  { status: "Pending", value: 8, fill: "#3b82f6" },
  { status: "Approved", value: 7092, fill: "#22c55e" },
  { status: "Rejected", value: 0, fill: "#ef4444" },
];

const videoStatusData = [
  { name: "Total", value: 8500 },
  { name: "Completed", value: 7100 },
  { name: "Approved", value: 7100 },
];

const deliveryStatsData = [
  { name: "Sent", value: 7000 },
  { name: "Resent", value: 800 },
  { name: "Seen", value: 2500 },
  { name: "Callback", value: 100 },
  { name: "Feedback", value: 100 },
];

const viewerSatisfactionData = [
  { rating: "1", value: 12, fill: "#ef4444" },
  { rating: "2", value: 25, fill: "#f97316" },
  { rating: "3", value: 45, fill: "#eab308" },
  { rating: "4", value: 80, fill: "#84cc16" },
  { rating: "5", value: 150, fill: "#22c55e" },
];

const videoDeliveryData = [
  { status: "Sent", value: 7000, fill: "#3b82f6" },
  { status: "Seen", value: 2500, fill: "#22c55e" },
  { status: "Callback", value: 100, fill: "#eab308" },
  { status: "Feedback", value: 100, fill: "#a855f7" },
];

const videoApprovalCardData = [
  { status: "Pending", value: 50, fill: "#3b82f6" },
  { status: "Approved", value: 200, fill: "#22c55e" },
  { status: "Rejected", value: 10, fill: "#ef4444" },
];

export default function AnalyticsContainer() {
  const {} = useAnalytics();

  return (
    <div className="space-y-8 min-h-screen">
      <AnalyticsHeader />

      {/* Top Metrics Row 1 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnalyticsMetricCard
          title="Total Videos"
          value="10K"
          subtext="last month"
          trend={{ value: 5, label: "", direction: "up" }}
          chartData={runsStatusData}
          chartConfig={{ value: { label: "Value", color: "#ef4444" } }}
          chartType="bar"
          dataKey="value"
        />
        <AnalyticsMetricCard
          title="Token Consumption"
          value="10K"
          subtext="last month"
          trend={{ value: 5, label: "", direction: "up" }}
          chartData={sparklineData}
          chartConfig={{ value: { label: "Value", color: "#8b5cf6" } }}
          chartType="line"
          dataKey="value"
        />
        <AnalyticsMetricCard
          title="LipSync Duration"
          value="20 days"
          subtext="last month"
          trend={{ value: 5, label: "", direction: "up" }}
          chartData={sparklineData}
          chartConfig={{ value: { label: "Value", color: "#22c55e" } }}
          chartType="line"
          dataKey="value"
        />
        <AnalyticsMetricCard
          title="Video Approval"
          value="9.5K"
          subtext="last month"
          trend={{ value: 5, label: "", direction: "up" }}
          chartData={videoApprovalCardData}
          chartConfig={{ value: { label: "Value", color: "#ef4444" } }}
          chartType="bar"
          dataKey="value"
        />
        <AnalyticsMetricCard
          title="Video Delivery"
          value="8K"
          subtext="last month"
          trend={{ value: 5, label: "", direction: "up" }}
          chartData={videoDeliveryData}
          chartConfig={{ value: { label: "Value", color: "#ef4444" } }}
          chartType="bar"
          dataKey="value"
        />

        <AnalyticsMetricCard
          title="Viewer Satisfaction"
          value="4.5"
          subtext="100 comments"
          chartData={viewerSatisfactionData}
          chartConfig={{ value: { label: "Value", color: "#ef4444" } }}
          chartType="bar"
          dataKey="value"
        />
      </div>

      {/* Status Charts Row */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        <AnalyticsStatusChart
          title="Runs Status"
          data={runsStatusData}
          config={{
            Processing: { label: "Processing", color: "#3b82f6" },
            Completed: { label: "Completed", color: "#22c55e" },
            Failed: { label: "Failed", color: "#ef4444" },
          }}
          totalLabel="Runs"
          dataKey="value"
          nameKey="status"
        />
        <AnalyticsStatusChart
          title="Approval Status"
          data={approvalStatusData}
          config={{
            Pending: { label: "Pending", color: "#3b82f6" },
            Approved: { label: "Approved", color: "#22c55e" },
            Rejected: { label: "Rejected", color: "#ef4444" },
          }}
          totalLabel="Runs"
          dataKey="value"
          nameKey="status"
        />
      </div>

      {/* Bar Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        <AnalyticsBarChart
          title="Video Status"
          data={videoStatusData}
          config={{
            value: { label: "Value", color: "#3b82f6" },
          }}
          xAxisKey="name"
          yAxisKey="value"
        />
        <AnalyticsBarChart
          title="Delivery Stats"
          data={deliveryStatsData}
          config={{
            value: { label: "Value", color: "#10b981" },
          }}
          xAxisKey="name"
          yAxisKey="value"
        ></AnalyticsBarChart>
      </div>

      {/* Top Organizations Table */}
      <div className="grid gap-4">
        <TopOrganizationsTable />
      </div>
    </div>
  );
}
