// src/components/NewsletterBanner.jsx
import React, { useState } from 'react';

export default function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple client‑side validation
    if (email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setSubmitted(true);
      // In a real app you would POST to an API here.
    }
  };

  return (
    <section className="newsletter-banner relative py-12 text-center text-white" style={{ background: 'linear-gradient(135deg, var(--hts-banner-start), var(--hts-banner-end))' }}>
      <div className="container">
        {submitted ? (
          <h2 className="text-2xl font-bold">Thank you for subscribing!</h2>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-4">Stay Updated with HTS Insights</h2>
            <p className="mb-6">Get the latest resources, case studies, and industry news delivered to your inbox.</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
                required
              />
              <button type="submit" className="px-6 py-2 bg-white text-gray-800 font-medium rounded-md hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
