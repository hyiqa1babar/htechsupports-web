// src/pages/ResourceDetail.jsx
// Blog post / resource detail page
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { usePartner } from '../components/PartnerContext.jsx';
import './ResourceDetail.css';

export default function ResourceDetail() {
  const { slug } = useParams();
  const openPartner = usePartner();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In production, fetch from CMS/API. For now, mock data based on slug.
    const mockPosts = {
      'global-rollout-case-study': {
        title: 'Global Rollout: 180 Sites Across 30 Countries',
        category: 'Case Study',
        date: '2026-06-15',
        readTime: '8 min',
        author: 'HTech Solutions Team',
        image: '/assets/images/hero-startup-1.png',
        excerpt: 'How we delivered a coordinated probe rollout across 180+ sites in 30 countries with zero downtime.',
        content: `
          <h2>Challenge</h2>
          <p>A multinational client needed to deploy network probes across 180+ locations in 30 countries within a 90-day window. The complexity lay in coordinating local field engineers, managing customs clearance for equipment, and ensuring zero disruption to ongoing operations.</p>
          <h2>Solution</h2>
          <p>HTech Supports mobilized a dedicated program management office and leveraged our global partner network. We pre-staged equipment at forward stocking locations, deployed BPSS-cleared engineers for sensitive sites, and used real-time tracking dashboards for stakeholder visibility.</p>
          <h2>Results</h2>
          <ul>
            <li>180+ sites deployed on schedule</li>
            <li>Zero unplanned downtime</li>
            <li>98% first-time fix rate</li>
            <li>Real-time visibility for client leadership</li>
          </ul>
        `
      },
      'ekahau-wifi-optimization': {
        title: 'Ekahau Wi-Fi Optimization: Eliminating Dead Zones',
        category: 'Technical Guide',
        date: '2026-05-22',
        readTime: '6 min',
        author: 'Wireless Engineering Team',
        image: '/assets/images/hero-startup-2.png',
        excerpt: 'Step-by-step guide to conducting certified Ekahau surveys and optimizing enterprise Wi-Fi performance.',
        content: `
          <h2>Why Wi-Fi Surveys Matter</h2>
          <p>Wireless networks degrade over time due to environmental changes, new interference sources, and growing device density. Regular Ekahau surveys identify issues before they impact productivity.</p>
          <h2>Our Survey Process</h2>
          <ol>
            <li>Pre-survey planning & floor plan import</li>
            <li>On-site spectrum analysis & AP placement validation</li>
            <li>Heat-map generation for coverage, capacity, interference</li>
            <li>Remediation report with prioritized actions</li>
          </ol>
          <h2>Typical Outcomes</h2>
          <p>Clients typically see 30-50% improvement in throughput and significant reduction in support tickets after implementing our recommendations.</p>
        `
      },
      'datacenter-expansion-case-study': {
        title: 'Data Centre Expansion: Rack & Stack at Scale',
        category: 'Case Study',
        date: '2026-04-10',
        readTime: '7 min',
        author: 'Datacenter Operations',
        image: '/assets/images/coverage-map.jpg',
        excerpt: 'Managing a phased data centre expansion while keeping existing workloads online.',
        content: `
          <h2>Project Overview</h2>
          <p>A hyperscale client needed to expand their data centre footprint by 40 racks while maintaining 99.99% uptime for existing workloads.</p>
          <h2>Execution</h2>
          <p>Our team delivered rack-and-stack, cable patching, and hardware deployment in phased windows coordinated with the client's change advisory board. All work was performed by certified data centre engineers following strict ESD and safety protocols.</p>
          <h2>Key Metrics</h2>
          <ul>
            <li>40 racks deployed in 3 phases</li>
            <li>Zero SLA breaches during expansion</li>
            <li>100% cable certification pass rate</li>
          </ul>
        `
      }
    };

    const found = mockPosts[slug];
    setPost(found || null);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="resource-detail loading">
        <div className="container"><div className="skeleton" /></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="resource-detail not-found">
        <Helmet>
          <title>Article Not Found — HTech Supports</title>
        </Helmet>
        <div className="container">
          <h1>Article Not Found</h1>
          <p>The resource you're looking for doesn't exist or has been removed.</p>
          <Link to="/resources" className="hts-btn hts-btn-primary">← Back to Resources</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="resource-detail">
      <Helmet>
        <title>{post.title} — HTech Supports</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | HTech Supports`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} | HTech Supports`} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
      </Helmet>

      <article>
        {/* Hero */}
        <header className="resource-hero">
          <div className="resource-hero-bg" style={{ backgroundImage: `url(${post.image})` }} aria-hidden="true" />
          <div className="resource-hero-overlay" />
          <div className="container resource-hero-content">
            <span className="resource-category">{post.category}</span>
            <h1>{post.title}</h1>
            <div className="resource-meta">
              <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> {post.readTime}</span>
            </div>
            <p className="resource-author">By {post.author}</p>
          </div>
        </header>

        {/* Content */}
        <div className="container resource-body">
          <div className="resource-content" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* CTA */}
          <aside className="resource-cta">
            <h3>Ready to Get Started?</h3>
            <p>Talk to our team about your infrastructure challenges.</p>
            <div className="resource-cta-actions">
              <Link to="/contact" className="hts-btn hts-btn-primary">Contact Us</Link>
            </div>
          </aside>

          {/* Back link */}
          <Link to="/resources" className="resource-back">← Back to Resources</Link>
        </div>
      </article>
    </div>
  );
}