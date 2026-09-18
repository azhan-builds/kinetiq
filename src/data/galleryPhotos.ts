export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  date: string; // ISO date format (YYYY-MM-DD), used for sorting
}

// Initial dataset (can be replaced with CMS API calls seamlessly)
const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-001',
    src: '/hero/kinetiq-machine-final.png',
    alt: 'KINETIQ HYPERDRIVE Chassis Prototype',
    caption: 'Initial assembly of the HYPERDRIVE 2026 chassis platform.',
    date: '2026-03-10',
  },
  {
    id: 'photo-002',
    src: '/hero/parts/chassis.png',
    alt: 'Core Chassis Subsystem',
    caption: 'Precision mechanical frame and drive core structure.',
    date: '2026-03-05',
  },
  {
    id: 'photo-003',
    src: '/hero/parts/head.png',
    alt: 'Sensor Array Mast',
    caption: 'Custom sensor head and telemetry mounting array.',
    date: '2026-02-28',
  },
  {
    id: 'photo-004',
    src: '/hero/parts/wheel_front_left.png',
    alt: 'Drive Wheel Assembly',
    caption: 'High-traction wheel and actuator mounting unit.',
    date: '2026-02-20',
  },
  {
    id: 'photo-005',
    src: '/hero/parts/neck.png',
    alt: 'Mast Articulation System',
    caption: 'Sensor mast vertical elevation and dampening assembly.',
    date: '2026-02-15',
  },
  {
    id: 'photo-006',
    src: '/hero/parts/wheel_rear_right.png',
    alt: 'Rear Powertrain Wheel',
    caption: 'Rear drive powertrain module and wheel linkage.',
    date: '2026-02-10',
  },
];

/**
 * Fetch the N most recent gallery photos sorted by date descending.
 * Async signature allows swapping for CMS API without changing caller components.
 */
export async function getLatestPhotos(count: number): Promise<GalleryPhoto[]> {
  const sorted = [...GALLERY_PHOTOS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return sorted.slice(0, count);
}

/**
 * Fetch all gallery photos sorted by date descending.
 * Async signature allows swapping for CMS API without changing caller components.
 */
export async function getAllPhotos(): Promise<GalleryPhoto[]> {
  return [...GALLERY_PHOTOS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
