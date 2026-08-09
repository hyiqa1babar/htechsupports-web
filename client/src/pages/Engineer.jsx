// src/pages/Engineer.jsx
// "Enter the Hub" - Engineer portal page with feature cards, work types, apply CTA
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import siteData from '../data/siteData.json';
import { usePartner } from '../components/PartnerContext.jsx';
import './Engineer.css';

const HUB_FEATURES = [
  {
    icon: 'Zap',
    title: 'Live Dispatch Board',
    desc: 'Real-time job assignments, site details, and navigation — all in one view.',
  },
  {
    icon: 'Shield',
    title: 'Certification Tracker',
    desc: 'Track Ekahau, Cisco, Arista, HPE, Dell certs. Auto-reminders before expiry.',
  },
  {
    icon: 'FileText',
    title: 'Digital Job Packs',
    desc: 'Drawings, BOMs, configs, and safety docs available offline on any device.',
  },
  {
    icon: 'CheckCircle',
    title: 'Sign-Off & Evidence',
    desc: 'Photo capture, test results, client sign-off — synced instantly to the cloud.',
  },
  {
    icon: 'MapPin',
    title: 'Global Travel Tools',
    desc: 'Visa docs, per-diems, flight/hotel booking, expense capture — built in.',
  },
  {
    icon: 'BarChart',
    title: 'Performance Dashboard',
    desc: 'Your utilisation, first-time-fix rate, SLA compliance — transparent metrics.',
  },
];

const WORK_TYPES = [
  { label: 'Smart Hands / Remote Hands', icon: 'MousePointer', desc: 'On-demand physical presence at client sites worldwide.' },
  { label: 'Break-Fix & IMAC', icon: 'Tool', desc: 'Rapid hardware swap, moves, adds, changes — SLA-backed.' },
  { label: 'Installation & Commissioning', icon: 'Cpu', desc: 'Rack & stack, cabling, device config, power-on testing.' },
  { label: 'Wireless Surveys (Ekahau)', icon: 'Wifi', desc: 'Certified AP placement, heat-maps, interference analysis.' },
  { label: 'Network Migration & Cutover', icon: 'GitBranch', desc: 'Phased switch/AP replacements, zero-downtime cutovers.' },
  { label: 'Datacenter Rack & Stack', icon: 'Server', desc: 'High-density deployments, cable management, labelling.' },
];

const ENGINEER_TIERS = [
  { tier: 'L1 — Field Technician', desc: 'Smart hands, break-fix, IMAC, basic config. On-site execution focus.', requirements: 'CompTIA A+/Network+, 1+ yr field exp.' },
  { tier: 'L2 — Systems Engineer', desc: 'Advanced troubleshooting, config, wireless surveys, migrations.', requirements: 'CCNA/JNCIA or equiv, 3+ yr, Ekahau cert a plus.' },
  { tier: 'L3 — Senior / Lead Engineer', desc: 'Architecture, complex migrations, client-facing, team lead.', requirements: 'CCNP/JNCIP or equiv, 5+ yr, project lead exp.' },
];

export default function Engineer() {
  const { company } = siteData;
  const openPartner = usePartner();

  return (
    <div className="engineer-page">
      <Helmet>
        <title>Enter the Hub — HTech Supports</title>
        <meta name="description" content="HTech Supports Engineer Hub: live dispatch, job packs, certifications, sign-off, travel tools, and performance dashboard for field engineers." />
        <meta property="og:title" content="Enter the Hub | HTech Supports" />
        <meta property="og:description" content="The engineer portal for global deployments. Dispatch, job packs, certs, evidence, travel, performance — all in one place." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ── HERO ── */}
      <section className="engineer-hero" aria-labelledby="eng-title">
        <div className="engineer-hero-bg" aria-hidden="true" />
        <div className="engineer-hero-overlay" />
        <div className="container engineer-hero-content">
          <span className="hero-badge">Engineer Portal</span>
          <h1 id="eng-title">Enter the Hub</h1>
          <p className="hero-subtitle">Your command centre for global deployments. Dispatch, job packs, certifications, evidence capture, travel, and performance — unified.</p>
          <div className="hero-ctas">
            <Link to="/contact" className="hts-btn hts-btn-primary hts-btn-lg">Request Access</Link>
            <button onClick={openPartner} className="hts-btn hts-btn-outline hts-btn-lg">Become A Partner</button>
          </div>
          <p className="hero-note">Secure SSO login for active engineers and approved partners.</p>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="engineer-features" aria-labelledby="features-heading">
        <div className="container">
          <header className="section-header">
            <h2 id="features-heading">Built for Field Engineers</h2>
            <p>Every tool designed around how you actually work on-site — offline-first, fast, compliant.</p>
          </header>
          <div className="features-grid">
            {HUB_FEATURES.map((f, i) => (
              <article key={f.title} className="feature-card" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="feature-icon" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK TYPES ── */}
      <section className="engineer-work" aria-labelledby="work-heading">
        <div className="container">
          <header className="section-header">
            <h2 id="work-heading">Deployment Types</h2>
            <p>From single-site break-fix to 180-site global rollouts — we cover the full spectrum.</p>
          </header>
          <div className="work-grid">
            {WORK_TYPES.map((w, i) => (
              <article key={w.label} className="work-card" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="work-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>
                </div>
                <h3>{w.label}</h3>
                <p>{w.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIERS ── */}
      <section className="engineer-tiers" aria-labelledby="tiers-heading">
        <div className="container">
          <header className="section-header">
            <h2 id="tiers-heading">Engineer Tiers</h2>
            <p>Clear progression from field technician to senior lead — with certification support at every level.</p>
          </header>
          <div className="tiers-grid">
            {ENGINEER_TIERS.map((t, i) => (
              <article key={t.tier} className="tier-card" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="tier-badge">{t.tier}</div>
                <p className="tier-desc">{t.desc}</p>
                <div className="tier-reqs">
                  <strong>Typical requirements:</strong>
                  <span>{t.requirements}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNER CTA ── */}
      <section className="engineer-partner-cta" aria-labelledby="partner-heading">
        <div className="container partner-cta-content">
          <h2 id="partner-heading">Service Partner?</h2>
          <p>Join our vetted global partner network. Access deployments, shared resources, and competitive rates.</p>
          <button onClick={openPartner} className="hts-btn hts-btn-primary hts-btn-lg">Become A Partner</button>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="engineer-cta" aria-labelledby="final-cta-heading">
        <div className="container engineer-cta-content">
          <h2 id="final-cta-heading">Ready to Deploy?</h2>
          <p>Whether you're an engineer looking for your next mission or a partner with capacity to share — let's talk.</p>
          <div className="cta-actions">
            <Link to="/contact" className="hts-btn hts-btn-primary hts-btn-lg">Get in Touch</Link>
            <button onClick={openPartner} className="hts-btn hts-btn-outline hts-btn-lg">Become A Partner</button>
          </div>
        </div>
      </section>
    </div>
  );
}