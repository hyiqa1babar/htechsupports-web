// src/pages/Services.jsx
import React from 'react';
import siteData from '../data/siteData.json';
import ServiceCard from '../components/ServiceCard.jsx';

function Services() {
  const { services } = siteData;
  return (
    <section className="services-page container">
      <h1>Our Services</h1>
      <div className="service-grid">
        {services.map((svc) => (
          <ServiceCard key={svc.id} service={svc} />
        ))}
      </div>
    </section>
  );
}

export default Services;
