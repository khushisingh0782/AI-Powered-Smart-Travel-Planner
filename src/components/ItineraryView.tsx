import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  IndianRupee, 
  Sparkles, 
  Printer, 
  Bookmark, 
  RotateCcw, 
  Edit3, 
  PlusCircle, 
  Utensils, 
  Compass, 
  Sun, 
  Sunset, 
  Moon, 
  CheckCircle, 
  Lightbulb,
  Download,
  Info,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ItineraryResult, DayItinerary, ChecklistItem } from '../types/travel';
import { PackingChecklist } from './PackingChecklist';

interface ItineraryViewProps {
  itinerary: ItineraryResult;
  onEditPreferences: () => void;
  onRegenerate: () => void;
  onNewTrip: () => void;
  onSaveTrip: (trip: ItineraryResult) => void;
  isSaved: boolean;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  itinerary,
  onEditPreferences,
  onRegenerate,
  onNewTrip,
  onSaveTrip,
  isSaved
}) => {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'budget' | 'places_food' | 'packing'>('itinerary');
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(itinerary.packingChecklist);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [showAllDays, setShowAllDays] = useState<boolean>(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  const handleSave = () => {
    onSaveTrip({
      ...itinerary,
      packingChecklist: checklistItems
    });
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(itinerary, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${itinerary.destination.replace(/[^a-zA-Z0-9]/g, '_')}_Itinerary.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const selectedDay: DayItinerary = itinerary.days[selectedDayIndex] || itinerary.days[0];

  // Budget calculations
  const totalCost = itinerary.budgetBreakdown.totalEstimatedCost;
  const transportPct = Math.round((itinerary.budgetBreakdown.transportationCost / totalCost) * 100);
  const stayPct = Math.round((itinerary.budgetBreakdown.accommodationCost / totalCost) * 100);
  const foodPct = Math.round((itinerary.budgetBreakdown.foodAndDiningCost / totalCost) * 100);
  const activitiesPct = Math.round((itinerary.budgetBreakdown.activitiesAndEntry / totalCost) * 100);
  const bufferPct = Math.round((itinerary.budgetBreakdown.miscellaneousEmergency / totalCost) * 100);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Top Action Bar (hidden in print) */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={onEditPreferences}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-600" />
            <span>Edit Preferences</span>
          </button>
          <button
            onClick={onRegenerate}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200/50"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
            <span>Regenerate Plan</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors shadow-xs ${
              isSaved
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{isSaved ? 'Saved in Library' : 'Save Itinerary'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Print / PDF</span>
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            title="Download JSON export"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={onNewTrip}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Trip</span>
          </button>
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="no-print p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Trip itinerary successfully saved to your browser session! Access it anytime via the "Saved Trips" menu.</span>
        </div>
      )}

      {/* Destination Hero Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-400">
            <span className="flex items-center gap-1 font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {itinerary.dataSource === 'gemini_ai' ? 'Gemini 3.8 AI Generation' : 'Smart Curated Engine'}
            </span>
            <span aria-hidden="true" className="text-white/40">·</span>
            <span className="text-white/80">{itinerary.durationDays} Days Itinerary</span>
            <span aria-hidden="true" className="text-white/40">·</span>
            <span className="text-white/80">{itinerary.bestSeason}</span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              {itinerary.destination}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-1 font-medium">
              {itinerary.tagline}
            </p>
          </div>

          <div className="pt-2 border-t border-white/10 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
            <span className="font-semibold text-emerald-400">Recommendation Rationale: </span>
            {itinerary.reasonForRecommendation}
          </div>

          <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-300">
            <div>
              <span className="text-slate-400 block text-[11px]">Expected Climate</span>
              <span className="font-medium text-white">{itinerary.weatherForecast}</span>
            </div>
            <div className="border-l border-white/10 pl-4">
              <span className="text-slate-400 block text-[11px]">Est. Total Budget</span>
              <span className="font-bold text-white font-mono">
                ₹{itinerary.budgetBreakdown.totalEstimatedCost.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="border-l border-white/10 pl-4">
              <span className="text-slate-400 block text-[11px]">Per Person Approx.</span>
              <span className="font-bold text-white font-mono">
                ₹{itinerary.budgetBreakdown.perPersonCost.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs (no-print) */}
      <div className="no-print flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('itinerary')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'itinerary'
              ? 'bg-emerald-600 text-white'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          Day-by-Day Schedule
        </button>
        <button
          onClick={() => setActiveTab('budget')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'budget'
              ? 'bg-emerald-600 text-white'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          Budget Breakdown & Savings
        </button>
        <button
          onClick={() => setActiveTab('places_food')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'places_food'
              ? 'bg-emerald-600 text-white'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          Key Spots & Local Food
        </button>
        <button
          onClick={() => setActiveTab('packing')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'packing'
              ? 'bg-emerald-600 text-white'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          Packing Checklist ({checklistItems.filter(i => i.isChecked).length}/{checklistItems.length})
        </button>
      </div>

      {/* Tab 1: Day-wise Schedule */}
      {(activeTab === 'itinerary' || typeof window !== 'undefined') && (
        <div className={`space-y-6 ${activeTab !== 'itinerary' ? 'hidden print:block' : ''}`}>
          {/* Day Selector Pill Tabs & View All Toggle */}
          <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {itinerary.days.map((day, idx) => (
                <button
                  key={day.dayNumber}
                  onClick={() => {
                    setSelectedDayIndex(idx);
                    setShowAllDays(false);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    !showAllDays && selectedDayIndex === idx
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Day {day.dayNumber}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowAllDays(!showAllDays)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors self-start sm:self-auto ${
                showAllDays
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{showAllDays ? 'Viewing All Days' : 'View All Days'}</span>
            </button>
          </div>

          {/* Render Either Selected Day or All Days */}
          {(!showAllDays ? [selectedDay] : itinerary.days).map((day) => (
            <div key={day.dayNumber} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 print-break-inside-avoid">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Day {day.dayNumber} Itinerary
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">{day.theme}</h3>
                </div>
                <div className="text-xs text-slate-500 font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
                  Est. Day Expense: <span className="font-bold text-slate-900">₹{day.dayExpenseINR.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Time Segments */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Morning */}
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-amber-700">
                    <span className="flex items-center gap-1.5">
                      <Sun className="w-4 h-4 text-amber-500" />
                      Morning ({day.morning.time})
                    </span>
                    <span className="font-mono text-slate-700 font-bold">₹{day.morning.estimatedCostINR.toLocaleString('en-IN')}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{day.morning.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{day.morning.description}</p>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{day.morning.location}</span>
                  </div>
                  {day.morning.insiderTip && (
                    <div className="p-2 bg-amber-50/60 rounded-lg text-[11px] text-amber-900 flex items-start gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{day.morning.insiderTip}</span>
                    </div>
                  )}
                </div>

                {/* Afternoon */}
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-blue-700">
                    <span className="flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-blue-500" />
                      Afternoon ({day.afternoon.time})
                    </span>
                    <span className="font-mono text-slate-700 font-bold">₹{day.afternoon.estimatedCostINR.toLocaleString('en-IN')}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{day.afternoon.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{day.afternoon.description}</p>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{day.afternoon.location}</span>
                  </div>
                  {day.afternoon.insiderTip && (
                    <div className="p-2 bg-blue-50/60 rounded-lg text-[11px] text-blue-900 flex items-start gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{day.afternoon.insiderTip}</span>
                    </div>
                  )}
                </div>

                {/* Evening */}
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-purple-700">
                    <span className="flex items-center gap-1.5">
                      <Sunset className="w-4 h-4 text-purple-500" />
                      Evening ({day.evening.time})
                    </span>
                    <span className="font-mono text-slate-700 font-bold">₹{day.evening.estimatedCostINR.toLocaleString('en-IN')}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{day.evening.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{day.evening.description}</p>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{day.evening.location}</span>
                  </div>
                  {day.evening.insiderTip && (
                    <div className="p-2 bg-purple-50/60 rounded-lg text-[11px] text-purple-900 flex items-start gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                      <span>{day.evening.insiderTip}</span>
                    </div>
                  )}
                </div>

                {/* Night */}
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-indigo-700">
                    <span className="flex items-center gap-1.5">
                      <Moon className="w-4 h-4 text-indigo-500" />
                      Night / Dinner ({day.night.time})
                    </span>
                    <span className="font-mono text-slate-700 font-bold">₹{day.night.estimatedCostINR.toLocaleString('en-IN')}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{day.night.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{day.night.description}</p>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Utensils className="w-3 h-3 text-slate-400" />
                    <span>{day.night.location}</span>
                  </div>
                  {day.night.insiderTip && (
                    <div className="p-2 bg-indigo-50/60 rounded-lg text-[11px] text-indigo-900 flex items-start gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{day.night.insiderTip}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Budget Breakdown */}
      {(activeTab === 'budget' || typeof window !== 'undefined') && (
        <div className={`space-y-6 ${activeTab !== 'budget' ? 'hidden print:block' : ''}`}>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Financial Planning</span>
                <h3 className="text-xl font-bold text-slate-900">Itemized INR Expense Breakdown</h3>
                <p className="text-xs text-slate-500 mt-0.5">Realistic estimates calculated for your group size, transit class, and lodging preference.</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Total Est. Cost</span>
                <span className="text-2xl font-black text-slate-900 font-mono">
                  ₹{itinerary.budgetBreakdown.totalEstimatedCost.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Visual Category Distribution Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                <span>Expense Category Ratio</span>
                <span>100% of Estimated Outlay</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div style={{ width: `${transportPct}%` }} className="bg-sky-500" title={`Transport: ${transportPct}%`} />
                <div style={{ width: `${stayPct}%` }} className="bg-indigo-500" title={`Lodging: ${stayPct}%`} />
                <div style={{ width: `${foodPct}%` }} className="bg-emerald-500" title={`Food: ${foodPct}%`} />
                <div style={{ width: `${activitiesPct}%` }} className="bg-amber-500" title={`Activities: ${activitiesPct}%`} />
                <div style={{ width: `${bufferPct}%` }} className="bg-slate-400" title={`Emergency: ${bufferPct}%`} />
              </div>
              <div className="flex flex-wrap gap-4 text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" /> Transport ({transportPct}%)</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" /> Stay ({stayPct}%)</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Food ({foodPct}%)</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Activities ({activitiesPct}%)</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" /> Buffer ({bufferPct}%)</span>
              </div>
            </div>

            {/* Savings Advice Card */}
            <div className={`p-4 rounded-xl border text-xs leading-relaxed flex items-start gap-3 ${
              itinerary.budgetBreakdown.status === 'exceeds_budget'
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}>
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Budget Optimization Advice:</span>
                <span>{itinerary.budgetBreakdown.savingsAdvice}</span>
              </div>
            </div>

            {/* Expense Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 space-y-1">
                <span className="text-xs text-slate-500">Transportation / Tickets</span>
                <div className="text-lg font-bold text-slate-900 font-mono">
                  ₹{itinerary.budgetBreakdown.transportationCost.toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-slate-400 block">Round-trip + local in-city travel</span>
              </div>

              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 space-y-1">
                <span className="text-xs text-slate-500">Accommodation</span>
                <div className="text-lg font-bold text-slate-900 font-mono">
                  ₹{itinerary.budgetBreakdown.accommodationCost.toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-slate-400 block">Total for {itinerary.durationDays - 1 > 0 ? itinerary.durationDays - 1 : 1} night(s)</span>
              </div>

              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 space-y-1">
                <span className="text-xs text-slate-500">Food & Meals</span>
                <div className="text-lg font-bold text-slate-900 font-mono">
                  ₹{itinerary.budgetBreakdown.foodAndDiningCost.toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-slate-400 block">Breakfast, lunch, cafe, dinners</span>
              </div>

              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 space-y-1">
                <span className="text-xs text-slate-500">Sightseeing & Entry Fees</span>
                <div className="text-lg font-bold text-slate-900 font-mono">
                  ₹{itinerary.budgetBreakdown.activitiesAndEntry.toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-slate-400 block">Monument tickets & adventure passes</span>
              </div>

              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 space-y-1">
                <span className="text-xs text-slate-500">Emergency & Misc Buffer (10%)</span>
                <div className="text-lg font-bold text-slate-900 font-mono">
                  ₹{itinerary.budgetBreakdown.miscellaneousEmergency.toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-slate-400 block">Auto tips, bottled water, snacks</span>
              </div>

              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1">
                <span className="text-xs text-emerald-800 font-semibold">Per Person Cost</span>
                <div className="text-lg font-bold text-emerald-900 font-mono">
                  ₹{itinerary.budgetBreakdown.perPersonCost.toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-emerald-700 block">Estimated share per traveler</span>
              </div>
            </div>

            {/* Price Disclaimer Badge */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                <strong>Academic Disclaimer:</strong> Figures reflect realistic Indian seasonal market averages. Live fares dynamically fluctuate based on actual booking dates, advance reservation window, and seat availability.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Places to Visit & Local Food */}
      {(activeTab === 'places_food' || typeof window !== 'undefined') && (
        <div className={`space-y-8 ${activeTab !== 'places_food' ? 'hidden print:block' : ''}`}>
          {/* Places to Visit */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Must-See Landmarks</span>
              <h3 className="text-xl font-bold text-slate-900">Recommended Attractions</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {itinerary.placesToVisit.map((place, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <h4 className="font-bold text-slate-900 text-sm">{place.name}</h4>
                    <span className="font-mono text-emerald-700 font-semibold">
                      {place.entryFeeINR === 0 ? 'Free Entry' : `₹${place.entryFeeINR}`}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{place.highlight}</p>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
                    <span>Timing: {place.timing}</span>
                    <span aria-hidden="true">·</span>
                    <span>Best Time: {place.bestTimeToVisit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Local Food to Try */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Culinary Experiences</span>
              <h3 className="text-xl font-bold text-slate-900">Authentic Regional Flavors</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {itinerary.localFoods.map((food, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <h4 className="font-bold text-slate-900 text-sm">{food.name}</h4>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        food.vegNonVeg === 'veg' 
                          ? 'bg-green-100 text-green-800' 
                          : food.vegNonVeg === 'non-veg' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {food.vegNonVeg.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{food.description}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 space-y-0.5">
                    <div>Recommended: <span className="text-slate-800 font-medium">{food.recommendedSpot}</span></div>
                    <div>Approx. <span className="font-mono font-semibold text-slate-900">₹{food.approxPriceINR}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Tips */}
          {itinerary.importantTravelTips && itinerary.importantTravelTips.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Local Knowledge</span>
              <h3 className="text-lg font-bold text-slate-900">Insider Travel Advice</h3>
              <ul className="space-y-2 text-xs text-slate-600 leading-relaxed list-disc list-inside">
                {itinerary.importantTravelTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Packing Checklist */}
      {(activeTab === 'packing' || typeof window !== 'undefined') && (
        <div className={`${activeTab !== 'packing' ? 'hidden print:block' : ''}`}>
          <PackingChecklist
            initialItems={checklistItems}
            onUpdateItems={setChecklistItems}
          />
        </div>
      )}
    </div>
  );
};
