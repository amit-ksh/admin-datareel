'use client'

import { Button } from '@/components/ui/button'
import { Download, CalendarIcon } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { OrganisationSelectPopover } from './organisation-select-popover'

import { ANALYTICS_TEST_IDS } from './test-ids'

interface AnalyticsHeaderProps {
  mode: string
  onModeChange: (mode: string) => void
  selectedOrgId: string
  setSelectedOrgId: (id: string) => void
  dateRange: { startDate: Date; endDate: Date }
  setDateRange: (range: { startDate: Date; endDate: Date }) => void
  onDownloadReport: (type: string, label: string) => void
}

export function AnalyticsHeader({
  mode,
  onModeChange,
  selectedOrgId,
  setSelectedOrgId,
  dateRange,
  setDateRange,
  onDownloadReport,
}: AnalyticsHeaderProps) {
  const date = {
    from: dateRange.startDate,
    to: dateRange.endDate,
  }

  return (
    <div
      className='mb-8 flex flex-col justify-between gap-4 xl:flex-row xl:items-center'
      data-testid={ANALYTICS_TEST_IDS.HEADER.CONTAINER}
    >
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-2'>
            <h1
              className='text-foreground text-2xl font-bold tracking-tight'
              data-testid={ANALYTICS_TEST_IDS.HEADER.TITLE}
            >
              Analytics
            </h1>
            <Tabs
              value={mode}
              onValueChange={onModeChange}
              className='w-full sm:w-auto'
            >
              <TabsList className='grid w-full grid-cols-2 sm:flex sm:w-auto'>
                <TabsTrigger value='cohort'>Cohort</TabsTrigger>
                <TabsTrigger value='cumulative'>Cumulative</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <p className='text-muted-foreground text-sm'>
            Monitor your organisation&apos;s performance and engagement metrics.
          </p>
        </div>
      </div>
      <div className='flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center md:w-auto'>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id='date'
              variant={'outline'}
              size='sm'
              className={cn(
                'bg-background hover:bg-accent hover:text-accent-foreground h-9 w-full justify-start px-4 text-left text-sm font-medium sm:w-65',
                !date && 'text-muted-foreground',
              )}
              data-testid={ANALYTICS_TEST_IDS.HEADER.DATE_RANGE}
            >
              <CalendarIcon className='mr-2 h-4 w-4 shrink-0' />
              <span className='truncate'>
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} -{' '}
                      {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='end'>
            <Calendar
              autoFocus
              mode='range'
              defaultMonth={date?.from}
              selected={date}
              onSelect={(val) => {
                if (val?.from && val?.to) {
                  setDateRange({ startDate: val.from, endDate: val.to })
                }
              }}
              numberOfMonths={2}
              className='hidden sm:block'
            />
            <Calendar
              mode='range'
              defaultMonth={date?.from}
              selected={date}
              onSelect={(val) => {
                if (val?.from && val?.to) {
                  setDateRange({ startDate: val.from, endDate: val.to })
                }
              }}
              numberOfMonths={1}
              className='block sm:hidden'
            />
          </PopoverContent>
        </Popover>

        <OrganisationSelectPopover
          selectedOrgId={selectedOrgId}
          onSelect={setSelectedOrgId}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size='sm'
              className='h-9 w-full bg-blue-600 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 sm:w-auto'
            >
              <Download className='mr-2 h-4 w-4 shrink-0' />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-48'>
            <DropdownMenuLabel>Export Report</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDownloadReport('performance', 'Delivery Report')}
            >
              Delivery Report (CSV)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDownloadReport('approval', 'Approval Report')}
            >
              Approval Report (CSV)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                onDownloadReport('generation', 'Assignee Wise Report')
              }
            >
              Assignee Wise Report (CSV)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
