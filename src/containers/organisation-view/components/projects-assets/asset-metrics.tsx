import { MetricCard, StatBadge, ProgressBar } from './shared-components'
import { User, Video, Mic } from 'lucide-react'

export function AssetMetrics() {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
      {/* Avatars */}
      <MetricCard
        title='Avatars'
        value='12'
        icon={
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50'>
            <User className='h-5 w-5 fill-emerald-500 text-emerald-500' />
          </div>
        }
      >
        <div className='mt-1 space-y-1'>
          <div className='text-muted-foreground flex justify-between text-[11px] font-medium'>
            <span>Normal: 4</span>
            <span className='text-blue-500'>AI: 8</span>
          </div>
          <ProgressBar
            segments={[
              { width: '33.3%', colorClass: 'bg-muted-foreground/30' },
              { width: '66.6%', colorClass: 'bg-blue-500' },
            ]}
            className='h-1.5'
          />
        </div>
        <div className='flex gap-2 pt-2'>
          <StatBadge
            label='COMPLETED'
            value='5'
            valueClassName='text-emerald-500'
          />
          <StatBadge
            label='PENDING'
            value='2'
            valueClassName='text-orange-500'
          />
          <StatBadge label='FAILED' value='1' valueClassName='text-red-500' />
        </div>
      </MetricCard>

      {/* Content Videos */}
      <MetricCard
        title='Content Videos'
        value='4'
        icon={
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-rose-50'>
            <Video className='h-5 w-5 fill-rose-500 text-rose-500' />
          </div>
        }
      >
        <div className='mt-1 space-y-1'>
          <div className='text-muted-foreground flex justify-between text-[11px] font-medium'>
            <span>Normal: 1</span>
            <span className='text-blue-500'>AI: 3</span>
          </div>
          <ProgressBar
            segments={[
              { width: '25%', colorClass: 'bg-muted-foreground/30' },
              { width: '75%', colorClass: 'bg-blue-500' },
            ]}
            className='h-1.5'
          />
        </div>
        <div className='flex gap-2 pt-2'>
          <StatBadge
            label='COMPLETED'
            value='2'
            valueClassName='text-emerald-500'
          />
          <StatBadge
            label='PENDING'
            value='1'
            valueClassName='text-orange-500'
          />
          <StatBadge label='FAILED' value='0' valueClassName='text-red-500' />
        </div>
      </MetricCard>

      {/* Voices */}
      <MetricCard
        title='Voices'
        value='23'
        icon={
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50'>
            <Mic className='h-5 w-5 fill-cyan-500 text-cyan-500' />
          </div>
        }
      >
        <div className='mt-1 space-y-3'>
          <div className='space-y-1.5'>
            <div className='flex justify-between text-[11px] font-medium'>
              <span className='text-blue-500'>Eleven Labs</span>
              <span className='font-bold'>15</span>
            </div>
            <ProgressBar
              segments={[{ width: '65%', colorClass: 'bg-blue-500' }]}
              className='bg-muted/50 h-1.5'
            />
          </div>
          <div className='space-y-1.5'>
            <div className='flex justify-between text-[11px] font-medium'>
              <span className='text-purple-500'>Sarvam</span>
              <span className='font-bold'>8</span>
            </div>
            <ProgressBar
              segments={[{ width: '35%', colorClass: 'bg-purple-500' }]}
              className='bg-muted/50 h-1.5'
            />
          </div>
        </div>
      </MetricCard>
    </div>
  )
}
