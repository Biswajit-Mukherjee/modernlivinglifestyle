import {FolderIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default {
  name: 'privacy',
  title: 'Privacy',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pageMeta',
      title: 'Page Metadata',
      type: 'reference',
      to: [{type: 'metadata'}],
      description: 'This will be page metadata for SEO',
      validation: (rule) => rule.required(),
    }),
  ],
}
