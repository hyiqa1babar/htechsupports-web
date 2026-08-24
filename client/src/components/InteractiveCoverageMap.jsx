// src/components/InteractiveCoverageMap.jsx
import React, { useState, useMemo } from 'react';
import {
  Globe2,
  MapPin,
  Shield,
  Clock,
  Layers,
  ChevronRight,
  Sparkles,
  Info,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import './InteractiveCoverageMap.css';

// 5 Core Regions data synced with HTech Supports coverage stats
export const REGIONS_DATA = {
  emea: {
    id: 'emea',
    name: 'EMEA',
    fullName: 'Europe, Middle East & Africa',
    percentage: 100,
    sla: '2-4 hr SLA',
    engineers: '250+ Engineers',
    countries: '35+ Countries',
    fslCount: 4,
    description: '100% full territorial coverage across UK, EU, Nordics, Middle East and Africa with dedicated central logistics in London, Paris and Frankfurt.'
  },
  north_america: {
    id: 'north_america',
    name: 'NORTH AMERICA',
    fullName: 'USA & Canada',
    percentage: 70,
    sla: '4 hr SLA',
    engineers: '180+ Engineers',
    countries: '2 Countries (50 States)',
    fslCount: 3,
    description: 'Extensive multi-state coverage with dedicated forward stocking locations in New York, Chicago, and Los Angeles.'
  },
  south_america: {
    id: 'south_america',
    name: 'SOUTH AMERICA',
    fullName: 'Latin America (LATAM)',
    percentage: 80,
    sla: '4-8 hr SLA',
    engineers: '90+ Engineers',
    countries: '8+ Countries',
    fslCount: 1,
    description: 'Specialized support across major commercial hubs in Brazil, Argentina, Colombia and Chile with São Paulo staging facility.'
  },
  apac: {
    id: 'apac',
    name: 'APAC',
    fullName: 'Asia Pacific',
    percentage: 70,
    sla: '4 hr SLA',
    engineers: '140+ Engineers',
    countries: '14+ Countries',
    fslCount: 2,
    description: 'Rapid dispatch and hardware buffering across Singapore, Tokyo, Hong Kong, India, and Southeast Asia enterprise hubs.'
  },
  australia: {
    id: 'australia',
    name: 'AUSTRALIA',
    fullName: 'Australia & New Zealand',
    percentage: 80,
    sla: '4 hr SLA',
    engineers: '60+ Engineers',
    countries: '2 Countries',
    fslCount: 1,
    description: 'Complete metropolitan coverage across Sydney, Melbourne, Brisbane, Perth and Auckland with local buffer stocks.'
  }
};

// Strategic Forward Stocking Locations (FSL)
export const FSL_PINS = [
  {
    id: 'fsl-london',
    name: 'London Heathrow (HQ Hub)',
    city: 'London',
    country: 'United Kingdom',
    flag: '🇬🇧',
    region: 'emea',
    x: 485,
    y: 165,
    sla: '2-Hour Emergency Dispatch',
    capabilities: ['Spares Buffering', 'Staging & Pre-Config', 'Airfreight Clearance'],
    address: '450 Bath Road, Longford, Heathrow UB7 0EB'
  },
  {
    id: 'fsl-paris',
    name: 'Paris Saint-Leu (EU Core)',
    city: 'Paris',
    country: 'France',
    flag: '🇫🇷',
    region: 'emea',
    x: 495,
    y: 190,
    sla: '2-Hour Emergency Dispatch',
    capabilities: ['EU Mainland Logistics', 'Smart Hands Engineering', 'Hardware Escrow'],
    address: '189 Boulevard André Brémont, 95320 Saint-Leu-la-Forêt'
  },
  {
    id: 'fsl-frankfurt',
    name: 'Frankfurt Central Hub',
    city: 'Frankfurt',
    country: 'Germany',
    flag: '🇩🇪',
    region: 'emea',
    x: 520,
    y: 178,
    sla: '2-Hour Dispatch',
    capabilities: ['Datacenter Buffer', 'High-Speed Fiber Spares', 'Cross-Border Logistics'],
    address: 'Gateway Gardens, 60549 Frankfurt am Main'
  },
  {
    id: 'fsl-dubai',
    name: 'Dubai Regional Gateway',
    city: 'Dubai',
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    region: 'emea',
    x: 620,
    y: 250,
    sla: '4-Hour Dispatch',
    capabilities: ['GCC Customs Escrow', 'Carrier Network Buffer', 'Multi-Language Smart Hands'],
    address: 'Dubai South Logistics District'
  },
  {
    id: 'fsl-johannesburg',
    name: 'Johannesburg Sub-Saharan Hub',
    city: 'Johannesburg',
    country: 'South Africa',
    flag: '🇿🇦',
    region: 'emea',
    x: 535,
    y: 420,
    sla: '4-Hour Dispatch',
    capabilities: ['Regional Parts Staging', 'Break/Fix Replacements', 'On-Site Deployment'],
    address: 'OR Tambo Logistics Park, Gauteng'
  },
  {
    id: 'fsl-nyc',
    name: 'New York / New Jersey Hub',
    city: 'New York',
    country: 'United States',
    flag: '🇺🇸',
    region: 'north_america',
    x: 275,
    y: 195,
    sla: '2-Hour Tri-State Dispatch',
    capabilities: ['Enterprise ITAD Staging', 'Server/Switch Hot Spares', '24/7 Field Techs'],
    address: 'JFK Cargo Logistics Center, NY'
  },
  {
    id: 'fsl-chicago',
    name: 'Chicago Midwest Depot',
    city: 'Chicago',
    country: 'United States',
    flag: '🇺🇸',
    region: 'north_america',
    x: 228,
    y: 185,
    sla: '4-Hour Dispatch',
    capabilities: ['Central US Distribution', 'Hardware Burn-in Testing', 'Deskside Kits'],
    address: 'O\'Hare Logistics Park, Chicago, IL'
  },
  {
    id: 'fsl-la',
    name: 'Los Angeles West Coast Hub',
    city: 'Los Angeles',
    country: 'United States',
    flag: '🇺🇸',
    region: 'north_america',
    x: 165,
    y: 215,
    sla: '2-Hour Metro Dispatch',
    capabilities: ['West Coast & Pacific Staging', 'Wireless Survey Gear', 'Rapid Courier'],
    address: 'LAX Air Cargo Plaza, Los Angeles, CA'
  },
  {
    id: 'fsl-saopaulo',
    name: 'São Paulo LATAM Core',
    city: 'São Paulo',
    country: 'Brazil',
    flag: '🇧🇷',
    region: 'south_america',
    x: 345,
    y: 395,
    sla: '4-Hour Metro Dispatch',
    capabilities: ['Mercosur Customs Handling', 'Buffer Stocking', 'Certified Engineers'],
    address: 'Guarulhos Logistics Center, São Paulo'
  },
  {
    id: 'fsl-singapore',
    name: 'Singapore APAC HQ Depot',
    city: 'Singapore',
    country: 'Singapore',
    flag: '🇸🇬',
    region: 'apac',
    x: 745,
    y: 310,
    sla: '2-Hour Dispatch',
    capabilities: ['Southeast Asia Buffer', 'Subsea Cable Spares', 'Ekahau Certified Tools'],
    address: 'Changi South Logistics Avenue'
  },
  {
    id: 'fsl-tokyo',
    name: 'Tokyo East Asia Depot',
    city: 'Tokyo',
    country: 'Japan',
    flag: '🇯🇵',
    region: 'apac',
    x: 840,
    y: 210,
    sla: '2-Hour Tokyo SLA',
    capabilities: ['Precision Hardware Buffer', 'High-Density Datacenter Spares', 'Bilingual Support'],
    address: 'Haneda Logistics Park, Ota City'
  },
  {
    id: 'fsl-sydney',
    name: 'Sydney Oceania Depot',
    city: 'Sydney',
    country: 'Australia',
    flag: '🇦🇺',
    region: 'australia',
    x: 855,
    y: 435,
    sla: '4-Hour Metro Dispatch',
    capabilities: ['ANZ Parts Buffer', 'Mining & Remote Site Kits', '24/7 Smart Hands'],
    address: 'Botany Logistics Estate, Sydney NSW'
  }
];

export default function InteractiveCoverageMap({
  selectedRegion = null,
  onSelectRegion = null,
  showTitle = true,
  className = ''
}) {
  const [activeRegion, setActiveRegion] = useState(selectedRegion || null);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [activePin, setActivePin] = useState(null);
  const [showFslPins, setShowFslPins] = useState(true);

  const currentRegionKey = hoveredRegion || activeRegion;
  const currentRegion = currentRegionKey ? REGIONS_DATA[currentRegionKey] : null;

  const handleRegionClick = (regionKey) => {
    const next = activeRegion === regionKey ? null : regionKey;
    setActiveRegion(next);
    if (onSelectRegion) onSelectRegion(next);
  };

  const handleReset = () => {
    setActiveRegion(null);
    setActivePin(null);
    if (onSelectRegion) onSelectRegion(null);
  };

  // Filtered FSL Pins
  const visiblePins = useMemo(() => {
    if (!showFslPins) return [];
    if (!activeRegion) return FSL_PINS;
    return FSL_PINS.filter((pin) => pin.region === activeRegion);
  }, [showFslPins, activeRegion]);

  return (
    <div className={`icm-container ${className}`} role="region" aria-label="Interactive Global Coverage Map">
      {/* Top Filter Bar */}
      <div className="icm-toolbar">
        <div className="icm-pills-scroll">
          <button
            onClick={handleReset}
            className={`icm-pill-btn ${!activeRegion ? 'active' : ''}`}
            aria-pressed={!activeRegion}
          >
            <Globe2 className="icm-pill-icon" />
            <span>All Regions</span>
          </button>
          {Object.entries(REGIONS_DATA).map(([key, data]) => (
            <button
              key={key}
              onClick={() => handleRegionClick(key)}
              onMouseEnter={() => setHoveredRegion(key)}
              onMouseLeave={() => setHoveredRegion(null)}
              className={`icm-pill-btn ${activeRegion === key ? 'active' : ''}`}
              aria-pressed={activeRegion === key}
            >
              <span>{data.name}</span>
              <span className="icm-pill-badge">{data.percentage}%</span>
            </button>
          ))}
        </div>

        {/* Layer Toggles */}
        <div className="icm-toggles">
          <button
            onClick={() => setShowFslPins(!showFslPins)}
            className={`icm-toggle-btn ${showFslPins ? 'active' : ''}`}
            title="Toggle Forward Stocking Location (FSL) Pins"
            aria-pressed={showFslPins}
          >
            <MapPin className="icm-toggle-icon" />
            <span>FSL Depots ({FSL_PINS.length})</span>
          </button>
          {(activeRegion || activePin) && (
            <button onClick={handleReset} className="icm-reset-btn" title="Reset View">
              <RotateCcw className="icm-reset-icon" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* SVG Map Canvas */}
      <div className="icm-canvas-wrapper">
        <svg
          viewBox="0 0 980 540"
          className="icm-svg"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Background Grid Pattern */}
            <pattern id="icm-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.8" />
            </pattern>
            {/* Glow Filters */}
            <filter id="icm-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="pin-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            {/* Region Gradients */}
            <linearGradient id="grad-active" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#09aaaa" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="grad-emea" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.55" />
            </linearGradient>
          </defs>

          {/* Canvas Background */}
          <rect width="980" height="540" fill="#070e18" rx="16" />
          <rect width="980" height="540" fill="url(#icm-grid)" rx="16" />

          {/* Latitude / Equator / Longitude guide lines */}
          <g className="icm-guide-lines" stroke="rgba(9, 170, 170, 0.12)" strokeDasharray="3 4">
            <line x1="40" y1="270" x2="940" y2="270" strokeWidth="1" />
            <line x1="40" y1="160" x2="940" y2="160" strokeWidth="0.6" />
            <line x1="40" y1="380" x2="940" y2="380" strokeWidth="0.6" />
            <line x1="490" y1="40" x2="490" y2="500" strokeWidth="1" />
          </g>

          {/* ════ REGIONS VECTOR PATHS ════ */}

          {/* 1. NORTH AMERICA */}
          <g
            id="region-north_america"
            className={`icm-region-group ${currentRegionKey === 'north_america' ? 'active' : ''} ${activeRegion && activeRegion !== 'north_america' ? 'dimmed' : ''}`}
            onClick={() => handleRegionClick('north_america')}
            onMouseEnter={() => setHoveredRegion('north_america')}
            onMouseLeave={() => setHoveredRegion(null)}
            tabIndex="0"
            role="button"
            aria-label="North America Region (70% Coverage)"
          >
            {/* Alaska */}
            <path
              className="icm-landmass"
              d="M100 80 Q130 70 150 90 T140 130 T100 130 Z"
            />
            {/* Canada & USA Mainland */}
            <path
              className="icm-landmass"
              d="M140 100 Q200 80 270 95 Q330 110 320 160 Q300 200 280 240 Q250 250 220 230 Q180 235 150 210 Q130 160 140 100 Z"
            />
            {/* Mexico & Central America */}
            <path
              className="icm-landmass"
              d="M180 230 Q220 240 240 260 Q260 290 280 300 Q270 310 250 300 Q210 260 180 230 Z"
            />
            {/* Region Label */}
            <text x="210" y="160" className="icm-region-label">NORTH AMERICA</text>
            <text x="210" y="176" className="icm-region-pct">70% COVERAGE</text>
          </g>

          {/* 2. SOUTH AMERICA */}
          <g
            id="region-south_america"
            className={`icm-region-group ${currentRegionKey === 'south_america' ? 'active' : ''} ${activeRegion && activeRegion !== 'south_america' ? 'dimmed' : ''}`}
            onClick={() => handleRegionClick('south_america')}
            onMouseEnter={() => setHoveredRegion('south_america')}
            onMouseLeave={() => setHoveredRegion(null)}
            tabIndex="0"
            role="button"
            aria-label="South America Region (80% Coverage)"
          >
            <path
              className="icm-landmass"
              d="M280 300 Q330 310 370 340 Q390 390 360 440 Q330 490 300 510 Q280 470 290 400 Q270 340 280 300 Z"
            />
            <text x="330" y="390" className="icm-region-label">SOUTH AMERICA</text>
            <text x="330" y="406" className="icm-region-pct">80% COVERAGE</text>
          </g>

          {/* 3. EMEA (Europe, Middle East, Africa) */}
          <g
            id="region-emea"
            className={`icm-region-group ${currentRegionKey === 'emea' ? 'active' : ''} ${activeRegion && activeRegion !== 'emea' ? 'dimmed' : ''}`}
            onClick={() => handleRegionClick('emea')}
            onMouseEnter={() => setHoveredRegion('emea')}
            onMouseLeave={() => setHoveredRegion(null)}
            tabIndex="0"
            role="button"
            aria-label="EMEA Region (100% Coverage)"
          >
            {/* UK & Ireland */}
            <path
              className="icm-landmass"
              d="M470 145 Q485 140 490 160 Q485 180 475 175 Q465 160 470 145 Z"
            />
            {/* Continental Europe */}
            <path
              className="icm-landmass"
              d="M485 155 Q550 140 590 165 Q600 200 550 215 Q510 225 485 200 Q480 170 485 155 Z"
            />
            {/* Scandinavia */}
            <path
              className="icm-landmass"
              d="M515 90 Q540 85 550 120 Q530 140 510 135 Z"
            />
            {/* Middle East */}
            <path
              className="icm-landmass"
              d="M580 210 Q640 210 650 260 Q620 280 580 250 Z"
            />
            {/* Africa */}
            <path
              className="icm-landmass"
              d="M460 230 Q540 220 580 270 Q590 350 560 420 Q530 460 500 440 Q460 380 445 300 Q440 250 460 230 Z"
            />
            {/* Madagascar */}
            <path
              className="icm-landmass"
              d="M600 390 Q610 395 605 430 Q595 425 600 390 Z"
            />
            <text x="520" y="290" className="icm-region-label">EMEA (100%)</text>
            <text x="520" y="306" className="icm-region-pct">FLAGSHIP REACH</text>
          </g>

          {/* 4. APAC (Asia-Pacific) */}
          <g
            id="region-apac"
            className={`icm-region-group ${currentRegionKey === 'apac' ? 'active' : ''} ${activeRegion && activeRegion !== 'apac' ? 'dimmed' : ''}`}
            onClick={() => handleRegionClick('apac')}
            onMouseEnter={() => setHoveredRegion('apac')}
            onMouseLeave={() => setHoveredRegion(null)}
            tabIndex="0"
            role="button"
            aria-label="APAC Region (70% Coverage)"
          >
            {/* Central & East Asia (China, India, etc.) */}
            <path
              className="icm-landmass"
              d="M600 140 Q750 120 830 150 Q850 220 780 270 Q710 290 660 260 Q630 200 600 140 Z"
            />
            {/* India subcontinent */}
            <path
              className="icm-landmass"
              d="M650 230 Q700 235 710 275 Q680 320 660 300 Q640 260 650 230 Z"
            />
            {/* Japan */}
            <path
              className="icm-landmass"
              d="M835 180 Q855 175 860 215 Q845 235 830 210 Z"
            />
            {/* Southeast Asia Islands */}
            <path
              className="icm-landmass"
              d="M720 300 Q780 305 790 345 Q750 360 720 330 Z"
            />
            <path
              className="icm-landmass"
              d="M770 320 Q810 330 805 365 Q775 360 770 320 Z"
            />
            <text x="730" y="200" className="icm-region-label">APAC</text>
            <text x="730" y="216" className="icm-region-pct">70% COVERAGE</text>
          </g>

          {/* 5. AUSTRALIA & OCEANIA */}
          <g
            id="region-australia"
            className={`icm-region-group ${currentRegionKey === 'australia' ? 'active' : ''} ${activeRegion && activeRegion !== 'australia' ? 'dimmed' : ''}`}
            onClick={() => handleRegionClick('australia')}
            onMouseEnter={() => setHoveredRegion('australia')}
            onMouseLeave={() => setHoveredRegion(null)}
            tabIndex="0"
            role="button"
            aria-label="Australia & Oceania Region (80% Coverage)"
          >
            {/* Australia Mainland */}
            <path
              className="icm-landmass"
              d="M790 380 Q860 370 895 405 Q890 460 840 470 Q790 460 780 420 Q775 390 790 380 Z"
            />
            {/* New Zealand */}
            <path
              className="icm-landmass"
              d="M915 450 Q930 455 925 485 Q910 475 915 450 Z"
            />
            <text x="835" y="420" className="icm-region-label">AUSTRALIA</text>
            <text x="835" y="436" className="icm-region-pct">80% COVERAGE</text>
          </g>

          {/* ════ FORWARD STOCKING LOCATIONS (FSL PINS) ════ */}
          {visiblePins.map((pin) => {
            const isSelected = activePin?.id === pin.id;
            return (
              <g
                key={pin.id}
                className={`icm-pin-group ${isSelected ? 'selected' : ''}`}
                transform={`translate(${pin.x}, ${pin.y})`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePin(isSelected ? null : pin);
                }}
                tabIndex="0"
                role="button"
                aria-label={`FSL Hub: ${pin.name}`}
              >
                {/* Radar pulse animation */}
                <circle cx="0" cy="0" r="14" className="icm-pin-radar" />
                <circle cx="0" cy="0" r="7" className="icm-pin-halo" />
                <circle cx="0" cy="0" r="4.5" className="icm-pin-dot" />
                {/* City Tag */}
                <g className="icm-pin-tag" transform="translate(8, -12)">
                  <rect rx="4" width={pin.city.length * 6.8 + 12} height="18" fill="rgba(7, 14, 24, 0.85)" stroke="rgba(9, 170, 170, 0.4)" strokeWidth="0.8" />
                  <text x="6" y="12" fill="#e2e8f0" fontSize="9" fontWeight="700">
                    {pin.city}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Overlay Card for Active FSL Pin or Active Region */}
        {activePin && (
          <div className="icm-pin-popover" role="dialog" aria-labelledby="fsl-title">
            <div className="icm-popover-header">
              <div className="icm-popover-title-wrap">
                <span className="icm-popover-flag">{activePin.flag}</span>
                <div>
                  <h4 id="fsl-title">{activePin.name}</h4>
                  <p className="icm-popover-sub">{activePin.address}</p>
                </div>
              </div>
              <button
                onClick={() => setActivePin(null)}
                className="icm-popover-close"
                aria-label="Close depot card"
              >
                ✕
              </button>
            </div>

            <div className="icm-popover-body">
              <div className="icm-popover-sla">
                <Clock className="icm-pop-icon" />
                <span>{activePin.sla}</span>
              </div>
              <div className="icm-popover-caps">
                <span className="icm-caps-label">Depot Capabilities:</span>
                <ul>
                  {activePin.capabilities.map((cap, i) => (
                    <li key={i}>
                      <CheckCircle2 className="icm-cap-check" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Region Quick Stat Card when a region is hovered/selected */}
        {currentRegion && !activePin && (
          <div className="icm-region-stat-card">
            <div className="icm-rsc-header">
              <span className="icm-rsc-pill">{currentRegion.name}</span>
              <span className="icm-rsc-pct">{currentRegion.percentage}%</span>
            </div>
            <p className="icm-rsc-name">{currentRegion.fullName}</p>
            <p className="icm-rsc-desc">{currentRegion.description}</p>
            <div className="icm-rsc-meta">
              <div className="icm-rsc-meta-item">
                <Shield className="icm-meta-icon" />
                <span>{currentRegion.sla}</span>
              </div>
              <div className="icm-rsc-meta-item">
                <MapPin className="icm-meta-icon" />
                <span>{currentRegion.fslCount} FSL Hubs</span>
              </div>
              <div className="icm-rsc-meta-item">
                <Sparkles className="icm-meta-icon" />
                <span>{currentRegion.engineers}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Legend */}
      <div className="icm-legend">
        <div className="icm-legend-item">
          <span className="icm-legend-dot region-high" />
          <span>Active Coverage Zone (70% – 100%)</span>
        </div>
        <div className="icm-legend-item">
          <span className="icm-legend-dot fsl-hub" />
          <span>Forward Stocking Location (FSL Spares Hub)</span>
        </div>
        <div className="icm-legend-hint">
          <Info className="icm-hint-icon" />
          <span>Click any region or FSL pin for detailed deployment SLAs</span>
        </div>
      </div>
    </div>
  );
}
