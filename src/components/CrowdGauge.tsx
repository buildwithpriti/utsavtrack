import { getCrowdLevel, getCrowdTextColor } from '@/data/festivals';

export default function CrowdGauge({ density, size = 120 }: { density: number; size?: number }) {
  const level = getCrowdLevel(density);
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const maxDensity = 10;
  const progress = Math.min(density / maxDensity, 1);
  const dashOffset = circumference * (1 - progress);

  const colorMap: Record<string, string> = {
    Low: '#22c55e',
    Medium: '#f59e0b',
    High: '#ef4444',
    Severe: '#991b1b',
  };
  const color = colorMap[level];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold font-display" style={{ color }}>
            {density.toFixed(1)}
          </span>
          <span className={`text-xs font-semibold ${getCrowdTextColor(level)}`}>{level}</span>
        </div>
      </div>
      <span className="text-xs text-navy-400 font-medium">Density Score / 10</span>
    </div>
  );
}
