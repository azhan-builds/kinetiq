import { sanityClient, urlFor, isSanityConfigured } from '../sanity/client';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  category: 'Build Log' | 'Strategy & Ideas' | 'Challenges' | 'Announcements' | string;
  excerpt: string;
  coverImage: string;
  body?: string | any[];
}

interface SanityPostDoc {
  _id: string;
  title: string;
  slug?: string | { current?: string };
  publishedAt: string;
  category: string;
  excerpt: string;
  coverImage?: any;
  body?: string | any[];
}

// Fallback blog dataset for local preview when Sanity credentials are unset
const LOCAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-001',
    title: 'KINETIQ HYPERDRIVE 2026: Kickoff & Frame Architecture',
    slug: 'kickoff-and-frame-architecture',
    publishedAt: '2026-03-15T10:00:00.000Z',
    category: 'Build Log',
    excerpt: 'An inside look at our initial CAD iterations, structural FEA analysis, and drive base frame selection for the upcoming NRL 2026 season.',
    coverImage: '/hero/kinetiq-machine-final.png',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Welcome to the first official KINETIQ build log for the NRL 2026 HYPERDRIVE season. Over the past six weeks, our mechanical engineering sub-team has been heads-down prototyping the core structural frame.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Structural Frame Geometry & Material Selection',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'We selected 6061-T6 aluminum extrusion paired with 3D-printed impact-absorbing gussets. This hybrid layout gives us the rigidity required under high-G impacts while keeping total weight strictly within weight class parameters.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _type: 'span',
            text: '“Every gram saved in the chassis frame translates directly into additional armor thickness and weapon motor current capability.”',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Next Steps & Powertrain Integration',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'With the frame CAD locked, our next phase focuses on custom gearbox machining and telemetry module mounting. Stay tuned for upcoming test bench video updates.',
          },
        ],
      },
    ],
  },
  {
    id: 'post-002',
    title: 'Telemetry & Real-Time Sensor Fusion in Arena Competition',
    slug: 'telemetry-and-sensor-fusion',
    publishedAt: '2026-03-01T14:30:00.000Z',
    category: 'Strategy & Ideas',
    excerpt: 'How real-time IMU metrics, temperature monitoring, and high-frequency telemetry improve pilot control and prevent thermal failure during match play.',
    coverImage: '/hero/parts/head.png',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'In high-velocity robotic combat, visual feedback alone is insufficient. Heat buildup in brushless ESCs can destroy a drivetrain before the pilot notices thermal throttling.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'High-Frequency CAN Bus Telemetry',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Our onboard micro-controller polls current draw, motor RPM, and thermal probes at 500Hz, streaming critical warnings back to the pit display unit in real-time.',
          },
        ],
      },
    ],
  },
  {
    id: 'post-003',
    title: 'Overcoming High-G Impact Vibrations on Sensor Board Links',
    slug: 'overcoming-high-g-vibrations',
    publishedAt: '2026-02-18T09:15:00.000Z',
    category: 'Challenges',
    excerpt: 'Analyzing why early shock mounts failed under 80G kinetic impacts and how elastomeric silicone dampeners solved sensor disconnection.',
    coverImage: '/hero/parts/chassis.png',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'During drop tests, sudden acceleration spikes fractured standard rigid PCB mounts. We designed a dual-stage silicone isolation damper to floating-mount the electronics tray.',
          },
        ],
      },
    ],
  },
];

/**
 * Fetch all published blog posts ordered by publishedAt desc.
 * Queries Sanity CMS if configured, falling back to local dataset.
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  if (isSanityConfigured && sanityClient) {
    try {
      const query = `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        publishedAt,
        category,
        excerpt,
        coverImage,
        body
      }`;
      const docs = await sanityClient.fetch<SanityPostDoc[]>(query);

      if (docs && docs.length > 0) {
        return docs.map((doc) => {
          const slugStr = typeof doc.slug === 'string' ? doc.slug : (doc.slug?.current || doc._id);
          return {
            id: doc._id,
            title: doc.title || 'Untitled Post',
            slug: slugStr,
            publishedAt: doc.publishedAt || new Date().toISOString(),
            category: doc.category || 'Announcements',
            excerpt: doc.excerpt || '',
            coverImage: doc.coverImage ? urlFor(doc.coverImage)?.url() || '' : '/hero/kinetiq-machine-final.png',
            body: doc.body || [],
          };
        });
      }
    } catch (err) {
      console.warn('Failed to fetch blog posts from Sanity CMS, using local posts fallback:', err);
    }
  }

  return [...LOCAL_BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Fetch a single blog post by slug string.
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (isSanityConfigured && sanityClient) {
    try {
      const query = `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        publishedAt,
        category,
        excerpt,
        coverImage,
        body
      }`;
      const doc = await sanityClient.fetch<SanityPostDoc | null>(query, { slug });

      if (doc) {
        const slugStr = typeof doc.slug === 'string' ? doc.slug : (doc.slug?.current || doc._id);
        return {
          id: doc._id,
          title: doc.title || 'Untitled Post',
          slug: slugStr,
          publishedAt: doc.publishedAt || new Date().toISOString(),
          category: doc.category || 'Announcements',
          excerpt: doc.excerpt || '',
          coverImage: doc.coverImage ? urlFor(doc.coverImage)?.url() || '' : '/hero/kinetiq-machine-final.png',
          body: doc.body || [],
        };
      }
    } catch (err) {
      console.warn(`Failed to fetch blog post "${slug}" from Sanity, checking local fallback:`, err);
    }
  }

  const localMatch = LOCAL_BLOG_POSTS.find((p) => p.slug === slug);
  return localMatch || null;
}
