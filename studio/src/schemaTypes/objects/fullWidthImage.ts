import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const fullWidthImage = defineType({
  name: 'fullWidthImage',
  title: 'Full Width Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt',
          type: 'string',
        }),
      ],
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
    }),
  ],
  preview: {
    select: {
      image: 'image',
    },
    prepare(selection) {
      return {
        title: selection.image?.alt,
        media: selection.image,
        subtitle: 'Full Width Image Section',
      }
    },
  },
})
