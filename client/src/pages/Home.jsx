/* src/pages/Home.jsx – Full home page with all sections */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import siteData      from '../data/siteData.json';
import LogoCarousel   from '../components/LogoCarousel.jsx';
import ServicesGrid   from '../components/ServicesGrid.jsx';
import CompanySection from '../components/CompanySection.jsx';
import SectorsSection from '../components/SectorsSection.jsx';
import CoverageSection from '../components/CoverageSection.jsx';
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

      {/* ── 1. Hero ─────────────────────────────────────── */}
      <section className="hero" aria-label="Hero banner">
        {/* Real background photo */}
        <img
          className="hero-bg-image"
          src="/assets/images/hero-startup-1.png"
          alt=""
          aria-hidden="true"
          loading="eager"
        />
        {/* Translucent gradient mirror layer, straight base */}
        <div className="hero-gradient-overlay" aria-hidden="true" />

        <div className="container hero-inner">
          <p className="hero-eyebrow">Global IT Support &amp; Infrastructure Services</p>
          <h1 className="hero-headline">
            Everything you need.<br />
            <RotatingWord words={taglineRotator} />
          </h1>
          <p className="hero-sub">{description}</p>
          <div className="hero-ctas">
            <a href="/pages/services/" className="btn-primary">Our Services</a>
            <a href="#contact"         className="btn-primary">Get in Touch</a>
          </div>
        </div>

        {/* Moving brand carousel, embedded within the hero band itself */}
        <LogoCarousel variant="mini" />
      </section>

      {/* ── 2. What We Do – Services Grid ─────────────────── */}
      <ServicesGrid />

      {/* ── 3. The Company (particles) ────────────────────── */}
      <CompanySection />

      {/* ── 4. Our Sectors ─────────────────────────────────── */}
      <SectorsSection />

      {/* ── 5. Our Coverage (map + dynamic region bars) ──────── */}
      <CoverageSection />

      {/* ── 6. Clients ──────────────────────────────────────── */}
      <LogoCarousel variant="full" />

      {/* ── 7. Contact Form ─────────────────────────────────── */}
      <ContactSection />
    </>
  );
}
