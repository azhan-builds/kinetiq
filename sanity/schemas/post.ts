import React from 'react';
import { defineType, defineField } from 'sanity';
import { MarkdownInput, type MarkdownInputProps } from 'sanity-plugin-markdown';

function SafeMarkdownInput(props: MarkdownInputProps) {
  const safeProps = {
    ...props,
    value: typeof props.value === 'string' ? props.value : '',
  };
  return React.createElement(MarkdownInput, safeProps);
}

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Build Log', value: 'Build Log' },
          { title: 'Strategy & Ideas', value: 'Strategy & Ideas' },
          { title: 'Challenges', value: 'Challenges' },
          { title: 'Announcements', value: 'Announcements' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short 1-2 sentence summary for listing cards',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body Content (Markdown)',
      type: 'markdown',
      description: 'Paste or write Markdown directly into Sanity Studio.',
      initialValue: () => '',
      components: {
        input: SafeMarkdownInput,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'coverImage',
      date: 'publishedAt',
    },
    prepare(selection) {
      const { title, category, media, date } = selection;
      const formattedDate = date ? new Date(date).toLocaleDateString() : '';
      return {
        title: title || 'Untitled Post',
        subtitle: `${category || 'Uncategorized'} • ${formattedDate}`,
        media,
      };
    },
  },
});
