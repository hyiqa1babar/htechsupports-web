/* src/components/Footer.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const PARTNERS = [
  { name: 'Service Industry Association', logo: '/assets/partners/service_industry_association_logo-150x150.jpeg' },
  { name: 'ASCDI',                        logo: '/assets/partners/ascdi_logo-150x150.jpeg' },
  { name: 'Partner',                      logo: '/assets/partners/file-300x200.jpg' },
  { name: 'Ekahau',                       logo: '/assets/partners/2017_Ekahau_logo_black-640x360-1-300x169.png' },
];

const SOCIAL = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/htech-supports',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5C.02 2.12 1.13 1 2.5 1S4.98 2.12 4.98 3.5zM5 8H0v16h5V8zm7.982 0H8.014v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0V24H24V13.869c0-7.88-8.922-7.593-11.018-3.714V8z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/htechsupports',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M24 12.073C24 5.406 18.627 0 12 0S0 5.406 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/htechsupports',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="hts-footer" role="contentinfo">
      {/* ── Partners strip ─────────────────────────────── */}
      <div className="footer-partners">
        <div className="container partners-inner">
          <span className="partners-label">OUR PARTNERS</span>
          <div className="partners-logos">
            {PARTNERS.map((p) => (
              <div key={p.name} className="partner-badge" title={p.name}>
                <img src={p.logo} alt={p.name} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Contact strip ──────────────────────────────── */}
      <div className="footer-contact-strip">
        <div className="container contact-strip-inner">
          <div className="contact-item">
            <span className="contact-icon">✉️</span>
            <div>
              <p className="contact-label">Sales / Inquiries</p>
              <a href="mailto:sales@htechsupports.com">sales@htechsupports.com</a>
            </div>
          </div>
          <div className="contact-divider" />
          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <div>
              <p className="contact-label">France Office</p>
              <a href="tel:+33650306719">+33 650 30 6719</a>
            </div>
          </div>
          <div className="contact-divider" />
          <div className="contact-item">
            <span className="contact-icon">🌐</span>
            <div>
              <p className="contact-label">Global Reach</p>
              <p>Delivering with scale and agility across 50+ countries</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main columns ───────────────────────────────── */}
      <div className="footer-main">
        <div className="container footer-grid">
          {/* Col 1 */}
          <div className="footer-col">
            <h3 className="footer-col-title">Solutions & Sectors</h3>
            <ul>
              <li><Link to="/pages/services/">Services</Link></li>
              <li><Link to="/pages/sectors/">Sectors</Link></li>
              <li><Link to="/pages/professional-service/">Professional Service</Link></li>
              <li><Link to="/pages/wireless-survey/">Wireless Survey</Link></li>
              <li><Link to="/pages/network-support/">Network Support</Link></li>
              <li><Link to="/pages/structured-cabling/">Structured Cabling</Link></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="footer-col">
            <h3 className="footer-col-title">Company & Talent</h3>
            <ul>
              <li><Link to="/pages/company/">Company</Link></li>
              <li><Link to="/pages/careers/">Careers</Link></li>
              <li><Link to="/resources/">Resources</Link></li>
              <li><Link to="/blog-2/">Blog</Link></li>
              <li><Link to="/pages/engineer/">Enter the Hub</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="footer-col">
            <h3 className="footer-col-title">Legal & Compliance</h3>
            <ul>
              <li><a href="/terms-and-conditions/">Terms and Conditions</a></li>
              <li><a href="/privacy-policy/">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="footer-col footer-col--offices">
            <h3 className="footer-col-title">Global Footprint</h3>

            <div className="office-block">
              <p className="office-name">🇬🇧 UK Office</p>
              <p className="office-address">450 Bath Road, Longford, Heathrow London, UB7 0EB, UK</p>
              <a href="mailto:sales@htechsupports.com" className="office-line">sales@htechsupports.com</a>
            </div>

            <div className="office-block">
              <p className="office-name">🇫🇷 France Office</p>
              <p className="office-address">Unit 8 – 189 Boulevard André Brémont, 95320 Saint-Leu-la-Forêt, France</p>
              <a href="tel:+33650306719" className="office-line">+33 650 30 6719</a>
            </div>

            <div className="office-block">
              <p className="office-name">🇺🇸 USA Office</p>
              <a href="mailto:sales@htechsupports.com" className="office-line">sales@htechsupports.com</a>
            </div>

            <div className="app-badges">
              <a href="https://play.google.com/store/apps/details?id=com.h_tech_support.live" className="app-badge" target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" />
              </a>
              <a href="https://apps.apple.com/us/app/h-tech-supports/id6612006961" className="app-badge" target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store">
                <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Copyright bar ──────────────────────────────── */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© 2026 H-Tech Supports | Delivering with scale and agility. All Rights Reserved.</p>
          <div className="footer-socials">
            {SOCIAL.map((s) => (
              <a key={s.name} href={s.href} aria-label={s.name} target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
