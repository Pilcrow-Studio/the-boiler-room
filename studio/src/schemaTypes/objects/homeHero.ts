import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const homeHero = defineType({
  name: 'homeHero',
  title: 'Home Hero',
  type: 'object',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare(selection) {
      return {title: 'Home Hero', subtitle: selection.content?.[0]?.children?.[0]?.text}
    },
  },
})