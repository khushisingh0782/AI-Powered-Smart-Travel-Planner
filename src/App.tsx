/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TripForm } from './components/TripForm';
import { ItineraryView } from './components/ItineraryView';
import { SavedTripsModal } from './components/SavedTripsModal';
import { TripPreferences, ItineraryResult } from './types/travel';
import { fetchItineraryPlan, getSavedTrips, saveTrip, deleteSavedTrip } from './services/travelService';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'plan' | 'itinerary'>('home');
  const [preferences, setPreferences] = useState<Partial<TripPreferences>>({
    destination: 'Goa',
    suggestForMe: false,
    startingCity: 'Mumbai',
    durationDays: 4,
    travelersCount: 2,
    travelerType: 'friends',
    budgetINR: 20000,
    travelStyle: 'relaxation',
    transportation: 'train',
    accommodation: 'homestay',
    specialRequirements: ''
  });
  const [itinerary, setItinerary] = useState<ItineraryResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [savedTrips, setSavedTrips] = useState<ItineraryResult[]>([]);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Load saved trips on mount
    const saved = getSavedTrips();
    setSavedTrips(saved);
  }, []);

  const handleGeneratePlan = async (prefs: TripPreferences) => {
    if (isLoading) return; // Prevent duplicate submissions while request is running
    setIsLoading(true);
    setErrorMsg(null);
    setPreferences(prefs);

    try {
      const result = await fetchItineraryPlan(prefs);
      if (!result || !result.days || result.days.length === 0) {
        throw new Error('Unable to construct a valid multi-day itinerary. Please verify your inputs and try again.');
      }
      setItinerary(result);
      setCurrentView('itinerary');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Failed to generate plan:', err);
      setErrorMsg(err?.message || 'An unexpected error occurred while generating your itinerary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPreset = (preset: Partial<TripPreferences>) => {
    setPreferences(prev => ({
      ...prev,
      ...preset
    }));
    setCurrentView('plan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveTrip = (tripToSave: ItineraryResult) => {
    saveTrip(tripToSave);
    setSavedTrips(getSavedTrips());
  };

  const handleDeleteTrip = (id: string) => {
    const updated = deleteSavedTrip(id);
    setSavedTrips(updated);
  };

  const handleSelectSavedTrip = (saved: ItineraryResult) => {
    setItinerary(saved);
    setCurrentView('itinerary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCurrentTripSaved = itinerary
    ? savedTrips.some(t => t.id === itinerary.id)
    : false;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Navbar */}
      <Navbar
        onNavigate={(view) => {
          if (view === 'itinerary' && !itinerary) {
            setCurrentView('plan');
          } else {
            setCurrentView(view);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        savedCount={savedTrips.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {errorMsg && (
          <div className="no-print mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 flex items-start gap-3 text-sm">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">Unable to Generate Plan</p>
              <p className="text-xs text-red-800 mt-0.5">{errorMsg}</p>
            </div>
            <button
              onClick={() => setErrorMsg(null)}
              className="text-xs text-red-700 hover:text-red-900 font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* View 1: Home View */}
        {currentView === 'home' && (
          <HeroSection
            onStartPlanning={() => {
              setCurrentView('plan');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectPreset={handleSelectPreset}
          />
        )}

        {/* View 2: Trip Preference Form View */}
        {currentView === 'plan' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentView('home')}
                className="no-print inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
            </div>

            <TripForm
              initialPreferences={preferences}
              onSubmit={handleGeneratePlan}
              isLoading={isLoading}
            />
          </div>
        )}

        {/* View 3: Itinerary Results View */}
        {currentView === 'itinerary' && itinerary && (
          <div className="space-y-6">
            <div className="no-print flex items-center justify-between">
              <button
                onClick={() => setCurrentView('plan')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Edit Preferences</span>
              </button>
            </div>

            <ItineraryView
              itinerary={itinerary}
              onEditPreferences={() => setCurrentView('plan')}
              onRegenerate={() => {
                if (preferences) {
                  handleGeneratePlan(preferences as TripPreferences);
                }
              }}
              onNewTrip={() => {
                setItinerary(null);
                setCurrentView('plan');
              }}
              onSaveTrip={handleSaveTrip}
              isSaved={isCurrentTripSaved}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="no-print bg-white border-t border-slate-200 py-8 mt-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              TP
            </div>
            <span className="font-semibold text-slate-800">AI-Powered Smart Travel Planner</span>
            <span aria-hidden="true">·</span>
            <span>Tourism & Travel Platform</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>Seamless AI-Assisted Trip Planning</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SavedTripsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedTrips={savedTrips}
        onSelectTrip={handleSelectSavedTrip}
        onDeleteTrip={handleDeleteTrip}
      />
    </div>
  );
}
