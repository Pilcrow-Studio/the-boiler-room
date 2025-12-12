import {defineField, defineType} from 'sanity'

export const seoType = defineType({
  name: 'seo',
  type: 'object',
  title: 'SEO Settings',
  description: 'Configure search engine optimization settings for this page',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Meta Title',
      description:
        'The title that appears in search engine results. Keep it under 65 characters to avoid truncation.',
      validation: (Rule) =>
        Rule.max(65).warning('Titles over 65 characters may be truncated in search results'),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Meta Description',
      description:
        'A brief description of the page content. This appears in search results below the title. Keep it under 155 characters.',
      rows: 3,
      validation: (Rule) =>
        Rule.max(155).warning(
          'Descriptions over 155 characters may be truncated in search results',
        ),
    }),
    defineField({
      name: 'hideFromSearchEngines',
      type: 'boolean',
      title: 'Hide from Search Engines',
      description:
        'Check this box to prevent search engines from indexing this page (adds noindex directive)',
      initialValue: false,
    }),
    defineField({
      name: 'canonicalUrl',
      type: 'url',
      title: 'Canonical URL',
      description:
        'The preferred URL for this page. Only set this if this page has duplicate content elsewhere or if you want to specify a different canonical URL than the current page URL.',
    }),
    defineField({
      name: 'openGraph',
      type: 'object',
      title: 'Open Graph (Social Media)',
      description: 'Settings for how this page appears when shared on social media platforms',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'OG Title',
          description:
            'Title for social media sharing. If left empty, the meta title will be used.',
        }),
        defineField({
          name: 'description',
          type: 'text',
          title: 'OG Description',
          description:
            'Description for social media sharing. If left empty, the meta description will be used.',
          rows: 3,
        }),
        defineField({
          name: 'image',
          type: 'image',
          title: 'OG Image',
          description:
            'Image that appears when this page is shared on social media. Recommended size: 1200x630px',
          options: {
            hotspot: true,
            aiAssist: {
              imageDescriptionField: 'alt',
            },
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description:
                'Describe the image for accessibility. This is important for users with screen readers.',
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare({title, description}) {
      return {
        title: title || 'SEO Settings',
        subtitle: description ? `${description.substring(0, 50)}...` : 'No description set',
      }
    },
  },
})
