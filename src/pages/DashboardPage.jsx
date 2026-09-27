import { useNavigate } from 'react-router-dom'
import {
  Users,
  AlertTriangle,
  ShieldAlert,
  Activity,
  ArrowUpRight,
  Scan,
  ShieldCheck,
  FileCheck2,
  Clock,
  ChevronRight,
} from 'lucide-react'
import { useCase } from '../contexts/CaseContext'
import StatCard from '../components/ui/StatCard'
import StatusBadge from '../components/ui/StatusBadge'
import RiskBadge from '../components/ui/RiskBadge'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts'

export default function DashboardPage() {
  const { cases } = useCase()
  const navigate = useNavigate()

  // Screening volume chart mock data
  const hourlyData = [
    { time: '06:00', total: 12, anomaly: 0 },
    { time: '07:00', total: 24, anomaly: 1 },
    { time: '08:00', total: 42, anomaly: 2 },
    { time: '09:00', total: 38, anomaly: 1 },
    { time: '10:00', total: 54, anomaly: 4 },
    { time: '11:00', total: 30, anomaly: 1 },
  ]

  const riskDistribution = [
    { category: 'Low (0-20)', count: 98, fill: '#10b981' },
    { category: 'Medium (21-60)', count: 21, fill: '#f59e0b' },
    { category: 'High (61-100)', count: 9, fill: '#ef4444' },
  ]

  return (
    <div className="space-y-6 fade-in">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Good morning, Officer</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Identity Screening & Risk Monitoring • Terminal Gate 4B Active Inspection
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/new-screening')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
          >
            <Scan className="h-4 w-4" />
            <span>Launch New Screening</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Screenings Today"
          value="128"
          subtitle="+14% vs yesterday"
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Cases Requiring Review"
          value="14"
          subtitle="Awaiting officer decision"
          icon={AlertTriangle}
          color="amber"
          onClick={() => navigate('/active-cases')}
        />
        <StatCard
          title="High Anomaly Cases"
          value="5"
          subtitle="Risk score > 60/100"
          icon={ShieldAlert}
          color="red"
          onClick={() => navigate('/active-cases')}
        />
        <StatCard
          title="System Status"
          value="Operational"
          subtitle="Avg inference: 2.4s"
          icon={Activity}
          color="green"
          onClick={() => navigate('/system-status')}
        />
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Throughput Area Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-100">Today's Inspection Throughput</h3>
              <p className="text-xs text-slate-400">Total travelers screened vs anomalies flagged per hour</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-blue-400">
                <span className="h-2 w-2 rounded-full bg-blue-500" /> Total Screened
              </span>
              <span className="flex items-center gap-1.5 text-red-400">
                <span className="h-2 w-2 rounded-full bg-red-500" /> Anomaly Flagged
              </span>
            </div>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorAnomaly" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
                <Area type="monotone" dataKey="anomaly" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorAnomaly)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Anomaly Distribution Bar Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
          <h3 className="text-sm font-semibold text-slate-100 mb-1">Risk Score Distribution</h3>
          <p className="text-xs text-slate-400 mb-4">Traveler risk categorization breakdown</p>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskDistribution} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <XAxis type="number" stroke="#64748b" fontSize={10} />
                <YAxis dataKey="category" type="category" stroke="#64748b" fontSize={10} width={80} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Screenings Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-100">Recent Screenings</h3>
            <p className="text-xs text-slate-400">Click any screening docket to inspect full evidence file</p>
          </div>
          <button
            onClick={() => navigate('/case-history')}
            className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors"
          >
            <span>View All Records</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Screenings Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-3">Case ID</th>
                <th className="px-6 py-3">Person</th>
                <th className="px-6 py-3">Documents</th>
                <th className="px-6 py-3">Risk Score</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {cases.slice(0, 6).map((c) => {
                const docText = Array.isArray(c.documents)
                  ? c.documents.map(d => typeof d === 'string' ? d : d.type).join(' + ')
                  : 'Passport'

                return (
                  <tr
                    key={c.caseId}
                    onClick={() => navigate(`/investigation/${c.caseId}`)}
                    className="hover:bg-slate-850/80 cursor-pointer transition-colors group"
                  >
                    <td className="px-6 py-3.5 font-mono font-semibold text-blue-400">
                      {c.caseId}
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="font-medium text-slate-100">{c.person.displayName || c.person.name}</div>
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
                    <td className="px-6 py-3.5 text-slate-400 font-mono text-[11px]">
                      {c.time || '10:42'}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <span className="inline-flex items-center gap-1 text-slate-400 group-hover:text-blue-400 font-medium transition-colors">
                        <span>Investigate</span>
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
