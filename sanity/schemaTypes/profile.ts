import {FolderIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default {
  name: 'profile',
  title: 'Profile',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'education',
      title: 'Education',
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
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {hotspot: true}, // Allows you to crop the image
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      description: 'Your contact email',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
      description: 'Your facebook profile',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube',
      type: 'url',
      description: 'Your YouTube channel',
      validation: (rule) => rule.required(),
    }),
  ],
}
