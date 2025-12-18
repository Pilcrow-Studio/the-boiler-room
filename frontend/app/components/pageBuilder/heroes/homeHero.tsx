import PortableText from '@/app/components/ui/PortableText'
import TextAnimation from '@/app/components/textAnimation'

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
  const {heading, content} = props.block || props
  return (
    <section className="py-8 md:py-12">
      <div className="max-w-prose mx-auto px-4">
        <PortableText value={content} />
      </div>
    </section>
  )
}
