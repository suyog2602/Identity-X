import { useState } from 'react'
import { FileText, Download, CheckCircle2, Shield, Printer, AlertTriangle } from 'lucide-react'
import { useCase } from '../contexts/CaseContext'
import { useToast } from '../components/ui/Toast'
import StatusBadge from '../components/ui/StatusBadge'
import RiskBadge from '../components/ui/RiskBadge'

export default function ReportsPage() {
  const { cases } = useCase()
  const { addToast } = useToast()
  const [selectedCaseId, setSelectedCaseId] = useState(cases[0]?.caseId || 'IX-20482')
  const [generating, setGenerating] = useState(false)
  const [generatedPdf, setGeneratedPdf] = useState(null)

  const currentCase = cases.find(c => c.caseId === selectedCaseId) || cases[0]

  const handleGeneratePdf = () => {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setGeneratedPdf({
        id: `RPT-${currentCase.caseId}-${Date.now().toString().slice(-4)}`,
        filename: `IDENTITYX_FORENSIC_REPORT_${currentCase.caseId}.pdf`,
        time: new Date().toLocaleTimeString(),
        size: '2.4 MB',
      })
      addToast({
        title: 'Report Generated Successfully',
        message: `Forensic dossier for Case #${currentCase.caseId} compiled into PDF.`,
        type: 'success',
      })
    }, 1200)
  }

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Case Investigation Report</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Formal forensic dossier and evidence report for judicial & immigration authorities
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedCaseId}
            onChange={(e) => {
              setSelectedCaseId(e.target.value)
              setGeneratedPdf(null)
            }}
            className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-hidden focus:border-blue-500 font-mono"
          >
            {cases.map(c => (
              <option key={c.caseId} value={c.caseId}>
                {c.caseId} — {c.person.displayName || c.person.name} ({c.risk.score}/100)
              </option>
            ))}
          </select>

          <button
            onClick={handleGeneratePdf}
            disabled={generating}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            {generating ? (
              <span>COMPILING PDF DOSSIER...</span>
            ) : (
              <>
                <FileText className="h-4 w-4" />
                <span>GENERATE PDF REPORT</span>
              </>
            )}
          </button>
        </div>
      </div>

      {generatedPdf && (
        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <div>
              <p className="text-xs font-semibold text-emerald-400">Report generated successfully</p>
              <p className="text-[11px] text-slate-300 font-mono">{generatedPdf.filename} • {generatedPdf.size} • Verified Digital Signature</p>
            </div>
          </div>
          <button
            onClick={() => {
              addToast({ title: 'Download Triggered', message: 'Downloading PDF dossier to your device.', type: 'info' })
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-xs transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      )}

      {/* Formal Printable Document Preview Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 max-w-4xl mx-auto shadow-2xl space-y-6">
        {/* Document Header */}
        <div className="flex items-start justify-between pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-100 tracking-wider">IDENTITY-X FORENSIC DOSSIER</h1>
              <p className="text-xs text-slate-400">Bureau of Immigration • Special Document Examination Unit</p>
            </div>
          </div>
          <div className="text-right font-mono text-[11px] text-slate-400 space-y-0.5">
            <div>CASE DOCKET: <span className="text-slate-100 font-bold">{currentCase.caseId}</span></div>
            <div>DATE: {new Date(currentCase.createdAt).toLocaleDateString()}</div>
            <div>CLASSIFICATION: <span className="text-amber-400 font-semibold">RESTRICTED / OFFICIAL</span></div>
          </div>
        </div>

        {/* Section 1: Person & Case Metadata */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            1. Subject Identification & Submitted Credentials
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px]">FULL LEGAL NAME</span>
              <span className="font-semibold text-slate-200">{currentCase.person.name}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">DATE OF BIRTH</span>
              <span className="font-mono text-slate-200">{currentCase.person.dobDisplay}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">NATIONALITY</span>
              <span className="text-slate-200">{currentCase.person.nationality}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">PASSPORT NUMBER</span>
              <span className="font-mono text-slate-200">{currentCase.person.passportNumber}</span>
            </div>
          </div>
        </div>

        {/* Section 2: AI Multi-Layer Analysis Summary */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            2. Multi-Layer Forensics Findings
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
              <span className="text-slate-500 text-[10px] block">OCR CONFIDENCE</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-base font-bold font-mono text-slate-100">{currentCase.ocr.percentageDisplay}</span>
                <StatusBadge status={currentCase.ocr.status} size="xs" />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
              <span className="text-slate-500 text-[10px] block">MRZ INTEGRITY</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-base font-bold font-mono text-slate-100">{currentCase.mrz.statusText}</span>
                <StatusBadge status={currentCase.mrz.status} size="xs" />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
              <span className="text-slate-500 text-[10px] block">TAMPERING PROBABILITY</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-base font-bold font-mono text-slate-100">{currentCase.forensics.percentageDisplay}</span>
                <StatusBadge status={currentCase.forensics.status} size="xs" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Evidence Breakdown */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            3. Accumulated Evidence Contributions
          </h4>
          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
            {currentCase.risk.breakdown?.map((b, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-slate-850 last:border-0">
                <span className="text-slate-300">{b.factor}</span>
                <span className="font-mono font-bold text-amber-400">+{b.contribution} pts</span>
              </div>
            ))}
            <div className="pt-2 flex items-center justify-between text-xs font-bold text-slate-100">
              <span>Total Evidence Anomaly Index:</span>
              <span className="font-mono text-base text-red-400">{currentCase.risk.score} / 100</span>
            </div>
          </div>
        </div>

        {/* Section 4: Officer Decision & Audit Record */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            4. Officer Disposition & Digital Sign-off
          </h4>
          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Official Finding:</span>
              <StatusBadge status={currentCase.status} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Executing Officer:</span>
              <span className="text-slate-200 font-semibold">{currentCase.officer} (Badge OFC-2024-001)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Officer Notes:</span>
              <span className="text-slate-300 italic">{currentCase.decision?.notes || 'Secondary biometric and forensic examination required before clearance.'}</span>
            </div>
          </div>
        </div>

        {/* Ethical Footer Notice */}
        <p className="text-[10px] text-slate-500 text-center italic pt-4 border-t border-slate-800">
          IDENTITY-X is an evidence-correlation decision support system. Final legal determinations of admissibility remain with the authorized immigration officer under the Foreigners Act.
        </p>
      </div>
    </div>
  )
}
