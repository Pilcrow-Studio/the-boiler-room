import type {Metadata} from 'next'
import PageBuilder from '@/app/components/pageBuilder/PageBuilder'
import {homeQuery} from '@/sanity/lib/queries'
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
  return (
    <div>
      <PageBuilder
        sections={homeData.pageBuilder}
        pageId={homeData._id}
        pageType="home"
      />
    </div>
  )
}
