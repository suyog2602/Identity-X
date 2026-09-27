import { useState } from 'react'
import {
  Download,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  
  Shield,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Activity,
  Cpu,
  Lock,
  ExternalLink,
  Presentation,
  Copy,
} from 'lucide-react'
import { useToast } from '../components/ui/Toast'

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(1)
  const { addToast } = useToast()

  const totalSlides = 6

  const nextSlide = () => setCurrentSlide(prev => (prev < totalSlides ? prev + 1 : prev))
  const prevSlide = () => setCurrentSlide(prev => (prev > 1 ? prev - 1 : prev))

  const handleDownloadPptx = () => {
    const link = document.createElement('a')
    link.href = '/IDENTITY-X_SIH2026_HexaCore.pptx'
    link.download = 'IDENTITY-X_SIH2026_HexaCore.pptx'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    addToast({
      title: 'PowerPoint File Downloaded',
      message: 'IDENTITY-X_SIH2026_HexaCore.pptx ready for presentation & editing.',
      type: 'success',
    })
  }

  return (
    <div className="space-y-6 fade-in max-w-7xl mx-auto pb-12">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-mono font-bold">
              SIH 2026 OFFICIAL DECK
            </span>
            <span className="text-xs text-slate-400 font-mono">Team: HexaCore (ID: 167304)</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">Smart India Hackathon 2026 — Pitch Presentation</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Slide Deck for IDENTITY-X: AI-Powered Multi-Layer Identity & Document Forensics Platform
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadPptx}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>DOWNLOAD .PPTX FILE</span>
          </button>
        </div>
      </div>

      {/* Slide Navigation Controls Bar */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Jump to Slide:</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5, 6].map(num => (
              <button
                key={num}
                onClick={() => setCurrentSlide(num)}
                className={`h-7 w-7 rounded-md font-mono text-xs font-bold transition-all cursor-pointer ${
                  currentSlide === num
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-400 font-mono text-[11px]">
            Slide <strong>{currentSlide}</strong> of {totalSlides}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 1}
              className="p-1.5 rounded bg-slate-950 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides}
              className="p-1.5 rounded bg-slate-950 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE CANVAS (16:9 ASPECT RATIO CONTAINER)
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white text-slate-900 rounded-xl border border-slate-300 shadow-2xl overflow-hidden aspect-[16/9] w-full flex flex-col justify-between relative select-none">
        
        {/* SLIDE 1: TITLE SLIDE (UNTOUCHED AS REQUESTED) */}
        {currentSlide === 1 && (
          <div className="p-12 h-full flex flex-col justify-between fade-in bg-white">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-extrabold text-[#0D3B66] tracking-wide">
                  SMART INDIA HACKATHON 2026
                </h1>
              </div>
              <div className="text-right font-bold text-xs text-[#0D3B66] leading-tight">
                <div>SMART INDIA</div>
                <div>HACKATHON</div>
                <div>2026</div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6 my-auto items-center">
              <div className="col-span-8 space-y-4 text-sm text-slate-800">
                <div className="flex items-baseline gap-2">
                  <span className="h-2 w-2 rounded-full border border-slate-600 shrink-0" />
                  <span className="font-semibold text-base">Problem Statement ID - 26132</span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="h-2 w-2 rounded-full border border-slate-600 shrink-0" />
                  <div>
                    <span className="font-semibold text-base">Problem Statement Title - </span>
                    <span className="text-slate-700">Strengthening market linkages and price discovery for farmers</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="h-2 w-2 rounded-full border border-slate-600 shrink-0" />
                  <span className="font-semibold text-base">Theme - Agriculture, FoodTech & Rural Development</span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="h-2 w-2 rounded-full border border-slate-600 shrink-0" />
                  <span className="font-semibold text-base">PS Category - Software</span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="h-2 w-2 rounded-full border border-slate-600 shrink-0" />
                  <span className="font-semibold text-base">Team ID - 167304</span>
                </div>

                <div className="flex items-baseline gap-2 pt-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-600 shrink-0" />
                  <span className="font-extrabold text-xl text-[#0D3B66]">Team Name - HexaCore</span>
                </div>
              </div>

              {/* Graphic Bulb / Brain Box */}
              <div className="col-span-4 flex justify-center">
                <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center font-mono font-bold text-emerald-600 shadow-sm">
                  <div className="text-2xl tracking-widest text-[#0D3B66] mb-1">SIH 2026</div>
                  <div className="text-xs text-slate-500 mb-4 font-sans">SMART INDIA HACKATHON</div>
                  <div className="text-sm text-emerald-600 leading-relaxed font-mono">
                    10101<br/>01010<br/>10101<br/>01010<br/>10101<br/>010
                  </div>
                  <div className="mt-4 inline-block px-3 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-bold font-sans">
                    INNOVATION BRAIN
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 text-center">
              Smart India Hackathon 2026 • Official Idea Presentation
            </div>
          </div>
        )}

        {/* SLIDE 2: IDEA TITLE - IDENTITY-X */}
        {currentSlide === 2 && (
          <div className="h-full flex flex-col justify-between fade-in bg-slate-50">
            {/* Header */}
            <div className="px-6 py-2.5 bg-white border-b border-slate-200 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full border border-slate-400 font-bold text-xs text-slate-800">
                HexaCore
              </span>
              <h2 className="text-base font-extrabold text-slate-900 tracking-wider">
                IDEA TITLE - IDENTITY-X
              </h2>
              <div className="text-right text-[10px] font-bold text-[#0D3B66]">
                SMART INDIA HACKATHON 2026
              </div>
            </div>

            {/* Sub-banner */}
            <div className="text-center py-1">
              <h3 className="text-xs font-bold text-emerald-700 tracking-wide">
                IDENTITY-X — AI-POWERED MULTI-LAYER IDENTITY & FORENSICS PLATFORM
              </h3>
              <p className="text-[10px] text-slate-600">
                A single, high-precision forensics platform that empowers border & immigration officers to detect forged documents and identity discrepancies.
              </p>
            </div>

            {/* Content Body: 3 Columns */}
            <div className="grid grid-cols-12 gap-3 px-6 pb-2 flex-1">
              {/* Left Column: OUR SOLUTION */}
              <div className="col-span-4 bg-white border-2 border-emerald-600 rounded-lg p-3 flex flex-col justify-between text-[10px] shadow-sm">
                <div>
                  <div className="bg-emerald-600 text-white font-bold text-center py-1 rounded text-xs mb-2">
                    ★ OUR SOLUTION
                  </div>
                  <p className="text-slate-700 leading-tight mb-2">
                    IDENTITY-X is an enterprise AI decision-support platform bridging physical travel documents and fraud detection through multi-spectral forensics, MRZ validation, biometric liveness correlation, and risk scoring—all in one place.
                  </p>
                  <div className="space-y-1.5 text-slate-800">
                    <div><strong className="text-emerald-700">✔ Multi-Layer Forensics:</strong> ELA, frequency noise analysis & tamper heatmaps.</div>
                    <div><strong className="text-emerald-700">✔ MRZ Validation:</strong> ICAO Doc 9303 dual-line checksum audit.</div>
                    <div><strong className="text-emerald-700">✔ Cross-Document Correlation:</strong> Identity graph linking Passport, Visa & National ID.</div>
                    <div><strong className="text-emerald-700">✔ Live Biometrics:</strong> 1:1 face similarity with presentation attack test.</div>
                    <div><strong className="text-emerald-700">✔ Decision Support:</strong> Accumulated evidence index with officer sign-off.</div>
                  </div>
                </div>
                <div className="mt-2 p-1.5 rounded bg-emerald-50 border border-emerald-200 text-[9px] font-semibold text-emerald-900 text-center">
                  Our Goal: To equip border authorities with instant, tamper-proof document forensic intelligence.
                </div>
              </div>

              {/* Center Column: 3 Screen Mockup Cards */}
              <div className="col-span-4 grid grid-cols-3 gap-1.5">
                {[
                  { num: '1', title: 'Officer Dashboard', desc: 'Real-time triage queue, screening stats & live throughput.', col: 'border-emerald-600', textCol: 'text-emerald-400' },
                  { num: '2', title: 'Doc Forensics', desc: 'Interactive AI heatmap highlighting DOB tamper (91%).', col: 'border-red-600', textCol: 'text-red-400' },
                  { num: '3', title: 'Biometrics', desc: 'Live face probe vs passport photo, 92% quality, liveness PASS.', col: 'border-blue-600', textCol: 'text-blue-400' }
                ].map(screen => (
                  <div key={screen.num} className={`bg-slate-950 border-2 ${screen.col} rounded-lg p-2 text-white flex flex-col justify-between text-center`}>
                    <div className="text-[9px] font-bold text-slate-300">
                      [{screen.num}] {screen.title}
                    </div>
                    <div className="my-auto py-2 font-mono text-[7px] text-slate-400 leading-tight bg-slate-900 rounded p-1">
                      ┌────────┐<br/>
                      │IDENTITY-X│<br/>
                      │GATE 4B │<br/>
                      │CASE#20482│<br/>
                      │Risk:78/100│<br/>
                      │<span className={screen.textCol}>[TAMPER]</span> │<br/>
                      │DOB:MISMATCH│<br/>
                      │Face: 63% │<br/>
                      │Live: PASS│<br/>
                      └────────┘
                    </div>
                    <div className="text-[8px] text-slate-300 leading-tight">
                      {screen.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Problem + Innovation */}
              <div className="col-span-4 flex flex-col justify-between gap-2">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 text-[9.5px]">
                  <div className="text-center font-bold text-emerald-800 text-[10px] mb-1">
                    HOW IT ADDRESSES THE PROBLEM
                  </div>
                  <div className="space-y-1 text-slate-800">
                    <div>1. <strong>Detects Micro-Tampering:</strong> Uncovers localized pixel manipulation.</div>
                    <div>2. <strong>Eliminates Identity Conflicts:</strong> Flags cross-document discrepancies.</div>
                    <div>3. <strong>Prevents Spoofing:</strong> 3D biometric liveness foils spoofing & deepfakes.</div>
                    <div>4. <strong>Accelerates Clearance:</strong> Reduces verification from 8 mins to &lt;3s.</div>
                    <div>5. <strong>Empowers Officers:</strong> Objective evidence replaces black-box AI.</div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 text-[9px]">
                  <div className="text-center font-bold text-blue-900 text-[10px] mb-1">
                    INNOVATION & UNIQUENESS
                  </div>
                  <div className="space-y-0.5 text-slate-800">
                    <div>• <strong>Multi-Spectral Analysis:</strong> ELA & noise analysis without $50k lab hardware.</div>
                    <div>• <strong>Cross-Document Graph:</strong> Correlates Passport, Visa & National ID.</div>
                    <div>• <strong>Additive Point Scoring:</strong> Transparent evidence breakdown (+18, +24).</div>
                    <div>• <strong>Edge & Offline Capable:</strong> Runs directly on standard gate terminals.</div>
                    <div>• <strong>Human-in-the-Loop Ethics:</strong> Officer retains complete legal clearance authority.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#0284C7] text-white px-6 py-1 flex justify-between text-[10px] font-bold">
              <span>@SIH Idea submission</span>
              <span>2</span>
            </div>
          </div>
        )}

        {/* SLIDE 3: TECHNICAL APPROACH */}
        {currentSlide === 3 && (
          <div className="h-full flex flex-col justify-between fade-in bg-slate-50">
            {/* Header */}
            <div className="px-6 py-2.5 bg-white border-b border-slate-200 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full border border-slate-400 font-bold text-xs text-slate-800">
                HexaCore
              </span>
              <h2 className="text-base font-extrabold text-slate-900 tracking-wider">
                TECHNICAL APPROACH
              </h2>
              <div className="text-right text-[10px] font-bold text-[#0D3B66]">
                SMART INDIA HACKATHON 2026
              </div>
            </div>

            {/* Banner */}
            <div className="bg-slate-200 text-[#0D3B66] text-center font-bold text-[10px] py-1">
              WHY REACT + MODULAR AI?? | IDENTITY-X leverages high-performance React 19 UI and modular Python AI services for sub-3-second checkpoint latency.
            </div>

            {/* Body */}
            <div className="grid grid-cols-12 gap-3 px-6 py-1 flex-1">
              {/* Left Column: Tech Stack (4 cols) */}
              <div className="col-span-4 bg-white border border-slate-300 rounded-lg p-3 text-[10px] flex flex-col justify-between shadow-sm">
                <div>
                  <div className="bg-[#0066CC] text-white font-bold px-2 py-0.5 rounded text-[10px] mb-2">
                    1 | TECHNOLOGIES TO BE USED
                  </div>
                  <div className="space-y-2">
                    <div>
                      <strong className="text-blue-900 block font-bold">■ Frontend Application</strong>
                      <span className="text-slate-600">React.js, Vite, Tailwind CSS, React Router, Recharts, Lucide Icons</span>
                    </div>
                    <div>
                      <strong className="text-blue-900 block font-bold">■ AI Forensics & Vision</strong>
                      <span className="text-slate-600">PyTorch, OpenCV, Error Level Analysis (ELA), PaddleOCR, InsightFace</span>
                    </div>
                    <div>
                      <strong className="text-blue-900 block font-bold">■ Backend & Middleware</strong>
                      <span className="text-slate-600">Python FastAPI / Node.js Express, PostgreSQL, Redis, Docker</span>
                    </div>
                    <div>
                      <strong className="text-blue-900 block font-bold">■ Security & Standards</strong>
                      <span className="text-slate-600">ICAO Doc 9303, FIPS 140-2, JWT Auth, SHA-256 Audit Hashing</span>
                    </div>
                  </div>
                </div>
                <div className="text-[9px] font-mono text-blue-800 font-bold pt-2 border-t border-slate-200">
                  🔗 GitHub: github.com/HexaCore/Identity-X-SIH26
                </div>
              </div>

              {/* Right Column: System Architecture (8 cols) */}
              <div className="col-span-8 bg-white border border-slate-300 rounded-lg p-3 text-[10px] shadow-sm flex flex-col justify-between">
                <div className="bg-[#0D3B66] text-white font-bold px-2 py-0.5 rounded text-[10px] mb-2">
                  2 | SYSTEM ARCHITECTURE (INTEGRATED | HIGH-THROUGHPUT | DECISION-SUPPORT)
                </div>

                <div className="space-y-1.5">
                  <div className="p-2 rounded bg-blue-50 border border-blue-200">
                    <span className="font-bold text-blue-900 block">Layer 1: Client & Officer Console</span>
                    <span className="text-slate-700 text-[9px]">React 19 Officer Web Portal • Gate Terminal UI • Mobile Secondary Inspection Tablet</span>
                  </div>
                  <div className="p-2 rounded bg-slate-100 border border-slate-200">
                    <span className="font-bold text-slate-900 block">Layer 2: API Gateway & Security</span>
                    <span className="text-slate-700 text-[9px]">FastAPI / Node.js Router • JWT Officer Authentication • Terminal Gate Session Token • Rate Limiter</span>
                  </div>
                  <div className="p-2 rounded bg-red-50 border border-red-200">
                    <span className="font-bold text-red-900 block">Layer 3: AI Multi-Layer Forensic Pipeline</span>
                    <span className="text-slate-700 text-[9px]">OCR Extractor (ICAO 9303) | MRZ Checksum Validator | Tamper ELA Heatmap | Biometric Face & Liveness | Identity Graph</span>
                  </div>
                  <div className="p-2 rounded bg-emerald-50 border border-emerald-200">
                    <span className="font-bold text-emerald-900 block">Layer 4: Data & Immutable Audit Ledger</span>
                    <span className="text-slate-700 text-[9px]">PostgreSQL (Cases & Dossiers) | S3 Object Vault (Scans & Probes) | Cryptographic Audit Chain (SHA-256)</span>
                  </div>
                </div>

                <div className="text-[9px] text-slate-500 italic text-center pt-1">
                  Connected Stakeholders: Border Security Officers • Secondary Inspection • Immigration Bureau • Judicial Authorities
                </div>
              </div>
            </div>

            {/* Bottom: 8 Step Workflow */}
            <div className="mx-6 mb-2 bg-white border border-slate-300 rounded-lg p-2 text-[9px]">
              <div className="font-bold text-[#0D3B66] mb-1">
                3 | USER WORKFLOW (8 STEP REAL-TIME INSPECTION PIPELINE)
              </div>
              <div className="grid grid-cols-8 gap-1 text-center">
                {[
                  { step: '1. Officer Auth', desc: 'Gate 4B login' },
                  { step: '2. Ingest Doc', desc: 'Passport / Visa' },
                  { step: '3. Capture Face', desc: 'Live 3D probe' },
                  { step: '4. Neural OCR', desc: 'Zone parsing' },
                  { step: '5. MRZ Audit', desc: 'ICAO checksums' },
                  { step: '6. Tamper ELA', desc: 'Heatmap scan' },
                  { step: '7. ID Graph', desc: 'Cross-check' },
                  { step: '8. Legal Decision', desc: 'Sign-off & report' }
                ].map((s, idx) => (
                  <div key={idx} className="p-1 rounded bg-slate-50 border border-slate-200">
                    <div className="font-bold text-slate-800">{s.step}</div>
                    <div className="text-[8px] text-slate-500">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#0284C7] text-white px-6 py-1 flex justify-between text-[10px] font-bold">
              <span>@SIH Idea submission</span>
              <span>3</span>
            </div>
          </div>
        )}

        {/* SLIDE 4: FEASIBILITY AND VIABILITY */}
        {currentSlide === 4 && (
          <div className="h-full flex flex-col justify-between fade-in bg-slate-50">
            {/* Header */}
            <div className="px-6 py-2.5 bg-white border-b border-slate-200 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full border border-slate-400 font-bold text-xs text-slate-800">
                HexaCore
              </span>
              <h2 className="text-base font-extrabold text-slate-900 tracking-wider">
                FEASIBILITY AND VIABILITY
              </h2>
              <div className="text-right text-[10px] font-bold text-[#0D3B66]">
                SMART INDIA HACKATHON 2026
              </div>
            </div>

            {/* Sub-banner */}
            <div className="text-center py-1">
              <h3 className="text-xs font-bold text-slate-800">
                “A practical, sovereign solution today, with a clear path to nationwide scale.”
              </h3>
            </div>

            {/* Body: Left & Right */}
            <div className="grid grid-cols-12 gap-4 px-6 flex-1">
              {/* Left: FEASIBILITY */}
              <div className="col-span-6 bg-white border-2 border-emerald-600 rounded-lg p-3 text-[10px] flex flex-col justify-between shadow-sm">
                <div>
                  <div className="bg-emerald-600 text-white font-bold text-center py-1 rounded text-xs mb-2">
                    ⚙ FEASIBILITY — CAN IT REALLY WORK IN REAL LIFE?
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 rounded bg-emerald-50 border border-emerald-200">
                      <strong className="text-emerald-800 block font-bold">✔ Technology Ready</strong>
                      <span>Built using standard web browsers, standard optical scanners, and lightweight neural models. No $50k proprietary optical hardware required.</span>
                    </div>
                    <div className="p-2 rounded bg-emerald-50 border border-emerald-200">
                      <strong className="text-emerald-800 block font-bold">✔ Data Feasible</strong>
                      <span>Complies with publicly documented ICAO Doc 9303 standards, verified checksum algorithms, and national identity layout specifications.</span>
                    </div>
                    <div className="p-2 rounded bg-emerald-50 border border-emerald-200">
                      <strong className="text-emerald-800 block font-bold">✔ Officer Feasible</strong>
                      <span>Intuitive high-contrast UI tailored for high-stress border environments. Requires zero technical forensics background to interpret.</span>
                    </div>
                    <div className="p-2 rounded bg-emerald-50 border border-emerald-200">
                      <strong className="text-emerald-800 block font-bold">✔ Ecosystem Feasible</strong>
                      <span>Integrates natively into existing airport e-Gates, immigration database APIs, and central immigration watchlists via secure REST endpoints.</span>
                    </div>
                  </div>
                </div>
                <div className="text-[9px] text-[#0D3B66] font-bold text-center pt-1 border-t border-slate-200">
                  Not a theoretical concept — a practical and deployable solution built on existing border infrastructure and validated mathematical standards.
                </div>
              </div>

              {/* Right: VIABILITY */}
              <div className="col-span-6 bg-white border-2 border-[#0066CC] rounded-lg p-3 text-[10px] flex flex-col justify-between shadow-sm">
                <div>
                  <div className="bg-[#0066CC] text-white font-bold text-center py-1 rounded text-xs mb-2">
                    📈 VIABILITY — CAN IT SUSTAIN AND CREATE LONG-TERM IMPACT?
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 rounded bg-amber-50 border border-amber-200">
                      <strong className="text-amber-800 block font-bold">★ Economically Viable</strong>
                      <span>Software-driven deployment slashes border inspection costs by 80% compared to imported proprietary hardware. Near-zero incremental cost per traveler.</span>
                    </div>
                    <div className="p-2 rounded bg-blue-50 border border-blue-200">
                      <strong className="text-blue-800 block font-bold">★ Nationally Scalable</strong>
                      <span>Modular microservice architecture effortlessly scales from a single border outpost to all 100+ Indian immigration checkpoints and land borders.</span>
                    </div>
                    <div className="p-2 rounded bg-emerald-50 border border-emerald-200">
                      <strong className="text-emerald-800 block font-bold">★ Sustainably Evolving</strong>
                      <span>Continuous model fine-tuning counters evolving synthetic media, AI deepfakes, and sophisticated organized crime forgery techniques.</span>
                    </div>
                  </div>
                </div>

                <div className="text-[9px] text-slate-600 font-semibold text-center bg-slate-50 p-2 rounded border border-slate-200">
                  Ecosystem Integration: Travelers ➔ Ingestion ➔ AI Forensics ➔ Officer Review ➔ Sovereign Border Integrity.
                </div>
              </div>
            </div>

            {/* Bottom Real-World Box */}
            <div className="mx-6 mb-2 bg-slate-100 border border-slate-300 rounded-lg p-2.5 text-[9.5px]">
              <div className="font-bold text-[#0D3B66] text-[10px]">REAL-WORLD APPROACH</div>
              <p className="text-slate-700 leading-tight">
                IDENTITY-X addresses real-world adoption challenges through sub-3-second latency, offline-capable verification models, and transparent evidence logs, helping officers make informed clearance decisions and preventing fraudulent entry.
              </p>
              <div className="text-emerald-700 font-bold text-[10px] mt-0.5">
                “IDENTITY-X is not dependent on creating a new Ecosystem — it connects, secures, and digitizes the one that already exists.”
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#0284C7] text-white px-6 py-1 flex justify-between text-[10px] font-bold">
              <span>@SIH Idea submission</span>
              <span>4</span>
            </div>
          </div>
        )}

        {/* SLIDE 5: IMPACT AND BENEFITS */}
        {currentSlide === 5 && (
          <div className="h-full flex flex-col justify-between fade-in bg-slate-50">
            {/* Header */}
            <div className="px-6 py-2.5 bg-white border-b border-slate-200 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full border border-slate-400 font-bold text-xs text-slate-800">
                HexaCore
              </span>
              <h2 className="text-base font-extrabold text-slate-900 tracking-wider">
                IMPACT AND BENEFITS
              </h2>
              <div className="text-right text-[10px] font-bold text-[#0D3B66]">
                SMART INDIA HACKATHON 2026
              </div>
            </div>

            {/* Sub-banner */}
            <div className="text-center py-1">
              <h3 className="text-xs font-bold text-slate-800">
                “Strengthening National Security, Accelerating Travel, Preserving Border Integrity”
              </h3>
            </div>

            {/* 4 Benefit Cards */}
            <div className="grid grid-cols-4 gap-3 px-6 text-[10px]">
              <div className="bg-emerald-50 border-2 border-emerald-600 rounded-lg p-2.5">
                <div className="font-bold text-emerald-800 text-xs mb-1.5">Security Benefits</div>
                <div className="space-y-1 text-slate-800">
                  <div>• Halts illegal crossings & impersonation.</div>
                  <div>• Stops syndicate passport & visa forgery.</div>
                  <div>• Creates tamper-proof cryptographic audit.</div>
                  <div>• Closes cross-document identity loopholes.</div>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-[#0066CC] rounded-lg p-2.5">
                <div className="font-bold text-blue-800 text-xs mb-1.5">Economic Benefits</div>
                <div className="space-y-1 text-slate-800">
                  <div>• Prevents multi-crore fraud & identity crimes.</div>
                  <div>• Saves millions of inspection officer hours.</div>
                  <div>• Slashes capital cost vs imported hardware.</div>
                  <div>• Expedites legitimate business & trade flow.</div>
                </div>
              </div>

              <div className="bg-amber-50 border-2 border-amber-600 rounded-lg p-2.5">
                <div className="font-bold text-amber-800 text-xs mb-1.5">Operational Benefits</div>
                <div className="space-y-1 text-slate-800">
                  <div>• Delivers full forensic check in &lt;3 seconds.</div>
                  <div>• Eliminates human fatigue in peak hours.</div>
                  <div>• Standardizes scrutiny across all 100+ ports.</div>
                  <div>• Provides defensible evidence for courts.</div>
                </div>
              </div>

              <div className="bg-slate-100 border-2 border-[#0D3B66] rounded-lg p-2.5">
                <div className="font-bold text-[#0D3B66] text-xs mb-1.5">Institutional Benefits</div>
                <div className="space-y-1 text-slate-800">
                  <div>• Modernizes borders under Digital India.</div>
                  <div>• Interoperates with Interpol & ICAO PKD.</div>
                  <div>• Elevates Indian airport global rankings.</div>
                  <div>• Scalable to e-Visas, seaports, & land gates.</div>
                </div>
              </div>
            </div>

            {/* Bottom Stakeholders Table */}
            <div className="mx-6 mb-2 bg-white border-2 border-emerald-600 rounded-lg p-3 text-[10px] shadow-sm">
              <div className="bg-emerald-600 text-white font-bold text-center py-1 rounded text-xs mb-2">
                IMPACT ON KEY STAKEHOLDERS
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <div className="font-bold text-[#0D3B66] mb-1">IMMIGRATION OFFICERS</div>
                  <div className="text-slate-700 space-y-0.5">
                    <div>• Objective evidence trails.</div>
                    <div>• Reduced mental fatigue.</div>
                    <div>• Confident, defensible decisions.</div>
                    <div>• Accelerated passenger clearance.</div>
                  </div>
                </div>

                <div>
                  <div className="font-bold text-[#0D3B66] mb-1">TRAVELERS & CITIZENS</div>
                  <div className="text-slate-700 space-y-0.5">
                    <div>• Rapid, frictionless transit.</div>
                    <div>• Protected from identity theft.</div>
                    <div>• Transparent screening criteria.</div>
                    <div>• No wrongful harassment.</div>
                  </div>
                </div>

                <div>
                  <div className="font-bold text-[#0D3B66] mb-1">GOVERNMENT & POLICE</div>
                  <div className="text-slate-700 space-y-0.5">
                    <div>• Real-time border intelligence.</div>
                    <div>• Centralized fraud pattern tracking.</div>
                    <div>• Strengthened homeland security.</div>
                    <div>• Supports digital governance.</div>
                  </div>
                </div>

                <div>
                  <div className="font-bold text-[#0D3B66] mb-1">SOCIETY & NATION</div>
                  <div className="text-slate-700 space-y-0.5">
                    <div>• Protected national frontiers.</div>
                    <div>• Deterrence of transnational crime.</div>
                    <div>• Preserved document integrity.</div>
                    <div>• Safe, lawful international travel.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#0284C7] text-white px-6 py-1 flex justify-between text-[10px] font-bold">
              <span>@SIH Idea submission</span>
              <span>5</span>
            </div>
          </div>
        )}

        {/* SLIDE 6: RESEARCH AND REFERENCES */}
        {currentSlide === 6 && (
          <div className="h-full flex flex-col justify-between fade-in bg-slate-50">
            {/* Header */}
            <div className="px-6 py-2.5 bg-white border-b border-slate-200 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full border border-slate-400 font-bold text-xs text-slate-800">
                HexaCore
              </span>
              <h2 className="text-base font-extrabold text-slate-900 tracking-wider">
                RESEARCH AND REFERENCES
              </h2>
              <div className="text-right text-[10px] font-bold text-[#0D3B66]">
                SMART INDIA HACKATHON 2026
              </div>
            </div>

            {/* Sub-banner */}
            <div className="text-center py-1">
              <h3 className="text-xs font-bold text-slate-800">
                “Understanding the forensic gap. Building a sovereign security solution.”
              </h3>
            </div>

            {/* Body: 3 Columns */}
            <div className="grid grid-cols-12 gap-3 px-6 mb-2 flex-1 text-[10px]">
              {/* Left Column: References (3.5 cols) */}
              <div className="col-span-3 bg-white border border-slate-300 rounded-lg p-2.5 shadow-sm space-y-2">
                <div className="bg-[#0D3B66] text-white font-bold px-2 py-0.5 rounded text-[10px]">
                  KEY REFERENCES & SOURCES
                </div>
                <div className="space-y-1.5 text-slate-800 text-[9px]">
                  <div>
                    <strong className="text-blue-900 block font-bold">■ ICAO Doc 9303 Standard</strong>
                    <span className="text-slate-600">Machine Readable Travel Documents (MRTD) Specs & Checksum Algorithms.</span>
                  </div>
                  <div>
                    <strong className="text-blue-900 block font-bold">■ Error Level Analysis (ELA)</strong>
                    <span className="text-slate-600">Dr. Neal Krawetz, 'A Picture's Worth... Digital Image Analysis Forensics.'</span>
                  </div>
                  <div>
                    <strong className="text-blue-900 block font-bold">■ NIST FRVT Guidelines</strong>
                    <span className="text-slate-600">Face Recognition Vendor Test & Presentation Attack Detection (ISO 30107).</span>
                  </div>
                  <div>
                    <strong className="text-blue-900 block font-bold">■ Ministry of Home Affairs</strong>
                    <span className="text-slate-600">Bureau of Immigration (BOI) guidelines & Foreigners Act frameworks.</span>
                  </div>
                  <div>
                    <strong className="text-blue-900 block font-bold">■ Interpol SLTD Database</strong>
                    <span className="text-slate-600">Stolen & Lost Travel Documents cross-border verification architecture.</span>
                  </div>
                </div>
              </div>

              {/* Center Column: Findings + Requirements (6.5 cols) */}
              <div className="col-span-6 flex flex-col justify-between gap-2">
                <div className="bg-white border-2 border-emerald-600 rounded-lg p-2.5 shadow-sm text-center">
                  <div className="bg-emerald-600 text-white font-bold py-0.5 rounded text-[10px] mb-1">
                    FINDINGS FROM OUR PRACTICAL FORENSIC RESEARCH
                  </div>
                  <div className="text-[9px] font-bold text-blue-900 mb-1">
                    What is forged? ➔ Does MRZ match? ➔ Is photo tampered? ➔ Does face match? ➔ Is ID consistent?
                  </div>
                  <div className="bg-slate-900 text-white p-2 rounded font-sans text-center">
                    <div className="text-emerald-400 font-extrabold text-xs">🛡 IDENTITY-X</div>
                    <div className="font-bold text-[10px]">“Bridging the forensic gaps. Connecting multi-layer evidence.”</div>
                    <div className="text-slate-400 text-[8.5px]">Turning available document and biometric data into an immediate, defensible decision.</div>
                  </div>
                </div>

                <div className="bg-white border border-slate-300 rounded-lg p-2 shadow-sm">
                  <div className="bg-[#0066CC] text-white font-bold py-0.5 text-center rounded text-[10px] mb-1.5">
                    RESEARCH INSIGHTS ➔ SYSTEM DESIGN REQUIREMENTS
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 text-[8.5px]">
                    <div className="p-1 rounded bg-slate-50 border border-slate-200">
                      <strong className="text-blue-900 block font-bold">Dual MRZ-Visual Validation</strong>
                      <span>Cross-verify optical text against machine hashes.</span>
                    </div>
                    <div className="p-1 rounded bg-slate-50 border border-slate-200">
                      <strong className="text-blue-900 block font-bold">Localized ELA Heatmap</strong>
                      <span>Isolate modified regions like altered birth dates.</span>
                    </div>
                    <div className="p-1 rounded bg-slate-50 border border-slate-200">
                      <strong className="text-blue-900 block font-bold">Cross-Doc Correlation</strong>
                      <span>Detect conflicting birth years across civil IDs.</span>
                    </div>
                    <div className="p-1 rounded bg-slate-50 border border-slate-200">
                      <strong className="text-blue-900 block font-bold">3D Face Liveness Test</strong>
                      <span>Guard against phone replays & silicone masks.</span>
                    </div>
                    <div className="p-1 rounded bg-slate-50 border border-slate-200">
                      <strong className="text-blue-900 block font-bold">Additive Point Scoring</strong>
                      <span>Transparent evidence contributions (+18, +24).</span>
                    </div>
                    <div className="p-1 rounded bg-slate-50 border border-slate-200">
                      <strong className="text-blue-900 block font-bold">Sub-3s Gate Latency</strong>
                      <span>Engineered for high-volume airport checkpoints.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Standards Reviewed (2.5 cols) */}
              <div className="col-span-3 bg-slate-100 border border-slate-300 rounded-lg p-2.5 text-[9px] shadow-sm space-y-2">
                <div className="bg-slate-800 text-white font-bold text-center py-0.5 rounded text-[10px]">
                  STANDARDS REVIEWED
                </div>
                <div className="space-y-1.5 text-slate-800">
                  <div className="p-1 rounded bg-white border border-slate-200">
                    <strong className="text-slate-900 block">■ ICAO DOC 9303</strong>
                    <span className="text-slate-600 text-[8px]">Official Global Passport Standard</span>
                  </div>
                  <div className="p-1 rounded bg-white border border-slate-200">
                    <strong className="text-slate-900 block">■ BUREAU OF IMMIGRATION</strong>
                    <span className="text-slate-600 text-[8px]">Government of India</span>
                  </div>
                  <div className="p-1 rounded bg-white border border-slate-200">
                    <strong className="text-slate-900 block">■ INTERPOL SLTD</strong>
                    <span className="text-slate-600 text-[8px]">Stolen & Lost Travel Documents</span>
                  </div>
                  <div className="p-1 rounded bg-white border border-slate-200">
                    <strong className="text-slate-900 block">■ ISO/IEC 19794</strong>
                    <span className="text-slate-600 text-[8px]">Biometric Data Interchange</span>
                  </div>
                  <div className="p-1 rounded bg-white border border-slate-200">
                    <strong className="text-slate-900 block">■ FIPS 140-2</strong>
                    <span className="text-slate-600 text-[8px]">Cryptographic Module Security</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#0284C7] text-white px-6 py-1 flex justify-between text-[10px] font-bold">
              <span>@SIH Idea submission</span>
              <span>6</span>
            </div>
          </div>
        )}
      </div>

      {/* Speaking Notes & Deck Summary Card */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            <Presentation className="h-4 w-4 text-blue-400" />
            <span>Slide {currentSlide} Speaker Notes & Evaluation Points</span>
          </h3>
          <span className="text-xs font-mono text-emerald-400">SIH 2026 Ready</span>
        </div>

        <div className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-950 p-4 rounded-lg border border-slate-800">
          {currentSlide === 1 && (
            <p>
              <strong>Slide 1 (Title):</strong> Preserves the exact Smart India Hackathon 2026 template with Problem Statement ID 26132, Team ID 167304, and Team Name: <strong>HexaCore</strong>.
            </p>
          )}
          {currentSlide === 2 && (
            <p>
              <strong>Slide 2 (Idea Title - IDENTITY-X):</strong> Highlights the core value proposition. Emphasize how IDENTITY-X combines Error Level Analysis (ELA), ICAO 9303 MRZ validation, cross-document entity correlation, and 1:1 face matching with presentation attack detection into an objective, explainable officer decision-support index.
            </p>
          )}
          {currentSlide === 3 && (
            <p>
              <strong>Slide 3 (Technical Approach):</strong> Explains the 4-layer architecture (React 19 UI, FastAPI gateway, PyTorch/OpenCV AI pipeline, and immutable cryptographic audit ledger) and the 8-step traveler screening workflow that executes in under 3 seconds.
            </p>
          )}
          {currentSlide === 4 && (
            <p>
              <strong>Slide 4 (Feasibility & Viability):</strong> Shows that IDENTITY-X works with standard optical scanners without requiring costly $50k lab hardware, scales across all 100+ Indian border checkpoints, and connects to existing e-Gates and immigration databases.
            </p>
          )}
          {currentSlide === 5 && (
            <p>
              <strong>Slide 5 (Impact & Benefits):</strong> Details the 4 benefit pillars (Security, Economic, Operational, Institutional) and maps the direct advantages to Immigration Officers, Travelers, Government/Police, and Sovereign Society.
            </p>
          )}
          {currentSlide === 6 && (
            <p>
              <strong>Slide 6 (Research & References):</strong> Validates the engineering decisions against international standards: ICAO Doc 9303, Dr. Neal Krawetz's ELA research, NIST FRVT facial benchmarks, MHA Bureau of Immigration protocols, and Interpol SLTD.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
