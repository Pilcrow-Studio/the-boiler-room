import type {Metadata} from 'next'
import PageBuilder from '@/app/components/pageBuilder/PageBuilder'
import {homeQuery, settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import {generateMetadataFromSeo} from '@/sanity/lib/utils'

// Use on-demand revalidation via webhook instead of time-based
export const revalidate = false

// Temporary type until home document is published in Sanity
type HomeData = {
  _id: string
  title?: string
  seo?: any
  pageBuilder?: any[]
}

type SettingsData = {
  _id: string
  logo?: {
    asset?: {
      url: string
      extension?: string
      mimeType?: string
    }
    alt?: string
  }
  title?: string
}

export async function generateMetadata(): Promise<Metadata> {
  const {data: home} = await sanityFetch({
    query: homeQuery,
    stega: false,
  })

  if (!home) {
    return {
      title: 'Home',
      description: 'Welcome to our site',
    }
  }

  const homeData = home as unknown as HomeData

  return generateMetadataFromSeo(homeData.seo, homeData.title || 'Home', undefined)
}

export default async function Page() {
  const {data: home} = await sanityFetch({
    query: homeQuery,
  })

  const {data: settings} = await sanityFetch({
    query: settingsQuery,
    stega: false,
  })

  if (!home) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome</h1>
        <p>Please configure your home page in Sanity Studio.</p>
        <p className="text-sm mt-4">
          Make sure you&apos;ve published the home document in Sanity Studio.
        </p>
      </div>
    )
  }

  const homeData = home as unknown as HomeData
  const settingsData = settings as unknown as SettingsData

  return (
    <div>
      <div className="absolute inset-0 z-0 bg-texture pointer-events-none"></div>
      {settingsData?.logo?.asset?.url && (
        <div className="max-w-prose mx-auto px-4 pt-24">
          <img
            src={settingsData.logo.asset.url}
            alt={settingsData.logo.alt || 'Logo'}
            className="w-full"
          />
          <h1 className="sr-only">{settingsData.title}</h1>
        </div>
      )}
      <div className="relative z-10">
        <PageBuilder sections={homeData.pageBuilder} pageId={homeData._id} pageType="home" />
      </div>
    </div>
  )
}
