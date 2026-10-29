export type TravelStyle = 'adventure' | 'relaxation' | 'culture' | 'nature' | 'food' | 'family';
export type TravelerType = 'solo' | 'couple' | 'family' | 'friends' | 'student';
export type TransportPreference = 'flight' | 'train' | 'bus' | 'drive' | 'flexible';
export type AccommodationType = 'hostel' | 'homestay' | 'midrange' | 'luxury';

export interface TripPreferences {
  destination: string;
  suggestForMe: boolean;
  startingCity: string;
  durationDays: number;
  startDate?: string;
  endDate?: string;
  travelersCount: number;
  travelerType: TravelerType;
  budgetINR: number;
  travelStyle: TravelStyle;
  transportation: TransportPreference;
  accommodation: AccommodationType;
  specialRequirements: string;
}

export interface DayActivity {
  time: string;
  title: string;
  description: string;
  location: string;
  category: 'sightseeing' | 'food' | 'adventure' | 'culture' | 'leisure';
  estimatedCostINR: number;
  insiderTip?: string;
}

export interface DayItinerary {
  dayNumber: number;
  theme: string;
  morning: DayActivity;
  afternoon: DayActivity;
  evening: DayActivity;
  night: DayActivity;
  dayExpenseINR: number;
}

export interface BudgetBreakdown {
  transportationCost: number;
  accommodationCost: number;
  foodAndDiningCost: number;
  activitiesAndEntry: number;
  miscellaneousEmergency: number;
  totalEstimatedCost: number;
  perPersonCost: number;
  status: 'under_budget' | 'on_target' | 'exceeds_budget';
  savingsAdvice: string;
}

export interface PlaceToVisit {
  name: string;
  highlight: string;
  bestTimeToVisit: string;
  entryFeeINR: number;
  timing: string;
}

export interface LocalFoodItem {
  name: string;
  description: string;
  vegNonVeg: 'veg' | 'non-veg' | 'both';
  recommendedSpot: string;
  approxPriceINR: number;
}

export interface ChecklistItem {
  id: string;
  category: 'Documents & Money' | 'Clothing & Wearables' | 'Toiletries & Hygiene' | 'Electronics & Gadgets' | 'Health & First Aid' | 'Trip Specific';
  text: string;
  isChecked: boolean;
  isCustom?: boolean;
}

export interface ItineraryResult {
  id: string;
  createdAt: string;
  destination: string;
  tagline: string;
  reasonForRecommendation: string;
  bestSeason: string;
  weatherForecast: string;
  durationDays: number;
  days: DayItinerary[];
  budgetBreakdown: BudgetBreakdown;
  placesToVisit: PlaceToVisit[];
  localFoods: LocalFoodItem[];
  packingChecklist: ChecklistItem[];
  importantTravelTips: string[];
  dataSource: 'gemini_ai' | 'smart_curated_engine';
}
