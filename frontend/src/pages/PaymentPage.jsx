import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const API_BASE = 'https://resume-builder-fullstack-production.up.railway.app/api'

export default function PaymentPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user, token } = useAuth()
  const [status, setStatus] = useState('idle') // idle | loading | verifying | success | error
  const [error, setError] = useState(null)

  // PayPal redirect zurück mit token & PayerID
  useEffect(() => {
    const paypalToken = searchParams.get('token')
    const payerId = searchParams.get('PayerID')

    if (paypalToken && payerId) {
      verifyPayment(paypalToken, payerId)
    }
  }, [searchParams])

  const createOrder = async () => {
    setStatus('loading')
    setError(null)
    try {
      const res = await axios.post(`${API_BASE}/payment/create-order`, {
        planType: 'premium'
      })
      // Zu PayPal weiterleiten
      window.location.href = res.data.approvalUrl
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create payment order')
      setStatus('error')
    }
  }

  const verifyPayment = async (paypalToken, payerId) => {
    setStatus('verifying')
    try {
      await axios.post(`${API_BASE}/payment/verify`, {
        paypalOrderId: paypalToken,
        paypalPaymentId: paypalToken,
        payerId: payerId,
      })
      setStatus('success')
    } catch (err) {
      setError(err.response?.data?.message || 'Payment verification failed')
      setStatus('error')
    }
  }

  // Success Screen
  if (status === 'success') {
    return (
      <div style={{
        background: '#0A0A0A', minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center', maxWidth: 480, padding: '2rem' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'rgba(74,222,128,0.1)', border: '2px solid rgba(74,222,128,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem', margin: '0 auto 1.5rem',
          }}>✓</div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2.5rem', color: '#E8E8E8', marginBottom: '0.75rem',
          }}>Payment Successful!</h1>
          <p style={{ color: '#666', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Welcome to <span style={{ color: '#C9A84C' }}>Premium</span>. You now have access to all templates and features.
          </p>
          <button onClick={() => navigate('/dashboard')} style={{
            background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
            border: 'none', borderRadius: 8, cursor: 'pointer',
            color: '#0A0A0A', fontSize: '0.9rem', fontWeight: 700,
            padding: '0.9rem 2.5rem', letterSpacing: '0.06em', textTransform: 'uppercase',
          }}>Go to Dashboard</button>
        </div>
      </div>
    )
  }

  // Verifying Screen
  if (status === 'verifying') {
    return (
      <div style={{
        background: '#0A0A0A', minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%',
            border: '3px solid rgba(201,168,76,0.2)',
            borderTop: '3px solid #C9A84C',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1.5rem',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.75rem', color: '#E8E8E8', marginBottom: '0.5rem' }}>
            Verifying Payment...
          </h2>
          <p style={{ color: '#555' }}>Please wait while we confirm your payment</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>

      {/* Navbar */}
      <nav style={{
        padding: '1.25rem 3rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(201,168,76,0.1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 700, color: '#0A0A0A'
          }}>R</div>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.3rem', fontWeight: 600, color: '#E8E8E8'
          }}>ResuméCraft</span>
        </div>
        <button onClick={() => navigate('/dashboard')} style={{
          background: 'none', border: 'none', color: '#555',
          cursor: 'pointer', fontSize: '0.85rem',
        }}>← Back to Dashboard</button>
      </nav>

      {/* Content */}
      <div style={{
        maxWidth: 900, margin: '0 auto',
        padding: '5rem 2rem',
        display: 'flex', gap: '3rem', alignItems: 'flex-start',
      }}>

        {/* Left – Info */}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '0.75rem', color: '#C9A84C', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Upgrade
          </p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '3rem', fontWeight: 300, color: '#E8E8E8',
            lineHeight: 1.1, marginBottom: '1.5rem',
          }}>
            Unlock <em style={{ color: '#C9A84C' }}>Premium</em><br />Features
          </h1>
          <p style={{ color: '#666', lineHeight: 1.8, marginBottom: '2.5rem' }}>
            Get access to all premium templates, advanced customization options, and priority support.
          </p>

          {/* Features List */}
          {[
            'All Premium Resume Templates',
            'Advanced Color & Font Customization',
            'Multiple Export Formats (PDF, Word)',
            'Priority Customer Support',
            'Unlimited Resume Storage',
            'Custom Branding Options',
          ].map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%',
                background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.7rem', color: '#C9A84C', flexShrink: 0,
              }}>✓</div>
              <span style={{ color: '#888', fontSize: '0.9rem' }}>{f}</span>
            </div>
          ))}
        </div>

        {/* Right – Payment Card */}
        <div style={{
          width: 360, flexShrink: 0,
          background: '#111', border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: 16, padding: '2rem',
          boxShadow: '0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,168,76,0.05)',
          position: 'sticky', top: '2rem',
        }}>
          {/* Price */}
          <div style={{ textAlign: 'center', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ color: '#555', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Premium Plan
            </div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '3.5rem', color: '#E8C97A', lineHeight: 1,
            }}>€9.99</div>
            <div style={{ color: '#555', fontSize: '0.8rem', marginTop: '0.25rem' }}>one-time payment</div>
          </div>

          {/* What you get */}
          <div style={{ marginBottom: '1.5rem' }}>
            {['All Templates Unlocked', 'Lifetime Access', 'No Hidden Fees'].map(f => (
              <div key={f} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.6rem' }}>
                <span style={{ color: '#C9A84C', fontSize: '0.75rem' }}>✓</span>
                <span style={{ color: '#888', fontSize: '0.85rem' }}>{f}</span>
              </div>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.2)',
              borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1.25rem',
              color: '#ff6b6b', fontSize: '0.82rem',
            }}>{error}</div>
          )}

          {/* PayPal Button */}
          <button onClick={createOrder} disabled={status === 'loading'} style={{
            width: '100%', padding: '1rem',
            background: status === 'loading' ? 'rgba(201,168,76,0.4)' : 'linear-gradient(135deg, #C9A84C, #E8C97A)',
            border: 'none', borderRadius: 10, cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            color: '#0A0A0A', fontSize: '0.9rem', fontWeight: 700,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            boxShadow: '0 0 30px rgba(201,168,76,0.25)',
            transition: 'all 0.25s', marginBottom: '1rem',
          }}
            onMouseEnter={e => { if (status !== 'loading') e.currentTarget.style.boxShadow = '0 0 50px rgba(201,168,76,0.45)' }}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 30px rgba(201,168,76,0.25)'}
          >
            {status === 'loading' ? 'Redirecting to PayPal...' : 'Pay with PayPal →'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
            <span style={{ color: '#333', fontSize: '0.75rem' }}>🔒</span>
            <span style={{ color: '#333', fontSize: '0.75rem' }}>Secured by PayPal</span>
          </div>
        </div>
      </div>
    </div>
  )
}