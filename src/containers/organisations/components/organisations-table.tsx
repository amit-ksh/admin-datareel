import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, ArrowUpDown, Building2 } from 'lucide-react'
import { TablePagination } from '@/components/ui/table-pagination'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  ListOrganisationsResponse,
  ListOrganisationsParams,
} from '@/api/organisation'
import { format } from 'date-fns'
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
  const handleSort = (key: ListOrganisationsParams['sort_by']) => {
    const order =
      params.sort_by === key && params.sort_order === 'desc' ? 'asc' : 'desc'
    updateQueryParams({ sort_by: key, sort_order: order, page: 1 })
  }

  const handlePageChange = (page: number) => {
    updateQueryParams({ page })
  }

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
              <TableHead>
                <div
                  className='hover:text-foreground flex cursor-pointer items-center gap-2 select-none'
                  onClick={() => handleSort('videos')}
                >
                  Videos
                  <ArrowUpDown className='h-3.5 w-3.5' />
                </div>
              </TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Last Video</TableHead>
              <TableHead>
                <div
                  className='hover:text-foreground flex cursor-pointer items-center gap-2 select-none'
                  onClick={() => handleSort('feedback_score')}
                >
                  Feedback
                  <ArrowUpDown className='h-3.5 w-3.5' />
                </div>
              </TableHead>
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
            ) : data?.data.length === 0 ? (
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
              data?.data.map((org, idx) => (
                <TableRow key={org.id} className='h-20'>
                  <TableCell className='pl-6'>
                    <div className='flex items-center gap-3'>
                      <Avatar className={`h-10 w-10 border-none`}>
                        <AvatarImage src={org.logo} alt={org.name} />
                        <AvatarFallback
                          className={`${AVATAR_COLORS[idx % AVATAR_COLORS.length]} text-sm font-semibold`}
                        >
                          {org.name.substring(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex flex-col'>
                        <div className='text-foreground flex items-center text-sm font-bold'>
                          {org.name}
                        </div>
                        <span className='text-muted-foreground mt-0.5 text-xs'>
                          ID: {org.id.slice(0, 8)}...
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className='text-foreground text-sm font-medium'>
                    {format(new Date(org.joined_at), 'dd MMM yyyy')}
                  </TableCell>
                  <TableCell className='text-foreground text-sm font-bold'>
                    {org.total_videos.toLocaleString()}
                  </TableCell>
                  <TableCell className='text-foreground text-sm font-bold'>
                    {org.views.toLocaleString()}
                  </TableCell>
                  <TableCell className='text-foreground text-sm font-medium'>
                    {org.last_video_creation_date
                      ? format(
                          new Date(org.last_video_creation_date),
                          'dd MMM yyyy',
                        )
                      : 'N/A'}
                  </TableCell>
                  <TableCell className='text-foreground text-sm font-bold'>
                    <div className='flex items-center gap-1.5'>
                      {org.avg_feedback.toFixed(1)}
                      <Star className='h-4 w-4 border-none fill-yellow-400 text-yellow-400' />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination Footer */}
        {data && data.meta.last_page > 1 && (
          <TablePagination
            currentPage={data.meta.page}
            totalPages={data.meta.last_page}
            totalItems={data.meta.total}
            pageSize={data.meta.page_limit}
            entityName='organisations'
            onPageChange={handlePageChange}
            className='border-t'
          />
        )}
      </CardContent>
    </Card>
  )
}
