import ResponsiveImage from './ResponsiveImage'

interface CoverImageProps {
  image: any
  priority?: boolean
}

export default function CoverImage(props: CoverImageProps) {
  const {image: source, priority} = props

  if (!source?.asset?._ref) return null

  return (
    <div className="relative">
      <ResponsiveImage
        image={source}
        className="object-cover"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />
    </div>
  )
}
