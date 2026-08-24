/* src/components/CoverageSection.jsx */
import React, { useState } from 'react';
import siteData from '../data/siteData.json';
import InteractiveCoverageMap, { REGIONS_DATA } from './InteractiveCoverageMap.jsx';
import './CoverageSection.css';

const REGION_MAP_KEY = {
  'NORTH AMERICA': 'north_america',
  'SOUTH AMERICA': 'south_america',
  'EMEA': 'emea',
  'APAC': 'apac',
  'AUSTRALIA': 'australia'
};

export default function CoverageSection() {
  const { coverageStats } = siteData.company;
  const [selectedRegionKey, setSelectedRegionKey] = useState(null);

  const selectedRegionData = selectedRegionKey ? REGIONS_DATA[selectedRegionKey] : null;

  return (
    <section className="coverage-section" aria-labelledby="coverage-title">
      <div className="container coverage-inner">
        {/* Left: Interactive Vector Map with Region Hover/Click + FSL Pins */}
        <div className="coverage-map-frame">
          <InteractiveCoverageMap
            selectedRegion={selectedRegionKey}
            onSelectRegion={(reg) => setSelectedRegionKey(reg)}
          />
        </div>

        {/* Right: heading + dynamic bars */}
        <div className="coverage-content">
          <p className="coverage-eyebrow">GLOBAL REACH &amp; FSL HUBS</p>
          <h2 id="coverage-title" className="section-title coverage-title">OUR COVERAGE</h2>
          <p className="section-sub coverage-sub">
            We deliver global IT infrastructure and forward stocking locations (FSL) across 50+ countries with 2h–4h emergency SLA dispatch.
          </p>

          <div className="coverage-stats">
            {coverageStats.map((stat) => {
              const regKey = REGION_MAP_KEY[stat.region] || stat.region.toLowerCase();
              const isSelected = selectedRegionKey === regKey;

              return (
                <div
                  key={stat.region}
                  className={`stat-item ${isSelected ? 'stat-item--active' : ''}`}
                  onClick={() => setSelectedRegionKey(isSelected ? null : regKey)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="stat-label">
                    <span className="stat-region-name">
                      {stat.region} {isSelected ? '★' : ''}
                    </span>
                    <span className="stat-pct-val">{stat.percentage}%</span>
                  </div>
                  <div className="stat-bar-bg">
                    <div
                      className={`stat-bar-fill ${isSelected ? 'stat-bar-fill--active' : ''}`}
                      style={{ width: `${stat.percentage}%` }}
                      role="progressbar"
                      aria-valuenow={stat.percentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${stat.region}: ${stat.percentage}%`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {selectedRegionData && (
            <div className="coverage-active-badge">
              <div className="cab-header">
                <strong>{selectedRegionData.name} Overview:</strong>
                <span>{selectedRegionData.sla}</span>
              </div>
              <p>{selectedRegionData.description}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
