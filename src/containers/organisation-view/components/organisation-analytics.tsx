'use client'

import { AnalyticsLineChart } from '@/containers/analytics/components/analytics-line-chart'
import { AnalyticsStatusChart } from '@/containers/analytics/components/analytics-status-chart'
import { AnalyticsEngagementSection } from '@/containers/analytics/components/analytics-engagement-section'
import { MetricsOverview } from '@/containers/analytics/components/metrics-overview'
import { OrganisationAnalyticsHeader } from './organisation-analytics-header'
import { useAnalytics } from '@/containers/analytics/use-analytics.hook'

interface MonthlyVideoCount {
  month: string
  videos: number
  approval: number
  delivered: number
  seen: number
}
interface MonthlyVideoCountApi {
  month_label: string
  total_videos: number
  approved_videos: number
  delivered_videos: number
  seen_videos: number
}

interface OrganisationAnalyticsProps {
  organisationId: string
}

export function OrganisationAnalytics({
  organisationId,
}: OrganisationAnalyticsProps) {
  const {
    summaryData,
    yearlyData,
    mode,
    setMode,
    dateRange,
    setDateRange,
    year,
    setYear,
    handleGetReportFile,
  } = useAnalytics(organisationId)

  const runsStatusData = [
    {
      status: 'Processing',
      value: summaryData?.processing_videos || 0,
      fill: '#3b82f6',
    },
    {
      status: 'Completed',
      value: summaryData?.completed_videos || 0,
      fill: '#22c55e',
    },
    {
      status: 'Failed',
      value: summaryData?.failed_videos || 0,
      fill: '#ef4444',
    },
  ]

  const approvalStatusData = [
    {
      status: 'Pending',
      value: summaryData?.pending_approval_videos || 0,
      fill: '#3b82f6',
    },
    {
      status: 'Approved',
      value: summaryData?.approved_videos || 0,
      fill: '#22c55e',
    },
    {
      status: 'Rejected',
      value: summaryData?.rejected_videos || 0,
      fill: '#ef4444',
    },
  ]

  const yearlyVideoData: MonthlyVideoCount[] =
    yearlyData?.months.map((m: MonthlyVideoCountApi) => ({
      month: m.month_label,
      videos: m.total_videos || 0,
      approval: m.approved_videos || 0,
      delivered: m.delivered_videos || 0,
      seen: m.seen_videos || 0,
    })) || []

  const topActionsKeys = Object.entries(summaryData?.callbacks_total || {})
  const topActions = topActionsKeys.map(([key, value]) => ({
    label: key,
    value: Number(value),
    color: 'bg-blue-600',
  }))

  const bottomActionsKeys = Object.entries(summaryData?.callbacks || {})
  const bottomActions = bottomActionsKeys.map(([key, value]) => ({
    label: key,
    value: Number(value),
    color: 'bg-blue-600/50',
  }))

  const avgFeedback = summaryData?.feedback_avg || 0
  const totalSeen = summaryData?.seen_videos || 0
  const totalCallbacks = summaryData?.callback_total || 0
  const totalFeedback = summaryData?.feedback_total || 0
  const callbackRate =
    totalSeen > 0 ? Number(((totalCallbacks / totalSeen) * 100).toFixed(1)) : 0
  const feedbackRate =
    totalSeen > 0 ? Number(((totalFeedback / totalSeen) * 100).toFixed(1)) : 0
  const ratings = [
    {
      label: '5 STAR',
      value: summaryData?.feedback_5_star || 0,
      color: 'bg-emerald-500',
    },
    {
      label: '4 STAR',
      value: summaryData?.feedback_4_star || 0,
      color: 'bg-emerald-500',
    },
    {
      label: '3 STAR',
      value: summaryData?.feedback_3_star || 0,
      color: 'bg-amber-500',
    },
    {
      label: '2 STAR',
      value: summaryData?.feedback_2_star || 0,
      color: 'bg-rose-400',
    },
    {
      label: '1 STAR',
      value: summaryData?.feedback_1_star || 0,
      color: 'bg-red-600',
    },
  ]

  const calculateTrendColor = (val: number) => {
    if (val > 0) return 'text-emerald-500'
    if (val < 0) return 'text-rose-500'
    return 'text-muted-foreground'
  }

  const formatTrend = (val: number) => {
    if (val > 0) return `+ ${val}%`
    if (val < 0) return `- ${Math.abs(val)}%`
    return '0%'
  }

  return (
    <div className='space-y-4'>
      <OrganisationAnalyticsHeader
        mode={mode}
        onModeChange={setMode}
        dateRange={dateRange}
        setDateRange={setDateRange}
        onDownloadReport={handleGetReportFile}
      />
      <MetricsOverview
        metrics={{
          totalVideos: {
            value: `${summaryData?.total_videos || 0}`,
            trend: formatTrend(summaryData?.growth?.total_videos || 0),
            trendColor: calculateTrendColor(
              summaryData?.growth?.total_videos || 0,
            ),
          },
          completed: {
            value: `${summaryData?.completed_videos || 0}`,
            trend: formatTrend(summaryData?.growth?.completed_videos || 0),
            trendColor: calculateTrendColor(
              summaryData?.growth?.completed_videos || 0,
            ),
          },
          approved: {
            value: `${summaryData?.approved_videos || 0}`,
            trend: formatTrend(summaryData?.growth?.approved_videos || 0),
            trendColor: calculateTrendColor(
              summaryData?.growth?.approved_videos || 0,
            ),
          },
          delivered: {
            value: `${summaryData?.delivered_videos || 0}`,
            trend: formatTrend(summaryData?.growth?.delivered_videos || 0),
            trendColor: calculateTrendColor(
              summaryData?.growth?.delivered_videos || 0,
            ),
          },
          seen: {
            value: `${summaryData?.seen_videos || 0}`,
            trend: formatTrend(summaryData?.growth?.seen_videos || 0),
            trendColor: calculateTrendColor(
              summaryData?.growth?.seen_videos || 0,
            ),
          },
        }}
        completion={{
          value: `${summaryData?.avg_completion_percentage || 0}`,
          trend: '0%',
        }}
      />

      {/* Status Charts Row */}
      <div className='grid gap-4 lg:grid-cols-2'>
        <AnalyticsStatusChart
          title='Videos Status'
          data={runsStatusData}
          config={{
            Processing: { label: 'Processing', color: '#3b82f6' },
            Completed: { label: 'Completed', color: '#22c55e' },
            Failed: { label: 'Failed', color: '#ef4444' },
          }}
          totalLabel='Runs'
          dataKey='value'
          nameKey='status'
        />
        <AnalyticsStatusChart
          title='Approval Status'
          data={approvalStatusData}
          config={{
            Pending: { label: 'Pending', color: '#3b82f6' },
            Approved: { label: 'Approved', color: '#22c55e' },
            Rejected: { label: 'Rejected', color: '#ef4444' },
          }}
          totalLabel='Runs'
          dataKey='value'
          nameKey='status'
        />
      </div>

      {/* Engagement Metrics Component */}
      <AnalyticsEngagementSection
        callbackRate={callbackRate}
        callbackDescription='from total CTA clicks'
        feedbackRate={feedbackRate}
        feedbackDescription='from total viewers'
        topActions={topActions}
        bottomActions={bottomActions}
        ratings={ratings}
        avgFeedback={avgFeedback}
      />

      {/* Yearly Line Chart Row */}
      <div className='grid gap-4'>
        <AnalyticsLineChart
          title='Yearly Video Analytics'
          description='Monthly comparison of videos processed, approved, and seen.'
          data={yearlyVideoData}
          config={{
            videos: { label: 'Videos', color: '#3b82f6' },
            approval: { label: 'Approval', color: '#22c55e' },
            delivered: { label: 'Delivered', color: '#6366f1' },
            seen: { label: 'Seen', color: '#f59e0b' },
          }}
          lines={[
            { key: 'videos' },
            { key: 'approval' },
            { key: 'delivered' },
            { key: 'seen' },
          ]}
          year={year.toString()}
          onYearChange={(y) => setYear(parseInt(y))}
        />
      </div>
    </div>
  )
}
