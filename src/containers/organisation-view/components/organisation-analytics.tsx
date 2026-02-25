import { AnalyticsLineChart } from '@/containers/analytics/components/analytics-line-chart'
import { AnalyticsStatusChart } from '@/containers/analytics/components/analytics-status-chart'
import { AnalyticsEngagementSection } from '@/containers/analytics/components/analytics-engagement-section'
import { MetricsOverview } from '@/containers/analytics/components/metrics-overview'
import { OrganisationAnalyticsHeader } from './organisation-analytics-header'

const runsStatusData = [
  { status: 'Processing', value: 1307, fill: '#3b82f6' },
  { status: 'Completed', value: 7100, fill: '#22c55e' },
  { status: 'Failed', value: 30, fill: '#ef4444' },
]

const approvalStatusData = [
  { status: 'Pending', value: 8, fill: '#3b82f6' },
  { status: 'Approved', value: 7092, fill: '#22c55e' },
  { status: 'Rejected', value: 0, fill: '#ef4444' },
]

const yearlyVideoData = {
  '2026': [
    { month: 'Jan', videos: 4000, approval: 2400, seen: 2400 },
    { month: 'Feb', videos: 3000, approval: 1398, seen: 2210 },
    { month: 'Mar', videos: 2000, approval: 9800, seen: 2290 },
    { month: 'Apr', videos: 2780, approval: 3908, seen: 2000 },
    { month: 'May', videos: 1890, approval: 4800, seen: 2181 },
    { month: 'Jun', videos: 2390, approval: 3800, seen: 2500 },
    { month: 'Jul', videos: 3490, approval: 4300, seen: 2100 },
    { month: 'Aug', videos: 2390, approval: 3800, seen: 2500 },
    { month: 'Sep', videos: 3490, approval: 4300, seen: 2100 },
    { month: 'Oct', videos: 2390, approval: 3800, seen: 2500 },
    { month: 'Nov', videos: 3490, approval: 4300, seen: 2100 },
    { month: 'Dec', videos: 2390, approval: 3800, seen: 2500 },
  ],
  '2025': [
    { month: 'Jan', videos: 2000, approval: 1400, seen: 1400 },
    { month: 'Feb', videos: 1000, approval: 398, seen: 1210 },
    { month: 'Mar', videos: 1000, approval: 4800, seen: 1290 },
    { month: 'Apr', videos: 1780, approval: 1908, seen: 1000 },
    { month: 'May', videos: 890, approval: 2800, seen: 1181 },
    { month: 'Jun', videos: 1390, approval: 1800, seen: 1500 },
    { month: 'Jul', videos: 2490, approval: 2300, seen: 1100 },
    { month: 'Aug', videos: 1390, approval: 1800, seen: 1500 },
    { month: 'Sep', videos: 2490, approval: 2300, seen: 1100 },
    { month: 'Oct', videos: 1390, approval: 1800, seen: 1500 },
    { month: 'Nov', videos: 2490, approval: 2300, seen: 1100 },
    { month: 'Dec', videos: 1390, approval: 1800, seen: 1500 },
  ],
}

const topActions = [
  { label: 'Schedule Meeting', value: 42, color: 'bg-blue-600' },
  { label: 'Request Demo', value: 28, color: 'bg-blue-600' },
  { label: 'Download Guide', value: 15, color: 'bg-blue-600' },
  { label: 'Contact Support', value: 10, color: 'bg-blue-600' },
  { label: 'Book Demo', value: 7, color: 'bg-blue-600' },
]

const bottomActions = [
  { label: 'Follow on Twitter', value: 2, color: 'bg-blue-600/50' },
  { label: 'Share on LinkedIn', value: 3, color: 'bg-blue-600/50' },
  { label: 'Subscribe to Newsletter', value: 4, color: 'bg-blue-600/50' },
  { label: 'View Pricing', value: 6, color: 'bg-blue-600/50' },
  { label: 'Book Demo', value: 7, color: 'bg-blue-600/50' },
]

const ratings = [
  { label: '5 STAR', value: 65, color: 'bg-emerald-500' },
  { label: '4 STAR', value: 19, color: 'bg-emerald-500' },
  { label: '3 STAR', value: 10, color: 'bg-amber-500' },
  { label: '2 STAR', value: 4, color: 'bg-rose-400' },
  { label: '1 STAR', value: 1, color: 'bg-red-600' },
]

export function OrganisationAnalytics() {
  return (
    <div className='space-y-4'>
      <OrganisationAnalyticsHeader />
      <MetricsOverview
        metrics={{
          totalVideos: {
            value: '458',
            trend: '+ 8%',
            trendColor: 'text-emerald-500',
          },
          approved: {
            value: '412',
            trend: '− 2%',
            trendColor: 'text-rose-500',
          },
          delivered: {
            value: '380',
            trend: '+ 15%',
            trendColor: 'text-emerald-500',
          },
          seen: {
            value: '310',
            trend: '+ 20%',
            trendColor: 'text-emerald-500',
          },
        }}
        completion={{
          value: '245',
          trend: '+ 10%',
        }}
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
            seen: { label: 'Seen', color: '#eab308' },
          }}
          lines={[{ key: 'videos' }, { key: 'approval' }, { key: 'seen' }]}
        />
      </div>

      {/* Status Charts Row */}
      <div className='grid gap-4 lg:grid-cols-2'>
        <AnalyticsStatusChart
          title='Runs Status'
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
        callbackRate={68}
        callbackDescription='from total CTA clicks'
        feedbackRate={84}
        feedbackDescription='from total viewers'
        topActions={topActions}
        bottomActions={bottomActions}
        ratings={ratings}
      />
    </div>
  )
}
