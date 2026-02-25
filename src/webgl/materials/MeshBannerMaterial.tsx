import * as THREE from 'three'
import { extend, ReactThreeFiber } from '@react-three/fiber'

export class MeshBannerMaterial extends THREE.MeshBasicMaterial {
  backfaceRepeatX: number
  constructor(parameters: any = { backfaceRepeatX: 1.0 }) {
    const { backfaceRepeatX, ...materialParams } = parameters
    super(materialParams)
    this.setValues(materialParams)

    this.backfaceRepeatX = backfaceRepeatX ?? 1.0
  }

  onBeforeCompile = (shader: any) => {
    shader.uniforms.repeatX = { value: this.backfaceRepeatX }
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        /* glsl */ `#include <common>
                uniform float repeatX;

                vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ) {
                    return a + b*cos( 6.28318*(c*t+d) );
                }
            `,
      )
      .replace(
        '#include <color_fragment>',
        /* glsl */ `#include <color_fragment>
                if (!gl_FrontFacing) {
                    diffuseColor.rgb = pal( vMapUv.x * repeatX, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20) );
                }
            `,
      )
  }
}

extend({ MeshBannerMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshBannerMaterial: any
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshBannerMaterial: any
    }
  }
}
