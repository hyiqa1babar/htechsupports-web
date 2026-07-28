/* src/components/LogoCarousel.jsx */
import React from 'react';
import './LogoCarousel.css';

const LOGOS = [
  '01.png','02.png','03.png','005.jpg','06.jpg','07.jpg','008.jpg',
  '21.png','22.png','23.jpg','24.png','25.png','26.png','27.png',
  '28.jpg','29.png','30.jpg','31.png','32.jpg','33.png','34.png',
  '351.png','36.png',
];

// Duplicate for seamless loop
const TRACK = [...LOGOS, ...LOGOS];

export default function LogoCarousel() {
  return (
    <section className="carousel-section" aria-label="Global Roll Out – client logos">
      {/* Section header */}
      <div className="container carousel-header">
        <h2 className="section-title">Global Roll Out</h2>
        <p className="section-sub">
          HTS has a strong global presence, delivering solutions across more than 50 countries.
        </p>
        <p className="carousel-intro">
          Some of our awesome clients we've had great pleasure working with!
        </p>
      </div>

      {/* Scrolling track */}
      <div className="carousel-mask" aria-hidden="true">
        <div className="carousel-track">
          {TRACK.map((file, i) => (
            <div key={i} className="carousel-card">
              <img
                src={`/assets/clients/${file}`}
                alt={`Client logo ${file.replace(/\.\w+$/, '')}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
