'use client'

import {useEffect, useState} from 'react'
import Link from 'next/link'

type NavigationItem = {
  text?: string
  slug?: string
  linkType?: 'default' | 'dropdown' | 'cta'
  dropdownItems?: Array<{
    text?: string
    slug?: string
  }>
}

type MobileMenuProps = {
  items: NavigationItem[]
}

export default function MobileMenu({items}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-sm font-mono tracking-tight hover:underline"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? 'Close' : 'Menu'}
      </button>

      {/* Fullscreen Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed left-0 right-0 top-(--nav-height) h-[calc(100vh-var(--nav-height))] z-40 bg-white dark:bg-black md:hidden">
          <div className="container h-full flex flex-col">
            {/* Navigation Items */}
            <nav className="flex-1 flex items-start justify-start pt-12 px-2 sm:px-6">
              <ul role="list" className="flex flex-col items-start gap-6 text-2xl font-mono tracking-tight">
                <li>
                  <Link href="/" onClick={closeMenu} className="text-2xl font-mono tracking-tight hover:underline">
                    Home
                  </Link>
                </li>
                {items.map((item, index) => {
                  const linkType = item.linkType || 'default'

                  // For dropdown items - show parent and sub-items
                  if (linkType === 'dropdown' && item.dropdownItems?.length) {
                    return (
                      <li key={index} className="w-full">
                        <div className="text-lg opacity-60 mb-3">{item.text}</div>
                        <ul className="flex flex-col gap-3 pl-4">
                          {item.dropdownItems.map((subItem, subIndex) => {
                            if (!subItem?.slug || !subItem?.text) return null
                            const subHref = subItem.slug === 'home' || subItem.slug === '/' ? '/' : `/${subItem.slug}`
                            return (
                              <li key={subIndex}>
                                <Link
                                  href={subHref}
                                  onClick={closeMenu}
                                  className="text-xl hover:underline"
                                >
                                  {subItem.text}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </li>
                    )
                  }

                  // For CTA and default links
                  if (!item?.text) return null

                  // Skip if no slug for non-dropdown items
                  if (!item?.slug) return null

                  const href = item.slug === 'home' || item.slug === '/' ? '/' : `/${item.slug}`

                  return (
                    <li key={index}>
                      <Link
                        href={href}
                        onClick={closeMenu}
                        className={
                          linkType === 'cta'
                            ? 'inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md text-xl'
                            : 'hover:underline'
                        }
                      >
                        {item.text}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
