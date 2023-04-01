import {defineField, defineType} from 'sanity'

export default [
  defineType({
    name: 'weblink',
    title: 'Weblink',
    type: 'document',
    fields: [
      defineField({
        name: 'type',
        title: 'Type',
        type: 'reference',
        to: [{type: 'weblinkType'}],
      }),
      defineField({
        name: 'url',
        title: 'URL',
        type: 'string',
      }),
      defineField({
        name: 'icon',
        title: 'Icon',
        type: 'image',
        options: {
          hotspot: true,
        },
      }),
    ],
  }),
  defineType({
    name: 'weblinkType',
    title: 'Weblink Type',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
    ],
  }),
]
