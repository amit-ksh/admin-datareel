import { Organisation } from '@/types/organisation'
import { MetricCard, ProgressBar } from './shared-components'

interface AssetMetricsProps {
  counts: Organisation['counts']
}
import {
  User,
  Video,
  Mic,
  LayoutTemplate,
  Settings,
  Database,
} from 'lucide-react'

export function AssetMetrics({ counts }: AssetMetricsProps) {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {/* Avatars */}
      <MetricCard
        title='Avatars'
        value={(counts?.avatars ?? 0).toString()}
        icon={
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50'>
            <User className='h-5 w-5 fill-emerald-500 text-emerald-500' />
          </div>
        }
      >
        <div className='mt-1 space-y-1'>
          <div className='text-muted-foreground flex justify-between text-[11px] font-medium'>
            <span>Normal: 0</span>
            <span className='text-blue-500'>AI: {counts?.avatars ?? 0}</span>
          </div>
          <ProgressBar
            segments={[{ width: '100%', colorClass: 'bg-blue-500' }]}
            className='h-1.5'
          />
        </div>
      </MetricCard>

      {/* Content Videos */}
      <MetricCard
        title='Content Videos'
        value={(counts?.videos ?? 0).toString()}
        icon={
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-rose-50'>
            <Video className='h-5 w-5 fill-rose-500 text-rose-500' />
          </div>
        }
      >
        <div className='mt-1 space-y-1'>
          <div className='text-muted-foreground flex justify-between text-[11px] font-medium'>
            <span>Normal: 0</span>
            <span className='text-blue-500'>AI: {counts?.videos ?? 0}</span>
          </div>
          <ProgressBar
            segments={[{ width: '100%', colorClass: 'bg-blue-500' }]}
            className='h-1.5'
          />
        </div>
      </MetricCard>

      {/* Voices */}
      <MetricCard
        title='Voices'
        value={(counts?.voices ?? 0).toString()}
        icon={
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50'>
            <Mic className='h-5 w-5 fill-cyan-500 text-cyan-500' />
          </div>
        }
      >
        <div className='mt-1 space-y-3'>
          <div className='space-y-1.5'>
            <div className='flex justify-between text-[11px] font-medium'>
              <span className='text-blue-500'>Count</span>
              <span className='font-bold'>{counts?.voices ?? 0}</span>
            </div>
            <ProgressBar
              segments={[{ width: '100%', colorClass: 'bg-blue-500' }]}
              className='bg-muted/50 h-1.5'
            />
          </div>
        </div>
      </MetricCard>

      {/* Total Assets */}
      <MetricCard
        title='Total Assets'
        value={(counts?.assets ?? 0).toString()}
        icon={
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50'>
            <Database className='h-5 w-5 fill-amber-500 text-amber-500' />
          </div>
        }
      />

      {/* Content Templates */}
      <MetricCard
        title='Content Templates'
        value={(counts?.content_templates ?? 0).toString()}
        icon={
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50'>
            <LayoutTemplate className='h-5 w-5 fill-slate-500 text-slate-500' />
          </div>
        }
      />

      {/* Render Settings */}
      <MetricCard
        title='Render Settings'
        value={(counts?.render_settings ?? 0).toString()}
        icon={
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-50'>
            <Settings className='h-5 w-5 fill-zinc-500 text-zinc-500' />
          </div>
        }
      />
    </div>
  )
}
