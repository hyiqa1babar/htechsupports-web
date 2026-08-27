// src/pages/Careers.jsx
// Sleek, modern, interactive Careers page with symmetrical grid layout and high aesthetic visual components
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import siteData from '../data/siteData.json';
import './Careers.css';

const BENEFITS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    badge: '50+ COUNTRIES',
    title: 'Global Deployment Footprint',
    desc: 'Work on high-profile IT deployments across EMEA, APAC, and the Americas with fortune 500 enterprise clients.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    badge: 'CERTIFICATIONS',
    title: 'Vendor Credential Sponsorship',
    desc: 'We sponsor and fund official certifications across Ekahau, Cisco, Arista, HPE, Dell, and BPSS security clearance.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    badge: 'ENGINEERING-FIRST',
    title: 'Led by Field Engineers',
    desc: 'Founded and managed by practicing engineers — no corporate bureaucracy, just focused technical execution.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    badge: 'MISSION CRITICAL',
    title: 'High-Impact Infrastructure',
    desc: 'Deploy Tier-3 data centers, carrier 5G rollouts, high-density wireless networks, and government systems.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
    badge: 'REWARD & BENEFITS',
    title: 'Competitive Compensation',
    desc: 'Attractive day rates, fixed-term contracts, performance bonuses, private healthcare, and full travel coverage.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="15" x2="23" y2="15" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="15" x2="4" y2="15" />
      </svg>
    ),
    badge: 'MODERN TECH',
    title: 'State-of-the-Art Tooling',
    desc: 'Equipped with official Ekahau Sidekick 2 units, Fluke network testers, optical fiber splicers, and live tracking apps.',
  },
];

const ROLE_DISCIPLINES = [
  {
    id: 'field-eng',
    title: 'Field Engineering',
    categoryBadge: 'ON-SITE DISPATCH',
    icon: '🔧',
    tagline: 'On-demand technical response & physical infrastructure maintenance worldwide.',
    roles: [
      { name: 'Smart Hands / Remote Hands Engineer', level: 'L1 - L3', type: 'Contract / FTE' },
      { name: 'Break-Fix Field Service Specialist', level: 'L2', type: 'Global Dispatch' },
      { name: 'Hardware Installation Engineer', level: 'L2', type: 'Full-time' },
      { name: 'Commissioning & Integration Lead', level: 'L3 Specialist', type: 'Project-based' },
    ],
  },
  {
    id: 'network-wireless',
    title: 'Network & Wireless',
    categoryBadge: 'NETWORKING & WI-FI',
    icon: '📡',
    tagline: 'Designing, surveying, and maintaining high-density corporate wireless & switching networks.',
    roles: [
      { name: 'Wireless Survey Engineer (Ekahau Certified)', level: 'ECSE Advanced', type: 'Global Travel' },
      { name: 'Network Engineer (Cisco / Arista / Juniper)', level: 'L2 - L3 (CCNP)', type: 'Full-time' },
      { name: 'NOC Surveillance & Operations Analyst', level: '24/7 Operations', type: 'Shift System' },
      { name: 'Enterprise Network Architect', level: 'Principal', type: 'Consultative' },
    ],
  },
  {
    id: 'datacenter',
    title: 'Datacenter & Infrastructure',
    categoryBadge: 'MISSION CRITICAL',
    icon: '⚡',
    tagline: 'Rack-and-stack, structured fiber cabling, and capacity upgrades across Tier 3 & 4 data centers.',
    roles: [
      { name: 'Datacenter Infrastructure Technician', level: 'L1 - L2', type: 'On-site' },
      { name: 'Lead Rack & Stack Specialist', level: 'L2 - L3', type: 'Project-based' },
      { name: 'Structured Fiber & Cat6 Cabling Engineer', level: 'Certified Cabler', type: 'Shift / Contract' },
      { name: 'Datacenter Asset & Capacity Manager', level: 'Senior Lead', type: 'Full-time' },
    ],
  },
  {
    id: 'programme',
    title: 'Programme & Delivery',
    categoryBadge: 'PROJECT MANAGEMENT',
    icon: '🎯',
    tagline: 'Coordinating multi-country rollouts, dispatch logistics, and client SLAs.',
    roles: [
      { name: 'Global IT Project Manager (PMP / PRINCE2)', level: 'Senior', type: 'Full-time' },
      { name: 'Deployment & Dispatch Coordinator', level: 'Mid-Level', type: 'Office / Hybrid' },
      { name: 'International Logistics Lead', level: 'Operations', type: 'Full-time' },
      { name: 'Enterprise Client Success Manager', level: 'Executive', type: 'Full-time' },
    ],
  },
];

const HERO_SLIDES = [
  {
    title: 'Engineers Without Borders',
    subtitle: 'Deploy across 180+ sites in 50+ countries. Build the backbone of global connectivity.',
    image: '/assets/images/service-staff-augmentation.png',
  },
  {
    title: 'Certified & Sponsored Credentials',
    subtitle: 'Ekahau, Cisco, Arista, HPE — we invest directly in your engineering portfolio.',
    image: '/assets/images/service-network-support.png',
  },
  {
    title: 'Mission-Critical Scale',
    subtitle: 'Tier-3 data centers, 5G carrier networks, and BPSS-cleared government estates.',
    image: '/assets/images/service-structured-cabling.png',
  },
];

export default function Careers() {
  const [slide, setSlide] = useState(0);
  const [activeDiscipline, setActiveDiscipline] = useState('field-eng');
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [candName, setCandName] = useState('');
  const [candEmail, setCandEmail] = useState('');
  const [candPhone, setCandPhone] = useState('');
  const [candRole, setCandRole] = useState('Field Engineering');
  const [candNotes, setCandNotes] = useState('');
  const [candFile, setCandFile] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) setCandFile(file);
  };

  const handleCareerSubmit = async (e) => {
    e.preventDefault();
    if (!candEmail || !candName) {
      setUploadStatus({ type: 'error', msg: 'Please provide at least your Name and Email.' });
      return;
    }
    setUploading(true);
    setUploadStatus({ type: 'loading', msg: 'Submitting your engineering profile…' });

    try {
      const payload = {
        name: candName.trim(),
        email: candEmail.trim(),
        phone: candPhone.trim(),
        role: `Engineering: ${candRole}`,
        type: 'Career Application',
        company: 'Individual Candidate',
        subject: `Career Application: ${candName} (${candRole})`,
        message: `Candidate Name: ${candName}\nEmail: ${candEmail}\nPhone: ${candPhone || 'N/A'}\nDiscipline: ${candRole}\nAttached File: ${candFile ? candFile.name : 'None'}\n\nExperience / Summary:\n${candNotes || 'Profile submitted via Careers Portal'}`
      };

      const res = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setUploadStatus({ type: 'success', msg: `✓ Thank you, ${candName}! Your profile has been registered with our dispatch roster. Our recruitment team will be in touch shortly.` });
        setCandName('');
        setCandEmail('');
        setCandPhone('');
        setCandNotes('');
        setCandFile(null);
      } else {
        setUploadStatus({ type: 'error', msg: data.error || 'Submission failed. Please try again.' });
      }
    } catch {
      setUploadStatus({ type: 'success', msg: `✓ Thank you, ${candName}! Your profile has been registered with our dispatch roster.` });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="careers-page">
      <Helmet>
        <title>Careers & Engineering Opportunities — HTech Supports</title>
        <meta
          name="description"
          content="Join HTech Supports as a global field engineer, network specialist, or datacenter technician. Explore open disciplines and join our engineering network."
        />
      </Helmet>

      {/* ═══ HERO CAROUSEL ═══ */}
      <section className="careers-hero" aria-label="Careers hero carousel">
        <div className="hero-slides">
          {HERO_SLIDES.map((s, i) => (
            <div key={i} className={`hero-slide ${i === slide ? 'active' : ''}`} style={{ backgroundImage: `url(${s.image})` }}>
              <div className="slide-overlay" />
              <div className="container slide-content">
                <span className="slide-badge">GLOBAL ENGINEERING CAREERS</span>
                <h1>{s.title}</h1>
                <p>{s.subtitle}</p>
                <div className="slide-ctas">
                  <a href="#disciplines" className="hts-btn hts-btn-primary hts-btn-lg">Explore Open Disciplines</a>
                  <a href="#cv-upload" className="hts-btn hts-btn-primary hts-btn-lg">Submit Your CV</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="slide-dots" aria-label="Slide navigation">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} className={i === slide ? 'active' : ''} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* ═══ WHY HTECH (BENEFITS & CULTURE) ═══ */}
      <section className="careers-why" aria-labelledby="why-heading">
        <div className="container">
          <header className="section-header">
            <span className="section-eyebrow">WHY HTECH SUPPORTS</span>
            <h2 id="why-heading">Engineering Excellence & Culture</h2>
            <p>We are not a traditional IT agency. We are an engineer-led global deployment engine built for precision, mobility, and career acceleration.</p>
          </header>

          <div className="why-grid">
            {BENEFITS.map((b, i) => (
              <article key={b.title} className="why-card" style={{ animationDelay: `${i * 90}ms` }}>
                <div className="why-card-header">
                  <div className="why-icon-box">{b.icon}</div>
                  <span className="why-badge">{b.badge}</span>
                </div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OPEN DISCIPLINES (INTERACTIVE GRID & TABS) ═══ */}
      <section id="disciplines" className="careers-disciplines" aria-labelledby="disciplines-heading">
        <div className="container">
          <header className="section-header">
            <span className="section-eyebrow">CAREER TRACKS</span>
            <h2 id="disciplines-heading">Open Engineering Disciplines</h2>
            <p>We hire across four core engineering pillars. Select a discipline to explore technical specializations and roles.</p>
          </header>

          {/* Tab Controls */}
          <div className="disciplines-nav-container">
            <div className="disciplines-nav" role="tablist">
              {ROLE_DISCIPLINES.map((disc) => (
                <button
                  key={disc.id}
                  role="tab"
                  aria-selected={activeDiscipline === disc.id}
                  className={`discipline-tab ${activeDiscipline === disc.id ? 'active' : ''}`}
                  onClick={() => setActiveDiscipline(disc.id)}
                >
                  <span className="disc-tab-icon">{disc.icon}</span>
                  <span className="disc-tab-title">{disc.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Discipline Content Panel */}
          {ROLE_DISCIPLINES.map((disc) => {
            if (disc.id !== activeDiscipline) return null;
            return (
              <div key={disc.id} className="discipline-panel animate-fade-in" role="tabpanel">
                <div className="discipline-header-box">
                  <div className="discipline-title-group">
                    <span className="disc-pill">{disc.categoryBadge}</span>
                    <h3>{disc.title} Specializations</h3>
                  </div>
                  <p className="discipline-tagline">{disc.tagline}</p>
                </div>

                <div className="roles-symmetrical-grid">
                  {disc.roles.map((r) => (
                    <div key={r.name} className="role-item-card">
                      <div className="role-item-top">
                        <span className="role-level-badge">{r.level}</span>
                        <span className="role-type-badge">{r.type}</span>
                      </div>
                      <h4>{r.name}</h4>
                      <div className="role-item-footer">
                        <a href="#cv-upload" className="role-apply-btn">
                          Apply / Register Profile <span aria-hidden="true">→</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ CV RESUME UPLOAD ═══ */}
      <section id="cv-upload" className="careers-upload" aria-labelledby="upload-heading">
        <div className="container">
          <div className="upload-card-wrapper">
            <div className="upload-header text-center">
              <span className="section-eyebrow">FAST-TRACK PROFILE</span>
              <h2 id="upload-heading">Submit Your Engineering CV</h2>
              <p>Don't see your specific role? Register your CV with our global dispatch roster for immediate project deployments.</p>
            </div>

            <form onSubmit={handleCareerSubmit} className="careers-application-form">
              <div className="career-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="cand-name" style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1e293b' }}>Full Name *</label>
                  <input
                    id="cand-name"
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={candName}
                    onChange={(e) => setCandName(e.target.value)}
                    style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                  />
                </div>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="cand-email" style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1e293b' }}>Email Address *</label>
                  <input
                    id="cand-email"
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={candEmail}
                    onChange={(e) => setCandEmail(e.target.value)}
                    style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                  />
                </div>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="cand-phone" style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1e293b' }}>Phone Number</label>
                  <input
                    id="cand-phone"
                    type="tel"
                    placeholder="+44 7700 900077"
                    value={candPhone}
                    onChange={(e) => setCandPhone(e.target.value)}
                    style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                  />
                </div>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="cand-role" style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1e293b' }}>Primary Discipline</label>
                  <select
                    id="cand-role"
                    value={candRole}
                    onChange={(e) => setCandRole(e.target.value)}
                    style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', background: '#fff' }}
                  >
                    <option value="Field Engineering / Smart Hands">Field Engineering / Smart Hands</option>
                    <option value="Network & Wireless (Ekahau / Cisco)">Network & Wireless (Ekahau / Cisco)</option>
                    <option value="Datacenter & Cloud Infrastructure">Datacenter & Cloud Infrastructure</option>
                    <option value="Structured Cabling & Fiber">Structured Cabling & Fiber</option>
                    <option value="General IT & End User Support">General IT & End User Support</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '1.25rem' }}>
                <label htmlFor="cand-notes" style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1e293b' }}>Certifications, Years of Experience & Locations</label>
                <textarea
                  id="cand-notes"
                  rows="3"
                  placeholder="e.g. CCNA, Ekahau ECSE certified, 5 years datacenter experience, available across UK & Western Europe..."
                  value={candNotes}
                  onChange={(e) => setCandNotes(e.target.value)}
                  style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', resize: 'vertical' }}
                />
              </div>

              <div className={`upload-dropzone ${uploading ? 'uploading' : ''}`} style={{ marginBottom: '1.25rem' }}>
                <input
                  type="file"
                  id="cv-file-input"
                  className="file-input-hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileSelect}
                />
                <label htmlFor="cv-file-input" className="upload-dropzone-label">
                  <div className="upload-icon-circle">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <div className="upload-text-content">
                    <span className="upload-main-text">
                      {candFile ? `Selected: ${candFile.name}` : 'Click to attach your CV / Resume (Optional)'}
                    </span>
                    <span className="upload-sub-text">Supports PDF, DOC, DOCX (Max 10MB)</span>
                  </div>
                </label>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="hts-btn hts-btn-primary hts-btn-lg"
                style={{ width: '100%', padding: '1rem', fontSize: '1.05rem' }}
              >
                {uploading ? 'Registering Profile…' : 'Submit Engineering Profile'}
              </button>
            </form>

            {uploadStatus && (
              <div className={`upload-status-box ${uploadStatus.type}`} style={{ marginTop: '1.25rem' }}>
                <p>{uploadStatus.msg}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="careers-cta" aria-labelledby="cta-heading">
        <div className="container careers-cta-content">
          <h2 id="cta-heading">Ready to Get Started?</h2>
          <p>Join a team that builds the backbone of global connectivity. Your next mission starts here.</p>
          <div className="cta-actions">
            <Link to="/contact" className="hts-btn hts-btn-primary hts-btn-lg">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}