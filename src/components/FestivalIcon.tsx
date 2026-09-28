import { Moon, Palette, Sparkles, Droplets, Flame, Users, Lamp } from 'lucide-react';

const iconMap = {
  moon: Moon,
  palette: Palette,
  sparkles: Sparkles,
  droplets: Droplets,
  flame: Flame,
  users: Users,
  lamp: Lamp,
};

export default function FestivalIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name as keyof typeof iconMap] ?? Moon;
  return <Icon className={className} />;
}
