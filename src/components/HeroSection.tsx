import React from 'react';
import { ArrowRight, Sparkles, MapPin, Calendar, Wallet, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { TripPreferences } from '../types/travel';

interface HeroSectionProps {
  onStartPlanning: () => void;
  onSelectPreset: (pref: Partial<TripPreferences>) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartPlanning,
  onSelectPreset
}) => {
  const presets: {
    title: string;
    destination: string;
    startingCity: string;
    duration: number;
    budget: number;
    style: any;
    image: string;
    description: string;
  }[] = [
    {
      title: 'Goa Coastal Beach Escape',
      destination: 'Goa',
      startingCity: 'Mumbai',
      duration: 4,
      budget: 18000,
      style: 'relaxation',
      image: '/src/assets/images/travel_beach_coastal_1793091127459.jpg',
      description: 'Golden beaches, Portuguese heritage churches, beachside shacks, and vibrant flea markets.'
    },
    {
      title: 'Manali Alpine Mountain Thrill',
      destination: 'Manali, Himachal Pradesh',
      startingCity: 'Delhi',
      duration: 4,
      budget: 22000,
      style: 'adventure',
      image: '/src/assets/images/travel_hero_landscape_1793091126551.jpg',
      description: 'Solang valley adventure sports, Jogini waterfall hike, Atal Tunnel crossing, and riverside cafes.'
    },
    {
      title: 'Jaipur Royal Heritage Circuit',
      destination: 'Jaipur, Rajasthan',
      startingCity: 'Ahmedabad',
      duration: 3,
      budget: 15000,
      style: 'culture',
      image: '/src/assets/images/travel_culture_heritage_1793091127649.jpg',
      description: 'Amber fort ramparts, Hawa Mahal photography, royal Rajasthani thali, and vibrant local bazaars.'
    }
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-2xl bg-slate-900 text-white shadow-xl">
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/travel_hero_landscape_1793091126551.jpg"
            alt="Scenic Mountain Road"
            className="w-full h-full object-cover opacity-35"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />
        </div>

        <div className="relative max-w-4xl px-6 py-20 sm:px-12 sm:py-28 space-y-6">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <Sparkles className="w-4 h-4" />
            <span>AI-Assisted Tourism & Travel Platform</span>
            <span aria-hidden="true">·</span>
            <span>Academic ESE Prototype</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
            Smart Itineraries & Budget Planning Tailored in Seconds
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Eliminate hours of fragmented research. Get day-wise schedules, accurate Indian Rupee (INR) cost breakdowns, insider food spots, and customized packing checklists in one cohesive plan.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onStartPlanning}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-900/30 transition-all text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <span>Plan My Trip</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onSelectPreset(presets[0])}
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-medium rounded-xl transition-colors text-sm sm:text-base backdrop-blur-sm"
            >
              <span>Explore Demo Preset</span>
            </button>
          </div>

          {/* Value Proof Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Day-Wise Schedule</span>
            </div>
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>INR Cost Estimates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Smart Packing List</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Dual Engine Fallback</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Demo Itinerary Presets */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Quick Demonstration</span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Curated Trip Presets</h2>
            <p className="text-sm text-slate-500 mt-1">
              Select any pre-configured destination to immediately test and evaluate itinerary generation.
            </p>
          </div>
          <button
            onClick={onStartPlanning}
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Custom Preferences</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {presets.map((preset, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={preset.image}
                  alt={preset.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-2 text-xs font-medium text-emerald-300">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>From {preset.startingCity}</span>
                    <span aria-hidden="true">·</span>
                    <span>{preset.duration} Days</span>
                  </div>
                  <h3 className="text-base font-bold leading-snug">{preset.title}</h3>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {preset.description}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Est. Budget</span>
                    <span className="text-sm font-bold text-slate-900 font-mono">
                      ₹{preset.budget.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectPreset(preset)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                  >
                    <span>Load & Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture & College ESE Highlights */}
      <section className="bg-slate-100/70 rounded-2xl p-6 sm:p-8 border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">AI-Powered Planning</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Leverages the Gemini API with structured JSON schema output to tailor schedules based on group size, transit choice, and travel style.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Realistic INR Estimations</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Provides practical itemized estimates for transportation, accommodation, meals, sightseeing entry fees, and contingency buffers.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Fault-Tolerant Engine</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Engineered with a high-fidelity local rule-based fallback that operates seamlessly during viva demonstrations even without an active API key.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
