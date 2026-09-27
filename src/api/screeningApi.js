const delay = (ms = 400) => new Promise(r => setTimeout(r, ms))

export const PROCESSING_STAGES = [
  { id: 'classification', number: 1, title: 'Document Classification', duration: 750, description: 'Classifying document type, country of issue, and physical geometry against ICAO 9303 standards.' },
  { id: 'ocr', number: 2, title: 'OCR Extraction', duration: 1100, description: 'Extracting alphanumeric fields, optical zones, and font typographies with neural character models.' },
  { id: 'mrz', number: 3, title: 'MRZ Validation', duration: 650, description: 'Verifying Type-3 Machine Readable Zone lines, format rules, and mathematical checksum digits.' },
  { id: 'structure', number: 4, title: 'Document Structure Validation', duration: 700, description: 'Testing guilloche security patterns, UV fibers, micro-print resolution, and overlay continuity.' },
  { id: 'tamper', number: 5, title: 'Tamper Detection', duration: 1400, description: 'Executing Error Level Analysis (ELA), frequency domain noise variance, and localized text overlay checks.' },
  { id: 'face', number: 6, title: 'Face Verification', duration: 950, description: 'Evaluating 68-point biometric landmarks, live presentation attack resistance, and photo replacement seams.' },
  { id: 'identity', number: 7, title: 'Identity Consistency', duration: 800, description: 'Correlating extracted person attributes across all submitted documents to identify conflicting records.' },
  { id: 'risk', number: 8, title: 'Risk Analysis', duration: 850, description: 'Synthesizing evidence signals through the multi-layer risk weighting engine to determine anomaly score.' },
]

export const uploadDocumentMock = async (file, docType) => {
  await delay(600)
  return {
    id: `doc-${Date.now()}`,
    type: docType,
    name: file.name,
    size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: 'uploaded',
  }
}

export const captureLiveFaceMock = async () => {
  await delay(900)
  return {
    quality: 92,
    liveness: 'PASS',
    presentationAttackDetected: false,
    timestamp: new Date().toISOString(),
  }
}
