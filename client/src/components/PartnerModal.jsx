// src/components/PartnerModal.jsx – Reusable "Become a Partner" modal
// Colour spec (from client): dusk form background, white input fields, blue text.
import React, { useState, useEffect, useCallback } from 'react';
import './PartnerModal.css';

export default function PartnerModal({ open, onClose }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // Close on Escape + lock body scroll while open
  const escHandler = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', escHandler);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', escHandler);
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', escHandler);
      document.body.style.overflow = '';
    };
  }, [open, escHandler]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const form = e.target;
    const data = {
      name:    form.name.value,
      email:   form.email.value,
      phone:   form.phone.value,
      company: form.company.value,
      role:    'Partner Application',
      type:    'Partner Application',
      subject: `Partner Application: ${form.company.value || form.name.value}`,
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
    <div className="partner-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="partner-title">
      <div className="partner-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* close */}
        <button className="partner-close" onClick={onClose} aria-label="Close">&times;</button>

        <p className="partner-eyebrow">PARTNER WITH US</p>
        <h2 id="partner-title" className="partner-title">Become a Partner</h2>
        <p className="partner-sub">
          Join our global network of approved service partners. Tell us about your
          organisation and we'll be in touch.
        </p>

        <form className="partner-form" onSubmit={handleSubmit} noValidate>
          <div className="partner-row">
            <div className="partner-field">
              <label htmlFor="pt-name">Full Name *</label>
              <input id="pt-name" name="name" type="text" placeholder="Your name" required />
            </div>
            <div className="partner-field">
              <label htmlFor="pt-email">Email *</label>
              <input id="pt-email" name="email" type="email" placeholder="Your email" required />
            </div>
          </div>

          <div className="partner-row">
            <div className="partner-field">
              <label htmlFor="pt-phone">Phone</label>
              <input id="pt-phone" name="phone" type="tel" placeholder="Your phone" />
            </div>
            <div className="partner-field">
              <label htmlFor="pt-company">Company</label>
              <input id="pt-company" name="company" type="text" placeholder="Your company" />
            </div>
          </div>

          <div className="partner-field">
            <label htmlFor="pt-message">Message *</label>
            <textarea id="pt-message" name="message" rows={4} placeholder="How can we work together?" required />
          </div>

          <button type="submit" className="partner-submit" disabled={loading}>
            {loading ? 'Sending…' : 'Send Request'}
          </button>

          {status === 'sent'  && <p className="partner-success">✓ Thank you — we'll get back to you shortly!</p>}
          {status === 'error' && <p className="partner-error">Something went wrong. Please try again.</p>}
        </form>
      </div>
    </div>
  );
}
