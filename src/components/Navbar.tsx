import React, { useState } from 'react';
import { Compass, BookmarkCheck, PlusCircle, Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: 'home' | 'plan' | 'itinerary') => void;
  onOpenSaved: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onOpenSaved,
  savedCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => {
            onNavigate('home');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2.5 text-left text-slate-900 font-bold text-lg tracking-tight hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-sm">
            <Compass className="w-5 h-5" />
          </div>
          <span>AI Travel Planner</span>
        </button>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0"
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('plan')}
            className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0"
          >
            Plan Trip
          </button>
          <button
            onClick={onOpenSaved}
            className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0"
          >
            <BookmarkCheck className="w-4 h-4 text-emerald-600" />
            <span>Saved Trips</span>
            {savedCount > 0 && (
              <span className="text-xs bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-mono">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: Primary Action & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => {
              onNavigate('plan');
              setMobileMenuOpen(false);
            }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Plan My Trip</span>
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 shadow-lg">
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Home
          </button>
          <button
            onClick={() => {
              onNavigate('plan');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Plan Trip
          </button>
          <button
            onClick={() => {
              onOpenSaved();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4 text-emerald-600" />
              <span>Saved Trips</span>
            </span>
            {savedCount > 0 && (
              <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};
