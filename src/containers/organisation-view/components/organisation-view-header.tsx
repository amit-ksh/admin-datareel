import { Badge } from '@/components/ui/badge'
import { Calendar, Building2, Lock, Unlock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useOrganisationView } from '../use-organisation-view.hook'
import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export function OrganisationViewHeader() {
  const { organisation, unlockOrganisation, isUnlocking } =
    useOrganisationView()

  if (!organisation) return null

  return (
    <div className='mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-3'>
          <Avatar className='size-16 rounded-lg'>
            <AvatarImage
              src={organisation.organisation_logo || ''}
              alt={organisation.organisation_name}
            />
            <AvatarFallback className='rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500'>
              <Building2 className='size-8' />
            </AvatarFallback>
          </Avatar>
          <div>
            <div className='flex items-center gap-2'>
              <h1 className='text-foreground text-2xl font-bold tracking-tight'>
                {organisation.organisation_name}
              </h1>
              <Badge
                variant='secondary'
                className='bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400'
              >
                Active
              </Badge>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    size='sm'
                    variant='outline'
                    className={`h-6 rounded-md px-2 py-0 text-[10px] font-semibold ${
                      organisation.unlocked
                        ? 'bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-900/40 dark:text-amber-400'
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/40 dark:text-blue-400'
                    }`}
                  >
                    {organisation.unlocked ? (
                      <>
                        <Lock className='mr-1 h-3 w-3' />
                        Lock Organisation
                      </>
                    ) : (
                      <>
                        <Unlock className='mr-1 h-3 w-3' />
                        Unlock Organisation
                      </>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-80' side='bottom' align='start'>
                  <div className='space-y-4'>
                    <div className='space-y-2'>
                      <h4 className='leading-none font-medium'>
                        {organisation.unlocked
                          ? 'Lock Organisation'
                          : 'Unlock Organisation'}
                      </h4>
                      <p className='text-muted-foreground text-sm'>
                        Are you sure you want to{' '}
                        {organisation.unlocked ? 'lock' : 'unlock'}{' '}
                        <strong>{organisation.organisation_name}</strong>?
                      </p>
                    </div>
                    <div className='flex justify-end gap-2'>
                      <Button
                        size='sm'
                        variant={
                          organisation.unlocked ? 'destructive' : 'default'
                        }
                        onClick={() => {
                          if (!organisation.unlocked) {
                            unlockOrganisation({ unlock_type: 'organisation' })
                          } else {
                            // TODO: Add lockOrganisation mutation here
                            console.log('Lock organisation API not implemented')
                          }
                        }}
                        disabled={isUnlocking}
                      >
                        {isUnlocking ? 'Processing...' : 'Confirm'}
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className='text-muted-foreground mt-1 flex items-center gap-4 text-sm'>
              <span className='flex items-center gap-1.5'>
                <span className='text-foreground font-medium'>ID:</span>{' '}
                {organisation.id}
              </span>
              <span className='flex items-center gap-1.5'>
                <Calendar className='h-4 w-4' />
                Joined{' '}
                {format(new Date(organisation.created_at), 'MMM d, yyyy')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
