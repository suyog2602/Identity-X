const delay = (ms = 1200) => new Promise(r => setTimeout(r, ms))

export const generatePdfReport = async (caseId) => {
  await delay(1500)
  return {
    success: true,
    reportId: `REP-${caseId}-${Math.floor(1000 + Math.random() * 9000)}`,
    filename: `IDENTITYX_FORENSIC_REPORT_${caseId}.pdf`,
    generatedAt: new Date().toISOString(),
    size: '1.8 MB',
    pages: 4,
    signoffOfficer: 'Officer Arjun Verma (Badge OFC-2024-001)',
  }
}
