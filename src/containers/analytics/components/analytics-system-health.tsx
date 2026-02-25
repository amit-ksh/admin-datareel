import { Fingerprint, Video, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function AnalyticsSystemHealth() {
  const containers = [
    'running',
    'running',
    'running',
    'running',
    'running',
    'running',
    'running',
    'running',
    'running',
  ]

  const activeCount = containers.filter((c) => c === 'running').length

  return (
    <Card className='bg-card w-full'>
      <CardContent className='flex w-full flex-col items-center justify-between gap-4 p-4 px-4 sm:px-6 lg:flex-row lg:gap-0'>
        <div className='flex w-full min-w-max items-center justify-between lg:w-auto'>
          <div className='flex items-center gap-3 sm:gap-4'>
            <div className='flex items-center justify-center rounded-full bg-emerald-500/10 p-2'>
              <div className='h-2.5 w-2.5 rounded-full bg-emerald-500' />
            </div>
            <div className='flex flex-col'>
              <span className='text-foreground text-[13px] font-bold tracking-wider uppercase sm:text-sm'>
                System Health
              </span>
              <span className='text-[10px] font-semibold tracking-wider text-emerald-500 uppercase sm:text-xs'>
                All Services Operational
              </span>
            </div>
          </div>
          <button className='hover:bg-muted rounded-md p-2 transition-colors lg:hidden'>
            <ExternalLink className='text-muted-foreground h-5 w-5' />
          </button>
        </div>

        <div className='bg-border/50 mx-4 hidden h-8 w-px lg:block' />

        <div className='border-border/50 flex w-full flex-1 flex-col items-start justify-between gap-4 border-t pt-4 sm:flex-row sm:items-center sm:justify-around sm:gap-2 lg:max-w-4xl lg:border-t-0 lg:pt-0'>
          <div className='flex w-full items-center gap-3 sm:w-auto'>
            <Fingerprint className='text-muted-foreground h-5 w-5' />
            <div className='flex flex-col gap-0.5'>
              <span className='text-foreground text-sm font-bold'>
                Auth Service
              </span>
              <div className='flex items-center gap-1.5'>
                <div className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
                <span className='text-[11px] font-medium text-emerald-500'>
                  Running
                </span>
              </div>
            </div>
          </div>

          <div className='bg-border/50 block h-px w-full sm:hidden sm:h-8 sm:w-px' />

          <div className='flex w-full items-center gap-3 sm:w-auto'>
            <Video className='text-muted-foreground h-5 w-5' />
            <div className='flex flex-col gap-0.5'>
              <span className='text-foreground text-sm font-bold'>
                Video Service
              </span>
              <div className='flex items-center gap-1.5'>
                <div className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
                <span className='text-[11px] font-medium text-emerald-500'>
                  Running
                </span>
              </div>
            </div>
          </div>

          <div className='bg-border/50 block h-px w-full sm:hidden sm:h-8 sm:w-px' />

          <div className='flex w-full items-center gap-3 sm:w-auto'>
            <div className='grid grid-cols-3 gap-1'>
              {containers.map((status, i) => (
                <div
                  key={i}
                  className={`size-2 rounded-full ${
                    status === 'running'
                      ? 'bg-emerald-500'
                      : status === 'warning'
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                  }`}
                />
              ))}
            </div>
            <div className='flex flex-col gap-0.5'>
              <span className='text-foreground text-sm font-bold'>
                Containers
              </span>
              <span className='text-[11px] font-medium text-blue-400'>
                {activeCount}/{containers.length} Running
              </span>
            </div>
          </div>
        </div>

        <div className='bg-border/50 mx-4 hidden h-8 w-px lg:block' />

        <div className='hidden min-w-max items-center lg:flex'>
          <button className='hover:bg-muted rounded-md p-2 transition-colors'>
            <ExternalLink className='text-muted-foreground h-5 w-5' />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
