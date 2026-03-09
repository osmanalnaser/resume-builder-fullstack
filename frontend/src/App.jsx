import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import ResumeEditor from './pages/ResumeEditor'
import ProtectedRoute from './components/ProtectedRoute'
import PaymentPage from './pages/PaymentPage'
import TemplatesPage from './pages/TemplatesPage'
import VerifyEmailPage from './pages/VerifyEmailPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/resume/:id" element={
          <ProtectedRoute><ResumeEditor /></ProtectedRoute>
        } />
        <Route path="/payment" element={
          <ProtectedRoute><PaymentPage /></ProtectedRoute>
        } />
        <Route path="/payment/success" element={
          <ProtectedRoute><PaymentPage /></ProtectedRoute>
        } />
        <Route path="/payment/cancel" element={
          <ProtectedRoute><PaymentPage /></ProtectedRoute>
        } />
        <Route path="/templates" element={
          <TemplatesPage />
        } />
        <Route path="/verify-email" element={
          <VerifyEmailPage />
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App