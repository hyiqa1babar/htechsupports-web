import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import siteData      from '../data/siteData.json';
import ServicesGrid   from '../components/ServicesGrid.jsx';
import CompanySection from '../components/CompanySection.jsx';
import SectorsSection from '../components/SectorsSection.jsx';
import CoverageSection from '../components/CoverageSection.jsx';
import LogoCarousel   from '../components/LogoCarousel.jsx';
import ContactSection from '../components/ContactSection.jsx';
import './Home.css';

function RotatingWord({ words }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 2200);
    return () => clearInterval(id);
  }, [words.length]);

  return <span className="hero-rotator">{words[index]}</span>;
}

export default function Home() {
  const { taglineRotator, description } = siteData.company;

  return (
    <>
      <Helmet>
        <title>HTech Supports – Global IT Support &amp; Infrastructure Services</title>
        <meta
          name="description"
          content="HTS delivers global IT support, wireless surveys, network support, structured cabling and professional services across 50+ countries."
        />
      </Helmet>

      {/* ── 1. Hero (Solid primary-dark background with teal-bright CTA) ── */}
      <section className="hero" aria-label="Hero banner">
        <div className="container hero-inner">
          <p className="hero-eyebrow">Global IT Support &amp; Infrastructure Services</p>
          <h1 className="hero-headline">
            Everything you need.<br />
            <RotatingWord words={taglineRotator} />
          </h1>
          <p className="hero-sub">{description}</p>
          <div className="hero-ctas">
            <Link to="/services" className="btn-primary">Our Services</Link>
            <Link to="/contact" className="btn-primary">Get in Touch</Link>
          </div>
        </div>
      </section>

      {/* ── 2. What We Do – Services Grid ─────────────────── */}
      <ServicesGrid />

      {/* ── 3. The Company ────────────────────────────────── */}
      <CompanySection />

      {/* ── 4. Our Sectors (6 Sector Cards 3x2) ───────────── */}
      <SectorsSection />

      {/* ── 5. Our Coverage (Map + dynamic region bars) ───── */}
      <CoverageSection />

      {/* ── 6. Clients (Bottom logo marquee) ──────────────── */}
      <LogoCarousel variant="full" />

      {/* ── 7. Contact Form ───────────────────────────────── */}
      <ContactSection />
    </>
  );
}
