import {Suspense} from 'react'
import ResolvedLink from '../utils/ResolvedLink'
import MainButton from '../ui/MainButton'

interface CallToActionProps {
  _type?: string
  _key?: string
  heading?: string
  text?: string
  buttonText?: string
  link?: any
  pageId?: string
  pageType?: string
  block?: {
    heading?: string
    text?: string
    buttonText?: string
    link?: any
  }
}

export default function CallToAction(props: CallToActionProps) {
  // Support both direct props and block prop patterns
  const { heading, text, buttonText, link } = props.block || props

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-4xl text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          {heading}
        </h2>
        {text && (
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            {text}
          </p>
        )}
        {buttonText && link && (
          <Suspense fallback={null}>
            <MainButton link={link} variant="primary" size="md" fullWidth={false}>
              {buttonText}
            </MainButton>
          </Suspense>
        )}
      </div>
    </section>
  )
}
