// src/pages/EkahauPage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { usePartner } from '../components/PartnerContext.jsx';
import {
  Wifi,
  Radio,
  Layers,
  Activity,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowRight,
  FileSpreadsheet,
  Maximize2,
  Sliders,
  Cpu
} from 'lucide-react';
import './EkahauPage.css';

const SURVEY_TYPES = [
  {
    id: 'predictive',
    title: 'Predictive 3D RF Design',
    subtitle: 'Pre-Deployment & Greenfield Planning',
    desc: 'Using architectural CAD / PDF blueprints and building material definitions (concrete, drywall, glass, metal racking), we simulate signal propagation, AP placements, and antenna configurations before running a single cable.',
    points: [
      'Accurate 3D wall & obstacle attenuation modeling',
      'Optimized AP placement & bill-of-materials (BOM)',
      'Wi-Fi 6E (6 GHz) and Wi-Fi 7 channel planning',
      'Saves up to 40% on unnecessary hardware & cabling costs'
    ],
    badge: 'Virtual Simulation'
  },
  {
    id: 'apos',
    title: 'AP-on-a-Stick (APoS) Surveys',
    subtitle: 'Physical Pre-Install Verification',
    desc: 'Our certified engineers deploy portable battery-powered mast rigs on-site with your exact target Access Point and antenna models to measure real-world signal attenuation, reflection, and absorption in challenging environments.',
    points: [
      'Vital for warehouses, high-ceiling atriums & manufacturing plants',
      'Validates racking, machinery, and pallet RF absorption',
      'Determines exact mounting heights and down-tilt angles',
      'Eliminates guesswork before permanent cabling is run'
    ],
    badge: 'On-Site Pre-Install'
  },
  {
    id: 'validation',
    title: 'Post-Deployment Validation',
    subtitle: 'Commissioning & Active Troubleshooting',
    desc: 'Continuous walk-through survey using Ekahau Sidekick 2 to measure actual signal strength, primary/secondary coverage, SNR, packet loss, and spectrum interference across every square metre of your facility.',
    points: [
      'Complete multi-band (2.4 GHz, 5 GHz, 6 GHz) coverage verification',
      'Pinpoints co-channel interference and rogue wireless emitters',
      'Seamless roaming validation for VoIP, mobile POS & scanners',
      'Delivers executive heatmaps & actionable remediation steps'
    ],
    badge: 'Live Site Walk'
  }
];

const DELIVERABLES = [
  {
    title: 'Signal Strength (RSSI) Heatmaps',
    icon: Wifi,
    desc: 'Visual heatmaps displaying primary and secondary signal coverage to ensure zero dead spots across all work areas.'
  },
  {
    title: 'Signal-to-Noise Ratio (SNR)',
    icon: Activity,
    desc: 'Precise measurement of wireless signal quality above ambient noise floor to guarantee maximum throughput.'
  },
  {
    title: 'Channel Overlap & Interference',
    icon: Radio,
    desc: 'Detection of co-channel interference (CCI), adjacent channel contention, and non-Wi-Fi RF interferers.'
  },
  {
    title: 'VoIP & Fast Roaming Validation',
    icon: Zap,
    desc: 'Roam latency and ping jitter analysis for uninterrupted voice, video conferencing, and automated robotic systems.'
  },
  {
    title: 'Hardware Bill of Materials (BOM)',
    icon: Layers,
    desc: 'Exact bill of materials specifying AP counts, model numbers, antenna choices, and recommended switch port budgets.'
  },
  {
    title: 'Executive & Technical PDF Reports',
    icon: FileSpreadsheet,
    desc: 'Comprehensive executive summary + complete raw .esx project files for your in-house network operations team.'
  }
];

const TOOLING = [
  {
    name: 'Ekahau Sidekick 2',
    role: 'Enterprise Multi-Band Spectrum Analyzer',
    desc: 'The gold-standard enterprise Wi-Fi diagnostic device with quad-radio architecture supporting 2.4, 5, and 6 GHz spectrum sweeps.'
  },
  {
    name: 'Ekahau AI Pro',
    role: 'AI-Powered Wi-Fi Planning Software',
    desc: 'Advanced automated channel assignment, AP auto-placement, and 3D multi-floor RF simulation algorithms.'
  },
  {
    name: 'ECSE Certified Engineers',
    role: 'Ekahau Certified Solutions Engineers',
    desc: 'Delivered exclusively by vetted, industry-certified wireless specialists with multi-vendor expertise (Cisco, Aruba, Meraki, Ruckus, Mist).'
  }
];

export default function EkahauPage() {
  const [activeTab, setActiveTab] = useState('predictive');
  const openPartner = usePartner();

  const currentSurvey = SURVEY_TYPES.find((s) => s.id === activeTab) || SURVEY_TYPES[0];

  return (
    <div className="ek-page">
      <Helmet>
        <title>Ekahau Wi-Fi Surveys &amp; Design — HTech Supports (Official Partner)</title>
        <meta
          name="description"
          content="Official Certified Ekahau Partner. High-precision predictive 3D Wi-Fi design, APoS surveys, and Ekahau Sidekick 2 wireless validation across 50+ countries."
        />
      </Helmet>

      {/* ── HERO ── */}
      <section className="ek-hero">
        <div className="container ek-hero-inner">
          <div className="ek-hero-content">
            <div className="ek-badge-row">
              <div className="ek-partner-badge">
                <img
                  src="/assets/partners/2017_Ekahau_logo_black-640x360-1-300x169.png"
                  alt="Official Ekahau Partner"
                  className="ek-partner-logo"
                />
                <span className="ek-partner-label">Certified Partner</span>
              </div>
              <span className="ek-pill">Wi-Fi 6E / Wi-Fi 7 Ready</span>
            </div>

            <h1 className="ek-title">
              Precision Ekahau <br />
              <span className="ek-gradient-text">Wi-Fi Surveys &amp; Design</span>
            </h1>

            <p className="ek-lead">
              Eliminate dropped calls, slow throughput, and warehouse dead zones. As an official Ekahau Partner,
              HTech Supports delivers ECSE-certified wireless site surveys, predictive 3D modeling, and Sidekick 2
              diagnostics across 50+ countries.
            </p>

            <div className="ek-actions">
              <Link to="/contact" className="ek-btn ek-btn-primary">
                Book an Ekahau Survey <ArrowRight className="ek-btn-icon" />
              </Link>
              <button onClick={openPartner} className="ek-btn ek-btn-outline">
                Become a Partner
              </button>
            </div>

            <div className="ek-stats-row">
              <div className="ek-stat-item">
                <span className="ek-stat-val">50+</span>
                <span className="ek-stat-lbl">Countries Covered</span>
              </div>
              <div className="ek-stat-sep" />
              <div className="ek-stat-item">
                <span className="ek-stat-val">100%</span>
                <span className="ek-stat-lbl">ECSE Certified Engineers</span>
              </div>
              <div className="ek-stat-sep" />
              <div className="ek-stat-item">
                <span className="ek-stat-val">2.4 / 5 / 6 GHz</span>
                <span className="ek-stat-lbl">Full Spectrum Diagnostics</span>
              </div>
            </div>
          </div>

          <div className="ek-hero-visual">
            <div className="ek-visual-card ek-brand-card">
              <div className="ek-brand-bg-pattern" aria-hidden="true" />
              <div className="ek-brand-logo-wrapper">
                <img
                  src="/assets/partners/2017_Ekahau_logo_black-640x360-1-300x169.png"
                  alt="Ekahau Official Certified Partner"
                  className="ek-visual-brand-logo"
                />
                <span className="ek-brand-cert-tag">Certified Wireless Design Partner</span>
              </div>
              <div className="ek-float-badge">
                <ShieldCheck className="ek-float-icon" />
                <div>
                  <p className="ek-float-title">SLA-Backed Wi-Fi Assurance</p>
                  <p className="ek-float-sub">ECSE Certified • Zero-Deadzone Guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY / SURVEY TYPES ── */}
      <section className="ek-methodology">
        <div className="container">
          <div className="ek-section-head">
            <span className="ek-pill">Our Methodology</span>
            <h2>Comprehensive Wireless Survey Modes</h2>
            <p>From architectural blueprints to post-handover validation, we cover the full Wi-Fi lifecycle.</p>
          </div>

          <div className="ek-tabs">
            {SURVEY_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={`ek-tab ${activeTab === type.id ? 'active' : ''}`}
              >
                <Radio className="ek-tab-icon" />
                <div className="ek-tab-text">
                  <span className="ek-tab-title">{type.title}</span>
                  <span className="ek-tab-sub">{type.badge}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="ek-tab-content">
            <div className="ek-tab-left">
              <span className="ek-tab-tag">{currentSurvey.badge}</span>
              <h3>{currentSurvey.title}</h3>
              <p className="ek-tab-subtitle">{currentSurvey.subtitle}</p>
              <p className="ek-tab-desc">{currentSurvey.desc}</p>
              <ul className="ek-points-list">
                {currentSurvey.points.map((pt, i) => (
                  <li key={i}>
                    <CheckCircle2 className="ek-pt-icon" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="ek-tab-cta">
                <Link to="/contact" className="ek-btn ek-btn-primary">
                  Request {currentSurvey.title}
                </Link>
              </div>
            </div>

            <div className="ek-tab-right">
              <div className="ek-spec-card">
                <h4>Why Choose Certified Ekahau Delivery?</h4>
                <div className="ek-spec-list">
                  <div className="ek-spec-item">
                    <Sliders className="ek-spec-icon" />
                    <div>
                      <strong>Channel Optimization</strong>
                      <p>Prevents destructive co-channel interference and maximizes throughput.</p>
                    </div>
                  </div>
                  <div className="ek-spec-item">
                    <Maximize2 className="ek-spec-icon" />
                    <div>
                      <strong>Multi-Floor 3D Attenuation</strong>
                      <p>Accounts for floor-to-floor bleed and elevation shifts across modern buildings.</p>
                    </div>
                  </div>
                  <div className="ek-spec-item">
                    <Cpu className="ek-spec-icon" />
                    <div>
                      <strong>Hardware Neutral</strong>
                      <p>Fully certified across Cisco Catalyst/Meraki, Aruba CX, Mist AI, Fortinet &amp; Ruckus.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOOLING & HARDWARE ── */}
      <section className="ek-tooling">
        <div className="container">
          <div className="ek-section-head light">
            <span className="ek-pill">Enterprise Instrumentation</span>
            <h2>Industry-Leading Ekahau Ecosystem</h2>
            <p>We invest in top-tier diagnostic hardware and software to ensure actionable accuracy.</p>
          </div>

          <div className="ek-tooling-grid">
            {TOOLING.map((tool, i) => (
              <div key={i} className="ek-tool-card">
                <div className="ek-tool-num">0{i + 1}</div>
                <h3>{tool.name}</h3>
                <p className="ek-tool-role">{tool.role}</p>
                <p className="ek-tool-desc">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES ── */}
      <section className="ek-deliverables">
        <div className="container">
          <div className="ek-section-head">
            <span className="ek-pill">Output &amp; Deliverables</span>
            <h2>What You Receive After an Ekahau Survey</h2>
            <p>Actionable intelligence, raw data files, and executive presentations.</p>
          </div>

          <div className="ek-deliverables-grid">
            {DELIVERABLES.map((del, i) => {
              const Icon = del.icon;
              return (
                <div key={i} className="ek-del-card">
                  <div className="ek-del-icon">
                    <Icon />
                  </div>
                  <h3>{del.title}</h3>
                  <p>{del.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="ek-cta">
        <div className="container ek-cta-inner">
          <h2>Ready to Optimize Your Wireless Infrastructure?</h2>
          <p>
            Contact our engineering desk today to schedule an on-site Ekahau survey or predictive design audit.
          </p>
          <div className="ek-cta-actions">
            <Link to="/contact" className="ek-btn ek-btn-primary ek-btn-lg">
              Contact Wireless Team <ArrowRight className="ek-btn-icon" />
            </Link>
            <Link to="/services" className="ek-btn ek-btn-ghost ek-btn-lg">
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
