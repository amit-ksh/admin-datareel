import { useState, useEffect, useCallback } from 'react'
import * as THREE from 'three'

import { getCanvasTexture } from '@/webgl/helpers/getCanvasTexture'

interface Images {
  url: string
}
;[]

interface UseCollageTextureOptions {
  gap?: number
  canvasHeight?: number
  canvasWidth?: number
  axis?: 'x' | 'y'
}
export function useCollageTexture(
  images: Images[],
  options: UseCollageTextureOptions = {},
) {
  const [textureResults, setTextureResults] = useState<{
    texture: THREE.CanvasTexture
    dimensions: { width: number; height: number; aspectRatio: number }
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const { gap = 0, canvasHeight = 512, canvasWidth = 512, axis = 'x' } = options

  const createTexture = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const result = await getCanvasTexture({
        images,
        gap,
        canvasHeight,
        canvasWidth,
        axis,
      })
      setTextureResults(result)
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to create texture'),
      )
    } finally {
      setIsLoading(false)
    }
  }, [images, gap, canvasHeight, canvasWidth, axis])

  useEffect(() => {
    if (images.length > 0) createTexture()
  }, [images.length, createTexture])

  return {
    texture: textureResults?.texture || null,
    dimensions: textureResults?.dimensions || null,
    isLoading,
    error,
  } as const
}
