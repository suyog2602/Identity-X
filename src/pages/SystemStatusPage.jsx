import { useState } from 'react'
import { Activity, Server, Cpu, Database, Cloud, Key, CheckCircle2, RefreshCw } from 'lucide-react'

export default function SystemStatusPage() {
  const [refreshing, setRefreshing] = useState(false)

  const services = [
    { name: 'Node.js Core Gateway API', status: 'Operational', latency: '84 ms', uptime: '99.99%', icon: Server },
    { name: 'Python AI Forensic Pipeline', status: 'Operational', latency: '2.8 sec', uptime: '99.95%', icon: Cpu },
    { name: 'Neural OCR & Text Engine', status: 'Operational', latency: '1.2 sec', uptime: '99.98%', icon: Activity },
    { name: 'PostgreSQL Relational DB', status: 'Operational', latency: '14 ms', uptime: '100%', icon: Database },
    { name: 'Biometric Object Storage (S3)', status: 'Operational', latency: '42 ms', uptime: '99.99%', icon: Cloud },
    { name: 'ICAO PKD & Auth Service', status: 'Operational', latency: '65 ms', uptime: '99.97%', icon: Key },
  ]

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 600)
  }

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-100">System Infrastructure Health</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time telemetry of forensic inspection microservices & neural models
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium cursor-pointer transition-colors"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin text-blue-400' : ''}`} />
          <span>Refresh Health Check</span>
        </button>
      </div>

      {/* Main Operational Banner */}
      <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-emerald-400">ALL FORENSIC SERVICES OPERATIONAL</h3>
            <p className="text-xs text-slate-300">All 6 verification backends responding within SLA parameters.</p>
          </div>
        </div>
        <div className="text-right font-mono text-xs">
          <span className="text-slate-400 block text-[10px]">30-DAY SYSTEM UPTIME</span>
          <span className="text-base font-bold text-slate-100">99.98%</span>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(svc => (
          <div key={svc.name} className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-md bg-slate-800 text-blue-400">
                <svc.icon className="h-4 w-4" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {svc.status}
              </span>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-100">{svc.name}</h4>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2 pt-2 border-t border-slate-800/80">
                <span>Latency: <strong className="text-slate-200">{svc.latency}</strong></span>
                <span>Uptime: <strong className="text-slate-200">{svc.uptime}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
