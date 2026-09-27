import { useState } from 'react'
import { Network, AlertTriangle, ArrowRight, ShieldCheck, FileCheck, Layers } from 'lucide-react'
import { useCase } from '../contexts/CaseContext'

export default function IdentityIntelligencePage() {
  const { cases } = useCase()
  const [selectedCaseId, setSelectedCaseId] = useState('IX-20482')

  const currentCase = cases.find(c => c.caseId === selectedCaseId) || cases[0]

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Identity Intelligence & Graph Correlation</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Cross-document attribute graph and relational discrepancy mapping
          </p>
        </div>

        <select
          value={selectedCaseId}
          onChange={(e) => setSelectedCaseId(e.target.value)}
          className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 font-mono"
        >
          {cases.map(c => (
            <option key={c.caseId} value={c.caseId}>
              {c.caseId} — {c.person.displayName || c.person.name}
            </option>
          ))}
        </select>
      </div>

      {/* Visual Relationship Graph View */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 relative overflow-hidden">
        <div className="text-center mb-8">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">RELATIONAL GRAPH VIEW</span>
          <h3 className="text-sm font-bold text-slate-100 mt-1">Cross-Document Attribute Mapping</h3>
        </div>

        {/* Node Visualization Diagram */}
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          {/* Central Root Entity Node */}
          <div className="p-4 rounded-xl bg-blue-600/15 border-2 border-blue-500/50 text-center shadow-lg w-64 relative z-10">
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider block">SUBJECT ROOT ENTITY</span>
            <span className="text-sm font-bold text-slate-100 mt-0.5 block">{currentCase.person.name}</span>
            <span className="text-[10px] text-slate-400 font-mono">Passport: {currentCase.person.passportNumber}</span>
          </div>

          {/* Connector SVG Lines */}
          <div className="w-full h-16 relative">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <line x1="50%" y1="0%" x2="16%" y2="100%" stroke="#334155" strokeWidth="2" strokeDasharray="4" />
              <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#334155" strokeWidth="2" />
              <line x1="50%" y1="0%" x2="84%" y2="100%" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
            </svg>
          </div>

          {/* Document Child Nodes */}
          <div className="grid grid-cols-3 gap-6 w-full text-center">
            {/* Passport Node */}
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 shadow-md">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide block">PASSPORT</span>
              <span className="text-xs font-mono font-bold text-emerald-400 mt-1 block">DOB: 1998</span>
              <span className="text-[10px] text-slate-500">P9876543 (India)</span>
            </div>

            {/* Visa Node */}
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 shadow-md">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide block">VISA DOCKET</span>
              <span className="text-xs font-mono font-bold text-emerald-400 mt-1 block">DOB: 1998</span>
              <span className="text-[10px] text-slate-500">Schengen Entry</span>
            </div>

            {/* National ID Node */}
            <div className={`p-4 rounded-lg bg-slate-950 border ${currentCase.identityConsistency.consistent ? 'border-slate-800' : 'border-red-500/50 bg-red-500/5'} shadow-md relative`}>
              {!currentCase.identityConsistency.consistent && (
                <span className="absolute -top-2.5 right-2 px-1.5 py-0.5 rounded bg-red-500 text-white font-mono text-[9px] font-bold">
                  CONFLICT
                </span>
              )}
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide block">NATIONAL ID</span>
              <span className={`text-xs font-mono font-bold mt-1 block ${currentCase.identityConsistency.consistent ? 'text-emerald-400' : 'text-red-400'}`}>
                DOB: {currentCase.identityConsistency.consistent ? '1990' : '1996'}
              </span>
              <span className="text-[10px] text-slate-500">Civil Database</span>
            </div>
          </div>
        </div>

        {/* Anomaly Explanation Box */}
        <div className="mt-8 p-4 rounded-lg bg-slate-950/80 border border-slate-800 max-w-2xl mx-auto">
          <div className="flex items-start gap-3">
            <AlertTriangle className={`h-5 w-5 shrink-0 mt-0.5 ${currentCase.identityConsistency.consistent ? 'text-emerald-400' : 'text-amber-400'}`} />
            <div>
              <p className="text-xs font-semibold text-slate-200">Cross-Document Correlation Assessment</p>
              <p className="text-xs text-slate-400 mt-1">
                {currentCase.identityConsistency.explanation}
              </p>
              {!currentCase.identityConsistency.consistent && (
                <div className="mt-2 text-[11px] text-amber-300 font-mono">
                  Discrepancy: Subject records indicate birth year 1996 on National Identity register while travel credentials declare 1998.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
