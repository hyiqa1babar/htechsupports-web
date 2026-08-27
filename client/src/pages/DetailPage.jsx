// src/pages/DetailPage.jsx — Premium service detail
import React, { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import siteData from '../data/siteData.json';
import { Link, useParams } from 'react-router-dom';
import { usePartner } from '../components/PartnerContext.jsx';
import './DetailPage.css';

function Reveal({ children, className = '', delay = 0, tag: Tag = 'div' }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return <Tag ref={ref} className={`${className} rv ${v ? 'rv-in' : ''}`} style={{ transitionDelay: `${delay}ms` }}>{children}</Tag>;
}

function DetailPage({ slug }) {
  const params = useParams();
  const currentSlug = slug || params.id || params.slug;
  const initialPage = siteData.detailPages?.[currentSlug];
  const [page, setPage] = useState(initialPage);
  const openPartner = usePartner();

  useEffect(() => {
    // Keep initial data if route changes
    const fallback = siteData.detailPages?.[currentSlug];
    if (fallback) setPage(fallback);

    // Check for updated content from backend
    let isMounted = true;
    fetch('/api/pages')
      .then(res => res.json())
      .then(pages => {
        if (!isMounted || !Array.isArray(pages)) return;
        const matched = pages.find(p => p.slug === currentSlug || p.id === `detail-${currentSlug}` || p.id === currentSlug);
        if (matched) {
          setPage(prev => ({
            ...prev,
            title: matched.title || prev?.title,
            tagline: matched.tagline || prev?.tagline,
            description: matched.content || prev?.description,
            image: matched.image_url || prev?.image,
            features: matched.features || prev?.features,
            caseStudy: matched.caseStudy || prev?.caseStudy,
          }));
        }
      })
      .catch(() => {});

    return () => { isMounted = false; };
  }, [currentSlug]);

  if (!page) return (
    <div className="dp"><Helmet><title>Not Found — HTech Supports</title></Helmet>
      <div className="dp-empty container"><h1>Page Not Found</h1><Link to="/services">← Back to Services</Link></div>
    </div>
  );

  const isService = page.kind === 'service';
  const allServices = siteData.services?.filter(s => s.id !== currentSlug).slice(0, 3) || [];

  return (
    <div className="dp">
      <Helmet>
        <title>{page.title} — HTech Supports</title>
        <meta name="description" content={page.tagline} />
        <meta property="og:title" content={`${page.title} | HTech Supports`} />
        <meta property="og:description" content={page.tagline} />
        <meta property="og:image" content={page.image} />
      </Helmet>

      {/* ═══ SPLIT HERO ═══ */}
      <section className="dp-hero">
        <div className="dp-hero-img-side">
          <img src={page.image} alt={page.title} />
          <div className="dp-hero-img-overlay" />
        </div>
        <div className="dp-hero-text-side">
          <div className="dp-hero-inner">
            <span className="dp-pill">{isService ? 'Service' : 'Sector'}</span>
            <h1>{page.title}</h1>
            <p className="dp-hero-tagline">{page.tagline}</p>
            <div className="dp-hero-btns">
              <Link to="/contact" className="dp-btn dp-btn-accent">Contact Us</Link>
              <Link to={isService ? '/services' : '/sectors'} className="dp-btn dp-btn-outline">
                ← All {isService ? 'Services' : 'Sectors'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DESCRIPTION ═══ */}
      <Reveal className="dp-desc">
        <div className="container dp-desc-grid">
          <div className="dp-desc-content">
            <span className="dp-pill">Overview</span>
            <h2>What We Deliver</h2>
            <p>{page.description}</p>
          </div>
          <div className="dp-desc-visual">
            <div className="dp-desc-card">
              <img src={page.image} alt="" loading="lazy" />
            </div>
            {/* Decorative floating accent */}
            <div className="dp-desc-accent" aria-hidden="true" />
          </div>
        </div>
      </Reveal>

      {/* ═══ FEATURES ═══ */}
      {page.features?.length > 0 && (
        <section className="dp-feats">
          <div className="container">
            <Reveal className="dp-feats-head">
              <span className="dp-pill">Capabilities</span>
              <h2>Key Capabilities</h2>
            </Reveal>
            <div className="dp-feats-grid">
              {page.features.map((f, i) => (
                <Reveal key={f} className="dp-feat" delay={i * 100} tag="div">
                  <div className="dp-feat-num">0{i + 1}</div>
                  <h3>{f}</h3>
                  <div className="dp-feat-bar"><div className="dp-feat-bar-fill" /></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ CASE STUDY ═══ */}
      {page.caseStudy && (
        <Reveal className="dp-case">
          <div className="container">
            <div className="dp-case-card">
              <div className="dp-case-deco" aria-hidden="true" />
              <span className="dp-pill">Case Study</span>
              <p>{page.caseStudy}</p>
            </div>
          </div>
        </Reveal>
      )}

      {/* ═══ RELATED SERVICES ═══ */}
      {allServices.length > 0 && (
        <section className="dp-related">
          <div className="container">
            <Reveal className="dp-related-head">
              <h2>Explore More Services</h2>
            </Reveal>
            <div className="dp-related-grid">
              {allServices.map((s, i) => (
                <Reveal key={s.id} delay={i * 100}>
                  <Link to={s.link} className="dp-related-card">
                    <img src={s.image} alt={s.title} loading="lazy" />
                    <div className="dp-related-body">
                      <h3>{s.title}</h3>
                      <span className="dp-related-arrow">→</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ CTA ═══ */}
      <section className="dp-cta">
        <div className="dp-cta-glow" aria-hidden="true" />
        <div className="container dp-cta-inner">
          <h2>Ready to Get Started?</h2>
          <p>Talk to our team about your requirements and discover how we can support your operations.</p>
          <div className="dp-cta-btns">
            <Link to="/contact" className="dp-btn dp-btn-accent">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DetailPage;