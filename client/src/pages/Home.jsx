/* src/pages/Home.jsx – Full home page with all sections */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import LogoCarousel   from '../components/LogoCarousel.jsx';
import ServicesGrid   from '../components/ServicesGrid.jsx';
import CompanySection from '../components/CompanySection.jsx';
import SectorsSection from '../components/SectorsSection.jsx';
import ContactSection from '../components/ContactSection.jsx';
import './Home.css';

export default function Home() {
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
        <div className="hero-bg" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-content">
            <p className="hero-eyebrow">Global IT Support &amp; Infrastructure Services</p>
            <h1 className="hero-headline">
              Everything you need.<br />
              <span className="hero-accent">Global IT Support</span>
            </h1>
            <p className="hero-sub">
              HTS has a strong global presence, delivering solutions across more than 50 countries.
              Our multilingual engineers range from Level&nbsp;1 through Level&nbsp;3.
            </p>
            <div className="hero-ctas">
              <a href="/pages/services/" className="btn-primary">Our Services</a>
              <a href="#contact"         className="btn-outline">Get in Touch</a>
            </div>
          </div>

          <div className="hero-image" aria-hidden="true">
            <img
              src="/assets/images/hero-startup-1.png"
              alt="HTS engineers providing global IT support"
              loading="eager"
              width={520}
              height={420}
            />
          </div>
        </div>
      </section>

      {/* ── 2. Global Roll Out – Logo Carousel (REDESIGNED) ─ */}
      <LogoCarousel />

      {/* ── 3. What We Do – Services Grid (REDESIGNED) ────── */}
      <ServicesGrid />

      {/* ── 4. The Company (REDESIGNED – particles) ─────── */}
      <CompanySection />

      {/* ── 5. Our Sectors (ORIGINAL STYLE) ─────────────── */}
      <SectorsSection />

      {/* ── 6. Contact Form (ORIGINAL STYLE) ─────────────── */}
      <ContactSection />
    </>
  );
}
