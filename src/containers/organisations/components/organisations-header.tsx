import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Filter, Search, CalendarIcon, RotateCcwIcon } from 'lucide-react'
import { OnboardOrganisationDialog } from './onboard-organisation-dialog'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { ListOrganisationsParams } from '@/api/organisation'
import { format } from 'date-fns'

interface OrganisationsHeaderProps {
  params: ListOrganisationsParams
  setFilters: (filters: Partial<ListOrganisationsParams>) => void
  resetFilters: () => void
}

export function OrganisationsHeader({
  params,
  setFilters,
  resetFilters,
}: OrganisationsHeaderProps) {
  const handleSearch = (val: string) => {
    setFilters({ search: val || undefined })
  }

  const handleDateChange = (range: { from?: Date; to?: Date } | undefined) => {
    setFilters({
      join_at_start: range?.from ? format(range.from, 'yyyy-MM-dd') : undefined,
      join_at_end: range?.to ? format(range.to, 'yyyy-MM-dd') : undefined,
    })
  }

  const handleFeedbackChange = (val: string) => {
    setFilters({ min_feedback: val === 'all' ? undefined : Number(val) })
  }

  const dateRange = useMemo(() => {
    if (!params.join_at_start && !params.join_at_end) return undefined
    return {
      from: params.join_at_start ? new Date(params.join_at_start) : undefined,
      to: params.join_at_end ? new Date(params.join_at_end) : undefined,
    }
  }, [params.join_at_start, params.join_at_end])

  return (
    <div className='mb-8 flex items-center justify-between'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-foreground text-2xl font-bold tracking-tight'>
          Organisations
        </h1>
        <p className='text-muted-foreground text-sm'>
          Track & manage the organisations
        </p>
      </div>
      <div className='flex items-center gap-3'>
        <div className='relative hidden w-64 sm:block'>
          <Search className='text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4' />
          <Input
            placeholder='Search Organisation...'
            className='bg-background h-9 pl-8'
            defaultValue={params.search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              size='sm'
              className='bg-background hover:bg-muted/50 hidden h-9 px-4 text-sm font-medium sm:flex'
            >
              <Filter className='mr-2 h-4 w-4' />
              Filter
              {(params.join_at_start || params.min_feedback) && (
                <span className='ml-2 h-2 w-2 rounded-full bg-blue-600' />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align='end' className='w-80 space-y-4'>
            <PopoverHeader className='flex flex-row items-center justify-between gap-4'>
              <PopoverTitle>Filters</PopoverTitle>
              <Button
                variant='ghost'
                size='sm'
                onClick={resetFilters}
                className='text-muted-foreground h-8 text-xs'
              >
                <RotateCcwIcon className='h-3 w-3' />
                Reset
              </Button>
            </PopoverHeader>

            <div className='space-y-4'>
              {/* Join Date Filter */}
              <div className='space-y-2'>
                <label className='text-muted-foreground text-xs font-medium'>
                  Join Date Range
                </label>
                <div className='grid gap-2'>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id='date'
                        variant={'outline'}
                        className='bg-background h-9 w-full justify-start text-left font-normal'
                      >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {dateRange?.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, 'LLL dd, y')} -{' '}
                              {format(dateRange.to, 'LLL dd, y')}
                            </>
                          ) : (
                            format(dateRange.from, 'LLL dd, y')
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        initialFocus
                        mode='range'
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={(
                          range: { from?: Date; to?: Date } | undefined,
                        ) => handleDateChange(range)}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Feedback Filter */}
              <div className='space-y-2'>
                <label className='text-muted-foreground text-xs font-medium'>
                  Minimum Feedback Score
                </label>
                <Select
                  value={params.min_feedback?.toString() || 'all'}
                  onValueChange={handleFeedbackChange}
                >
                  <SelectTrigger className='bg-background h-9'>
                    <SelectValue placeholder='Select rating' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Ratings</SelectItem>
                    <SelectItem value='1'>1+ Stars</SelectItem>
                    <SelectItem value='2'>2+ Stars</SelectItem>
                    <SelectItem value='3'>3+ Stars</SelectItem>
                    <SelectItem value='4'>4+ Stars</SelectItem>
                    <SelectItem value='5'>5 Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <OnboardOrganisationDialog />
      </div>
    </div>
  )
}
