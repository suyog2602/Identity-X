import { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search, Filter, Download, ArrowUpRight } from 'lucide-react'
import { useCase } from '../contexts/CaseContext'
import StatusBadge from '../components/ui/StatusBadge'
import RiskBadge from '../components/ui/RiskBadge'

export default function CaseHistoryPage() {
  const { cases } = useCase()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const filterTabs = [
    { id: 'ALL', label: 'All Cases' },
    { id: 'LOW', label: 'Low Anomaly' },
    { id: 'MEDIUM', label: 'Medium Anomaly' },
    { id: 'HIGH', label: 'High Anomaly' },
    { id: 'CLEARED', label: 'Cleared' },
    { id: 'SECONDARY_INSPECTION', label: 'Secondary Inspection' },
    { id: 'FURTHER_INVESTIGATION', label: 'Further Investigation' },
  ]

  const filtered = useMemo(() => {
    return cases.filter(c => {
      const q = search.toLowerCase()
      const matchesSearch =
        c.caseId.toLowerCase().includes(q) ||
        c.person.name.toLowerCase().includes(q) ||
        c.person.passportNumber.toLowerCase().includes(q)

      if (!matchesSearch) return false

      if (statusFilter === 'ALL') return true
      if (statusFilter === 'LOW') return c.risk.score <= 25
      if (statusFilter === 'MEDIUM') return c.risk.score > 25 && c.risk.score <= 60
      if (statusFilter === 'HIGH') return c.risk.score > 60
      return c.status === statusFilter
    })
  }, [cases, search, statusFilter])

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Inspection Case History</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Permanent immigration and identity screening audit repository
          </p>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Total Archived Records: {cases.length}
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Case ID, Person Name, or Passport No..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Case Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-3">Case ID</th>
                <th className="px-6 py-3">Person</th>
                <th className="px-6 py-3">Documents</th>
                <th className="px-6 py-3">Risk</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Assigned Officer</th>
                <th className="px-6 py-3">Timestamp</th>
                <th className="px-6 py-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map(c => {
                const docText = Array.isArray(c.documents)
                  ? c.documents.map(d => typeof d === 'string' ? d : d.type).join(', ')
                  : 'Passport'

                return (
                  <tr
                    key={c.caseId}
                    onClick={() => navigate(`/investigation/${c.caseId}`)}
                    className="hover:bg-slate-850 cursor-pointer transition-colors group"
                  >
                    <td className="px-6 py-3.5 font-mono font-semibold text-blue-400">
                      {c.caseId}
                    </td>
                    <td className="px-6 py-3.5 font-medium text-slate-100">
                      <div>{c.person.displayName || c.person.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{c.person.passportNumber} • {c.person.nationality}</div>
                    </td>
                    <td className="px-6 py-3.5 text-slate-300">
                      {docText}
                    </td>
                    <td className="px-6 py-3.5">
                      <RiskBadge score={c.risk.score} level={c.risk.level} />
                    </td>
                    <td className="px-6 py-3.5">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-6 py-3.5 text-slate-300">
                      {c.officer}
                    </td>
                    <td className="px-6 py-3.5 text-slate-400 font-mono text-[11px]">
                      {new Date(c.createdAt).toLocaleDateString()} {c.time}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <span className="inline-flex items-center gap-1 text-slate-400 group-hover:text-blue-400 transition-colors">
                        <span>View</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
