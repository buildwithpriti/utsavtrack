import { useState } from 'react';
import Navbar, { type PageId } from '@/components/Navbar';
import Dashboard from '@/pages/Dashboard';
import FestivalDetail from '@/pages/FestivalDetail';
import Timeline from '@/pages/Timeline';
import AreaStatus from '@/pages/AreaStatus';
import ReportForm from '@/pages/ReportForm';
import About from '@/pages/About';

function App() {
  const [page, setPage] = useState<PageId>('dashboard');
  const [selectedFestival, setSelectedFestival] = useState<string | null>(null);

  const handleNavigate = (p: PageId) => {
    setPage(p);
    setSelectedFestival(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFestival = (id: string) => {
    setSelectedFestival(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedFestival(null);
    setPage('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-navy-50">
      <Navbar current={page} onNavigate={handleNavigate} />
      <main>
        {selectedFestival ? (
          <FestivalDetail festivalId={selectedFestival} onBack={handleBack} />
        ) : page === 'dashboard' ? (
          <Dashboard onSelect={handleSelectFestival} />
        ) : page === 'timeline' ? (
          <Timeline />
        ) : page === 'areas' ? (
          <AreaStatus />
        ) : page === 'report' ? (
          <ReportForm />
        ) : (
          <About />
        )}
      </main>
      <footer className="border-t border-navy-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 text-center">
          <p className="text-sm text-navy-400">
            UtsavTrack — Historical pattern based data, not live sensors. Always verify with local authorities.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
