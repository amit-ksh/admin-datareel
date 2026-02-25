import { useState } from 'react'
import { Copy, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'

export function CloneOrganisationDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' className='flex-1 sm:flex-none'>
          <Copy className='mr-2 h-4 w-4' />
          Clone Organisation
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-[calc(100vw-2rem)] p-6 shadow-xl sm:w-[425px]'
        align='end'
      >
        <PopoverHeader className='mb-6'>
          <PopoverTitle className='text-xl font-semibold'>
            Clone Organization
          </PopoverTitle>
          <p className='text-muted-foreground mt-1.5 text-sm'>
            Duplicate organization settings and assets.
          </p>
        </PopoverHeader>

        <div className='space-y-6'>
          <div className='space-y-3'>
            <Label className='text-sm font-semibold'>Organization</Label>
            <div className='relative'>
              <div className='absolute top-1/2 left-3 -translate-y-1/2 text-blue-600'>
                <Building2 className='h-4 w-4' />
              </div>
              <Input
                defaultValue='IndraIVF'
                className='bg-slate-50/50 pl-9 dark:bg-slate-900/50'
              />
            </div>
          </div>

          <div className='space-y-4'>
            <Label className='text-muted-foreground text-xs font-bold tracking-wider uppercase'>
              Settings to clone
            </Label>

            <div className='border-border/50 flex items-center justify-between border-b py-2'>
              <div className='flex flex-col gap-1'>
                <Label className='text-sm font-medium'>Project clone</Label>
                <span className='text-muted-foreground text-xs'>
                  Copy all active project structures
                </span>
              </div>
              <Switch defaultChecked />
            </div>

            <div className='border-border/50 flex items-center justify-between border-b py-2'>
              <div className='flex flex-col gap-1'>
                <Label className='text-sm font-medium'>Video layout</Label>
                <span className='text-muted-foreground text-xs'>
                  Preserve custom player dimensions
                </span>
              </div>
              <Switch defaultChecked />
            </div>

            <div className='border-border/50 flex items-center justify-between border-b py-2'>
              <div className='flex flex-col gap-1'>
                <Label className='text-sm font-medium'>Content video</Label>
                <span className='text-muted-foreground text-xs'>
                  Include source video files
                </span>
              </div>
              <Switch defaultChecked />
            </div>

            <div className='flex items-center justify-between py-2'>
              <div className='flex flex-col gap-1'>
                <Label className='text-sm font-medium'>Avatar</Label>
                <span className='text-muted-foreground text-xs'>
                  Clone organization branding assets
                </span>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <div className='mt-8 flex justify-end gap-3'>
          <Button variant='ghost' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            className='bg-blue-600 text-white hover:bg-blue-700'
            onClick={() => setOpen(false)}
          >
            Clone Organization
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
