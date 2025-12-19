import './styles/globals.css'

import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Viewport} from 'next'
import {Geist} from 'next/font/google'
import {draftMode} from 'next/headers'
import {Suspense} from 'react'
import {VisualEditing} from 'next-sanity/visual-editing'
import {SanityLive} from '@/sanity/lib/live'
import {handleError} from '@/app/client-utils'
import LayoutContent from '@/app/components/utils/LayoutContent'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const {isEnabled: isDraftMode} = await draftMode()

  return (
    <html lang="en" className={`${geist.variable} bg-white text-black`}>
      <body suppressHydrationWarning>
        <Suspense>
          <div className="min-h-screen flex flex-col">
            {isDraftMode && (
              <>
                <VisualEditing />
              </>
            )}
            <SanityLive onError={handleError} />
            <LayoutContent isDraftMode={isDraftMode}>{children}</LayoutContent>
          </div>
        </Suspense>
      </body>
      <SpeedInsights />
    </html>
  )
}
