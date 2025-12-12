import {defineType, defineField} from 'sanity'
import {MenuIcon} from '@sanity/icons'

export const navigationType = defineType({
  name: 'navigation',
  type: 'document',
  title: 'Main Menu',
  icon: MenuIcon,
  initialValue: {
    _id: 'navigation',
    _type: 'navigation',
  },
  fields: [
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo',
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Menu Items',
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
              name: 'linkType',
              type: 'string',
              title: 'Link Type',
              description: 'Choose how this link should appear in the navigation',
              options: {
                list: [
                  {title: 'Default', value: 'default'},
                  {title: 'Dropdown', value: 'dropdown'},
                  {title: 'CTA (Call to Action)', value: 'cta'},
                ],
                layout: 'radio',
              },
              initialValue: 'default',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'page',
              type: 'reference',
              title: 'Page',
              to: [{type: 'page'}],
              validation: (Rule) =>
                Rule.custom((page, context) => {
                  const linkType = (context.parent as any)?.linkType
                  if (linkType === 'dropdown') {
                    return true // Page is optional for dropdowns
                  }
                  return page ? true : 'Page is required for default and CTA links'
                }),
              hidden: ({parent}) => parent?.linkType === 'dropdown',
            },
            {
              name: 'dropdownItems',
              type: 'array',
              title: 'Dropdown Items',
              description: 'Add sub-menu items that appear in the dropdown',
              hidden: ({parent}) => parent?.linkType !== 'dropdown',
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
              validation: (Rule) =>
                Rule.custom((items, context) => {
                  const linkType = (context.parent as any)?.linkType
                  if (linkType === 'dropdown' && (!items || items.length === 0)) {
                    return 'At least one dropdown item is required'
                  }
                  return true
                }),
            },
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'page.title',
              linkType: 'linkType',
            },
            prepare({title, subtitle, linkType}) {
              const typeLabel =
                linkType === 'cta' ? ' [CTA]' : linkType === 'dropdown' ? ' [Dropdown]' : ''
              return {
                title: `${title}${typeLabel}`,
                subtitle: linkType === 'dropdown' ? 'Has dropdown menu' : subtitle,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({items}) {
      const count = items?.length || 0
      return {
        title: 'Navigation',
        subtitle: `${count} menu item${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
