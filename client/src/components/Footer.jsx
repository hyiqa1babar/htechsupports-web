// src/components/Footer.jsx
import React from 'react';
import siteData from '../data/siteData.json';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-links">
          <ul>
            {siteData.navigation.map((item) => (
              <li key={item.title}>
                <a href={item.path}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-copy">
          © {new Date().getFullYear()} HTech Supports. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
