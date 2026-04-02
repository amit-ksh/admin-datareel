'use client'

import { Billboard, Banner } from './'
import { View } from '@/webgl/View'
import { PerspectiveCamera } from '@react-three/drei'
import dynamic from 'next/dynamic'
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
      y: random() * 60 - 30,
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

interface LoginSceneProps {
  texture: THREE.Texture
  dimensions: { width: number; height: number; aspectRatio: number }
}

export function LoginScene({ texture, dimensions }: LoginSceneProps) {
  return (
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
              {Array.from({ length: COUNT }).map((_, index) => (
                <Suspense key={`suspended-billboard-${index}`} fallback={null}>
                  <Billboard
                    radius={5}
                    rotation={[0, index * Math.PI * 0.5, 0]}
                    position={[
                      0,
                      (index - (Math.ceil(COUNT / 2) - 1)) * GAP,
                      0,
                    ]}
                    texture={texture}
                    dimensions={dimensions}
                  />
                  <Banner
                    radius={5.035}
                    rotation={[0, 0, 0.085]}
                    position={[
                      0,
                      (index - (Math.ceil(COUNT / 2) - 1)) * GAP - GAP * 0.5,
                      0,
                    ]}
                  />
                </Suspense>
              ))}
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
  )
}
