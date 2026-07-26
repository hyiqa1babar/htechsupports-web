// src/pages/Home.jsx
import React from 'react';
import siteData from '../data/siteData.json';
import ServiceCard from '../components/ServiceCard.jsx';

function Home() {
  const { company, services } = siteData;
  return (
    <section className="home">
      <div className="hero container">
        <h1>{company.tagline}</h1>
        <h2>{company.taglineRotator[0]}</h2>
        <p>{company.description}</p>
        <img src="/assets/images/hero-startup-1.png" alt="hero" className="hero-img" />
      </div>
      <div className="services-overview container">
        <h2>What We Do</h2>
        <div className="service-grid">
          {services.map((svc) => (
            <ServiceCard key={svc.id} service={svc} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
