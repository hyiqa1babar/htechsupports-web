/* src/components/CompanySection.jsx */
import React, { useEffect, useRef } from 'react';
import siteData from '../data/siteData.json';
import './CompanySection.css';

/* ── Canvas particle animation (anti-gravity float) ────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Resize to fill parent
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Gradient colours for particles
    const COLOURS = [
      '#1e266d','#06b6d4','#7c3aed',
      '#3b82f6','#0ea5e9','#a855f7',
    ];

    // Particle factory
    const makeParticle = () => ({
      x:     Math.random() * canvas.width,
      y:     canvas.height + Math.random() * 60,
      r:     Math.random() * 5 + 2,
      speed: Math.random() * 0.6 + 0.2,
      drift: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2,
      colour: COLOURS[Math.floor(Math.random() * COLOURS.length)],
    });

    const particles = Array.from({ length: 60 }, makeParticle);

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle   = p.colour;
        ctx.fill();

        // Float upward
        p.y    -= p.speed;
        p.x    += p.drift;
        p.alpha = Math.max(0, p.alpha - 0.0008);

        // Reset when off-screen or invisible
        if (p.y < -20 || p.alpha <= 0) {
          Object.assign(p, makeParticle());
        }
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
}

/* ── Main component ─────────────────────────────────────── */
export default function CompanySection() {
  const { company } = siteData;

  return (
    <section className="company-section" aria-labelledby="company-title">
      {/* Particle background */}
      <ParticleCanvas />

      <div className="container company-inner">
        {/* Left: image placeholder with particle overlay hint */}
        <div className="company-images" aria-hidden="true">
          <div className="company-img-frame company-img-frame--large">
            <img src="/assets/images/hero-startup-1.png" alt="HTS team at work" loading="lazy" />
          </div>
          <div className="company-img-frame company-img-frame--small">
            <img src="/assets/images/hero-startup-2.png" alt="HTS engineer in data centre" loading="lazy" />
          </div>
        </div>

        {/* Right: text content */}
        <div className="company-content">
          <p className="company-eyebrow">WHO WE ARE</p>
          <h2 id="company-title" className="section-title company-title">THE COMPANY</h2>
          <p className="company-body">
            {company.description}
          </p>
          <p className="company-body">
            {company.details}
          </p>

          {/* Coverage stats */}
          <div className="company-stats">
            {company.coverageStats.map((stat) => (
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
