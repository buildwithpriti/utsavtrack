import { useState } from 'react';
import {
  historicalEvents,
  phaseBgColors,
  type HistoricalEvent,
} from '@/data/timeline';
import Disclaimer from '@/components/Disclaimer';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  ComposedChart,
  ReferenceDot,
} from 'recharts';
import { Calendar, MapPin, TrendingUp, Users, Activity, Car } from 'lucide-react';

export default function TimelinePage() {
  const [selectedId, setSelectedId] = useState(historicalEvents[0].id);
  const event = historicalEvents.find((e) => e.id === selectedId)!;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-900 sm:text-3xl">Historical Event Timeline</h1>
        <p className="mt-1 text-navy-500">
          Visitor count and crowd density progression through major Varanasi festivals — based on historical event data.
        </p>
      </div>

      <div className="mb-4">
        <Disclaimer />
      </div>

      {/* Event selector */}
      <div className="mb-6 flex flex-wrap gap-2">
        {historicalEvents.map((e) => (
          <button
            key={e.id}
            onClick={() => setSelectedId(e.id)}
            className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
              selectedId === e.id
                ? 'bg-navy-800 text-white shadow-md'
                : 'bg-white text-navy-600 hover:bg-navy-100'
            }`}
          >
            {e.name}
          </button>
        ))}
      </div>

      {/* Event info */}
      <div className="mb-6 card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-navy-900">{event.name}</h2>
            <div className="mt-1 flex items-center gap-2 text-sm text-navy-500">
              <Calendar className="h-4 w-4" />
              {event.date}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <span className="text-navy-400">Peak Visitors: </span>
              <span className="font-semibold text-navy-800">
                {Math.max(...event.data.map((d) => d.visitors)).toLocaleString('en-IN')}
              </span>
            </div>
            <div>
              <span className="text-navy-400">Peak Density: </span>
              <span className="font-semibold text-red-600">
                {Math.max(...event.data.map((d) => d.density)).toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        <p className="mt-3 text-sm text-navy-600 leading-relaxed">{event.description}</p>
      </div>

      {/* Main chart */}
      <div className="mb-6 card p-5">
        <h3 className="mb-4 font-semibold text-navy-800">Visitor Count & Crowd Density Over Time</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={event.data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="visitorGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0B2545" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#0B2545" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 12, fill: '#64748b' }}
                label={{ value: 'Visitors', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#64748b' } }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 10]}
                tick={{ fontSize: 12, fill: '#64748b' }}
                label={{ value: 'Density', angle: 90, position: 'insideRight', style: { fontSize: 12, fill: '#64748b' } }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #d5e0ec',
                  fontSize: '13px',
                }}
              />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="visitors"
                name="Visitors"
                stroke="#0B2545"
                strokeWidth={2}
                fill="url(#visitorGrad)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="density"
                name="Density / 10"
                stroke="#F4A825"
                strokeWidth={3}
                dot={{ r: 5, fill: '#F4A825' }}
              />
              {event.data
                .filter((d) => d.peak)
                .map((d, i) => (
                  <ReferenceDot
                    key={i}
                    yAxisId="right"
                    x={d.time}
                    y={d.density}
                    r={8}
                    fill="#ef4444"
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-navy-400">
          <span className="inline-block h-3 w-3 rounded-full bg-red-500"></span>
          Red dots mark peak crowd moments
        </div>
      </div>

      {/* Phase breakdown */}
      <div className="mb-6">
        <h3 className="mb-4 font-semibold text-navy-800">Phase-by-Phase Breakdown</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {event.data.map((point, i) => (
            <div key={i} className="card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-navy-800">{point.time}</span>
                  <span className={`badge border ${phaseBgColors[point.phase]}`}>{point.phase}</span>
                </div>
                {point.peak && (
                  <span className="badge bg-red-100 text-red-700">
                    <Activity className="h-3 w-3" /> Peak
                  </span>
                )}
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-sm text-navy-500">
                <MapPin className="h-4 w-4" />
                {point.location}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-navy-50 p-2">
                  <Users className="mx-auto h-4 w-4 text-navy-400" />
                  <p className="mt-1 text-xs text-navy-400">Visitors</p>
                  <p className="text-sm font-bold text-navy-800">{point.visitors.toLocaleString('en-IN')}</p>
                </div>
                <div className="rounded-lg bg-navy-50 p-2">
                  <TrendingUp className="mx-auto h-4 w-4 text-navy-400" />
                  <p className="mt-1 text-xs text-navy-400">Density</p>
                  <p className="text-sm font-bold text-navy-800">{point.density.toFixed(1)}</p>
                </div>
                <div className="rounded-lg bg-navy-50 p-2">
                  <Car className="mx-auto h-4 w-4 text-navy-400" />
                  <p className="mt-1 text-xs text-navy-400">Parking</p>
                  <p className="text-sm font-bold text-navy-800">{point.parking}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
