'use client'

import { Button } from '@/components/ui/button'
import { Download, CalendarIcon } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format, subDays } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function AnalyticsHeader() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })

  return (
    <div className='mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center'>
      <h1 className='text-3xl font-semibold tracking-tight'>Analytics</h1>
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

        <Select defaultValue='all'>
          <SelectTrigger className='h-9 w-full text-sm font-medium sm:w-[180px]'>
            <SelectValue placeholder='Select Organisation' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Organisations</SelectItem>
            <SelectItem value='acme'>Acme Corp</SelectItem>
            <SelectItem value='stark'>Stark Industries</SelectItem>
          </SelectContent>
        </Select>

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
