'use client'

import ClientToaster from './ClientToaster'
import DraftModeToast from './DraftModeToast'
import ClickEmboss from '@/app/components/interactive/clickEmboss'

export default function LayoutContent({
  children,
  isDraftMode,
}: {
  children: React.ReactNode
  isDraftMode: boolean
}) {
  return (
    <>
      <ClientToaster />
      {isDraftMode && <DraftModeToast />}
      <div className="flex flex-col justify-between grow z-10">
        <main className="page-wrapper">{children}</main>
      </div>
      <ClickEmboss />
    </>
  )
}
