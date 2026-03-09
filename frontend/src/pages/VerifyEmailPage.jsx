import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_BASE = 'https://resume-builder-fullstack-production.up.railway.app/api'

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState('verifying')
  const navigate = useNavigate()

  useEffect(() => {
    const token = searchParams.get('token')
    if (!token) { setStatus('error'); return }

    axios.get(`${API_BASE}/auth/verify-email?token=${token}`)
      .then(() => {
        setStatus('success')
        setTimeout(() => navigate('/'), 3000)
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', background:'#0A0A0A', color:'white', fontFamily:'sans-serif' }}>
      {status === 'verifying' && <p>Verifying your email...</p>}
      {status === 'success' && <p style={{color:'#C9A84C'}}>✓ Email verified! Redirecting to login...</p>}
      {status === 'error' && <p style={{color:'red'}}>✗ Invalid or expired token.</p>}
    </div>
  )
}