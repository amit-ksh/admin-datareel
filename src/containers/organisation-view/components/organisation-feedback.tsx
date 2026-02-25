import React from 'react'
import {
  UserCircle,
  Star,
  MessageSquare,
  TrendingUp,
  Calendar,
  Upload,
  ExternalLink,
} from 'lucide-react'

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
import { TablePagination } from '@/components/ui/table-pagination'
import { Progress } from '@/components/ui/progress'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

// Dummy data for the bar chart
const ratingDistributionData = [
  { rating: '1', value: 0 },
  { rating: '2', value: 0 },
  { rating: '3', value: 0 },
  { rating: '4', value: 5 },
  { rating: '5', value: 10 },
]

const chartConfig = {
  value: {
    label: 'Ratings',
    color: '#3b82f6',
  },
} satisfies ChartConfig

// Dummy data for the table
const feedbacksData = [
  {
    id: 1,
    name: 'vamit damor',
    date: 'Dec 6, 2025, 12:27 AM',
    r: 5,
    ir: 0,
    ur: 0,
    comments: 'No comments',
    link: true,
  },
  {
    id: 2,
    name: 'vamit damor',
    date: 'Dec 6, 2025, 12:19 AM',
    r: 5,
    ir: 0,
    ur: 0,
    comments: 'No comments',
    link: true,
  },
  {
    id: 3,
    name: '',
    date: 'Apr 10, 2025, 6:16 PM',
    r: 5,
    ir: 0,
    ur: 0,
    comments: 'No comments',
    link: true,
  },
  {
    id: 4,
    name: '',
    date: 'Mar 24, 2025, 6:46 PM',
    r: 5,
    ir: 0,
    ur: 0,
    comments: 'No comments',
    link: true,
  },
  {
    id: 5,
    name: '',
    date: 'Mar 24, 2025, 11:58 AM',
    r: 5,
    ir: 0,
    ur: 0,
    comments: 'No comments',
    link: true,
  },
  {
    id: 6,
    name: 'patient_female_3',
    date: 'Feb 26, 2025, 10:44 AM',
    r: 5,
    ir: 5,
    ur: 5,
    comments: 'No comments',
    link: true,
  },
  {
    id: 7,
    name: 'regenrate',
    date: 'Feb 15, 2025, 5:11 PM',
    r: 4,
    ir: 5,
    ur: 5,
    comments: 'No comments',
    link: true,
  },
  {
    id: 8,
    name: 'regenrate',
    date: 'Feb 15, 2025, 5:09 PM',
    r: 4,
    ir: 4,
    ur: 3,
    comments: 'Cool Man',
    link: true,
  },
  {
    id: 9,
    name: 'Reject Test',
    date: 'Jan 29, 2025, 4:13 PM',
    r: 5,
    ir: 4,
    ur: 3,
    comments: 'helpfull',
    link: true,
  },
  {
    id: 10,
    name: 'Reject Test',
    date: 'Feb 13, 2025, 11:53 AM',
    r: 4,
    ir: 5,
    ur: 5,
    comments: 'No comments',
    link: true,
  },
  {
    id: 11,
    name: 'TEST',
    date: 'Feb 5, 2025, 6:32 PM',
    r: 5,
    ir: 3,
    ur: 5,
    comments: 'ok test',
    link: true,
  },
  {
    id: 12,
    name: 'TEST',
    date: 'Feb 5, 2025, 9:54 PM',
    r: 5,
    ir: 4,
    ur: 5,
    comments: 'additional from main branchs',
    link: true,
  },
  {
    id: 13,
    name: 'TEST',
    date: 'Feb 5, 2025, 6:53 PM',
    r: 5,
    ir: 3,
    ur: 3,
    comments: 'No comments',
    link: true,
  },
  {
    id: 14,
    name: 'test-new-response',
    date: 'Dec 2, 2024, 9:18 PM',
    r: 4,
    ir: 4,
    ur: 4,
    comments: 'GA merge test',
    link: true,
  },
]

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

const statsData = [
  {
    title: 'Total Feedback',
    value: '15',
    icon: UserCircle,
    wrapperClass: 'text-blue-600',
  },
  {
    title: 'Average Rating',
    value: '4.67',
    icon: (props: React.ComponentProps<typeof Star>) => (
      <Star className='h-6 w-6 fill-blue-600' {...props} />
    ),
    wrapperClass: 'text-blue-600',
  },
  {
    title: 'Total Comments',
    value: '6',
    icon: MessageSquare,
    wrapperClass: 'text-blue-600',
  },
  {
    title: 'Positive Ratings',
    value: '15',
    icon: TrendingUp,
    wrapperClass: 'bg-blue-600 text-white rounded-full',
    iconProps: { strokeWidth: 2 },
  },
]

export function OrganisationFeedback() {
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
          <Button
            variant='outline'
            className='w-full border-blue-200 bg-white text-blue-600 hover:bg-blue-50 sm:w-auto'
          >
            Select Project
          </Button>
          <div className='flex h-9 w-full items-center overflow-hidden rounded-md border bg-white sm:w-auto'>
            <Button
              variant='ghost'
              className='text-muted-foreground hover:bg-muted/50 h-full flex-1 rounded-none border-r px-2 text-xs font-normal sm:flex-none sm:px-3 sm:text-sm'
            >
              <Calendar className='text-muted-foreground mr-2 h-4 w-4 shrink-0' />
              <span className='truncate'>Jul 1, 2024 - Jul 8, 2026</span>
            </Button>
            <Button
              variant='ghost'
              className='hover:bg-muted/50 text-muted-foreground h-full flex-1 rounded-none px-2 text-xs font-normal whitespace-nowrap sm:flex-none sm:px-3 sm:text-sm'
            >
              Select range
            </Button>
          </div>
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
            min={4}
            max={5}
            average={4.7}
            averageText='4.7'
            progress={94}
          />
          <RatingBarCard
            title='Informative Rating'
            min={3}
            max={5}
            average={4.2}
            averageText='4.2'
            progress={84}
          />
          <RatingBarCard
            title='Useful Rating'
            min={3}
            max={5}
            average={4.1}
            averageText='4.1'
            progress={82}
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
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  ticks={[0, 3, 6, 9, 12]}
                  domain={[0, 12]}
                />
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
              <Select defaultValue='all-assignees'>
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
                {feedbacksData.map((row, index) => (
                  <TableRow
                    key={`${row.id}-${index}`}
                    className='hover:bg-muted/50 data-[state=selected]:bg-muted border-b bg-white transition-colors'
                  >
                    <TableCell className='py-3 pl-6'>
                      <div className='flex items-center gap-1.5 font-medium'>
                        {row.name || 'Unnamed'}
                        {row.link && (
                          <ExternalLink className='text-primary h-3.5 w-3.5 opacity-70' />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className='text-foreground py-3 text-sm'>
                      {row.date}
                    </TableCell>
                    <TableCell className='py-3'>
                      <RatingStars rating={row.r} />
                    </TableCell>
                    <TableCell className='py-3'>
                      <RatingStars rating={row.ir} />
                    </TableCell>
                    <TableCell className='py-3'>
                      <RatingStars rating={row.ur} />
                    </TableCell>
                    <TableCell className='py-3 text-sm'>
                      <span
                        className={
                          row.comments === 'No comments'
                            ? 'text-muted-foreground italic'
                            : 'text-foreground font-medium'
                        }
                      >
                        {row.comments}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Footer */}
          <TablePagination
            currentPage={1}
            pageSize={14}
            totalItems={14}
            entityName='feedbacks'
            className='border-t bg-white'
          />
        </CardContent>
      </Card>
    </div>
  )
}
