"use client";

import { useState } from "react";
import { format, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { Download, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function OrganisationAnalyticsHeader() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 className="text-lg font-bold tracking-tight">Analytics</h2>
        <p className="text-sm text-muted-foreground">
          Monitor your organisation's performance and engagement metrics.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              size="sm"
              className={cn(
                "h-9 px-4 text-sm font-medium w-full sm:w-65 justify-start text-left bg-background hover:bg-accent hover:text-accent-foreground",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
              <span className="truncate">
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              className="hidden sm:block"
            />
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={1}
              className="block sm:hidden"
            />
          </PopoverContent>
        </Popover>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              className="w-full sm:w-auto h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow-sm"
            >
              <Download className="mr-2 h-4 w-4 shrink-0" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
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
  );
}
