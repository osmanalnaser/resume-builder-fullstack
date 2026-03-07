import { useReactToPrint } from 'react-to-print'
import { useState, useEffect, useRef} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_BASE = 'http://localhost:8080/api'

// ── Helpers ───────────────────────────────────────────────────────────────────
const emptyResume = {
  title: '',
  thumbnailLink: '',
  firstName: '', lastName: '', designation: '', summary: '',
  email: '', phone: '', location: '', website: '',
  skills: [],
  education: [],
  experience: [],
  certifications: [],
  languages: [],
}

// ── Live Preview ──────────────────────────────────────────────────────────────
function LivePreview({ data }) {
  return (
    <div style={{
      background: '#fff', color: '#1a1a1a',
      fontFamily: "'DM Sans', sans-serif",
      minHeight: '100%', padding: '2.5rem',
      fontSize: '0.82rem', lineHeight: 1.6,
    }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem', borderBottom: '2px solid #C9A84C', paddingBottom: '1rem' }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2rem', fontWeight: 700, color: '#1a1a1a',
          margin: 0, letterSpacing: '-0.02em',
        }}>
          {data.firstName || 'First'} {data.lastName || 'Last'}
        </h1>
        {data.designation && (
          <div style={{ color: '#C9A84C', fontSize: '0.9rem', fontWeight: 500, marginTop: '0.25rem' }}>
            {data.designation}
          </div>
        )}
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
          {data.email && <span style={{ color: '#666', fontSize: '0.78rem' }}>✉ {data.email}</span>}
          {data.phone && <span style={{ color: '#666', fontSize: '0.78rem' }}>☏ {data.phone}</span>}
          {data.location && <span style={{ color: '#666', fontSize: '0.78rem' }}>⌖ {data.location}</span>}
          {data.website && <span style={{ color: '#666', fontSize: '0.78rem' }}>⊕ {data.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <Section title="Summary">
          <p style={{ color: '#444', lineHeight: 1.8 }}>{data.summary}</p>
        </Section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <Section title="Experience">
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#1a1a1a' }}>{exp.title || 'Job Title'}</div>
                  <div style={{ color: '#C9A84C', fontSize: '0.8rem' }}>{exp.company}</div>
                </div>
                <div style={{ color: '#999', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                  {exp.startDate} {exp.endDate ? `– ${exp.endDate}` : '– Present'}
                </div>
              </div>
              {exp.description && (
                <p style={{ color: '#555', marginTop: '0.35rem', fontSize: '0.8rem' }}>{exp.description}</p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <Section title="Education">
          {data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{edu.degree || 'Degree'}</div>
                  <div style={{ color: '#C9A84C', fontSize: '0.8rem' }}>{edu.institution}</div>
                </div>
                <div style={{ color: '#999', fontSize: '0.75rem' }}>{edu.startDate} {edu.endDate ? `– ${edu.endDate}` : ''}</div>
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <Section title="Skills">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {data.skills.map((skill, i) => (
              <span key={i} style={{
                background: '#fdf6e3', border: '1px solid #e8d5a0',
                borderRadius: 4, padding: '0.2rem 0.6rem',
                fontSize: '0.78rem', color: '#8B6914',
              }}>{skill}</span>
            ))}
          </div>
        </Section>
      )}

      {/* Languages */}
      {data.languages?.length > 0 && (
        <Section title="Languages">
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {data.languages.map((lang, i) => (
              <div key={i}>
                <span style={{ fontWeight: 500 }}>{lang.name}</span>
                {lang.level && <span style={{ color: '#999', fontSize: '0.75rem' }}> · {lang.level}</span>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Certifications */}
      {data.certifications?.length > 0 && (
        <Section title="Certifications">
          {data.certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: '0.4rem', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 500 }}>{cert.title}</span>
              <span style={{ color: '#999', fontSize: '0.75rem' }}>{cert.year}</span>
            </div>
          ))}
        </Section>
      )}
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <h3 style={{
        fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
        color: '#C9A84C', fontWeight: 700, marginBottom: '0.6rem',
        paddingBottom: '0.3rem', borderBottom: '1px solid #f0e6c8',
      }}>{title}</h3>
      {children}
    </div>
  )
}

// ── Form Input ────────────────────────────────────────────────────────────────
function Field({ label, value, onChange, placeholder, multiline }) {
  const base = {
    width: '100%', padding: '0.6rem 0.85rem',
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 6, color: '#E8E8E8', fontSize: '0.85rem', outline: 'none',
    boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical',
    transition: 'border-color 0.2s',
  }
  return (
    <div style={{ marginBottom: '0.85rem' }}>
      <label style={{ display: 'block', color: '#666', fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
        {label}
      </label>
      {multiline
        ? <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ ...base }}
            onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.4)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
          />
        : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ ...base }}
            onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.4)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
          />
      }
    </div>
  )
}

// ── Add Button ────────────────────────────────────────────────────────────────
function AddBtn({ label, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', padding: '0.6rem',
      background: 'rgba(201,168,76,0.06)', border: '1px dashed rgba(201,168,76,0.25)',
      borderRadius: 6, color: '#C9A84C', fontSize: '0.8rem', cursor: 'pointer',
      transition: 'all 0.2s', marginTop: '0.5rem',
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.1)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,168,76,0.06)'}
    >+ {label}</button>
  )
}

// ── Section Header ────────────────────────────────────────────────────────────
function SectionHeader({ title, isOpen, onToggle }) {
  return (
    <button onClick={onToggle} style={{
      width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '0.875rem 0', background: 'none', border: 'none', cursor: 'pointer',
      borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: isOpen ? '1rem' : 0,
    }}>
      <span style={{ color: '#C9A84C', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
        {title}
      </span>
      <span style={{ color: '#555', fontSize: '0.8rem', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
    </button>
  )
}

// ── Main Editor ───────────────────────────────────────────────────────────────
export default function ResumeEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(emptyResume)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [openSections, setOpenSections] = useState({ personal: true, experience: true, education: true, skills: true, languages: false, certifications: false })
  const [skillInput, setSkillInput] = useState('')

  const previewRef = useRef(null)

  const handlePrint = useReactToPrint({
    contentRef: previewRef,
    documentTitle: data.title || 'Resume',
  })

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`${API_BASE}/resumes/${id}`)
        setData({ ...emptyResume, ...res.data })
      } catch (err) {
        console.error('Failed to fetch resume', err)
      }
    }
    fetchResume()
  }, [id])

  const set = (field) => (value) => setData(prev => ({ ...prev, [field]: value }))

  const toggleSection = (key) => setOpenSections(prev => ({ ...prev, [key]: !prev[key] }))

  const saveResume = async () => {
    setSaving(true)
    try {
      await axios.put(`${API_BASE}/resumes/${id}`, data)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error('Save failed', err)
    } finally {
      setSaving(false)
    }
  }

  // Skills
  const addSkill = () => {
    const s = skillInput.trim()
    if (s && !data.skills.includes(s)) {
      setData(prev => ({ ...prev, skills: [...prev.skills, s] }))
      setSkillInput('')
    }
  }
  const removeSkill = (i) => setData(prev => ({ ...prev, skills: prev.skills.filter((_, idx) => idx !== i) }))

  // Experience
  const addExperience = () => setData(prev => ({ ...prev, experience: [...prev.experience, { title: '', company: '', startDate: '', endDate: '', description: '' }] }))
  const updateExp = (i, field, val) => setData(prev => {
    const arr = [...prev.experience]; arr[i] = { ...arr[i], [field]: val }; return { ...prev, experience: arr }
  })
  const removeExp = (i) => setData(prev => ({ ...prev, experience: prev.experience.filter((_, idx) => idx !== i) }))

  // Education
  const addEducation = () => setData(prev => ({ ...prev, education: [...prev.education, { degree: '', institution: '', startDate: '', endDate: '' }] }))
  const updateEdu = (i, field, val) => setData(prev => {
    const arr = [...prev.education]; arr[i] = { ...arr[i], [field]: val }; return { ...prev, education: arr }
  })
  const removeEdu = (i) => setData(prev => ({ ...prev, education: prev.education.filter((_, idx) => idx !== i) }))

  // Languages
  const addLanguage = () => setData(prev => ({ ...prev, languages: [...prev.languages, { name: '', level: '' }] }))
  const updateLang = (i, field, val) => setData(prev => {
    const arr = [...prev.languages]; arr[i] = { ...arr[i], [field]: val }; return { ...prev, languages: arr }
  })
  const removeLang = (i) => setData(prev => ({ ...prev, languages: prev.languages.filter((_, idx) => idx !== i) }))

  // Certifications
  const addCert = () => setData(prev => ({ ...prev, certifications: [...prev.certifications, { title: '', year: '' }] }))
  const updateCert = (i, field, val) => setData(prev => {
    const arr = [...prev.certifications]; arr[i] = { ...arr[i], [field]: val }; return { ...prev, certifications: arr }
  })
  const removeCert = (i) => setData(prev => ({ ...prev, certifications: prev.certifications.filter((_, idx) => idx !== i) }))

  const inputStyle = {
    padding: '0.6rem 0.85rem',
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 6, color: '#E8E8E8', fontSize: '0.85rem', outline: 'none',
    fontFamily: 'inherit', boxSizing: 'border-box',
  }

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Top Bar */}
      <div style={{
        padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(201,168,76,0.1)', background: '#0D0D0D',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button onClick={() => navigate('/dashboard')} style={{
            background: 'none', border: 'none', color: '#555', cursor: 'pointer',
            fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
            onMouseLeave={e => e.currentTarget.style.color = '#555'}
          >← Dashboard</button>
          <input
            value={data.title}
            onChange={e => setData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Resume Title"
            style={{
              ...inputStyle, fontSize: '0.95rem', fontWeight: 500,
              border: 'none', background: 'none', color: '#E8E8E8', width: 240,
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {saved && (
            <span style={{ color: '#4ade80', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              ✓ Saved
            </span>
          )}

          <button onClick={handlePrint} style={{
            background: 'none',
            border: '1px solid rgba(201,168,76,0.3)',
            borderRadius: 6, cursor: 'pointer',
            color: '#C9A84C', fontSize: '0.82rem', fontWeight: 600,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            padding: '0.6rem 1.5rem', transition: 'all 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >⬇ PDF</button>
          
          <button onClick={saveResume} disabled={saving} style={{
            background: saving ? 'rgba(201,168,76,0.4)' : 'linear-gradient(135deg, #C9A84C, #E8C97A)',
            border: 'none', borderRadius: 6, cursor: saving ? 'not-allowed' : 'pointer',
            color: '#0A0A0A', fontSize: '0.82rem', fontWeight: 700,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            padding: '0.6rem 1.5rem',
          }}>{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </div>

      {/* Editor + Preview */}
      <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 60px)' }}>

        {/* Left – Form */}
        <div style={{
          width: '42%', overflowY: 'auto', padding: '1.5rem 2rem',
          borderRight: '1px solid rgba(255,255,255,0.05)',
        }}>

          {/* Personal Info */}
          <SectionHeader title="Personal Info" isOpen={openSections.personal} onToggle={() => toggleSection('personal')} />
          {openSections.personal && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                <Field label="First Name" value={data.firstName} onChange={set('firstName')} placeholder="John" />
                <Field label="Last Name" value={data.lastName} onChange={set('lastName')} placeholder="Doe" />
              </div>
              <Field label="Job Title" value={data.designation} onChange={set('designation')} placeholder="Software Engineer" />
              <Field label="Email" value={data.email} onChange={set('email')} placeholder="john@example.com" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                <Field label="Phone" value={data.phone} onChange={set('phone')} placeholder="+49 123 456789" />
                <Field label="Location" value={data.location} onChange={set('location')} placeholder="Munich, Germany" />
              </div>
              <Field label="Website / LinkedIn" value={data.website} onChange={set('website')} placeholder="linkedin.com/in/john" />
              <Field label="Professional Summary" value={data.summary} onChange={set('summary')} placeholder="Brief professional summary..." multiline />
            </div>
          )}

          {/* Experience */}
          <SectionHeader title="Experience" isOpen={openSections.experience} onToggle={() => toggleSection('experience')} />
          {openSections.experience && (
            <div>
              {data.experience.map((exp, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 8, padding: '1rem', marginBottom: '0.75rem',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ color: '#C9A84C', fontSize: '0.75rem' }}>Experience {i + 1}</span>
                    <button onClick={() => removeExp(i)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '0.8rem' }}>✕</button>
                  </div>
                  <Field label="Job Title" value={exp.title} onChange={v => updateExp(i, 'title', v)} placeholder="Software Engineer" />
                  <Field label="Company" value={exp.company} onChange={v => updateExp(i, 'company', v)} placeholder="Company Name" />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                    <Field label="Start Date" value={exp.startDate} onChange={v => updateExp(i, 'startDate', v)} placeholder="Jan 2022" />
                    <Field label="End Date" value={exp.endDate} onChange={v => updateExp(i, 'endDate', v)} placeholder="Present" />
                  </div>
                  <Field label="Description" value={exp.description} onChange={v => updateExp(i, 'description', v)} placeholder="Key responsibilities..." multiline />
                </div>
              ))}
              <AddBtn label="Add Experience" onClick={addExperience} />
            </div>
          )}

          {/* Education */}
          <SectionHeader title="Education" isOpen={openSections.education} onToggle={() => toggleSection('education')} />
          {openSections.education && (
            <div>
              {data.education.map((edu, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 8, padding: '1rem', marginBottom: '0.75rem',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ color: '#C9A84C', fontSize: '0.75rem' }}>Education {i + 1}</span>
                    <button onClick={() => removeEdu(i)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '0.8rem' }}>✕</button>
                  </div>
                  <Field label="Degree" value={edu.degree} onChange={v => updateEdu(i, 'degree', v)} placeholder="B.Sc. Computer Science" />
                  <Field label="Institution" value={edu.institution} onChange={v => updateEdu(i, 'institution', v)} placeholder="University Name" />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                    <Field label="Start Date" value={edu.startDate} onChange={v => updateEdu(i, 'startDate', v)} placeholder="Oct 2020" />
                    <Field label="End Date" value={edu.endDate} onChange={v => updateEdu(i, 'endDate', v)} placeholder="Sep 2024" />
                  </div>
                </div>
              ))}
              <AddBtn label="Add Education" onClick={addEducation} />
            </div>
          )}

          {/* Skills */}
          <SectionHeader title="Skills" isOpen={openSections.skills} onToggle={() => toggleSection('skills')} />
          {openSections.skills && (
            <div>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <input
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addSkill()}
                  placeholder="e.g. React, Spring Boot..."
                  style={{ ...inputStyle, flex: 1 }}
                />
                <button onClick={addSkill} style={{
                  background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)',
                  borderRadius: 6, padding: '0 1rem', color: '#C9A84C', cursor: 'pointer', fontSize: '0.85rem',
                }}>Add</button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {data.skills.map((skill, i) => (
                  <span key={i} style={{
                    background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)',
                    borderRadius: 4, padding: '0.25rem 0.6rem',
                    color: '#C9A84C', fontSize: '0.78rem',
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                  }}>
                    {skill}
                    <button onClick={() => removeSkill(i)} style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', fontSize: '0.7rem', padding: 0 }}>✕</button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          <SectionHeader title="Languages" isOpen={openSections.languages} onToggle={() => toggleSection('languages')} />
          {openSections.languages && (
            <div>
              {data.languages.map((lang, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'end' }}>
                  <input value={lang.name} onChange={e => updateLang(i, 'name', e.target.value)} placeholder="Language" style={{ ...inputStyle }} />
                  <input value={lang.level} onChange={e => updateLang(i, 'level', e.target.value)} placeholder="Native / C1 / B2..." style={{ ...inputStyle }} />
                  <button onClick={() => removeLang(i)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', padding: '0 0.25rem' }}>✕</button>
                </div>
              ))}
              <AddBtn label="Add Language" onClick={addLanguage} />
            </div>
          )}

          {/* Certifications */}
          <SectionHeader title="Certifications" isOpen={openSections.certifications} onToggle={() => toggleSection('certifications')} />
          {openSections.certifications && (
            <div>
              {data.certifications.map((cert, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'end' }}>
                  <input value={cert.title} onChange={e => updateCert(i, 'title', e.target.value)} placeholder="Certification Name" style={{ ...inputStyle }} />
                  <input value={cert.year} onChange={e => updateCert(i, 'year', e.target.value)} placeholder="2024" style={{ ...inputStyle }} />
                  <button onClick={() => removeCert(i)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', padding: '0 0.25rem' }}>✕</button>
                </div>
              ))}
              <AddBtn label="Add Certification" onClick={addCert} />
            </div>
          )}

          <div style={{ height: '3rem' }} />
        </div>

        {/* Right – Live Preview */}
        <div style={{ flex: 1, overflowY: 'auto', background: '#1a1a1a', padding: '2rem' }}>
          <div ref={previewRef} style={{ maxWidth: 680, margin: '0 auto', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
            <LivePreview data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}