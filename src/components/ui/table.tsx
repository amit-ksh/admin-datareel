"use client"

import * as React from "react"
import { ArrowUpIcon, ArrowDownIcon, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="overflow-x-auto overflow-y-clip rounded-lg border border-gray-200">
      <table
        className={cn("min-w-full divide-y divide-gray-200 text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      className={cn("bg-gray-50 text-left text-xs uppercase text-gray-600", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      className={cn("divide-y divide-gray-100 bg-white", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, onClick, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      className={cn(
        "transition-colors hover:bg-gray-50",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      {...props}
    />
  )
}

function TableHead({ className, onClick, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "px-3 py-2 font-medium text-left align-middle",
        className
      )}
      onClick={onClick}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      className={cn("px-3 py-2 align-middle", className)}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function SortIcon({ active, order }: { active: boolean; order?: "asc" | "desc" }) {
  if (active) {
    return order === "asc" ? (
      <ArrowUpIcon className="h-3.5 w-3.5 text-gray-900" />
    ) : (
      <ArrowDownIcon className="h-3.5 w-3.5 text-gray-900" />
    )
  }
  return <ChevronsUpDown className="h-3.5 w-3.5 text-gray-400" />
}

interface SortableHeaderProps extends React.ComponentProps<"th"> {
  label: string
  sortKey: string
  currentSortBy: string
  currentSortOrder: "asc" | "desc"
  onSort: (key: string) => void
}

function SortableHeader({
  label,
  sortKey,
  currentSortBy,
  currentSortOrder,
  onSort,
  className,
  ...props
}: SortableHeaderProps) {
  const active = currentSortBy === sortKey
  return (
    <TableHead
      className={cn("group cursor-pointer select-none transition-colors hover:bg-gray-50 hover:text-gray-900", className)}
      onClick={() => onSort(sortKey)}
      {...props}
    >
      <div className="flex items-center gap-1">
        {label}
        <SortIcon active={active} order={currentSortOrder} />
      </div>
    </TableHead>
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  SortIcon,
  SortableHeader,
}
