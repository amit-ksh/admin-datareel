import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowUpDown, Building2 } from 'lucide-react'
import { TablePagination } from '@/components/ui/table-pagination'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  ListOrganisationsResponse,
  ListOrganisationsParams,
} from '@/api/organisation'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import ErrorState from '@/components/common/error-state'
import { AxiosError } from 'axios'

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
            <Skeleton className='h-4 w-16' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-4 w-12' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-4 w-12' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-4 w-24' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-4 w-12' />
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
                  className='hover:text-foreground flex cursor-pointer items-center gap-2 select-none'
                  onClick={() => handleSort('joined_at')}
                >
                  Join at
                  <ArrowUpDown className='h-3.5 w-3.5' />
                </div>
              </TableHead>
              <TableHead>Tenant ID</TableHead>
              <TableHead>CDN</TableHead>
              <TableHead>HLS</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Unlocked</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <OrganisationSkeleton />
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={7} className='p-0'>
                  <ErrorState error={error as AxiosError} onRetry={refetch} />
                </TableCell>
              </TableRow>
            ) : !data?.docs || data?.docs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className='h-40 text-center'>
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
                  <TableCell className='pl-6'>
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
                          {org.organisation_name}
                        </div>
                        <span className='text-muted-foreground mt-0.5 text-xs'>
                          ID: {org.id.slice(0, 8)}...
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className='text-foreground text-sm font-medium'>
                    {format(new Date(org.created_at), 'dd MMM yyyy')}
                  </TableCell>
                  <TableCell className='text-foreground text-sm font-medium'>
                    {org.tenant_id.slice(0, 8)}...
                  </TableCell>
                  <TableCell className='text-foreground text-sm font-medium'>
                    {org.enable_cdn ? 'Yes' : 'No'}
                  </TableCell>
                  <TableCell className='text-foreground text-sm font-medium'>
                    {org.enable_hls ? 'Yes' : 'No'}
                  </TableCell>
                  <TableCell className='text-foreground text-sm font-medium'>
                    <div className='flex flex-col gap-1'>
                      <span
                        className={`w-fit rounded-full px-1.5 py-0.5 text-[10px] ${org?.onboarding_status?.email_verified ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}
                      >
                        {org?.onboarding_status?.email_verified
                          ? 'Email Verified'
                          : 'Email Pending'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className='text-foreground text-sm font-medium'>
                    {org.unlocked ? 'Yes' : 'No'}
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
