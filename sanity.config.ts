import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { galleryImage } from './sanity/schemas/galleryImage';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'kinetiq-studio',
  title: 'KINETIQ Studio',

  projectId,
  dataset,

  basePath: '/studio',

  plugins: [structureTool()],

  schema: {
    types: [galleryImage],
  },
});
