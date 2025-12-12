import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`)

export const navigationQuery = defineQuery(`
  *[_type == "navigation"][0]{
    _id,
    logo {
      asset,
      alt
    },
    items[] {
      text,
      linkType,
      "slug": page->slug.current,
      dropdownItems[] {
        text,
        "slug": page->slug.current
      }
    }
  }
`)

export const footerQuery = defineQuery(`
  *[_type == "footer"][0]{
    _id,
    logo {
      asset,
      alt
    },
    companyName,
    linkColumns[] {
      title,
      links[] {
        text,
        "slug": page->slug.current
      }
    },
    infoLinks[] {
      text,
      "slug": page->slug.current
    }
  }
`)

export const homeQuery = defineQuery(`
  *[_type == "home"][0]{
    _id,
    title,
    slug,
    seo {
      title,
      description,
      hideFromSearchEngines,
      canonicalUrl,
      openGraph {
        title,
        description,
        image {
          asset,
          alt
        }
      }
    },
    "pageBuilder": pageBuilder[]{
      _key,
      _type,
      _type == "callToAction" => {
        _key,
        heading,
        text,
        buttonText,
        link {
          ...,
          _type == "link" => {
            "page": page->slug.current,
            "post": post->slug.current
          }
        }
      },
      _type == "infoSection" => {
        _key,
        heading,
        subheading,
        content
      },
      _type == "fullWidthImage" => {
        _key,
        image
      }
    }
  }
`)

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    seo,
    "pageBuilder": pageBuilder[]{
      _key,
      _type,
      _type == "callToAction" => {
        _key,
        heading,
        text,
        buttonText,
        ${linkFields},
      },
      _type == "infoSection" => {
        _key,
        heading,
        subheading,
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
      _type == "fullWidthImage" => {
        _key,
        image
      }
    },
  }
`)

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)
