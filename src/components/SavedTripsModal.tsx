import React from 'react';
import { X, Trash2, ArrowRight, Bookmark, Calendar, Wallet } from 'lucide-react';
import { ItineraryResult } from '../types/travel';

interface SavedTripsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedTrips: ItineraryResult[];
  onSelectTrip: (trip: ItineraryResult) => void;
  onDeleteTrip: (id: string) => void;
}

export const SavedTripsModal: React.FC<SavedTripsModalProps> = ({
  isOpen,
  onClose,
  savedTrips,
  onSelectTrip,
  onDeleteTrip
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Saved Travel Itineraries</h3>
              <p className="text-xs text-slate-500">Stored locally in your browser session.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Trips List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {savedTrips.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="text-sm font-semibold text-slate-700">No saved itineraries yet</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Generate an itinerary and click "Save Itinerary" to keep a copy handy for quick review during your presentation.
              </p>
            </div>
          ) : (
            savedTrips.map((trip) => (
              <div
                key={trip.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 transition-all flex items-center justify-between gap-4"
              >
                <div className="space-y-1 flex-1">
                  <h4 className="text-sm font-bold text-slate-900">{trip.destination}</h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {trip.durationDays} Days
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Wallet className="w-3.5 h-3.5 text-slate-400" />
                      ₹{trip.budgetBreakdown.totalEstimatedCost.toLocaleString('en-IN')}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{new Date(trip.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectTrip(trip);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteTrip(trip.id)}
                    className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete saved trip"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>{savedTrips.length} saved trip(s) available</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg font-medium text-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
