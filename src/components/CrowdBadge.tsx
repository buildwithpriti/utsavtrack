import type { CrowdLevel } from '@/data/festivals';
import { getCrowdColor } from '@/data/festivals';

export default function CrowdBadge({ level, size = 'sm' }: { level: CrowdLevel; size?: 'sm' | 'md' }) {
  const sizeClass = size === 'md' ? 'px-4 py-1.5 text-sm' : 'px-3 py-1 text-xs';
  return (
    <span className={`badge ${getCrowdColor(level)} ${sizeClass}`}>
      <span className="h-2 w-2 rounded-full bg-white/80"></span>
      {level}
    </span>
  );
}
