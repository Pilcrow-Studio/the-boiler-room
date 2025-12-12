import {draftMode} from 'next/headers'
import {client} from './client'

/**
 * Regular sanityFetch without live preview to reduce serverless function costs
 * Draft mode is still supported for content editors
 */

type SanityFetchParams = {
  query: string
  params?: Record<string, any>
  stega?: boolean
  perspective?: 'published' | 'drafts'
}

export async function sanityFetch<T = any>({
  query,
  params = {},
  stega,
  perspective,
}: SanityFetchParams): Promise<{data: T}> {
  // Only check draft mode if we're in a request context (not during static generation)
  // If perspective is explicitly set, respect it without checking draftMode
  let isDraftMode = false
  let finalPerspective = perspective || 'published'

  if (!perspective) {
    try {
      const draft = await draftMode()
      isDraftMode = draft.isEnabled
      finalPerspective = isDraftMode ? 'drafts' : 'published'
    } catch {
      // We're in a static context (like generateStaticParams), use published perspective
      finalPerspective = 'published'
    }
  }

  const data = await client.fetch<T>(query, params, {
    perspective: finalPerspective,
    useCdn: perspective === 'published' || !isDraftMode, // Use CDN for published content
    stega: stega !== false && isDraftMode, // Enable stega only in draft mode unless explicitly disabled
    next: {
      revalidate: isDraftMode ? 0 : undefined, // No cache in draft mode
    },
  })

  return {data}
}

// Dummy component for backwards compatibility (no longer needed)
export function SanityLive() {
  return null
}
