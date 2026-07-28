/* src/components/Header.jsx */
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import siteData from '../data/siteData.json';
import './Header.css';

const NAV = siteData.navigation;

function DropdownMenu({ items }) {
  return (
    <ul className="hts-dropdown">
      {items.map((child) => (
        <li key={child.title}>
          <Link to={child.path}>{child.title}</Link>
        </li>
      ))}
    </ul>
  );
}

function NavItem({ item }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (item.children) {
    return (
      <li ref={ref} className="hts-nav-item has-dropdown" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        <button className="hts-nav-link" aria-haspopup="true" aria-expanded={open}>
          {item.title} <span className="hts-chevron">&#x2304;</span>
        </button>
        {open && <DropdownMenu items={item.children} />}
      </li>
    );
  }

  return (
    <li className="hts-nav-item">
      <Link to={item.path} className="hts-nav-link">{item.title}</Link>
    </li>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="hts-header-outer" role="banner">
      {/* Gradient accent banner */}
      <div className="hts-header-banner">
        <div className="container hts-header-inner">
          {/* Floating white card strip */}
          <div className="hts-floating-card">
            {/* Logo */}
            <Link to="/" className="hts-logo" aria-label="HTech Supports – Home">
              <img
                src="/assets/logos/logo-dark.png"
                alt="HTech Supports Logo"
                height={44}
                loading="eager"
              />
            </Link>

            {/* Desktop navigation */}
            <nav className="hts-nav" aria-label="Primary navigation">
              <ul className="hts-nav-list">
                {NAV.map((item) => (
                  <NavItem key={item.title} item={item} />
                ))}
              </ul>
            </nav>

            {/* CTA button */}
            <a href="/pages/contact-creative/" className="hts-partner-btn" aria-label="Become a partner">
              Become A Partner
            </a>

            {/* Mobile hamburger */}
            <button
              className="hts-hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <nav className="hts-mobile-nav" aria-label="Mobile navigation">
          <ul>
            {NAV.map((item) => (
              <li key={item.title}>
                <Link to={item.path} onClick={() => setMobileOpen(false)} className="hts-mobile-link">
                  {item.title}
                </Link>
                {item.children && (
                  <ul className="hts-mobile-sub">
                    {item.children.map((c) => (
                      <li key={c.title}>
                        <Link to={c.path} onClick={() => setMobileOpen(false)}>{c.title}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li>
              <a href="/pages/contact-creative/" className="hts-mobile-cta" onClick={() => setMobileOpen(false)}>
                Become A Partner
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
