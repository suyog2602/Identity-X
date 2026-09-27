import { createContext, useContext, useState, useCallback } from 'react'
import { initialMockCases } from '../data/mockCases'

const CaseContext = createContext(null)

export function CaseProvider({ children }) {
  const [cases, setCases] = useState(() => {
    const saved = localStorage.getItem('identityx_cases')
    return saved ? JSON.parse(saved) : initialMockCases
  })

  // Selected demo case ID ('IX-20482' for Rohan Mehta or 'IX-20481' for Rahul Sharma)
  const [activeDemoCaseId, setActiveDemoCaseId] = useState('IX-20482')

  const getCaseById = useCallback((caseId) => {
    return cases.find(c => c.caseId === caseId) || cases[0]
  }, [cases])

  const submitOfficerDecision = useCallback((caseId, decisionData) => {
    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const isoStr = now.toISOString()

    const actionDisplays = {
      CLEAR: 'Cleared for Entry',
      SECONDARY_INSPECTION: 'Secondary Inspection Assigned',
      FURTHER_INVESTIGATION: 'Referred for Further Investigation',
    }

    const statusMap = {
      CLEAR: 'CLEARED',
      SECONDARY_INSPECTION: 'SECONDARY_INSPECTION',
      FURTHER_INVESTIGATION: 'FURTHER_INVESTIGATION',
    }

    setCases(prev => {
      const updated = prev.map(c => {
        if (c.caseId !== caseId) return c

        const newDecision = {
          action: decisionData.action,
          decisionDisplay: actionDisplays[decisionData.action] || decisionData.action,
          officer: decisionData.officer || 'Officer Arjun Verma',
          timestamp: isoStr,
          notes: decisionData.notes || '',
        }

        const newAuditEntry = {
          id: `aud-${Date.now()}`,
          time: timeStr,
          timestamp: isoStr,
          officer: decisionData.officer || 'Officer Arjun Verma',
          action: `Officer Decision: ${decisionData.action}`,
          detail: `${actionDisplays[decisionData.action]} — Notes: "${decisionData.notes || 'None provided'}"`,
        }

        return {
          ...c,
          status: statusMap[decisionData.action] || c.status,
          statusDisplay: actionDisplays[decisionData.action] || c.statusDisplay,
          decision: newDecision,
          auditTrail: [...(c.auditTrail || []), newAuditEntry],
        }
      })

      try {
        localStorage.setItem('identityx_cases', JSON.stringify(updated))
      } catch (e) {}

      return updated
    })

    return Promise.resolve({ success: true })
  }, [])

  const addNewCase = useCallback((newCase) => {
    setCases(prev => {
      const updated = [newCase, ...prev]
      try {
        localStorage.setItem('identityx_cases', JSON.stringify(updated))
      } catch (e) {}
      return updated
    })
  }, [])

  const resetToDefaults = useCallback(() => {
    setCases(initialMockCases)
    localStorage.removeItem('identityx_cases')
  }, [])

  return (
    <CaseContext.Provider value={{
      cases,
      activeDemoCaseId,
      setActiveDemoCaseId,
      getCaseById,
      submitOfficerDecision,
      addNewCase,
      resetToDefaults,
    }}>
      {children}
    </CaseContext.Provider>
  )
}

export function useCase() {
  const ctx = useContext(CaseContext)
  if (!ctx) throw new Error('useCase must be used within CaseProvider')
  return ctx
}
