import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_BASE = 'http://localhost:8080/api'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [showNewModal, setShowNewModal] = useState(false)
  const [newTitle, setNewTitle] = useState('')

  useEffect(() => {
    fetchResumes()
  }, [])

  const fetchResumes = async () => {
    try {
      const res = await axios.get(`${API_BASE}/resumes`)
      setResumes(res.data)
    } catch (err) {
      console.error('Failed to fetch resumes', err)
    } finally {
      setLoading(false)
    }
  }

  const createResume = async () => {
    if (!newTitle.trim()) return
    setCreating(true)
    try {
      const res = await axios.post(`${API_BASE}/resumes`, { title: newTitle })
      setResumes([...resumes, res.data])
      setShowNewModal(false)
      setNewTitle('')
      navigate(`/resume/${res.data._id}`)
    } catch (err) {
      console.error('Failed to create resume', err)
    } finally {
      setCreating(false)
    }
  }

  const deleteResume = async (id) => {
    try {
      await axios.delete(`${API_BASE}/resumes/${id}`)
      setResumes(resumes.filter(r => r._id !== id))
    } catch (err) {
      console.error('Failed to delete resume', err)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {user?.profileImageUrl ? (
              <img src={user.profileImageUrl} alt="avatar" style={{
                width: 34, height: 34, borderRadius: '50%',
                border: '2px solid rgba(201,168,76,0.3)', objectFit: 'cover'
              }} />
            ) : (
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.85rem', fontWeight: 700, color: '#0A0A0A'
              }}>{user?.name?.[0]?.toUpperCase() || 'U'}</div>
            )}
            <div>
              <div style={{ color: '#E8E8E8', fontSize: '0.85rem', fontWeight: 500 }}>{user?.name}</div>
              <div style={{
                fontSize: '0.7rem', color: user?.subscriptionPlan === 'premium' ? '#C9A84C' : '#555',
                textTransform: 'uppercase', letterSpacing: '0.08em'
              }}>{user?.subscriptionPlan || 'free'}</div>
            </div>
          </div>
          
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        {user?.subscriptionPlan !== 'premium' && (
            <button onClick={() => navigate('/payment')} style={{
            background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
            border: 'none', borderRadius: 6, padding: '0.5rem 1rem',
            color: '#0A0A0A', fontSize: '0.8rem', fontWeight: 700,
            cursor: 'pointer', letterSpacing: '0.05em',
            }}>⭐ Upgrade</button>
        )}
        <button onClick={handleLogout} style={{
            background: 'none', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 6, padding: '0.5rem 1rem',
            color: '#555', fontSize: '0.8rem', cursor: 'pointer',
            transition: 'all 0.2s',
        }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,80,80,0.3)'; e.currentTarget.style.color = '#ff6b6b' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#555' }}
        >Logout</button>
        </div>
        </div>
      </nav>

      {/* Main */}
      <main style={{ padding: '3rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <p style={{ color: '#555', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              My Workspace
            </p>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '2.5rem', fontWeight: 400, color: '#E8E8E8',
            }}>My Resumes</h1>
          </div>
          <button onClick={() => setShowNewModal(true)} style={{
            background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
            border: 'none', borderRadius: 8, cursor: 'pointer',
            color: '#0A0A0A', fontSize: '0.85rem', fontWeight: 700,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            padding: '0.875rem 2rem',
            boxShadow: '0 0 30px rgba(201,168,76,0.2)',
            transition: 'all 0.25s',
          }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 40px rgba(201,168,76,0.4)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 30px rgba(201,168,76,0.2)'}
          >+ New Resume</button>
        </div>

        {/* Resume Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem', color: '#555' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⟳</div>
            Loading your resumes...
          </div>
        ) : resumes.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '6rem 2rem',
            border: '1px dashed rgba(201,168,76,0.15)', borderRadius: 16,
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16,
              background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.75rem', margin: '0 auto 1.5rem',
            }}>📄</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: '#E8E8E8', marginBottom: '0.5rem' }}>
              No Resumes Yet
            </h3>
            <p style={{ color: '#444', marginBottom: '2rem', fontSize: '0.9rem' }}>
              Create your first professional resume
            </p>
            <button onClick={() => setShowNewModal(true)} style={{
              background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
              border: 'none', borderRadius: 8, cursor: 'pointer',
              color: '#0A0A0A', fontSize: '0.85rem', fontWeight: 700,
              padding: '0.75rem 2rem',
            }}>Create Your First Resume</button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {/* Add New Card */}
            <div onClick={() => setShowNewModal(true)} style={{
              border: '1px dashed rgba(201,168,76,0.2)', borderRadius: 12,
              padding: '2rem', cursor: 'pointer', minHeight: 200,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '0.75rem', transition: 'all 0.25s', background: 'transparent',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.background = 'rgba(201,168,76,0.03)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'; e.currentTarget.style.background = 'transparent' }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', color: '#C9A84C',
              }}>+</div>
              <span style={{ color: '#C9A84C', fontSize: '0.875rem' }}>New Resume</span>
            </div>

            {/* Resume Cards */}
            {resumes.map(resume => (
              <ResumeCard
                key={resume._id}
                resume={resume}
                onOpen={() => navigate(`/resume/${resume._id}`)}
                onDelete={() => deleteResume(resume._id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* New Resume Modal */}
      {showNewModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }} onClick={() => setShowNewModal(false)}>
          <div style={{
            background: '#111', border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: 16, padding: '2.5rem', width: 420, position: 'relative',
          }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.75rem', color: '#E8E8E8', marginBottom: '0.5rem' }}>
              New Resume
            </h2>
            <p style={{ color: '#555', fontSize: '0.85rem', marginBottom: '2rem' }}>Give your resume a title to get started</p>

            <label style={{ display: 'block', color: '#888', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Resume Title</label>
            <input
              autoFocus
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && createResume()}
              placeholder="e.g. Software Engineer Resume"
              style={{
                width: '100%', padding: '0.75rem 1rem', marginBottom: '1.5rem',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8, color: '#E8E8E8', fontSize: '0.9rem', outline: 'none',
                boxSizing: 'border-box',
              }}
            />

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setShowNewModal(false)} style={{
                flex: 1, padding: '0.875rem',
                background: 'none', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8, color: '#555', cursor: 'pointer', fontSize: '0.875rem',
              }}>Cancel</button>
              <button onClick={createResume} disabled={creating || !newTitle.trim()} style={{
                flex: 2, padding: '0.875rem',
                background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
                border: 'none', borderRadius: 8, color: '#0A0A0A',
                fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer',
                opacity: !newTitle.trim() ? 0.5 : 1,
              }}>{creating ? 'Creating...' : 'Create Resume'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Resume Card Komponente
function ResumeCard({ resume, onOpen, onDelete }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#111', border: `1px solid ${hovered ? 'rgba(201,168,76,0.25)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 12, overflow: 'hidden', cursor: 'pointer',
        transition: 'all 0.25s',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      {/* Preview */}
      <div onClick={onOpen} style={{
        height: 160, background: 'rgba(255,255,255,0.02)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '1rem', display: 'flex', flexDirection: 'column', gap: 6,
      }}>
        <div style={{ height: 8, width: '60%', background: 'rgba(201,168,76,0.3)', borderRadius: 4 }} />
        <div style={{ height: 5, width: '40%', background: 'rgba(255,255,255,0.08)', borderRadius: 4 }} />
        <div style={{ height: 1, background: 'rgba(201,168,76,0.1)', margin: '4px 0' }} />
        {[80, 65, 90, 55, 75].map((w, i) => (
          <div key={i} style={{ height: 4, width: `${w}%`, background: 'rgba(255,255,255,0.06)', borderRadius: 4 }} />
        ))}
      </div>

      {/* Info */}
      <div style={{ padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ color: '#E8E8E8', fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.2rem' }}>
            {resume.title}
          </div>
          <div style={{ color: '#444', fontSize: '0.75rem' }}>
            {new Date(resume.lastUpdated || resume.createdAt).toLocaleDateString()}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={onOpen} style={{
            background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: 6, padding: '0.4rem 0.75rem',
            color: '#C9A84C', fontSize: '0.75rem', cursor: 'pointer',
          }}>Edit</button>
          <button onClick={e => { e.stopPropagation(); onDelete() }} style={{
            background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.15)',
            borderRadius: 6, padding: '0.4rem 0.75rem',
            color: '#ff6b6b', fontSize: '0.75rem', cursor: 'pointer',
          }}>✕</button>
        </div>
      </div>
    </div>
  )
}