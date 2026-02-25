'use client'

import { useRouter } from 'next/navigation'
import images from './images'
import { Billboard, Banner } from './components'
import { View } from '@/webgl/View'
import { PerspectiveCamera } from '@react-three/drei'
import { useCollageTexture } from '@/hooks/use-collage-texture'
import dynamic from 'next/dynamic'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Layers } from 'lucide-react'
import Image from 'next/image'
import { Suspense, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Scene = dynamic(() => import('@/webgl/Scene'), { ssr: false })

const random = () => Math.random() - 0.5

const BubblingCubes = () => {
  const count = 50
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const cubes = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: random() * 40,
      y: random() * 60 - 30, // Start lower
      z: random() * 20 - 10,
      speed: random() * 0.05 + 0.02,
      scale: random() * 0.5 + 0.1,
      rotationSpeedX: random() * 0.0005,
      rotationSpeedY: random() * 0.0005,
    }))
  }, [])

  useFrame(() => {
    if (!meshRef.current) return
    cubes.forEach((cube, i) => {
      cube.y += cube.speed
      if (cube.y > 30) {
        cube.y = -30
        cube.x = (random() - 0.5) * 40
      }

      dummy.position.set(cube.x, cube.y, cube.z)
      dummy.rotation.x += cube.rotationSpeedX
      dummy.rotation.y += cube.rotationSpeedY
      dummy.scale.set(cube.scale, cube.scale, cube.scale)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color='#ffffff' transparent opacity={0.8} />
    </instancedMesh>
  )
}

const COUNT = 10
const GAP = 3.2

export default function LoginContainer() {
  const router = useRouter()
  const { texture, dimensions, isLoading } = useCollageTexture(images)

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push('/analytics')
    console.log('Login')
  }

  if (isLoading || !texture || !dimensions) return null

  return (
    <div className='bg-background relative flex min-h-screen w-full overflow-hidden'>
      {/* Left Section: Login Form */}
      <div className='border-border/50 bg-background relative z-10 flex w-full flex-1 flex-col justify-center border-r px-8 sm:px-12 md:px-24 lg:w-1/2 lg:flex-none'>
        <div className='absolute top-8 left-8 sm:left-12 md:left-24'>
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
        <div className='mx-auto mt-12 w-full max-w-[400px] space-y-8'>
          <div className='space-y-2 text-center lg:text-left'>
            <h1 className='text-3xl font-bold tracking-tight'>Welcome Back</h1>
            <p className='text-muted-foreground'>
              Enter your credentials to access your account
            </p>
          </div>

          <form className='space-y-6' onSubmit={handleLogin}>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                required
              />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='password'>Password</Label>
              </div>
              <Input
                id='password'
                type='password'
                placeholder='••••••••'
                required
              />
            </div>

            <Button type='submit' className='w-full'>
              Login
            </Button>
          </form>
        </div>
      </div>

      {/* Right Section: 3D UI */}
      <div className='relative z-0 hidden flex-1 flex-col items-center justify-center overflow-hidden bg-zinc-950 lg:flex'>
        {/* Abstract Fluid Background */}
        <div className='pointer-events-none absolute inset-0 z-0 opacity-60 mix-blend-screen'>
          <Image
            src='/datareel/Backgrounds/Backgrounds-03.svg'
            alt='Fluid Background'
            fill
            className='object-cover'
            priority
          />
        </div>

        <div className='absolute inset-0 h-full w-full'>
          <View
            orbit
            enableZoom={false}
            className='absolute inset-0 z-10 h-full w-full cursor-grab active:cursor-grabbing'
          >
            <Suspense fallback={null}>
              <PerspectiveCamera
                makeDefault
                fov={7}
                position={[0, 0, 100]}
                near={0.01}
                far={100000}
              />
              <group rotation={[-0.15, 0, -0.2]}>
                {Array.from({ length: COUNT }).map((_, index) => [
                  <Billboard
                    key={`billboard-${index}`}
                    radius={5}
                    rotation={[0, index * Math.PI * 0.5, 0]}
                    position={[
                      0,
                      (index - (Math.ceil(COUNT / 2) - 1)) * GAP,
                      0,
                    ]}
                    texture={texture}
                    dimensions={dimensions}
                  />,
                  <Banner
                    key={`banner-${index}`}
                    radius={5.035}
                    rotation={[0, 0, 0.085]}
                    position={[
                      0,
                      (index - (Math.ceil(COUNT / 2) - 1)) * GAP - GAP * 0.5,
                      0,
                    ]}
                  />,
                ])}
                <BubblingCubes />
              </group>
            </Suspense>
          </View>
          <Scene
            className='pointer-events-none absolute inset-0 z-0'
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Tagline Below Scene */}
        <div className='pointer-events-none absolute bottom-10 left-1/2 z-20 -translate-x-1/2'>
          <div className='flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900 px-4 py-2 shadow-xl backdrop-blur-sm'>
            <Layers className='h-4 w-4 text-white' />
            <span className='text-sm font-medium text-white'>
              The Future of Enterprise Communication
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
