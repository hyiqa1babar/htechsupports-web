// src/components/StoreBadges.jsx
import React from 'react';
import './StoreBadges.css';

export function GooglePlayBadge({ className = '' }) {
  return (
    <a
      href="https://play.google.com/store/apps/details?id=com.h_tech_support.live"
      className={`hts-store-badge ${className}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get it on Google Play"
    >
      <svg className="hts-store-svg" viewBox="0 0 148 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="148" height="44" rx="8" fill="#000000" />
        {/* Google Play Triangle */}
        <g transform="translate(12, 10)">
          <path d="M1.2 1.4C0.9 1.7 0.7 2.2 0.7 2.8V21.2C0.7 21.8 0.9 22.3 1.2 22.6L1.3 22.7L12.5 12.1V11.9L1.3 1.3L1.2 1.4Z" fill="#2196F3"/>
          <path d="M16.2 15.6L12.5 12V11.9L16.2 8.3L16.3 8.4L20.7 10.9C22 11.6 22 12.3 20.7 13.1L16.3 15.5L16.2 15.6Z" fill="#FFC107"/>
          <path d="M16.3 15.5L12.5 12L1.2 22.7C1.6 23.1 2.3 23.2 3.1 22.7L16.3 15.5Z" fill="#F44336"/>
          <path d="M16.3 8.4L3.1 1.2C2.3 0.8 1.6 0.8 1.2 1.3L12.5 12L16.3 8.4Z" fill="#4CAF50"/>
        </g>
        {/* Text: GET IT ON / Google Play */}
        <text x="42" y="15" fill="#E2E8F0" fontSize="8.5" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.08em">GET IT ON</text>
        <text x="42" y="30" fill="#FFFFFF" fontSize="13.5" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.01em">Google Play</text>
      </svg>
    </a>
  );
}

export function AppStoreBadge({ className = '' }) {
  return (
    <a
      href="https://apps.apple.com/us/app/h-tech-supports/id6612006961"
      className={`hts-store-badge ${className}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download on the App Store"
    >
      <svg className="hts-store-svg" viewBox="0 0 148 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="148" height="44" rx="8" fill="#000000" />
        {/* Apple Icon */}
        <g transform="translate(14, 9)">
          <path d="M12.9 11.2C12.9 8.7 14.9 7.3 15 7.2C13.8 5.5 12 5.2 11.4 5.2C9.9 5 8.4 6.1 7.6 6.1C6.8 6.1 5.6 5.2 4.4 5.2C2.8 5.2 1.3 6.1 0.5 7.6C-1.2 10.6 0.1 15 1.7 17.4C2.5 18.5 3.4 19.8 4.7 19.7C5.9 19.6 6.4 18.9 7.8 18.9C9.2 18.9 9.6 19.7 10.9 19.7C12.2 19.7 13 18.5 13.8 17.4C14.7 16.1 15.1 14.8 15.1 14.7C15 14.6 12.9 13.8 12.9 11.2Z" fill="#FFFFFF"/>
          <path d="M10.3 3.4C10.9 2.7 11.3 1.7 11.2 0.7C10.3 0.7 9.2 1.3 8.6 2C8.1 2.6 7.6 3.6 7.8 4.6C8.8 4.7 9.8 4.1 10.3 3.4Z" fill="#FFFFFF"/>
        </g>
        {/* Text: Download on the / App Store */}
        <text x="39" y="15" fill="#E2E8F0" fontSize="8.5" fontWeight="500" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.02em">Download on the</text>
        <text x="39" y="30" fill="#FFFFFF" fontSize="13.5" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.01em">App Store</text>
      </svg>
    </a>
  );
}

export default function StoreBadges({ className = '' }) {
  return (
    <div className={`hts-store-badges-wrap ${className}`}>
      <GooglePlayBadge />
      <AppStoreBadge />
    </div>
  );
}
