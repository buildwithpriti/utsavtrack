import { festivals, getCrowdLevel, getTrafficColor, getCrowdTextColor } from '@/data/festivals';
import Disclaimer from '@/components/Disclaimer';
import { MapPin, Car, Users, AlertCircle } from 'lucide-react';

interface AreaInfo {
  name: string;
  festivals: string[];
  crowdLevel: string;
  density: number;
  traffic: string;
  parking: string;
  parkingOccupancy: number;
}

export default function AreaStatus() {
  // Build area data from festival data
  const areaMap = new Map<string, AreaInfo>();

  festivals.forEach((f) => {
    const densityHigh = parseFloat(f.density.split('–')[1] ?? f.density.split('–')[0]);
    const densityLow = parseFloat(f.density.split('–')[0]);
    const avgDensity = (densityLow + densityHigh) / 2;

    const parkingMatch = f.parking.match(/(\d+)%/);
    const parkingOccupancy = parkingMatch ? parseInt(parkingMatch[1]) : 80;

    f.areas.forEach((area) => {
      const existing = areaMap.get(area);
      if (!existing || existing.density < avgDensity) {
        areaMap.set(area, {
          name: area,
          festivals: [...(existing?.festivals ?? []), f.festival].filter((v, i, a) => a.indexOf(v) === i),
          crowdLevel: getCrowdLevel(avgDensity),
          density: avgDensity,
          traffic: f.traffic,
          parking: f.parking.split('(')[0].trim(),
          parkingOccupancy,
        });
      } else {
        existing.festivals = [...existing.festivals, f.festival].filter((v, i, a) => a.indexOf(v) === i);
      }
    });
  });

  const areas = Array.from(areaMap.values()).sort((a, b) => b.density - a.density);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-900 sm:text-3xl">Area Status Board</h1>
        <p className="mt-1 text-navy-500">
          Crowd, traffic, and parking status across key Varanasi areas during festival periods.
        </p>
      </div>

      <div className="mb-4">
        <Disclaimer />
      </div>

      {/* Legend */}
      <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl bg-white p-4 text-sm">
        <span className="font-medium text-navy-500">Density Legend:</span>
        <span className="badge bg-crowd-low text-white">Low</span>
        <span className="badge bg-crowd-medium text-white">Medium</span>
        <span className="badge bg-crowd-high text-white">High</span>
        <span className="badge bg-crowd-severe text-white">Severe</span>
      </div>

      {/* Area cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {areas.map((area, i) => {
          const level = getCrowdLevel(area.density);
          const color = level === 'Severe' ? '#991b1b' : level === 'High' ? '#ef4444' : level === 'Medium' ? '#f59e0b' : '#22c55e';
          return (
            <div
              key={area.name}
              className="card p-5 animate-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-navy-400" />
                  <h3 className="font-display font-bold text-navy-900">{area.name}</h3>
                </div>
                <span className={`badge ${getTrafficColor(area.traffic)}`}>
                  {area.traffic.split('(')[0].trim()}
                </span>
              </div>

              {/* Density bar */}
              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-navy-400 font-medium">Crowd Density</span>
                  <span className={`font-bold ${getCrowdTextColor(level)}`}>
                    {level} · {area.density.toFixed(1)}/10
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-navy-100">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${(area.density / 10) * 100}%`, backgroundColor: color }}
                  ></div>
                </div>
              </div>

              {/* Parking */}
              <div className="mt-3 flex items-center gap-2 text-sm">
                <Car className="h-4 w-4 text-navy-400" />
                <span className="text-navy-600">{area.parking}</span>
                <span
                  className={`ml-auto rounded-md px-2 py-0.5 text-xs font-semibold ${
                    area.parkingOccupancy >= 95
                      ? 'bg-red-100 text-red-700'
                      : area.parkingOccupancy >= 85
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {area.parkingOccupancy}% full
                </span>
              </div>

              {/* Festivals */}
              <div className="mt-3 border-t border-navy-50 pt-3">
                <p className="text-xs font-medium text-navy-400 mb-1.5">Active during:</p>
                <div className="flex flex-wrap gap-1.5">
                  {area.festivals.map((f) => (
                    <span key={f} className="rounded-md bg-navy-50 px-2 py-0.5 text-xs text-navy-600">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Advisory banner */}
      <div className="mt-6 flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 p-4">
        <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-red-800">Travel Advisory</p>
          <p className="text-sm text-red-700 mt-1">
            During severe density events, a total vehicle ban is enforced within a 5km radius of the ghats.
            Plan to arrive early, use designated parking at Beniabagh or Town Hall, and proceed on foot.
          </p>
        </div>
      </div>
    </div>
  );
}
