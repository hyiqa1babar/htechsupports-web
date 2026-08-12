// src/pages/Careers.jsx
// Modern Careers page with hero carousel, benefits, roles, resume upload
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import siteData from '../data/siteData.json';
import { usePartner } from '../components/PartnerContext.jsx';
import './Careers.css';

const BENEFITS = [
  { icon: 'Globe', title: 'Global Exposure', desc: 'Work on deployments across 50+ countries with multinational clients.' },
  { icon: 'Shield', title: 'Certified Growth', desc: 'Access to vendor certifications (Cisco, Ekahau, Arista, HPE, Dell).' },
  { icon: 'Users', title: 'Engineering-First Culture', desc: 'Led by engineers, for engineers — no unnecessary bureaucracy.' },
  { icon: 'Zap', title: 'High-Impact Projects', desc: 'Data centre expansions, carrier rollouts, secure government sites.' },
  { icon: 'CreditCard', title: 'Competitive Package', desc: 'Salary, bonus, pension, private healthcare, and travel allowances.' },
  { icon: 'Cpu', title: 'Modern Tooling', desc: 'Latest diagnostic gear, remote monitoring platforms, automation stack.' },
];

const ROLE_CATEGORIES = [
  {
    title: 'Field Engineering',
    roles: ['Smart Hands / Remote Hands', 'Break-Fix Technician', 'Installation Engineer', 'Commissioning Engineer'],
  },
  {
    title: 'Network & Wireless',
    roles: ['Network Engineer (L1–L3)', 'Wireless Survey Engineer (Ekahau)', 'NOC Analyst', 'Network Architect'],
  },
  {
    title: 'Datacenter & Infrastructure',
    roles: ['Datacenter Technician', 'Rack & Stack Lead', 'Cabling Specialist', 'Asset & Capacity Manager'],
  },
  {
    title: 'Programme & Delivery',
    roles: ['Project Manager', 'Programme Manager', 'Deployment Coordinator', 'Client Success Manager'],
  },
];

const HERO_SLIDES = [
  {
    title: 'Engineer Without Borders',
    subtitle: 'Deploy to 180+ sites across 30 countries. Your office is the world.',
    image: '/assets/images/hero-startup-1.png',
  },
  {
    title: 'Certified by the Best',
    subtitle: 'Ekahau, Cisco, Arista, HPE — we invest in your credentials.',
    image: '/assets/images/hero-startup-2.png',
  },
  {
    title: 'Mission-Critical Scale',
    subtitle: 'Data centres, carrier networks, secure government estates.',
    image: '/assets/images/coverage-map.jpg',
  },
];

export default function Careers() {
  const { company } = siteData;
  const openPartner = usePartner();
  const [slide, setSlide] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef(null);

  // Auto-rotate hero
  useEffect(() => {
    const timer = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setUploadStatus({ type: 'error', msg: 'File must be under 10MB' });
      return;
    }
    if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
      setUploadStatus({ type: 'error', msg: 'Please upload PDF, DOC, or DOCX' });
      return;
    }
    setUploading(true);
    setUploadStatus({ type: 'loading', msg: 'Uploading...' });
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      setUploadStatus({ type: 'success', msg: 'Application received! Our talent team will review within 3 business days.' });
      fileInputRef.current.value = '';
    }, 1500);
  };

  const handleDragOver = (e) => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); };
  const handleDragLeave = (e) => { e.currentTarget.classList.remove('drag-over'); };
  const handleDrop = (e) => {
    e.preventDefault(); e.currentTarget.classList.remove('drag-over');
    if (e.dataTransfer.files.length) handleFileSelect({ target: { files: e.dataTransfer.files } });
  };

  return (
    <div className="careers-page">
      <Helmet>
        <title>Careers — HTech Supports</title>
        <meta name="description" content="Join HTech Supports: global IT infrastructure careers with certified growth, worldwide deployments, and engineering-first culture." />
        <meta property="og:title" content="Careers | HTech Supports" />
        <meta property="og:description" content="Engineer without borders. Global deployments, certified growth, mission-critical scale." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ── HERO CAROUSEL ── */}
      <section className="careers-hero" aria-label="Careers hero carousel">
        <div className="hero-slides">
          {HERO_SLIDES.map((s, i) => (
            <div key={i} className={`hero-slide ${i === slide ? 'active' : ''}`} style={{ backgroundImage: `url(${s.image})` }}>
              <div className="slide-overlay" />
              <div className="container slide-content">
                <span className="slide-badge">We're Hiring</span>
                <h1>{s.title}</h1>
                <p>{s.subtitle}</p>
                <div className="slide-ctas">
                  <a href="#roles" className="hts-btn hts-btn-primary hts-btn-lg">View Open Roles</a>
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

      {/* ── INTRO ── */}
      <section className="careers-intro" aria-labelledby="intro-heading">
        <div className="container">
          <header className="section-header">
            <h2 id="intro-heading">Why HTech?</h2>
            <p>We're not a typical IT services firm. We're engineers who deploy infrastructure at global scale.</p>
          </header>
          <div className="benefits-grid">
            {BENEFITS.map((b, i) => (
              <article key={b.title} className="benefit-card" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="benefit-icon" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                </div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROLE CATEGORIES ── */}
      <section id="roles" className="careers-roles" aria-labelledby="roles-heading">
        <div className="container">
          <header className="section-header">
            <h2 id="roles-heading">Open Disciplines</h2>
            <p>We hire across four core disciplines. Don't see your exact title? We're always open to exceptional talent.</p>
          </header>
          <div className="roles-grid">
            {ROLE_CATEGORIES.map((cat, i) => (
              <article key={cat.title} className="role-category" style={{ animationDelay: `${i * 100}ms` }}>
                <h3>{cat.title}</h3>
                <ul>
                  {cat.roles.map((r) => <li key={r}>{r}</li>)}
                </ul>
                <Link to="/contact" className="role-link">Explore {cat.title} Roles →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESUME UPLOAD ── */}
      <section className="careers-upload" aria-labelledby="upload-heading">
        <div className="container">
          <div className="upload-card">
            <header>
              <h2 id="upload-heading">Submit Your CV</h2>
              <p>No matching role? Send us your profile — we'll match you to upcoming deployments.</p>
            </header>
            <div className={`upload-dropzone ${uploadStatus?.type === 'success' ? 'success' : ''}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
              <input ref={fileInputRef} type="file" id="resume-upload" accept=".pdf,.doc,.docx" onChange={handleFileSelect} disabled={uploading} style={{ display: 'none' }} />
              <label htmlFor="resume-upload" className="upload-label">
                <svg className="upload-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                <span className="upload-text">{uploading ? 'Uploading...' : uploadStatus?.type === 'success' ? '✓ Received — Thank You!' : 'Drag & drop your CV or click to browse'}</span>
                <span className="upload-hint">PDF, DOC, DOCX · Max 10MB</span>
              </label>
              {uploadStatus && <p className={`upload-status ${uploadStatus.type}`}>{uploadStatus.msg}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
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