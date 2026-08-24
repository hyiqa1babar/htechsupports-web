/* src/components/Header.jsx */
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import siteData from '../data/siteData.json';
import { usePartner } from './PartnerContext.jsx';
import './Header.css';

const NAV = siteData.navigation;

function DropdownMenu({ title, items, onItemClick }) {
  const isServices = title?.toLowerCase().includes('service');
  const isSectors = title?.toLowerCase().includes('sector');

  return (
    <div className={`hts-dropdown-card ${isServices ? 'hts-dropdown-services' : ''} ${isSectors ? 'hts-dropdown-sectors' : ''}`}>
      <div className="hts-dropdown-header">
        <span className="hts-dropdown-category">{title}</span>
        <span className="hts-dropdown-count">{items.length} Offerings</span>
      </div>
      <div className="hts-dropdown-grid">
        {items.map((child) => (
          <Link
            key={child.title}
            to={child.path}
            onClick={onItemClick}
            className="hts-dropdown-item"
          >
            <div className="hts-item-dot" />
            <div className="hts-item-content">
              <span className="hts-item-title">{child.title}</span>
              {child.title.includes('Ekahau') && <span className="hts-item-badge">Partner</span>}
            </div>
            <span className="hts-item-arrow">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function NavItem({ item }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  if (item.children) {
    return (
      <li
        className={`hts-nav-item has-dropdown ${open ? 'dropdown-open' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          to={item.path}
          className="hts-nav-link"
          onClick={() => setOpen(false)}
          aria-haspopup="true"
          aria-expanded={open}
        >
          {item.title} <span className="hts-chevron">&#x2304;</span>
        </Link>
        {open && (
          <div className="hts-dropdown-bridge" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <DropdownMenu title={item.title} items={item.children} onItemClick={() => setOpen(false)} />
          </div>
        )}
      </li>
    );
  }

  return (
    <li className="hts-nav-item">
      <Link to={item.path} className="hts-nav-link">
        {item.title}
      </Link>
    </li>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const openPartner = usePartner();

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
                  src="/assets/logos/logo-main.svg"
                  alt="HTech Supports Logo"
                  className="logo-image"
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
            <button onClick={openPartner} className="hts-partner-btn" aria-label="Become a partner">
              Become A Partner
            </button>

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
              <button className="hts-mobile-cta" onClick={() => { setMobileOpen(false); openPartner(); }}>
                Become A Partner
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
