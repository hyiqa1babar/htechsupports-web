// src/pages/Privacy.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import './Privacy.css';

export default function Privacy() {
  return (
    <div className="privacy-page">
      <Helmet>
        <title>Privacy Policy — HTech Supports</title>
        <meta name="description" content="HTech Supports privacy policy covering data collection, use, and protection." />
      </Helmet>

      <section className="privacy-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p className="privacy-updated">Last updated: August 2026</p>
        </div>
      </section>

      <section className="privacy-content">
        <div className="container">
          <article>
            <section>
              <h2>1. Introduction</h2>
              <p>HTech Supports ("we", "our", "us") is committed to protecting your personal information and your right to privacy. This policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
            </section>

            <section>
              <h2>2. Information We Collect</h2>
              <h3>Personal Data</h3>
              <p>We may collect personally identifiable information when you voluntarily provide it, such as:</p>
              <ul>
                <li>Name, email, phone, company name</li>
                <li>Job title, department</li>
                <li>Message content from contact/partner forms</li>
                <li>CV/resume data from careers applications</li>
              </ul>
              <h3>Usage Data</h3>
              <p>We automatically collect certain information when you access our site:</p>
              <ul>
                <li>IP address, browser type, operating system</li>
                <li>Pages visited, time spent, referring URLs</li>
                <li>Device identifiers and diagnostic data</li>
              </ul>
            </section>

            <section>
              <h2>3. How We Use Your Information</h2>
              <p>We use collected data to:</p>
              <ul>
                <li>Provide and improve our services</li>
                <li>Respond to inquiries and partner applications</li>
                <li>Process career applications</li>
                <li>Send periodic emails (you can unsubscribe anytime)</li>
                <li>Analyze site usage to optimize experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2>4. Data Sharing & Disclosure</h2>
              <p>We do not sell your personal data. We may share information with:</p>
              <ul>
                <li>Service providers who perform services on our behalf (hosting, analytics, email)</li>
                <li>Professional advisors (legal, accounting)</li>
                <li>Authorities when required by law or to protect rights</li>
                <li>Business partners in connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </section>

            <section>
              <h2>5. Data Retention</h2>
              <p>We retain personal data only as long as necessary for the purposes outlined in this policy, or as required by law. Contact form data is kept for 12 months; career applications for 24 months.</p>
            </section>

            <section>
              <h2>6. Your Rights</h2>
              <p>Depending on your jurisdiction, you may have the right to:</p>
              <ul>
                <li>Access, correct, or delete your personal data</li>
                <li>Restrict or object to processing</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
              <p>To exercise these rights, contact <a href="mailto:privacy@htechsupports.com">privacy@htechsupports.com</a>.</p>
            </section>

            <section>
              <h2>7. Cookies & Tracking</h2>
              <p>Our site uses cookies and similar technologies to enhance functionality and analytics. You can manage cookie preferences via your browser settings. Disabling cookies may affect site functionality.</p>
            </section>

            <section>
              <h2>8. International Transfers</h2>
              <p>As a global company, your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards (e.g., Standard Contractual Clauses) are in place.</p>
            </section>

            <section>
              <h2>9. Security</h2>
              <p>We implement appropriate technical and organizational measures to protect personal data against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is 100% secure.</p>
            </section>

            <section>
              <h2>10. Children's Privacy</h2>
              <p>Our services are not directed to individuals under 16. We do not knowingly collect data from children. If you believe we have, contact us and we will delete it.</p>
            </section>

            <section>
              <h2>11. Changes to This Policy</h2>
              <p>We may update this policy periodically. Changes are effective upon posting. Material changes will be communicated via email or site notice.</p>
            </section>

            <section>
              <h2>12. Contact Us</h2>
              <p>Questions about this Privacy Policy? Contact our Data Protection Officer at <a href="mailto:privacy@htechsupports.com">privacy@htechsupports.com</a> or write to HTech Supports, London, UK.</p>
            </section>
          </article>
        </div>
      </section>
    </div>
  );
}