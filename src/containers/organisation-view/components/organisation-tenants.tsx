import { useState } from 'react'
import {
  Pencil,
  Trash2,
  ChevronDown,
  Shield,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useOrganisationView } from '../use-organisation-view.hook'
import { OrganisationTenant } from '@/api/organisation'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

function TenantStats({
  summary,
}: {
  summary?: { total: number; active: number; inactive: number }
}) {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
      <div className='flex flex-col justify-center rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900'>
        <div className='mb-1 text-[13px] font-semibold text-slate-500 dark:text-slate-400'>
          Total Tenants
        </div>
        <div className='text-[34px] leading-none font-bold text-slate-900 dark:text-white'>
          {summary?.total || 0}
        </div>
      </div>
      <div className='flex flex-col justify-center rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900'>
        <div className='mb-1 text-[13px] font-semibold text-slate-500 dark:text-slate-400'>
          Active Tenants
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-[34px] leading-none font-bold text-slate-900 dark:text-white'>
            {summary?.active || 0}
          </span>
          <div className='mt-1 h-2 w-2 rounded-full bg-emerald-500'></div>
        </div>
      </div>
      <div className='flex flex-col justify-center rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900'>
        <div className='mb-1 text-[13px] font-semibold text-slate-500 dark:text-slate-400'>
          Inactive
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-[34px] leading-none font-bold text-slate-300 dark:text-slate-600'>
            {summary?.inactive || 0}
          </span>
          <div className='mt-1 h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-700'></div>
        </div>
      </div>
    </div>
  )
}

function TenantList({
  tenants,
  expandedId,
  setExpandedId,
}: {
  tenants: OrganisationTenant[]
  expandedId: string | null
  setExpandedId: (id: string | null) => void
}) {
  return (
    <div className='space-y-4 pt-2'>
      {tenants.map((tenant) => {
        const isExpanded = expandedId === tenant.tenant_id

        return (
          <div
            key={tenant.tenant_id}
            className='overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
          >
            <div
              className='flex cursor-pointer flex-col justify-between gap-4 p-4 transition-colors hover:bg-slate-50/50 md:flex-row md:items-center md:gap-0 dark:hover:bg-slate-800/30'
              onClick={() =>
                setExpandedId(isExpanded ? null : tenant.tenant_id)
              }
            >
              <div className='flex items-start justify-between'>
                {/* User Details */}
                <div className='group flex items-center gap-4 overflow-hidden md:w-[300px]'>
                  <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600 transition-colors group-hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:group-hover:bg-blue-900/50'>
                    {tenant.tenant_name.charAt(0).toUpperCase()}
                  </div>
                  <div className='flex flex-col overflow-hidden'>
                    <span className='truncate text-[15px] font-semibold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400'>
                      {tenant.tenant_name}
                    </span>
                    <span className='truncate text-sm text-slate-500'>
                      {tenant.tenant_email}
                    </span>
                  </div>
                </div>
                {/* Actions mobile only */}
                <div
                  className='hidden shrink-0 items-center gap-1.5'
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-9 w-9 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800'
                  >
                    <Pencil className='h-[18px] w-[18px]' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-9 w-9 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20'
                  >
                    <Trash2 className='h-[18px] w-[18px]' />
                  </Button>
                </div>
              </div>

              <div className='flex flex-1 flex-wrap items-center justify-between gap-4 sm:pl-[64px] md:flex-nowrap md:gap-0 md:pl-0'>
                {/* Role */}
                <div className='flex w-[calc(50%-8px)] flex-col gap-1.5 md:w-[140px]'>
                  <span className='text-[10px] font-bold tracking-widest text-slate-400 uppercase'>
                    Role
                  </span>
                  <div>
                    {tenant.role === 'ADMIN' ? (
                      <Badge
                        variant='secondary'
                        className='rounded-md border-none bg-blue-50 px-3 py-1 text-[11px] font-bold tracking-wide text-blue-600 uppercase hover:bg-blue-50 hover:text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                      >
                        {tenant.role}
                      </Badge>
                    ) : (
                      <Badge
                        variant='secondary'
                        className='rounded-md border-none bg-slate-100 px-3 py-1 text-[11px] font-bold tracking-wide text-slate-600 uppercase hover:bg-slate-100 hover:text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                      >
                        {tenant.role}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className='flex w-[calc(50%-8px)] flex-col gap-1.5 md:w-[140px]'>
                  <span className='text-[10px] font-bold tracking-widest text-slate-400 uppercase'>
                    Status
                  </span>
                  <div>
                    {tenant.role_active ? (
                      <Badge
                        variant='secondary'
                        className='flex w-fit items-center gap-1.5 rounded-md border-none bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-600 hover:bg-emerald-50 hover:text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                      >
                        <div className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
                        Active
                      </Badge>
                    ) : (
                      <Badge
                        variant='secondary'
                        className='flex w-fit items-center gap-1.5 rounded-md border-none bg-slate-50 px-3 py-1 text-[11px] font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                      >
                        <div className='h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500' />
                        Inactive
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Onboarded */}
                <div className='flex w-[calc(50%-8px)] flex-col gap-1.5 md:w-[160px]'>
                  <span className='text-[10px] font-bold tracking-widest text-slate-400 uppercase'>
                    Onboarded
                  </span>
                  <div className='flex items-center gap-1.5 text-[15px] font-medium text-slate-600'>
                    {tenant.onboarded ? 'Yes' : 'No'}
                  </div>
                </div>

                {/* Actions Desktop */}
                <div
                  className='flex w-[100px] items-center justify-end gap-1.5'
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-9 w-9 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800'
                  >
                    <Pencil className='h-[18px] w-[18px]' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-9 w-9 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20'
                  >
                    <Trash2 className='h-[18px] w-[18px]' />
                  </Button>
                </div>
              </div>
            </div>

            {/* Expanded Content (Placeholder for more details if needed) */}
            {isExpanded && (
              <div className='border-t border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-slate-800 dark:bg-slate-900/50'>
                <div className='mb-4 flex items-center gap-2.5'>
                  <Shield className='h-[18px] w-[18px] fill-blue-50 text-blue-500' />
                  <span className='text-[11px] font-bold tracking-widest text-slate-500 uppercase'>
                    Tenant ID
                  </span>
                </div>
                <div className='text-sm text-slate-600 dark:text-slate-300'>
                  {tenant.tenant_id}
                </div>
                <div className='mt-4 flex items-center gap-2.5'>
                  <span className='text-[11px] font-bold tracking-widest text-slate-500 uppercase'>
                    Created At
                  </span>
                </div>
                <div className='text-sm text-slate-600 dark:text-slate-300'>
                  {new Date(tenant.created_at).toLocaleString()}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function TenantPagination({
  page,
  limit,
  total,
  setPage,
  setLimit,
}: {
  page: number
  limit: number
  total: number
  setPage: (page: number) => void
  setLimit: (limit: number) => void
}) {
  const totalPages = Math.ceil(total / limit)
  const from = (page - 1) * limit + 1
  const to = Math.min(page * limit, total)

  return (
    <div className='flex flex-col items-center justify-between gap-4 pt-4 pb-2 text-[13px] text-slate-500 sm:flex-row sm:gap-0'>
      <div className='w-full text-center sm:w-auto sm:text-left'>
        Showing{' '}
        <span className='font-semibold text-slate-700 dark:text-slate-300'>
          {from} - {to}
        </span>{' '}
        of{' '}
        <span className='font-semibold text-slate-700 dark:text-slate-300'>
          {total}
        </span>{' '}
        results
      </div>
      <div className='flex w-full items-center justify-between gap-4 sm:w-auto'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='flex cursor-pointer items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 font-medium transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800'>
              <span>{limit} / page</span>
              <ChevronDown className='h-4 w-4 text-slate-400' />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {[10, 20, 50, 100].map((pageSize) => (
              <DropdownMenuItem
                key={pageSize}
                onClick={() => {
                  setLimit(pageSize)
                  setPage(1)
                }}
              >
                {pageSize} / page
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='icon'
            className='h-8 w-8 rounded-md border-slate-200 bg-white text-slate-500 disabled:opacity-50 dark:bg-slate-900'
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='h-8 w-8 rounded-md border-slate-200 bg-white text-blue-600 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-blue-400'
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages}
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export function OrganisationTenants() {
  const {
    tenantsResponse,
    tenantPage,
    setTenantPage,
    tenantLimit,
    setTenantLimit,
    tenantSearch,
    setTenantSearch,
    tenantStatus,
    setTenantStatus,
  } = useOrganisationView()

  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
        <div>
          <h2 className='text-lg font-bold tracking-tight'>
            Organization Tenants
          </h2>
          <p className='text-muted-foreground text-sm'>
            Manage users, permissions and roles within your tenant ecosystem.
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <div className='relative w-[240px]'>
            <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400' />
            <Input
              placeholder='Search tenants...'
              className='pl-9'
              value={tenantSearch || ''}
              onChange={(e) => setTenantSearch(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='gap-2'>
                {tenantStatus || 'All Status'}
                <ChevronDown className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => setTenantStatus(undefined)}>
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTenantStatus('active')}>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTenantStatus('inactive')}>
                Inactive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <TenantStats summary={tenantsResponse?.summary} />

      <TenantList
        tenants={tenantsResponse?.tenants || []}
        expandedId={expandedId}
        setExpandedId={setExpandedId}
      />

      <TenantPagination
        page={tenantPage}
        limit={tenantLimit}
        total={tenantsResponse?.meta.total || 0}
        setPage={setTenantPage}
        setLimit={setTenantLimit}
      />
    </div>
  )
}
