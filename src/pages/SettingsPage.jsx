import { useState } from 'react'
import { User, Shield, Sliders, Bell, Check, Save } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../components/ui/Toast'

export default function SettingsPage() {
  const { officer } = useAuth()
  const { addToast } = useToast()

  const [mrzSensitivity, setMrzSensitivity] = useState(95)
  const [tamperThreshold, setTamperThreshold] = useState(70)
  const [faceThreshold, setFaceThreshold] = useState(75)

  const handleSave = (e) => {
    e.preventDefault()
    addToast({
      title: 'Configuration Saved',
      message: 'Inspection sensitivity thresholds and officer profile updated.',
      type: 'success',
    })
  }

  return (
    <div className="space-y-6 fade-in max-w-4xl">
      <div className="pb-2 border-b border-slate-800">
        <h2 className="text-xl font-bold text-slate-100">System Configuration & Profile</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Border Security Officer credentials, detection sensitivity, and operational parameters
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Officer Profile Card */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            <User className="h-4 w-4 text-blue-400" />
            <span>Officer Credentials</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">OFFICER NAME</label>
              <input
                type="text"
                disabled
                value={officer?.name || 'Arjun Verma'}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-medium"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">BADGE NUMBER</label>
              <input
                type="text"
                disabled
                value={officer?.id || 'OFC-2024-001'}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">ROLE / APPOINTMENT</label>
              <input
                type="text"
                disabled
                value={officer?.role || 'Border Security Officer'}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-medium"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">INSPECTION POST</label>
              <input
                type="text"
                disabled
                value="DEL-IGI-T3 Gate 4B"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-medium"
              />
            </div>
          </div>
        </div>

        {/* AI Detection Threshold Sliders */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            <Sliders className="h-4 w-4 text-blue-400" />
            <span>Forensic Engine Sensitivity</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300 font-medium">MRZ Checksum Strictness</span>
                <span className="font-mono text-blue-400">{mrzSensitivity}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={mrzSensitivity}
                onChange={(e) => setMrzSensitivity(e.target.value)}
                className="w-full accent-blue-600"
              />
              <p className="text-[11px] text-slate-500 mt-0.5">Tolerance for font deformation in machine-readable zone.</p>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300 font-medium">Tamper Anomaly Detection Sensitivity</span>
                <span className="font-mono text-blue-400">{tamperThreshold}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="95"
                value={tamperThreshold}
                onChange={(e) => setTamperThreshold(e.target.value)}
                className="w-full accent-blue-600"
              />
              <p className="text-[11px] text-slate-500 mt-0.5">Threshold for triggering Error Level Analysis (ELA) suspicious region bounding boxes.</p>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300 font-medium">Face Biometric Similarity Warning Limit</span>
                <span className="font-mono text-blue-400">{faceThreshold}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="90"
                value={faceThreshold}
                onChange={(e) => setFaceThreshold(e.target.value)}
                className="w-full accent-blue-600"
              />
              <p className="text-[11px] text-slate-500 mt-0.5">Matches below this threshold are flagged with a WARNING badge for secondary review.</p>
            </div>
          </div>
        </div>

        {/* Assigned Officer Permissions */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
          <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-400" />
            <span>Authorized Officer Permissions</span>
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Check className="h-4 w-4 text-emerald-400" />
              <span>Document Screening</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Check className="h-4 w-4 text-emerald-400" />
              <span>Case Investigation & Triage</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Check className="h-4 w-4 text-emerald-400" />
              <span>Official Decision Submissions</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Check className="h-4 w-4 text-emerald-400" />
              <span>Forensic PDF Report Generation</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-colors cursor-pointer"
        >
          <Save className="h-4 w-4" />
          <span>SAVE SYSTEM PREFERENCES</span>
        </button>
      </form>
    </div>
  )
}
