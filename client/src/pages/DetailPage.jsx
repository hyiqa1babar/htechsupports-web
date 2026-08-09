// src/pages/DetailPage.jsx
// Shared detail page for all 13 service/sector pages — data-driven from siteData.json
import React from 'react';
import { Helmet } from 'react-helmet-async';
import siteData from '../data/siteData.json';
import { Link } from 'react-router-dom';
import { usePartner } from '../components/PartnerContext.jsx';
import './DetailPage.css';

function DetailPage({ slug }) {
  const page = siteData.detailPages?.[slug];
  const openPartner = usePartner();

  if (!page) {
    return (
      <div className="detail-page not-found">
        <Helmet>
          <title>Page Not Found — HTech Supports</title>
          <meta name="description" content="The requested page could not be found." />
        </Helmet>
        <section className="detail-hero">
          <div className="container">
            <h1>Page Not Found</h1>
            <p>The page you're looking for doesn't exist or has been moved.</p>
            <Link to="/services" className="hts-btn hts-btn-primary">← Back to Services</Link>
          </div>
        </section>
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
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${page.title} | HTech Supports`} />
        <meta name="twitter:description" content={page.tagline} />
        <meta name="twitter:image" content={page.image} />
      </Helmet>

      {/* ── HERO ── */}
      <section className="detail-hero" aria-labelledby="detail-title">
        <div className="detail-hero-bg" style={{ backgroundImage: `url(${page.image})` }} aria-hidden="true" />
        <div className="detail-hero-overlay" />
        <div className="container detail-hero-content">
          <span className="detail-kind-badge">{kindLabel}</span>
          <h1 id="detail-title">{page.title}</h1>
          <p className="detail-tagline">{page.tagline}</p>
          <div className="detail-hero-ctas">
            <button onClick={openPartner} className="hts-btn hts-btn-primary hts-btn-lg">
              Become A Partner
            </button>
            <Link to={isService ? '/services' : '/sectors'} className="hts-btn hts-btn-outline hts-btn-lg">
              ← All {isService ? 'Services' : 'Sectors'}
            </Link>
          </div>
        </div>
      </section>

      {/* ── INTRO / DESCRIPTION ── */}
      <section className="detail-intro" aria-labelledby="intro-heading">
        <div className="container detail-intro-grid">
          <div className="detail-intro-text">
            <h2 id="intro-heading">What We Deliver</h2>
            <p>{page.description}</p>
          </div>
          <div className="detail-intro-media" aria-hidden="true">
            <div className="detail-media-card">
              <img src={page.image} alt="" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      {page.features?.length && (
        <section className="detail-features" aria-labelledby="features-heading">
          <div className="container">
            <header className="detail-section-header">
              <h2 id="features-heading">Key Capabilities</h2>
              <p>Core competencies that define our {isService ? 'service delivery' : 'sector expertise'}</p>
            </header>
            <ul className="detail-features-grid" role="list">
              {page.features.map((feature, i) => (
                <li key={feature} className="detail-feature-card" style={{ animationDelay: `${i * 80}ms` }}>
                  <span className="detail-feature-icon" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span className="detail-feature-text">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── CASE STUDY ── */}
      {page.caseStudy && (
        <section className="detail-case-study" aria-labelledby="case-heading">
          <div className="container">
            <div className="detail-case-card">
              <div className="detail-case-icon" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
              <h3 id="case-heading">Case Study</h3>
              <p>{page.caseStudy}</p>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA BAND ── */}
      <section className="detail-cta-band" aria-labelledby="cta-heading">
        <div className="container detail-cta-content">
          <h2 id="cta-heading">Ready to Get Started?</h2>
          <p>Talk to our team about your requirements and discover how we can support your operations.</p>
          <div className="detail-cta-actions">
            <button onClick={openPartner} className="hts-btn hts-btn-primary hts-btn-lg">
              Become A Partner
            </button>
            <a href="/contact" className="hts-btn hts-btn-outline hts-btn-lg">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DetailPage;