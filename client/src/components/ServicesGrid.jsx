/* src/components/ServicesGrid.jsx */
import React from 'react';
import siteData from '../data/siteData.json';
import './ServicesGrid.css';

/* ── SVG inline icons (white line-art) ─────────────────── */
const ICONS = {
  Support: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="18" />
      <circle cx="24" cy="24" r="8" />
      <line x1="6" y1="24" x2="16" y2="24" />
      <line x1="32" y1="24" x2="42" y2="24" />
      <line x1="24" y1="6"  x2="24" y2="16" />
      <line x1="24" y1="32" x2="24" y2="42" />
    </svg>
  ),
  Wifi: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 18c11-11 29-11 40 0"/>
      <path d="M10 26c8-8 20-8 28 0"/>
      <path d="M17 34c4-4 10-4 14 0"/>
      <circle cx="24" cy="40" r="2" fill="currentColor" stroke="none"/>
    </svg>
  ),
  Network: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="18" y="4"  width="12" height="8" rx="2"/>
      <rect x="4"  y="36" width="12" height="8" rx="2"/>
      <rect x="32" y="36" width="12" height="8" rx="2"/>
      <line x1="24" y1="12" x2="24" y2="24"/>
      <line x1="24" y1="24" x2="10"  y2="36"/>
      <line x1="24" y1="24" x2="38"  y2="36"/>
    </svg>
  ),
  Cabling: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 12h8a4 4 0 0 1 4 4v16a4 4 0 0 0 4 4h16"/>
      <circle cx="8"  cy="12" r="4"/>
      <circle cx="40" cy="36" r="4"/>
      <line x1="8"  y1="20" x2="8"  y2="28"/>
      <line x1="40" y1="20" x2="40" y2="28"/>
    </svg>
  ),
  Recycle: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h9l5 8"/>
      <path d="M40 24l3 8-8 3"/>
      <path d="M36 40h-9l-5-8"/>
      <path d="M8 24l-3-8 8-3"/>
      <path d="M12 8l-4 7"/>
      <path d="M36 40l4-7"/>
    </svg>
  ),
  Users: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="17" cy="16" r="7"/>
      <path d="M4 40c0-8 6-13 13-13s13 5 13 13"/>
      <circle cx="34" cy="18" r="5.5"/>
      <path d="M30 27c6 .5 10 5 10 13"/>
    </svg>
  ),
};

export default function ServicesGrid() {
  const { services } = siteData;

  return (
    <section className="services-section" aria-labelledby="services-title">
      <div className="container">
        {/* Header */}
        <div className="services-header">
          <h2 id="services-title" className="section-title">WHAT WE DO</h2>
          <p className="section-sub">
            HTS has a strong global presence, delivering solutions across more than 50 countries.
            Our engineers, many of whom are multilingual, range from level 1 through to level 3
            across a broad spectrum of vendor technologies.
          </p>
        </div>

        {/* 2-column grid of horizontal cards */}
        <div className="services-grid" role="list">
          {services.map((svc) => (
            <a
              key={svc.id}
              href={svc.link}
              className="svc-card"
              role="listitem"
              aria-label={svc.title}
            >
              {/* Icon */}
              <div className="svc-icon" aria-hidden="true">
                {ICONS[svc.icon] || ICONS.Support}
              </div>

              {/* Text */}
              <div className="svc-text">
                <h3 className="svc-title">{svc.title}</h3>
                <p className="svc-desc">{svc.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
