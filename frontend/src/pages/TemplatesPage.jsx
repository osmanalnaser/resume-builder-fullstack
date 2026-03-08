import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const API_BASE = 'https://resume-builder-fullstack-production.up.railway.app'

const templates = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Clean and professional. Perfect for corporate roles.',
    isPremium: false,
    accent: '#C9A84C',
    preview: {
      headerBg: '#fff',
      headerColor: '#1a1a1a',
      accentColor: '#C9A84C',
      layout: 'single',
    }
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Bold sidebar layout for senior professionals.',
    isPremium: true,
    accent: '#1a1a2e',
    preview: {
      headerBg: '#1a1a2e',
      headerColor: '#fff',
      accentColor: '#C9A84C',
      layout: 'sidebar',
    }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Ultra-clean design with elegant typography.',
    isPremium: true,
    accent: '#2d2d2d',
    preview: {
      headerBg: '#fff',
      headerColor: '#2d2d2d',
      accentColor: '#888',
      layout: 'minimal',
    }
  },
]

// ── Template Preview Card ─────────────────────────────────────────────────────
function TemplateCard({ template, isPremiumUser, onSelect }) {
  const [hovered, setHovered] = useState(false)
  const locked = template.isPremium && !isPremiumUser
  const navigate = useNavigate()

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered && !locked ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 16, overflow: 'hidden',
        background: '#111', cursor: locked ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s',
        transform: hovered && !locked ? 'translateY(-4px)' : 'none',
        boxShadow: hovered && !locked ? '0 20px 60px rgba(0,0,0,0.5)' : 'none',
        position: 'relative',
      }}
    >
      {/* Premium Badge */}
      {template.isPremium && (
        <div style={{
          position: 'absolute', top: '1rem', right: '1rem', zIndex: 10,
          background: locked ? 'rgba(0,0,0,0.7)' : '#C9A84C',
          color: locked ? '#C9A84C' : '#0A0A0A',
          border: locked ? '1px solid rgba(201,168,76,0.3)' : 'none',
          borderRadius: 100, padding: '0.25rem 0.75rem',
          fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
          {locked ? '🔒 Premium' : '⭐ Premium'}
        </div>
      )}

      {/* Free Badge */}
      {!template.isPremium && (
        <div style={{
          position: 'absolute', top: '1rem', right: '1rem', zIndex: 10,
          background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)',
          borderRadius: 100, padding: '0.25rem 0.75rem',
          fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em',
          color: '#4ade80', textTransform: 'uppercase',
        }}>Free</div>
      )}

      {/* Resume Preview */}
      <div style={{
        height: 260, padding: '1.25rem',
        background: locked ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.03)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        filter: locked ? 'blur(1px) brightness(0.6)' : 'none',
        transition: 'filter 0.3s',
      }}>
        <TemplatePreview template={template} />
      </div>

      {/* Lock Overlay */}
      {locked && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 260,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '0.75rem',
        }}>
          <div style={{ fontSize: '2rem' }}>🔒</div>
          <button onClick={() => navigate('/payment')} style={{
            background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
            border: 'none', borderRadius: 6, cursor: 'pointer',
            color: '#0A0A0A', fontSize: '0.8rem', fontWeight: 700,
            padding: '0.5rem 1.25rem', letterSpacing: '0.05em',
          }}>Upgrade to Unlock</button>
        </div>
      )}

      {/* Info */}
      <div style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.2rem', color: '#E8E8E8', margin: 0,
          }}>{template.name}</h3>
        </div>
        <p style={{ color: '#555', fontSize: '0.82rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
          {template.description}
        </p>
        <button
          onClick={() => !locked && onSelect(template.id)}
          disabled={locked}
          style={{
            width: '100%', padding: '0.7rem',
            background: locked ? 'rgba(255,255,255,0.04)' : 'linear-gradient(135deg, #C9A84C, #E8C97A)',
            border: locked ? '1px solid rgba(255,255,255,0.08)' : 'none',
            borderRadius: 8, cursor: locked ? 'not-allowed' : 'pointer',
            color: locked ? '#444' : '#0A0A0A',
            fontSize: '0.82rem', fontWeight: 700,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            transition: 'all 0.2s',
          }}
        >{locked ? 'Premium Only' : 'Use This Template'}</button>
      </div>
    </div>
  )
}

// ── Mini Preview ──────────────────────────────────────────────────────────────
function TemplatePreview({ template }) {
  const { preview } = template

  if (preview.layout === 'sidebar') {
    return (
      <div style={{ display: 'flex', height: '100%', gap: 0, borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
        {/* Sidebar */}
        <div style={{ width: '35%', background: preview.headerBg, padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: preview.accentColor, opacity: 0.8, marginBottom: 4 }} />
          {[70, 55, 80, 45, 65].map((w, i) => (
            <div key={i} style={{ height: 4, width: `${w}%`, background: 'rgba(255,255,255,0.2)', borderRadius: 3 }} />
          ))}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '4px 0' }} />
          {[60, 75, 50].map((w, i) => (
            <div key={i} style={{ height: 4, width: `${w}%`, background: preview.accentColor, opacity: 0.5, borderRadius: 3 }} />
          ))}
        </div>
        {/* Main */}
        <div style={{ flex: 1, background: '#fff', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ height: 6, width: '70%', background: '#1a1a1a', borderRadius: 3 }} />
          <div style={{ height: 4, width: '45%', background: preview.accentColor, borderRadius: 3, marginBottom: 4 }} />
          {[100, 80, 90, 65, 85, 70, 75, 60].map((w, i) => (
            <div key={i} style={{ height: 3, width: `${w}%`, background: i % 4 === 0 ? '#ddd' : '#eee', borderRadius: 2 }} />
          ))}
        </div>
      </div>
    )
  }

  if (preview.layout === 'minimal') {
    return (
      <div style={{ background: '#fff', height: '100%', padding: '1rem', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ height: 7, width: '50%', background: '#2d2d2d', borderRadius: 3, marginBottom: 6 }} />
        <div style={{ height: 3, width: '30%', background: '#bbb', borderRadius: 2, marginBottom: 12 }} />
        <div style={{ height: 1, background: '#e5e5e5', marginBottom: 10 }} />
        {[85, 70, 90, 60, 80, 55, 75, 65, 50, 70].map((w, i) => (
          <div key={i} style={{ height: 3, width: `${w}%`, background: i % 5 === 0 ? '#ccc' : '#efefef', borderRadius: 2, marginBottom: 5 }} />
        ))}
      </div>
    )
  }

  // Classic (default)
  return (
    <div style={{ background: '#fff', height: '100%', padding: '1rem', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ height: 8, width: '55%', background: '#1a1a1a', borderRadius: 3, marginBottom: 4 }} />
      <div style={{ height: 4, width: '35%', background: preview.accentColor, borderRadius: 2, marginBottom: 3 }} />
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        {[40, 35, 45].map((w, i) => (
          <div key={i} style={{ height: 3, width: w, background: '#ccc', borderRadius: 2 }} />
        ))}
      </div>
      <div style={{ height: 2, background: preview.accentColor, marginBottom: 8, opacity: 0.6 }} />
      {[90, 75, 85, 60, 80, 55, 70, 65, 50, 75].map((w, i) => (
        <div key={i} style={{ height: 3, width: `${w}%`, background: i % 4 === 0 ? '#ddd' : '#efefef', borderRadius: 2, marginBottom: 5 }} />
      ))}
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function TemplatesPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [creating, setCreating] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [title, setTitle] = useState('')
  const isPremiumUser = user?.subscriptionPlan === 'premium'

  const handleSelect = (templateId) => {
    if (!user) {
        navigate('/')  // zur Landing Page – dort kann er sich einloggen
        return
    }
    setSelectedTemplate(templateId)
    setShowModal(true)
  }

  const handleCreate = async () => {
    if (!title.trim()) return
    setCreating(true)
    try {
      const res = await axios.post(`${API_BASE}/resumes`, {
        title,
        templateId: selectedTemplate,
      })
      navigate(`/resume/${res.data._id}`)
    } catch (err) {
      console.error('Failed to create resume', err)
    } finally {
      setCreating(false)
    }
  }

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>

      {/* Navbar */}
      <nav style={{
        padding: '1.25rem 3rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(201,168,76,0.1)',
        background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 100,
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
          cursor: 'pointer', fontSize: '0.85rem', transition: 'color 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
          onMouseLeave={e => e.currentTarget.style.color = '#555'}
        >← Dashboard</button>
      </nav>

      {/* Header */}
      <div style={{ textAlign: 'center', padding: '5rem 3rem 3rem' }}>
        <p style={{ fontSize: '0.75rem', color: '#C9A84C', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Choose Your Style
        </p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300,
          color: '#E8E8E8', marginBottom: '1rem',
        }}>
          Resume <em style={{ color: '#C9A84C' }}>Templates</em>
        </h1>
        <p style={{ color: '#555', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
          Choose from our professionally designed templates. Free templates available for everyone, premium templates require an upgrade.
        </p>

        {/* Plan Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          marginTop: '1.5rem', padding: '0.4rem 1rem',
          border: `1px solid ${isPremiumUser ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: 100, background: isPremiumUser ? 'rgba(201,168,76,0.05)' : 'transparent',
        }}>
          <span style={{ fontSize: '0.75rem', color: isPremiumUser ? '#C9A84C' : '#555' }}>
            {isPremiumUser ? '⭐ Premium Plan' : '○ Free Plan'}
          </span>
          {!isPremiumUser && (
            <button onClick={() => navigate('/payment')} style={{
              background: 'none', border: 'none', color: '#C9A84C',
              fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline',
            }}>Upgrade</button>
          )}
        </div>
      </div>

      {/* Templates Grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2rem', maxWidth: 1000, margin: '0 auto', padding: '0 3rem 6rem',
      }}>
        {templates.map(template => (
          <TemplateCard
            key={template.id}
            template={template}
            isPremiumUser={isPremiumUser}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }} onClick={() => setShowModal(false)}>
          <div style={{
            background: '#111', border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: 16, padding: '2.5rem', width: 420, position: 'relative',
          }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.75rem', color: '#E8E8E8', marginBottom: '0.5rem' }}>
              Name Your Resume
            </h2>
            <p style={{ color: '#555', fontSize: '0.85rem', marginBottom: '2rem' }}>
              Using the <span style={{ color: '#C9A84C', textTransform: 'capitalize' }}>{selectedTemplate}</span> template
            </p>

            <label style={{ display: 'block', color: '#888', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Resume Title</label>
            <input
              autoFocus
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCreate()}
              placeholder="e.g. Software Engineer Resume"
              style={{
                width: '100%', padding: '0.75rem 1rem', marginBottom: '1.5rem',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8, color: '#E8E8E8', fontSize: '0.9rem', outline: 'none',
                boxSizing: 'border-box',
              }}
            />

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setShowModal(false)} style={{
                flex: 1, padding: '0.875rem',
                background: 'none', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8, color: '#555', cursor: 'pointer', fontSize: '0.875rem',
              }}>Cancel</button>
              <button onClick={handleCreate} disabled={creating || !title.trim()} style={{
                flex: 2, padding: '0.875rem',
                background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
                border: 'none', borderRadius: 8, color: '#0A0A0A',
                fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer',
                opacity: !title.trim() ? 0.5 : 1,
              }}>{creating ? 'Creating...' : 'Create Resume'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}