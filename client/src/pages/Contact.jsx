// src/pages/Contact.jsx — Premium teal-branded contact page
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import siteData from '../data/siteData.json';
import StoreBadges from '../components/StoreBadges.jsx';
import './Contact.css';

const OFFICES = [
  {
    flag: '🇬🇧',
    country: 'UK Office',
    address: '450 Bath Road, Longford, Heathrow London, UB7 0EB, UK',
    email: 'sales@htechsupports.com',
  },
  {
    flag: '🇫🇷',
    country: 'France Office',
    address: 'Unit 8 – 189 Boulevard André Brémont, 95320 Saint-Leu-la-Forêt, France',
    phone: '+33 650 30 6719',
  },
  {
    flag: '🇺🇸',
    country: 'USA Office',
    email: 'sales@htechsupports.com',
  },
];

const ROLES = [
  'IT Manager / Director',
  'Procurement / Vendor Manager',
  'Field / Infrastructure Engineer',
  'Partner / Reseller',
  'Recruitment / HR',
  'Other',
];

export default function Contact() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const data = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      role: form.role.value,
      message: form.message.value,
    };
    try {
      const res = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setStatus(result.success ? 'sent' : 'error');
      if (result.success) form.reset();
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <Helmet>
        <title>Contact Us — HTech Supports</title>
        <meta name="description" content="Get in touch with HTech Supports for global IT infrastructure services, smart hands engineering, datacenter support, and partnership enquiries." />
      </Helmet>

      {/* ── HERO ── */}
      <section className="ct-hero">
        <div className="ct-hero-overlay" />
        <div className="container ct-hero-content">
          <span className="ct-pill">Get In Touch</span>
          <h1>Let's Talk About<br /><span className="ct-accent">Your IT Needs</span></h1>
          <p>Whether you need global field engineers, datacenter support, or want to become a partner — our team responds within 24 hours.</p>
        </div>
      </section>

      {/* ── MAIN GRID ── */}
      <section className="ct-main">
        <div className="container ct-grid">

          {/* Left: Form */}
          <div className="ct-form-col">
            <div className="ct-form-card">
              <h2>Send Us a Message</h2>
              <p className="ct-form-sub">Fill in the form and a member of our team will be in touch shortly.</p>

              <form className="ct-form" onSubmit={handleSubmit} noValidate>
                <div className="ct-field-row">
                  <div className="ct-field">
                    <label htmlFor="ct-name">Full Name *</label>
                    <input id="ct-name" name="name" type="text" placeholder="John Smith" required />
                  </div>
                  <div className="ct-field">
                    <label htmlFor="ct-phone">Phone Number</label>
                    <input id="ct-phone" name="phone" type="tel" placeholder="+44 1234 567890" />
                  </div>
                </div>
                <div className="ct-field">
                  <label htmlFor="ct-email">Email Address *</label>
                  <input id="ct-email" name="email" type="email" placeholder="john@company.com" required />
                </div>
                <div className="ct-field">
                  <label htmlFor="ct-role">Which best describes you? *</label>
                  <select id="ct-role" name="role" required>
                    <option value="">Select your role...</option>
                    {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className="ct-field">
                  <label htmlFor="ct-message">Your Message *</label>
                  <textarea id="ct-message" name="message" rows={5} placeholder="Tell us about your requirements..." required />
                </div>

                {status === 'sent' && (
                  <div className="ct-status ct-status--success">
                    ✓ Message sent — thank you! We'll be in touch within 24 hours.
                  </div>
                )}
                {status === 'error' && (
                  <div className="ct-status ct-status--error">
                    ✗ Something went wrong. Please try again or email us directly.
                  </div>
                )}

                <button type="submit" className="ct-submit" disabled={loading}>
                  {loading ? 'Sending…' : 'Send Message →'}
                </button>
              </form>
            </div>
          </div>

          {/* Right: Info */}
          <div className="ct-info-col">
            {/* Contact details */}
            <div className="ct-info-card">
              <h3>Direct Contact</h3>
              <div className="ct-contact-item">
                <span className="ct-contact-icon">✉</span>
                <div>
                  <p className="ct-contact-label">General Enquiries</p>
                  <a href="mailto:sales@htechsupports.com">sales@htechsupports.com</a>
                </div>
              </div>
              <div className="ct-contact-item">
                <span className="ct-contact-icon">⏱</span>
                <div>
                  <p className="ct-contact-label">Response Time</p>
                  <p>Within 24 hours, Monday – Friday</p>
                </div>
              </div>
              <div className="ct-contact-item">
                <span className="ct-contact-icon">🌍</span>
                <div>
                  <p className="ct-contact-label">Global Coverage</p>
                  <p>50+ countries across EMEA, Americas & APAC</p>
                </div>
              </div>
            </div>

            {/* Offices */}
            <div className="ct-info-card">
              <h3>Our Offices</h3>
              {OFFICES.map((o) => (
                <div key={o.country} className="ct-office">
                  <p className="ct-office-name">{o.flag} {o.country}</p>
                  {o.address && <p className="ct-office-detail">{o.address}</p>}
                  {o.email && <a href={`mailto:${o.email}`} className="ct-office-link">{o.email}</a>}
                  {o.phone && <a href={`tel:${o.phone.replace(/\s/g, '')}`} className="ct-office-link">{o.phone}</a>}
                </div>
              ))}
            </div>

            {/* App badges */}
            <div className="ct-info-card ct-app-card">
              <h3>Download the Engineer Hub App</h3>
              <p>Access job packs, dispatch, and sign-off tools on the go.</p>
              <div className="ct-app-badges">
                <StoreBadges />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
