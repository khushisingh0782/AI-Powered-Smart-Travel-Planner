import { GoogleGenAI, Type } from "@google/genai";
import { TripPreferences, ItineraryResult } from "../src/types/travel";
import { generateSmartCuratedItinerary } from "../src/utils/curatedTravelEngine";

export async function handleGenerateItinerary(pref: TripPreferences): Promise<ItineraryResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "" || apiKey.includes("MY_GEMINI_API_KEY")) {
    console.log("[TravelPlanner API] No active GEMINI_API_KEY configured. Using smart curated engine.");
    return generateSmartCuratedItinerary(pref);
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      }
    });

    const promptText = `
You are an expert senior Indian & Global travel architect.
Create a highly practical, realistic, detailed travel itinerary in Indian Rupees (INR) for the following trip preferences:
- Destination: ${pref.destination || 'Suggest the best match based on starting city and travel style'}
- Starting City: ${pref.startingCity || 'Not specified'}
- Duration: ${pref.durationDays} days
- Travelers: ${pref.travelersCount} (${pref.travelerType})
- Total Target Budget: INR ${pref.budgetINR ? `₹${pref.budgetINR.toLocaleString('en-IN')}` : 'Flexible'}
- Travel Style: ${pref.travelStyle}
- Preferred Transport: ${pref.transportation}
- Accommodation: ${pref.accommodation}
- Special Notes / Requirements: ${pref.specialRequirements || 'None'}

Provide an accurate, culturally rich day-wise itinerary for all ${pref.durationDays} days. Ensure realistic INR pricing for transportation, accommodation, food, and activities.
`;

    // 4.5 second hard timeout to prevent SDK retry hangs on 503 high demand
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Gemini generation timed out after 4500ms")), 4500)
    );

    const generatePromise = ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: promptText,
      config: {
        systemInstruction: "You are a professional travel planner and budget estimator. Output only structured JSON matching the requested schema. Provide realistic cost estimates in Indian Rupees (INR) based on authentic local rates.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            destination: { type: Type.STRING },
            tagline: { type: Type.STRING },
            reasonForRecommendation: { type: Type.STRING },
            bestSeason: { type: Type.STRING },
            weatherForecast: { type: Type.STRING },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  dayNumber: { type: Type.INTEGER },
                  theme: { type: Type.STRING },
                  morning: {
                    type: Type.OBJECT,
                    properties: {
                      time: { type: Type.STRING },
                      title: { type: Type.STRING },
                      description: { type: Type.STRING },
                      location: { type: Type.STRING },
                      category: { type: Type.STRING },
                      estimatedCostINR: { type: Type.NUMBER },
                      insiderTip: { type: Type.STRING }
                    },
                    required: ["time", "title", "description", "location", "estimatedCostINR"]
                  },
                  afternoon: {
                    type: Type.OBJECT,
                    properties: {
                      time: { type: Type.STRING },
                      title: { type: Type.STRING },
                      description: { type: Type.STRING },
                      location: { type: Type.STRING },
                      category: { type: Type.STRING },
                      estimatedCostINR: { type: Type.NUMBER },
                      insiderTip: { type: Type.STRING }
                    },
                    required: ["time", "title", "description", "location", "estimatedCostINR"]
                  },
                  evening: {
                    type: Type.OBJECT,
                    properties: {
                      time: { type: Type.STRING },
                      title: { type: Type.STRING },
                      description: { type: Type.STRING },
                      location: { type: Type.STRING },
                      category: { type: Type.STRING },
                      estimatedCostINR: { type: Type.NUMBER },
                      insiderTip: { type: Type.STRING }
                    },
                    required: ["time", "title", "description", "location", "estimatedCostINR"]
                  },
                  night: {
                    type: Type.OBJECT,
                    properties: {
                      time: { type: Type.STRING },
                      title: { type: Type.STRING },
                      description: { type: Type.STRING },
                      location: { type: Type.STRING },
                      category: { type: Type.STRING },
                      estimatedCostINR: { type: Type.NUMBER },
                      insiderTip: { type: Type.STRING }
                    },
                    required: ["time", "title", "description", "location", "estimatedCostINR"]
                  },
                  dayExpenseINR: { type: Type.NUMBER }
                },
                required: ["dayNumber", "theme", "morning", "afternoon", "evening", "night", "dayExpenseINR"]
              }
            },
            budgetBreakdown: {
              type: Type.OBJECT,
              properties: {
                transportationCost: { type: Type.NUMBER },
                accommodationCost: { type: Type.NUMBER },
                foodAndDiningCost: { type: Type.NUMBER },
                activitiesAndEntry: { type: Type.NUMBER },
                miscellaneousEmergency: { type: Type.NUMBER },
                totalEstimatedCost: { type: Type.NUMBER },
                perPersonCost: { type: Type.NUMBER },
                status: { type: Type.STRING },
                savingsAdvice: { type: Type.STRING }
              },
              required: ["transportationCost", "accommodationCost", "foodAndDiningCost", "activitiesAndEntry", "miscellaneousEmergency", "totalEstimatedCost", "perPersonCost", "status", "savingsAdvice"]
            },
            placesToVisit: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  highlight: { type: Type.STRING },
                  bestTimeToVisit: { type: Type.STRING },
                  entryFeeINR: { type: Type.NUMBER },
                  timing: { type: Type.STRING }
                },
                required: ["name", "highlight", "bestTimeToVisit", "entryFeeINR", "timing"]
              }
            },
            localFoods: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  vegNonVeg: { type: Type.STRING },
                  recommendedSpot: { type: Type.STRING },
                  approxPriceINR: { type: Type.NUMBER }
                },
                required: ["name", "description", "vegNonVeg", "recommendedSpot", "approxPriceINR"]
              }
            },
            packingChecklist: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  text: { type: Type.STRING }
                },
                required: ["category", "text"]
              }
            },
            importantTravelTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["destination", "tagline", "reasonForRecommendation", "bestSeason", "weatherForecast", "days", "budgetBreakdown", "placesToVisit", "localFoods", "packingChecklist", "importantTravelTips"]
        }
      }
    });

    const response = await Promise.race([generatePromise, timeoutPromise]);
    const parsed = JSON.parse(response.text || "{}");

    if (!parsed.days || !Array.isArray(parsed.days) || parsed.days.length === 0) {
      throw new Error("Invalid or incomplete itinerary returned by model");
    }

    // Map packingChecklist to include IDs and isChecked flags
    const processedChecklist = (parsed.packingChecklist || []).map((item: any, idx: number) => ({
      id: `ai-chk-${idx}`,
      category: item.category || 'Trip Specific',
      text: item.text,
      isChecked: idx % 3 === 0
    }));

    return {
      id: 'trip_' + Date.now().toString(36),
      createdAt: new Date().toISOString(),
      destination: parsed.destination || pref.destination || 'Selected Destination',
      tagline: parsed.tagline || 'Your customized adventure awaits',
      reasonForRecommendation: parsed.reasonForRecommendation || 'Tailored to your travel style and preferences.',
      bestSeason: parsed.bestSeason || 'Current season',
      weatherForecast: parsed.weatherForecast || 'Pleasant weather expected',
      durationDays: pref.durationDays,
      days: parsed.days,
      budgetBreakdown: parsed.budgetBreakdown,
      placesToVisit: parsed.placesToVisit || [],
      localFoods: parsed.localFoods || [],
      packingChecklist: processedChecklist.length > 0 ? processedChecklist : generateSmartCuratedItinerary(pref).packingChecklist,
      importantTravelTips: parsed.importantTravelTips || [],
      dataSource: 'gemini_ai'
    };
  } catch (error) {
    console.warn("[TravelPlanner API] Gemini call unavailable/failed. Engaging smart curated engine fallback:", error);
    return generateSmartCuratedItinerary(pref);
  }
}
