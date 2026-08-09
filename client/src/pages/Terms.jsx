// src/pages/Terms.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import './Terms.css';

export default function Terms() {
  return (
    <div className="terms-page">
      <Helmet>
        <title>Terms & Conditions — HTech Supports</title>
        <meta name="description" content="Terms and conditions for using HTech Supports services and website." />
      </Helmet>

      <section className="terms-hero">
        <div className="container">
          <h1>Terms & Conditions</h1>
          <p className="terms-updated">Last updated: August 2026</p>
        </div>
      </section>

      <section className="terms-content">
        <div className="container">
          <article>
            <section>
              <h2>1. Acceptance of Terms</h2>
              <p>By accessing and using the HTech Supports website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
            </section>

            <section>
              <h2>2. Services Description</h2>
              <p>HTech Supports provides global IT support and infrastructure services including but not limited to: professional AV installation, wireless surveys, network support, structured cabling, end-user computing support, IT asset disposal, and staff augmentation across multiple sectors including retail, enterprise, data center, carrier network, manufacturing, and government.</p>
            </section>

            <section>
              <h2>3. Use of Site</h2>
              <p>You agree to use this website only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the site. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within the site.</p>
            </section>

            <section>
              <h2>4. Intellectual Property</h2>
              <p>All content, trademarks, logos, and data on this website are the property of HTech Supports or its licensors and are protected by international copyright laws. You may not reproduce, distribute, or create derivative works without express written permission.</p>
            </section>

            <section>
              <h2>5. Limitation of Liability</h2>
              <p>HTech Supports shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services or website. This includes but is not limited to damages for loss of profits, use, data, or other intangible losses.</p>
            </section>

            <section>
              <h2>6. Indemnification</h2>
              <p>You agree to indemnify, defend, and hold harmless HTech Supports, its officers, directors, employees, agents, and affiliates from any claims, losses, damages, liabilities, and expenses (including attorneys' fees) arising from your use of the website or violation of these terms.</p>
            </section>

            <section>
              <h2>7. Governing Law</h2>
              <p>These terms shall be governed by and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law provisions. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
            </section>

            <section>
              <h2>8. Changes to Terms</h2>
              <p>HTech Supports reserves the right to modify these terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of the website constitutes acceptance of the revised terms.</p>
            </section>

            <section>
              <h2>9. Contact Information</h2>
              <p>If you have any questions about these Terms & Conditions, please contact us at <a href="mailto:legal@htechsupports.com">legal@htechsupports.com</a>.</p>
            </section>
          </article>
        </div>
      </section>
    </div>
  );
}