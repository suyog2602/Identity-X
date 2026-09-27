import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  FileText,
  User,
  Scan,
  Maximize2,
  Camera,
  Activity,
  Layers,
  ArrowRight,
  Send,
  Eye,
  Info,
  BadgeAlert,
  AlertCircle,
  FileCheck2,
} from 'lucide-react'
import { useCase } from '../contexts/CaseContext'
import { useToast } from '../components/ui/Toast'
import StatusBadge from '../components/ui/StatusBadge'
import RiskBadge from '../components/ui/RiskBadge'
import Modal from '../components/ui/Modal'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function InvestigationPage() {
  const { caseId } = useParams()
  const { getCaseById, submitOfficerDecision, setActiveDemoCaseId } = useCase()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const currentCase = getCaseById(caseId)

  // Document Forensics Viewer Active Tab
  // 'Original' | 'OCR' | 'ELA' | 'Noise Analysis' | 'AI Heatmap' | 'Metadata'
  const [forensicTab, setForensicTab] = useState('AI Heatmap')
  const [selectedOcrField, setSelectedOcrField] = useState('DOB')

  // Officer Decision Form State
  const [selectedDecision, setSelectedDecision] = useState(
    currentCase.decision?.action || 'SECONDARY_INSPECTION'
  )
  const [officerNotes, setOfficerNotes] = useState(
    currentCase.decision?.notes || 'Discrepancy detected between visual DOB (1998) and MRZ encoding (1997). Suspicious compression artifacts localized around date of birth field warrant physical secondary inspection.'
  )
  const [submittingDecision, setSubmittingDecision] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)

  const handleDecisionSubmit = async () => {
    setSubmittingDecision(true)
    await submitOfficerDecision(currentCase.caseId, {
      action: selectedDecision,
      notes: officerNotes,
      officer: 'Officer Arjun Verma',
    })
    setSubmittingDecision(false)
    setConfirmModalOpen(true)
    addToast({
      title: 'Officer Review Recorded',
      message: `Disposition for Case #${currentCase.caseId} registered to permanent audit ledger.`,
      type: 'success',
    })
  }

  // Risk Breakdown Chart Data
  const chartData = currentCase.risk.breakdown?.map(item => ({
    name: item.factor,
    pts: item.contribution,
  })) || []

  return (
    <div className="space-y-6 fade-in pb-12">
      {/* 10. INVESTIGATION HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-blue-400">
                Case #{currentCase.caseId}
              </span>
              <StatusBadge status={currentCase.status} size="sm" />
              <span className="text-xs text-slate-500 font-mono">
                Assigned: {currentCase.officer} • Gate 4B
              </span>
            </div>

            <div className="flex items-baseline gap-3 pt-1">
              <h1 className="text-2xl font-bold text-slate-100 tracking-wide">
                {currentCase.person.name}
              </h1>
              <span className="text-xs text-slate-400 font-mono">
                {currentCase.person.nationality} • DOB: {currentCase.person.dobDisplay} • {currentCase.person.passportNumber}
              </span>
            </div>
          </div>

          {/* Large Risk Score Display */}
          <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 shrink-0">
            <div className="text-right">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                ANOMALY RISK INDEX
              </span>
              <span className={`text-xs font-bold uppercase tracking-wider ${
                currentCase.risk.score > 60 ? 'text-red-400' : 'text-emerald-400'
              }`}>
                {currentCase.risk.levelDisplay}
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {currentCase.risk.recommendation}
              </p>
            </div>
            <div className={`h-16 w-16 rounded-xl border flex flex-col items-center justify-center font-mono ${
              currentCase.risk.score > 60
                ? 'bg-red-500/10 border-red-500/40 text-red-400'
                : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
            }`}>
              <span className="text-2xl font-bold">{currentCase.risk.score}</span>
              <span className="text-[9px] opacity-70">/100</span>
            </div>
          </div>
        </div>

        {/* Ethical / Regulatory Disclaimer Banner */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-400">
          <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
          <p>
            <strong>Decision-Support Notice:</strong> The system provides multi-layer evidence correlation and anomaly recommendations. It does not make legal determinations of fraudulent intent. The final clearance decision remains solely with the authorized immigration officer.
          </p>
        </div>
      </div>

      {/* 11. SUMMARY CARDS (SIX CARDS) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Card 1: OCR */}
        <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">OCR EXTRACTION</span>
          <div className="text-xl font-bold font-mono text-slate-100">{currentCase.ocr.percentageDisplay}</div>
          <p className="text-[10px] text-slate-400 truncate">{currentCase.ocr.subtitle}</p>
          <StatusBadge status={currentCase.ocr.status} size="xs" />
        </div>

        {/* Card 2: MRZ */}
        <div className={`p-4 rounded-lg border space-y-2 ${
          currentCase.mrz.status === 'WARNING' ? 'bg-amber-500/5 border-amber-500/30' : 'bg-slate-900 border-slate-800'
        }`}>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">MRZ INTEGRITY</span>
          <div className={`text-xl font-bold font-mono ${currentCase.mrz.status === 'WARNING' ? 'text-amber-400' : 'text-slate-100'}`}>
            {currentCase.mrz.statusText}
          </div>
          <p className="text-[10px] text-slate-400 truncate">{currentCase.mrz.subtitle}</p>
          <StatusBadge status={currentCase.mrz.status} size="xs" />
        </div>

        {/* Card 3: Document Validation */}
        <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">DOC VALIDATION</span>
          <div className="text-xl font-bold font-mono text-slate-100">{currentCase.documentValidation.scoreText}</div>
          <p className="text-[10px] text-slate-400 truncate">{currentCase.documentValidation.subtitle}</p>
          <StatusBadge status={currentCase.documentValidation.status} size="xs" />
        </div>

        {/* Card 4: Tamper Detection */}
        <div className={`p-4 rounded-lg border space-y-2 ${
          currentCase.forensics.status === 'ANOMALY' ? 'bg-red-500/10 border-red-500/40' : 'bg-slate-900 border-slate-800'
        }`}>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">TAMPER DETECTION</span>
          <div className={`text-xl font-bold font-mono ${currentCase.forensics.status === 'ANOMALY' ? 'text-red-400' : 'text-slate-100'}`}>
            {currentCase.forensics.percentageDisplay}
          </div>
          <p className="text-[10px] text-slate-400 truncate">{currentCase.forensics.subtitle}</p>
          <StatusBadge status={currentCase.forensics.status} size="xs" />
        </div>

        {/* Card 5: Face Verification */}
        <div className={`p-4 rounded-lg border space-y-2 ${
          currentCase.face.status === 'WARNING' ? 'bg-amber-500/5 border-amber-500/30' : 'bg-slate-900 border-slate-800'
        }`}>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">FACE VERIFICATION</span>
          <div className={`text-xl font-bold font-mono ${currentCase.face.status === 'WARNING' ? 'text-amber-400' : 'text-slate-100'}`}>
            {currentCase.face.percentageDisplay}
          </div>
          <p className="text-[10px] text-slate-400 truncate">{currentCase.face.subtitle}</p>
          <StatusBadge status={currentCase.face.status} size="xs" />
        </div>

        {/* Card 6: Liveness */}
        <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">LIVENESS</span>
          <div className="text-xl font-bold font-mono text-emerald-400">{currentCase.face.liveness}</div>
          <p className="text-[10px] text-slate-400 truncate">{currentCase.face.livenessSubtitle}</p>
          <StatusBadge status="PASSED" size="xs" />
        </div>
      </div>

      {/* 12 & 13. DOCUMENT FORENSICS PANEL & OCR RESULTS TABLE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 12. Large Document Forensics Viewer (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-semibold text-slate-100">Document Forensics Viewer</h3>
              <p className="text-xs text-slate-400">Physical TD3 Passport biographical data page inspection</p>
            </div>

            {/* Controls Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              {['Original', 'OCR', 'ELA', 'Noise Analysis', 'AI Heatmap', 'Metadata'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setForensicTab(tab)}
                  className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    forensicTab === tab
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Document Mockup Canvas */}
          <div className="relative rounded-lg bg-slate-950 border border-slate-800 p-6 min-h-[340px] flex flex-col justify-between overflow-hidden shadow-inner">
            {/* Background Watermark/Security Guilloche pattern simulation */}
            <div className={`absolute inset-0 opacity-20 pointer-events-none ${
              forensicTab === 'ELA' ? 'bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:8px_8px] invert' :
              forensicTab === 'Noise Analysis' ? 'bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:4px_4px]' :
              'bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:12px_12px]'
            }`} />

            {/* Passport Top Header */}
            <div className="flex justify-between items-start pb-4 border-b border-slate-800/80 relative z-10">
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-xs font-bold font-mono">
                  IND
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase block">REPUBLIC OF INDIA</span>
                  <span className="text-xs font-bold text-slate-200 tracking-wider">PASSPORT / PASSEPORT</span>
                </div>
              </div>
              <div className="text-right font-mono text-[11px] text-slate-400">
                Type: <strong className="text-slate-100">P</strong> • Code: <strong className="text-slate-100">IND</strong>
              </div>
            </div>

            {/* Passport Middle: Photo & Text Fields */}
            <div className="grid grid-cols-12 gap-4 my-4 relative z-10">
              {/* Photo Box */}
              <div className="col-span-4 bg-slate-900 border border-slate-700 rounded-md p-2 flex flex-col items-center justify-center relative">
                <div className="h-28 w-24 bg-slate-800 rounded border border-slate-600 flex flex-col items-center justify-center relative overflow-hidden">
                  <User className="h-16 w-16 text-slate-400" />
                  <span className="text-[8px] font-mono text-slate-400 mt-1">OFC-VERIFIED</span>
                </div>
                <span className="text-[9px] font-mono text-slate-500 mt-1.5">PHOTO INTEGRITY: OK</span>
              </div>

              {/* Data Fields */}
              <div className="col-span-8 space-y-2 text-xs">
                <div>
                  <span className="text-[9px] text-slate-500 font-mono block">SURNAME / NOM</span>
                  <span className="font-bold text-slate-100 font-mono tracking-wider">MEHTA</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 font-mono block">GIVEN NAMES / PRÉNOMS</span>
                  <span className="font-bold text-slate-100 font-mono tracking-wider">ROHAN</span>
                </div>

                {/* THE DOB FIELD — TARGET OF SUSPICION */}
                <div className="relative inline-block">
                  <span className="text-[9px] text-slate-500 font-mono block">DATE OF BIRTH / DATE DE NAISSANCE</span>
                  <span className={`font-bold font-mono tracking-wider inline-block px-1.5 py-0.5 rounded ${
                    forensicTab === 'AI Heatmap' || selectedOcrField === 'DOB'
                      ? 'bg-red-500/20 text-red-300 border border-red-500'
                      : 'text-slate-100'
                  }`}>
                    12/05/1998
                  </span>

                  {/* AI Heatmap Floating Suspicious Region Marker */}
                  {forensicTab === 'AI Heatmap' && currentCase.forensics.suspiciousRegion && (
                    <div className="absolute -top-1 -right-44 bg-red-600/90 text-white border border-red-400 text-[10px] font-semibold px-2 py-1 rounded shadow-lg animate-pulse">
                      ▲ SUSPICIOUS REGION (91%)
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-[9px] text-slate-500 font-mono block">SEXE</span>
                    <span className="font-bold font-mono text-slate-100">M</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-mono block">PASSPORT NO</span>
                    <span className="font-bold font-mono text-blue-400">P9876543</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Passport Bottom MRZ Line Display */}
            <div className="pt-3 border-t border-slate-800 font-mono text-[11px] tracking-wider text-slate-300 space-y-0.5 bg-slate-950/80 p-2 rounded relative z-10">
              <div className="truncate">{currentCase.mrz.line1}</div>
              <div className="truncate">
                {currentCase.mrz.valid ? (
                  <span>{currentCase.mrz.line2}</span>
                ) : (
                  <span>
                    P9876543&lt;IND<span className="bg-red-500/30 text-red-400 border border-red-500/50 px-1 rounded font-bold">970512</span>7M3008125&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* AI Heatmap Suspicious Region Overlay Information */}
          {forensicTab === 'AI Heatmap' && currentCase.forensics.suspiciousRegion && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-xs space-y-1 fade-in">
              <div className="flex items-center justify-between font-bold text-red-400">
                <span className="flex items-center gap-1.5">
                  <BadgeAlert className="h-4 w-4" />
                  <span>{currentCase.forensics.suspiciousRegion.label}</span>
                </span>
                <span className="font-mono">Confidence: {currentCase.forensics.suspiciousRegion.confidence}</span>
              </div>
              <p className="text-slate-300 font-medium">
                "{currentCase.forensics.suspiciousRegion.description}"
              </p>
              <p className="text-[11px] text-slate-400">
                {currentCase.forensics.suspiciousRegion.analysisDetail}
              </p>
            </div>
          )}

          {/* ELA / Noise / Metadata context boxes */}
          {forensicTab === 'ELA' && (
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1">
              <span className="text-slate-400 font-semibold block">Error Level Analysis (ELA) Diagnostic:</span>
              <p className="text-slate-300 font-mono text-[11px]">{currentCase.forensics.elaVariance}</p>
            </div>
          )}
          {forensicTab === 'Noise Analysis' && (
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1">
              <span className="text-slate-400 font-semibold block">Fourier Frequency Noise Surface:</span>
              <p className="text-slate-300 font-mono text-[11px]">{currentCase.forensics.noiseAnomalyScore}</p>
            </div>
          )}
          {forensicTab === 'Metadata' && (
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1">
              <span className="text-slate-400 font-semibold block">EXIF & Quantization Table Record:</span>
              <p className="text-slate-300 font-mono text-[11px]">{currentCase.forensics.exifAnalysis}</p>
            </div>
          )}
        </div>

        {/* 13. OCR RESULTS STRUCTURED TABLE (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-100">OCR Extraction Matrix</h3>
                <p className="text-xs text-slate-400">Click field to locate in document visual zone</p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">98% Avg</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-3 py-2">Field</th>
                    <th className="px-3 py-2">Extracted Value</th>
                    <th className="px-3 py-2 text-right">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {currentCase.ocr.fields?.map(f => (
                    <tr
                      key={f.field}
                      onClick={() => {
                        setSelectedOcrField(f.field)
                        if (f.field === 'DOB') setForensicTab('AI Heatmap')
                      }}
                      className={`hover:bg-slate-800 cursor-pointer transition-colors ${
                        selectedOcrField === f.field ? 'bg-blue-600/15 text-blue-300 font-semibold' : 'text-slate-200'
                      }`}
                    >
                      <td className="px-3 py-2.5 text-slate-400 font-sans font-medium">{f.field}</td>
                      <td className="px-3 py-2.5 font-bold">
                        <span className={f.status === 'SUSPICIOUS' ? 'text-red-400 bg-red-500/10 px-1 py-0.5 rounded' : ''}>
                          {f.value}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-right">
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          f.confidence >= 98 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {f.confidence}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-400">
            Tip: All fields extracted using high-resolution neural OCR model conforming to ICAO Doc 9303 Type B typography.
          </div>
        </div>
      </div>

      {/* 14 & 15. MRZ ANALYSIS & IDENTITY CONSISTENCY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 14. MRZ ANALYSIS SECTION */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-semibold text-slate-100">MRZ Analysis</h3>
              <p className="text-xs text-slate-400">Machine Readable Zone validation and checksum audit</p>
            </div>
            <StatusBadge status={currentCase.mrz.statusText} size="sm" />
          </div>

          {/* Raw Monospace MRZ Display */}
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 space-y-1">
            <div className="tracking-widest">{currentCase.mrz.line1}</div>
            <div className="tracking-widest">
              {currentCase.mrz.valid ? (
                <span>{currentCase.mrz.line2}</span>
              ) : (
                <span>
                  P9876543&lt;IND<span className="bg-red-500 text-white font-bold px-1 rounded">970512</span>7M3008125&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
                </span>
              )}
            </div>
          </div>

          {/* Comparison Cards: Visible DOB vs MRZ DOB */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-mono block">VISIBLE DOB (VISUAL ZONE)</span>
              <span className="text-base font-bold font-mono text-slate-100 mt-1 block">
                {currentCase.mrz.visibleDob}
              </span>
            </div>

            <div className={`p-3 rounded-lg border ${
              currentCase.mrz.valid ? 'bg-slate-950 border-slate-800' : 'bg-red-500/10 border-red-500/40'
            }`}>
              <span className="text-[10px] text-slate-400 font-mono block">MRZ DOB (LINE 2 ENCODING)</span>
              <span className={`text-base font-bold font-mono mt-1 block ${
                currentCase.mrz.valid ? 'text-slate-100' : 'text-red-400'
              }`}>
                {currentCase.mrz.mrzDob}
              </span>
            </div>
          </div>

          {/* Explanation Text */}
          <div className={`p-3 rounded-lg border text-xs flex items-start gap-2.5 ${
            currentCase.mrz.valid ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
          }`}>
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{currentCase.mrz.explanation}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{currentCase.mrz.detail}</p>
            </div>
          </div>
        </div>

        {/* 15. IDENTITY CONSISTENCY COMPARISON MATRIX */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-semibold text-slate-100">Identity Consistency Matrix</h3>
              <p className="text-xs text-slate-400">Cross-document verification across submitted credentials</p>
            </div>
            <StatusBadge status={currentCase.identityConsistency.status} size="sm" />
          </div>

          {/* Cross Document Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-3 py-2">Field</th>
                  <th className="px-3 py-2">Passport</th>
                  <th className="px-3 py-2">Visa</th>
                  <th className="px-3 py-2">National ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {currentCase.identityConsistency.fields?.map(f => (
                  <tr key={f.field} className={!f.isConsistent ? 'bg-red-500/10' : ''}>
                    <td className="px-3 py-2.5 text-slate-400 font-sans font-medium">{f.field}</td>
                    <td className="px-3 py-2.5 text-slate-200">{f.passport}</td>
                    <td className="px-3 py-2.5 text-slate-200">{f.visa}</td>
                    <td className="px-3 py-2.5">
                      <span className={!f.isConsistent ? 'text-red-400 font-bold underline' : 'text-slate-200'}>
                        {f.nationalId || '—'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Highlight DOB Conflict Banner */}
          <div className={`p-3 rounded-lg border text-xs flex items-start gap-2.5 ${
            currentCase.identityConsistency.consistent
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-red-500/10 border-red-500/30 text-red-300'
          }`}>
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{currentCase.identityConsistency.explanation}</p>
              {!currentCase.identityConsistency.consistent && (
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Birth year on National ID register is recorded as 1996, while travel passport declares 1998.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 16 & 17. FACE VERIFICATION & RISK ANALYSIS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 16. FACE VERIFICATION SIDE-BY-SIDE */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-semibold text-slate-100">Face Verification Biometrics</h3>
              <p className="text-xs text-slate-400">1:1 facial biometric matching between document and live probe</p>
            </div>
            <StatusBadge status={currentCase.face.status} size="sm" />
          </div>

          {/* Side-by-side comparison */}
          <div className="grid grid-cols-7 gap-3 items-center">
            {/* Left: Document Photo */}
            <div className="col-span-3 p-3 rounded-lg bg-slate-950 border border-slate-800 text-center space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">DOCUMENT PHOTO</span>
              <div className="h-28 w-24 mx-auto rounded bg-slate-800 border border-slate-700 flex flex-col items-center justify-center">
                <User className="h-16 w-16 text-slate-400" />
              </div>
              <span className="text-[10px] text-slate-500 font-mono block">600 DPI Scan</span>
            </div>

            {/* Center Similarity Meter */}
            <div className="col-span-1 text-center space-y-1">
              <span className="text-[9px] font-mono text-slate-400 block">MATCH</span>
              <div className={`text-base font-bold font-mono ${
                currentCase.face.similarity > 0.8 ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {currentCase.face.percentageDisplay}
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${currentCase.face.similarity > 0.8 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                  style={{ width: currentCase.face.percentageDisplay }}
                />
              </div>
            </div>

            {/* Right: Live Captured Face */}
            <div className="col-span-3 p-3 rounded-lg bg-slate-950 border border-slate-800 text-center space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">LIVE CAPTURED FACE</span>
              <div className="h-28 w-24 mx-auto rounded bg-slate-800 border border-slate-700 flex flex-col items-center justify-center">
                <Camera className="h-16 w-16 text-blue-400" />
              </div>
              <span className="text-[10px] text-slate-500 font-mono block">Terminal Cam Probe</span>
            </div>
          </div>

          {/* Sub-signals */}
          <div className="grid grid-cols-2 gap-3 text-xs pt-2">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">LIVENESS STATUS:</span>
              <span className="font-mono font-bold text-emerald-400">PASS</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">FACE QUALITY:</span>
              <span className="font-mono font-bold text-slate-100">{currentCase.face.faceQuality}</span>
            </div>
          </div>
        </div>

        {/* 17. RISK ANALYSIS BREAKDOWN PANEL */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-semibold text-slate-100">Accumulated Risk Evidence</h3>
              <p className="text-xs text-slate-400">Evidence contribution breakdown (not probability of fraud)</p>
            </div>
            <RiskBadge score={currentCase.risk.score} level={currentCase.risk.level} size="lg" />
          </div>

          {/* Breakdown Items */}
          <div className="space-y-2 text-xs">
            {currentCase.risk.breakdown?.map(item => (
              <div key={item.factor} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-200 font-medium">{item.factor}</span>
                  <span className="text-[10px] text-slate-500 font-mono block">{item.category}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-amber-400">+{item.contribution}</span>
                  <span className="text-[10px] text-slate-500 block">pts</span>
                </div>
              </div>
            ))}

            <div className="p-3 rounded-lg bg-slate-850 border border-slate-700 flex items-center justify-between font-bold text-slate-100 pt-2">
              <span>Total Accumulated Score:</span>
              <span className="font-mono text-base text-red-400">{currentCase.risk.score} / 100</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 italic">
            "{currentCase.risk.explanation}"
          </p>
        </div>
      </div>

      {/* 18. OFFICER DECISION PANEL & AUDIT TIMELINE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Officer Decision Panel (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-semibold text-slate-100">Officer Review & Legal Disposition</h3>
              <p className="text-xs text-slate-400">Submit authorized officer finding to the border control registry</p>
            </div>
          </div>

          {/* Decision Buttons */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'CLEAR', label: 'CLEAR', subtitle: 'Grant Standard Entry', color: 'emerald' },
              { id: 'SECONDARY_INSPECTION', label: 'SECONDARY INSPECTION', subtitle: 'Detailed Questioning', color: 'amber' },
              { id: 'FURTHER_INVESTIGATION', label: 'FURTHER INVESTIGATION', subtitle: 'Refer to Forensics Lab', color: 'red' },
            ].map(btn => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setSelectedDecision(btn.id)}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  selectedDecision === btn.id
                    ? btn.color === 'emerald'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/30'
                      : btn.color === 'amber'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 ring-2 ring-amber-500/30'
                      : 'bg-red-500/20 border-red-500 text-red-300 ring-2 ring-red-500/30'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold text-xs">{btn.label}</div>
                <div className="text-[10px] opacity-70 mt-0.5">{btn.subtitle}</div>
              </button>
            ))}
          </div>

          {/* Officer Notes Textarea */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              OFFICER NOTES & JUSTIFICATION
            </label>
            <textarea
              rows={4}
              value={officerNotes}
              onChange={(e) => setOfficerNotes(e.target.value)}
              placeholder="Enter official reasoning and evidence items evaluated..."
              className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-600 focus:outline-hidden focus:border-blue-500 transition-colors font-sans"
            />
          </div>

          {/* Submit Decision Button */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-500">
              Signed by Officer Arjun Verma (OFC-2024-001)
            </span>
            <button
              onClick={handleDecisionSubmit}
              disabled={submittingDecision}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{submittingDecision ? 'RECORDING DECISION...' : 'SUBMIT DECISION'}</span>
            </button>
          </div>
        </div>

        {/* Audit Trail Timeline (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-sm font-semibold text-slate-100">Audit Trail & Chain of Custody</h3>
              <span className="text-[11px] font-mono text-slate-400">{currentCase.auditTrail?.length || 0} Events</span>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              {currentCase.auditTrail?.map((aud, i) => (
                <div key={aud.id || i} className="flex items-start gap-3 text-xs">
                  <div className="h-2 w-2 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200">{aud.action}</span>
                      <span className="font-mono text-[10px] text-slate-500">{aud.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{aud.detail}</p>
                    <span className="text-[9px] text-slate-500 font-mono">By: {aud.officer}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between">
            <button
              onClick={() => navigate('/reports')}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors"
            >
              <FileCheck2 className="h-3.5 w-3.5" />
              <span>Generate Case PDF Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title="Decision Recorded Successfully"
      >
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-slate-100 text-sm">Case #{currentCase.caseId} Updated</p>
              <p className="text-slate-300">Disposition logged to the National Border Registry.</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">DECISION:</span>
              <span className="font-bold text-slate-100">{selectedDecision}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">RECORDING OFFICER:</span>
              <span className="text-slate-200">Officer Arjun Verma</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">DIGITAL HASH:</span>
              <span className="font-mono text-[10px] text-slate-400">SHA256-9a4f...31c</span>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => {
                setConfirmModalOpen(false)
                navigate('/dashboard')
              }}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs cursor-pointer"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
