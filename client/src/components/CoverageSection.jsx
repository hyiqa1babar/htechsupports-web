/* src/components/CoverageSection.jsx */
import React from 'react';
import siteData from '../data/siteData.json';
import './CoverageSection.css';

export default function CoverageSection() {
  const { coverageStats } = siteData.company;

  return (
    <section className="coverage-section" aria-labelledby="coverage-title">
      <div className="container coverage-inner">
        {/* Left: map */}
        <div className="coverage-map-frame">
          <img
            src="/assets/images/coverage-map.jpg"
            alt="Map of HTS global service coverage"
            loading="lazy"
          />
        </div>

        {/* Right: heading + dynamic bars */}
        <div className="coverage-content">
          <p className="coverage-eyebrow">GLOBAL REACH</p>
          <h2 id="coverage-title" className="section-title coverage-title">OUR COVERAGE</h2>
          <p className="section-sub coverage-sub">
            We offer our services at a global level, and we have ability to cover almost all locations.
          </p>

          <div className="coverage-stats">
            {coverageStats.map((stat) => (
              <div key={stat.region} className="stat-item">
                <div className="stat-bar-bg">
                  <div
                    className="stat-bar-fill"
                    style={{ width: `${stat.percentage}%` }}
                    role="progressbar"
                    aria-valuenow={stat.percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${stat.region}: ${stat.percentage}%`}
                  />
                </div>
                <div className="stat-label">
                  <span>{stat.region}</span>
                  <span>{stat.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
