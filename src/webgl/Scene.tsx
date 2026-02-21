"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { r3f } from "@/webgl/helpers/global";

export default function Scene(props: CanvasProps) {
  return (
    <Canvas {...props}>
      <r3f.Out />
      <Preload all />
    </Canvas>
  );
}
