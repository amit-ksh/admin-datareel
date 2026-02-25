import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ReactNode } from 'react'

export interface MetricCardProps {
  title: string
  value?: ReactNode
  icon?: ReactNode
  subtitle?: ReactNode
  children?: ReactNode
  className?: string
}

export function MetricCard({
  title,
  value,
  icon,
  subtitle,
  children,
  className,
}: MetricCardProps) {
  return (
    <Card className={`flex flex-col rounded-xl border p-4 ${className || ''}`}>
      <CardContent className='flex h-full flex-1 flex-col p-0'>
        <div className='flex h-full items-start justify-between'>
          <div className='flex h-full w-full flex-col justify-between gap-1.5'>
            <div>
              <p className='text-muted-foreground text-[11px] font-bold tracking-wider uppercase'>
                {title}
              </p>
              {value !== undefined && (
                <div className='mt-1 flex items-center gap-2'>
                  <span className='text-3xl font-bold'>{value}</span>
                </div>
              )}
            </div>
            {subtitle && <div className='mt-auto pt-1.5'>{subtitle}</div>}
            {children && (
              <div className='mt-auto w-full pt-1.5'>{children}</div>
            )}
          </div>
          {icon && icon}
        </div>
      </CardContent>
    </Card>
  )
}

export function StatBadge({
  label,
  value,
  valueClassName = '',
}: {
  label: string
  value: string | number
  valueClassName?: string
}) {
  return (
    <div className='bg-muted/20 border-muted/30 flex flex-1 flex-col items-center justify-center rounded-lg border py-1'>
      <span className='text-muted-foreground text-[10px] font-bold'>
        {label}
      </span>
      <span className={`text-sm leading-tight font-bold ${valueClassName}`}>
        {value}
      </span>
    </div>
  )
}

export function ProgressBar({
  segments,
  className = 'h-2 bg-muted/50',
}: {
  segments: { width: string | number; colorClass: string }[]
  className?: string
}) {
  return (
    <div className={`flex w-full overflow-hidden rounded-full ${className}`}>
      {segments.map((s, i) => (
        <div
          key={i}
          className={`h-full ${s.colorClass}`}
          style={{
            width: typeof s.width === 'number' ? `${s.width}%` : s.width,
          }}
        />
      ))}
    </div>
  )
}

export function DistributionItem({
  label,
  count,
  width,
  barColor,
  countColor,
}: {
  label: string
  count: number
  width: number | string
  barColor: string
  countColor: string
}) {
  return (
    <div className='space-y-1.5'>
      <div className='flex justify-between text-sm font-bold'>
        <span>{label}</span>
        <span className={`${countColor} font-semibold`}>{count}</span>
      </div>
      <ProgressBar
        segments={[{ width, colorClass: barColor }]}
        className='bg-muted/30 h-2'
      />
    </div>
  )
}

export function DistributionCard({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <Card className='gap-0 rounded-xl border'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-base font-bold'>{title}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-5 pt-4 pb-6'>{children}</CardContent>
    </Card>
  )
}
