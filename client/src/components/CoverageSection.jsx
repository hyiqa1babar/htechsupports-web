/* src/components/CoverageSection.jsx – WPBakery style 1:1 matching htechsupports.com */
import React from 'react';
import siteData from '../data/siteData.json';
import './CoverageSection.css';

export default function CoverageSection() {
  const { coverageStats } = siteData.company;

  return (
    <section className="coverage-section" aria-labelledby="coverage-title">
      <div className="container">
        {/* Header centered */}
        <div className="coverage-header text-center">
          <h2 id="coverage-title" className="section-title coverage-title">
            OUR COVERAGE
          </h2>
          <div className="coverage-separator" />
          <p className="section-sub coverage-sub">
            We offer our services at a global level, and we have ability to cover almost all locations.
          </p>
        </div>

        {/* 2-column layout: Map image (left) + WPBakery Progress Bars (right) */}
        <div className="coverage-grid">
          {/* Left: Map Image */}
          <div className="coverage-map-col">
            <div className="coverage-map-wrapper">
              <img
                src="/assets/images/coverage-map.jpg"
                alt="HTech Supports Global Service Coverage Map"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: WPBakery Progress Bars */}
          <div className="coverage-bars-col">
            <div className="vc_progress_bar vc_progress-bar-color-bar_blue">
              {coverageStats.map((stat) => (
                <div key={stat.region} className="vc_general vc_single_bar">
                  <span
                    className="vc_bar animated striped"
                    style={{ width: `${stat.percentage}%` }}
                    role="progressbar"
                    aria-valuenow={stat.percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                  <small className="vc_label">
                    <span>{stat.region}</span>
                    <span className="vc_label_val">{stat.percentage}%</span>
                  </small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
