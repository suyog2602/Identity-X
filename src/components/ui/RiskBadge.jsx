export default function RiskBadge({ score = 0, level, size = 'md', showLevel = false }) {
  const getScheme = (s) => {
    if (s <= 25) {
      return {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        label: 'LOW ANOMALY',
      }
    }
    if (s <= 60) {
      return {
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
        label: 'MEDIUM ANOMALY',
      }
    }
    return {
      bg: 'bg-red-500/10',
      text: 'text-red-400',
      border: 'border-red-500/30',
      label: 'HIGH ANOMALY',
    }
  }

  const scheme = getScheme(score)

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded border font-mono font-medium ${scheme.bg} ${scheme.text} ${scheme.border} ${sizeClasses[size] || sizeClasses.md}`}>
      <span className="font-bold">{score}</span>
      <span className="opacity-60 text-[10px]">/100</span>
      {showLevel && (
        <span className="ml-1 text-[10px] font-sans font-semibold tracking-wider uppercase border-l border-current/30 pl-1.5">
          {level || scheme.label}
        </span>
      )}
    </span>
  )
}
