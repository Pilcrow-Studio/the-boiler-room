import './styles/globals.css'

import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata, Viewport} from 'next'
import {Geist} from 'next/font/google'
import {draftMode} from 'next/headers'
import {toPlainText} from 'next-sanity'
import {VisualEditing} from 'next-sanity/visual-editing'
import {Toaster} from 'sonner'
import DraftModeToast from '@/app/components/utils/DraftModeToast'
import Footer from '@/app/components/global/Footer'
import Header from '@/app/components/global/Header'
import * as demo from '@/sanity/lib/demo'
import {sanityFetch, SanityLive} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'
import {handleError} from './client-utils'
import ClickEmboss from '@/app/components/interactive/clickEmboss'
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
      <body>
        <div className="min-h-screen flex flex-col" suppressHydrationWarning={true}>
          {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /app/components/DraftModeToast.tsx */}
          <Toaster />
          {isDraftMode && (
            <>
              <DraftModeToast />
              <VisualEditing />
            </>
          )}
          <SanityLive onError={handleError} />
          <div className="flex flex-col justify-between grow z-10">
            <main className="page-wrapper">{children}</main>
          </div>
          <ClickEmboss />
        </div>
      </body>
      <SpeedInsights />
    </html>
  )
}
