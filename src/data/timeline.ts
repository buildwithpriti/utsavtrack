export type EventPhase = 'Pre-Event' | 'Peak-Event' | 'Mid-Event' | 'Post-Event' | 'Dispersal';

export interface TimelinePoint {
  time: string;
  location: string;
  phase: EventPhase;
  visitors: number;
  density: number;
  traffic: string;
  parking: number;
  peak: boolean;
}

export interface HistoricalEvent {
  id: string;
  name: string;
  date: string;
  description: string;
  data: TimelinePoint[];
}

export const devDeepawaliEvent: HistoricalEvent = {
  id: 'dev-deepawali-2025',
  name: 'Dev Deepawali',
  date: '5 November 2025',
  description:
    'Kartik Purnima celebration illuminating all 84 ghats of Varanasi. The largest single-day crowd event in the city, with a total vehicle ban within a 5km radius of the ghats.',
  data: [
    { time: '14:00', location: 'Godowlia Crossing', phase: 'Pre-Event', visitors: 35000, density: 2.1, traffic: 'Moderate', parking: 72, peak: false },
    { time: '15:30', location: 'Godowlia Crossing', phase: 'Pre-Event', visitors: 55000, density: 3.8, traffic: 'High', parking: 88, peak: false },
    { time: '17:00', location: 'Godowlia Crossing', phase: 'Peak-Event', visitors: 95000, density: 6.5, traffic: 'Gridlock', parking: 100, peak: true },
    { time: '18:30', location: 'Dashashwamedh Ghat', phase: 'Peak-Event', visitors: 250000, density: 8.2, traffic: 'No-Entry (Pedestrian)', parking: 100, peak: true },
    { time: '20:00', location: 'Dashashwamedh Ghat', phase: 'Peak-Event', visitors: 220000, density: 7.9, traffic: 'No-Entry (Pedestrian)', parking: 100, peak: true },
    { time: '21:30', location: 'Assi Ghat', phase: 'Post-Event', visitors: 80000, density: 4.5, traffic: 'High', parking: 92, peak: false },
    { time: '23:00', location: 'Cantonment Station', phase: 'Dispersal', visitors: 65000, density: 3.1, traffic: 'High', parking: 60, peak: false },
  ],
};

export const mahaShivratriEvent: HistoricalEvent = {
  id: 'maha-shivratri-2025',
  name: 'Maha Shivratri',
  date: '26 February 2025',
  description:
    'The most significant festival at Kashi Vishwanath Temple. Devotees gather from midnight onwards for darshan, with two peak windows during morning and evening.',
  data: [
    { time: '04:00', location: 'Kashi Vishwanath Corridor', phase: 'Pre-Event', visitors: 45000, density: 3.5, traffic: 'Low', parking: 35, peak: false },
    { time: '09:00', location: 'Kashi Vishwanath Corridor', phase: 'Peak-Event', visitors: 150000, density: 7.1, traffic: 'Gridlock', parking: 95, peak: true },
    { time: '14:00', location: 'Lanka Crossing', phase: 'Mid-Event', visitors: 50000, density: 3.2, traffic: 'High', parking: 80, peak: false },
    { time: '19:00', location: 'Kashi Vishwanath Corridor', phase: 'Peak-Event', visitors: 180000, density: 8.0, traffic: 'Gridlock', parking: 100, peak: true },
    { time: '22:00', location: 'Godowlia Crossing', phase: 'Post-Event', visitors: 75000, density: 4.9, traffic: 'High', parking: 85, peak: false },
  ],
};

export const historicalEvents: HistoricalEvent[] = [devDeepawaliEvent, mahaShivratriEvent];

export const phaseColors: Record<EventPhase, string> = {
  'Pre-Event': '#3b82f6',
  'Peak-Event': '#ef4444',
  'Mid-Event': '#f59e0b',
  'Post-Event': '#8b5cf6',
  'Dispersal': '#06b6d4',
};

export const phaseBgColors: Record<EventPhase, string> = {
  'Pre-Event': 'bg-blue-100 text-blue-800 border-blue-200',
  'Peak-Event': 'bg-red-100 text-red-800 border-red-200',
  'Mid-Event': 'bg-amber-100 text-amber-800 border-amber-200',
  'Post-Event': 'bg-violet-100 text-violet-800 border-violet-200',
  'Dispersal': 'bg-cyan-100 text-cyan-800 border-cyan-200',
};
