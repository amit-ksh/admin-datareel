'use client'

import { useCallback, useMemo } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import Image from 'next/image'
import { AxiosError } from 'axios'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Building2,
  LogIn,
  ArrowUpDown,
  Search,
  Calendar as CalendarIcon,
  Video,
  Eye,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'
import {
  useListOrganisations,
  Organisation,
  ListOrganisationsParams,
} from '@/api/organisation'
import { useImpersonateLogin } from '@/api/auth'
import ErrorState from '@/components/common/error-state'
import { Badge } from '@/components/ui/badge'

function OrganisationCard({
  org,
  onLogin,
}: {
  org: Organisation
  onLogin: (org: Organisation) => void
}) {
  return (
    <Card className='border transition-shadow duration-200 hover:shadow-sm'>
      <CardContent className='flex items-center justify-between p-4'>
        <div className='flex items-center gap-4'>
          {/* Icon/Logo */}
          <div className='bg-muted/60 relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border'>
            {org.logo ? (
              <Image
                src={org.logo}
                alt={org.name}
                fill
                className='object-cover'
              />
            ) : (
              <Building2 className='text-muted-foreground h-7 w-7' />
            )}
          </div>

          {/* Org Info */}
          <div className='space-y-1'>
            <div className='flex items-center gap-2'>
              <p className='text-foreground text-sm font-bold'>{org.name}</p>
              {org.onboarded ? (
                <CheckCircle2 className='h-3.5 w-3.5 text-green-500' />
              ) : (
                <XCircle className='h-3.5 w-3.5 text-gray-300' />
              )}
            </div>

            <div className='grid grid-cols-2 gap-x-4 gap-y-1 sm:flex sm:items-center sm:gap-4'>
              <div className='flex items-center gap-1.5'>
                <CalendarIcon className='text-muted-foreground h-3.5 w-3.5' />
                <span className='text-muted-foreground text-xs'>
                  Joined {format(new Date(org.joined_at), 'PP')}
                </span>
              </div>
              <div className='flex items-center gap-1.5'>
                <Video className='text-muted-foreground h-3.5 w-3.5' />
                <span className='text-muted-foreground text-xs'>
                  {org.total_videos} Videos
                </span>
              </div>
              <div className='flex items-center gap-1.5'>
                <Eye className='text-muted-foreground h-3.5 w-3.5' />
                <span className='text-muted-foreground text-xs'>
                  {org.views.toLocaleString()} Views
                </span>
              </div>
              <div className='flex items-center gap-1.5'>
                <Building2 className='text-muted-foreground h-3.5 w-3.5' />
                <span className='text-muted-foreground text-xs'>
                  {org.activeTenants ?? 0} Tenants
                </span>
              </div>
            </div>

            {org.last_video_creation_date && (
              <p className='text-muted-foreground text-[10px]'>
                Last video:{' '}
                {format(new Date(org.last_video_creation_date), 'PP')}
              </p>
            )}
          </div>
        </div>

        {/* Login Button */}
        <Button
          variant='outline'
          size='sm'
          className='h-9 border-blue-200 bg-blue-50 px-4 text-sm font-medium text-blue-600 transition-colors hover:border-blue-300 hover:bg-blue-100 hover:text-blue-700'
          onClick={() => onLogin(org)}
        >
          Login
          <LogIn className='ml-2 h-3.5 w-3.5' />
        </Button>
      </CardContent>
    </Card>
  )
}

function OrganisationSkeleton() {
  return (
    <div className='flex flex-col gap-3'>
      {[1, 2, 3].map((i) => (
        <Card key={i} className='border'>
          <CardContent className='flex items-center justify-between p-4'>
            <div className='flex items-center gap-4'>
              <Skeleton className='h-14 w-14 rounded-lg' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-32' />
                <div className='flex gap-4'>
                  <Skeleton className='h-3 w-20' />
                  <Skeleton className='h-3 w-20' />
                  <Skeleton className='h-3 w-20' />
                </div>
              </div>
            </div>
            <Skeleton className='h-9 w-24' />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

interface OrganisationListProps {
  email?: string
}

export function OrganisationList({ email }: OrganisationListProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get('page')) || 1
  const page_limit = Number(searchParams.get('page_limit')) || 10
  const search = searchParams.get('search') || ''
  const onboarded =
    searchParams.get('onboarded') === 'true'
      ? true
      : searchParams.get('onboarded') === 'false'
        ? false
        : undefined
  const sort_by = (searchParams.get('sort_by') ||
    'joined_at') as ListOrganisationsParams['sort_by']
  const sort_order = (searchParams.get('sort_order') ||
    'desc') as ListOrganisationsParams['sort_order']

  const params: ListOrganisationsParams = useMemo(
    () => ({
      page,
      page_limit,
      search: email || search || undefined,
      onboarded,
      sort_by,
      sort_order,
    }),
    [page, page_limit, search, email, onboarded, sort_by, sort_order],
  )

  const { data, isLoading, isError, error, refetch } =
    useListOrganisations(params)

  const { mutate: impersonateLogin, isPending: isLoggingIn } =
    useImpersonateLogin()

  const handleOrgLogin = (org: Organisation) => {
    if (email) {
      impersonateLogin({ org_id: org.id, email })
    }
  }

  const updateQueryParams = useCallback(
    (updates: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams.toString())
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          newParams.delete(key)
        } else {
          newParams.set(key, value)
        }
      })
      router.push(`${pathname}?${newParams.toString()}`)
    },
    [pathname, router, searchParams],
  )

  const handleSearch = (val: string) => {
    updateQueryParams({ search: val || null, page: '1' })
  }

  const handleSort = (key: string) => {
    const order = sort_by === key && sort_order === 'desc' ? 'asc' : 'desc'
    updateQueryParams({ sort_by: key, sort_order: order, page: '1' })
  }

  const handleOnboardedFilter = (val: string) => {
    updateQueryParams({ onboarded: val === 'all' ? null : val, page: '1' })
  }

  return (
    <div className='space-y-6'>
      {/* Section Header */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center gap-2.5'>
          <h2 className='text-foreground text-xl font-bold tracking-tight'>
            Organisations
          </h2>
          {!isLoading && data && (
            <Badge
              variant='secondary'
              className='h-6 min-w-6 rounded-full px-2'
            >
              {data.meta.total}
            </Badge>
          )}
        </div>
        {/* Filters Bar */}
        <div className='flex flex-wrap items-center gap-3'>
          <div className='relative min-w-[200px] flex-1'>
            <Search className='text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4' />
            <Input
              placeholder='Search organisations...'
              className='bg-background pl-9'
              defaultValue={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                size='sm'
                className='bg-background hover:bg-muted/50 h-9 px-4 text-sm font-medium'
              >
                <ArrowUpDown className='h-3.5 w-3.5' />
                Sort By:{' '}
                <span className='capitalize'>
                  {(sort_by || '').replace('_', ' ')}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-48'>
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleSort('joined_at')}>
                Joined At{' '}
                {sort_by === 'joined_at' && (sort_order === 'desc' ? '↓' : '↑')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('feedback_score')}>
                Feedback Score{' '}
                {sort_by === 'feedback_score' &&
                  (sort_order === 'desc' ? '↓' : '↑')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('videos')}>
                Total Videos{' '}
                {sort_by === 'videos' && (sort_order === 'desc' ? '↓' : '↑')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('last_video')}>
                Last Video{' '}
                {sort_by === 'last_video' &&
                  (sort_order === 'desc' ? '↓' : '↑')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <OrganisationSkeleton />
      ) : isError ? (
        <ErrorState error={error as AxiosError} onRetry={() => refetch()} />
      ) : data?.data.length === 0 ? (
        <div className='bg-muted/20 flex flex-col items-center justify-center rounded-xl border border-dashed py-12'>
          <Building2 className='text-muted-foreground/40 mb-3 h-12 w-12' />
          <p className='text-muted-foreground text-sm font-medium'>
            No organisations found
          </p>
          <Button
            variant='link'
            onClick={() => router.push(pathname)}
            className='mt-1'
          >
            Clear all filters
          </Button>
        </div>
      ) : (
        <div className='flex flex-col gap-3'>
          {data?.data.map((org) => (
            <OrganisationCard key={org.id} org={org} onLogin={handleOrgLogin} />
          ))}

          {/* Pagination could go here */}
          {data && data.meta.last_page > 1 && (
            <div className='mt-4 flex items-center justify-between py-2'>
              <p className='text-muted-foreground text-xs'>
                Showing {(page - 1) * page_limit + 1} to{' '}
                {Math.min(page * page_limit, data.meta.total)} of{' '}
                {data.meta.total}
              </p>
              <div className='flex items-center gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  disabled={page <= 1}
                  onClick={() =>
                    updateQueryParams({ page: (page - 1).toString() })
                  }
                >
                  Previous
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  disabled={page >= data.meta.last_page}
                  onClick={() =>
                    updateQueryParams({ page: (page + 1).toString() })
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
