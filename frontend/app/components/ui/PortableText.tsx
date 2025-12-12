/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import {PortableText, type PortableTextComponents, type PortableTextBlock} from 'next-sanity'
import '@/app/styles/portable-text.css'

import ResolvedLink from '@/app/components/utils/ResolvedLink'
import ResponsiveImage from './ResponsiveImage'
import {dataAttr} from '@/sanity/lib/utils'

export default function CustomPortableText({
  className,
  value,
  documentId,
  documentType,
  fieldPath = 'content',
}: {
  className?: string
  value: PortableTextBlock[]
  documentId?: string
  documentType?: string
  fieldPath?: string
}) {
  const components: PortableTextComponents = {
    block: {
      h1: ({children, value}) => (
        <h1 id={value?._key}>{children}</h1>
      ),
      h2: ({children, value}) => (
        <h2 id={value?._key}>{children}</h2>
      ),
      h3: ({children, value}) => (
        <h3 id={value?._key}>{children}</h3>
      ),
      h4: ({children, value}) => (
        <h4 id={value?._key}>{children}</h4>
      ),
      h5: ({children, value}) => (
        <h5 id={value?._key}>{children}</h5>
      ),
      h6: ({children, value}) => (
        <h6 id={value?._key}>{children}</h6>
      ),
    },
    marks: {
      link: ({children, value: link}) => {
        return <ResolvedLink link={link}>{children}</ResolvedLink>
      },
      sup: ({children}) => <sup>{children}</sup>,
      sub: ({children}) => <sub>{children}</sub>,
    },
    types: {
      image: ({value}) => {
        if (!value?.asset) return null

        const imageDataAttr =
          documentId && documentType && value._key
            ? dataAttr({
                id: documentId,
                type: documentType,
                path: `${fieldPath}[_key=="${value._key}"]`,
              }).toString()
            : undefined

        return (
          <figure className="my-8" data-sanity={imageDataAttr}>
            <ResponsiveImage
              image={value}
              alt={value.alt}
              className="w-full h-auto"
              sizes="(max-width: 768px) 500px, 768px"
              quality={70}
              fit="max"
            />
            {value.caption && (
              <figcaption className="mt-2 text-center text-xs font-mono uppercase">
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      },
    },
  }

  return (
    <div className={['portable-text', className].filter(Boolean).join(' ')}>
      <PortableText components={components} value={value} />
    </div>
  )
}
