import ResponsiveImage from '../ui/ResponsiveImage'

interface FullWidthImageProps {
  image?: {
    asset?: any
    alt?: string
    _type?: string
  }
  alt?: string
  _type?: string
  _key?: string
  block?: {
    image?: {
      asset?: any
      alt?: string
      _type?: string
    }
    alt?: string
  }
}

export default function FullWidthImage(props: FullWidthImageProps) {
  // Support both direct props and block prop patterns
  const { image, alt } = props.block || props

  // Handle both direct image prop and nested structure
  const imageData = image?.asset ? image : null
  const altText = alt || image?.alt || ''

  if (!imageData) return null

  return (
    <section className="w-full">
      <div className="relative w-full aspect-video">
        <ResponsiveImage
          image={imageData}
          alt={altText}
          className="w-full h-full object-cover"
          sizes="100vw"
          quality={80}
          loading="eager"
          usePixelDensity={true}
          baseWidth={560}
          fetchPriority="high"
          aspectRatio={16/9}
          fit="crop"
        />
      </div>
    </section>
  )
}
