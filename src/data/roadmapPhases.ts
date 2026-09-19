export interface RoadmapPhase {
  id: string;
  stepNumber: string;
  title: string;
  status: 'current' | 'upcoming';
  subtext?: string;
  description: string;
  icon?: string;
}

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: 'kickoff',
    stepNumber: '01',
    title: 'Kickoff / Registration',
    status: 'current',
    description: 'Official season launch and team registration.',
    icon: '/assets/roadmap/kickoff-registration.png',
  },
  {
    id: 'strategy',
    stepNumber: '02',
    title: 'Strategy & Design',
    status: 'upcoming',
    subtext: 'begins at game reveal',
    description: 'Game analysis, strategy selection, and CAD modeling.',
  },
  {
    id: 'prototype',
    stepNumber: '03',
    title: 'Prototype',
    status: 'upcoming',
    description: 'Mechanism testing, proof of concept, and geometry validation.',
    icon: '/assets/roadmap/prototype.png',
  },
  {
    id: 'build',
    stepNumber: '04',
    title: 'Build',
    status: 'upcoming',
    description: 'Fabrication, machining, wiring, and assembly of final chassis.',
    icon: '/assets/roadmap/build.png',
  },
  {
    id: 'test',
    stepNumber: '05',
    title: 'Test & Refine',
    status: 'upcoming',
    description: 'Driver practice, stress testing, software tuning, and revisions.',
    icon: '/assets/roadmap/test-refine.png',
  },
  {
    id: 'competition',
    stepNumber: '06',
    title: 'Competition',
    status: 'upcoming',
    description: 'National Robotics League Championship 2026.',
  },
];
