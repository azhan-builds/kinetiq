import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { markdownSchema } from 'sanity-plugin-markdown';
import { galleryImage } from './sanity/schemas/galleryImage';
import { post } from './sanity/schemas/post';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'kinetiq-studio',
  title: 'KINETIQ Studio',

  projectId,
  dataset,

  basePath: '/studio',

  plugins: [structureTool(), markdownSchema()],

  schema: {
    types: [galleryImage, post],
  },
});

