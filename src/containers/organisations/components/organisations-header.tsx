import { Button } from '@/components/ui/button'
import { Filter, Search } from 'lucide-react'
import { OnboardOrganisationDialog } from './onboard-organisation-dialog'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function OrganisationsHeader() {
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
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              size='sm'
              className='bg-background hover:bg-muted/50 hidden h-9 px-4 text-sm font-medium sm:flex'
            >
              <Filter className='mr-2 h-4 w-4' />
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

        <OnboardOrganisationDialog />
      </div>
    </div>
  )
}
