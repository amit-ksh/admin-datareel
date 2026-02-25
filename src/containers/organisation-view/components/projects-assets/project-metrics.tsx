import {
  TrendingUp,
  Folder,
  LayoutDashboard,
  PlusCircle,
  Users,
} from 'lucide-react'
import { MetricCard, StatBadge, ProgressBar } from './shared-components'

export function ProjectMetrics() {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
      {/* Total Projects */}
      <MetricCard
        title='Total Projects'
        value='12'
        subtitle={
          <p className='flex items-center gap-1 text-sm font-medium text-emerald-500'>
            <TrendingUp className='h-4 w-4' />
            +12% this month
          </p>
        }
        icon={
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50'>
            <Folder className='h-5 w-5 fill-blue-500 text-blue-500' />
          </div>
        }
      />

      {/* Video Layouts */}
      <MetricCard
        title='Video Layouts'
        value='4'
        subtitle={
          <p className='flex items-center gap-1 text-sm font-medium text-emerald-500'>
            <PlusCircle className='h-4 w-4' />1 new
          </p>
        }
        icon={
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50'>
            <LayoutDashboard className='h-5 w-5 fill-purple-500 text-purple-500' />
          </div>
        }
      />

      {/* Persona */}
      <MetricCard
        title='Persona'
        value='23'
        icon={
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50'>
            <Users className='h-5 w-5 fill-orange-500 text-orange-500' />
          </div>
        }
      >
        <div className='mt-1 space-y-1'>
          <div className='text-muted-foreground flex justify-between text-[11px] font-medium'>
            <span>Onboarded: 18</span>
            <span className='text-blue-500'>Total: 23</span>
          </div>
          <ProgressBar
            segments={[{ width: '78%', colorClass: 'bg-blue-500' }]}
            className='bg-muted/50 h-1.5'
          />
        </div>
        <div className='flex gap-2 pt-2'>
          <StatBadge
            label='ONBOARDED'
            value='18'
            valueClassName='text-blue-500'
          />
          <StatBadge
            label='PENDING'
            value='5'
            valueClassName='text-muted-foreground'
          />
        </div>
      </MetricCard>
    </div>
  )
}
