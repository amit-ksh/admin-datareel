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
import { useForm, SubmitHandler, Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateOrganisation, useListOrganisations } from '@/api/organisation'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
    watch,
    formState: { errors },
  } = useForm<CreateOrganisationPayload>({
    resolver: zodResolver(
      createOrganisationSchema,
    ) as unknown as Resolver<CreateOrganisationPayload>,
    defaultValues: {
      orgName: '',
      adminEmail: '',
      defaultPassword: '',
      logo: undefined,
      total_tokens: 1,
      infinite_tokens: false,
      source_org_id: '',
      options: undefined,
    },
  })

  const [options, setOptions] = useState({
    personas: false,
    avatars: false,
    voices: false,
    videos: false,
    assets: false,
    templates: false,
    content_templates: false,
    render_settings: false,
    pipelines: false,
  })

  const sourceOrgId = watch('source_org_id')
  const infiniteTokens = watch('infinite_tokens')
  const { data: orgsData } = useListOrganisations({ page_limit: 100 })
  const organisations = orgsData?.docs || []

  const updateOption = (key: keyof typeof options, value: boolean) => {
    setOptions((prev) => {
      const next = { ...prev, [key]: value }

      // if pipeline true all asset will be cloned automatically
      if (key === 'pipelines' && value) {
        ;(Object.keys(next) as Array<keyof typeof options>).forEach((k) => {
          next[k] = true
        })
      }

      // if personas clone then avatar/voice and render_settings (video layout) will be cloned automatically
      if (next.personas) {
        next.avatars = true
        next.voices = true
        next.render_settings = true
      }

      // if videos, templates, avatar clone the video layout will be cloned automatically
      if (next.videos || next.templates || next.avatars) {
        next.render_settings = true
      }

      return next
    })
  }

  const isOptionDisabled = (key: keyof typeof options) => {
    if (options.pipelines && key !== 'pipelines') return true

    if (key === 'avatars' || key === 'voices' || key === 'render_settings') {
      if (options.personas) return true
    }

    if (key === 'render_settings') {
      if (options.videos || options.templates || options.avatars) return true
    }

    return false
  }

  const getLabelForKey = (key: string) => {
    switch (key) {
      case 'templates':
        return 'background'
      case 'videos':
        return 'content videos'
      case 'assets':
        return 'Overlay assets'
      case 'content_templates':
        return 'scripts'
      case 'render_settings':
        return 'Video layout'
      case 'pipelines':
        return 'projects'
      default:
        return key.replace('_', ' ')
    }
  }

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

  const onSubmit: SubmitHandler<CreateOrganisationPayload> = (data) => {
    console.log(data)
    const payload: CreateOrganisationPayload = {
      ...data,
      options: data.source_org_id ? JSON.stringify(options) : undefined,
    }
    createOrganisation(payload, {
      onSuccess: () => {
        toast.success('Organisation created successfully')
        setOpen(false)
        reset()
        setLogoPreview(null)
        setOptions({
          personas: false,
          avatars: false,
          voices: false,
          videos: false,
          assets: false,
          templates: false,
          content_templates: false,
          render_settings: false,
          pipelines: false,
        })
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
      <DialogContent className='flex max-h-[95vh] flex-col overflow-hidden p-0 sm:max-w-180'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col overflow-hidden'
        >
          <DialogHeader className='px-6 py-4'>
            <DialogTitle className='text-xl font-bold'>
              Onboard Organisation
            </DialogTitle>
            <DialogDescription className='text-xs'>
              Create a new organisation workspace and configure asset cloning.
            </DialogDescription>
          </DialogHeader>

          <div className='flex-1 overflow-y-auto px-6 py-2'>
            <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
              {/* Left Column: Basic Details */}
              <div className='space-y-3'>
                <div className='grid gap-1.5'>
                  <Label htmlFor='org-name' className='text-xs font-semibold'>
                    Organisation Name
                  </Label>
                  <Input
                    id='org-name'
                    placeholder='e.g. Acme Corp'
                    className='h-8 text-sm'
                    {...register('orgName')}
                  />
                  {errors.orgName && (
                    <p className='text-[10px] text-red-500'>
                      {errors.orgName.message}
                    </p>
                  )}
                </div>

                <div className='grid gap-1.5'>
                  <Label
                    htmlFor='admin-email'
                    className='text-xs font-semibold'
                  >
                    Admin Email
                  </Label>
                  <Input
                    id='admin-email'
                    placeholder='admin@acme.com'
                    className='h-8 text-sm'
                    {...register('adminEmail')}
                  />
                  {errors.adminEmail && (
                    <p className='text-[10px] text-red-500'>
                      {errors.adminEmail.message}
                    </p>
                  )}
                </div>

                <div className='grid gap-1.5'>
                  <Label htmlFor='password' className='text-xs font-semibold'>
                    Default Password
                  </Label>
                  <InputGroup>
                    <InputGroupInput
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Min 6 characters'
                      className='h-8 text-sm'
                      {...register('defaultPassword')}
                    />
                    <InputGroupButton
                      type='button'
                      className='h-8'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Eye className='h-3 w-3' />
                    </InputGroupButton>
                  </InputGroup>
                  {errors.defaultPassword && (
                    <p className='text-[10px] text-red-500'>
                      {errors.defaultPassword.message}
                    </p>
                  )}
                </div>
                <div className='grid gap-1.5'>
                  <Label htmlFor='source-org' className='text-xs font-semibold'>
                    Clone from Organisation
                  </Label>
                  <Select
                    onValueChange={(val) =>
                      setValue('source_org_id', val === 'none' ? '' : val)
                    }
                    value={sourceOrgId || 'none'}
                  >
                    <SelectTrigger id='source-org' className='h-8 text-xs'>
                      <SelectValue placeholder='Select an organisation' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='none'>None (Start fresh)</SelectItem>
                      {organisations.map((org) => (
                        <SelectItem key={org.id} value={org.id}>
                          {org.organisation_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.source_org_id && (
                    <p className='text-[10px] text-red-500'>
                      {errors.source_org_id.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column: Logo & Tokens */}
              <div className='space-y-3'>
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
                    className={`relative flex h-[140px] flex-col items-center justify-center gap-3 overflow-hidden rounded-lg border-2 border-dashed text-center transition-colors ${
                      isDragging
                        ? 'border-blue-500 bg-blue-50/50'
                        : 'border-muted-foreground/20 bg-muted/5 hover:bg-muted/10'
                    }`}
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
                        <div className='bg-muted/50 flex h-10 w-10 items-center justify-center rounded-full'>
                          <ImageIcon className='text-muted-foreground h-5 w-5' />
                        </div>
                        <div className='space-y-1 px-4'>
                          <div className='text-xs font-medium'>
                            Drag & drop logo here
                          </div>
                        </div>
                        <Button
                          type='button'
                          variant='outline'
                          size='sm'
                          className='h-7 text-[10px]'
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Browse
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div className='bg-muted/30 grid gap-2 rounded-md border p-2'>
                  <div className='flex items-center justify-between'>
                    <Label
                      htmlFor='infinite-tokens'
                      className='cursor-pointer text-xs font-semibold'
                    >
                      Infinite Tokens
                    </Label>
                    <Switch
                      id='infinite-tokens'
                      className='scale-90'
                      checked={infiniteTokens}
                      onCheckedChange={(checked) => {
                        setValue('infinite_tokens', checked)
                        if (checked) {
                          setValue('total_tokens', 0)
                        } else {
                          setValue('total_tokens', 1, { shouldValidate: true })
                        }
                      }}
                    />
                  </div>
                  {!infiniteTokens && (
                    <div className='grid gap-1 border-t pt-1.5'>
                      <Label
                        htmlFor='total-tokens'
                        className='text-[10px] font-medium'
                      >
                        Token Amount
                      </Label>
                      <Input
                        id='total-tokens'
                        type='number'
                        min={1}
                        className='h-7 text-xs'
                        {...register('total_tokens', { valueAsNumber: true })}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom: Clone Organisation - Full Width */}
              <div className='col-span-full'>
                {/* Clone Options - More Compact */}
                {sourceOrgId && (
                  <div className='animate-in fade-in slide-in-from-top-1 mb-4 rounded-lg border border-blue-100/50 bg-blue-50/30 p-3 duration-300'>
                    <div className='mb-2 flex items-center justify-between gap-4'>
                      <Label
                        htmlFor='source-org'
                        className='text-xs font-semibold'
                      >
                        Choose assets to clone
                      </Label>
                    </div>
                    <div className='grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-4'>
                      {(
                        Object.keys(options) as Array<keyof typeof options>
                      ).map((key) => (
                        <div
                          key={key}
                          className='flex items-center justify-between py-0.5'
                        >
                          <Label
                            htmlFor={`clone-${key}`}
                            className='text-foreground/80 cursor-pointer text-[11px] font-medium capitalize'
                          >
                            {getLabelForKey(key)}
                          </Label>
                          <Switch
                            id={`clone-${key}`}
                            checked={options[key]}
                            className='scale-75'
                            disabled={isOptionDisabled(key)}
                            onCheckedChange={(checked) =>
                              updateOption(key, checked)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className='bg-muted/5 border-t px-6 py-4 sm:justify-between'>
            <DialogClose asChild>
              <Button type='button' variant='ghost' size='sm'>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type='submit'
              disabled={isPending}
              size='sm'
              className='bg-blue-600 px-6 text-white hover:bg-blue-700'
            >
              {isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Creating...
                </>
              ) : (
                <>
                  Onboard Organisation
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
