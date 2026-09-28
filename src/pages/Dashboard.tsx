import { useState } from 'react';
import { festivals, getCrowdLevel, getTrafficColor, type Festival } from '@/data/festivals';
import FestivalIcon from '@/components/FestivalIcon';
import CrowdBadge from '@/components/CrowdBadge';
import Disclaimer from '@/components/Disclaimer';
import { Calendar, MapPin, Clock, Users, Car, TrendingUp, ChevronRight } from 'lucide-react';

export default function Dashboard({ onSelect }: { onSelect: (id: string) => void }) {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'severe'>('all');

  const filtered = festivals.filter((f) => {
    if (filter === 'severe') {
      const density = parseFloat(f.density.split('–')[1] ?? f.density.split('–')[0]);
      return density >= 7;
    }
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      {/* Hero */}
      <div className="mb-8 animate-fade-in">
        <div className="relative overflow-hidden rounded-3xl bg-navy-800 px-6 py-10 sm:px-12 sm:py-14">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-400/5 blur-3xl"></div>
          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-400/20 px-3 py-1 text-sm font-medium text-orange-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-orange-400"></span>
              Varanasi Festival Monitoring
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Track Crowds, Traffic & Parking<br />
              <span className="text-orange-400">Across Varanasi's Festivals</span>
            </h1>
            <p className="mt-4 max-w-2xl text-navy-200 text-base sm:text-lg">
              Plan your visit around Maha Shivratri, Dev Deepawali, Durga Puja and more — with crowd density, traffic levels, and parking status for every major festival.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <Disclaimer />
      </div>

      {/* Filter tabs */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === 'all' ? 'bg-navy-800 text-white' : 'bg-white text-navy-600 hover:bg-navy-100'
          }`}
        >
          All Festivals
        </button>
        <button
          onClick={() => setFilter('severe')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === 'severe' ? 'bg-navy-800 text-white' : 'bg-white text-navy-600 hover:bg-navy-100'
          }`}
        >
          High Density Only
        </button>
      </div>

      {/* Festival grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((f, i) => (
          <FestivalCard key={f.id} festival={f} onSelect={onSelect} index={i} />
        ))}
      </div>
    </div>
  );
}

function FestivalCard({
  festival,
  onSelect,
  index,
}: {
  festival: Festival;
  onSelect: (id: string) => void;
  index: number;
}) {
  const densityHigh = parseFloat(festival.density.split('–')[1] ?? festival.density.split('–')[0]);
  const densityLow = parseFloat(festival.density.split('–')[0]);
  const avgDensity = (densityLow + densityHigh) / 2;
  const level = getCrowdLevel(avgDensity);

  return (
    <div
      onClick={() => onSelect(festival.id)}
      className="card card-hover animate-slide-up p-5 group"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800 text-orange-400">
            <FestivalIcon name={festival.icon} className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-navy-900">{festival.festival}</h3>
            <p className="text-sm text-navy-400">{festival.month}</p>
          </div>
        </div>
        <CrowdBadge level={level} />
      </div>

      <div className="space-y-2.5 text-sm">
        <div className="flex items-start gap-2 text-navy-600">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" />
          <span className="line-clamp-1">{festival.areas.join(', ')}</span>
        </div>
        <div className="flex items-start gap-2 text-navy-600">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" />
          <span>{festival.peakTimings}</span>
        </div>
        <div className="flex items-start gap-2 text-navy-600">
          <Users className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" />
          <span>{festival.avgCrowd} visitors</span>
        </div>
        <div className="flex items-start gap-2 text-navy-600">
          <Car className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" />
          <span className="line-clamp-1">{festival.traffic}</span>
        </div>
      </div>

      {/* Density bar */}
      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="text-navy-400 font-medium">Crowd Density</span>
          <span className="font-semibold text-navy-700">{festival.density} / 10</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-navy-100">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${(avgDensity / 10) * 100}%`,
              backgroundColor: level === 'Severe' ? '#991b1b' : level === 'High' ? '#ef4444' : level === 'Medium' ? '#f59e0b' : '#22c55e',
            }}
          ></div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className={`badge ${getTrafficColor(festival.traffic)}`}>{festival.traffic.split('(')[0].trim()}</span>
        <span className="flex items-center gap-1 text-sm font-medium text-navy-600 group-hover:text-orange-500 transition-colors">
          Details
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  );
}
