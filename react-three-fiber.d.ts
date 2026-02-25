import { ThreeElement } from '@react-three/fiber'

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshBannerMaterial: ThreeElement<typeof MeshBannerMaterial>
  }
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshImageMaterial: ThreeElement<typeof MeshImageMaterial>
  }
}
