import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Upload,
  Camera,
  CheckCircle2,
  Trash2,
  ArrowRight,
  Shield,
  FileText,
  User,
  Scan,
  RefreshCw,
  Sparkles,
} from 'lucide-react'
import { useCase } from '../contexts/CaseContext'
import { useToast } from '../components/ui/Toast'

export default function NewScreeningPage() {
  const navigate = useNavigate()
  const { addNewCase } = useCase()
  const { addToast } = useToast()

  const [currentStep, setCurrentStep] = useState(1) // 1: Documents, 2: Identity/Camera

  // Uploaded files state
  const [documents, setDocuments] = useState({
    passport: { name: 'Passport_Rohan_Mehta.pdf', size: '2.4 MB', uploaded: true, type: 'Passport' },
    visa: { name: 'Schengen_Visa_2023.jpg', size: '1.8 MB', uploaded: true, type: 'Visa' },
    nationalId: { name: 'National_Identity_Aadhaar.pdf', size: '1.1 MB', uploaded: true, type: 'National ID' },
    drivingLicense: null,
  })

  // Camera state
  const [cameraActive, setCameraActive] = useState(false)
  const [faceCaptured, setFaceCaptured] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)

  // Step 1: Document Upload Handlers
  const handleFileUpload = (docKey, e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setDocuments(prev => ({
      ...prev,
      [docKey]: {
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploaded: true,
        type: docKey === 'nationalId' ? 'National ID' : docKey.charAt(0).toUpperCase() + docKey.slice(1),
      }
    }))
    addToast({
      title: 'Document Ingested',
      message: `${file.name} uploaded and parsed for OCR zone detection.`,
      type: 'success',
    })
  }

  const handleRemoveDoc = (docKey) => {
    setDocuments(prev => ({ ...prev, [docKey]: null }))
  }

  // Pre-load Demo Package
  const handleLoadDemoPackage = (type) => {
    if (type === 'rohan') {
      setDocuments({
        passport: { name: 'Passport_Rohan_Mehta.pdf', size: '2.4 MB', uploaded: true, type: 'Passport' },
        visa: { name: 'Schengen_Visa_2023.jpg', size: '1.8 MB', uploaded: true, type: 'Visa' },
        nationalId: { name: 'National_Identity_Aadhaar.pdf', size: '1.1 MB', uploaded: true, type: 'National ID' },
        drivingLicense: null,
      })
      addToast({
        title: 'Demo Dossier Loaded',
        message: 'Loaded Rohan Mehta documents (Passport + Visa + National ID).',
        type: 'info',
      })
    } else {
      setDocuments({
        passport: { name: 'Passport_Rahul_Sharma.pdf', size: '2.1 MB', uploaded: true, type: 'Passport' },
        visa: { name: 'UK_Business_Visa.jpg', size: '1.4 MB', uploaded: true, type: 'Visa' },
        nationalId: null,
        drivingLicense: null,
      })
      addToast({
        title: 'Demo Dossier Loaded',
        message: 'Loaded Rahul Sharma clean credentials (Passport + Visa).',
        type: 'info',
      })
    }
  }

  // Camera capture simulation
  const handleStartCamera = () => {
    setCameraActive(true)
    setFaceCaptured(false)
  }

  const handleCaptureFace = () => {
    setIsCapturing(true)
    setTimeout(() => {
      setIsCapturing(false)
      setFaceCaptured(true)
      addToast({
        title: 'Biometric Face Captured',
        message: 'Liveness test passed (99.4%). Quality score: 92%.',
        type: 'success',
      })
    }, 900)
  }

  // Launch AI Screening
  const handleStartScreening = () => {
    const caseId = 'IX-20482' // links to high anomaly showcase
    navigate(`/processing/${caseId}`)
  }

  return (
    <div className="space-y-6 fade-in max-w-5xl mx-auto">
      {/* Step Progress Stepper */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-100">Initiate Identity Screening</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Multi-layer document ingestion and live biometric verification docket
            </p>
          </div>

          {/* Quick Demo Pre-fill */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 font-mono">DEMO PRE-FILL:</span>
            <button
              onClick={() => handleLoadDemoPackage('rohan')}
              className="px-2.5 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-colors cursor-pointer"
            >
              Rohan (Anomaly)
            </button>
            <button
              onClick={() => handleLoadDemoPackage('rahul')}
              className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors cursor-pointer"
            >
              Rahul (Clean)
            </button>
          </div>
        </div>

        {/* 4-Step Indicator */}
        <div className="grid grid-cols-4 gap-2 mt-6">
          {[
            { num: 1, label: 'Documents', active: currentStep === 1, done: currentStep > 1 },
            { num: 2, label: 'Identity', active: currentStep === 2, done: false },
            { num: 3, label: 'AI Analysis', active: false, done: false },
            { num: 4, label: 'Results', active: false, done: false },
          ].map(s => (
            <div
              key={s.num}
              className={`p-3 rounded-lg border transition-all ${
                s.active
                  ? 'bg-blue-600/15 border-blue-500 text-blue-400 shadow-sm'
                  : s.done
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`h-5 w-5 rounded-full text-xs font-bold flex items-center justify-center ${
                  s.active ? 'bg-blue-600 text-white' : s.done ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {s.done ? '✓' : s.num}
                </span>
                <span className="text-xs font-semibold">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: DOCUMENTS UPLOAD CARDS */}
      {currentStep === 1 && (
        <div className="space-y-6 fade-in">
          <div>
            <h3 className="text-sm font-semibold text-slate-100">Step 1 — Document Ingestion</h3>
            <p className="text-xs text-slate-400">
              Upload physical or scanned travel credentials for optical decomposition and ICAO compliance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: 'passport', title: 'Passport (Primary)', required: true },
              { key: 'visa', title: 'Visa Document', required: false },
              { key: 'nationalId', title: 'National Identity Card', required: false },
              { key: 'drivingLicense', title: 'Driving License', required: false },
            ].map(doc => {
              const docState = documents[doc.key]
              return (
                <div
                  key={doc.key}
                  className={`p-5 rounded-xl border transition-all ${
                    docState
                      ? 'bg-slate-900 border-blue-500/40'
                      : 'bg-slate-950 border-slate-800 border-dashed hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FileText className={`h-4 w-4 ${docState ? 'text-blue-400' : 'text-slate-500'}`} />
                      <span className="text-xs font-semibold text-slate-200">{doc.title}</span>
                      {doc.required && (
                        <span className="text-[10px] text-red-400 font-mono font-bold">*REQUIRED</span>
                      )}
                    </div>
                    {docState && (
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>INGESTED</span>
                      </span>
                    )}
                  </div>

                  {docState ? (
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <div className="min-w-0 pr-3">
                          <p className="text-xs font-medium text-slate-200 truncate">{docState.name}</p>
                          <p className="text-[11px] text-slate-400 font-mono mt-0.5">{docState.size} • Verified Format</p>
                        </div>
                        <button
                          onClick={() => handleRemoveDoc(doc.key)}
                          className="p-1.5 rounded text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Mock mini document preview */}
                      <div className="h-20 rounded-md bg-slate-950/80 border border-slate-800 p-2 flex items-center gap-3">
                        <div className="h-14 w-12 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 text-[9px] font-mono shrink-0">
                          DOC
                        </div>
                        <div className="text-[10px] text-slate-400 space-y-0.5">
                          <div>STATUS: <span className="text-emerald-400 font-semibold">ICAO 9303 Formatted</span></div>
                          <div>OCR ZONES: <span className="text-slate-200 font-mono">6 Detected</span></div>
                          <div>RESOLUTION: <span className="text-slate-200 font-mono">600 DPI</span></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center p-6 rounded-lg bg-slate-900/40 hover:bg-slate-900/80 cursor-pointer transition-colors border border-slate-800/80">
                      <Upload className="h-6 w-6 text-slate-500 mb-2" />
                      <span className="text-xs font-medium text-slate-300">Click to Browse or Drag & Drop</span>
                      <span className="text-[10px] text-slate-500 mt-1">PDF, JPG, PNG up to 25MB</span>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(doc.key, e)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              )
            })}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => {
                if (!documents.passport) {
                  addToast({ title: 'Passport Required', message: 'Please upload at least a primary Passport.', type: 'warning' })
                  return
                }
                setCurrentStep(2)
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
            >
              <span>Continue to Identity Verification</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: IDENTITY VERIFICATION & LIVE CAMERA */}
      {currentStep === 2 && (
        <div className="space-y-6 fade-in">
          <div>
            <h3 className="text-sm font-semibold text-slate-100">Step 2 — Person Biometric Verification</h3>
            <p className="text-xs text-slate-400">
              Correlate parsed document identity against real-time live biometric capture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Document Identity Information */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                <User className="h-4 w-4 text-blue-400" />
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Document Identity Information
                </h4>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">NAME:</span>
                  <span className="font-bold text-slate-100">ROHAN MEHTA</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">DOB:</span>
                  <span className="font-mono font-bold text-slate-100">12 May 1998</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">NATIONALITY:</span>
                  <span className="font-bold text-slate-100">Indian</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">GENDER:</span>
                  <span className="font-bold text-slate-100">Male</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">PASSPORT NO:</span>
                  <span className="font-mono font-bold text-blue-400">P9876543</span>
                </div>
              </div>
            </div>

            {/* Right: Camera-style face verification panel */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-blue-400" />
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Live Biometric Capture
                    </h4>
                  </div>
                  {faceCaptured && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                      CAPTURED
                    </span>
                  )}
                </div>

                {/* Simulated Camera Viewfinder */}
                <div className="relative h-64 rounded-lg bg-slate-950 border-2 border-slate-800 overflow-hidden flex flex-col items-center justify-center">
                  {cameraActive ? (
                    <>
                      {/* Viewfinder Reticle */}
                      <div className={`relative h-44 w-36 rounded-full border-2 border-dashed ${
                        faceCaptured ? 'border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-blue-400 animate-pulse'
                      } flex flex-col items-center justify-center`}>
                        <User className={`h-24 w-24 ${faceCaptured ? 'text-emerald-400' : 'text-slate-600'}`} />

                        {/* Scanner Beam Animation */}
                        {!faceCaptured && (
                          <div className="absolute inset-x-0 h-0.5 bg-blue-400 shadow-[0_0_8px_#3b82f6] scanner-line" />
                        )}
                      </div>

                      <div className="absolute bottom-3 text-center">
                        <span className="text-[11px] font-medium text-slate-300 bg-slate-900/90 px-3 py-1 rounded-full border border-slate-700">
                          {faceCaptured ? 'Face biometric registered' : 'Position face inside frame'}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-6">
                      <Camera className="h-10 w-10 text-slate-600 mx-auto mb-2" />
                      <p className="text-xs text-slate-400">Border Gate Terminal Camera Inactive</p>
                      <button
                        onClick={handleStartCamera}
                        className="mt-3 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                      >
                        START CAMERA
                      </button>
                    </div>
                  )}
                </div>

                {/* Biometric Scores after capture */}
                {faceCaptured && (
                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 block">QUALITY</span>
                      <span className="text-base font-bold font-mono text-emerald-400">92%</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 block">LIVENESS</span>
                      <span className="text-base font-bold font-mono text-emerald-400">PASS</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="pt-4 flex items-center justify-between gap-3 border-t border-slate-800 mt-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Back to Documents
                </button>

                {cameraActive && !faceCaptured && (
                  <button
                    onClick={handleCaptureFace}
                    disabled={isCapturing}
                    className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer shadow-md"
                  >
                    {isCapturing ? 'CAPTURING...' : 'CAPTURE FACE'}
                  </button>
                )}

                {faceCaptured && (
                  <button
                    onClick={handleStartScreening}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer shadow-md"
                  >
                    <span>START SCREENING</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
