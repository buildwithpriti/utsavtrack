import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export type PageId = 'dashboard' | 'timeline' | 'areas' | 'report' | 'about';

const navItems: { id: PageId; label: string }[] = [
  { id: 'dashboard', label: 'Festivals' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'areas', label: 'Area Status' },
  { id: 'report', label: 'Report' },
  { id: 'about', label: 'About' },
];

export default function Navbar({
  current,
  onNavigate,
}: {
  current: PageId;
  onNavigate: (page: PageId) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-navy-800 text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <button
            onClick={() => handleNav('dashboard')}
            className="flex items-center gap-2.5 font-display font-bold text-lg"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-400 text-navy-900">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7v6h-6" />
              </svg>
            </span>
            <span>
              Utsav<span className="text-orange-400">Track</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  current === item.id
                    ? 'bg-orange-400 text-navy-900'
                    : 'text-navy-100 hover:bg-navy-700 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden rounded-lg p-2 text-navy-100 hover:bg-navy-700"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-navy-700 bg-navy-800 px-4 pb-4">
          <div className="flex flex-col gap-1 pt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                  current === item.id
                    ? 'bg-orange-400 text-navy-900'
                    : 'text-navy-100 hover:bg-navy-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
