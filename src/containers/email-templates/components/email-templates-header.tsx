'use client'

import { Filter, Search, RotateCcw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ListEmailTemplatesParams } from '@/api/email-templates'
import { useListOrganisations } from '@/api/organisation'

interface EmailTemplatesHeaderProps {
  params: ListEmailTemplatesParams
  onFilterChange: (filters: Partial<ListEmailTemplatesParams>) => void
  onReset: () => void
}

export function EmailTemplatesHeader({
  params,
  onFilterChange,
  onReset,
}: EmailTemplatesHeaderProps) {
  const { data: organisations } = useListOrganisations({ page_limit: 100 })

  return (
    <div className='mb-8 flex items-center justify-between'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-foreground text-2xl font-bold tracking-tight'>
          Email Templates
        </h1>
        <p className='text-muted-foreground text-sm'>
          Review, approve or reject email templates
        </p>
      </div>
      <div className='flex items-center gap-3'>
        <div className='relative hidden w-64 sm:block'>
          <Search className='text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4' />
          <Input
            placeholder='Search Template...'
            className='bg-background h-9 pl-8'
            value={params.search || ''}
            onChange={(e) => onFilterChange({ search: e.target.value })}
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
              Filters
              {(params.status ||
                params.email_type ||
                params.organisation_id) && (
                <span className='bg-primary ml-2 flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white'>
                  {
                    [
                      params.status,
                      params.email_type,
                      params.organisation_id,
                    ].filter(Boolean).length
                  }
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align='end' className='w-80'>
            <div className='grid gap-4'>
              <div className='flex items-center justify-between'>
                <h4 className='leading-none font-medium'>Filters</h4>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={onReset}
                  className='text-muted-foreground hover:text-foreground h-auto px-2 py-1 text-xs'
                >
                  <RotateCcw className='mr-1 h-3 w-3' />
                  Reset
                </Button>
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='status' className='text-xs'>
                  Status
                </Label>
                <Select
                  value={params.status || 'all'}
                  onValueChange={(value) =>
                    onFilterChange({
                      status:
                        value === 'all'
                          ? undefined
                          : (value as 'verified' | 'not-verified'),
                    })
                  }
                >
                  <SelectTrigger id='status' className='h-8'>
                    <SelectValue placeholder='Select Status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Status</SelectItem>
                    <SelectItem value='verified'>Verified</SelectItem>
                    <SelectItem value='not-verified'>Not Verified</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='type' className='text-xs'>
                  Email Type
                </Label>
                <Input
                  id='type'
                  placeholder='Enter type...'
                  className='h-8'
                  value={params.email_type || ''}
                  onChange={(e) =>
                    onFilterChange({ email_type: e.target.value })
                  }
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='org' className='text-xs'>
                  Organisation
                </Label>
                <Select
                  value={params.organisation_id || 'all'}
                  onValueChange={(value) =>
                    onFilterChange({
                      organisation_id: value === 'all' ? undefined : value,
                    })
                  }
                >
                  <SelectTrigger id='org' className='h-8'>
                    <SelectValue placeholder='Select Organisation' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Organisations</SelectItem>
                    {organisations?.data.map((org) => (
                      <SelectItem key={org.id} value={org.id}>
                        {org.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
