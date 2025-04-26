import {FolderIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default {
  name: 'modal',
  title: 'Modal',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Modal name',
      description: 'Name of the popup modal',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Modal title',
      description: 'This will be the popup modal title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Modal subtitle',
      description: 'This will be the popup modal subtitle',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Modal body',
      description: 'This will be the popup modal body',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {select: {title: 'name'}},
}
