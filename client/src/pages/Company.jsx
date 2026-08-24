import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import siteData from '../data/siteData.json';
import { usePartner } from '../components/PartnerContext.jsx';
import InteractiveCoverageMap from '../components/InteractiveCoverageMap.jsx';
import {
  Globe2,
  ShieldCheck,
  Target,
  Compass,
  Heart,
  Brain,
  CheckCircle2,
  Key,
  Monitor,
  Wifi,
  Layers,
  Laptop,
  Shield,
  Users,
  ArrowRight,
  MapPin,
  Activity,
  Zap,
  Mail,
  ChevronRight
} from 'lucide-react';
import './Company.css';

const PARTNERS = [
  { name: 'Service Industry Association', logo: '/assets/partners/service_industry_association_logo-150x150.jpeg' },
  { name: 'ASCDI', logo: '/assets/partners/ascdi_logo-150x150.jpeg' },
  { name: 'Partner', logo: '/assets/partners/file-300x200.jpg' },
  { name: 'Ekahau', logo: '/assets/partners/2017_Ekahau_logo_black-640x360-1-300x169.png' },
];

// Actual Client Logo Assets from htechsupports.com
const CLIENT_LOGOS = [
  '/assets/clients/351.png',
  '/assets/clients/36.png',
  '/assets/clients/34.png',
  '/assets/clients/33.png',
  '/assets/clients/32.jpg',
  '/assets/clients/31.png',
  '/assets/clients/30.jpg',
  '/assets/clients/29.png',
  '/assets/clients/28.jpg',
  '/assets/clients/27.png',
  '/assets/clients/26.png',
  '/assets/clients/25.png',
  '/assets/clients/24.png',
  '/assets/clients/23.jpg',
  '/assets/clients/22.png',
  '/assets/clients/21.png',
  '/assets/clients/008.jpg',
  '/assets/clients/07.jpg',
  '/assets/clients/01.png',
  '/assets/clients/06.jpg',
  '/assets/clients/005.jpg',
  '/assets/clients/03.png',
  '/assets/clients/02.png'
];

// Fact-checked Why HTech Support 4 Pillars
const WHY_HTECH_PILLARS = [
  {
    title: 'Honesty and Integrity',
    icon: Heart,
    color: '#4f46e5',
    desc: 'We stand by our ethos: say what you are going to do and then deliver upon it. If we can’t do it, we will tell you we can’t.'
  },
  {
    title: 'Empathy and Diligence',
    icon: Brain,
    color: '#0284c7',
    desc: 'We will understand your position then work with you until it is brought to a satisfactory conclusion.'
  },
  {
    title: 'Be Prepared',
    icon: CheckCircle2,
    color: '#059669',
    desc: 'We will always be prepared to do what is required to get the job done in a timely and professional manner.'
  },
  {
    title: 'Trust',
    icon: Key,
    color: '#d97706',
    desc: 'Our relationships are built on trust — trust to deliver what we say we will deliver. Quite simple: if there’s no trust, there’s no relationship.'
  }
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
    <div className="company-page light-theme">
      <Helmet>
        <title>Company — HTech Supports</title>
        <meta name="description" content={company.tagline} />
        <meta property="og:title" content="Company | HTech Supports" />
        <meta property="og:description" content={company.tagline} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ── HERO SECTION ── */}
      <section className="company-hero-light" aria-labelledby="company-title">
        <div className="hero-pattern-bg" aria-hidden="true" />
        <div className="container company-hero-grid">
          <div className="hero-text-col">
            <div className="hero-badge-light">
              <Zap className="badge-icon" />
              <span>Global IT Infrastructure & Support</span>
            </div>
            <h1 id="company-title">
              Everything You Need. <br />
              <span className="hero-title-accent">Global IT Support & Infrastructure.</span>
            </h1>
            <p className="hero-subtitle-light">
              HTS has a strong global presence, delivering solutions across more than 50 countries. Our engineers, many of whom are multilingual, range from Level 1 through to Level 3 across a broad spectrum of vendor technologies.
            </p>
            
            <div className="hero-ctas">
              <Link to="/contact" className="hts-btn hts-btn-navy hts-btn-lg">
                Contact Us <ArrowRight className="btn-icon" />
              </Link>
            </div>

            <div className="hero-trust-pills-light">
              <div className="trust-pill-light">
                <Globe2 className="pill-icon" />
                <span>50+ Countries</span>
              </div>
              <div className="trust-pill-light">
                <ShieldCheck className="pill-icon" />
                <span>BPSS Cleared</span>
              </div>
              <div className="trust-pill-light">
                <Activity className="pill-icon" />
                <span>24/7 SLA Response</span>
              </div>
            </div>
          </div>

          <div className="hero-visual-col">
            <div className="visual-card-wrapper-light">
              <img
                src="/assets/images/company-hero.png"
                alt="HTech Supports Global Operations"
                className="hero-main-img"
              />
              <div className="hero-float-card-light glass-card-light">
                <div className="float-card-icon-light">
                  <Activity className="pulse-icon" />
                </div>
                <div className="float-card-info">
                  <span className="float-card-label">Global Engineering SLA</span>
                  <span className="float-card-val">99.9% On-Time Dispatch</span>
                </div>
              </div>
              <div className="hero-float-card-2-light glass-card-light">
                <div className="float-card-icon-light cyan">
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

      {/* ── COMPANY OVERVIEW SECTION ── */}
      <section className="company-overview-section">
        <div className="container">
          <div className="overview-card-light">
            <div className="overview-text-side">
              <span className="section-eyebrow-navy">ABOUT HTECH SUPPORTS</span>
              <h2>Delivering With Scale and Agility</h2>
              <p>
                Our global services are provisioned through the use of our own engineers and our highly approved service partners. Servicing client requirements in multiple sectors from simple smart hands engineering to the more complicated consultative approach that enables us to build solutions partnered alongside our clients.
              </p>
              <p>
                HTS can support you in Datacenter, Unified collaboration, Deskside support with back fill or fixed term contracted engineers, Wireless and Data communications, global roll outs, and forward stocking locations to ease international shipping.
              </p>
            </div>
            <div className="overview-image-side">
              <img src="/assets/images/company-services.png" alt="HTech Capabilities" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION SHOWCASE ── */}
      <section className="company-mv-section">
        <div className="container">
          <header className="section-header-light">
            <span className="section-eyebrow-navy">PURPOSE & DIRECTION</span>
            <h2>Mission & Vision</h2>
            <p>Our commitment to delivering excellence for clients worldwide.</p>
          </header>

          <div className="mv-dual-grid">
            {/* Mission Statement Card */}
            <article className="mv-card-light mission">
              <div className="mv-card-image">
                <img src="/assets/images/company-mission.png" alt="HTech Supports Mission" loading="lazy" />
                <div className="mv-badge-pill">
                  <Target className="pill-svg" /> Mission Statement
                </div>
              </div>
              <div className="mv-card-body">
                <h3>Our Mission</h3>
                <blockquote className="mv-quote">
                  “To provide exceptional technical support and innovative solutions to our clients worldwide. We strive to keep their IT systems running seamlessly, enabling them to focus on their core business.”
                </blockquote>
                <div className="mv-action">
                  <a href="mailto:sales@htechsupports.com" className="hts-btn hts-btn-navy hts-btn-sm">
                    <Mail className="btn-icon-sm" /> Let’s Get In Touch
                  </a>
                </div>
              </div>
            </article>

            {/* Vision Statement Card */}
            <article className="mv-card-light vision">
              <div className="mv-card-image">
                <img src="/assets/images/company-vision.png" alt="HTech Supports Vision" loading="lazy" />
                <div className="mv-badge-pill vision-pill">
                  <Compass className="pill-svg" /> Vision Statement
                </div>
              </div>
              <div className="mv-card-body">
                <h3>Our Vision</h3>
                <blockquote className="mv-quote">
                  “We envision Htech Supports as the go-to partner for organizations seeking reliable, forward-thinking IT services. Our commitment to excellence, agility, and global reach positions us as leaders in the industry, driving digital transformation and technological advancements.”
                </blockquote>
                <div className="mv-action">
                  <Link to="/services" className="hts-btn hts-btn-outline-navy hts-btn-sm">
                    Our Services <ChevronRight className="btn-icon-sm" />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── WHY HTECH SUPPORT (4 CORE PILLARS) ── */}
      <section className="company-why-section">
        <div className="container">
          <header className="section-header-light">
            <span className="section-eyebrow-navy">OUR CORE VALUES</span>
            <h2>Why HTech Support</h2>
            <p>You can always count on HTech Support because we know the values.</p>
          </header>

          <div className="why-pillars-grid">
            {WHY_HTECH_PILLARS.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div key={idx} className="pillar-card-light">
                  <div className="pillar-icon-wrapper" style={{ backgroundColor: `${pillar.color}15`, color: pillar.color }}>
                    <IconComp className="pillar-icon" />
                  </div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GLOBAL FOOTPRINT COVERAGE ── */}
      <section className="company-coverage-light">
        <div className="container">
          <div className="coverage-wrapper-light">
            <div className="coverage-info-col">
              <header className="section-header-light align-left">
                <span className="section-eyebrow-navy">GLOBAL REACH</span>
                <h2>Global Footprint</h2>
                <p>Engineers deployed and services delivered across five major regions worldwide.</p>
              </header>

              <div className="coverage-interactive-box">
                <InteractiveCoverageMap />
              </div>
            </div>

            <div className="coverage-stats-col">
              <div className="coverage-grid-light">
                {company.coverageStats.map((region, i) => (
                  <div key={region.region} className="coverage-card-light">
                    <div className="coverage-ring-light" style={{ '--pct': region.percentage }}>
                      <span className="coverage-value-light">{region.percentage}%</span>
                    </div>
                    <h3>{region.region}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DELIVER (CAPABILITIES) ── */}
      <section className="company-deliverables-section">
        <div className="container">
          <header className="section-header-light">
            <span className="section-eyebrow-navy">CAPABILITIES</span>
            <h2>What We Deliver</h2>
            <p>End-to-end infrastructure lifecycle — from design to decommission.</p>
          </header>

          <div className="services-summary-grid-light">
            {DELIVERABLES.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <article key={svc.title} className="svc-card-light">
                  <div className="svc-icon-box" aria-hidden="true">
                    <Icon className="svc-icon-svg" />
                  </div>
                  <div className="svc-card-body">
                    <h3>{svc.title}</h3>
                    <p>{svc.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── OUR PARTNERS ── */}
      <section className="company-partners-light">
        <div className="container">
          <header className="section-header-light">
            <span className="section-eyebrow-navy">ECOSYSTEM</span>
            <h2>Our Partners</h2>
            <p>Collaborating with industry leaders to deliver best-in-class solutions.</p>
          </header>

          <div className="partners-grid-light">
            {PARTNERS.map((p) => (
              <div key={p.name} className="partner-card-light" title={p.name}>
                <img src={p.logo} alt={p.name} loading="lazy" />
                <span className="partner-name-light">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENTS LOGOS MARQUEE ── */}
      <section className="company-clients-light">
        <div className="container">
          <header className="section-header-light">
            <span className="section-eyebrow-navy">ENTERPRISE FOOTPRINT</span>
            <h2>CLIENTS</h2>
            <p>Some of our awesome clients we’ve had great pleasure working with!</p>
          </header>
        </div>

        <div className="clients-marquee-light" aria-label="Client logos slider">
          <div className="marquee-track-light">
            {CLIENT_LOGOS.map((logoPath, idx) => (
              <div key={`client-logo-${idx}`} className="client-logo-card-light">
                <img src={logoPath} alt="HTech Client Logo" loading="lazy" />
              </div>
            ))}
            {CLIENT_LOGOS.map((logoPath, idx) => (
              <div key={`client-logo-repeat-${idx}`} className="client-logo-card-light">
                <img src={logoPath} alt="HTech Client Logo" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="company-cta-light">
        <div className="container">
          <div className="cta-box-light">
            <span className="cta-eyebrow-navy">START YOUR DEPLOYMENT</span>
            <h2>Ready to Get Started?</h2>
            <p>
              Whether you need a single-site deployment or a multi-country rollout, our team is ready to design, dispatch, and deliver.
            </p>
            <div className="cta-actions">
              <Link to="/contact" className="hts-btn hts-btn-navy hts-btn-lg">
                Contact Us <ArrowRight className="btn-icon" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}