// src/pages/Contact.jsx
import React, { useState } from 'react';
import siteData from '../data/siteData.json';

function Contact() {
  const { contactForm } = siteData;
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    } catch (_) {
      setStatus('error');
    }
  };

  return (
    <section className="contact-page container">
      <h1>{contactForm.title}</h1>
      <p>{contactForm.subtitle}</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <input name="name" placeholder="Enter your name" required />
        <input name="phone" placeholder="Phone" type="tel" />
        <input name="email" placeholder="Enter your email" type="email" required />
        <select name="role" required>
          <option value="">Which best describes you?</option>
          {contactForm.roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <textarea name="message" placeholder="Your message" required rows={5} />
        {/* reCAPTCHA widget */}
        <div
          className="g-recaptcha"
          data-sitekey={contactForm.recaptchaSiteKey}
        ></div>
        <button type="submit">Submit</button>
      </form>

      {status === 'sent' && <p className="success">Message sent – thank you!</p>}
      {status === 'error' && <p className="error">Something went wrong.</p>}
    </section>
  );
}

export default Contact;
