import { useState } from 'react';
import Disclaimer from '@/components/Disclaimer';
import { festivals } from '@/data/festivals';
import { CheckCircle2, Send, Users, MapPin, Clock, MessageSquare } from 'lucide-react';

interface ReportData {
  festival: string;
  area: string;
  crowdLevel: string;
  time: string;
  notes: string;
}

export default function ReportForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<ReportData>({
    festival: '',
    area: '',
    crowdLevel: 'Medium',
    time: '',
    notes: '',
  });

  const allAreas = [...new Set(festivals.flatMap((f) => f.areas))].sort();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const reset = () => {
    setForm({ festival: '', area: '', crowdLevel: 'Medium', time: '', notes: '' });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 animate-fade-in">
        <div className="card p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-navy-900">Report Submitted</h2>
          <p className="mt-2 text-navy-500">
            Thank you for your contribution. Your crowd status report has been recorded (demo mode — no backend connected).
          </p>
          <div className="mt-6 rounded-xl bg-navy-50 p-4 text-left text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-navy-400">Festival</p>
                <p className="font-medium text-navy-800">{form.festival || '—'}</p>
              </div>
              <div>
                <p className="text-navy-400">Area</p>
                <p className="font-medium text-navy-800">{form.area || '—'}</p>
              </div>
              <div>
                <p className="text-navy-400">Crowd Level</p>
                <p className="font-medium text-navy-800">{form.crowdLevel}</p>
              </div>
              <div>
                <p className="text-navy-400">Time</p>
                <p className="font-medium text-navy-800">{form.time || '—'}</p>
              </div>
            </div>
            {form.notes && (
              <div className="mt-3 border-t border-navy-100 pt-3">
                <p className="text-navy-400">Notes</p>
                <p className="text-navy-700">{form.notes}</p>
              </div>
            )}
          </div>
          <button onClick={reset} className="btn-primary mt-6">
            Submit Another Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-900 sm:text-3xl">Submit a Crowd Report</h1>
        <p className="mt-1 text-navy-500">
          Share what you're seeing on the ground. Reports help others plan their visit.
        </p>
      </div>

      <div className="mb-4">
        <Disclaimer />
      </div>

      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        {/* Festival */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-700">
            Festival
          </label>
          <select
            required
            value={form.festival}
            onChange={(e) => setForm({ ...form, festival: e.target.value })}
            className="w-full rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-800 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-colors"
          >
            <option value="">Select a festival</option>
            {festivals.map((f) => (
              <option key={f.id} value={f.festival}>
                {f.festival} ({f.month})
              </option>
            ))}
          </select>
        </div>

        {/* Area */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-700">
            Area / Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
            <select
              required
              value={form.area}
              onChange={(e) => setForm({ ...form, area: e.target.value })}
              className="w-full rounded-xl border border-navy-200 bg-white pl-10 pr-4 py-2.5 text-sm text-navy-800 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-colors"
            >
              <option value="">Select an area</option>
              {allAreas.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Crowd Level */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-700">
            Crowd Level
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(['Low', 'Medium', 'High', 'Severe'] as const).map((level) => {
              const colors: Record<string, string> = {
                Low: 'bg-crowd-low',
                Medium: 'bg-crowd-medium',
                High: 'bg-crowd-high',
                Severe: 'bg-crowd-severe',
              };
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setForm({ ...form, crowdLevel: level })}
                  className={`rounded-xl py-2.5 text-sm font-semibold transition-all ${
                    form.crowdLevel === level
                      ? `${colors[level]} text-white shadow-md scale-105`
                      : 'bg-navy-50 text-navy-500 hover:bg-navy-100'
                  }`}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-700">
            Time of Observation
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
            <input
              type="time"
              required
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full rounded-xl border border-navy-200 bg-white pl-10 pr-4 py-2.5 text-sm text-navy-800 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-colors"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-700">
            Additional Notes <span className="text-navy-400 font-normal">(optional)</span>
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-navy-400" />
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3}
              placeholder="e.g. Long queue at temple entrance, traffic diverted via Lahurabir..."
              className="w-full rounded-xl border border-navy-200 bg-white pl-10 pr-4 py-2.5 text-sm text-navy-800 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-colors resize-none"
            />
          </div>
        </div>

        <button type="submit" className="btn-accent w-full">
          <Send className="h-4 w-4" />
          Submit Report
        </button>

        <p className="text-center text-xs text-navy-400">
          Demo mode — reports are not saved to any server.
        </p>
      </form>
    </div>
  );
}
