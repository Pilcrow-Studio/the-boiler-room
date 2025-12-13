'use client'

import { SanityDocument } from 'next-sanity'
import { useOptimistic } from 'next-sanity/hooks'
import CallToAction from './CallToAction'
import InfoSection from './InfoSection'
import HomeHero from './heroes/homeHero'
import FullWidthImage from './FullWidthImage'
import { dataAttr } from '@/sanity/lib/utils'

interface PageBuilderSection {
  _type: string
  _key: string
  [key: string]: any
}

interface PageBuilderProps {
  sections?: PageBuilderSection[]
  pageId: string
  pageType: string
}

export default function PageBuilder({ sections, pageId, pageType }: PageBuilderProps) {
  const pageBuilderSections = useOptimistic<
    PageBuilderSection[] | undefined,
    SanityDocument<any>
  >(sections || [], (currentSections, action) => {
    // If the edit was to a different document, ignore it
    if (action.id !== pageId) {
      return currentSections
    }

    // If there are sections in the updated document, use them
    if (action.document.pageBuilder) {
      return action.document.pageBuilder.map(
        (section: PageBuilderSection) =>
          currentSections?.find((s) => s._key === section?._key) || section,
      )
    }

    return currentSections
  })

  if (!pageBuilderSections || pageBuilderSections.length === 0) {
    return null
  }

  return (
    <div
      data-sanity={dataAttr({
        id: pageId,
        type: pageType,
        path: `pageBuilder`,
      }).toString()}
    >
      {pageBuilderSections.map((section) => {
        const Component =
          section._type === 'callToAction' ? CallToAction :
          section._type === 'infoSection' ? InfoSection :
          section._type === 'fullWidthImage' ? FullWidthImage :
          section._type === 'homeHero' ? HomeHero :
          null

        if (!Component) {
          console.warn(`Unknown section type: ${section._type}`)
          return null
        }

        return (
          <div
            key={section._key}
            data-sanity={dataAttr({
              id: pageId,
              type: pageType,
              path: `pageBuilder[_key=="${section._key}"]`,
            }).toString()}
          >
            <Component {...section} pageId={pageId} pageType={pageType} />
          </div>
        )
      })}
    </div>
  )
}
