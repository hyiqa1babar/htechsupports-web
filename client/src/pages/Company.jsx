// src/pages/Company.jsx
// Modern Company page with Mission/Vision/Values, partners strip, clients wall
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import siteData from '../data/siteData.json';
import { usePartner } from '../components/PartnerContext.jsx';
import './Company.css';

const PARTNERS = [
  { name: 'Service Industry Association', logo: '/assets/partners/service_industry_association_logo-150x150.jpeg' },
  { name: 'ASCDI', logo: '/assets/partners/ascdi_logo-150x150.jpeg' },
  { name: 'Partner', logo: '/assets/partners/file-300x200.jpg' },
  { name: 'Ekahau', logo: '/assets/partners/2017_Ekahau_logo_black-640x360-1-300x169.png' },
];

const CLIENTS = [
  'Barclays', 'HSBC', 'Vodafone', 'BT', 'Ericsson',
  'Nokia', 'Cisco', 'Juniper', 'Arista', 'Dell',
  'HPE', 'Lenovo', 'VMware', 'Nutanix', 'Red Hat',
];

export default function Company() {
  const { company } = siteData;
  const openPartner = usePartner();

  return (
    <div className="company-page">
      <Helmet>
        <title>Company — HTech Supports</title>
        <meta name="description" content={company.tagline} />
        <meta property="og:title" content="Company | HTech Supports" />
        <meta property="og:description" content={company.tagline} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ── HERO ── */}
      <section className="company-hero" aria-labelledby="company-title">
        <div className="company-hero-bg" aria-hidden="true" />
        <div className="company-hero-overlay" />
        <div className="container company-hero-content">
          <span className="hero-badge">Global IT Infrastructure & Support</span>
          <h1 id="company-title">Everything You Need. <br />Global IT Support & Infrastructure Services.</h1>
          <p className="hero-subtitle">{company.description}</p>
          <div className="hero-ctas">
            <button onClick={openPartner} className="hts-btn hts-btn-primary hts-btn-lg">Become A Partner</button>
            <Link to="/contact" className="hts-btn hts-btn-outline hts-btn-lg">Contact Sales</Link>
          </div>
        </div>
      </section>

      {/* ── MISSION / VISION / VALUES ── */}
      <section className="company-mvv" aria-labelledby="mvv-heading">
        <div className="container">
          <header className="section-header">
            <h2 id="mvv-heading">Our Foundation</h2>
            <p>The principles that guide every decision, deployment, and delivery.</p>
          </header>
          <div className="mvv-grid">
            <article className="mvv-card" style={{ animationDelay: '0ms' }}>
              <div className="mvv-icon" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </div>
              <h3>Mission</h3>
              <p>Delivering global IT infrastructure and support with scale, agility, and unmatched engineering expertise — wherever our clients operate.</p>
            </article>
            <article className="mvv-card" style={{ animationDelay: '120ms' }}>
              <div className="mvv-icon" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              </div>
              <h3>Vision</h3>
              <p>To be the world's most trusted partner for mission-critical IT deployments — seamless, secure, and sustainable across every continent.</p>
            </article>
            <article className="mvv-card" style={{ animationDelay: '240ms' }}>
              <div className="mvv-icon" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
              <h3>Values</h3>
              <ul className="values-list">
                <li><strong>Engineering Excellence</strong> — Certified, vetted, accountable.</li>
                <li><strong>Client-First Agility</strong> — Speed without compromise.</li>
                <li><strong>Global Reach, Local Touch</strong> — 50+ countries, one standard.</li>
                <li><strong>Integrity & Compliance</strong> — BPSS-cleared, audit-ready.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* ── COVERAGE STATS ── */}
      <section className="company-coverage" aria-labelledby="coverage-heading">
        <div className="container">
          <header className="section-header">
            <h2 id="coverage-heading">Global Footprint</h2>
            <p>Engineers deployed and services delivered across five major regions.</p>
          </header>
          <div className="coverage-grid">
            {company.coverageStats.map((region, i) => (
              <div key={region.region} className="coverage-card" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="coverage-ring" style={{ '--pct': region.percentage }}>
                  <span className="coverage-value">{region.percentage}%</span>
                </div>
                <h3>{region.region}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO SUMMARY ── */}
      <section className="company-services" aria-labelledby="services-heading">
        <div className="container">
          <header className="section-header">
            <h2 id="services-heading">What We Deliver</h2>
            <p>End-to-end infrastructure lifecycle — from design to decommission.</p>
          </header>
          <div className="services-summary-grid">
            {[
              { title: 'Professional AV & Remote Deployment', icon: 'Monitor', desc: 'AV installation, integration, and remote IT deployment across global sites.' },
              { title: 'Wireless & Network Engineering', icon: 'Wifi', desc: 'Certified Ekahau surveys, network design, migration, and 24/7 support.' },
              { title: 'Structured Cabling & Connectivity', icon: 'Cable', desc: 'Design, installation, testing, and certification — the backbone of IT.' },
              { title: 'End-User Computing & Deskside', icon: 'Laptop', desc: 'Break-fix, IMAC, backfill engineers, and fixed-term resourcing.' },
              { title: 'ITAD & Secure Asset Disposal', icon: 'Shield', desc: 'Site closure, relocation, data erasure, and compliance documentation.' },
              { title: 'Staff Augmentation & Global Dispatch', icon: 'Users', desc: 'On-site engineers, international rollouts, and FTE resourcing worldwide.' },
            ].map((svc, i) => (
              <article key={svc.title} className="svc-summary-card" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="svc-icon" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>
                </div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className="company-partners" aria-labelledby="partners-heading">
        <div className="container">
          <header className="section-header">
            <h2 id="partners-heading">Trusted Partners</h2>
            <p>Collaborating with industry leaders to deliver best-in-class solutions.</p>
          </header>
          <div className="partners-logos">
            {PARTNERS.map((p) => (
              <div key={p.name} className="partner-badge" title={p.name}>
                <img src={p.logo} alt={p.name} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENTS WALL ── */}
      <section className="company-clients" aria-labelledby="clients-heading">
        <div className="container">
          <header className="section-header">
            <h2 id="clients-heading">Clients & Deployments</h2>
            <p>Serving global enterprises, financial institutions, carriers, and public sector.</p>
          </header>
          <div className="clients-marquee" aria-hidden="true">
            <div className="marquee-track">
              {CLIENTS.map((c) => <span key={c} className="marquee-item">{c}</span>)}
              {CLIENTS.map((c) => <span key={`${c}-2`} className="marquee-item">{c}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="company-cta" aria-labelledby="cta-heading">
        <div className="container company-cta-content">
          <h2 id="cta-heading">Ready to Partner with HTech?</h2>
          <p>Whether you need a single-site deployment or a multi-country rollout, our team is ready to design and deliver.</p>
          <div className="cta-actions">
            <button onClick={openPartner} className="hts-btn hts-btn-primary hts-btn-lg">Become A Partner</button>
            <Link to="/contact" className="hts-btn hts-btn-outline hts-btn-lg">Start a Conversation</Link>
          </div>
        </div>
      </section>
    </div>
  );
}