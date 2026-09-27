import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('identityx_auth') === 'true'
  })

  const [officer, setOfficer] = useState(() => {
    const saved = localStorage.getItem('identityx_officer')
    return saved ? JSON.parse(saved) : {
      id: 'OFC-2024-001',
      name: 'Arjun Verma',
      badge: 'B-7749',
      role: 'Border Security Officer',
      agency: 'Bureau of Immigration / MHA',
      terminal: 'Terminal 3 - Air Border Control',
      stationId: 'DEL-IGI-GATE4B',
      permissions: ['screen_documents', 'review_anomalies', 'submit_decisions', 'generate_reports', 'audit_access'],
    }
  })

  const login = useCallback(async (officerId, password) => {
    // For demo purposes: any reasonable credentials log in
    const officerData = {
      id: officerId || 'OFC-2024-001',
      name: 'Arjun Verma',
      badge: 'B-7749',
      role: 'Border Security Officer',
      agency: 'Bureau of Immigration / MHA',
      terminal: 'Terminal 3 - Air Border Control',
      stationId: 'DEL-IGI-GATE4B',
      permissions: ['screen_documents', 'review_anomalies', 'submit_decisions', 'generate_reports', 'audit_access'],
    }
    setIsAuthenticated(true)
    setOfficer(officerData)
    localStorage.setItem('identityx_auth', 'true')
    localStorage.setItem('identityx_officer', JSON.stringify(officerData))
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    localStorage.removeItem('identityx_auth')
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, officer, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
