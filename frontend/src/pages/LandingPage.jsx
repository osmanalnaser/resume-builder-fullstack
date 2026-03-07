import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

// ── Navbar ──────────────────────────────────────────────────────────────────
function Navbar({ onLogin, onRegister }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '1.25rem 3rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      transition: 'all 0.4s ease',
      background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, fontWeight: 700, color: '#0A0A0A'
        }}>R</div>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.3rem', fontWeight: 600, letterSpacing: '0.05em',
          color: '#E8E8E8'
        }}>ResuméCraft</span>
      </div>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: '2.5rem' }}>
       {['Features', 'Pricing'].map(item => (
        <a key={item} href={`#${item.toLowerCase()}`} style={{
          color: '#888', fontSize: '0.85rem', letterSpacing: '0.08em',
          textTransform: 'uppercase', textDecoration: 'none',
          transition: 'color 0.2s',
        }}
          onMouseEnter={e => e.target.style.color = '#C9A84C'}
          onMouseLeave={e => e.target.style.color = '#888'}
        >{item}</a>
      ))}
      <Link to="/templates" style={{
        color: '#888', fontSize: '0.85rem', letterSpacing: '0.08em',
        textTransform: 'uppercase', textDecoration: 'none',
        transition: 'color 0.2s',
      }}
        onMouseEnter={e => e.target.style.color = '#C9A84C'}
        onMouseLeave={e => e.target.style.color = '#888'}
      >Templates</Link>
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button onClick={onLogin} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#888', fontSize: '0.85rem', letterSpacing: '0.05em',
          transition: 'color 0.2s',
        }}
          onMouseEnter={e => e.target.style.color = '#E8E8E8'}
          onMouseLeave={e => e.target.style.color = '#888'}
        >Sign In</button>
        <button onClick={onRegister} style={{
          background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
          border: 'none', cursor: 'pointer',
          color: '#0A0A0A', fontSize: '0.8rem', fontWeight: 600,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '0.6rem 1.5rem', borderRadius: 4,
          transition: 'opacity 0.2s, transform 0.2s',
        }}
          onMouseEnter={e => { e.target.style.opacity = '0.85'; e.target.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)' }}
        >Get Started</button>
      </div>
    </nav>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ onRegister }) {
  return (
    <section style={{
      minHeight: '100vh', position: 'relative',
      display: 'flex', alignItems: 'center',
      padding: '0 3rem', overflow: 'hidden',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%',
        transform: 'translateX(-50%)',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 700 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          border: '1px solid rgba(201,168,76,0.3)',
          borderRadius: 100, padding: '0.4rem 1rem',
          marginBottom: '2rem',
          background: 'rgba(201,168,76,0.05)',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A84C', display: 'inline-block' }} />
          <span style={{ fontSize: '0.75rem', color: '#C9A84C', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Trusted by 50,000+ professionals
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(3rem, 7vw, 5.5rem)',
          fontWeight: 300, lineHeight: 1.05,
          letterSpacing: '-0.02em', marginBottom: '1.5rem',
          color: '#E8E8E8',
        }}>
          Build Your<br />
          <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>Dream Resume</em><br />
          in Minutes
        </h1>

        <p style={{
          fontSize: '1.05rem', color: '#888', lineHeight: 1.8,
          maxWidth: 480, marginBottom: '2.5rem',
          fontWeight: 300,
        }}>
          Create stunning, professional resumes with our AI-powered builder.
          Stand out from the crowd and land your dream job faster.
        </p>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={onRegister} style={{
            background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
            border: 'none', cursor: 'pointer',
            color: '#0A0A0A', fontSize: '0.9rem', fontWeight: 600,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            padding: '0.9rem 2.5rem', borderRadius: 4,
            transition: 'all 0.25s',
            boxShadow: '0 0 40px rgba(201,168,76,0.3)',
          }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 60px rgba(201,168,76,0.5)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 40px rgba(201,168,76,0.3)'}
          >Start Building Now →</button>

          <button style={{
            background: 'none',
            border: '1px solid rgba(201,168,76,0.3)',
            cursor: 'pointer', color: '#C9A84C',
            fontSize: '0.9rem', letterSpacing: '0.06em',
            padding: '0.9rem 2rem', borderRadius: 4,
            transition: 'all 0.25s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none' }}
          >View Templates</button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: '3rem', marginTop: '4rem',
          borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '2rem',
        }}>
          {[
            { value: '50K+', label: 'Resumes Created' },
            { value: '95%', label: 'Success Rate' },
            { value: '4.9/5', label: 'User Rating' },
            { value: '24/7', label: 'Support' },
          ].map(stat => (
            <div key={stat.label}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '2rem', fontWeight: 600, color: '#C9A84C',
              }}>{stat.value}</div>
              <div style={{ fontSize: '0.75rem', color: '#555', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side mockup */}
      <div style={{
        position: 'absolute', right: '3rem', top: '50%',
        transform: 'translateY(-50%)',
        width: 420, height: 520,
        background: 'rgba(26,26,26,0.8)',
        border: '1px solid rgba(201,168,76,0.15)',
        borderRadius: 16, backdropFilter: 'blur(20px)',
        padding: '1.5rem',
        boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.1)',
      }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: '1rem' }}>
          {['#ff5f57', '#febc2e', '#28c840'].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
        </div>
        {/* Fake resume lines */}
        <div style={{ display: 'flex', gap: '1rem', height: '100%' }}>
          <div style={{ flex: 1 }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(201,168,76,0.15)', border: '2px solid rgba(201,168,76,0.3)', marginBottom: '0.75rem' }} />
            {[80, 60, 90, 50, 70, 40, 65].map((w, i) => (
              <div key={i} style={{
                height: 6, borderRadius: 3, marginBottom: 8,
                width: `${w}%`,
                background: i === 0 ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.08)'
              }} />
            ))}
          </div>
          <div style={{ flex: 2 }}>
            {[100, 75, 90, 60, 85, 50, 70, 80, 45, 90, 60, 75].map((w, i) => (
              <div key={i} style={{
                height: 6, borderRadius: 3, marginBottom: 10,
                width: `${w}%`,
                background: i % 4 === 0 ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.07)'
              }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Features ─────────────────────────────────────────────────────────────────
function Features() {
  const features = [
    { icon: '✦', title: 'Smart Editor', desc: 'Intuitive drag-and-drop interface with real-time preview and AI-powered suggestions.' },
    { icon: '◉', title: 'Live Preview', desc: 'See your changes instantly with our advanced live preview technology.' },
    { icon: '⬇', title: 'Export Options', desc: 'Download in multiple formats: PDF, Word, or share with a custom link.' },
    { icon: '⚡', title: 'Lightning Fast', desc: 'Build professional resumes in under 5 minutes with our optimized workflow.' },
    { icon: '⬡', title: 'Secure & Private', desc: 'Your data is encrypted and secure. We never share your information.' },
    { icon: '▣', title: 'Mobile Friendly', desc: 'Edit and preview your resume on any device, anywhere, anytime.' },
  ]

  return (
    <section id="features" style={{ padding: '8rem 3rem', position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <p style={{ fontSize: '0.75rem', color: '#C9A84C', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Everything You Need
        </p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400,
          color: '#E8E8E8', letterSpacing: '-0.02em',
        }}>
          Built to <em style={{ color: '#C9A84C' }}>Succeed</em>
        </h2>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1px', background: 'rgba(201,168,76,0.08)',
        border: '1px solid rgba(201,168,76,0.08)',
        borderRadius: 16, overflow: 'hidden',
        maxWidth: 1000, margin: '0 auto',
      }}>
        {features.map((f, i) => (
          <div key={i} style={{
            padding: '2.5rem', background: '#0A0A0A',
            transition: 'background 0.3s',
            cursor: 'default',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#111'}
            onMouseLeave={e => e.currentTarget.style.background = '#0A0A0A'}
          >
            <div style={{
              fontSize: '1.5rem', color: '#C9A84C',
              marginBottom: '1.25rem', fontFamily: 'monospace',
            }}>{f.icon}</div>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.3rem', fontWeight: 600,
              color: '#E8E8E8', marginBottom: '0.75rem',
            }}>{f.title}</h3>
            <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: 1.7 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Pricing ───────────────────────────────────────────────────────────────────
function Pricing({ onRegister }) {
  return (
    <section id="pricing" style={{ padding: '8rem 3rem', position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <p style={{ fontSize: '0.75rem', color: '#C9A84C', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Pricing
        </p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400,
          color: '#E8E8E8',
        }}>Simple, Transparent Pricing</h2>
        <p style={{ color: '#666', marginTop: '0.75rem' }}>Choose the plan that works best for you</p>
      </div>

      <div style={{
        display: 'flex', gap: '2rem', justifyContent: 'center',
        maxWidth: 800, margin: '0 auto',
      }}>
        {/* Free */}
        <div style={{
          flex: 1, border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16, padding: '2.5rem',
          background: '#111',
        }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: '#E8E8E8', marginBottom: '0.5rem' }}>Free</h3>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', color: '#E8E8E8', marginBottom: '0.25rem' }}>€0</div>
          <p style={{ color: '#555', fontSize: '0.85rem', marginBottom: '2rem' }}>Perfect for getting started</p>
          {['1 Professional Template', 'Basic Editing Tools', 'PDF Download', 'Email Support'].map(f => (
            <div key={f} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'center' }}>
              <span style={{ color: '#C9A84C', fontSize: '0.8rem' }}>✓</span>
              <span style={{ color: '#888', fontSize: '0.875rem' }}>{f}</span>
            </div>
          ))}
          <button onClick={onRegister} style={{
            width: '100%', marginTop: '2rem', padding: '0.875rem',
            background: 'none', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 8, color: '#888', fontSize: '0.875rem',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; e.currentTarget.style.color = '#C9A84C' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#888' }}
          >Get Started Free</button>
        </div>

        {/* Premium */}
        <div style={{
          flex: 1, borderRadius: 16, padding: '2.5rem',
          background: 'linear-gradient(135deg, #1A1500, #1A1A00, #111)',
          border: '1px solid rgba(201,168,76,0.3)',
          position: 'relative', overflow: 'hidden',
          boxShadow: '0 0 60px rgba(201,168,76,0.1)',
        }}>
          <div style={{
            position: 'absolute', top: '1.25rem', right: '1.25rem',
            background: '#C9A84C', color: '#0A0A0A',
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', padding: '0.25rem 0.75rem', borderRadius: 100,
          }}>Popular</div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: '#C9A84C', marginBottom: '0.5rem' }}>Premium</h3>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', color: '#E8C97A', marginBottom: '0.25rem' }}>€9.99</div>
          <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '2rem' }}>Unlock all features</p>
          {['All Premium Templates', 'Advanced Editing Tools', 'Multiple Export Formats', 'Priority Support', 'Custom Branding'].map(f => (
            <div key={f} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'center' }}>
              <span style={{ color: '#C9A84C', fontSize: '0.8rem' }}>✓</span>
              <span style={{ color: '#C8C8C8', fontSize: '0.875rem' }}>{f}</span>
            </div>
          ))}
          <button onClick={onRegister} style={{
            width: '100%', marginTop: '2rem', padding: '0.875rem',
            background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
            border: 'none', borderRadius: 8,
            color: '#0A0A0A', fontSize: '0.875rem', fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.25s',
            boxShadow: '0 4px 20px rgba(201,168,76,0.3)',
          }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 30px rgba(201,168,76,0.5)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,168,76,0.3)'}
          >Upgrade to Premium</button>
        </div>
      </div>
    </section>
  )
}

// ── Testimonials ──────────────────────────────────────────────────────────────
function Testimonials() {
  const testimonials = [
    { stars: 5, text: 'This resume builder helped me land my dream job! The templates are modern and the interface is incredibly user-friendly.', name: 'Sarah Johnson', role: 'Software Engineer at Google' },
    { stars: 5, text: "I've tried many resume builders, but this one stands out. The live preview feature is a game-changer.", name: 'Michael Chen', role: 'Marketing Manager at Microsoft' },
    { stars: 5, text: 'Beautiful templates and seamless editing experience. Highly recommend to anyone looking for a professional resume.', name: 'Emily Davis', role: 'UX Designer at Apple' },
  ]

  return (
    <section style={{ padding: '8rem 3rem', background: 'rgba(255,255,255,0.01)' }}>
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <p style={{ fontSize: '0.75rem', color: '#C9A84C', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>Testimonials</p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400, color: '#E8E8E8',
        }}>Loved by <em style={{ color: '#C9A84C' }}>Professionals</em></h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem', maxWidth: 1000, margin: '0 auto' }}>
        {testimonials.map((t, i) => (
          <div key={i} style={{
            padding: '2rem', background: '#111',
            border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12,
            transition: 'border-color 0.3s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
          >
            <div style={{ color: '#C9A84C', marginBottom: '1rem', fontSize: '0.9rem' }}>{'★'.repeat(t.stars)}</div>
            <p style={{ color: '#888', fontSize: '0.875rem', lineHeight: 1.8, marginBottom: '1.5rem', fontStyle: 'italic' }}>"{t.text}"</p>
            <div>
              <div style={{ color: '#E8E8E8', fontSize: '0.875rem', fontWeight: 500 }}>{t.name}</div>
              <div style={{ color: '#555', fontSize: '0.75rem', marginTop: '0.2rem' }}>{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── CTA ───────────────────────────────────────────────────────────────────────
function CTA({ onRegister }) {
  return (
    <section style={{
      padding: '8rem 3rem', textAlign: 'center',
      background: 'linear-gradient(135deg, #0D0B00, #0A0A0A, #0D0B00)',
      borderTop: '1px solid rgba(201,168,76,0.1)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 500, height: 300,
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <p style={{ fontSize: '0.75rem', color: '#C9A84C', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
        Get Started Today
      </p>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300,
        color: '#E8E8E8', marginBottom: '1.5rem', lineHeight: 1.1,
      }}>
        Ready to Build<br /><em style={{ color: '#C9A84C' }}>Your Future?</em>
      </h2>
      <p style={{ color: '#666', marginBottom: '3rem', fontSize: '1rem' }}>
        Join thousands of professionals who've landed their dream jobs
      </p>
      <button onClick={onRegister} style={{
        background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
        border: 'none', cursor: 'pointer',
        color: '#0A0A0A', fontSize: '0.9rem', fontWeight: 600,
        letterSpacing: '0.08em', textTransform: 'uppercase',
        padding: '1rem 3rem', borderRadius: 4,
        boxShadow: '0 0 40px rgba(201,168,76,0.3)',
        transition: 'all 0.25s',
      }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 60px rgba(201,168,76,0.5)'}
        onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 40px rgba(201,168,76,0.3)'}
      >Start Building Now →</button>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const cols = [
    { title: 'Product', links: ['Templates', 'Features', 'Pricing', 'Examples'] },
    { title: 'Support', links: ['Help Center', 'Contact Us', 'FAQ', 'Tutorials'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Privacy'] },
  ]

  return (
    <footer style={{
      background: '#080808', borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: '4rem 3rem 2rem',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <div style={{
              width: 28, height: 28, borderRadius: 6,
              background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 700, color: '#0A0A0A'
            }}>R</div>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: '#E8E8E8' }}>ResuméCraft</span>
          </div>
          <p style={{ color: '#444', fontSize: '0.85rem', lineHeight: 1.7, maxWidth: 220 }}>
            Build professional resumes that get you hired. Trusted by professionals worldwide.
          </p>
        </div>
        {cols.map(col => (
          <div key={col.title}>
            <h4 style={{ color: '#E8E8E8', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              {col.title}
            </h4>
            {col.links.map(link => (
              <div key={link} style={{ marginBottom: '0.6rem' }}>
                <a href="#" style={{
                  color: '#444', fontSize: '0.85rem', textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.target.style.color = '#C9A84C'}
                  onMouseLeave={e => e.target.style.color = '#444'}
                >{link}</a>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ color: '#333', fontSize: '0.8rem' }}>© 2026 ResuméCraft. All rights reserved.</span>
        <span style={{ color: '#333', fontSize: '0.8rem' }}>Built with Spring Boot & React</span>
      </div>
    </footer>
  )
}

// ── Login Modal ───────────────────────────────────────────────────────────────
function LoginModal({ onClose, onSwitch }) {
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()
  const [showPw, setShowPw] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [localError, setLocalError] = useState(null)

  const handleLogin = async () => {
    setLocalError(null)
    if (!form.email || !form.password) {
      setLocalError('Please fill in all fields')
      return
    }
    const result = await login(form.email, form.password)
    if (result.success) {
      onClose()
      navigate('/dashboard')
    } else {
      setLocalError(result.error)
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <div style={{
        background: '#111', border: '1px solid rgba(201,168,76,0.2)',
        borderRadius: 16, padding: '2.5rem', width: 420, position: 'relative',
        boxShadow: '0 40px 80px rgba(0,0,0,0.8)',
      }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{
          position: 'absolute', right: '1.5rem', top: '1.5rem',
          background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '1.2rem',
        }}>×</button>

        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.75rem', color: '#E8E8E8', marginBottom: '0.5rem' }}>
          Welcome Back
        </h2>
        <p style={{ color: '#555', fontSize: '0.85rem', marginBottom: '2rem' }}>Please enter your details to log in</p>

        {(localError || error) && (
          <div style={{
            background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.2)',
            borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1.25rem',
            color: '#ff6b6b', fontSize: '0.85rem',
          }}>
            {localError || (typeof error === 'object' ? JSON.stringify(error) : error)}
          </div>
        )}

        <label style={{ display: 'block', color: '#888', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Email Address</label>
        <input
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          placeholder="john@example.com"
          style={{
            width: '100%', padding: '0.75rem 1rem', marginBottom: '1.25rem',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8, color: '#E8E8E8', fontSize: '0.9rem', outline: 'none',
            boxSizing: 'border-box',
          }}
        />

        <label style={{ display: 'block', color: '#888', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Password</label>
        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <input
            type={showPw ? 'text' : 'password'}
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="Min 6 Characters"
            style={{
              width: '100%', padding: '0.75rem 1rem',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8, color: '#E8E8E8', fontSize: '0.9rem', outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <button onClick={() => setShowPw(!showPw)} style={{
            position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', color: '#555', cursor: 'pointer',
          }}>{showPw ? '👁' : '👁‍🗨'}</button>
        </div>

        <button onClick={handleLogin} disabled={loading} style={{
          width: '100%', padding: '0.875rem',
          background: loading ? 'rgba(201,168,76,0.5)' : 'linear-gradient(135deg, #C9A84C, #E8C97A)',
          border: 'none', borderRadius: 8, color: '#0A0A0A',
          fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.08em',
          textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
        }}>{loading ? 'Logging in...' : 'Login'}</button>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#555', fontSize: '0.85rem' }}>
          Don't have an account?{' '}
          <button onClick={onSwitch} style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', fontSize: '0.85rem' }}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  )
}

// ── Register Modal ────────────────────────────────────────────────────────────
function RegisterModal({ onClose, onSwitch }) {
  const { register, loading, error } = useAuth()
  const [showPw, setShowPw] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [localError, setLocalError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleRegister = async () => {
    setLocalError(null)
    if (!form.name || !form.email || !form.password) {
      setLocalError('Please fill in all fields')
      return
    }
    const result = await register(form.name, form.email, form.password)
    if (result.success) {
      setSuccess(true)
    } else {
      setLocalError(typeof result.error === 'object' ? JSON.stringify(result.error) : result.error)
    }
  }

  if (success) {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }} onClick={onClose}>
        <div style={{
          background: '#111', border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: 16, padding: '2.5rem', width: 420, textAlign: 'center',
          position: 'relative',
        }} onClick={e => e.stopPropagation()}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✉️</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.75rem', color: '#E8E8E8', marginBottom: '0.75rem' }}>
            Check Your Email
          </h2>
          <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            We've sent a verification link to <strong style={{ color: '#C9A84C' }}>{form.email}</strong>. Please verify to log in.
          </p>
          <button onClick={onSwitch} style={{
            background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
            border: 'none', borderRadius: 8, color: '#0A0A0A',
            fontSize: '0.875rem', fontWeight: 700, padding: '0.75rem 2rem',
            cursor: 'pointer',
          }}>Back to Login</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <div style={{
        background: '#111', border: '1px solid rgba(201,168,76,0.2)',
        borderRadius: 16, padding: '2.5rem', width: 420, position: 'relative',
        boxShadow: '0 40px 80px rgba(0,0,0,0.8)',
      }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{
          position: 'absolute', right: '1.5rem', top: '1.5rem',
          background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '1.2rem',
        }}>×</button>

        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.75rem', color: '#E8E8E8', marginBottom: '0.5rem' }}>
          Create an Account
        </h2>
        <p style={{ color: '#555', fontSize: '0.85rem', marginBottom: '2rem' }}>Join us today by entering your details below.</p>

        {(localError || error) && (
          <div style={{
            background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.2)',
            borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1.25rem',
            color: '#ff6b6b', fontSize: '0.85rem',
          }}>
            {localError || (typeof error === 'object' ? JSON.stringify(error) : error)}
          </div>
        )}

        {[
          { label: 'Full Name', key: 'name', placeholder: 'John', type: 'text' },
          { label: 'Email Address', key: 'email', placeholder: 'john@example.com', type: 'email' },
        ].map(f => (
          <div key={f.key}>
            <label style={{ display: 'block', color: '#888', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{f.label}</label>
            <input
              type={f.type}
              value={form[f.key]}
              onChange={e => setForm({ ...form, [f.key]: e.target.value })}
              placeholder={f.placeholder}
              style={{
                width: '100%', padding: '0.75rem 1rem', marginBottom: '1.25rem',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8, color: '#E8E8E8', fontSize: '0.9rem', outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        ))}

        <label style={{ display: 'block', color: '#888', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Password</label>
        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <input
            type={showPw ? 'text' : 'password'}
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            onKeyDown={e => e.key === 'Enter' && handleRegister()}
            placeholder="Min 6 Characters"
            style={{
              width: '100%', padding: '0.75rem 1rem',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8, color: '#E8E8E8', fontSize: '0.9rem', outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <button onClick={() => setShowPw(!showPw)} style={{
            position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', color: '#555', cursor: 'pointer',
          }}>{showPw ? '👁' : '👁‍🗨'}</button>
        </div>

        <button onClick={handleRegister} disabled={loading} style={{
          width: '100%', padding: '0.875rem',
          background: loading ? 'rgba(201,168,76,0.5)' : 'linear-gradient(135deg, #C9A84C, #E8C97A)',
          border: 'none', borderRadius: 8, color: '#0A0A0A',
          fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.08em',
          textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
        }}>{loading ? 'Creating account...' : 'Sign Up'}</button>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#555', fontSize: '0.85rem' }}>
          Already have an account?{' '}
          <button onClick={onSwitch} style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', fontSize: '0.85rem' }}>
            Login
          </button>
        </p>
      </div>
    </div>
  )
}

// ── Main Landing Page ─────────────────────────────────────────────────────────
export default function LandingPage() {
  const [modal, setModal] = useState(null) // null | 'login' | 'register'

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <Navbar
        onLogin={() => setModal('login')}
        onRegister={() => setModal('register')}
      />
      <Hero onRegister={() => setModal('register')} />
      <Features />
      <Pricing onRegister={() => setModal('register')} />
      <Testimonials />
      <CTA onRegister={() => setModal('register')} />
      <Footer />

      {modal === 'login' && (
        <LoginModal
          onClose={() => setModal(null)}
          onSwitch={() => setModal('register')}
        />
      )}
      {modal === 'register' && (
        <RegisterModal
          onClose={() => setModal(null)}
          onSwitch={() => setModal('login')}
        />
      )}
    </div>
  )
}