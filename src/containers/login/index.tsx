"use client";

import images from "./images";
import { Billboard, Banner } from "./components";
import { View } from "@/webgl/View";
import { PerspectiveCamera } from "@react-three/drei";
import { useCollageTexture } from "@/hooks/use-collage-texture";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Layers } from "lucide-react";
import Image from "next/image";
import { Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Scene = dynamic(() => import("@/webgl/Scene"), { ssr: false });

const BubblingCubes = () => {
  const count = 50;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const cubes = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 40,
      y: (Math.random() - 0.5) * 60 - 30, // Start lower
      z: (Math.random() - 0.5) * 20 - 20,
      speed: Math.random() * 0.05 + 0.02,
      scale: Math.random() * 0.5 + 0.1,
      rotationSpeedX: Math.random() * 0.0005,
      rotationSpeedY: Math.random() * 0.0005,
    }));
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    cubes.forEach((cube, i) => {
      cube.y += cube.speed;
      if (cube.y > 30) {
        cube.y = -30;
        cube.x = (Math.random() - 0.5) * 40;
      }
      
      dummy.position.set(cube.x, cube.y, cube.z);
      dummy.rotation.x += cube.rotationSpeedX;
      dummy.rotation.y += cube.rotationSpeedY;
      dummy.scale.set(cube.scale, cube.scale, cube.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined as any, undefined as any, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
    </instancedMesh>
  );
};

const COUNT = 10;
const GAP = 3.2;

export default function LoginContainer() {
  const { texture, dimensions, isLoading } = useCollageTexture(images);

  if (isLoading || !texture || !dimensions) return null;

  return (
    <div className="flex min-h-screen w-full bg-background relative overflow-hidden">
      {/* Left Section: Login Form */}
      <div className="flex flex-1 flex-col justify-center px-8 sm:px-12 md:px-24 border-r border-border/50 relative w-full lg:w-1/2 lg:flex-none z-10 bg-background">
        <div className="absolute top-8 left-8 sm:left-12 md:left-24">
          <Image
            src="/datareel/brand/logo-light.svg"
            alt="Datareel Logo"
            width={256}
            height={120}
            className="dark:hidden h-16"
          />
          <Image
            src="/datareel/brand/logo-dark.svg"
            alt="Datareel Logo"
            width={256}
            height={120}
            className="hidden dark:block h-16"
          />
        </div>
        <div className="mx-auto w-full max-w-[400px] space-y-8 mt-12">
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </div>

      {/* Right Section: 3D UI */}
      <div className="hidden lg:flex flex-1 flex-col relative bg-zinc-950 items-center justify-center overflow-hidden z-0">
        {/* Abstract Fluid Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen">
          <Image
            src="/datareel/Backgrounds/Backgrounds-03.svg"
            alt="Fluid Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="absolute inset-0 w-full h-full">
          <View orbit enableZoom={false} className="absolute inset-0 w-full h-full z-10 cursor-grab active:cursor-grabbing">
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
                    position={[0, (index - (Math.ceil(COUNT / 2) - 1)) * GAP, 0]}
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
            className="pointer-events-none absolute inset-0 z-0" 
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        
        {/* Tagline Below Scene */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-white/10 shadow-xl backdrop-blur-sm">
            <Layers className="w-4 h-4 text-white" />
            <span className="font-medium text-sm text-white">
              The Future of Enterprise Communication
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
