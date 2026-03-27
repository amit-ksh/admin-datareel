import { Button } from '@/components/ui/button'
import { Search, RotateCcwIcon } from 'lucide-react'
import { OnboardOrganisationDialog } from './onboard-organisation-dialog'
import { Input } from '@/components/ui/input'
import { ListOrganisationsParams } from '@/types/organisation'

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

        <Button
          variant='ghost'
          size='sm'
          onClick={resetFilters}
          className='text-muted-foreground h-8 text-xs'
        >
          <RotateCcwIcon className='h-3 w-3' />
          Reset
        </Button>

        <OnboardOrganisationDialog />
      </div>
    </div>
  )
}
