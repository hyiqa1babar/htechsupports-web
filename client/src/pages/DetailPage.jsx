// src/pages/DetailPage.jsx
import React, { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import siteData from '../data/siteData.json';
import { Link } from 'react-router-dom';
import { usePartner } from '../components/PartnerContext.jsx';
import './DetailPage.css';

function FadeIn({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`${className} fade-section ${vis ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function DetailPage({ slug }) {
  const page = siteData.detailPages?.[slug];
  const openPartner = usePartner();

  if (!page) {
    return (
      <div className="detail-page not-found">
        <Helmet><title>Page Not Found — HTech Supports</title><meta name="description" content="The requested page could not be found." /></Helmet>
        <section className="detail-hero"><div className="container"><h1>Page Not Found</h1><p>The page you're looking for doesn't exist or has been moved.</p><Link to="/services" className="dp-btn dp-btn-primary">← Back to Services</Link></div></section>
      </div>
    );
  }

  const isService = page.kind === 'service';
  const kindLabel = isService ? 'Service' : 'Sector';

  return (
    <div className="detail-page">
      <Helmet>
        <title>{page.title} — HTech Supports</title>
        <meta name="description" content={page.tagline} />
        <meta property="og:title" content={`${page.title} | HTech Supports`} />
        <meta property="og:description" content={page.tagline} />
        <meta property="og:image" content={page.image} />
      </Helmet>

      {/* ── HERO ── */}
      <section className="dp-hero" aria-labelledby="dp-title">
        <img src={page.image} alt="" className="dp-hero-bg" aria-hidden="true" />
        <div className="dp-hero-overlay" />
        <div className="container dp-hero-content">
          <span className="dp-badge">{kindLabel}</span>
          <h1 id="dp-title">{page.title}</h1>
          <p className="dp-tagline">{page.tagline}</p>
          <div className="dp-hero-ctas">
            <button onClick={openPartner} className="dp-btn dp-btn-white">Become A Partner</button>
            <Link to={isService ? '/services' : '/sectors'} className="dp-btn dp-btn-outline">← All {isService ? 'Services' : 'Sectors'}</Link>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <FadeIn className="dp-intro">
        <div className="container dp-intro-grid">
          <div className="dp-intro-text">
            <h2>What We Deliver</h2>
            <p>{page.description}</p>
          </div>
          <div className="dp-intro-media">
            <img src={page.image} alt="" loading="lazy" />
          </div>
        </div>
      </FadeIn>

      {/* ── FEATURES ── */}
      {page.features?.length > 0 && (
        <section className="dp-features">
          <div className="container">
            <FadeIn className="dp-section-header">
              <h2>Key Capabilities</h2>
              <p>Core competencies that define our {isService ? 'service delivery' : 'sector expertise'}</p>
            </FadeIn>
            <ul className="dp-features-grid" role="list">
              {page.features.map((f, i) => (
                <FadeIn key={f} delay={i * 100}>
                  <li className="dp-feature-card">
                    <span className="dp-feature-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    <span className="dp-feature-label">{f}</span>
                  </li>
                </FadeIn>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── CASE STUDY ── */}
      {page.caseStudy && (
        <FadeIn className="dp-case">
          <div className="container">
            <div className="dp-case-card">
              <div className="dp-case-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
              <h3>Case Study</h3>
              <p>{page.caseStudy}</p>
            </div>
          </div>
        </FadeIn>
      )}

      {/* ── CTA ── */}
      <section className="dp-cta-band">
        <div className="container dp-cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Talk to our team about your requirements and discover how we can support your operations.</p>
          <div className="dp-cta-actions">
            <button onClick={openPartner} className="dp-btn dp-btn-white">Become A Partner</button>
            <Link to="/contact" className="dp-btn dp-btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DetailPage;