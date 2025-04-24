import {FolderIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default {
  name: 'about',
  title: 'About',
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
      name: 'hero',
      title: 'Hero image',
      type: 'image',
      description:
        'This will be the hero image. For best performance, upload images in WEBP format and in 16:9 aspect ratio.',
      options: {hotspot: true}, // Allows you to crop the image
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'about',
      title: 'About-site image',
      type: 'image',
      description: 'This will be the about site image',
      options: {hotspot: true}, // Allows you to crop the image
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
