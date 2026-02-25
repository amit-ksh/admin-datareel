'use client'

import { useState } from 'react'
import {
  Label,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardContent } from '@/components/ui/card'

export interface ActionItemProps {
  label: string
  value: number
  color?: string
}

export function EngagementRateChart({
  value,
  color,
}: {
  value: number
  color: string
}) {
  const chartData = [{ name: 'rate', value, remaining: 100 - value }]

  return (
    <div className='relative mb-6 h-[100px] w-full overflow-hidden'>
      <div className='absolute top-0 left-0 h-[200px] w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <RadialBarChart
            data={chartData}
            startAngle={180}
            endAngle={0}
            innerRadius={80}
            outerRadius={130}
            barSize={14}
          >
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle'>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className='fill-foreground text-2xl font-bold'
                        >
                          {value}%
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey='value'
              stackId='a'
              cornerRadius={5}
              fill={color}
              className='stroke-transparent stroke-2'
            />
            <RadialBar
              dataKey='remaining'
              fill='var(--muted)'
              stackId='a'
              cornerRadius={5}
              className='stroke-transparent stroke-2'
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function EngagementList({
  title,
  topItems,
  bottomItems,
  items,
}: {
  title: string
  topItems?: ActionItemProps[]
  bottomItems?: ActionItemProps[]
  items?: ActionItemProps[]
}) {
  const [showTop, setShowTop] = useState(true)
  const displayItems = items || (showTop ? topItems : bottomItems) || []

  return (
    <>
      <div className='mb-2 flex items-center justify-between'>
        <h3 className='text-muted-foreground text-[11px] font-bold tracking-[0.1em] uppercase'>
          {title}
        </h3>
        {topItems && bottomItems && (
          <div className='bg-muted flex rounded-md p-0.5'>
            <button
              onClick={() => setShowTop(true)}
              className={`rounded-sm px-3 py-1 text-[10px] font-medium transition-colors ${
                showTop
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Top
            </button>
            <button
              onClick={() => setShowTop(false)}
              className={`rounded-sm px-3 py-1 text-[10px] font-medium transition-colors ${
                !showTop
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Bottom
            </button>
          </div>
        )}
      </div>
      <div className='flex flex-col gap-4'>
        {displayItems.map((item, idx) => (
          <div key={idx} className='flex flex-col gap-1.5'>
            <div className='flex items-center justify-between text-[13px] leading-none font-medium'>
              <span className='text-foreground/90'>{item.label}</span>
              <span className='text-foreground'>{item.value}%</span>
            </div>
            <div className='bg-muted h-1.5 w-full overflow-hidden rounded-full'>
              <div
                className={`h-full ${item.color || 'bg-blue-600'} rounded-full`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export function EngagementCard({
  title,
  description,
  titleColorClass,
  rate,
  rateColor,
  rightContent,
}: {
  title: string
  description?: string
  titleColorClass: string
  rate: number
  rateColor: string
  rightContent: React.ReactNode
}) {
  return (
    <Card className='bg-card'>
      <CardContent className='flex flex-col p-0 md:flex-row'>
        <div className='border-border/50 flex flex-col items-center justify-between gap-4 border-r py-6 md:w-2/5'>
          <div className='flex flex-col items-center gap-1.5 text-center'>
            <h3
              className={`text-[11px] font-bold ${titleColorClass} tracking-[0.15em] uppercase`}
            >
              {title}
            </h3>
            {description && (
              <p className='text-muted-foreground px-4 text-[10px] leading-relaxed'>
                {description}
              </p>
            )}
          </div>
          <EngagementRateChart value={rate} color={rateColor} />
        </div>
        <div className='flex flex-col gap-2 p-6 md:w-3/5'>{rightContent}</div>
      </CardContent>
    </Card>
  )
}

export interface AnalyticsEngagementSectionProps {
  callbackRate: number
  callbackDescription?: string
  feedbackRate: number
  feedbackDescription?: string
  topActions: ActionItemProps[]
  bottomActions: ActionItemProps[]
  ratings: ActionItemProps[]
}

export function AnalyticsEngagementSection({
  callbackRate,
  callbackDescription,
  feedbackRate,
  feedbackDescription,
  topActions,
  bottomActions,
  ratings,
}: AnalyticsEngagementSectionProps) {
  return (
    <div className='grid gap-4 lg:grid-cols-2'>
      <EngagementCard
        title='Callback Rate'
        description={callbackDescription}
        titleColorClass='text-blue-500'
        rate={callbackRate}
        rateColor='#3b82f6'
        rightContent={
          <EngagementList
            title='CTA Performance'
            topItems={topActions}
            bottomItems={bottomActions}
          />
        }
      />
      <EngagementCard
        title='Feedback Rate'
        description={feedbackDescription}
        titleColorClass='text-emerald-500'
        rate={feedbackRate}
        rateColor='#10b981'
        rightContent={
          <EngagementList title='Rating Distribution' items={ratings} />
        }
      />
    </div>
  )
}
