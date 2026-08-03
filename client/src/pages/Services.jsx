// src/pages/Services.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import siteData from '../data/siteData.json';
import './Services.css';

function Services() {
  const { services } = siteData;

  return (
    <>
      <Helmet>
        <title>Services – HTech Supports</title>
        <meta
          name="description"
          content="Professional Service, Wireless Survey, Network Support, Structured Cabling, End User Computing Support, ITAD and Staff Augmentation — global IT services from HTS."
        />
      </Helmet>

      <section className="services-page">
        <div className="container services-page-header">
          <h1>SERVICES</h1>
        </div>

        {services.map((svc, i) => (
          <div key={svc.id} id={svc.id} className="service-overview">
            <div className={`container service-overview-inner ${i % 2 === 1 ? 'reverse' : ''}`}>
              <div className="service-overview-media">
                <img src={svc.image} alt={svc.title} loading="lazy" />
              </div>
              <div className="service-overview-text">
                <h2>{svc.title}</h2>
                <p>{svc.description}</p>
                <a href={svc.link} className="read-more">
                  Learn More <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default Services;
