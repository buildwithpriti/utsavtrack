export type CrowdLevel = 'Low' | 'Medium' | 'High' | 'Severe';
export type TrafficLevel = 'Low' | 'Medium' | 'Heavy' | 'Gridlock' | 'Severe Gridlock';

export interface Festival {
  id: string;
  month: string;
  festival: string;
  areas: string[];
  peakTimings: string;
  avgCrowd: string;
  density: string;
  traffic: string;
  parking: string;
  description: string;
  bestVisitWindow: string;
  avoidWindow: string;
  icon: string;
}

export const festivals: Festival[] = [
  {
    id: 'maha-shivratri',
    month: 'Jan/Feb',
    festival: 'Maha Shivratri',
    areas: ['Kashi Vishwanath Dham', 'Godowlia', 'Maidagin', 'Chowk'],
    peakTimings: '04:00–10:00 AM, 06:00–11:00 PM',
    avgCrowd: '6,00,000–8,00,000',
    density: '6.5–8.0',
    traffic: 'Gridlock (Total Vehicle Ban in Zone-1)',
    parking: 'Maidagin Multi-level, Town Hall (100% full)',
    description: 'The most significant festival at Kashi Vishwanath Temple, celebrating Lord Shiva. Millions of devotees gather for darshan, with the temple opening for overnight prayers.',
    bestVisitWindow: '10:00 AM – 04:00 PM (moderate crowd between two peak windows)',
    avoidWindow: '04:00–10:00 AM and 06:00–11:00 PM (peak rush hours)',
    icon: 'moon',
  },
  {
    id: 'holi',
    month: 'March',
    festival: 'Holi & Rang Bhari Ekadashi',
    areas: ['Kashi Vishwanath Corridor', 'Dashashwamedh', 'Chowk'],
    peakTimings: '11:00 AM–04:00 PM',
    avgCrowd: '2,00,000–3,50,000',
    density: '4.5–5.5',
    traffic: 'Heavy (Barricading at intersections)',
    parking: 'Godowlia Underground (85% full)',
    description: 'A vibrant celebration of colors unique to Varanasi, where the Rang Bhari Ekadashi tradition involves playing Holi with the deity at Kashi Vishwanath Temple.',
    bestVisitWindow: '06:00–10:00 AM (before peak colors begin)',
    avoidWindow: '11:00 AM – 04:00 PM (peak celebration hours)',
    icon: 'palette',
  },
  {
    id: 'navratri',
    month: 'April',
    festival: 'Chaitra Navratri / Ram Navami',
    areas: ['Durga Kund', 'Sankat Mochan', 'Godowlia'],
    peakTimings: '05:00–09:00 AM, 05:00–09:00 PM',
    avgCrowd: '1,50,000–2,50,000',
    density: '3.5–4.5',
    traffic: 'Medium to Heavy',
    parking: 'Sankat Mochan open parking, BHU grounds (75% full)',
    description: 'Nine days of devotion to Goddess Durga, culminating in Ram Navami processions. Major temples see heavy footfall during morning and evening aartis.',
    bestVisitWindow: '10:00 AM – 04:00 PM (between morning and evening aarti)',
    avoidWindow: '05:00–09:00 AM and 05:00–09:00 PM (aarti peak hours)',
    icon: 'sparkles',
  },
  {
    id: 'shravan',
    month: 'July/Aug',
    festival: 'Shravan Maas (Mondays)',
    areas: ['Kashi Vishwanath Dham', 'Godowlia', 'Lahurabir', 'Cantt'],
    peakTimings: '12:00 AM Sunday night – 04:00 PM Monday',
    avgCrowd: '5,00,000–7,00,000 per Monday',
    density: '5.5–7.0',
    traffic: 'Gridlock (Route diversions on NH/City)',
    parking: 'Town Hall, Maidagin, Beniabagh (95% full)',
    description: 'Every Monday in the holy month of Shravan draws massive crowds of Kanwariyas and devotees to Kashi Vishwanath, with processions and route diversions across the city.',
    bestVisitWindow: 'Tuesday–Friday (non-Monday days during Shravan)',
    avoidWindow: 'Sunday midnight to Monday 04:00 PM (peak Shravan Monday)',
    icon: 'droplets',
  },
  {
    id: 'durga-puja',
    month: 'Sept/Oct',
    festival: 'Durga Puja & Vijayadashami',
    areas: ['Sanatan Dharm (Luxa)', 'Jaitpura', 'Chetganj', 'Lahurabir'],
    peakTimings: '07:00 PM–01:00 AM',
    avgCrowd: '3,00,000–4,50,000',
    density: '4.0–5.5',
    traffic: 'Heavy (No entry for auto-rickshaws/cars)',
    parking: 'Beniabagh Parking, Lahurabir open slots (90% full)',
    description: 'Grand pandals, cultural performances, and idol immersions at the ghats. Evening and late-night pandal hopping draws huge crowds across the city.',
    bestVisitWindow: '10:00 AM – 05:00 PM (daytime pandal visits)',
    avoidWindow: '07:00 PM – 01:00 AM (peak evening pandal rush)',
    icon: 'flame',
  },
  {
    id: 'bharat-milap',
    month: 'Oct/Nov',
    festival: 'Bharat Milap (Nati Imli)',
    areas: ['Nati Imli Ground', 'Nadesar', 'Cantt Approach'],
    peakTimings: '03:00 PM–07:00 PM',
    avgCrowd: '2,50,000–4,00,000',
    density: '6.0–7.5',
    traffic: 'Gridlock (Complete standstill around Nati Imli)',
    parking: 'Chaukaghat, Sampurnanand Stadium (90% full)',
    description: 'A historic reenactment of the reunion of Lord Ram and Bharat, drawing one of the largest gatherings in Varanasi with a traditional procession at Nati Imli.',
    bestVisitWindow: 'Before 02:00 PM or after 08:00 PM (outside procession window)',
    avoidWindow: '03:00 PM – 07:00 PM (procession peak)',
    icon: 'users',
  },
  {
    id: 'dev-deepawali',
    month: 'Nov',
    festival: 'Dev Deepawali',
    areas: ['All 84 Ghats', 'Dashashwamedh', 'Assi', 'Namo Ghat', 'Godowlia'],
    peakTimings: '03:00 PM–10:00 PM',
    avgCrowd: '20,000–25,00,000 (single day)',
    density: '8.0–9.5',
    traffic: 'Severe Gridlock (Total vehicle ban 5km radius)',
    parking: 'Beniabagh, Town Hall, Ashapur, Cantt (100% overflow)',
    description: 'The Festival of Lights on Kartik Purnima, when all 84 ghats of Varanasi are illuminated with millions of diyas. The single largest one-day crowd event in the city.',
    bestVisitWindow: 'Before 02:00 PM (early arrival for ghats, before peak)',
    avoidWindow: '03:00 PM – 10:00 PM (peak illumination and crowd surge)',
    icon: 'lamp',
  },
];

export function getCrowdLevel(density: number): CrowdLevel {
  if (density < 3) return 'Low';
  if (density < 6) return 'Medium';
  if (density < 8) return 'High';
  return 'Severe';
}

export function getCrowdColor(level: CrowdLevel): string {
  switch (level) {
    case 'Low':
      return 'bg-crowd-low text-white';
    case 'Medium':
      return 'bg-crowd-medium text-white';
    case 'High':
      return 'bg-crowd-high text-white';
    case 'Severe':
      return 'bg-crowd-severe text-white';
  }
}

export function getCrowdTextColor(level: CrowdLevel): string {
  switch (level) {
    case 'Low':
      return 'text-crowd-low';
    case 'Medium':
      return 'text-crowd-medium';
    case 'High':
      return 'text-crowd-high';
    case 'Severe':
      return 'text-crowd-severe';
  }
}

export function getTrafficColor(traffic: string): string {
  const lower = traffic.toLowerCase();
  if (lower.includes('severe')) return 'bg-red-900 text-white';
  if (lower.includes('gridlock')) return 'bg-red-600 text-white';
  if (lower.includes('heavy')) return 'bg-orange-400 text-navy-900';
  if (lower.includes('medium')) return 'bg-amber-400 text-navy-900';
  return 'bg-green-500 text-white';
}

export function getParkingColor(occupancy: number): string {
  if (occupancy >= 95) return 'bg-red-700 text-white';
  if (occupancy >= 85) return 'bg-orange-400 text-navy-900';
  if (occupancy >= 70) return 'bg-amber-400 text-navy-900';
  return 'bg-green-500 text-white';
}
