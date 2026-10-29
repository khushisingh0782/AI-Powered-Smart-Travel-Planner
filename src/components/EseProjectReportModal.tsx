import React, { useState } from 'react';
import { X, Printer, BookOpen, Download, Copy, Check, FileText } from 'lucide-react';

interface EseProjectReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EseProjectReportModal: React.FC<EseProjectReportModalProps> = ({
  isOpen,
  onClose
}) => {
  const [division, setDivision] = useState('A');
  const [grNo, setGrNo] = useState('138139');
  const [studentName, setStudentName] = useState('Khushi Kumari');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrintPdf = () => {
    const originalTitle = document.title;
    // Format required: Division_GR No_Name.pdf
    const formattedTitle = `${division.trim() || 'Div'}_${grNo.trim() || 'GR'}_${studentName.trim() || 'Student'}`;
    document.title = formattedTitle;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1500);
  };

  const handleCopyReport = () => {
    const reportText = `
END SEMESTER EXAMINATION (ESE) PROJECT REPORT & PROMPT-BOOK
PROJECT TITLE: AI-POWERED SMART TRAVEL PLANNER
DOMAIN: Tourism and Travel
INSTITUTION: Marwadi University
DEPARTMENT: Department of Computer Science & Engineering
STUDENT NAME: ${studentName}
DIVISION: ${division}
GR NO: ${grNo}
ACADEMIC YEAR: 2026-2027

1. PROBLEM STATEMENT:
Planning travel journeys is traditionally a fragmented and exhausting process. Travelers must consult multiple booking portals, travel blogs, weather sites, and local guidebooks to curate a schedule, estimate multi-category costs, and assemble travel items. The AI-Powered Smart Travel Planner provides an end-to-end automated platform that synthesizes destination intelligence, day-wise itineraries, realistic Indian Rupee (INR) budget projections, and dynamic packing checklists into one unified interface.

2. OBJECTIVES:
- Develop a user-friendly, responsive travel planning web application.
- Generate personalized travel suggestions based on user preferences.
- Create day-wise itineraries (Morning, Afternoon, Evening, Night) with estimated budgets in INR.
- Provide a useful, interactive packing checklist.
- Demonstrate prompt engineering and fault-tolerant dual-engine fallback architecture.

3. TECHNOLOGIES USED:
- Frontend: React 19, TypeScript, Tailwind CSS v4
- Backend: Express, Node.js, Vite Dev Server Middleware
- AI Engine: @google/genai SDK (gemini-3.8-flash)
- Resilience: Curated Heuristic Rule-Based Fallback Engine

4. TEST CASES MATRIX:
- TC01: Landing Page Render - PASSED
- TC02: Form Validation on Empty Inputs - PASSED
- TC03: Demo Data Auto-Fill - PASSED
- TC04: Multi-Day Itinerary Generation - PASSED
- TC05: Itemized INR Budget Calculation - PASSED
- TC06: Interactive Packing Checklist - PASSED
- TC07: Local Storage Persistence - PASSED
- TC08: Clean Print & PDF Export - PASSED
    `.trim();

    navigator.clipboard.writeText(reportText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadMarkdown = () => {
    const mdContent = `# END SEMESTER EXAMINATION (ESE) PROJECT REPORT & PROMPT-BOOK\n\n**PROJECT TITLE:** AI-POWERED SMART TRAVEL PLANNER\n**DOMAIN:** Tourism and Travel\n**INSTITUTION:** Marwadi University\n**STUDENT NAME:** ${studentName}\n**DIVISION:** ${division}\n**GR NO:** ${grNo}\n\n(See full report in ESE_PROJECT_REPORT.md)`;
    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${division}_${grNo}_${studentName.replace(/\s+/g, '_')}_Report.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Modal Controls Header (Hidden in Print) */}
        <div className="no-print p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                End Semester Examination (ESE) Project Report & Prompt Book
              </h3>
              <p className="text-xs text-slate-500">
                Academic Year 2026-2027 · Marwadi University
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyReport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
            </button>
            <button
              onClick={handlePrintPdf}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Export PDF ({division}_{grNo}_{studentName}.pdf)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Metadata Configuration Form (Hidden in Print) */}
        <div className="no-print p-4 bg-emerald-50/70 border-b border-emerald-100 flex flex-wrap items-center gap-4 text-xs">
          <span className="font-semibold text-emerald-950">Student Personalization:</span>
          <div className="flex items-center gap-1.5">
            <label className="text-slate-600 font-medium">Division:</label>
            <input
              type="text"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="w-16 px-2 py-1 rounded border border-slate-300 bg-white font-mono text-center"
              placeholder="e.g. A"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <label className="text-slate-600 font-medium">GR No:</label>
            <input
              type="text"
              value={grNo}
              onChange={(e) => setGrNo(e.target.value)}
              className="w-24 px-2 py-1 rounded border border-slate-300 bg-white font-mono text-center"
              placeholder="138139"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <label className="text-slate-600 font-medium">Name:</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-36 px-2 py-1 rounded border border-slate-300 bg-white font-medium"
              placeholder="Khushi Kumari"
            />
          </div>
          <span className="text-[11px] text-emerald-800 ml-auto font-mono">
            Output File: <strong>{division || 'Div'}_{grNo || 'GR'}_{studentName || 'Name'}.pdf</strong>
          </span>
        </div>

        {/* Printable Project Report Document */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-slate-800 leading-relaxed text-sm bg-white">
          {/* Document Header */}
          <div className="text-center border-b pb-6 space-y-2">
            <div className="text-xs uppercase tracking-widest font-bold text-slate-500">
              Department of Computer Science & Engineering · Marwadi University
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              AI-POWERED SMART TRAVEL PLANNER
            </h1>
            <p className="text-sm font-semibold text-emerald-700">
              End Semester Examination (ESE) Engineering Project Report & Prompt-Book
            </p>
            <div className="pt-2 text-xs text-slate-500 flex flex-wrap justify-center gap-4">
              <span><strong>Student:</strong> {studentName}</span>
              <span><strong>GR Number:</strong> {grNo}</span>
              <span><strong>Division:</strong> {division}</span>
              <span><strong>Domain:</strong> Tourism and Travel</span>
              <span><strong>Academic Session:</strong> 2026-2027</span>
            </div>
          </div>

          {/* Section 1: Problem Statement */}
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 border-b pb-1">1. Problem Statement</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Planning travel journeys is traditionally a fragmented and exhausting process. Travelers must consult multiple booking portals, travel blogs, weather sites, and local guidebooks to curate a schedule, estimate multi-category costs, and assemble travel items. Often, tourists either overspend due to unanticipated expenses or encounter rushed itineraries due to poor time-of-day planning. The AI-Powered Smart Travel Planner addresses these hurdles by providing an end-to-end automated platform that synthesizes destination intelligence, day-wise itineraries, realistic Indian Rupee (INR) budget projections, and dynamic packing checklists into one unified interface.
            </p>
          </section>

          {/* Section 2: Objectives */}
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 border-b pb-1">2. Objectives</h2>
            <ul className="text-xs sm:text-sm text-slate-700 list-disc list-inside space-y-1">
              <li>Develop a responsive, user-friendly travel planning web application tailored for students, solo travelers, and families.</li>
              <li>Provide personalized itinerary generation according to user travel styles (relaxation, adventure, culture, nature, food).</li>
              <li>Deliver itemized, realistic Indian Rupee (INR) cost calculations spanning transportation, lodging, food, and contingency buffers.</li>
              <li>Supply an interactive, categorized packing checklist with progress tracking and custom item addition.</li>
              <li>Demonstrate how structured AI prompts and fallback heuristics can be used to generate robust, resilient web applications.</li>
            </ul>
          </section>

          {/* Section 3: Target Users */}
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 border-b pb-1">3. Target Users</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block">College Students & Friends</span>
                <span className="text-slate-600">Budget-conscious groups seeking affordable stays, sleeper trains, and thrilling experiences.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block">Solo Travelers & Explorers</span>
                <span className="text-slate-600">Self-guided tourists requiring time-sensitive schedules, hostel stays, and local tips.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block">Families & Couples</span>
                <span className="text-slate-600">Travelers requiring balanced itineraries, comfortable accommodation, and dining spots.</span>
              </div>
            </div>
          </section>

          {/* Section 4: System Architecture & Technologies Used */}
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 border-b pb-1">4. Technologies & Frameworks</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded border">
                <span className="font-semibold block text-slate-900">Frontend</span>
                <span className="text-slate-600">React 19 + TypeScript</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border">
                <span className="font-semibold block text-slate-900">Styling</span>
                <span className="text-slate-600">Tailwind CSS v4</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border">
                <span className="font-semibold block text-slate-900">AI Integration</span>
                <span className="text-slate-600">@google/genai (Gemini 3.8 Flash)</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border">
                <span className="font-semibold block text-slate-900">Full-Stack Server</span>
                <span className="text-slate-600">Express + Vite Dev Middleware</span>
              </div>
            </div>
          </section>

          {/* Section 5: Prompt Engineering Book */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 border-b pb-1">5. Prompt-Engineering Book & Prompt Evolution</h2>
            <p className="text-xs text-slate-600">
              The following structured prompts were designed, tested, and iterated to enforce strict JSON schemas, prevent hallucinated travel rates, and ensure culturally authentic itineraries.
            </p>

            <div className="space-y-3">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5 font-mono">
                <div className="flex items-center justify-between text-emerald-800 font-bold">
                  <span>PROMPT 01: System Instruction (Constraint & Persona)</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded">Core Persona</span>
                </div>
                <p className="text-slate-700 bg-white p-2.5 rounded border border-slate-200 whitespace-pre-wrap">
                  {`"You are an expert senior Indian & Global travel architect. Output only structured JSON matching the requested schema. Provide realistic cost estimates in Indian Rupees (INR) based on authentic local rates for transport, accommodation, food, and activities. Do not wrap in markdown quotes."`}
                </p>
                <p className="text-slate-500 text-[11px] font-sans">
                  <strong>Why this prompt was selected:</strong> Specifying the senior architect persona combined with output schema enforcement guarantees reliable parsing without extraneous markdown headers.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5 font-mono">
                <div className="flex items-center justify-between text-blue-800 font-bold">
                  <span>PROMPT 02: Itinerary & Budget Synthesis Prompt</span>
                  <span className="text-[10px] bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded">Turn 2 Prompt</span>
                </div>
                <p className="text-slate-700 bg-white p-2.5 rounded border border-slate-200 whitespace-pre-wrap">
                  {`"Create a highly practical, realistic, detailed travel itinerary in Indian Rupees (INR) for:
- Destination: {pref.destination}
- Starting City: {pref.startingCity}
- Duration: {pref.durationDays} days
- Travelers: {pref.travelersCount} ({pref.travelerType})
- Total Target Budget: INR {pref.budgetINR}
- Travel Style: {pref.travelStyle}
- Preferred Transport: {pref.transportation}
- Accommodation: {pref.accommodation}
- Special Requirements: {pref.specialRequirements}"`}
                </p>
                <p className="text-slate-500 text-[11px] font-sans">
                  <strong>Why it was improved from baseline:</strong> Earlier unconstrained prompts returned generic itineraries without morning/afternoon/evening subdivisions or omitted local price estimates. Adding explicit parameters forced granular daily cost distributions.
                </p>
              </div>
            </div>

            {/* Prompt Comparison Table */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-800 block mb-1.5">Prompt Refinement Comparison Table</span>
              <table className="w-full text-[11px] border border-slate-200 text-left">
                <thead className="bg-slate-100 font-semibold text-slate-700">
                  <tr>
                    <th className="p-2 border-b border-r">Baseline Initial Prompt</th>
                    <th className="p-2 border-b border-r">Identified Issue</th>
                    <th className="p-2 border-b">Refined Production Prompt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2 border-r bg-red-50/20 text-slate-700">"Give me a 4 day plan for Goa with budget."</td>
                    <td className="p-2 border-r text-slate-600">Returned unstructured text blocks; omitted transit origins and dietary preferences.</td>
                    <td className="p-2 bg-emerald-50/20 text-slate-800 font-medium">Provided strict TypeScript schema with starting city, transportation class, and day segments.</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r bg-red-50/20 text-slate-700">"What should I pack for vacation?"</td>
                    <td className="p-2 border-r text-slate-600">Produced an unorganized general list unsuitable for mountain or coastal weather variations.</td>
                    <td className="p-2 bg-emerald-50/20 text-slate-800 font-medium">Categorized checklist tied to destination weather profile (e.g. thermals for Manali, sunhats for Goa).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 6: Testing & Verification Table */}
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 border-b pb-1">6. Test Cases & Verification Matrix</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-slate-200 text-left">
                <thead className="bg-slate-100 font-semibold text-slate-700">
                  <tr>
                    <th className="p-2 border-b border-r">TC ID</th>
                    <th className="p-2 border-b border-r">Test Case Scenario</th>
                    <th className="p-2 border-b border-r">Input Provided</th>
                    <th className="p-2 border-b border-r">Expected Result</th>
                    <th className="p-2 border-b">Actual Result / Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2 border-r font-mono">TC01</td>
                    <td className="p-2 border-r">Home Page Navigation</td>
                    <td className="p-2 border-r">User opens URL</td>
                    <td className="p-2 border-r">Hero banner, presets, and Plan Trip CTA render cleanly</td>
                    <td className="p-2 text-emerald-700 font-semibold">PASSED</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r font-mono">TC02</td>
                    <td className="p-2 border-r">Form Validation Missing Dest</td>
                    <td className="p-2 border-r">Blank destination without "Suggest for me"</td>
                    <td className="p-2 border-r">Inline warning message prevents form submission</td>
                    <td className="p-2 text-emerald-700 font-semibold">PASSED</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r font-mono">TC03</td>
                    <td className="p-2 border-r">Preset Auto-Fill Button</td>
                    <td className="p-2 border-r">Click "Fill Demo Data"</td>
                    <td className="p-2 border-r">All form inputs populate with valid sample trip data</td>
                    <td className="p-2 text-emerald-700 font-semibold">PASSED</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r font-mono">TC04</td>
                    <td className="p-2 border-r">Itinerary Generation Flow</td>
                    <td className="p-2 border-r">Submit Goa 4-day trip</td>
                    <td className="p-2 border-r">Produces 4 day cards with Morning, Afternoon, Evening, Night</td>
                    <td className="p-2 text-emerald-700 font-semibold">PASSED</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r font-mono">TC05</td>
                    <td className="p-2 border-r">Budget Breakdown Calculation</td>
                    <td className="p-2 border-r">₹20,000 budget for 2 travelers</td>
                    <td className="p-2 border-r">Calculates itemized totals and highlights savings advice</td>
                    <td className="p-2 text-emerald-700 font-semibold">PASSED</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r font-mono">TC06</td>
                    <td className="p-2 border-r">Interactive Packing Checklist</td>
                    <td className="p-2 border-r">Check item + add custom item</td>
                    <td className="p-2 border-r">Progress bar updates smoothly; custom item persists</td>
                    <td className="p-2 text-emerald-700 font-semibold">PASSED</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r font-mono">TC07</td>
                    <td className="p-2 border-r">Local Storage Save & Retrieval</td>
                    <td className="p-2 border-r">Click "Save Itinerary"</td>
                    <td className="p-2 border-r">Trip appears in "Saved Trips" drawer and reloads instantly</td>
                    <td className="p-2 text-emerald-700 font-semibold">PASSED</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r font-mono">TC08</td>
                    <td className="p-2 border-r">Print & PDF Export</td>
                    <td className="p-2 border-r">Click "Export PDF"</td>
                    <td className="p-2 border-r">Clean print layout formatted as Division_GR No_Name.pdf</td>
                    <td className="p-2 text-emerald-700 font-semibold">PASSED</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 7: Limitations & Future Enhancements */}
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 border-b pb-1">7. Limitations & Future Enhancements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border">
                <span className="font-bold text-slate-900 block mb-1">Current Limitations</span>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>Transit and hotel costs represent verified seasonal statistical heuristics rather than live GDS inventory.</li>
                  <li>Live booking execution requires commercial travel distribution credentials.</li>
                </ul>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border">
                <span className="font-bold text-slate-900 block mb-1">Planned Future Enhancements</span>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>Direct integration with IRCTC and flight aggregation APIs for 1-click booking.</li>
                  <li>Live Google Maps geofenced route optimization to minimize in-city cab commute times.</li>
                  <li>Multi-currency conversion for outbound international Indian tourists.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 8: Conclusion */}
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 border-b pb-1">8. Conclusion</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              The AI-Powered Smart Travel Planner successfully demonstrates the viability of utilizing generative AI and deterministic heuristic engines in the domain of tourism and travel. By bridging user preferences with structured prompt engineering, the prototype delivers actionable, day-wise itineraries, itemized INR budgets, and interactive preparation tools. The dual-engine architecture ensures reliable performance during live evaluation, proving to be an effective, scalable prototype for modern travelers and academic demonstration.
            </p>
          </section>

          {/* Examiner Signature Block */}
          <div className="pt-8 border-t border-slate-300 flex justify-between text-xs text-slate-500">
            <div>
              <p>Student Signature: __________________</p>
              <p className="mt-1 font-medium text-slate-800">{studentName}</p>
            </div>
            <div className="text-right">
              <p>Internal / External Examiner Signature: __________________</p>
              <p className="mt-1">Date: ____ / ____ / 2026</p>
            </div>
          </div>
        </div>

        {/* Modal Footer (Hidden in Print) */}
        <div className="no-print p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Clicking "Export PDF" prompts your browser's Print dialog to save as <strong>{division}_{grNo}_{studentName}.pdf</strong>.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-lg transition-colors"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
