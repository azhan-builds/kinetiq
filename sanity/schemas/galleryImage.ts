import { defineType, defineField } from 'sanity';

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional short description or caption for the photo',
    }),
    defineField({
      name: 'order',
      title: 'Order / Sort Index',
      type: 'number',
      description: 'Optional manual sort order (lower numbers appear first). Defaults to creation date.',
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      media: 'image',
      subtitle: 'order',
    },
    prepare(selection: Record<string, any>) {
      const { title, media, subtitle } = selection;
      return {
        title: title || 'Untitled Image',
        subtitle: subtitle !== undefined ? `Sort order: ${subtitle}` : 'Default sorting',
        media,
      };
    },
  },
});
