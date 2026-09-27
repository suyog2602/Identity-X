import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Lock, User, CheckCircle2, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../components/ui/Toast'

export default function LoginPage() {
  const [officerId, setOfficerId] = useState('OFC-2024-001')
  const [password, setPassword] = useState('••••••••••••')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(officerId, password)
      addToast({
        title: 'Authentication Successful',
        message: 'Welcome back, Officer Arjun Verma. Terminal Gate 4B session active.',
        type: 'success',
      })
      navigate('/dashboard')
    } catch (err) {
      addToast({
        title: 'Login Error',
        message: 'Could not authenticate officer credentials.',
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Center Portal Box */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl relative z-10 fade-in">
        {/* Header Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-blue-600/15 border border-blue-500/40 text-blue-400 mb-3 shadow-lg">
            <Shield className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-wider text-slate-100">IDENTITY-X</h1>
          <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">
            AI-Powered Identity & Document Forensics
          </p>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mt-3 rounded-full bg-slate-800 border border-slate-700 text-[11px] text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Border Control Node: DELHI-IGI-T3</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 tracking-wide">
              OFFICER ID / EMAIL
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                required
                value={officerId}
                onChange={(e) => setOfficerId(e.target.value)}
                placeholder="e.g. OFC-2024-001"
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-600 focus:outline-hidden focus:border-blue-500 transition-colors font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 tracking-wide">
              PASSWORD
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-600 focus:outline-hidden focus:border-blue-500 transition-colors font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>AUTHENTICATING...</span>
            ) : (
              <>
                <span>SIGN IN TO CONSOLE</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Security / Status Footer */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>System: Operational</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>FIPS 140-2 Compliant</span>
          </div>
        </div>
      </div>

      <div className="mt-4 text-[11px] text-slate-500 tracking-wide text-center">
        Prototype Demonstration Edition • Authorized Border Personnel Only
      </div>
    </div>
  )
}
