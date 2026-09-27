import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { CaseProvider } from './contexts/CaseContext'
import { ToastProvider } from './components/ui/Toast'
import DashboardLayout from './layouts/DashboardLayout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import NewScreeningPage from './pages/NewScreeningPage'
import ProcessingPage from './pages/ProcessingPage'
import InvestigationPage from './pages/InvestigationPage'
import CaseHistoryPage from './pages/CaseHistoryPage'
import ReportsPage from './pages/ReportsPage'
import IdentityIntelligencePage from './pages/IdentityIntelligencePage'
import SystemStatusPage from './pages/SystemStatusPage'
import SettingsPage from './pages/SettingsPage'
import ActiveCasesPage from './pages/ActiveCasesPage'
import PresentationPage from './pages/PresentationPage'

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  const { isAuthenticated } = useAuth()
  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="new-screening" element={<NewScreeningPage />} />
        <Route path="processing/:caseId" element={<ProcessingPage />} />
        <Route path="investigation/:caseId" element={<InvestigationPage />} />
        <Route path="active-cases" element={<ActiveCasesPage />} />
        <Route path="case-history" element={<CaseHistoryPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="identity-intelligence" element={<IdentityIntelligencePage />} />
        <Route path="pitch-deck" element={<PresentationPage />} />
        <Route path="system-status" element={<SystemStatusPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CaseProvider>
          <ToastProvider>
            <AppRoutes />
          </ToastProvider>
        </CaseProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
