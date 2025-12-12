import Link from 'next/link'
import {footerQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import ResponsiveImage from '../ui/ResponsiveImage'

type Footer = {
  _id: string
  logo?: {
    asset?: any
    alt?: string
  }
  companyName?: string
  linkColumns?: Array<{
    title?: string
    links?: Array<{
      text?: string
      slug?: string
    }>
  }>
  infoLinks?: Array<{
    text?: string
    slug?: string
  }>
}

export default async function Footer() {
  const {data: footer} = await sanityFetch<Footer | null>({
    query: footerQuery,
  })

  if (!footer) {
    return null
  }

  return (
    <footer className="bg-gray-50 border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800 ">
      <div className="container py-12 md:py-16">
        {/* Top Section: Logo and Link Columns */}
        <div className="flex flex-wrap justify-between gap-8 mb-8">
          {/* Logo and Company Name */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-block mb-4">
              {footer.logo?.asset ? (
                <ResponsiveImage
                  image={footer.logo}
                  alt={footer.logo.alt || footer.companyName || 'Logo'}
                  className="h-8 w-auto"
                  sizes="150px"
                  quality={90}
                />
              ) : (
                <span className="text-xl font-bold">{footer.companyName}</span>
              )}
            </Link>
            {footer.companyName && footer.logo?.asset && (
              <p className="text-sm">{footer.companyName}</p>
            )}
          </div>

          {/* Link Columns */}
          {footer.linkColumns && footer.linkColumns.length > 0 && (
            <div className="md:col-span-8 flex flex-wrap gap-8">
              {footer.linkColumns.map((column, columnIndex) => {
                if (!column?.title) return null

                return (
                  <div key={columnIndex}>
                    <h3 className="font-semibold text-sm uppercase tracking-wide mb-4">
                      {column.title}
                    </h3>
                    {column.links && column.links.length > 0 && (
                      <ul className="space-y-3">
                        {column.links.map((link, linkIndex) => {
                          if (!link?.slug || !link?.text) return null

                          // Handle home page specially
                          const href = link.slug === 'home' || link.slug === '/' ? '/' : `/${link.slug}`

                          return (
                            <li key={linkIndex}>
                              <Link
                                href={href}
                                className="text-sm transition-colors"
                              >
                                {link.text}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Bottom Section: Copyright and Info Links */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} {footer.companyName}. All rights reserved.
          </p>

          {footer.infoLinks && footer.infoLinks.length > 0 && (
            <ul className="flex flex-wrap gap-6">
              {footer.infoLinks.map((link, index) => {
                if (!link?.slug || !link?.text) return null

                // Handle home page specially
                const href = link.slug === 'home' || link.slug === '/' ? '/' : `/${link.slug}`

                return (
                  <li key={index}>
                    <Link
                      href={href}
                      className="text-sm transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}
