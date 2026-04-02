import { TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricValue {
  value: string | number
  trend: string
  trendColor: string
}

export interface MetricsOverviewProps {
  organization?: {
    count: string | number
    trend: string
    onboardedPercent: number
  }
  metrics: {
    totalVideos: MetricValue
    completed: MetricValue
    approved: MetricValue
    delivered: MetricValue
    seen: MetricValue
  }
  completion: {
    value: string | number
    trend: string
  }
}

import { ANALYTICS_TEST_IDS } from './test-ids'

export function MetricsOverview({
  organization,
  metrics,
  completion,
}: MetricsOverviewProps) {
  return (
    <div
      className='border-border/50 bg-card/50 dark:bg-accent mb-8 flex w-full flex-col overflow-hidden rounded-xl border xl:flex-row'
      data-testid={ANALYTICS_TEST_IDS.METRICS_OVERVIEW.CONTAINER}
    >
      {/* 1. ORGANIZATION SECTION */}
      {organization && (
        <div className='border-border/50 flex w-full flex-none flex-row items-center justify-between border-b bg-slate-50/50 p-6 xl:w-[360px] xl:border-r xl:border-b-0 xl:px-8 dark:bg-slate-900/30'>
          <div className='flex flex-col gap-1'>
            <span className='mb-1 text-[11px] font-bold tracking-widest text-blue-600 uppercase dark:text-blue-500'>
              Organisation
            </span>
            <span className='text-4xl font-bold text-slate-900 dark:text-white'>
              {organization.count}
            </span>
            <div className='mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400'>
              <span>Total Count</span>
              <span className='flex items-center font-semibold text-emerald-500'>
                <TrendingUp className='mr-0.5 h-3 w-3' /> {organization.trend}
              </span>
            </div>
          </div>

          {/* Circle Chart */}
          <div className='relative flex h-24 w-24 items-center justify-center'>
            <svg
              className='h-full w-full -rotate-90 transform'
              viewBox='0 0 36 36'
            >
              <circle
                cx='18'
                cy='18'
                r='15.9155'
                className='text-slate-200 dark:text-slate-800/80'
                strokeDasharray='100, 100'
                stroke='currentColor'
                strokeWidth='3.5'
                fill='none'
              />
              <circle
                cx='18'
                cy='18'
                r='15.9155'
                className='text-blue-600 dark:text-blue-500'
                strokeDasharray={`${organization.onboardedPercent}, 100`}
                stroke='currentColor'
                strokeWidth='4'
                fill='none'
                strokeLinecap='round'
              />
            </svg>
            <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
              <span className='mt-1 text-[15px] leading-none font-bold text-slate-900 dark:text-white'>
                {organization.onboardedPercent}%
              </span>
              <span className='mt-1 text-[7px] leading-none font-extrabold tracking-wider text-slate-500 uppercase'>
                Onboarded
              </span>
            </div>
          </div>
        </div>
      )}

      <div className='grid w-full flex-1 grid-cols-2 gap-6 p-4 sm:grid-cols-3 md:gap-4 md:p-6 lg:grid-cols-6 lg:gap-2 xl:gap-0 xl:px-8'>
        <MetricItem
          title='TOTAL VIDEOS'
          value={String(metrics.totalVideos.value)}
          trend={metrics.totalVideos.trend}
          trendColor={metrics.totalVideos.trendColor}
        />
        <MetricItem
          title='COMPLETED'
          value={String(metrics.completed.value)}
          trend={metrics.completed.trend}
          trendColor={metrics.completed.trendColor}
        />
        <MetricItem
          title='APPROVED'
          value={String(metrics.approved.value)}
          trend={metrics.approved.trend}
          trendColor={metrics.approved.trendColor}
        />
        <MetricItem
          title='DELIVERED'
          value={String(metrics.delivered.value)}
          trend={metrics.delivered.trend}
          trendColor={metrics.delivered.trendColor}
        />
        <MetricItem
          title='SEEN'
          value={String(metrics.seen.value)}
          trend={metrics.seen.trend}
          trendColor={metrics.seen.trendColor}
        />
        <div className='flex min-h-[120px] w-full flex-none flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-100 px-6 py-4 xl:px-10 xl:py-5 dark:border-transparent dark:bg-[#1a2542]'>
          <span className='mb-3 text-center text-[10px] font-bold tracking-widest text-blue-600 uppercase dark:text-blue-400'>
            75%+ COMPLETION
          </span>
          <span className='mb-2 text-[32px] leading-none font-bold text-slate-900 dark:text-white'>
            {completion.value}
          </span>
          <span className='mt-1 text-xs font-semibold text-emerald-500'>
            {completion.trend}
          </span>
        </div>
      </div>
    </div>
  )
}

function MetricItem({
  title,
  value,
  trend,
  trendColor,
}: {
  title: string
  value: string
  trend: string
  trendColor: string
}) {
  return (
    <div className='flex flex-col items-center justify-center px-2 text-center'>
      <span className='mb-3 text-[10px] font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400'>
        {title}
      </span>
      <span className='mb-2 text-[32px] leading-none font-bold text-slate-900 dark:text-white'>
        {value}
      </span>
      <span className={cn('mt-1 text-xs font-semibold', trendColor)}>
        {trend}
      </span>
    </div>
  )
}
