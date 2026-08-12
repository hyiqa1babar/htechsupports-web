// src/pages/Services.jsx — Premium redesign
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

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

export default function Services() {
  const { services } = siteData;
  const [heroIdx, setHeroIdx] = useState(0);
  const [statRef, statVis] = useInView(0.3);

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i + 1) % HERO_IMAGES.length), 3500);
    return () => clearInterval(t);
  }, []);

  const stats = [
    { val: '50+', label: 'Countries' },
    { val: '7', label: 'Core Services' },
    { val: '24/7', label: 'Support' },
    { val: '1000+', label: 'Projects' },
  ];

  return (
    <>
      <Helmet>
        <title>IT Services — HTech Supports</title>
        <meta name="description" content="Explore our full range of global IT services including professional AV, wireless surveys, network support, structured cabling and more." />
      </Helmet>

      {/* ═══ HERO ═══ */}
      <section className="sv-hero">
        {HERO_IMAGES.map((src, i) => (
          <div key={src} className={`sv-hero-slide ${i === heroIdx ? 'active' : ''}`}>
            <img src={src} alt="" />
          </div>
        ))}
        <div className="sv-hero-glass" />
        <div className="sv-hero-content container">
          <div className="sv-hero-left">
            <span className="sv-pill">What We Do</span>
            <h1>Technology Solutions<br/><span className="sv-gradient-text">Built for Scale</span></h1>
            <p>End-to-end IT infrastructure services delivered across 50+ countries. From AV installation to global staff augmentation.</p>
            <div className="sv-hero-actions">
              <a href="#sv-grid" className="sv-btn sv-btn-accent">Explore Services</a>
              <Link to="/contact" className="sv-btn sv-btn-ghost">Get in Touch</Link>
            </div>
          </div>
          <div className="sv-hero-right">
            <div className="sv-hero-card">
              <img src={services[heroIdx % services.length].image} alt="" />
              <div className="sv-hero-card-label">{services[heroIdx % services.length].title}</div>
            </div>
          </div>
        </div>
        <div className="sv-hero-indicators">
          {HERO_IMAGES.map((_, i) => (
            <button key={i} onClick={() => setHeroIdx(i)} className={`sv-indicator ${i === heroIdx ? 'active' : ''}`} aria-label={`Slide ${i+1}`}>
              <span className="sv-indicator-fill" style={i === heroIdx ? { animation: 'sv-progress 3.5s linear' } : {}} />
            </button>
          ))}
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <div ref={statRef} className={`sv-stats ${statVis ? 'visible' : ''}`}>
        <div className="container sv-stats-inner">
          {stats.map(s => (
            <div key={s.label} className="sv-stat">
              <span className="sv-stat-val">{s.val}</span>
              <span className="sv-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ BENTO GRID ═══ */}
      <section id="sv-grid" className="sv-grid-section">
        <div className="container">
          <div className="sv-section-head">
            <span className="sv-pill">Our Capabilities</span>
            <h2>Services That Drive<br/><span className="sv-gradient-text">Digital Transformation</span></h2>
          </div>
          <div className="sv-bento">
            {services.map((svc, i) => (
              <ServiceBento key={svc.id} svc={svc} idx={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="sv-cta">
        <div className="sv-cta-bg" />
        <div className="container sv-cta-inner">
          <h2>Ready to Get Started?</h2>
          <p>Partner with us for scalable, reliable technology services worldwide.</p>
          <div className="sv-cta-actions">
            <Link to="/contact" className="sv-btn sv-btn-white">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceBento({ svc, idx }) {
  const [ref, vis] = useInView(0.1);
  const isFeatured = idx === 0 || idx === 3;

  return (
    <Link
      ref={ref}
      to={svc.link}
      className={`sv-card ${isFeatured ? 'sv-card--featured' : ''} ${vis ? 'visible' : ''}`}
      style={{ transitionDelay: `${idx * 80}ms` }}
    >
      <div className="sv-card-img">
        <img src={svc.image} alt={svc.title} loading="lazy" />
        <div className="sv-card-img-overlay" />
      </div>
      <div className="sv-card-body">
        <span className="sv-card-num">0{idx + 1}</span>
        <h3>{svc.title}</h3>
        <p>{svc.description.slice(0, 120)}…</p>
        <span className="sv-card-link">
          View Details
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </span>
      </div>
    </Link>
  );
}
