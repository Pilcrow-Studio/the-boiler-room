import {stegaClean} from '@sanity/client/stega'
import {getImageDimensions} from '@sanity/asset-utils'
import {urlForImage} from '@/sanity/lib/utils'

export interface ResponsiveImageProps {
  image: {
    asset?: any
    alt?: string
    hotspot?: {x: number; y: number; height: number; width: number}
    crop?: {top: number; bottom: number; left: number; right: number}
    metadata?: {lqip?: string}
  }
  sizes?: string
  widths?: number[]
  quality?: number
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
  className?: string
  alt?: string
  style?: React.CSSProperties
  usePixelDensity?: boolean
  baseWidth?: number
  aspectRatio?: number
  fit?: 'max' | 'crop' | 'clip' | 'fill' | 'min' | 'scale'
  
}

export default function ResponsiveImage({
  image,
  sizes = '100vw',
  widths = [640, 750, 828, 1024, 1280, 1536, 1920],
  quality = 80,
  loading = 'lazy',
  fetchPriority = 'auto',
  className = '',
  alt,
  style,
  usePixelDensity = false,
  baseWidth = 1024,
  aspectRatio,
  fit = 'max',
}: ResponsiveImageProps) {
  if (!image?.asset || (!image.asset._ref && !image.asset._id)) return null

  // Hotspot → object-position
  const objectPosition = image?.hotspot
    ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
    : '50% 50%'

  const combinedStyle: React.CSSProperties = {
    objectPosition,
    ...style,
  }

  // Aspect ratio
  const getAspectRatio = () => {
    if (aspectRatio) return aspectRatio

    try {
      const dimensions = getImageDimensions(image)
      if (dimensions?.width && dimensions?.height) {
        return dimensions.width / dimensions.height
      }
    } catch (e) {
      // Fallback if dimensions can't be determined
    }

    return 16 / 9
  }

  const ratio = getAspectRatio()

  // Base Sanity builder
  const build = (width: number, format: 'webp' | 'jpg') => {
    const height = Math.round(width / ratio)
    let builder = urlForImage(image, width, height)

    if (!builder) return ''

    return builder
      .quality(quality)
      .fit(fit)
      .format(format)
      .url()
  }

  // SRCSET GENERATORS
  const generateDensitySets = () => {
    const densities = [1, 2, 3]
    const webp = densities
      .map((d) => `${build(baseWidth * d, 'webp')} ${d}x`)
      .join(', ')
    const jpeg = densities
      .map((d) => `${build(baseWidth * d, 'jpg')} ${d}x`)
      .join(', ')
    const fallback = build(baseWidth, 'jpg')
    return {webp, jpeg, fallback}
  }

  const generateWidthSets = () => {
    const webp = widths.map((w) => `${build(w, 'webp')} ${w}w`).join(', ')
    const jpeg = widths.map((w) => `${build(w, 'jpg')} ${w}w`).join(', ')
    const fallback = build(widths[widths.length - 1], 'jpg')
    return {webp, jpeg, fallback}
  }

  const responsive = usePixelDensity ? generateDensitySets() : generateWidthSets()

  const imgWidth = usePixelDensity ? baseWidth : widths[widths.length - 1]
  const imgHeight = Math.round(imgWidth / ratio)
  const imageAlt = stegaClean(alt || image?.alt || '')

  return (
    <picture className="h-full" style={{position: 'relative', display: 'block'}}>
      <source
        type="image/webp"
        srcSet={responsive.webp}
        {...(!usePixelDensity && {sizes})}
      />
      <source
        type="image/jpeg"
        srcSet={responsive.jpeg}
        {...(!usePixelDensity && {sizes})}
      />

      <img
        src={responsive.fallback}
        srcSet={responsive.jpeg}
        width={imgWidth}
        height={imgHeight}
        alt={imageAlt}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        className={className}
        style={combinedStyle}
        {...(!usePixelDensity && {sizes})}
      />
    </picture>
  )
}
