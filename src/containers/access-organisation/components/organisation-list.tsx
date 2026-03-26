'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Building2,
  LogIn,
  Search,
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  Loader2,
} from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'
import { Organisation } from '@/api/organisation'
import ErrorState from '@/components/common/error-state'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useAccessOrganisation } from '../use-access-organisation.hook'
import { AxiosError } from 'axios'

function OrganisationCard({
  org,
  onLogin,
  loading,
}: {
  org: Organisation
  onLogin: (org: Organisation) => void
  loading?: boolean
}) {
  return (
    <Card className='border transition-shadow duration-200 hover:shadow-sm'>
      <CardContent className='flex items-center justify-between p-4'>
        <div className='flex items-center gap-4'>
          {/* Icon/Logo */}
          <Avatar className='h-14 w-14 rounded-lg border'>
            <AvatarImage
              src={org.organisation_logo || undefined}
              alt={org.organisation_name}
              className='object-cover'
            />
            <AvatarFallback className='bg-muted/60 rounded-lg'>
              <Building2 className='text-muted-foreground h-7 w-7' />
            </AvatarFallback>
          </Avatar>

          {/* Org Info */}
          <div className='space-y-1'>
            <div className='flex items-center gap-2'>
              <p className='text-foreground text-sm font-bold'>
                {org.organisation_name}
              </p>
              {org.unlocked ? (
                <CheckCircle2 className='h-3.5 w-3.5 text-green-500' />
              ) : (
                <XCircle className='h-3.5 w-3.5 text-gray-300' />
              )}
            </div>

            <div className='grid grid-cols-2 gap-x-4 gap-y-1 sm:flex sm:items-center sm:gap-4'>
              <div className='flex items-center gap-1.5'>
                <CalendarIcon className='text-muted-foreground h-3.5 w-3.5' />
                <span className='text-muted-foreground text-xs'>
                  Joined {format(new Date(org.created_at), 'PP')}
                </span>
              </div>
              <div className='flex items-center gap-1.5'>
                <Building2 className='text-muted-foreground h-3.5 w-3.5' />
                <span className='text-muted-foreground text-xs'>
                  Tenant: {org.tenant_id.slice(0, 8)}...
                </span>
              </div>
            </div>

            <div className='flex gap-2'>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] ${org?.onboarding_status?.email_verified ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}
              >
                {org?.onboarding_status?.email_verified
                  ? 'Email Verified'
                  : 'Email Pending'}
              </span>
              {org.enable_cdn && (
                <span className='rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] text-blue-700'>
                  CDN Enabled
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Login Button */}
        <Button
          variant='outline'
          size='sm'
          disabled={loading}
          className='h-9 border-blue-200 bg-blue-50 px-4 text-sm font-medium text-blue-600 transition-colors hover:border-blue-300 hover:bg-blue-100 hover:text-blue-700'
          onClick={() => onLogin(org)}
        >
          {loading ? (
            <>
              Accessing...
              <Loader2 className='ml-2 h-3.5 w-3.5 animate-spin' />
            </>
          ) : (
            <>
              Login
              <LogIn className='ml-2 h-3.5 w-3.5' />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

export function OrganisationSkeleton() {
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

export function OrganisationList() {
  const {
    data,
    isLoading,
    isAccessPending,
    isError,
    error,
    search,
    page,
    handleSearch,
    handleOrgLogin,
    updateQueryParams,
    refetch,
  } = useAccessOrganisation()

  const totalPages = data ? Math.ceil(data.meta.total / data.meta.limit) : 0

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
        </div>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <OrganisationSkeleton />
      ) : isError ? (
        <ErrorState error={error as AxiosError} onRetry={() => refetch()} />
      ) : !data?.docs || data?.docs.length === 0 ? (
        <div className='bg-muted/20 flex flex-col items-center justify-center rounded-xl border border-dashed py-12'>
          <Building2 className='text-muted-foreground/40 mb-3 h-12 w-12' />
          <p className='text-muted-foreground text-sm font-medium'>
            No organisations found
          </p>
        </div>
      ) : (
        <div className='flex flex-col gap-3'>
          {data?.docs.map((org) => (
            <OrganisationCard
              key={org.id}
              org={org}
              onLogin={handleOrgLogin}
              loading={isAccessPending}
            />
          ))}

          {/* Pagination Footer */}
          {data && totalPages > 1 && (
            <div className='mt-4 flex items-center justify-between py-2'>
              <p className='text-muted-foreground text-xs'>
                Showing {(page - 1) * data.meta.limit + 1} to{' '}
                {Math.min(page * data.meta.limit, data.meta.total)} of{' '}
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
                  disabled={page >= totalPages}
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
