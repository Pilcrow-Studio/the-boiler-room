import Link from 'next/link'
import {navigationQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import ResponsiveImage from '../ui/ResponsiveImage'
import MobileMenu from './MobileMenu'
import { ChevronDown } from 'lucide-react'

type NavigationItem = {
  text?: string
  slug?: string
  linkType?: 'default' | 'dropdown' | 'cta'
  dropdownItems?: Array<{
    text?: string
    slug?: string
  }>
}

type Navigation = {
  _id: string
  logo?: {
    asset?: any
    alt?: string
  }
  items?: NavigationItem[]
}

export default async function Header() {
  const {data: navigation} = await sanityFetch<Navigation | null>({
    query: navigationQuery,
  })

  return (
    <header className="fixed z-50 h-(--nav-height) inset-0 bg-white/80 dark:bg-black/80 flex items-center backdrop-blur-lg">
      <div className="container py-2 px-2 sm:px-6">
        <div className="flex items-center justify-between gap-5">
          <Link className="flex items-center gap-2" href="/">
            {navigation?.logo?.asset ? (
              <ResponsiveImage
                image={navigation.logo}
                alt={navigation.logo.alt || 'Logo'}
                className="h-8 w-auto"
                sizes="(max-width: 768px) 120px, 150px"
                quality={90}
                loading="eager"
                fetchPriority="high"
              />
            ) : (
              <span className="text-sm pl-2 font-semibold">Logo</span>
            )}
          </Link>

          {navigation?.items && navigation.items.length > 0 && (
            <>
              {/* Desktop Navigation */}
              <nav className="hidden md:block">
                <ul
                  role="list"
                  className="flex items-center gap-4 md:gap-6 leading-5 text-sm tracking-tight font-mono"
                >
                  {navigation.items.map((item, index) => {
                    const linkType = item.linkType || 'default'

                    // For dropdown items
                    if (linkType === 'dropdown' && item.dropdownItems?.length) {
                      return (
                        <li key={index} className="relative group">
                          <button className="hover:underline cursor-pointer flex items-center gap-1">
                            {item.text} <ChevronDown className="w-4 h-4" />
                          </button>
                          <ul className="absolute px-1 left-0 top-full mt-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[200px] py-1 z-50">
                            {item.dropdownItems.map((subItem, subIndex) => {
                              if (!subItem?.slug || !subItem?.text) return null
                              const subHref = subItem.slug === 'home' || subItem.slug === '/' ? '/' : `/${subItem.slug}`
                              return (
                                <li key={subIndex}>
                                  <Link
                                    href={subHref}
                                    className="block px-4 py-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-900"
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
                    if (!item?.slug || !item?.text) return null
                    const href = item.slug === 'home' || item.slug === '/' ? '/' : `/${item.slug}`

                    return (
                      <li key={index}>
                        <Link
                          href={href}
                          className={
                            linkType === 'cta'
                              ? 'px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md hover:opacity-80 transition-opacity'
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

              {/* Mobile Menu */}
              <MobileMenu items={navigation.items} />
            </>
          )}
        </div>
      </div>
    </header>
  )
}
