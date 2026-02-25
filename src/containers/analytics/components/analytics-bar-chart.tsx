'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

interface AnalyticsBarChartProps {
  title: string
  description?: string
  data: any[]
  config: ChartConfig
  xAxisKey: string
  yAxisKey: string
  children?: React.ReactNode
}

export function AnalyticsBarChart({
  title,
  description,
  data,
  config,
  xAxisKey,
  yAxisKey,
  children,
}: AnalyticsBarChartProps) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <div className='flex flex-col space-y-1.5'>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {children}
      </CardHeader>
      <CardContent className='px-2 sm:p-6'>
        <ChartContainer
          config={config}
          className='aspect-auto h-[250px] w-full'
        >
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray='3 3' />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={5}
            />
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
              cursor={false}
              defaultIndex={1}
            />
            <Bar
              dataKey={yAxisKey}
              fill={`var(--color-${yAxisKey})`}
              radius={5}
              barSize={60}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
