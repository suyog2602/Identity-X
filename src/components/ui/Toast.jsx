import { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(({ title, message, type = 'info', duration = 4000 }) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, title, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const icons = {
    success: CheckCircle2,
    warning: AlertTriangle,
    error: AlertCircle,
    info: Info,
  }

  const styles = {
    success: 'bg-slate-900 border-emerald-500/40 text-emerald-400',
    warning: 'bg-slate-900 border-amber-500/40 text-amber-400',
    error: 'bg-slate-900 border-red-500/40 text-red-400',
    info: 'bg-slate-900 border-blue-500/40 text-blue-400',
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map(toast => {
          const Icon = icons[toast.type] || Info
          return (
            <div
              key={toast.id}
              className={`pointer-events-auto p-4 rounded-lg border shadow-xl flex items-start gap-3 fade-in ${styles[toast.type] || styles.info}`}
            >
              <Icon className="h-5 w-5 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                {toast.title && (
                  <p className="text-sm font-semibold text-slate-100">{toast.title}</p>
                )}
                <p className="text-xs text-slate-300 mt-0.5">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-500 hover:text-slate-300 p-0.5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
