// src/pages/Services.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import siteData from '../data/siteData.json';
import './Services.css';

/* ── Rotating Hero Banner ── */
function HeroBanner({ services }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % services.length), 4000);
    return () => clearInterval(t);
  }, [services.length]);

  const svc = services[idx];
  return (
    <section className="svc-hero" aria-label="Services hero banner">
      {services.map((s, i) => (
        <img
          key={s.id}
          src={s.image}
          alt=""
          aria-hidden="true"
          className={`svc-hero-bg ${i === idx ? 'active' : ''}`}
        />
      ))}
      <div className="svc-hero-overlay" />
      <div className="container svc-hero-content">
        <span className="svc-hero-badge">Our Services</span>
        <h1 className="svc-hero-title">Empowering Global IT Infrastructure</h1>
        <p className="svc-hero-sub">
          From professional AV installations to worldwide staff augmentation —
          we deliver end-to-end IT services across 50+ countries.
        </p>
        <div className="svc-hero-dots">
          {services.map((s, i) => (
            <button
              key={s.id}
              className={`svc-dot ${i === idx ? 'active' : ''}`}
              onClick={() => setIdx(i)}
              aria-label={s.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Service Card ── */
function ServiceShowcase({ service, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isReverse = index % 2 !== 0;

  return (
    <div
      ref={ref}
      className={`svc-showcase ${isReverse ? 'reverse' : ''} ${visible ? 'visible' : ''}`}
    >
      <div className="svc-showcase-inner container">
        <div className="svc-showcase-media">
          <img src={service.image} alt={service.title} loading="lazy" />
        </div>
        <div className="svc-showcase-text">
          <span className="svc-showcase-num">0{index + 1}</span>
          <h2>{service.title}</h2>
          <p>{service.description}</p>
          <Link to={service.link} className="svc-showcase-btn">
            View Details
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const { services } = siteData;

  return (
    <>
      <Helmet>
        <title>IT Services — HTech Supports</title>
        <meta name="description" content="Explore our full range of global IT services including professional AV, wireless surveys, network support, structured cabling and more." />
      </Helmet>

      <HeroBanner services={services} />

      <section className="svc-list" aria-label="All services">
        {services.map((svc, i) => (
          <ServiceShowcase key={svc.id} service={svc} index={i} />
        ))}
      </section>

      {/* CTA Band */}
      <section className="svc-cta-band">
        <div className="container svc-cta-inner">
          <h2>Need a Tailored IT Solution?</h2>
          <p>Get in touch with our team to discuss your requirements.</p>
          <Link to="/contact" className="svc-cta-btn">Contact Us</Link>
        </div>
      </section>
    </>
  );
}
