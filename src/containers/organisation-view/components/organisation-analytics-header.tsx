'use client'

import { useState } from 'react'
import { format, subDays } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { Download, CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function OrganisationAnalyticsHeader() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })

  return (
    <div className='flex flex-col justify-between gap-4 xl:flex-row xl:items-center'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
        <div>
          <div className='flex items-center gap-2'>
            <h2 className='text-lg font-bold tracking-tight'>Analytics</h2>
            <Tabs
              defaultValue='cohort'
              className='mt-2 w-full sm:mt-0 sm:ml-4 sm:w-auto'
            >
              <TabsList className='grid w-full grid-cols-2 sm:flex sm:w-auto'>
                <TabsTrigger value='cohort'>Cohort</TabsTrigger>
                <TabsTrigger value='cumulative'>Cumulative</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <p className='text-muted-foreground text-sm'>
            Monitor your organisation's performance and engagement metrics.
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
              initialFocus
              mode='range'
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              className='hidden sm:block'
            />
            <Calendar
              initialFocus
              mode='range'
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={1}
              className='block sm:hidden'
            />
          </PopoverContent>
        </Popover>

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
            <DropdownMenuItem>Summary Report (PDF)</DropdownMenuItem>
            <DropdownMenuItem>Detailed Runs (CSV)</DropdownMenuItem>
            <DropdownMenuItem>Organisation Stats (Excel)</DropdownMenuItem>
            <DropdownMenuItem>Viewer Feedback (CSV)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
