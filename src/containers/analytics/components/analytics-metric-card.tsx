'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { Bar, BarChart, Line, LineChart, Cell } from 'recharts'

import { ANALYTICS_TEST_IDS } from './test-ids'

interface AnalyticsMetricCardProps {
  title: string
  value: string
  subtext?: string
  trend?: {
    value: number
    label: string
    direction: 'up' | 'down'
  }
  chartData: Record<string, string | number | boolean | null>[]
  chartConfig: ChartConfig
  chartType: 'bar' | 'line'
  dataKey: string
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
    <Card
      className='gap-0'
      data-testid={ANALYTICS_TEST_IDS.METRIC_CARD.CONTAINER}
    >
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle
          className='font-medium'
          data-testid={ANALYTICS_TEST_IDS.METRIC_CARD.TITLE}
        >
          {title}
        </CardTitle>
        {trend && (
          <div
            className={`flex items-center rounded-full px-2 py-1 text-xs ${
              trend.direction === 'up'
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-600'
            }`}
            data-testid={ANALYTICS_TEST_IDS.METRIC_CARD.TREND}
          >
            {trend.direction === 'up' ? (
              <ArrowUp className='mr-1 h-3 w-3' />
            ) : (
              <ArrowDown className='mr-1 h-3 w-3' />
            )}
            <span className='font-medium'>{trend.value}%</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className='flex h-[80px] items-end justify-between'>
          <div className='flex h-full w-1/2 flex-col justify-end'>
            <div
              className='text-3xl font-bold'
              data-testid={ANALYTICS_TEST_IDS.METRIC_CARD.VALUE}
            >
              {value}
            </div>

            {subtext && (
              <p className='text-muted-foreground mt-1 text-xs'>{subtext}</p>
            )}
          </div>
          <div className='flex h-full w-1/2 items-end justify-end'>
            <ChartContainer config={chartConfig} className='h-[60px] w-full'>
              {chartType === 'bar' ? (
                <BarChart data={chartData}>
                  <Bar dataKey={dataKey} radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          (entry as Record<string, string | null>)?.fill ||
                          `var(--color-${dataKey})`
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              ) : (
                <LineChart data={chartData}>
                  <Line
                    type='monotone'
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
  )
}
