import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  ArrowUpDown,
  Building2,
  Copy,
  Unlock,
  Lock,
  LayoutDashboard,
} from 'lucide-react'
import { TablePagination } from '@/components/ui/table-pagination'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  ListOrganisationsResponse,
  ListOrganisationsParams,
} from '@/types/organisation'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { ErrorState } from '@/components/common/error-state'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { useAccessClientApp } from '@/api/organisation'
import { Button } from '@/components/ui/button'
import { ExternalLink, Loader2 } from 'lucide-react'
import { useState } from 'react'

interface OrganisationsTableProps {
  data?: ListOrganisationsResponse
  isLoading: boolean
  isError: boolean
  error: AxiosError | null
  refetch: () => void
  params: ListOrganisationsParams
  updateQueryParams: (
    updates: Record<string, string | number | boolean | null | undefined>,
  ) => void
}

const AVATAR_COLORS = [
  'bg-blue-500 text-white',
  'bg-emerald-500 text-white',
  'bg-orange-500 text-white',
  'bg-purple-500 text-white',
  'bg-pink-500 text-white',
]

function OrganisationSkeleton() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <TableRow key={i} className='h-20'>
          <TableCell className='pl-6'>
            <div className='flex items-center gap-3'>
              <Skeleton className='h-10 w-10 rounded-full' />
              <div className='flex flex-col gap-1.5'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-3 w-20' />
              </div>
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className='h-4 w-24' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-4 w-24' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-6 w-32' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-6 w-20 rounded-full' />
          </TableCell>
          <TableCell>
            <div className='flex justify-end gap-2'>
              <Skeleton className='h-8 w-20 rounded-md' />
              <Skeleton className='h-8 w-20 rounded-md' />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}

export function OrganisationsTable({
  data,
  isLoading,
  isError,
  error,
  refetch,
  params,
  updateQueryParams,
}: OrganisationsTableProps) {
  const router = useRouter()
  const { mutate: accessApp, isPending: isAccessing } = useAccessClientApp()
  const [accessingId, setAccessingId] = useState<string | null>(null)

  const handleAccess = (e: React.MouseEvent, orgId: string) => {
    e.stopPropagation()
    setAccessingId(orgId)
    accessApp({
      organisationId: orgId,
    })
  }
  const handleSort = (key: ListOrganisationsParams['sort_by']) => {
    const order =
      params.sort_by === key && params.sort_order === 'desc' ? 'asc' : 'desc'
    updateQueryParams({ sort_by: key, sort_order: order, page: 1 })
  }

  const handlePageChange = (page: number) => {
    updateQueryParams({ page })
  }

  const totalPages = data ? Math.ceil(data.meta.total / data.meta.limit) : 0

  return (
    <Card className='bg-card w-full overflow-hidden rounded-lg border p-0 shadow-none'>
      <CardContent className='p-0'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[300px] pl-6'>Organisation</TableHead>
              <TableHead>
                <div
                  className='hover:text-foreground flex cursor-pointer items-center gap-2 text-nowrap select-none'
                  onClick={() => handleSort('joined_at')}
                >
                  Join at
                  <ArrowUpDown className='h-3.5 w-3.5' />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Token Details</TableHead>
              <TableHead>Unlocked</TableHead>
              <TableHead className='pr-6 text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <OrganisationSkeleton />
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={6} className='p-0'>
                  <ErrorState error={error as AxiosError} onRetry={refetch} />
                </TableCell>
              </TableRow>
            ) : !data?.docs || data?.docs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className='h-40 text-center'>
                  <div className='flex flex-col items-center justify-center gap-2'>
                    <Building2 className='text-muted-foreground/40 h-8 w-8' />
                    <p className='text-muted-foreground text-sm font-medium'>
                      No organisations found
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data?.docs.map((org, idx) => (
                <TableRow
                  key={org.id}
                  className='hover:bg-muted/50 h-20 cursor-pointer transition-colors'
                  onClick={() => router.push(`/organisations/${org.id}`)}
                >
                  <TableCell className='pl-6' title={org?.organisation_name}>
                    <div className='flex items-center gap-3'>
                      <Avatar className={`h-10 w-10 border-none`}>
                        <AvatarImage
                          src={org.organisation_logo || undefined}
                          alt={org.organisation_name}
                        />
                        <AvatarFallback
                          className={`${AVATAR_COLORS[idx % AVATAR_COLORS.length]} text-sm font-semibold`}
                        >
                          {org.organisation_name.substring(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex flex-col'>
                        <div className='text-foreground flex items-center text-sm font-bold'>
                          <span className='line-clamp-1 max-w-[200px] truncate text-wrap'>
                            {org.organisation_name}
                          </span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                          <span className='text-muted-foreground line-clamp-1 max-w-[80px] font-mono text-[10px] font-normal opacity-70'>
                            ID: {org.id}
                          </span>
                          <button
                            onClick={async (e) => {
                              try {
                                e.stopPropagation()
                                await navigator.clipboard.writeText(org.id)
                                toast.success('ID copied to clipboard')
                              } catch {
                                toast.error('Failed to copy ID')
                              }
                            }}
                            className='text-muted-foreground hover:text-foreground transition-colors'
                            aria-label='Copy template ID'
                            type='button'
                          >
                            <Copy className='h-2.5 w-2.5' />
                          </button>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className='text-foreground text-sm font-medium text-nowrap'>
                    {format(new Date(org.created_at), 'dd MMM yyyy')}
                  </TableCell>

                  <TableCell className='text-foreground text-sm font-medium text-nowrap'>
                    <div className='flex flex-col gap-1'>
                      <span
                        className={`w-fit rounded-full px-1.5 py-0.5 text-[10px] ${org?.onboarding_status?.email_verified ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}
                      >
                        {org?.onboarding_status?.email_verified
                          ? 'Email Verified'
                          : 'Email Verification Pending'}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className='text-foreground text-sm font-medium'>
                    <div className='flex items-center gap-3'>
                      <div className='flex flex-col'>
                        <span className='text-muted-foreground text-[10px] font-semibold tracking-wider uppercase'>
                          Used / Total
                        </span>
                        <div className='flex items-center gap-1.5'>
                          <span className='text-foreground text-sm font-bold'>
                            {org.infinite_tokens
                              ? '∞'
                              : `${org.used_tokens || 0} / ${org.total_tokens || 0}`}
                          </span>
                          {org.infinite_tokens && (
                            <Badge
                              variant='secondary'
                              className='border-blue-100 bg-blue-50 px-1.5 py-0 text-[10px] text-blue-600'
                            >
                              Infinite
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className='text-foreground text-sm font-medium'>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className='flex items-center gap-1.5'>
                            {org.unlocked ? (
                              <Badge
                                variant='secondary'
                                className='gap-1 border-emerald-100 bg-emerald-50 px-2 text-emerald-600'
                              >
                                <Unlock className='h-3 w-3' />
                                Unlocked
                              </Badge>
                            ) : (
                              <Badge
                                variant='secondary'
                                className='gap-1 border-slate-100 bg-slate-50 px-2 text-slate-500'
                              >
                                <Lock className='h-3 w-3' />
                                Locked
                              </Badge>
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          {org.unlocked
                            ? 'All features enabled'
                            : 'Restricted access'}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>

                  <TableCell className='pr-6 text-right'>
                    <div className='flex items-center justify-end gap-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        className='h-8 w-20 gap-1.5 border-slate-200 text-xs font-semibold transition-all hover:bg-slate-50'
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/organisations/${org.id}`)
                        }}
                      >
                        <LayoutDashboard className='h-3.5 w-3.5' />
                        Open
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        className='border-primary/20 hover:bg-primary/5 hover:text-primary h-8 w-20 gap-1.5 text-xs font-semibold transition-all'
                        onClick={(e) => handleAccess(e, org.id)}
                        disabled={isAccessing && accessingId === org.id}
                      >
                        {isAccessing && accessingId === org.id ? (
                          <Loader2 className='h-3.5 w-3.5 animate-spin' />
                        ) : (
                          <ExternalLink className='h-3.5 w-3.5' />
                        )}
                        Login
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination Footer */}
        {data && totalPages > 1 && (
          <TablePagination
            currentPage={data.meta.page}
            totalPages={totalPages}
            totalItems={data.meta.total}
            pageSize={data.meta.limit}
            entityName='organisations'
            onPageChange={handlePageChange}
            className='border-t'
          />
        )}
      </CardContent>
    </Card>
  )
}
