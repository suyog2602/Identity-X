export default function StatusBadge({ status, size = 'sm', showDot = true }) {
  const configs = {
    // Decision / Case Statuses
    CLEARED: { label: 'Cleared', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', dot: 'bg-emerald-400' },
    SECONDARY_INSPECTION: { label: 'Secondary Inspection', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', dot: 'bg-amber-400' },
    FURTHER_INVESTIGATION: { label: 'Further Investigation', bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', dot: 'bg-red-400' },
    REVIEW: { label: 'Under Review', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', dot: 'bg-blue-400' },
    PENDING: { label: 'Pending AI Analysis', bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/30', dot: 'bg-slate-400' },

    // Forensic Signals
    PASSED: { label: 'Passed', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', dot: 'bg-emerald-400' },
    PASS: { label: 'PASS', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', dot: 'bg-emerald-400' },
    WARNING: { label: 'Warning', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', dot: 'bg-amber-400' },
    ANOMALY: { label: 'Anomaly', bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', dot: 'bg-red-400' },
    MISMATCH: { label: 'Mismatch', bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', dot: 'bg-red-400' },
    VALID: { label: 'Valid', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', dot: 'bg-emerald-400' },
    MATCH: { label: 'Match', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', dot: 'bg-emerald-400' },
    SUSPICIOUS: { label: 'Suspicious', bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', dot: 'bg-red-400' },
    CONSISTENT: { label: 'Consistent', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', dot: 'bg-emerald-400' },
    CONFLICT: { label: 'Conflict Detected', bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', dot: 'bg-red-400' },

    // System
    OPERATIONAL: { label: 'Operational', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', dot: 'bg-emerald-400' },
    DEGRADED: { label: 'Degraded', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', dot: 'bg-amber-400' },
  }

  const key = String(status || '').toUpperCase()
  const c = configs[key] || { label: status || 'Unknown', bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/30', dot: 'bg-slate-400' }

  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm font-semibold',
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded border font-medium ${c.bg} ${c.text} ${c.border} ${sizeClasses[size] || sizeClasses.sm}`}>
      {showDot && <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />}
      <span>{c.label}</span>
    </span>
  )
}
