'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Building2, Filter, LogIn, Users, ArrowUpDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Organisation {
  id: string
  name: string
  activeTenants: number
}

interface OrganisationListProps {
  organisations: Organisation[]
  onLogin: (org: Organisation) => void
}

function OrganisationCard({
  org,
  onLogin,
}: {
  org: Organisation
  onLogin: (org: Organisation) => void
}) {
  return (
    <Card className='border transition-shadow duration-200 hover:shadow-sm'>
      <CardContent className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          {/* Icon */}
          <div className='bg-muted/60 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border'>
            <Building2 className='text-muted-foreground h-6 w-6' />
          </div>

          {/* Org Info */}
          <div>
            <p className='text-foreground text-sm font-bold'>{org.name}</p>
            <div className='mt-0.5 flex items-center gap-1.5'>
              <Users className='text-muted-foreground h-3.5 w-3.5' />
              <span className='text-muted-foreground text-xs'>
                {org.activeTenants} Active Tenants
              </span>
            </div>
          </div>
        </div>

        {/* Login Button */}
        <Button
          variant='outline'
          size='sm'
          className='h-9 border-blue-200 bg-blue-50 px-4 text-sm font-medium text-blue-600 transition-colors hover:border-blue-300 hover:bg-blue-100 hover:text-blue-700'
          onClick={() => onLogin(org)}
        >
          Login
          <LogIn className='ml-2 h-3.5 w-3.5' />
        </Button>
      </CardContent>
    </Card>
  )
}

export function OrganisationList({
  organisations,
  onLogin,
}: OrganisationListProps) {
  return (
    <div>
      {/* Section Header */}
      <div className='mb-5 flex items-center justify-between'>
        <div className='flex items-center gap-2.5'>
          <h2 className='text-foreground text-xl font-bold tracking-tight'>
            Organisations
          </h2>
          <span className='bg-muted text-muted-foreground inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-semibold'>
            {organisations.length}
          </span>
        </div>
        <div className='flex items-center gap-3'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                size='sm'
                className='bg-background hover:bg-muted/50 h-9 px-4 text-sm font-medium'
              >
                <Filter className='mr-2 h-3.5 w-3.5' />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-48'>
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Join Date</DropdownMenuItem>
              <DropdownMenuItem>Feedback Score</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                size='sm'
                className='bg-background hover:bg-muted/50 h-9 px-4 text-sm font-medium'
              >
                <ArrowUpDown className='mr-2 h-3.5 w-3.5' />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-48'>
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Total Videos</DropdownMenuItem>
              <DropdownMenuItem>Joined At</DropdownMenuItem>
              <DropdownMenuItem>Feedback Score</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Organisation Cards */}
      <div className='flex flex-col gap-3'>
        {organisations.map((org) => (
          <OrganisationCard key={org.id} org={org} onLogin={onLogin} />
        ))}
      </div>
    </div>
  )
}
