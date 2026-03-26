'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, Building2, Loader2 } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useInfiniteListOrganisations } from '@/api/organisation'
import { useDebounce } from '@/hooks/use-debounce'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface OrganisationSelectPopoverProps {
  selectedOrgId: string
  onSelect: (id: string) => void
}

export function OrganisationSelectPopover({
  selectedOrgId,
  onSelect,
}: OrganisationSelectPopoverProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const debouncedSearch = useDebounce(search, 300)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteListOrganisations({
      search: debouncedSearch,
      page_limit: 20,
      sort_by: 'videos',
      sort_order: 'desc',
    })

  const { ref, inView } = useInView()

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const organisations = data?.pages.flatMap((page) => page.docs) || []

  // Try to find the selected org in the flat list
  const selectedOrg = organisations.find((org) => org.id === selectedOrgId)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='h-9 w-full justify-between border-zinc-200 bg-white text-xs font-semibold hover:bg-zinc-50 sm:w-[240px] dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900'
        >
          <div className='flex items-center gap-2 truncate'>
            {selectedOrg ? (
              <>
                <Avatar className='h-5 w-5 rounded-sm border border-zinc-200 dark:border-zinc-800'>
                  <AvatarImage
                    src={selectedOrg.organisation_logo || undefined}
                  />
                  <AvatarFallback className='rounded-sm bg-zinc-100 text-[10px] font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'>
                    {selectedOrg.organisation_name
                      .substring(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className='truncate'>
                  {selectedOrg.organisation_name}
                </span>
              </>
            ) : selectedOrgId && selectedOrgId !== 'all' ? (
              <div className='flex items-center gap-2'>
                <Building2 className='text-muted-foreground h-4 w-4' />
                <span className='truncate'>
                  Org: {selectedOrgId.slice(0, 8)}...
                </span>
              </div>
            ) : (
              <div className='flex items-center gap-2'>
                <Building2 className='text-muted-foreground h-4 w-4' />
                <span>All Organisations</span>
              </div>
            )}
          </div>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[280px] p-0 shadow-xl' align='start'>
        <Command shouldFilter={false} className='border-none'>
          <CommandInput
            placeholder='Search organisations...'
            value={search}
            onValueChange={setSearch}
            className='h-10 text-xs'
          />
          <CommandList className='max-h-[300px]'>
            {isLoading && !isFetchingNextPage ? (
              <div className='flex items-center justify-center p-8'>
                <Loader2 className='h-5 w-5 animate-spin text-blue-600' />
              </div>
            ) : (
              <>
                <CommandEmpty className='text-muted-foreground py-6 text-center text-xs'>
                  No organisations found.
                </CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      onSelect('')
                      setOpen(false)
                    }}
                    className='flex cursor-pointer items-center justify-between py-2 text-xs'
                  >
                    <div className='flex items-center gap-2'>
                      <div className='flex h-5 w-5 items-center justify-center rounded-sm bg-zinc-100 ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700'>
                        <Building2 className='h-3 w-3 text-zinc-600 dark:text-zinc-400' />
                      </div>
                      <span className='font-semibold'>All Organisations</span>
                    </div>
                    {(!selectedOrgId || selectedOrgId === 'all') && (
                      <Check className='h-3.5 w-3.5 text-blue-600' />
                    )}
                  </CommandItem>

                  {organisations.map((org) => (
                    <CommandItem
                      key={org.id}
                      onSelect={() => {
                        onSelect(org.id)
                        setOpen(false)
                      }}
                      className='flex cursor-pointer items-center justify-between py-2 text-xs'
                    >
                      <div className='flex items-center gap-2'>
                        <Avatar className='h-5 w-5 rounded-sm border border-zinc-200 dark:border-zinc-800'>
                          <AvatarImage
                            src={org.organisation_logo || undefined}
                          />
                          <AvatarFallback className='rounded-sm bg-zinc-100 text-[10px] font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'>
                            {org.organisation_name
                              .substring(0, 2)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className='truncate'>
                          {org.organisation_name}
                        </span>
                      </div>
                      {selectedOrgId === org.id && (
                        <Check className='h-3.5 w-3.5 text-blue-600' />
                      )}
                    </CommandItem>
                  ))}

                  <div
                    ref={ref}
                    className='flex items-center justify-center py-4'
                  >
                    {isFetchingNextPage ? (
                      <Loader2 className='h-4 w-4 animate-spin text-blue-600' />
                    ) : hasNextPage ? (
                      <span className='text-muted-foreground text-[10px]'>
                        Scroll for more
                      </span>
                    ) : organisations.length > 0 ? (
                      <span className='text-muted-foreground text-[10px]'>
                        End of list
                      </span>
                    ) : null}
                  </div>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
