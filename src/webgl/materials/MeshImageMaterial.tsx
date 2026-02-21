import * as THREE from "three";
import { extend, ReactThreeFiber } from "@react-three/fiber";

export class MeshImageMaterial extends THREE.MeshBasicMaterial {
  constructor(parameters = {}) {
    super(parameters);
    this.setValues(parameters);
  }
  onBeforeCompile = (shader: any) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <color_fragment>",
      /* glsl */ `#include <color_fragment>
                if (!gl_FrontFacing) {
                    vec3 blackCol = vec3(0.0);
                    diffuseColor.rgb = mix(diffuseColor.rgb, blackCol, 0.7);
                }
            `,
    );
  };
}

extend({ MeshImageMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshImageMaterial: any;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshImageMaterial: any;
    }
  }
}
