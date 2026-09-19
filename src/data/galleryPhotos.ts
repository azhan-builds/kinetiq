export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  date?: string; // ISO date format (YYYY-MM-DD), used for sorting
  category?: string;
}

// Initial dataset of real project images
const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-001',
    src: '/hero/kinetiq-machine-final.png',
    alt: 'KINETIQ HYPERDRIVE Chassis Prototype',
    caption: 'Initial assembly of the HYPERDRIVE 2026 chassis platform.',
    date: '2026-03-10',
    category: 'PROTOTYPE',
  },
  {
    id: 'photo-002',
    src: '/hero/parts/chassis.png',
    alt: 'Core Chassis Subsystem',
    caption: 'Precision mechanical frame and drive core structure.',
    date: '2026-03-05',
    category: 'MECHANICAL',
  },
  {
    id: 'photo-003',
    src: '/hero/parts/head.png',
    alt: 'Sensor Array Mast',
    caption: 'Custom sensor head and telemetry mounting array.',
    date: '2026-02-28',
    category: 'ELECTRONICS',
  },
  {
    id: 'photo-004',
    src: '/hero/parts/wheel_front_left.png',
    alt: 'Drive Wheel Assembly',
    caption: 'High-traction wheel and actuator mounting unit.',
    date: '2026-02-20',
    category: 'POWERTRAIN',
  },
  {
    id: 'photo-005',
    src: '/hero/parts/neck.png',
    alt: 'Mast Articulation System',
    caption: 'Sensor mast vertical elevation and dampening assembly.',
    date: '2026-02-15',
    category: 'HARDWARE',
  },
  {
    id: 'photo-006',
    src: '/hero/parts/wheel_rear_right.png',
    alt: 'Rear Powertrain Module',
    caption: 'Rear drive powertrain module and wheel linkage.',
    date: '2026-02-10',
    category: 'POWERTRAIN',
  },
  {
    id: 'photo-007',
    src: '/kinetiq_robot_lineart.png',
    alt: 'Kinematics Schematic Blueprint',
    caption: 'Vector lineart schematic detailing drive base articulation.',
    date: '2026-01-28',
    category: 'SCHEMATIC',
  },
  {
    id: 'photo-008',
    src: '/hero/parts/wheel_rear_left.png',
    alt: 'Left Powertrain Assembly',
    caption: 'Left drive wheel assembly with integrated telemetry hardware.',
    date: '2026-01-15',
    category: 'POWERTRAIN',
  },
];

/**
 * Fetch the N most recent gallery photos sorted by date descending.
 * Async signature allows swapping for CMS API without changing caller components.
 */
export async function getLatestPhotos(count: number): Promise<GalleryPhoto[]> {
  const sorted = [...GALLERY_PHOTOS].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  return sorted.slice(0, count);
}

/**
 * Fetch all gallery photos sorted by date descending.
 * Async signature allows swapping for CMS API without changing caller components.
 */
export async function getAllPhotos(): Promise<GalleryPhoto[]> {
  return [...GALLERY_PHOTOS].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

