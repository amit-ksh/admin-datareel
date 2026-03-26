'use client'

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts'

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface AnalyticsLineChartProps {
  title: string
  description?: string
  data: {
    month: string
    videos: number
    approval: number
    delivered: number
    seen: number
  }[]
  config: ChartConfig
  lines: { key: string }[]
  year: string
  onYearChange?: (year: string) => void
}

const currentYearNum = new Date().getFullYear()
const startYear = 2023
const selectableYears = Array.from(
  { length: currentYearNum - startYear + 1 },
  (_, i) => (currentYearNum - i).toString(),
)

export function AnalyticsLineChart({
  title,
  description,
  data,
  config,
  lines,
  year,
  onYearChange = () => {},
}: AnalyticsLineChartProps) {
  const chartData = Array.isArray(data) ? data : []
  return (
    <Card>
      <CardHeader className='flex flex-col justify-between space-y-4 pb-2 md:flex-row md:items-center md:space-y-0'>
        <div className='flex flex-col space-y-1.5'>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>

        <div className='flex flex-col gap-4 sm:flex-row sm:items-center md:ml-auto'>
          <div className='flex flex-wrap items-center gap-4'>
            {lines.map((line) => {
              const lineConfig = config[line.key as keyof typeof config]
              return (
                <div
                  key={line.key}
                  className='text-muted-foreground flex items-center gap-1.5 text-sm font-medium'
                >
                  <div
                    className='mt-0.5 h-2 w-2 shrink-0 rounded-full'
                    style={{ backgroundColor: lineConfig?.color }}
                  />
                  <span>{lineConfig?.label}</span>
                </div>
              )
            })}
          </div>

          {selectableYears.length > 0 && (
            <Select value={year} onValueChange={onYearChange}>
              <SelectTrigger className='w-full sm:w-[120px]'>
                <SelectValue placeholder='Select Year' />
              </SelectTrigger>
              <SelectContent>
                {selectableYears.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </CardHeader>
      <CardContent className='w-full px-2 sm:p-6'>
        <ChartContainer
          config={config}
          className='aspect-auto h-[250px] w-full'
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray='3 3' />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={5}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            {lines.map((line) => (
              <Line
                key={line.key}
                type='monotone'
                dataKey={line.key}
                stroke={`var(--color-${line.key})`}
                strokeWidth={2}
                dot={true}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
