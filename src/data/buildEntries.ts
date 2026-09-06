export interface BuildEntry {
  id: string;
  entryNumber: string;
  title: string;
  date: string;
  status: string;
  summary: string;
  attempted?: string;
  learned?: string;
  next?: string;
}

export const BUILD_ENTRIES: BuildEntry[] = [
  {
    id: 'entry-001',
    entryNumber: '001',
    title: 'Registration',
    date: 'NRL 2026 Inception',
    status: 'COMPLETED',
    summary:
      'Team registered for NRL 2026, HYPERDRIVE. Kit not yet in hand. No design decisions made. This log starts here, and every entry from now on will be dated, specific, and honest about what worked and what didn’t.',
  },
];
