import {FolderIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default {
  name: 'home',
  title: 'Homepage',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Webpage name',
      description: 'Name of the wesite page you are visiting',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Jumbotron title',
      description: 'This will be the jumbotron title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Jumbotron image',
      description: 'This will be the jumbotron image',
      type: 'image',
      options: {hotspot: true}, // Allows you to crop the image
    }),
    defineField({
      name: 'intro',
      title: 'Brief introduction',
      description: 'This will be brief introduction of the webpage',
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
