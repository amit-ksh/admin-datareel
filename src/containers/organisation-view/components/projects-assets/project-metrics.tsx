import { Organisation } from '@/types/organisation'
import { Folder, LayoutDashboard, Users } from 'lucide-react'
import { MetricCard, ProgressBar } from './shared-components'

interface ProjectMetricsProps {
  counts: Organisation['counts']
}

export function ProjectMetrics({ counts }: ProjectMetricsProps) {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
      {/* Total Pipelines */}
      <MetricCard
        title='Total Pipelines'
        value={(counts?.pipelines ?? 0).toString()}
        icon={
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50'>
            <Folder className='h-5 w-5 fill-blue-500 text-blue-500' />
          </div>
        }
      />

      {/* Clusters */}
      <MetricCard
        title='Total Clusters'
        value={(counts?.clusters ?? 0).toString()}
        icon={
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50'>
            <Folder className='h-5 w-5 fill-indigo-500 text-indigo-500' />
          </div>
        }
      />

      {/* Templates */}
      <MetricCard
        title='Templates'
        value={(counts?.templates ?? 0).toString()}
        icon={
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50'>
            <LayoutDashboard className='h-5 w-5 fill-purple-500 text-purple-500' />
          </div>
        }
      />

      {/* Persona */}
      <MetricCard
        title='Persona'
        value={(counts?.personas ?? 0).toString()}
        icon={
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50'>
            <Users className='h-5 w-5 fill-orange-500 text-orange-500' />
          </div>
        }
      >
        <div className='mt-1 space-y-1'>
          <div className='text-muted-foreground flex justify-between text-[11px] font-medium'>
            <span>Onboarded: {counts?.personas ?? 0}</span>
            <span className='text-blue-500'>
              Total: {counts?.personas ?? 0}
            </span>
          </div>
          <ProgressBar
            segments={[{ width: '100%', colorClass: 'bg-blue-500' }]}
            className='bg-muted/50 h-1.5'
          />
        </div>
      </MetricCard>
    </div>
  )
}
