import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '';
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
export const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2026-03-01';

export const isSanityConfigured = Boolean(projectId && projectId.trim() !== '');

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false, // Set to false to get immediate updates on publish
    })
  : null;

const builder = isSanityConfigured && sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: any) {
  if (!builder) return null;
  return builder.image(source);
}
