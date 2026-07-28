/* src/components/SectorsSection.jsx
   Original section – kept as-is visually, rebuilt in React */
import React from 'react';
import siteData from '../data/siteData.json';
import './SectorsSection.css';

/* Inline SVG icons matching the original vertical card style */
const ICONS = {
  Shop: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2h36l4 12H2L6 2z"/>
      <path d="M2 14v30a2 2 0 0 0 2 2h40a2 2 0 0 0 2-2V14"/>
      <line x1="24" y1="14" x2="24" y2="46"/>
      <line x1="2"  y1="28" x2="46" y2="28"/>
    </svg>
  ),
  Building: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="24" height="40" rx="2"/>
      <rect x="28" y="16" width="16" height="28" rx="2"/>
      <line x1="10" y1="10" x2="10" y2="10" strokeWidth="3"/>
      <line x1="18" y1="10" x2="18" y2="10" strokeWidth="3"/>
      <line x1="10" y1="20" x2="10" y2="20" strokeWidth="3"/>
      <line x1="18" y1="20" x2="18" y2="20" strokeWidth="3"/>
      <line x1="10" y1="30" x2="10" y2="30" strokeWidth="3"/>
      <line x1="18" y1="30" x2="18" y2="30" strokeWidth="3"/>
      <line x1="34" y1="24" x2="34" y2="24" strokeWidth="3"/>
      <line x1="34" y1="34" x2="34" y2="34" strokeWidth="3"/>
    </svg>
  ),
  Database: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="24" cy="10" rx="18" ry="6"/>
      <path d="M6 10v10c0 3.314 8.059 6 18 6s18-2.686 18-6V10"/>
      <path d="M6 20v10c0 3.314 8.059 6 18 6s18-2.686 18-6V20"/>
      <path d="M6 30v8c0 3.314 8.059 6 18 6s18-2.686 18-6v-8"/>
    </svg>
  ),
  Truck: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="10" width="30" height="24" rx="2"/>
      <path d="M31 18h8l6 8v8H31V18z"/>
      <circle cx="10" cy="38" r="4"/>
      <circle cx="38" cy="38" r="4"/>
    </svg>
  ),
  Factory: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 46V26l12-8v8l12-8v8l12-8v28H2z"/>
      <rect x="26" y="2" width="10" height="16" rx="1"/>
      <line x1="8"  y1="36" x2="8"  y2="46"/>
      <line x1="16" y1="36" x2="16" y2="46"/>
      <line x1="24" y1="36" x2="24" y2="46"/>
    </svg>
  ),
  Flag: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="4" x2="6" y2="46"/>
      <path d="M6 4l32 10-32 10"/>
    </svg>
  ),
};

const EXTRA_SECTORS = [
  { id: 'carrier', title: 'Carrier Network', icon: 'Truck', description: 'Carrier-grade network rollouts and maintenance across EMEA and APAC regions.', link: '/pages/carrier-network/' },
  { id: 'manufacturing', title: 'Manufacturing', icon: 'Factory', description: 'IT infrastructure and tech support for manufacturing sites, from floor to HQ.', link: '/pages/manufacturing/' },
  { id: 'government', title: 'Government', icon: 'Flag', description: 'Secure, compliant IT solutions for government agencies and public sector organisations.', link: '/pages/government/' },
];

export default function SectorsSection() {
  const sectors = [...siteData.sectors, ...EXTRA_SECTORS];

  return (
    <section className="sectors-section" aria-labelledby="sectors-title">
      <div className="container">
        <div className="sectors-header">
          <p className="sectors-eyebrow">WHAT WE COVER</p>
          <h2 id="sectors-title" className="section-title">OUR SECTORS</h2>
          <p className="section-sub">
            HTS delivers tailored IT solutions across a wide range of industries and sectors globally.
          </p>
        </div>

        <div className="sectors-grid" role="list">
          {sectors.map((sec) => (
            <a key={sec.id} href={sec.link} className="sector-card" role="listitem" aria-label={sec.title}>
              <div className="sector-icon" aria-hidden="true">
                {ICONS[sec.icon] || ICONS.Building}
              </div>
              <h3 className="sector-title">{sec.title}</h3>
              <p className="sector-desc">{sec.description}</p>
              <span className="sector-link-arrow">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
