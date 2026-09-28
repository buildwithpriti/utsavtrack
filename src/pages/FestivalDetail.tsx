import { festivals, getCrowdLevel, getTrafficColor, getParkingColor } from '@/data/festivals';
import FestivalIcon from '@/components/FestivalIcon';
import CrowdBadge from '@/components/CrowdBadge';
import CrowdGauge from '@/components/CrowdGauge';
import Disclaimer from '@/components/Disclaimer';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Car,
  ParkingCircle,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  XCircle,
  Info,
} from 'lucide-react';

export default function FestivalDetail({
  festivalId,
  onBack,
}: {
  festivalId: string;
  onBack: () => void;
}) {
  const festival = festivals.find((f) => f.id === festivalId);
  if (!festival) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-navy-500">Festival not found.</p>
        <button onClick={onBack} className="btn-primary mt-4">
          Back to Festivals
        </button>
      </div>
    );
  }

  const densityHigh = parseFloat(festival.density.split('–')[1] ?? festival.density.split('–')[0]);
  const densityLow = parseFloat(festival.density.split('–')[0]);
  const avgDensity = (densityLow + densityHigh) / 2;
  const level = getCrowdLevel(avgDensity);

  // Extract parking occupancy
  const parkingMatch = festival.parking.match(/(\d+)%/);
  const parkingOccupancy = parkingMatch ? parseInt(parkingMatch[1]) : 80;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 animate-fade-in">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-navy-600 hover:text-navy-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        All Festivals
      </button>

      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-navy-800 p-6 sm:p-10">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-orange-400/10 blur-3xl"></div>
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-400 text-navy-900">
            <FestivalIcon name={festival.icon} className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white sm:text-3xl">{festival.festival}</h1>
              <CrowdBadge level={level} size="md" />
            </div>
            <p className="text-navy-200">{festival.month} · {festival.avgCrowd} visitors</p>
          </div>
        </div>
        <p className="relative mt-4 max-w-3xl text-navy-100 text-sm sm:text-base leading-relaxed">
          {festival.description}
        </p>
      </div>

      <div className="mt-4">
        <Disclaimer />
      </div>

      {/* Key metrics grid */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {/* Crowd Gauge */}
        <div className="card p-6 flex flex-col items-center justify-center">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-navy-400">Crowd Density</h3>
          <CrowdGauge density={avgDensity} size={140} />
          <p className="mt-3 text-center text-xs text-navy-400">
            Range: {festival.density} / 10
          </p>
        </div>

        {/* Traffic & Parking */}
        <div className="card p-6 space-y-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-navy-400">Traffic Level</h3>
            <div className={`rounded-xl p-3 ${getTrafficColor(festival.traffic)}`}>
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                <span className="font-semibold">{festival.traffic.split('(')[0].trim()}</span>
              </div>
              {festival.traffic.includes('(') && (
                <p className="mt-1 text-xs opacity-90">{festival.traffic.match(/\(([^)]+)\)/)?.[1]}</p>
              )}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-navy-400">Parking Status</h3>
            <div className={`rounded-xl p-3 ${getParkingColor(parkingOccupancy)}`}>
              <div className="flex items-center gap-2">
                <ParkingCircle className="h-5 w-5" />
                <span className="font-semibold">{parkingOccupancy}% Occupied</span>
              </div>
              <p className="mt-1 text-xs opacity-90">{festival.parking.split('(')[0].trim()}</p>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="card p-6 space-y-4">
          <div>
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-navy-400">Peak Timings</h3>
            <div className="flex items-center gap-2 text-navy-700">
              <Clock className="h-4 w-4 text-orange-400" />
              <span className="text-sm font-medium">{festival.peakTimings}</span>
            </div>
          </div>
          <div>
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-navy-400">Avg Visitors</h3>
            <div className="flex items-center gap-2 text-navy-700">
              <Users className="h-4 w-4 text-orange-400" />
              <span className="text-sm font-medium">{festival.avgCrowd}</span>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-navy-400">Affected Areas</h3>
            <div className="flex flex-wrap gap-1.5">
              {festival.areas.map((area) => (
                <span key={area} className="rounded-lg bg-navy-50 px-2.5 py-1 text-xs font-medium text-navy-600">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Best time to visit */}
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="card border-green-200 bg-green-50/50 p-6">
          <div className="flex items-center gap-2 text-green-700">
            <CheckCircle2 className="h-5 w-5" />
            <h3 className="font-semibold">Best Time to Visit</h3>
          </div>
          <p className="mt-2 text-sm text-navy-700 leading-relaxed">{festival.bestVisitWindow}</p>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-green-600">
            <TrendingDown className="h-4 w-4" />
            Lower crowd density expected
          </div>
        </div>

        <div className="card border-red-200 bg-red-50/50 p-6">
          <div className="flex items-center gap-2 text-red-700">
            <XCircle className="h-5 w-5" />
            <h3 className="font-semibold">Avoid Visiting</h3>
          </div>
          <p className="mt-2 text-sm text-navy-700 leading-relaxed">{festival.avoidWindow}</p>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-red-600">
            <TrendingUp className="h-4 w-4" />
            Peak crowd density expected
          </div>
        </div>
      </div>

      {/* Density timeline bar */}
      <div className="mt-6 card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Info className="h-5 w-5 text-navy-400" />
          <h3 className="font-semibold text-navy-800">Density Progression Through the Day</h3>
        </div>
        <DensityTimeline festival={festival} />
      </div>
    </div>
  );
}

function DensityTimeline({ festival }: { festival: typeof festivals[0] }) {
  const slots = [
    { label: 'Early Morning', density: parseFloat(festival.density.split('–')[0]) * 0.6 },
    { label: 'Morning Peak', density: parseFloat(festival.density.split('–')[1] ?? festival.density.split('–')[0]) },
    { label: 'Afternoon', density: parseFloat(festival.density.split('–')[0]) * 0.7 },
    { label: 'Evening Peak', density: parseFloat(festival.density.split('–')[1] ?? festival.density.split('–')[0]) },
    { label: 'Late Night', density: parseFloat(festival.density.split('–')[0]) * 0.5 },
  ];

  return (
    <div className="flex items-end justify-between gap-2 sm:gap-4">
      {slots.map((slot, i) => {
        const level = getCrowdLevel(slot.density);
        const color = level === 'Severe' ? '#991b1b' : level === 'High' ? '#ef4444' : level === 'Medium' ? '#f59e0b' : '#22c55e';
        return (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-32 w-full items-end">
              <div
                className="w-full rounded-t-lg transition-all duration-700"
                style={{
                  height: `${Math.max((slot.density / 10) * 100, 8)}%`,
                  backgroundColor: color,
                  animationDelay: `${i * 100}ms`,
                }}
              ></div>
            </div>
            <span className="text-center text-xs font-medium text-navy-500">{slot.label}</span>
            <span className="text-xs font-bold" style={{ color }}>
              {slot.density.toFixed(1)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
