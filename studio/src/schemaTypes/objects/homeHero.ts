import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const homeHero = defineType({
  name: 'homeHero',
  title: 'Home Hero',
  type: 'object',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare(selection) {
      return {title: selection.title, subtitle: 'Home Hero'}
    },
  },
})