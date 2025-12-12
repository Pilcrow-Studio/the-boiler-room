import {defineType, defineField} from 'sanity'
import {SquareIcon} from '@sanity/icons'

export const footerType = defineType({
  name: 'footer',
  type: 'document',
  title: 'Footer',
  icon: SquareIcon,
  initialValue: {
    _id: 'footer',
    _type: 'footer',
    title: 'Footer',
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'companyName',
      type: 'string',
      title: 'Company Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkColumns',
      type: 'array',
      title: 'Link Columns',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Column Title',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'links',
              type: 'array',
              title: 'Links',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'text',
                      type: 'string',
                      title: 'Link Text',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'page',
                      type: 'reference',
                      title: 'Page',
                      to: [{type: 'page'}],
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                  preview: {
                    select: {
                      title: 'text',
                      subtitle: 'page.title',
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              links: 'links',
            },
            prepare({title, links}) {
              const count = links?.length || 0
              return {
                title: title,
                subtitle: `${count} link${count !== 1 ? 's' : ''}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'infoLinks',
      type: 'array',
      title: 'Info Links',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              type: 'string',
              title: 'Link Text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'page',
              type: 'reference',
              title: 'Page',
              to: [{type: 'page'}],
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      companyName: 'companyName',
      linkColumns: 'linkColumns',
    },
    prepare({companyName, linkColumns}) {
      const columnCount = linkColumns?.length || 0
      return {
        title: 'Footer',
        subtitle: `${companyName} - ${columnCount} column${columnCount !== 1 ? 's' : ''}`,
      }
    },
  },
})
