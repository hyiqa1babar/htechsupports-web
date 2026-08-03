/* src/components/ContactSection.jsx
   Original contact section – kept as-is, rebuilt in React */
import React, { useState } from 'react';
import siteData from '../data/siteData.json';
import './ContactSection.css';

export default function ContactSection() {
  const { contactForm } = siteData;
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const data = {
      name:    form.name.value,
      phone:   form.phone.value,
      email:   form.email.value,
      role:    form.role.value,
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
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="container contact-inner">
        {/* Left text */}
        <div className="contact-left">
          <p className="contact-eyebrow">GET IN TOUCH</p>
          <h2 id="contact-title" className="section-title">{contactForm.title}</h2>
          <p className="section-sub contact-sub">{contactForm.subtitle}</p>

          <div className="contact-info-list">
            <div className="contact-info-item">
              <span className="ci-icon">✉️</span>
              <div>
                <p className="ci-label">Email</p>
                <a href="mailto:sales@htechsupports.com">sales@htechsupports.com</a>
              </div>
            </div>
            <div className="contact-info-item">
              <span className="ci-icon">📞</span>
              <div>
                <p className="ci-label">Phone (France)</p>
                <a href="tel:+33650306719">+33 650 30 6719</a>
              </div>
            </div>
            <div className="contact-info-item">
              <span className="ci-icon">🌍</span>
              <div>
                <p className="ci-label">Coverage</p>
                <p>50+ countries worldwide</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right form */}
        <div className="contact-right">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cf-name">Full Name *</label>
                <input id="cf-name" name="name" type="text" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="cf-phone">Phone</label>
                <input id="cf-phone" name="phone" type="tel" placeholder="Your phone" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cf-email">Email *</label>
                <input id="cf-email" name="email" type="email" placeholder="Your email" required />
              </div>
              <div className="form-group">
                <label htmlFor="cf-role">Role *</label>
                <select id="cf-role" name="role" required>
                  <option value="">Which best describes you?</option>
                  {contactForm.roles.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group form-group--full">
              <label htmlFor="cf-message">Message *</label>
              <textarea id="cf-message" name="message" rows={5} placeholder="Your message…" required />
            </div>

            <button type="submit" className="cf-submit" disabled={loading}>
              {loading ? 'Sending…' : 'Send Message'}
            </button>

            {status === 'sent'  && <p className="cf-success">✓ Message sent – we'll be in touch shortly!</p>}
            {status === 'error' && <p className="cf-error">Something went wrong. Please try again.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
