// client/src/components/NewsletterBanner.jsx
import React, { useState } from 'react';
import { Mail, CheckCircle2, Send } from 'lucide-react';
import './NewsletterBanner.css';

export default function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setSubmitted(true);
    }
  };

  return (
    <section className="hts-newsletter-section">
      <div className="container">
        <div className="hts-newsletter-card">
          <div className="hts-newsletter-content">
            {submitted ? (
              <div className="hts-newsletter-success">
                <CheckCircle2 size={48} className="hts-success-icon" />
                <h3>Thank You for Subscribing!</h3>
                <p>You will receive our latest IT insights, whitepapers, and tech updates directly in your inbox.</p>
              </div>
            ) : (
              <>
                <div className="hts-newsletter-header">
                  <div className="hts-newsletter-badge">
                    <Mail size={16} />
                    <span>Stay Ahead</span>
                  </div>
                  <h2>Subscribe to HTech Supports Insights</h2>
                  <p>Get curated industry insights, IT support guides, and enterprise tech news straight to your inbox.</p>
                </div>

                <form onSubmit={handleSubmit} className="hts-newsletter-form">
                  <div className="hts-newsletter-input-group">
                    <Mail className="hts-input-icon" size={18} />
                    <input
                      type="email"
                      placeholder="Enter your corporate email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="hts-newsletter-input"
                      required
                    />
                    <button type="submit" className="hts-newsletter-btn">
                      <span>Subscribe</span>
                      <Send size={16} />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
