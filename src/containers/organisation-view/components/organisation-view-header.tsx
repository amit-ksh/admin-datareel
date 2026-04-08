import { Badge } from '@/components/ui/badge'
import {
  Calendar,
  Building2,
  Lock,
  Unlock,
  Copy,
  ExternalLink,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useOrganisationView } from '../use-organisation-view.hook'
import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { toast } from 'sonner'
import { useAccessClientApp } from '@/api/organisation'
import { useState } from 'react'

export function OrganisationViewHeader() {
  const { organisation, unlockOrganisation, isUnlocking } =
    useOrganisationView()
  const { mutate: accessApp, isPending: isAccessing } = useAccessClientApp()
  const [accessingId, setAccessingId] = useState<string | null>(null)

  const handleAccess = (e: React.MouseEvent, orgId: string) => {
    e.stopPropagation()
    setAccessingId(orgId)
    accessApp({
      organisationId: orgId,
    })
  }

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

              <Button
                variant='outline'
                size='sm'
                className='border-primary/20 hover:bg-primary/5 hover:text-primary h-6 gap-1.5 rounded-md px-2 py-0 text-[10px] font-semibold transition-all'
                onClick={(e) => handleAccess(e, organisation.id)}
                disabled={isAccessing && accessingId === organisation.id}
              >
                {isAccessing && accessingId === organisation.id ? (
                  <Loader2 className='h-3 w-3 animate-spin' />
                ) : (
                  <ExternalLink className='h-3 w-3' />
                )}
                Login
              </Button>
            </div>
            <div className='text-muted-foreground mt-1 flex items-center gap-4 text-sm'>
              <div className='flex items-center gap-1.5'>
                <span className='text-foreground font-medium'>ID:</span>
                <span className='line-clamp-1 max-w-[80px] font-mono text-[10px] font-normal opacity-70'>
                  {organisation.id}
                </span>
                <button
                  onClick={async (e) => {
                    try {
                      e.stopPropagation()
                      await navigator.clipboard.writeText(organisation.id)
                      toast.success('ID copied to clipboard')
                    } catch {
                      toast.error('Failed to copy ID')
                    }
                  }}
                  className='text-muted-foreground hover:text-foreground transition-colors'
                  aria-label='Copy ID'
                  type='button'
                >
                  <Copy className='h-3 w-3' />
                </button>
              </div>
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
