import {FolderIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default {
  name: 'metadata',
  title: 'Page Metadata',
  type: 'document',
  icon: FolderIcon,
  preview: {select: {title: 'pageName'}},
  fields: [
    defineField({
      name: 'pageName',
      title: 'Page name',
      description: 'This will be the page name where the metadata is used',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Meta title',
      description: 'This will be the page meta title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      description: 'This will be the page meta description',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Meta site image',
      description: 'This will be the meta site image',
      type: 'image',
      options: {hotspot: true}, // Allows you to crop the image
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'applicationName',
      title: 'Meta application name',
      description: 'This will be the meta application name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'creator',
      title: 'Creator name',
      description: 'This will be the meta creator name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'metadataBase',
      title: 'Metadata base URL',
      description: 'This will be the metadata base URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'robots',
      title: 'Metadata robots',
      description: 'This will be the metadata robots',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'keywords',
      title: 'Metadata keywords',
      description: 'This will be the metadata keywords',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required(),
    }),
  ],
}
