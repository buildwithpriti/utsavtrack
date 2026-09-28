import { AlertTriangle } from 'lucide-react';

export default function Disclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`disclaimer-banner ${compact ? 'text-xs py-1.5' : ''}`}>
      <AlertTriangle className="h-4 w-4 shrink-0" />
      <span>
        Historical pattern based — not live sensor data. Crowd figures are simulated from past event records.
      </span>
    </div>
  );
}
