import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Building2 } from 'lucide-react'
import { CloneOrganisationDialog } from './clone-organisation-dialog'

export function OrganisationViewHeader() {
  return (
    <div className='mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-3'>
          <div className='flex size-16 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500'>
            <Building2 className='size-8' />
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <h1 className='text-foreground text-2xl font-bold tracking-tight'>
                Acme Inc.
              </h1>
              <Badge
                variant='secondary'
                className='bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400'
              >
                Active
              </Badge>
            </div>
            <div className='text-muted-foreground mt-1 flex items-center gap-4 text-sm'>
              <span className='flex items-center gap-1.5'>
                <span className='text-foreground font-medium'>ID:</span>{' '}
                ORG-123456
              </span>
              <span className='flex items-center gap-1.5'>
                <Calendar className='h-4 w-4' />
                Joined Oct 12, 2026
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-full items-center gap-3 sm:w-auto'>
        <CloneOrganisationDialog />
      </div>
    </div>
  )
}
