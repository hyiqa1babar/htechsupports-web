// src/pages/Services.jsx — Enterprise Alternating Showcase Layout
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import siteData from '../data/siteData.json';
import './Services.css';

const HERO_IMAGES = [
  '/assets/images/service-pro-av.png',
  '/assets/images/service-wireless.png',
  '/assets/images/service-network-support.png',
  '/assets/images/service-structured-cabling.png',
  '/assets/images/service-end-user-computing.png',
  '/assets/images/service-itad.png',
  '/assets/images/service-staff-augmentation.png',
];

const SERVICE_CAPABILITIES = {
  'professional-service': [
    'Projectors, LED video walls & interactive screens',
    'Integrated audio, microphones & video conferencing',
    'End-to-end site survey, installation & calibration',
    'Remote IT deployment & Smart Hands support'
  ],
  'ekahau': [
    'Official Certified Ekahau Partner Engineers (ECSE)',
    'Predictive 3D CAD modeling & spectrum analysis',
    'Wi-Fi 6E / 7 high-density zero-deadzone design',
    'SLA-backed capacity planning & audit heatmaps'
  ],
  'wireless-survey': [
    'Active, Passive & AP-on-a-Stick (APoS) surveys',
    'Warehouse, healthcare & enterprise RF tuning',
    'Coverage hole detection & rogue AP identification',
    'Post-deployment validation & remediation roadmap'
  ],
  'network-support': [
    'Switch, router, firewall & gateway installations',
    'LAN/WAN, VLAN tagging & routing protocols',
    '24/7 break-fix SLA and proactive monitoring',
    'Multi-vendor expertise (Cisco, Juniper, Aruba, Fortinet)'
  ],
  'structured-cabling': [
    'Cat6, Cat6A, Cat7 & Single/Multi-mode Fiber Optic',
    'Patch panel termination, labeling & cable management',
    'Fluke DSX certified testing and compliance reports',
    'Data center hot/cold aisle containment cabling'
  ],
  'end-user-computing-support': [
    'Workstation, laptop & peripheral imaging and rollout',
    'OS deployment, patching & mobile device management',
    'Onsite dispatch & dedicated VIP deskside technicians',
    'Rapid ticket resolution with strict SLA commitments'
  ],
  'itad-it-asset-disposal': [
    'Certified NIST 800-88 data destruction with certificates',
    'Safe hardware de-racking, packaging & secure logistics',
    'Eco-friendly recycling and WEEE compliance',
    'Residual asset value recovery through remarketing'
  ],
  'staff-augmentation': [
    'Pre-vetted L1, L2, and L3 field engineers on demand',
    'Coverage across 50+ countries with local language support',
    'Short-term rollout surges or long-term dedicated contracts',
    'Centralized PMO dispatch and real-time SLA reporting'
  ]
};

const SERVICE_CATEGORIES = {
  'professional-service': 'AV & Collaboration',
  'ekahau': 'Certified Wireless Partner',
  'wireless-survey': 'Wireless Infrastructure',
  'network-support': 'Core Networking',
  'structured-cabling': 'Physical Infrastructure',
  'end-user-computing-support': 'Workplace & Deskside',
  'itad-it-asset-disposal': 'Lifecycle & Compliance',
  'staff-augmentation': 'Global Workforce'
};

export default function Services() {
  const { services } = siteData;
  const [heroIdx, setHeroIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i + 1) % HERO_IMAGES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const stats = [
    { val: '50+', label: 'Countries Covered' },
    { val: '8', label: 'Core Capabilities' },
    { val: '24/7', label: 'Global Dispatch SLA' },
    { val: '1000+', label: 'Successful Projects' },
  ];

  const filteredServices = activeTab === 'all'
    ? services
    : services.filter(s => s.id === activeTab);

  const scrollToService = (id) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="services-page">
      <Helmet>
        <title>Global IT Services — HTech Supports</title>
        <meta
          name="description"
          content="Explore HTech Supports full range of enterprise IT services: AV installations, Ekahau Wi-Fi surveys, network support, structured cabling, ITAD, and global engineer staff augmentation."
        />
      </Helmet>

      {/* ═══ 1. HERO BANNER ═══ */}
      <section className="sv-hero" aria-label="Services hero banner">
        {HERO_IMAGES.map((src, i) => (
          <div key={src} className={`sv-hero-slide ${i === heroIdx ? 'active' : ''}`}>
            <img src={src} alt="" />
          </div>
        ))}
        <div className="sv-hero-overlay" />
        <div className="container sv-hero-content">
          <span className="sv-hero-pill">GLOBAL IT CAPABILITIES</span>
          <h1 className="sv-hero-title">
            Enterprise Technology Services<br />
            <span className="sv-gradient-text">Delivered Worldwide</span>
          </h1>
          <p className="sv-hero-subtitle">
            From smart hands engineering and high-precision Ekahau Wi-Fi design to global rollouts across 50+ countries. Delivering enterprise agility, multi-vendor expertise, and SLA-backed execution.
          </p>
          <div className="sv-hero-actions">
            <a href="#services-showcase" className="sv-btn sv-btn-filled">Explore All Services</a>
            <Link to="/contact" className="sv-btn sv-btn-filled">Get in Touch</Link>
          </div>
        </div>
      </section>

      {/* ═══ 2. STATS BAR ═══ */}
      <section className="sv-stats-bar" aria-label="Global metrics">
        <div className="container sv-stats-grid">
          {stats.map(s => (
            <div key={s.label} className="sv-stat-card">
              <span className="sv-stat-val">{s.val}</span>
              <span className="sv-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 3. QUICK NAV / JUMP BAR ═══ */}
      <nav id="services-showcase" className="sv-quicknav-bar" aria-label="Quick jump to service">
        <div className="container">
          <div className="sv-quicknav-scroll">
            <button
              onClick={() => setActiveTab('all')}
              className={`sv-nav-pill ${activeTab === 'all' ? 'active' : ''}`}
            >
              All Services
            </button>
            {services.map((svc) => (
              <button
                key={svc.id}
                onClick={() => scrollToService(svc.id)}
                className={`sv-nav-pill ${activeTab === svc.id ? 'active' : ''}`}
              >
                {svc.title.split(' ')[0]} {svc.title.split(' ')[1] || ''}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ═══ 4. ALTERNATING ENTERPRISE SHOWCASE ═══ */}
      <section className="sv-showcase-section">
        <div className="container sv-showcase-container">
          <header className="sv-section-head">
            <span className="sv-pill-badge">WHAT WE DELIVER</span>
            <h2>Our Core Engineering &amp; Support Services</h2>
            <p>Comprehensive IT infrastructure solutions tailored for enterprise networks, data centers, and multi-site estates.</p>
          </header>

          <div className="sv-alternating-list">
            {filteredServices.map((svc, idx) => {
              const isEven = idx % 2 === 1;
              const capabilities = SERVICE_CAPABILITIES[svc.id] || [
                'L1 to L3 certified technical support',
                'Rapid global dispatch across 50+ countries',
                'Strict SLA compliance and transparent reporting',
                'Multi-vendor hardware integration'
              ];
              const category = SERVICE_CATEGORIES[svc.id] || 'Enterprise Service';

              return (
                <article
                  key={svc.id}
                  id={svc.id}
                  className={`sv-feature-row ${isEven ? 'sv-row-reverse' : ''}`}
                >
                  {/* Text Column */}
                  <div className="sv-feature-content">
                    <div className="sv-feature-meta">
                      <span className="sv-category-tag">{category}</span>
                      {svc.badge && <span className="sv-partner-badge">{svc.badge}</span>}
                    </div>

                    <h3 className="sv-feature-title">{svc.title}</h3>
                    <p className="sv-feature-desc">{svc.description}</p>

                    <div className="sv-deliverables-box">
                      <h4 className="sv-deliverables-heading">Key Capabilities &amp; Deliverables:</h4>
                      <ul className="sv-checklist">
                        {capabilities.map((cap, i) => (
                          <li key={i} className="sv-check-item">
                            <span className="sv-check-icon" aria-hidden="true">✓</span>
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="sv-feature-actions">
                      <Link to={svc.link} className="sv-btn sv-btn-filled sv-btn-card">
                        View Service Details <span aria-hidden="true">→</span>
                      </Link>
                      <Link to="/contact" className="sv-btn sv-btn-outline-card">
                        Request Quote
                      </Link>
                    </div>
                  </div>

                  {/* Image Column */}
                  <div className="sv-feature-media">
                    <div className={`sv-image-frame ${svc.id === 'ekahau' ? 'sv-image-frame-brand' : ''}`}>
                      {svc.id === 'ekahau' ? (
                        <div className="sv-brand-logo-container">
                          <div className="sv-brand-pattern" aria-hidden="true" />
                          <img
                            src={svc.image}
                            alt={svc.title}
                            loading="lazy"
                            className="sv-brand-logo-img"
                          />
                          <span className="sv-brand-partner-badge">Official Certified Partner</span>
                        </div>
                      ) : (
                        <img
                          src={svc.image}
                          alt={svc.title}
                          loading="lazy"
                          className="sv-feature-img"
                        />
                      )}
                      <div className="sv-image-accent-glow" aria-hidden="true" />
                      <div className="sv-image-bottom-badge">
                        <span className="sv-img-badge-dot" />
                        <span>Global Dispatch Available</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 5. BOTTOM ENTERPRISE CTA ═══ */}
      <section className="sv-bottom-cta">
        <div className="container">
          <div className="sv-cta-card">
            <div className="sv-cta-content">
              <span className="sv-pill-badge sv-pill-dark">GET IN TOUCH</span>
              <h2 className="sv-cta-heading">Ready to Scale Your IT Infrastructure?</h2>
              <p className="sv-cta-desc">
                Whether you need smart hands engineers dispatched tomorrow or a full multi-site Ekahau wireless survey, our team is ready.
              </p>
              <div className="sv-cta-buttons">
                <Link to="/contact" className="sv-btn sv-btn-filled sv-btn-lg">
                  Contact Our Engineering Team
                </Link>
                <Link to="/engineer" className="sv-btn sv-btn-filled sv-btn-lg">
                  Enter Engineer Hub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
