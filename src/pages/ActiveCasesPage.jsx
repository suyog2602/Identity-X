import { useNavigate } from 'react-router-dom'
import { AlertTriangle, ShieldAlert, ArrowRight, Eye, UserCheck } from 'lucide-react'
import { useCase } from '../contexts/CaseContext'
import RiskBadge from '../components/ui/RiskBadge'
import StatusBadge from '../components/ui/StatusBadge'

export default function ActiveCasesPage() {
  const { cases } = useCase()
  const navigate = useNavigate()

  // Cases that require review or have anomalies
  const activeCases = cases.filter(c => c.status !== 'CLEARED')

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Active Review Docket</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Cases flagged with anomalies or requiring officer decision
          </p>
        </div>
        <span className="px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          {activeCases.length} Pending Cases
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {activeCases.map((c) => {
          return (
            <div
              key={c.caseId}
              className="bg-slate-900 border border-slate-800 rounded-lg p-5 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-blue-400">{c.caseId}</span>
                  <RiskBadge score={c.risk.score} level={c.risk.level} />
                </div>

                <h3 className="text-base font-semibold text-slate-100 group-hover:text-blue-300 transition-colors">
                  {c.person.displayName || c.person.name}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Passport: {c.person.passportNumber} • {c.person.nationality}
                </p>

                <div className="my-3 py-2 border-y border-slate-800 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Recommendation:</span>
                    <span className="text-slate-200 font-medium">{c.risk.recommendation}</span>
                  </div>
                  {c.mrz.status === 'WARNING' && (
                    <div className="flex items-center gap-1.5 text-amber-400 text-[11px]">
                      <AlertTriangle className="h-3 w-3 shrink-0" />
                      <span className="truncate">{c.mrz.subtitle || 'MRZ mismatch detected'}</span>
                    </div>
                  )}
                  {c.forensics?.tamperingProbability > 0.5 && (
                    <div className="flex items-center gap-1.5 text-red-400 text-[11px]">
                      <ShieldAlert className="h-3 w-3 shrink-0" />
                      <span className="truncate">Tamper probability: {c.forensics.percentageDisplay}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <StatusBadge status={c.status} size="xs" />
                <button
                  onClick={() => navigate(`/investigation/${c.caseId}`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600/20 hover:bg-blue-600 border border-blue-500/40 text-blue-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                >
                  <span>Inspect Docket</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
