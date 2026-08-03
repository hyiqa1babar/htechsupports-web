// src/components/ServiceCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function ServiceCard({ service }) {
  const { title, description, icon, link } = service;
  return (
    <div className="service-card">
      <div className="icon">{/* placeholder for future SVG/icon */}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={link} className="read-more">
        Learn More →
      </Link>
    </div>
  );
}

export default ServiceCard;
