import {FolderIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'This will be your blog title',
      type: 'string',
      validation: (rule) => rule.min(10).required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'This will generate a unique slug for your blog title',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      description: 'Brief description so the visitor knows what to expect in the blog',
      type: 'string',
      validation: (rule) => rule.min(10).max(250).required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description:
        'This will be the blog image. For best performance, upload images in WEBP format and in 16:9 aspect ratio.',
      options: {hotspot: true}, // Allows you to crop the image
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
      description: 'This will be the blog content or body',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      description: 'This will be the blog author',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO tags',
      type: 'array',
      description:
        'This will be the list of keywords for the blog that will help in SEO. Add as many keywords as possible for best results. Do not add any # symbol.',
      of: [{type: 'string'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ytkey',
      title: 'YouTube Video Key',
      type: 'string',
      description: 'This is the value of "v" attribute in your YouTube video URL',
    }),
  ],
}
