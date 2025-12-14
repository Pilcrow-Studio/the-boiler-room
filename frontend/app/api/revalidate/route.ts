import {revalidatePath} from 'next/cache'
import {type NextRequest, NextResponse} from 'next/server'
import {parseBody} from 'next-sanity/webhook'

/**
 * Webhook endpoint for Sanity content revalidation.
 *
 * Set this URL in your Sanity webhook configuration:
 * https://your-domain.vercel.app/api/revalidate
 *
 * Make sure to set the secret in Sanity and add SANITY_REVALIDATE_SECRET to your environment variables.
 */

export async function POST(req: NextRequest) {
  try {
    const {isValidSignature, body} = await parseBody<{
      _type: string
      slug?: {current?: string}
    }>(req, process.env.SANITY_REVALIDATE_SECRET)

    // Validate the webhook signature
    if (!isValidSignature) {
      const message = 'Invalid signature'
      return new NextResponse(JSON.stringify({message, isValidSignature, body}), {
        status: 401,
      })
    }

    // If no body, signature was valid but no content
    if (!body?._type) {
      const message = 'Bad Request'
      return new NextResponse(JSON.stringify({message, body}), {status: 400})
    }

    // Revalidate based on document type
    const revalidatedPaths: string[] = []

    switch (body._type) {
      case 'post':
        // Revalidate the specific post page
        if (body.slug?.current) {
          revalidatePath(`/posts/${body.slug.current}`)
          revalidatedPaths.push(`/posts/${body.slug.current}`)
        }
        // Revalidate the home page (if it shows recent posts)
        revalidatePath('/', 'page')
        revalidatedPaths.push('/')
        break

      case 'page':
        // Revalidate the specific page
        if (body.slug?.current) {
          revalidatePath(`/${body.slug.current}`, 'page')
          revalidatedPaths.push(`/${body.slug.current}`)
        }
        break

      case 'home':
        // Revalidate the home page
        revalidatePath('/', 'page')
        revalidatedPaths.push('/')
        break

      case 'settings':
        // Settings affect all pages, revalidate everything
        revalidatePath('/', 'layout')
        revalidatedPaths.push('/ (layout)')
        break

      default:
        // For any other content type, revalidate the home page
        revalidatePath('/', 'page')
        revalidatedPaths.push('/')
    }

    console.log('Revalidated paths:', revalidatedPaths)

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
      paths: revalidatedPaths,
    })
  } catch (err: unknown) {
    console.error('Error in revalidate webhook:', err)
    return new NextResponse(
      JSON.stringify({
        message: err instanceof Error ? err.message : 'Internal Server Error',
      }),
      {status: 500},
    )
  }
}
