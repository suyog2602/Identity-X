import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Shield, CheckCircle2, ArrowRight, Terminal } from 'lucide-react'
import LoadingSpinner from '../components/ui/LoadingSpinner'

export default function ProcessingPage() {
  const { caseId = 'IX-20482' } = useParams()
  const navigate = useNavigate()

  const stages = [
    { id: 1, label: 'Document Classification', log: 'Identified TD3 Machine Readable Passport (Republic of India).' },
    { id: 2, label: 'OCR Extraction', log: '6 primary text zones extracted with neural font classification.' },
    { id: 3, label: 'MRZ Validation', log: 'Comparing 2-line machine readable zone checksums and date hashes.' },
    { id: 4, label: 'Document Structure Validation', log: 'Evaluating ICAO 9303 layout, holographic overlay, and microprint.' },
    { id: 5, label: 'Tamper Detection', log: 'Running Error Level Analysis (ELA) and Fourier frequency noise decomposition.' },
    { id: 6, label: 'Face Verification', log: 'Correlating 68 facial landmarks between document photo and live probe.' },
    { id: 7, label: 'Identity Consistency', log: 'Cross-referencing civil database records and supplementary visa docket.' },
    { id: 8, label: 'Risk Analysis', log: 'Synthesizing evidence contributions into multi-layer anomaly index.' },
  ]

  const [activeStage, setActiveStage] = useState(1)
  const [completedStages, setCompletedStages] = useState([])
  const [logs, setLogs] = useState([])
  const [progress, setProgress] = useState(10)

  useEffect(() => {
    let current = 1
    setLogs([`[0.0s] Initializing forensic neural pipeline for Docket #${caseId}...`])

    const interval = setInterval(() => {
      if (current <= stages.length) {
        const stage = stages[current - 1]
        setCompletedStages(prev => [...prev, stage.id])
        setLogs(prev => [
          ...prev,
          `[${(current * 0.4).toFixed(1)}s] Layer ${stage.id} (${stage.label}): ${stage.log}`,
        ])
        setProgress(Math.min(100, Math.round((current / stages.length) * 100)))
        current += 1
        setActiveStage(current)
      } else {
        clearInterval(interval)
        setTimeout(() => {
          navigate(`/investigation/${caseId}`)
        }, 800)
      }
    }, 550)

    return () => clearInterval(interval)
  }, [caseId, navigate])

  const handleSkip = () => {
    navigate(`/investigation/${caseId}`)
  }

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6 fade-in">
      {/* Title & Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-blue-600/15 border border-blue-500/40 text-blue-400 mb-2">
          <Shield className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-100">Analyzing Identity</h2>
        <p className="text-xs text-slate-400">
          Multiple verification layers are being executed in parallel against forensic baselines.
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">PIPELINE EXECUTION:</span>
          <span className="text-blue-400 font-bold">{progress}% COMPLETED</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-emerald-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 8 Processing Stages Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
          {stages.map(st => {
            const isDone = completedStages.includes(st.id)
            const isCurrent = activeStage === st.id

            return (
              <div
                key={st.id}
                className={`p-3 rounded-lg border text-xs flex items-center justify-between transition-colors ${
                  isDone
                    ? 'bg-slate-950/60 border-emerald-500/30 text-slate-200'
                    : isCurrent
                    ? 'bg-blue-600/10 border-blue-500/50 text-blue-300'
                    : 'bg-slate-950/30 border-slate-800/60 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[11px] text-slate-500">{st.id}.</span>
                  <span className="font-medium">{st.label}</span>
                </div>

                {isDone ? (
                  <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Completed</span>
                  </span>
                ) : isCurrent ? (
                  <span className="text-blue-400 font-semibold text-[11px] flex items-center gap-1.5">
                    <LoadingSpinner size="sm" />
                    <span>Processing...</span>
                  </span>
                ) : (
                  <span className="text-slate-600 text-[11px]">Queued</span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Real-time Telemetry Terminal Logs */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-blue-400" />
            <span>AI Forensics Telemetry Stream</span>
          </span>
          <span className="text-[10px] font-mono text-slate-500">Node: DEL-IGI-T3-4B</span>
        </div>
        <div className="font-mono text-[11px] text-slate-300 space-y-1 h-28 overflow-y-auto pr-2">
          {logs.map((log, i) => (
            <div key={i} className="leading-relaxed">
              <span className="text-blue-400 font-semibold">{'>'}</span> {log}
            </div>
          ))}
        </div>
      </div>

      {/* Skip button for impatient reviewer */}
      <div className="flex justify-end">
        <button
          onClick={handleSkip}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 font-medium cursor-pointer"
        >
          <span>Skip to Investigation Results</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
