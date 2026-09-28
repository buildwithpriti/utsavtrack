import Disclaimer from '@/components/Disclaimer';
import { Calendar, TrendingUp, Shield, Info, Users, Car, ParkingCircle, BarChart3, FileText } from 'lucide-react';

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-900 sm:text-3xl">About UtsavTrack</h1>
        <p className="mt-1 text-navy-500">
          Understanding crowd patterns across Varanasi's major festivals.
        </p>
      </div>

      <div className="mb-4">
        <Disclaimer />
      </div>

      {/* What is UtsavTrack */}
      <div className="card p-6 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Info className="h-5 w-5 text-orange-400" />
          <h2 className="text-lg font-bold text-navy-900">What is UtsavTrack?</h2>
        </div>
        <p className="text-sm text-navy-600 leading-relaxed">
          UtsavTrack is a crowd-monitoring dashboard for Varanasi's major festivals — Maha Shivratri,
          Holi, Navratri, Shravan Maas, Durga Puja, Bharat Milap, and Dev Deepawali. It visualizes
          crowd density, traffic conditions, and parking availability to help visitors and
          administrators plan around large gatherings.
        </p>
      </div>

      {/* Data source */}
      <div className="card p-6 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="h-5 w-5 text-orange-400" />
          <h2 className="text-lg font-bold text-navy-900">Data Source</h2>
        </div>
        <p className="text-sm text-navy-600 leading-relaxed">
          All data shown is derived from historical festival records and event timelines specific to
          Varanasi. This includes an annual festival calendar and detailed timeline data for specific
          events like Dev Deepawali and Maha Shivratri. The figures are simulated from past patterns —
          they are not live sensor readings or real-time GPS data.
        </p>
        <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-3">
          <p className="text-sm text-amber-800">
            <strong>Important:</strong> Every metric on this site is labeled "historical pattern based."
            Always verify with local authorities before making travel decisions during festival periods.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="card p-6 mb-5">
        <h2 className="text-lg font-bold text-navy-900 mb-4">Features</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <FeatureItem icon={Calendar} title="Festival Cards" desc="Crowd, traffic & parking info for every major festival." />
          <FeatureItem icon={BarChart3} title="Timeline View" desc="Visitor count and density progression graphs from historical events." />
          <FeatureItem icon={TrendingUp} title="Color-Coded Density" desc="Green (low) to red (severe) — instantly understand crowd levels." />
          <FeatureItem icon={Users} title="Best Time to Visit" desc="Suggested windows to avoid peak crowds for each festival." />
          <FeatureItem icon={Car} title="Area Status Board" desc="Crowd and parking status across all key Varanasi areas." />
          <FeatureItem icon={FileText} title="Crowd Report Form" desc="Submit your own on-the-ground status (demo mode)." />
        </div>
      </div>

      {/* Color coding */}
      <div className="card p-6 mb-5">
        <h2 className="text-lg font-bold text-navy-900 mb-4">Crowd Density Color Code</h2>
        <div className="space-y-2">
          {[
            { level: 'Low', color: 'bg-crowd-low', range: '0 – 2.9', desc: 'Comfortable, easy movement' },
            { level: 'Medium', color: 'bg-crowd-medium', range: '3.0 – 5.9', desc: 'Moderate crowds, some waiting' },
            { level: 'High', color: 'bg-crowd-high', range: '6.0 – 7.9', desc: 'Heavy crowds, slow movement' },
            { level: 'Severe', color: 'bg-crowd-severe', range: '8.0 – 10', desc: 'Extremely dense, avoid if possible' },
          ].map((item) => (
            <div key={item.level} className="flex items-center gap-3 rounded-xl bg-navy-50 p-3">
              <span className={`h-8 w-8 rounded-lg ${item.color}`}></span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-navy-800">{item.level}</p>
                <p className="text-xs text-navy-400">{item.desc}</p>
              </div>
              <span className="text-sm font-medium text-navy-500">{item.range}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-navy-400 mt-8">
        <p>UtsavTrack — Varanasi Festival Crowd Monitoring</p>
        <p className="mt-1">Built with React, TypeScript & Tailwind CSS</p>
      </div>
    </div>
  );
}

function FeatureItem({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-navy-50 p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-800 text-orange-400">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-sm font-semibold text-navy-800">{title}</p>
        <p className="text-xs text-navy-500 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
