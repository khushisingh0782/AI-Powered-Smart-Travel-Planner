# END SEMESTER EXAMINATION (ESE) PROJECT REPORT & PROMPT-BOOK

**PROJECT TITLE:** AI-POWERED SMART TRAVEL PLANNER  
**DOMAIN:** Tourism and Travel  
**INSTITUTION:** Marwadi University  
**DEPARTMENT:** Department of Computer Science & Engineering  
**ACADEMIC YEAR:** 2026–2027  
**STUDENT NAME:** Khushi Kumari  
**STUDENT EMAIL:** khushi.kumari138139@marwadiuniversity.ac.in  
**STUDENT GR NO:** 138139  
**DIVISION:** A  

---

## 1. Problem Statement
Planning a vacation or educational journey is typically a fragmented and exhausting process. Travelers must navigate disparate booking systems, travel blogs, weather channels, and local guidebooks to curate a schedule, estimate multi-category costs, and assemble travel items. Often, tourists either overspend due to unanticipated expenses or encounter rushed itineraries due to poor time-of-day planning. 

The **AI-Powered Smart Travel Planner** solves this by providing an end-to-end automated platform that synthesizes destination intelligence, day-wise itineraries, realistic Indian Rupee (INR) budget projections, and dynamic packing checklists into one cohesive, accessible web application.

---

## 2. Objectives
1. **User-Friendly Travel Interface:** Develop an intuitive, responsive web application for students, solo travelers, couples, and families.
2. **Context-Aware Recommendations:** Generate personalized destination recommendations based on starting city, group size, and travel style.
3. **Structured Day-Wise Schedules:** Divide every day into Morning, Afternoon, Evening, and Night segments with timing, estimated costs, and insider tips.
4. **Transparent INR Budgeting:** Provide an itemized cost projection covering transit, lodging, food, sightseeing, and a 10% contingency buffer.
5. **Interactive Packing Checklist:** Offer a categorized preparation checklist with real-time completion tracking and custom item support.
6. **Dual-Engine Architecture:** Integrate Gemini 3.8 Flash via secure server-side proxy with an offline rule-based fallback engine for resilient college examination demonstrations.

---

## 3. Target Users
- **College Students & Youth Groups:** Budget-conscious travelers seeking affordable hostels, sleeper trains, and thrilling experiences.
- **Solo Travelers & Backpackers:** Explorers requiring precise schedules, safety notes, and public transit suggestions.
- **Families & Couples:** Vacationers needing comfortable lodging, child/elder-friendly spots, and relaxed dining.

---

## 4. System Architecture & Technologies Used

```
[ Client: React 19 + Tailwind CSS ]
           │
           ▼ (POST /api/generate-itinerary)
[ Full-Stack Server: Vite Dev Middleware / Express ]
           │
           ├──► [ GEMINI_API_KEY Present? ] ──► [ @google/genai SDK (gemini-3.8-flash) ]
           │                                          │
           │                                          ▼ (Structured JSON Schema)
           │
           └──► [ Missing/Offline Fallback ] ──► [ Smart Curated Travel Engine ]
                                                      │
                                                      ▼
                                       [ Normalized Itinerary Result ]
```

### Technologies:
- **Frontend Framework:** React 19, TypeScript
- **Styling:** Tailwind CSS v4, Lucide React Icons
- **AI Model & SDK:** `@google/genai` (Model: `gemini-3.8-flash`)
- **Backend / Middleware:** Express, Node.js, Vite Dev Server Connect Middleware
- **Data Persistence:** Browser LocalStorage (for saved trips & checklist state)
- **Document Export:** Native Print Stylesheet configured for PDF export (`Division_GR No_Name.pdf`)

---

## 5. Functional & Non-Functional Requirements

### Functional Requirements:
- **FR01: Preference Intake:** Form collecting starting city, destination (or "Suggest for me"), duration (1–7 days), travelers, budget in INR, style, transport, and lodging.
- **FR02: Itinerary Generation:** Generation of morning, afternoon, evening, and night time slots.
- **FR03: Financial Analysis:** Accurate summation of transport, accommodation, food, activities, and buffer.
- **FR04: Packing Assistant:** Interactive checkboxes, percentage completion bar, and custom item addition.
- **FR05: Persistence & Export:** Save to local storage, download JSON, and print/export to PDF.

### Non-Functional Requirements:
- **NFR01: Zero Key Leakage:** API keys remain strictly server-side; never exposed to browser client.
- **NFR02: Fault Tolerance:** 100% operational uptime via smart rule engine if AI key is absent.
- **NFR03: Latency:** Sub-300ms fallback generation and sub-3s AI generation.
- **NFR04: Accessibility & Responsiveness:** Clean contrast ratios, mobile and desktop responsive views.

---

## 6. Prompt-Engineering Book & Iterative Evolution

### Core Persona & System Instruction Prompt:
```
"You are an expert senior Indian & Global travel architect. Output only structured JSON matching the requested schema. Provide realistic cost estimates in Indian Rupees (INR) based on authentic local rates for transport, accommodation, food, and activities. Do not wrap in markdown quotes."
```

### Prompt Evolution Table:

| Iteration | Prompt Version | Identified Limitation | Refinement Made |
| :--- | :--- | :--- | :--- |
| **V1 (Naive)** | *"Plan a 4 day trip to Goa for 2 people with budget."* | Unstructured plain text; mixed currencies; no time-of-day divisions. | Enforced JSON schema with typed fields. |
| **V2 (Structured)** | *"Return JSON for Goa trip with morning, afternoon, evening and budget."* | Hallucinated unrealistically low flight prices and lacked starting city transit context. | Added starting city and explicit transit preference parameters (train vs flight). |
| **V3 (Production)** | *Full multi-parameter structured prompt with JSON schema validation.* | Missing edge-case handling when API quota exceeds or key is unconfigured. | Implemented dual-engine server routing with automatic curated fallback. |

---

## 7. Test Cases & Verification Matrix

| TC ID | Test Scenario | Input Data | Expected Result | Actual Result | Status |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **TC01** | Landing Page Render | User visits application URL | Top navbar, hero imagery, quick presets render cleanly | Displayed as expected without layout shifts | **PASS** |
| **TC02** | Validation on Empty Fields | Destination empty without "Suggest for me" | Form submission blocked with alert banner | Inline error banner displayed | **PASS** |
| **TC03** | Auto-Fill Demo Button | Click "Fill Demo Data" | Fields populated with Goa 4-Day sample data | All inputs populated instantly | **PASS** |
| **TC04** | Schedule Generation | Submit valid Goa trip form | 4-day itinerary generated with 4 time slots each | Complete day cards rendered | **PASS** |
| **TC05** | INR Cost Calculation | ₹20,000 budget for 2 travelers | Itemized cost calculation + savings advisory | Costs summed accurately with buffer | **PASS** |
| **TC06** | Interactive Checklist | Check item + add custom item | Progress bar recalculates; custom item appears | Percentage updated; custom item saved | **PASS** |
| **TC07** | Trip Persistence | Click "Save Itinerary" | Trip added to Saved Trips drawer | Successfully saved & retrieved from storage | **PASS** |
| **TC08** | PDF Report Export | Click "Export PDF" | Print view formatted as `Division_GR No_Name.pdf` | Document title formatted; clean print view | **PASS** |

---

## 8. How to Run, Test, and Demonstrate the Application

1. **Development Server:**
   The development server runs automatically on port 3000:
   ```bash
   npm run dev
   ```
2. **Accessing the App:**
   - Development URL: `https://ais-dev-pryff7yzwbi5if7vs6vjxl-220031511786.asia-east1.run.app`
   - Shared URL: `https://ais-pre-pryff7yzwbi5if7vs6vjxl-220031511786.asia-east1.run.app`
3. **Demonstrating the Features During Examination:**
   - **Step 1:** Open the Home Page to display the title, purpose, and responsive travel imagery.
   - **Step 2:** Click one of the "Curated Trip Presets" (e.g., *Goa Coastal Beach Escape* or *Manali Mountain Adventure*) to autofill preferences.
   - **Step 3:** Click **Generate Travel Plan**. Demonstrate the generated day-wise activities, morning/afternoon/evening slots, and insider tips.
   - **Step 4:** Switch to the **Budget Breakdown** tab to show the INR calculation, transit costs, stay costs, and money-saving advice.
   - **Step 5:** Navigate to the **Packing Checklist** tab to demonstrate live checkbox tracking and adding custom items.
   - **Step 6:** Click **Save Itinerary** and open **Saved Trips** to prove persistence.
   - **Step 7:** Click **ESE Report** in the navigation bar, configure Division/GR No/Name, and click **Export PDF** to produce the examination report named `Division_GR No_Name.pdf`.

---

## 9. Conclusion
The **AI-Powered Smart Travel Planner** demonstrates the practical fusion of modern AI capabilities and robust full-stack software engineering. It provides an efficient, accessible solution to modern trip planning while meeting all academic criteria for the End Semester Examination.
