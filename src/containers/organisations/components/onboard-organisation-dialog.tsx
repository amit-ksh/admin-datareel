'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, Plus, Image as ImageIcon } from 'lucide-react'
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { useState } from 'react'

export function OnboardOrganisationDialog() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size='sm'
          className='hidden h-9 bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700 sm:flex'
        >
          <Plus className='mr-2 h-4 w-4' />
          Onboard
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-175'>
        <DialogHeader>
          <DialogTitle className='text-xl'>Onboard Organisation</DialogTitle>
          <DialogDescription>
            Set up your workspace to start analyzing video content with
            high-fidelity insights.
          </DialogDescription>
        </DialogHeader>

        <div className='grid grid-cols-1 gap-6 py-4 md:grid-cols-2'>
          <div className='space-y-4'>
            <div className='grid gap-2'>
              <Label htmlFor='org-name' className='font-medium'>
                Organisation Name
              </Label>
              <Input id='org-name' placeholder='e.g. Acme Analytics' />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='admin-email' className='font-medium'>
                Admin Email
              </Label>
              <Input id='admin-email' placeholder='admin@organisation.com' />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='password' className='font-medium'>
                Default Password
              </Label>
              <InputGroup>
                <InputGroupInput
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='........'
                  defaultValue='........'
                />
                <InputGroupButton
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Eye className='h-4 w-4' />
                </InputGroupButton>
              </InputGroup>
            </div>
          </div>

          <div className='space-y-2'>
            <Label className='font-medium'>Organisation Logo</Label>
            <div className='bg-muted/5 hover:bg-muted/10 flex h-[220px] flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed text-center transition-colors'>
              <div className='bg-muted/50 flex h-12 w-12 items-center justify-center rounded-full'>
                <ImageIcon className='text-muted-foreground h-6 w-6' />
              </div>
              <div className='space-y-1'>
                <div className='text-sm font-medium'>
                  Drag & drop your logo here
                </div>
                <div className='text-muted-foreground text-xs'>
                  PNG, JPG up to 5MB
                </div>
              </div>
              <Button variant='outline' size='sm' className='mt-2 text-xs'>
                Browse Files
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className='sm:justify-between'>
          <DialogClose asChild>
            <Button
              variant='ghost'
              className='text-muted-foreground hover:text-foreground'
            >
              Cancel
            </Button>
          </DialogClose>
          <Button className='bg-blue-600 text-white hover:bg-blue-700'>
            Create Organisation
            <span className='ml-2'>→</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
