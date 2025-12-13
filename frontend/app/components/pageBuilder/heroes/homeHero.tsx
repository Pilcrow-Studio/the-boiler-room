import PortableText from '@/app/components/ui/PortableText'

interface HomeHeroProps {
    _type?: string
    _key?: string
    heading?: string
    content?: any
    block?: {
      heading?: string
      content?: any
    }
  }
export default function HomeHero(props: HomeHeroProps) {
  const { heading, content } = props.block || props
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-prose mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">{heading}</h1>
          <PortableText value={content} />
    </div>
    </section>
  )
}