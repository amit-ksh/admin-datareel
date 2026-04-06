'use client'

import images from './images'
import { LoginScene } from './components'
import { useCollageTexture } from '@/hooks/use-collage-texture'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useLogin } from './use-login.hook'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { LOGIN_TEST_IDS } from './test-ids'

export default function LoginContainer() {
  const { texture, dimensions, isLoading } = useCollageTexture(images)

  const { handleLogin, isLoginPending } = useLogin()

  if (isLoading || !texture || !dimensions) return null

  return (
    <div className='bg-background relative flex min-h-screen w-full overflow-hidden'>
      {/* Left Section: Login Form */}
      <div className='border-border/50 bg-background relative z-10 flex w-full flex-1 flex-col justify-center border-r px-8 sm:px-12 md:px-24 lg:w-1/2 lg:flex-none'>
        <div className='absolute top-8 left-1/2 -translate-x-1/2 sm:top-12'>
          <Image
            src='/datareel/brand/logo-light.svg'
            alt='Datareel Logo'
            width={256}
            height={120}
            className='h-16 dark:hidden'
          />
          <Image
            src='/datareel/brand/logo-dark.svg'
            alt='Datareel Logo'
            width={256}
            height={120}
            className='hidden h-16 dark:block'
          />
        </div>
        <div className='mx-auto mt-12 w-full max-w-100 space-y-8'>
          <div className='space-y-2 text-center lg:text-left'>
            <h1 className='text-3xl font-bold tracking-tight'>Welcome Back</h1>
            <p className='text-muted-foreground'>
              Enter your credentials to access your account
            </p>
          </div>

          <form
            className='space-y-6'
            onSubmit={handleLogin}
            data-testid={LOGIN_TEST_IDS.FORM}
          >
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='m@example.com'
                required
                data-testid={LOGIN_TEST_IDS.EMAIL_INPUT}
              />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='password'>Password</Label>
              </div>
              <Input
                id='password'
                name='password'
                type='password'
                placeholder='••••••••'
                required
                data-testid={LOGIN_TEST_IDS.PASSWORD_INPUT}
              />
            </div>

            <Button
              type='submit'
              className='w-full'
              disabled={isLoginPending}
              data-testid={LOGIN_TEST_IDS.SUBMIT_BUTTON}
            >
              {isLoginPending ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </div>
      </div>

      {/* Right Section: 3D UI */}
      <LoginScene texture={texture} dimensions={dimensions} />
    </div>
  )
}
