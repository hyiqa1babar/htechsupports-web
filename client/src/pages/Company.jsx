// src/pages/Company.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import siteData from '../data/siteData.json';
import { usePartner } from '../components/PartnerContext.jsx';
import {
  Globe2,
  ShieldCheck,
  Target,
  Compass,
  Award,
  Monitor,
  Wifi,
  Layers,
  Laptop,
  Shield,
  Users,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Activity,
  Zap
} from 'lucide-react';
import './Company.css';

const PARTNERS = [
  { name: 'Service Industry Association', logo: '/assets/partners/service_industry_association_logo-150x150.jpeg' },
  { name: 'ASCDI', logo: '/assets/partners/ascdi_logo-150x150.jpeg' },
  { name: 'Partner', logo: '/assets/partners/file-300x200.jpg' },
  { name: 'Ekahau', logo: '/assets/partners/2017_Ekahau_logo_black-640x360-1-300x169.png' },
];

const CLIENTS = [
  'Barclays', 'HSBC', 'Vodafone', 'BT', 'Ericsson',
  'Nokia', 'Cisco', 'Juniper', 'Arista', 'Dell',
  'HPE', 'Lenovo', 'VMware', 'Nutanix', 'Red Hat',
];

const VALUE_ITEMS = [
  { title: 'Engineering Excellence', desc: 'Certified, vetted, and fully accountable experts.' },
  { title: 'Client-First Agility', desc: 'Rapid SLA response and speed without compromise.' },
  { title: 'Global Reach, Local Touch', desc: '50+ countries with unified quality standards.' },
  { title: 'Integrity & Compliance', desc: 'BPSS-cleared engineers and audit-ready execution.' }
];

const DELIVERABLES = [
  {
    title: 'Professional AV & Remote Deployment',
    icon: Monitor,
    desc: 'AV installation, integration, and remote IT deployment across global sites.'
  },
  {
    title: 'Wireless & Network Engineering',
    icon: Wifi,
    desc: 'Certified Ekahau surveys, network design, migration, and 24/7 support.'
  },
  {
    title: 'Structured Cabling & Connectivity',
    icon: Layers,
    desc: 'Design, installation, testing, and certification — the backbone of IT.'
  },
  {
    title: 'End-User Computing & Deskside',
    icon: Laptop,
    desc: 'Break-fix, IMAC, backfill engineers, and fixed-term resourcing.'
  },
  {
    title: 'ITAD & Secure Asset Disposal',
    icon: Shield,
    desc: 'Site closure, relocation, data erasure, and compliance documentation.'
  },
  {
    title: 'Staff Augmentation & Global Dispatch',
    icon: Users,
    desc: 'On-site engineers, international rollouts, and FTE resourcing worldwide.'
  }
];

export default function Company() {
  const { company } = siteData;
  const openPartner = usePartner();

  return (
    <div className="company-page">
      <Helmet>
        <title>Company — HTech Supports</title>
        <meta name="description" content={company.tagline} />
        <meta property="og:title" content="Company | HTech Supports" />
        <meta property="og:description" content={company.tagline} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ── HERO SECTION ── */}
      <section className="company-hero" aria-labelledby="company-title">
        <div className="company-hero-bg" aria-hidden="true" />
        <div className="company-hero-glow" aria-hidden="true" />
        
        <div className="container company-hero-grid">
          <div className="hero-text-col">
            <div className="hero-badge">
              <Zap className="badge-icon" />
              <span>Global IT Infrastructure & Support</span>
            </div>
            <h1 id="company-title">
              Everything You Need. <br />
              <span className="hero-title-accent">Global IT Support & Infrastructure.</span>
            </h1>
            <p className="hero-subtitle">{company.description}</p>
            
            <div className="hero-ctas">
              <button onClick={openPartner} className="hts-btn hts-btn-primary hts-btn-lg">
                Become A Partner <ArrowRight className="btn-icon" />
              </button>
              <Link to="/contact" className="hts-btn hts-btn-outline hts-btn-lg">
                Contact Sales
              </Link>
            </div>

            <div className="hero-trust-pills">
              <div className="trust-pill">
                <Globe2 className="pill-icon" />
                <span>50+ Countries</span>
              </div>
              <div className="trust-pill">
                <ShieldCheck className="pill-icon" />
                <span>BPSS Cleared</span>
              </div>
              <div className="trust-pill">
                <Activity className="pill-icon" />
                <span>24/7 SLA Response</span>
              </div>
            </div>
          </div>

          <div className="hero-visual-col">
            <div className="visual-card-wrapper">
              <img
                src="/assets/images/company-hero.png"
                alt="Global IT Infrastructure Command Center"
                className="hero-main-img"
              />
              <div className="hero-float-card glass-card">
                <div className="float-card-icon">
                  <Activity className="pulse-icon" />
                </div>
                <div className="float-card-info">
                  <span className="float-card-label">Global Engineering SLA</span>
                  <span className="float-card-val">99.9% On-Time Dispatch</span>
                </div>
              </div>
              <div className="hero-float-card-2 glass-card">
                <div className="float-card-icon cyan">
                  <MapPin />
                </div>
                <div className="float-card-info">
                  <span className="float-card-label">Active Field Engineers</span>
                  <span className="float-card-val">500+ Worldwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION / VISION / VALUES ── */}
      <section className="company-mvv" aria-labelledby="mvv-heading">
        <div className="container">
          <header className="section-header">
            <span className="section-eyebrow">OUR CORE PRINCIPLES</span>
            <h2 id="mvv-heading">Our Foundation</h2>
            <p>The principles that guide every decision, deployment, and delivery.</p>
          </header>

          <div className="mvv-showcase-grid">
            {/* Mission Card */}
            <article className="mvv-feature-card mission-card">
              <div className="card-image-holder">
                <img src="/assets/images/company-mission.png" alt="HTech Supports Mission" loading="lazy" />
                <div className="image-overlay" />
                <span className="card-badge">
                  <Target className="badge-icon" /> Mission
                </span>
              </div>
              <div className="card-content-body">
                <h3>Our Mission</h3>
                <p>
                  Delivering global IT infrastructure and support with scale, agility, and unmatched engineering expertise — wherever our clients operate.
                </p>
              </div>
            </article>

            {/* Vision Card */}
            <article className="mvv-feature-card vision-card">
              <div className="card-image-holder">
                <img src="/assets/images/company-vision.png" alt="HTech Supports Vision" loading="lazy" />
                <div className="image-overlay" />
                <span className="card-badge vision">
                  <Compass className="badge-icon" /> Vision
                </span>
              </div>
              <div className="card-content-body">
                <h3>Our Vision</h3>
                <p>
                  To be the world's most trusted partner for mission-critical IT deployments — seamless, secure, and sustainable across every continent.
                </p>
              </div>
            </article>
          </div>

          {/* Values Section */}
          <div className="company-values-box">
            <div className="values-header">
              <Award className="values-main-icon" />
              <h3>Core Operating Values</h3>
            </div>
            <div className="values-grid">
              {VALUE_ITEMS.map((item, idx) => (
                <div key={idx} className="value-card">
                  <div className="value-check">
                    <CheckCircle2 />
                  </div>
                  <div className="value-text">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COVERAGE STATS ── */}
      <section className="company-coverage" aria-labelledby="coverage-heading">
        <div className="container">
          <div className="coverage-wrapper">
            <div className="coverage-info-col">
              <header className="section-header align-left">
                <span className="section-eyebrow">GLOBAL REACH</span>
                <h2 id="coverage-heading">Global Footprint</h2>
                <p>Engineers deployed and services delivered seamlessly across five major regions worldwide.</p>
              </header>

              <div className="coverage-map-preview">
                <img src="/assets/images/coverage-map.jpg" alt="HTech Supports Coverage Map" loading="lazy" />
                <div className="map-glow-pin pin-1" title="Europe" />
                <div className="map-glow-pin pin-2" title="North America" />
                <div className="map-glow-pin pin-3" title="Asia Pacific" />
                <div className="map-glow-pin pin-4" title="Middle East" />
                <div className="map-glow-pin pin-5" title="Latin America" />
              </div>
            </div>

            <div className="coverage-stats-col">
              <div className="coverage-grid">
                {company.coverageStats.map((region, i) => (
                  <div key={region.region} className="coverage-card" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="coverage-ring" style={{ '--pct': region.percentage }}>
                      <span className="coverage-value">{region.percentage}%</span>
                    </div>
                    <h3>{region.region}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DELIVER ── */}
      <section className="company-services" aria-labelledby="services-heading">
        <div className="container">
          <header className="section-header">
            <span className="section-eyebrow">CAPABILITIES</span>
            <h2 id="services-heading">What We Deliver</h2>
            <p>End-to-end infrastructure lifecycle — from design to decommission.</p>
          </header>

          <div className="deliverables-layout">
            <div className="deliverables-graphic-col">
              <div className="deliverables-graphic-card">
                <img src="/assets/images/company-services.png" alt="HTech Enterprise Capabilities" loading="lazy" />
                <div className="graphic-content-overlay">
                  <div className="overlay-pill">Full Lifecycle IT</div>
                  <h4>Single Source Global IT Operations</h4>
                  <p>Consolidate multi-country dispatch, cabling, hardware deployments, and 24/7 SLA field services under one trusted team.</p>
                </div>
              </div>
            </div>

            <div className="deliverables-grid-col">
              <div className="services-summary-grid">
                {DELIVERABLES.map((svc, i) => {
                  const Icon = svc.icon;
                  return (
                    <article key={svc.title} className="svc-summary-card" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="svc-icon-wrapper" aria-hidden="true">
                        <Icon className="svc-icon-svg" />
                      </div>
                      <div className="svc-card-content">
                        <h3>{svc.title}</h3>
                        <p>{svc.desc}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className="company-partners" aria-labelledby="partners-heading">
        <div className="container">
          <header className="section-header">
            <span className="section-eyebrow">ECOSYSTEM</span>
            <h2 id="partners-heading">Trusted Partners</h2>
            <p>Collaborating with industry leaders to deliver best-in-class solutions.</p>
          </header>

          <div className="partners-grid-wrapper">
            <div className="partners-logos">
              {PARTNERS.map((p) => (
                <div key={p.name} className="partner-badge-card" title={p.name}>
                  <img src={p.logo} alt={p.name} loading="lazy" />
                  <span className="partner-name">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENTS MARQUEE ── */}
      <section className="company-clients" aria-labelledby="clients-heading">
        <div className="container">
          <header className="section-header">
            <span className="section-eyebrow">ENTERPRISE FOOTPRINT</span>
            <h2 id="clients-heading">Clients & Deployments</h2>
            <p>Serving global enterprises, financial institutions, carriers, and public sector.</p>
          </header>
        </div>

        <div className="clients-marquee-container" aria-hidden="true">
          <div className="marquee-track">
            {CLIENTS.map((c) => (
              <div key={c} className="marquee-item-card">
                <span className="client-dot" />
                <span className="client-name">{c}</span>
              </div>
            ))}
            {CLIENTS.map((c) => (
              <div key={`${c}-repeat`} className="marquee-item-card">
                <span className="client-dot" />
                <span className="client-name">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="company-cta" aria-labelledby="cta-heading">
        <div className="container">
          <div className="company-cta-box">
            <div className="cta-glow-bg" />
            <div className="company-cta-content">
              <span className="cta-eyebrow">START YOUR DEPLOYMENT</span>
              <h2 id="cta-heading">Ready to Partner with HTech?</h2>
              <p>
                Whether you need a single-site deployment or a multi-country rollout, our team is ready to design, dispatch, and deliver.
              </p>
              <div className="cta-actions">
                <button onClick={openPartner} className="hts-btn hts-btn-primary hts-btn-lg">
                  Become A Partner <ArrowRight className="btn-icon" />
                </button>
                <Link to="/contact" className="hts-btn hts-btn-outline hts-btn-lg">
                  Start a Conversation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}