import * as THREE from 'three'

async function preloadImage(
  imageUrl: string,
  axis: 'x' | 'y',
  canvasHeight: number,
  canvasWidth: number,
) {
  const img = new Image()
  img.crossOrigin = 'anonymous'

  await new Promise((resolve, reject) => {
    img.onload = () => resolve(true)
    img.onerror = () => reject(new Error(`Failed to load image: ${imageUrl}`))
    img.src = imageUrl
  })

  const aspectRatio = img.naturalWidth / img.naturalHeight

  let calculatedWidth
  let calculatedHeight

  if (axis === 'x') {
    // Horizontal layout: scale to fit canvasHeight
    calculatedHeight = canvasHeight
    calculatedWidth = canvasHeight * aspectRatio
  } else {
    // Vertical layout: scale to fit canvasWidth
    calculatedWidth = canvasWidth
    calculatedHeight = canvasWidth / aspectRatio
  }

  return { img, width: calculatedWidth, height: calculatedHeight }
}

function calculateCanvasDimensions(
  imageData: { img: HTMLImageElement; width: number; height: number }[],
  axis: 'x' | 'y',
  gap: number,
  canvasHeight: number,
  canvasWidth: number,
) {
  if (axis === 'x') {
    const totalWidth = imageData.reduce(
      (sum, data, index) => sum + data.width + (index > 0 ? gap : 0),
      0,
    )
    return { totalWidth, totalHeight: canvasHeight }
  } else {
    const totalHeight = imageData.reduce(
      (sum, data, index) => sum + data.height + (index > 0 ? gap : 0),
      0,
    )
    return { totalWidth: canvasWidth, totalHeight }
  }
}

function setupCanvas(
  canvasElement: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  dimensions: { totalWidth: number; totalHeight: number },
) {
  const { totalWidth, totalHeight } = dimensions

  const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2)

  canvasElement.width = totalWidth * devicePixelRatio
  canvasElement.height = totalHeight * devicePixelRatio

  if (devicePixelRatio !== 1) context.scale(devicePixelRatio, devicePixelRatio)

  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, totalWidth, totalHeight)
}

function drawImages(
  context: CanvasRenderingContext2D,
  imageData: { img: HTMLImageElement; width: number; height: number }[],
  axis: 'x' | 'y',
  gap: number,
) {
  let currentX = 0
  let currentY = 0

  context.save()

  for (const data of imageData) {
    context.drawImage(data.img, currentX, currentY, data.width, data.height)

    if (axis === 'x') currentX += data.width + gap
    else currentY += data.height + gap
  }

  context.restore()
}

function createTextureResult(
  canvasElement: HTMLCanvasElement,
  dimensions: { totalWidth: number; totalHeight: number },
) {
  const texture = new THREE.CanvasTexture(canvasElement)
  texture.needsUpdate = true
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.generateMipmaps = false
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter

  return {
    texture,
    dimensions: {
      width: dimensions.totalWidth,
      height: dimensions.totalHeight,
      aspectRatio: dimensions.totalWidth / dimensions.totalHeight,
    },
  }
}

interface GetCanvasTextureOptions {
  images: { url: string }[]
  gap?: number
  canvasHeight?: number
  canvasWidth?: number
  canvas?: HTMLCanvasElement
  ctx?: CanvasRenderingContext2D
  axis?: 'x' | 'y'
}
interface TextureResult {
  texture: THREE.CanvasTexture
  dimensions: {
    width: number
    height: number
    aspectRatio: number
  }
}
export async function getCanvasTexture({
  images,
  gap = 10,
  canvasHeight = 512,
  canvasWidth = 512,
  canvas,
  ctx,
  axis = 'x',
}: GetCanvasTextureOptions): Promise<TextureResult> {
  if (!images.length) throw new Error('No images')

  // Create canvas and context if not provided
  const canvasElement = canvas || document.createElement('canvas')
  const context = ctx || canvasElement.getContext('2d')

  if (!context) throw new Error('No context')

  // Preload all images in parallel
  const imageData = await Promise.all(
    images.map((image) =>
      preloadImage(image.url, axis, canvasHeight, canvasWidth),
    ),
  )

  // Calculate total canvas dimensions
  const dimensions = calculateCanvasDimensions(
    imageData,
    axis,
    gap,
    canvasHeight,
    canvasWidth,
  )

  // Setup canvas
  setupCanvas(canvasElement, context, dimensions)

  // Draw all images
  drawImages(context, imageData, axis, gap)

  // Create and return texture result
  return createTextureResult(canvasElement, dimensions)
}
