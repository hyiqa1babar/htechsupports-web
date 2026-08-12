// src/pages/SectorsRedesign.jsx
// Modern interactive Sectors page with tab navigation and micro-animations
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import siteData from '../data/siteData.json';
import './SectorsRedesign.css';

const SECTORS_ENHANCED = [
  {
    id: 'retail',
    title: 'Retail',
    tagline: 'Global Rollouts & Modern POS Networks',
    description: 'Seamless global rollouts and wireless/data communications to support modern POS and retail network environments. From site audits to comprehensive IT health checks across EMEA retail estates.',
    caseStudy: 'A multi-location UK retail chain achieved 99.9% uptime across 200+ stores through our coordinated network infrastructure upgrades.',
    icon: '🛒',
    color: 'from-emerald-500 to-teal-600',
    image: '/assets/images/sector-retail.png',
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    tagline: 'Datacenter Management & UC',
    description: 'Comprehensive datacenter management, unified collaboration upgrades, and deskside support with backfill or fixed-term contracted engineers. Multi-location deployments across Europe for global banking and corporate networks.',
    caseStudy: 'A global banking institution coordinated unified collaboration upgrades across 15 locations without a single hour of downtime.',
    icon: '🏢',
    color: 'from-blue-500 to-cyan-600',
    image: '/assets/images/company-vision.png',
  },
  {
    id: 'datacenter',
    title: 'Data Center',
    tagline: 'Hardware Deployment & Cable Patching',
    description: 'Datacenter engineering services ranging from cable patching to full hardware deployment, racking, and support. We handle the complexity so you can focus on core operations.',
    caseStudy: 'Deployed 500+ servers across a Tier-3 datacenter in under 2 weeks, with zero downtime for existing workloads.',
    icon: '⚙️',
    color: 'from-purple-500 to-pink-600',
    image: '/assets/images/company-services.png',
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    tagline: 'Supply Chain & Production Support',
    description: 'Robust network infrastructure and smart hands engineering to keep global supply chains and production facilities online. From facility audits to continuous support.',
    caseStudy: 'A large global manufacturer maintained production across 8 facilities during a critical network refresh, thanks to our phased deployment strategy.',
    icon: '🏭',
    color: 'from-orange-500 to-red-600',
    image: '/assets/images/hero-startup-1.png',
  },
  {
    id: 'government',
    title: 'Government',
    tagline: 'Secure & Compliant Operations',
    description: 'Secure, compliant IT operations and consultative approaches to build solutions partnered directly alongside government entities. BPSS-cleared engineers and vetted processes.',
    caseStudy: 'Delivered BPSS-compliant infrastructure refresh for a UK government agency, meeting all security and compliance requirements on schedule.',
    icon: '🏛️',
    color: 'from-slate-600 to-slate-800',
    image: '/assets/images/company-mission.png',
  },
  {
    id: 'carrier-network',
    title: 'Carrier Network',
    tagline: 'Telecom Infrastructure Support',
    description: 'Specialized support for carrier-grade infrastructure, network optimization, and 24/7 engineering for mission-critical telecom operations.',
    caseStudy: 'Supported a major carrier through a nationwide 5G rollout across 50+ cities with zero service interruptions.',
    icon: '📡',
    color: 'from-indigo-500 to-blue-600',
    image: '/assets/images/posts/network_opt_placeholder_1785838438877.png',
  },
];

function SectorsRedesign() {
  const [activeTab, setActiveTab] = useState('retail');
  const activeSector = SECTORS_ENHANCED.find((s) => s.id === activeTab);

  return (
    <>
      <Helmet>
        <title>Sectors – HTech Supports</title>
        <meta
          name="description"
          content="IT solutions for Retail, Enterprise, Data Center, Manufacturing, Government, and Carrier Networks — delivered globally by HTS."
        />
      </Helmet>

      {/* ── Hero Section ────────────────────────────────────── */}
      <section className="sectors-hero">
        <div className="sectors-hero-gradient" aria-hidden="true" />
        <div className="container sectors-hero-inner">
          <p className="sectors-hero-eyebrow">TAILORED SOLUTIONS</p>
          <h1 className="sectors-hero-headline">
            Global IT Solutions<br />
            for Every Industry
          </h1>
          <p className="sectors-hero-sub">
            From smart hands engineering to complex consultative solutions. We partner with clients across multiple industries to deliver seamless global rollouts and datacenter management.
          </p>
          <div className="sectors-hero-ctas">
            <a href="#contact" className="btn-primary">Discuss Your Project</a>
            <a href="/pages/services/" className="btn-outline">View Our Services</a>
          </div>
        </div>
      </section>

      {/* ── Trust Metrics Strip ────────────────────────────────── */}
      <section className="sectors-metrics">
        <div className="container sectors-metrics-inner">
          <div className="metric-block">
            <p className="metric-number">50+</p>
            <p className="metric-label">Countries</p>
          </div>
          <div className="metric-block">
            <p className="metric-number">L1-L3</p>
            <p className="metric-label">Engineers</p>
          </div>
          <div className="metric-block">
            <p className="metric-number">24/7</p>
            <p className="metric-label">Global Support</p>
          </div>
        </div>
      </section>

      {/* ── Interactive Tabs + Content ─────────────────────────── */}
      <section className="sectors-main">
        <div className="container">
          {/* Tab Navigation */}
          <div className="sectors-tabs-container">
            <div className="sectors-tabs-list" role="tablist">
              {SECTORS_ENHANCED.map((sector) => (
                <button
                  key={sector.id}
                  role="tab"
                  aria-selected={activeTab === sector.id}
                  aria-controls={`tab-panel-${sector.id}`}
                  className={`sectors-tab ${activeTab === sector.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(sector.id)}
                >
                  <span className="tab-icon">{sector.icon}</span>
                  {sector.title}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Panel */}
          {activeSector && (
            <div
              key={activeSector.id}
              id={`tab-panel-${activeSector.id}`}
              role="tabpanel"
              className="sectors-tab-panel"
            >
              <div className="sectors-content-grid">
                {/* Left: Image */}
                <div className="sectors-content-media">
                  <img
                    src={activeSector.image}
                    alt={activeSector.title}
                    loading="lazy"
                  />
                </div>

                {/* Right: Text + Case Study */}
                <div className="sectors-content-text">
                  <h2 className="sectors-content-title">{activeSector.title}</h2>
                  <p className="sectors-content-tagline">{activeSector.tagline}</p>
                  <p className="sectors-content-description">
                    {activeSector.description}
                  </p>

                  {/* Case Study Callout */}
                  <div className="sectors-case-study">
                    <p className="case-study-label">✓ Success Story</p>
                    <p className="case-study-text">{activeSector.caseStudy}</p>
                  </div>

                  <a href={`/pages/${activeSector.id}/`} className="read-more">
                    Learn More <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Why HTS Strengths Banner ────────────────────────────── */}
      <section className="sectors-strengths">
        <div className="container sectors-strengths-inner">
          <h2>Why Choose HTS for Your Sector</h2>
          <div className="strengths-grid">
            <div className="strength-card">
              <div className="strength-icon">🌍</div>
              <h3>Global Presence</h3>
              <p>Operations in 50+ countries with multilingual, certified engineers.</p>
            </div>
            <div className="strength-card">
              <div className="strength-icon">🔒</div>
              <h3>Security & Compliance</h3>
              <p>BPSS-cleared staff and vetted processes for government & enterprise.</p>
            </div>
            <div className="strength-card">
              <div className="strength-icon">⚡</div>
              <h3>24/7 Support</h3>
              <p>Round-the-clock engineering and remote dispatch across time zones.</p>
            </div>
            <div className="strength-card">
              <div className="strength-icon">🎯</div>
              <h3>Proven Track Record</h3>
              <p>Delivered complex rollouts and datacenter projects without downtime.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SectorsRedesign;
