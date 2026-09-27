import { NavLink, useNavigate } from 'react-router-dom'
import {
  Shield,
  LayoutDashboard,
  Scan,
  AlertCircle,
  History,
  FileText,
  Network,
  Activity,
  Settings,
  LogOut,
  UserCheck,
  BadgeAlert,
  Presentation,
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useCase } from '../../contexts/CaseContext'

export default function Sidebar() {
  const { officer, logout } = useAuth()
  const { setActiveDemoCaseId } = useCase()
  const navigate = useNavigate()

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'New Screening', icon: Scan, path: '/new-screening' },
    { label: 'Active Cases', icon: AlertCircle, path: '/active-cases' },
    { label: 'Case History', icon: History, path: '/case-history' },
    { label: 'Reports', icon: FileText, path: '/reports' },
    { label: 'Identity Intelligence', icon: Network, path: '/identity-intelligence' },
    { label: 'SIH Presentation / PPT', icon: Presentation, path: '/pitch-deck' },
    { label: 'System Status', icon: Activity, path: '/system-status' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ]

  const handleSelectDemo = (caseId) => {
    setActiveDemoCaseId(caseId)
    navigate(`/investigation/${caseId}`)
  }

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col h-screen shrink-0 sticky top-0 select-none">
      {/* Brand Header */}
      <div className="px-5 py-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950">
        <div className="h-9 w-9 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
          <Shield className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-bold text-sm text-slate-100 tracking-wider">IDENTITY-X</h1>
            <span className="text-[10px] font-mono font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1 rounded">PRO</span>
          </div>
          <p className="text-[10px] text-slate-400 tracking-tight">AI Identity & Document Forensics</p>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-3 py-3 overflow-y-auto space-y-1">
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-1">
          Navigation
        </div>

        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-xs'
                  : 'text-slate-300 hover:text-slate-100 hover:bg-slate-900 border border-transparent'
              }`
            }
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}

        {/* Demo Mode Showcase Card */}
        <div className="pt-4 pb-2">
          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                DEMO MODE
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Quick Switch</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2">
              Inspect prepared realistic border screening cases:
            </p>

            <div className="space-y-1.5">
              <button
                onClick={() => handleSelectDemo('IX-20481')}
                className="w-full text-left px-2.5 py-1.5 rounded border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/15 text-slate-200 hover:border-emerald-500/40 text-[11px] transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <UserCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span className="font-medium truncate">Demo 1: Rahul Sharma</span>
                </div>
                <span className="font-mono text-[10px] text-emerald-400 shrink-0">7/100</span>
              </button>

              <button
                onClick={() => handleSelectDemo('IX-20482')}
                className="w-full text-left px-2.5 py-1.5 rounded border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-slate-200 hover:border-red-500/50 text-[11px] transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <BadgeAlert className="h-3.5 w-3.5 text-red-400 shrink-0" />
                  <span className="font-medium truncate">Demo 2: Rohan Mehta</span>
                </div>
                <span className="font-mono text-[10px] text-red-400 shrink-0">78/100</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Officer Profile & Logout */}
      <div className="p-3 border-t border-slate-800 bg-slate-950">
        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <p className="text-xs font-semibold text-slate-100 truncate">
              {officer?.name || 'Officer Arjun Verma'}
            </p>
            <p className="text-[10px] text-slate-400 truncate">
              {officer?.role || 'Border Security Officer'}
            </p>
            <p className="text-[9px] font-mono text-blue-400 truncate">
              {officer?.id || 'OFC-2024-001'}
            </p>
          </div>
          <button
            onClick={logout}
            title="Log out of system"
            className="p-1.5 rounded-md text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
