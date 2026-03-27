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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateOrganisation } from '@/api/organisation'
import {
  createOrganisationSchema,
  CreateOrganisationPayload,
} from '@/types/organisation'
import { toast } from 'sonner'
import { Loader2, X } from 'lucide-react'
import { useRef } from 'react'
import Image from 'next/image'

export function OnboardOrganisationDialog() {
  const [showPassword, setShowPassword] = useState(false)
  const [open, setOpen] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateOrganisationPayload>({
    resolver: zodResolver(createOrganisationSchema),
    defaultValues: {
      orgName: '',
      adminEmail: '',
      defaultPassword: '',
      logo: undefined,
    },
  })

  const { mutate: createOrganisation, isPending } = useCreateOrganisation()

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (PNG, JPG)')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      setLogoPreview(base64String)
    }
    reader.readAsDataURL(file)
    setValue('logo', file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const removeLogo = () => {
    setLogoPreview(null)
    setValue('logo', undefined)
  }

  const onSubmit = (data: CreateOrganisationPayload) => {
    createOrganisation(data, {
      onSuccess: () => {
        toast.success('Organisation created successfully')
        setOpen(false)
        reset()
        setLogoPreview(null)
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.detail || 'Failed to create organisation',
        )
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
                <Input
                  id='org-name'
                  placeholder='e.g. Acme Analytics'
                  {...register('orgName')}
                />
                {errors.orgName && (
                  <p className='text-xs text-red-500'>
                    {errors.orgName.message}
                  </p>
                )}
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='admin-email' className='font-medium'>
                  Admin Email
                </Label>
                <Input
                  id='admin-email'
                  placeholder='admin@organisation.com'
                  {...register('adminEmail')}
                />
                {errors.adminEmail && (
                  <p className='text-xs text-red-500'>
                    {errors.adminEmail.message}
                  </p>
                )}
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
                    {...register('defaultPassword')}
                  />
                  <InputGroupButton
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Eye className='h-4 w-4' />
                  </InputGroupButton>
                </InputGroup>
                {errors.defaultPassword && (
                  <p className='text-xs text-red-500'>
                    {errors.defaultPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className='space-y-2'>
              <Label className='font-medium'>Organisation Logo</Label>
              <input
                type='file'
                ref={fileInputRef}
                className='hidden'
                accept='image/*'
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFile(file)
                }}
              />
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex h-[220px] flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed text-center transition-colors ${
                  isDragging
                    ? 'border-blue-500 bg-blue-50/50'
                    : 'bg-muted/5 hover:bg-muted/10 border-muted-foreground/20'
                } relative overflow-hidden`}
              >
                {logoPreview ? (
                  <>
                    <Image
                      src={logoPreview}
                      alt='Logo Preview'
                      className='h-full w-full object-contain p-2'
                      width={512}
                      height={512}
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      className='absolute top-2 right-2 h-7 w-7 rounded-full bg-black/10 hover:bg-black/20'
                      onClick={removeLogo}
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  </>
                ) : (
                  <>
                    <div className='bg-muted/50 flex h-12 w-12 items-center justify-center rounded-full'>
                      <ImageIcon className='text-muted-foreground h-6 w-6' />
                    </div>
                    <div className='space-y-1 px-4'>
                      <div className='text-sm font-medium'>
                        Drag & drop your logo here
                      </div>
                      <div className='text-muted-foreground text-xs'>
                        PNG, JPG up to 5MB
                      </div>
                    </div>
                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      className='mt-2 text-xs'
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Browse Files
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className='sm:justify-between'>
            <DialogClose asChild>
              <Button
                type='button'
                variant='ghost'
                className='text-muted-foreground hover:text-foreground'
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type='submit'
              disabled={isPending}
              className='bg-blue-600 text-white hover:bg-blue-700'
            >
              {isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Creating...
                </>
              ) : (
                <>
                  Create Organisation
                  <span className='ml-2'>→</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
