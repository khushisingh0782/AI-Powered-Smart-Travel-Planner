import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  Users, 
  IndianRupee, 
  Sparkles, 
  Car, 
  Hotel, 
  Compass, 
  AlertCircle, 
  FileText,
  RotateCcw,
  Check
} from 'lucide-react';
import { TripPreferences, TravelStyle, TransportPreference, AccommodationType, TravelerType } from '../types/travel';

interface TripFormProps {
  initialPreferences?: Partial<TripPreferences>;
  onSubmit: (pref: TripPreferences) => void;
  isLoading: boolean;
}

const POPULAR_CITIES = ['Delhi', 'Mumbai', 'Bengaluru', 'Ahmedabad', 'Rajkot', 'Kolkata', 'Chennai', 'Jaipur', 'Pune'];
const POPULAR_DESTINATIONS = ['Goa', 'Manali', 'Jaipur', 'Kerala', 'Udaipur', 'Rishikesh', 'Leh-Ladakh', 'Ooty'];

const TRAVEL_STYLES: { id: TravelStyle; label: string; desc: string }[] = [
  { id: 'relaxation', label: 'Relaxation', desc: 'Beaches, coastal sunsets, calm cafes' },
  { id: 'adventure', label: 'Adventure', desc: 'Trekking, water sports, mountain trails' },
  { id: 'culture', label: 'Culture & Heritage', desc: 'Forts, temples, museums, folklore' },
  { id: 'nature', label: 'Nature & Wildlife', desc: 'Hills, backwaters, tea gardens' },
  { id: 'food', label: 'Food & Culinary', desc: 'Authentic local cuisine & street food' },
  { id: 'family', label: 'Family Friendly', desc: 'Comfortable sightseeing & balanced pace' }
];

const TRANSPORT_OPTIONS: { id: TransportPreference; label: string }[] = [
  { id: 'train', label: 'Train (Indian Railways)' },
  { id: 'flight', label: 'Flight (Fastest)' },
  { id: 'bus', label: 'Intercity Bus (Volvo / Sleeper)' },
  { id: 'drive', label: 'Self-Drive / Road Trip' },
  { id: 'flexible', label: 'Flexible / Best Value' }
];

const ACCOMMODATION_OPTIONS: { id: AccommodationType; label: string; desc: string }[] = [
  { id: 'hostel', label: 'Budget Hostel / Dorm', desc: '₹600 - ₹1,000 / bed' },
  { id: 'homestay', label: 'Cozy Homestay / Guesthouse', desc: '₹1,500 - ₹2,500 / room' },
  { id: 'midrange', label: 'Mid-Range Hotel (3-Star)', desc: '₹2,800 - ₹4,500 / room' },
  { id: 'luxury', label: 'Luxury Resort (4/5-Star)', desc: '₹7,500+ / room' }
];

const LOADING_TIPS = [
  "Consulting route transit connections and average fares...",
  "Estimating accommodation and local lodging rates in INR...",
  "Curating must-visit historical monuments and scenic viewpoints...",
  "Assembling authentic local food dishes and street food spots...",
  "Generating weather-aligned packing checklist..."
];

export const TripForm: React.FC<TripFormProps> = ({
  initialPreferences,
  onSubmit,
  isLoading
}) => {
  const [destination, setDestination] = useState(initialPreferences?.destination || '');
  const [suggestForMe, setSuggestForMe] = useState(initialPreferences?.suggestForMe ?? false);
  const [startingCity, setStartingCity] = useState(initialPreferences?.startingCity || 'Mumbai');
  const [durationDays, setDurationDays] = useState(initialPreferences?.durationDays || 4);
  const [startDate, setStartDate] = useState(initialPreferences?.startDate || '');
  const [endDate, setEndDate] = useState(initialPreferences?.endDate || '');
  const [travelersCount, setTravelersCount] = useState(initialPreferences?.travelersCount || 2);
  const [travelerType, setTravelerType] = useState<TravelerType>(initialPreferences?.travelerType || 'friends');
  const [budgetINR, setBudgetINR] = useState(initialPreferences?.budgetINR || 20000);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>(initialPreferences?.travelStyle || 'relaxation');
  const [transportation, setTransportation] = useState<TransportPreference>(initialPreferences?.transportation || 'train');
  const [accommodation, setAccommodation] = useState<AccommodationType>(initialPreferences?.accommodation || 'homestay');
  const [specialRequirements, setSpecialRequirements] = useState(initialPreferences?.specialRequirements || '');

  const [validationError, setValidationError] = useState<string | null>(null);
  const [loadingTipIndex, setLoadingTipIndex] = useState(0);

  // Rotate loading tips
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setLoadingTipIndex((prev) => (prev + 1) % LOADING_TIPS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isLoading]);

  // When start and end date are both picked, calculate duration
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      if (diffDays >= 1 && diffDays <= 14) {
        setDurationDays(diffDays);
      }
    }
  }, [startDate, endDate]);

  const handleFillDemoData = () => {
    setDestination('Goa');
    setSuggestForMe(false);
    setStartingCity('Mumbai');
    setDurationDays(4);
    setTravelersCount(2);
    setTravelerType('friends');
    setBudgetINR(20000);
    setTravelStyle('relaxation');
    setTransportation('train');
    setAccommodation('homestay');
    setSpecialRequirements('Preference for local Goan fish curry, scooter rental, and quiet sunset viewpoints.');
    setValidationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return; // Prevent duplicate submissions
    setValidationError(null);

    // Validation
    if (!suggestForMe && (!destination || destination.trim() === '')) {
      setValidationError('Please enter your preferred destination or check "Suggest destinations for me".');
      return;
    }

    if (!startingCity || startingCity.trim() === '') {
      setValidationError('Please enter your starting city to calculate accurate transportation costs.');
      return;
    }

    if (durationDays < 1 || durationDays > 14) {
      setValidationError('Trip duration must be between 1 and 14 days.');
      return;
    }

    if (travelersCount < 1) {
      setValidationError('Please specify at least 1 traveler.');
      return;
    }

    if (budgetINR < 2000) {
      setValidationError('Budget must be at least ₹2,000 for realistic trip estimation.');
      return;
    }

    onSubmit({
      destination: suggestForMe ? '' : destination.trim(),
      suggestForMe,
      startingCity: startingCity.trim(),
      durationDays: Number(durationDays),
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      travelersCount: Number(travelersCount),
      travelerType,
      budgetINR: Number(budgetINR),
      travelStyle,
      transportation,
      accommodation,
      specialRequirements: specialRequirements.trim()
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-100 gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Trip Customization</span>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Configure Your Travel Preferences</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Fill in your trip details to generate an optimized itinerary, realistic INR budget, and tailored checklist.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleFillDemoData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200/50"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Fill Demo Data</span>
          </button>
        </div>
      </div>

      {validationError && (
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 text-sm">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Incomplete Preference Information</p>
            <p className="text-xs text-amber-800 mt-0.5">{validationError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Destination & Starting City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Destination */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                Target Destination
              </span>
            </label>
            <div className="space-y-2">
              <input
                type="text"
                disabled={suggestForMe}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder={suggestForMe ? 'AI will suggest destination based on style & budget' : 'e.g., Goa, Manali, Jaipur, Kerala, Udaipur'}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm disabled:bg-slate-100 disabled:text-slate-400 transition-colors"
              />
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={suggestForMe}
                  onChange={(e) => {
                    setSuggestForMe(e.target.checked);
                    if (e.target.checked) setDestination('');
                  }}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="font-medium">Suggest destination for me (Automated Recommendation)</span>
              </label>

              {/* Popular destination quick chips */}
              {!suggestForMe && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[11px] text-slate-400 self-center">Quick pick:</span>
                  {POPULAR_DESTINATIONS.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDestination(d)}
                      className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
                        destination.toLowerCase() === d.toLowerCase()
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Starting City */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              Starting City (For Transit Route)
            </label>
            <input
              type="text"
              value={startingCity}
              onChange={(e) => setStartingCity(e.target.value)}
              placeholder="e.g., Mumbai, Delhi, Rajkot, Bengaluru"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-colors"
            />
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] text-slate-400 self-center">Major hubs:</span>
              {POPULAR_CITIES.slice(0, 6).map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setStartingCity(city)}
                  className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
                    startingCity.toLowerCase() === city.toLowerCase()
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Duration, Travel Dates, Travelers & Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-slate-100">
          {/* Trip Duration & Dates */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                Duration (Days)
              </span>
              <span className="font-mono text-emerald-700 font-bold">{durationDays} Days</span>
            </label>
            <input
              type="range"
              min={1}
              max={7}
              step={1}
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>1 Day</span>
              <span>3 Days</span>
              <span>5 Days</span>
              <span>7 Days</span>
            </div>

            {/* Optional Specific Date Inputs */}
            <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">Start Date</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">End Date</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Travelers */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              Travelers & Group Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                min={1}
                max={20}
                value={travelersCount}
                onChange={(e) => setTravelersCount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-mono text-center"
              />
              <select
                value={travelerType}
                onChange={(e) => setTravelerType(e.target.value as TravelerType)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
              >
                <option value="solo">Solo</option>
                <option value="couple">Couple</option>
                <option value="friends">Friends</option>
                <option value="family">Family</option>
                <option value="student">Student Group</option>
              </select>
            </div>
            <span className="text-xs text-slate-400 block">
              {travelersCount} {travelersCount === 1 ? 'person' : 'people'} ({travelerType})
            </span>
          </div>

          {/* Target Budget */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                Total Budget (INR)
              </span>
              <span className="font-mono text-emerald-700 font-bold">
                ₹{Number(budgetINR).toLocaleString('en-IN')}
              </span>
            </label>
            <input
              type="number"
              step={1000}
              min={2000}
              max={500000}
              value={budgetINR}
              onChange={(e) => setBudgetINR(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-xl border border-slate-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <div className="flex flex-wrap gap-1 text-xs">
              {[10000, 20000, 35000, 50000, 80000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setBudgetINR(amt)}
                  className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs transition-colors"
                >
                  ₹{(amt / 1000)}k
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Travel Style Selection */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            Travel Style
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TRAVEL_STYLES.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => setTravelStyle(style.id)}
                className={`p-3 text-left rounded-xl border transition-all ${
                  travelStyle === style.id
                    ? 'border-emerald-600 bg-emerald-50/60 shadow-xs ring-1 ring-emerald-500'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`block text-xs font-bold ${travelStyle === style.id ? 'text-emerald-950' : 'text-slate-800'}`}>
                    {style.label}
                  </span>
                  {travelStyle === style.id && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
                <span className="block text-xs text-slate-500 mt-0.5 line-clamp-1">
                  {style.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Section 4: Transportation & Accommodation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
          {/* Transportation */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-emerald-600" />
              Preferred Transportation
            </label>
            <select
              value={transportation}
              onChange={(e) => setTransportation(e.target.value as TransportPreference)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {TRANSPORT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Accommodation */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Hotel className="w-3.5 h-3.5 text-emerald-600" />
              Accommodation Preference
            </label>
            <select
              value={accommodation}
              onChange={(e) => setAccommodation(e.target.value as AccommodationType)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {ACCOMMODATION_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label} ({opt.desc})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Section 5: Additional Requirements */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            Special Preferences / Requirements (Optional)
          </label>
          <textarea
            rows={2}
            value={specialRequirements}
            onChange={(e) => setSpecialRequirements(e.target.value)}
            placeholder="e.g. Vegetarian food only, elderly-friendly access, photography viewpoints, adventure sports, pet-friendly..."
            className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Loading Progress State */}
        {isLoading && (
          <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-emerald-700 border-t-transparent rounded-full animate-spin shrink-0" />
            <div className="flex-1">
              <span className="text-xs font-bold block">Generating Your Custom Travel Plan</span>
              <p className="text-xs text-emerald-800 transition-opacity duration-300">
                {LOADING_TIPS[loadingTipIndex]}
              </p>
            </div>
          </div>
        )}

        {/* Form Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-100 gap-4">
          <button
            type="button"
            onClick={handleFillDemoData}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset with Student Demo Defaults</span>
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Generating Travel Plan...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Travel Plan</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
