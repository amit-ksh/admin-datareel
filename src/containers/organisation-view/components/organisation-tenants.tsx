import { useState } from 'react'
import {
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronUp,
  Eye,
  Shield,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// Mock Data
const tenants = [
  {
    id: 1,
    name: 'Vamit',
    email: 'vamit2damor+7@gmail.com',
    role: 'ADMIN',
    status: 'Active',
    permissionsCount: 9,
    permissions: [
      'MANAGE ORGANISATION',
      'MANAGE PERMISSION',
      'CREATE TENANT',
      'MANAGE TENANT',
      'GLOBAL CONTENT MANAGER',
      'VIEW ANALYTICS',
      'CREATOR',
    ],
  },
  {
    id: 2,
    name: 'Aaditya Saini',
    email: 'aaditya@9ai.in',
    role: 'ADMIN',
    status: 'Active',
    permissionsCount: 11,
    permissions: ['VIEW ANALYTICS'],
  },
  {
    id: 3,
    name: 'Garvit Chouhan',
    email: '909garvit@gmail.com',
    role: 'ADMIN',
    status: 'Active',
    permissionsCount: 9,
    permissions: ['MANAGE ORGANISATION'],
  },
  {
    id: 4,
    name: 'test243',
    email: 'tes353535@yopmail.com',
    role: 'TEST',
    status: 'Inactive',
    permissionsCount: 0,
    permissions: [],
  },
]

function TenantStats() {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
      <div className='flex flex-col justify-center rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900'>
        <div className='mb-1 text-[13px] font-semibold text-slate-500 dark:text-slate-400'>
          Total Tenants
        </div>
        <div className='text-[34px] leading-none font-bold text-slate-900 dark:text-white'>
          20
        </div>
      </div>
      <div className='flex flex-col justify-center rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900'>
        <div className='mb-1 text-[13px] font-semibold text-slate-500 dark:text-slate-400'>
          Active Tenants
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-[34px] leading-none font-bold text-slate-900 dark:text-white'>
            17
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
            3
          </span>
          <div className='mt-1 h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-700'></div>
        </div>
      </div>
    </div>
  )
}

function TenantList({
  expandedId,
  setExpandedId,
}: {
  expandedId: number | null
  setExpandedId: (id: number | null) => void
}) {
  return (
    <div className='space-y-4 pt-2'>
      {tenants.map((tenant) => {
        const isExpanded = expandedId === tenant.id

        return (
          <div
            key={tenant.id}
            className='overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
          >
            <div
              className='flex cursor-pointer flex-col justify-between gap-4 p-4 transition-colors hover:bg-slate-50/50 md:flex-row md:items-center md:gap-0 dark:hover:bg-slate-800/30'
              onClick={() => setExpandedId(isExpanded ? null : tenant.id)}
            >
              <div className='flex items-start justify-between'>
                {/* User Details */}
                <div className='group flex items-center gap-4 overflow-hidden md:w-[300px]'>
                  <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600 transition-colors group-hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:group-hover:bg-blue-900/50'>
                    {tenant.name.charAt(0).toUpperCase()}
                  </div>
                  <div className='flex flex-col overflow-hidden'>
                    <span className='truncate text-[15px] font-semibold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400'>
                      {tenant.name}
                    </span>
                    <span className='truncate text-sm text-slate-500'>
                      {tenant.email}
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
                    {tenant.status === 'Active' ? (
                      <Badge
                        variant='secondary'
                        className='flex w-fit items-center gap-1.5 rounded-md border-none bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-600 hover:bg-emerald-50 hover:text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                      >
                        <div className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
                        {tenant.status}
                      </Badge>
                    ) : (
                      <Badge
                        variant='secondary'
                        className='flex w-fit items-center gap-1.5 rounded-md border-none bg-slate-50 px-3 py-1 text-[11px] font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                      >
                        <div className='h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500' />
                        {tenant.status}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Permissions */}
                <div className='flex w-[calc(50%-8px)] flex-col gap-1.5 md:w-[160px]'>
                  <span className='text-[10px] font-bold tracking-widest text-slate-400 uppercase'>
                    Permissions
                  </span>
                  <div className='flex items-center gap-1.5 text-[15px] font-medium text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white'>
                    {tenant.permissionsCount}{' '}
                    <span className='hidden sm:inline'>permissions</span>
                    {tenant.permissionsCount > 0 ? (
                      isExpanded ? (
                        <ChevronDown className='ml-0.5 h-[18px] w-[18px] text-slate-400' />
                      ) : (
                        <Eye className='ml-0.5 h-[18px] w-[18px] text-slate-400' />
                      )
                    ) : (
                      <Eye className='ml-0.5 h-[18px] w-[18px] text-slate-400 opacity-50' />
                    )}
                  </div>
                </div>

                {/* Actions Desktop */}
                <div
                  className='hidden w-[100px] items-center justify-end gap-1.5'
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

            {/* Expanded Permissions */}
            {isExpanded && tenant.permissions.length > 0 && (
              <div className='border-t border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-slate-800 dark:bg-slate-900/50'>
                <div className='mb-4 flex items-center gap-2.5'>
                  <Shield className='h-[18px] w-[18px] fill-blue-50 text-blue-500' />
                  <span className='text-[11px] font-bold tracking-widest text-slate-500 uppercase'>
                    User Permissions
                  </span>
                </div>
                <div className='flex flex-wrap gap-2.5'>
                  {tenant.permissions.map((perm) => (
                    <div
                      key={perm}
                      className='rounded-md border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-bold tracking-[0.5px] text-slate-600 uppercase dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
                    >
                      {perm}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function TenantPagination() {
  return (
    <div className='flex flex-col items-center justify-between gap-4 pt-4 pb-2 text-[13px] text-slate-500 sm:flex-row sm:gap-0'>
      <div className='w-full text-center sm:w-auto sm:text-left'>
        Page{' '}
        <span className='font-semibold text-slate-700 dark:text-slate-300'>
          1 - 3
        </span>{' '}
        of{' '}
        <span className='font-semibold text-slate-700 dark:text-slate-300'>
          27
        </span>{' '}
        results
      </div>
      <div className='flex w-full items-center justify-between gap-4 sm:w-auto'>
        <div className='flex cursor-pointer items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 font-medium transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800'>
          <span>10 / page</span>
          <ChevronDown className='h-4 w-4 text-slate-400' />
        </div>
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='icon'
            className='h-8 w-8 rounded-md border-slate-200 bg-white text-slate-300 dark:bg-slate-900'
            disabled
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='h-8 w-8 rounded-md border-slate-200 bg-white text-blue-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-blue-400'
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export function OrganisationTenants() {
  const [expandedId, setExpandedId] = useState<number | null>(1) // Pre-expand first one to match design

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
      </div>

      <TenantStats />

      <TenantList expandedId={expandedId} setExpandedId={setExpandedId} />

      <TenantPagination />
    </div>
  )
}
