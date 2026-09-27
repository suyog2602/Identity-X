import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ShieldAlert, Plus, Radio } from 'lucide-react'
import { useCase } from '../../contexts/CaseContext'

export default function Topbar() {
  const [query, setQuery] = useState('')
  const [time, setTime] = useState('')
  const navigate = useNavigate()
  const { cases } = useCase()

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    const q = query.trim().toLowerCase()
    const found = cases.find(c =>
      c.caseId.toLowerCase().includes(q) ||
      c.person.name.toLowerCase().includes(q) ||
      c.person.passportNumber.toLowerCase().includes(q)
    )
    if (found) {
      navigate(`/investigation/${found.caseId}`)
    } else {
      navigate(`/case-history?search=${encodeURIComponent(query)}`)
    }
  }

  return (
    <header className="h-14 bg-slate-950 border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30 shrink-0">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="relative w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Case ID (e.g. IX-20482), Name, or Passport..."
          className="w-full pl-9 pr-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-blue-500 transition-colors"
        />
      </form>

      {/* Operational Metadata & Actions */}
      <div className="flex items-center gap-4 text-xs">
        {/* Terminal Station info */}
        <div className="hidden lg:flex items-center gap-2 text-slate-400 font-mono text-[11px] border-r border-slate-800 pr-4">
          <span className="text-slate-500">STATION:</span>
          <span className="text-slate-200 font-semibold">DEL-IGI-T3 GATE 4B</span>
        </div>

        {/* Live Clock */}
        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-slate-300 border-r border-slate-800 pr-4">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{time} IST</span>
        </div>

        {/* System Status Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-medium text-[11px]">
          <Radio className="h-3 w-3" />
          <span>Operational</span>
        </div>

        {/* Quick New Screening Button */}
        <button
          onClick={() => navigate('/new-screening')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-xs transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Screening</span>
        </button>
      </div>
    </header>
  )
}
