import {type PortableTextBlock} from 'next-sanity'
import PortableText from '../ui/PortableText'

interface InfoSectionProps {
  heading?: string
  subheading?: string
  content?: any
  _key?: string
  pageId?: string
  pageType?: string
  block?: {
    heading?: string
    subheading?: string
    content?: any
    _key?: string
  }
}

export default function InfoSection(props: InfoSectionProps) {
  // Support both direct props and block prop patterns
  const { heading, subheading, content, _key } = props.block || props
  const { pageId, pageType } = props

  return (
    
    <section className="py-16 md:py-24">
      
      <div className="container mx-auto max-w-4xl px-4">
        {subheading && (
          <p className="text-sm uppercase tracking-wide mb-2 font-medium">
            {subheading}
          </p>
        )}
        {heading && (
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            {heading}
          </h2>
        )}
        {content && (
          <div>
            <PortableText
              value={content as PortableTextBlock[]}
              documentId={pageId}
              documentType={pageType}
              fieldPath={_key ? `pageBuilder[_key=="${_key}"].content` : 'content'}
            />
          </div>
        )}
      </div>
    </section>
  )
}
