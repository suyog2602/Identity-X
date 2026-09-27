const delay = (ms = 350) => new Promise(r => setTimeout(r, ms))

export const getDashboardStats = async () => {
  await delay(200)
  return {
    screeningsToday: 128,
    casesRequiringReview: 14,
    highAnomalyCases: 5,
    systemStatus: 'Operational',
    avgProcessingTime: '2.4s',
    gateId: 'IGI-T3-4B',
  }
}

export const createCase = async (casePayload) => {
  await delay(400)
  const caseId = `IX-${Math.floor(20500 + Math.random() * 500)}`
  return {
    caseId,
    status: 'PROCESSING',
    createdAt: new Date().toISOString(),
  }
}
