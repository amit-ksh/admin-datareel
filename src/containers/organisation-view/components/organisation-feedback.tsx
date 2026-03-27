import React, { useMemo } from 'react'
import {
  MessageSquare,
  Star,
  TrendingUp,
  UserCircle,
  Loader2,
  ExternalLink,
  Upload,
  Calendar as CalendarIcon,
} from 'lucide-react'
import { format } from 'date-fns'
import { useOrganisationFeedback } from '../use-organisation-feedback.hook'
import { cn } from '@/lib/utils'
import { FeedbackItem } from '@/api/analytics'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { TablePagination } from '@/components/ui/table-pagination'
import { Progress } from '@/components/ui/progress'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

// chartConfig moved inside or kept static

const chartConfig = {
  value: {
    label: 'Ratings',
    color: '#3b82f6',
  },
} satisfies ChartConfig

function RatingStars({
  rating,
  outOf = 5,
}: {
  rating: number
  outOf?: number
}) {
  if (rating === 0) {
    return (
      <span className='text-muted-foreground text-sm italic'>Not rated</span>
    )
  }
  return (
    <div className='flex items-center gap-0.5'>
      {Array.from({ length: outOf }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-blue-600 text-blue-600' : 'fill-muted text-muted'}`}
        />
      ))}
    </div>
  )
}

function RatingBarCard({
  title,
  min,
  max,
  averageText,
  progress,
}: {
  title: string
  min: number
  max: number
  average: number
  averageText: string
  progress: number
}) {
  return (
    <Card className='gap-4 border p-4'>
      <CardHeader className='p-0'>
        <CardTitle className='text-sm font-semibold'>{title}</CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='flex items-center justify-between text-sm'>
          <div className='space-y-1'>
            <span className='text-muted-foreground'>Min</span>
            <div className='flex items-center gap-0.5'>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={`min-${i}`}
                  className={`h-4 w-4 ${i < min ? 'fill-blue-600 text-blue-600' : 'fill-muted text-muted'}`}
                />
              ))}
            </div>
          </div>
          <div className='space-y-1 text-right'>
            <span className='text-muted-foreground'>Max</span>
            <div className='flex items-center justify-end gap-0.5'>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={`max-${i}`}
                  className={`h-4 w-4 ${i < max ? 'fill-blue-600 text-blue-600' : 'fill-muted text-muted'}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className='space-y-2'>
          <div className='text-muted-foreground text-sm'>Average</div>
          <div className='flex items-center gap-3'>
            <Progress
              value={progress}
              className='bg-muted h-2.5 [&>div]:bg-blue-600'
            />
            <span className='text-muted-foreground text-sm font-medium whitespace-nowrap'>
              <span className='text-foreground'>{averageText}</span>/5
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface StatCardProps {
  title: string
  value: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  wrapperClass?: string
  iconProps?: Record<string, unknown>
}

function StatCard({
  title,
  value,
  icon: Icon,
  wrapperClass = '',
  iconProps = {},
}: StatCardProps) {
  return (
    <Card className='border p-4'>
      <CardContent className='flex items-center justify-between p-0'>
        <div className='space-y-1'>
          <p className='text-muted-foreground text-sm font-medium'>{title}</p>
          <p className='text-2xl font-bold'>{value}</p>
        </div>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center ${wrapperClass}`}
        >
          <Icon className='h-6 w-6' strokeWidth={1.5} {...iconProps} />
        </div>
      </CardContent>
    </Card>
  )
}

interface OrganisationFeedbackProps {
  organisationId: string
}

export function OrganisationFeedback({
  organisationId,
}: OrganisationFeedbackProps) {
  const {
    overviewData,
    ratingStats,
    ratingBreakdown,
    feedbacksData,
    isLoading,
    dateRange,
    setDateRange,
    page,
    setPage,
    assignee,
    setAssignee,
    commentsOnly,
    setCommentsOnly,
  } = useOrganisationFeedback(organisationId)

  const statsData = [
    {
      title: 'Total Feedback',
      value: overviewData?.total_feedbacks?.toString() || '0',
      icon: UserCircle,
      wrapperClass: 'text-blue-600',
    },
    {
      title: 'Average Rating',
      value: (overviewData?.average_rating || 0).toFixed(2),
      icon: (props: React.ComponentProps<typeof Star>) => (
        <Star className='h-6 w-6 fill-blue-600' {...props} />
      ),
      wrapperClass: 'text-blue-600',
    },
    {
      title: 'Total Comments',
      value: overviewData?.total_comments?.toString() || '0',
      icon: MessageSquare,
      wrapperClass: 'text-blue-600',
    },
    {
      title: 'Positive Ratings',
      value: overviewData?.total_positive_rating?.toString() || '0',
      icon: TrendingUp,
      wrapperClass: 'bg-blue-600 text-white rounded-full',
      iconProps: { strokeWidth: 2 },
    },
  ]

  const ratingDistributionData = useMemo(() => {
    if (!ratingBreakdown?.rating_counts) {
      return [
        { rating: '1', value: 0 },
        { rating: '2', value: 0 },
        { rating: '3', value: 0 },
        { rating: '4', value: 0 },
        { rating: '5', value: 0 },
      ]
    }
    return Object.entries(ratingBreakdown.rating_counts).map(
      ([rating, value]) => ({
        rating,
        value: Number(value),
      }),
    )
  }, [ratingBreakdown])

  if (isLoading && !feedbacksData) {
    return (
      <div className='flex h-[400px] w-full items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-blue-600' />
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Header section */}
      <div className='flex flex-col justify-between gap-4 lg:flex-row lg:items-center'>
        <div>
          <h2 className='text-lg font-bold tracking-tight'>Feedback</h2>
          <p className='text-muted-foreground text-sm'>
            Analyze user feedback to improve video content and user experience.
          </p>
        </div>
        <div className='flex flex-col flex-wrap items-stretch gap-2 sm:flex-row sm:items-center'>
          {/* <Button
            variant='outline'
            className='w-full border-blue-200 bg-white text-blue-600 hover:bg-blue-50 sm:w-auto'
          >
            Select Project
          </Button> */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className={cn(
                  'w-full justify-start border-blue-200 bg-white text-left font-normal sm:w-[300px]',
                  !dateRange && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4 text-blue-600' />
                {dateRange?.startDate ? (
                  dateRange.endDate ? (
                    <>
                      {format(dateRange.startDate, 'LLL dd, y')} -{' '}
                      {format(dateRange.endDate, 'LLL dd, y')}
                    </>
                  ) : (
                    format(dateRange.startDate, 'LLL dd, y')
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='end'>
              <CalendarComponent
                initialFocus
                mode='range'
                defaultMonth={dateRange?.startDate}
                selected={{
                  from: dateRange.startDate,
                  to: dateRange.endDate,
                }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setDateRange({ startDate: range.from, endDate: range.to })
                  }
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {statsData.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Ratings details section */}
      <div className='grid gap-4 lg:grid-cols-5'>
        {/* Left column: 3 rating cards */}
        <div className='flex flex-col gap-4 lg:col-span-2'>
          <RatingBarCard
            title='Overall Rating'
            min={ratingStats?.min_rating || 0}
            max={ratingStats?.max_rating || 0}
            average={ratingStats?.average_rating || 0}
            averageText={(ratingStats?.average_rating || 0).toFixed(1)}
            progress={(ratingStats?.average_rating || 0) * 20}
          />
          <RatingBarCard
            title='Informative Rating'
            min={ratingStats?.min_more_info || 0}
            max={ratingStats?.max_more_info || 0}
            average={ratingStats?.average_more_info || 0}
            averageText={(ratingStats?.average_more_info || 0).toFixed(1)}
            progress={(ratingStats?.average_more_info || 0) * 20}
          />
          <RatingBarCard
            title='Useful Rating'
            min={ratingStats?.min_more_videos || 0}
            max={ratingStats?.max_more_videos || 0}
            average={ratingStats?.average_more_videos || 0}
            averageText={(ratingStats?.average_more_videos || 0).toFixed(1)}
            progress={(ratingStats?.average_more_videos || 0) * 20}
          />
        </div>

        {/* Right column: Chart card */}
        <Card className='flex h-full flex-col border lg:col-span-3'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-semibold'>
              Rating Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className='flex min-h-[300px] flex-1 flex-col justify-end pt-8'>
            <ChartContainer
              config={chartConfig}
              className='aspect-auto h-full w-full bg-white'
            >
              <BarChart
                accessibilityLayer
                data={ratingDistributionData}
                margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke='#e5e7eb'
                  strokeDasharray='3 3'
                />
                <XAxis
                  dataKey='rating'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                <ChartTooltip
                  cursor={{ fill: 'transparent' }}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey='value'
                  fill='var(--color-value)'
                  radius={[2, 2, 0, 0]}
                  maxBarSize={60}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Feedbacks Table */}
      <Card className='bg-card w-full overflow-hidden rounded-lg border p-0 shadow-none'>
        <CardContent className='p-0'>
          <div className='flex flex-col items-start justify-between gap-4 border-b bg-white p-4 lg:flex-row lg:items-center'>
            <CardTitle className='text-base font-semibold'>Feedbacks</CardTitle>
            <div className='flex w-full flex-col flex-wrap items-stretch gap-3 sm:flex-row sm:items-center lg:w-auto'>
              <Select
                value={assignee || 'all-assignees'}
                onValueChange={(val) =>
                  setAssignee(val === 'all-assignees' ? '' : val)
                }
              >
                <SelectTrigger className='text-muted-foreground h-9 w-full bg-white text-sm sm:w-[140px]'>
                  <SelectValue placeholder='All Assignees' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all-assignees'>All Assignees</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue='all-ratings'>
                <SelectTrigger className='text-muted-foreground h-9 w-full bg-white text-sm sm:w-[140px]'>
                  <SelectValue placeholder='All ratings' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all-ratings'>All ratings</SelectItem>
                </SelectContent>
              </Select>

              <div className='bg-muted/30 flex w-full items-center justify-between space-x-2 rounded-md border px-3 py-1.5 sm:w-auto sm:justify-start'>
                <label
                  htmlFor='comments-only'
                  className='text-muted-foreground cursor-pointer pr-1 text-sm whitespace-nowrap italic'
                >
                  Comments Only
                </label>
                <Switch
                  id='comments-only'
                  checked={commentsOnly}
                  onCheckedChange={setCommentsOnly}
                  className='data-[state=checked]:bg-blue-600'
                />
              </div>

              <Button className='h-9 w-full gap-2 bg-blue-600 text-white hover:bg-blue-700 sm:w-auto'>
                <Upload className='h-4 w-4' />
                Export CSV
              </Button>
            </div>
          </div>
          <div className='overflow-x-auto'>
            {isLoading ? (
              <div className='flex h-[400px] w-full items-center justify-center'>
                <Loader2 className='h-8 w-8 animate-spin text-blue-600' />
              </div>
            ) : (
              <Table>
                <TableHeader className='bg-muted/30'>
                  <TableRow className='hover:bg-transparent'>
                    <TableHead className='w-[200px] py-3 pl-6 text-xs font-semibold'>
                      VIDEO NAME
                    </TableHead>
                    <TableHead className='py-3 text-xs font-semibold'>
                      FEEDBACK AT
                    </TableHead>
                    <TableHead className='py-3 text-xs font-semibold'>
                      RATING
                    </TableHead>
                    <TableHead className='py-3 text-xs font-semibold'>
                      INFORMATIVE RATING
                    </TableHead>
                    <TableHead className='py-3 text-xs font-semibold'>
                      USEFUL RATING
                    </TableHead>
                    <TableHead className='py-3 text-xs font-semibold'>
                      COMMENTS
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feedbacksData?.data?.map(
                    (row: FeedbackItem, index: number) => (
                      <TableRow
                        key={`${row._id.results_id}-${index}`}
                        className='hover:bg-muted/50 data-[state=selected]:bg-muted border-b bg-white transition-colors'
                      >
                        <TableCell className='py-3 pl-6'>
                          <div className='flex items-center gap-1.5 font-medium'>
                            {row._id.name || 'Unnamed'}
                            <ExternalLink className='text-primary h-3.5 w-3.5 opacity-70' />
                          </div>
                        </TableCell>
                        <TableCell className='text-foreground py-3 text-sm'>
                          {format(
                            new Date(row.latest_feedback_at),
                            'MMM d, yyyy, h:mm a',
                          )}
                        </TableCell>
                        <TableCell className='py-3'>
                          <RatingStars rating={row.average_rating?.[0] || 0} />
                        </TableCell>
                        <TableCell className='py-3'>
                          <RatingStars
                            rating={row.average_more_info?.[0] || 0}
                          />
                        </TableCell>
                        <TableCell className='py-3'>
                          <RatingStars
                            rating={row.average_more_videos?.[0] || 0}
                          />
                        </TableCell>
                        <TableCell className='py-3 text-sm'>
                          <span
                            className={
                              !row.feedback?.[0] ||
                              row.feedback?.[0] === 'No comments'
                                ? 'text-muted-foreground italic'
                                : 'text-foreground font-medium'
                            }
                          >
                            {row.feedback?.[0] || 'No comments'}
                          </span>
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                  {(!feedbacksData?.data ||
                    feedbacksData.data.length === 0) && (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className='text-muted-foreground py-8 text-center'
                      >
                        No feedback found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>

          {/* Pagination Footer */}
          <TablePagination
            currentPage={page}
            pageSize={10} // Backend doesn't seem to return page limit, assuming 10
            totalItems={(feedbacksData?.total_pages || 1) * 10}
            onPageChange={setPage}
            entityName='feedbacks'
            className='border-t bg-white'
          />
        </CardContent>
      </Card>
    </div>
  )
}
