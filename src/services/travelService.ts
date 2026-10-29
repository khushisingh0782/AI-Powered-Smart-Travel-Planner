import { TripPreferences, ItineraryResult } from '../types/travel';
import { generateSmartCuratedItinerary } from '../utils/curatedTravelEngine';

export async function fetchItineraryPlan(preferences: TripPreferences): Promise<ItineraryResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4500); // 4.5s max wait for server

  try {
    const response = await fetch('/api/generate-itinerary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferences),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[TravelService] Server returned status ${response.status}. Falling back to client-side smart curated engine.`);
      return generateSmartCuratedItinerary(preferences);
    }

    const data: ItineraryResult = await response.json();
    if (!data || !data.days || !Array.isArray(data.days) || data.days.length === 0) {
      console.warn('[TravelService] Incomplete data from server. Falling back to client-side smart curated engine.');
      return generateSmartCuratedItinerary(preferences);
    }

    return data;
  } catch (error: any) {
    clearTimeout(timeoutId);
    console.warn('[TravelService] Request timed out or encountered network error. Instantly using smart curated engine:', error?.message);
    return generateSmartCuratedItinerary(preferences);
  }
}

// LocalStorage helpers for saved itineraries
const SAVED_TRIPS_KEY = 'ai_smart_travel_saved_trips';

export function getSavedTrips(): ItineraryResult[] {
  try {
    const raw = localStorage.getItem(SAVED_TRIPS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse saved trips from localStorage', e);
    return [];
  }
}

export function saveTrip(trip: ItineraryResult): boolean {
  try {
    const existing = getSavedTrips();
    const filtered = existing.filter(t => t.id !== trip.id);
    const updated = [trip, ...filtered].slice(0, 15); // store up to 15 trips
    localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    console.error('Failed to save trip to localStorage', e);
    return false;
  }
}

export function deleteSavedTrip(id: string): ItineraryResult[] {
  try {
    const existing = getSavedTrips();
    const updated = existing.filter(t => t.id !== id);
    localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete trip from localStorage', e);
    return [];
  }
}
