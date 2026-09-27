export default function StatCard({ title, value, subtitle, icon: Icon, color = 'blue', trend, onClick }) {
  const colorMap = {
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
    green: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
    amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
    red: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
    slate: { bg: 'bg-slate-800', text: 'text-slate-300', border: 'border-slate-700' },
  }

  const c = colorMap[color] || colorMap.blue

  return (
    <div
      onClick={onClick}
      className={`bg-slate-900 border border-slate-800 rounded-lg p-5 flex items-start justify-between relative overflow-hidden transition-all duration-150 ${onClick ? 'cursor-pointer hover:border-slate-700 hover:bg-slate-850' : ''}`}
    >
      <div>
        <p className="text-xs font-medium text-slate-400 tracking-wider uppercase">{title}</p>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-3xl font-bold font-mono text-slate-100">{value}</span>
          {trend && (
            <span className="text-xs text-emerald-400 font-medium">{trend}</span>
          )}
        </div>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>

      {Icon && (
        <div className={`p-2.5 rounded-lg border ${c.bg} ${c.text} ${c.border}`}>
          <Icon className="h-5 w-5" />
        </div>
      )}
    </div>
  )
}
