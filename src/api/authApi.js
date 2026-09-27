const delay = (ms = 300) => new Promise(r => setTimeout(r, ms))

export const loginOfficer = async (credentials) => {
  await delay(450)
  return {
    success: true,
    token: `jwt_mock_${Date.now()}`,
    officer: {
      id: 'OFC-2024-001',
      name: 'Arjun Verma',
      badge: 'B-7749',
      role: 'Border Security Officer',
      agency: 'Bureau of Immigration / MHA',
      terminal: 'Terminal 3 - Air Border Control',
      stationId: 'DEL-IGI-GATE4B',
      permissions: ['screen_documents', 'review_anomalies', 'submit_decisions', 'generate_reports', 'audit_access'],
    }
  }
}
