// src/components/Header.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import siteData from '../data/siteData.json';

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo-link">
          <img src="/assets/logos/logo-dark.png" alt="HTech Supports" className="logo" />
        </Link>
        <nav className="main-nav">
          <ul>
            {siteData.navigation.map((item) => (
              <li key={item.title} className={item.children ? 'has-dropdown' : ''}>
                <NavLink to={item.path} end>
                  {item.title}
                </NavLink>
                {item.children && (
                  <ul className="dropdown">
                    {item.children.map((child) => (
                      <li key={child.title}>
                        <NavLink to={child.path}>{child.title}</NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
