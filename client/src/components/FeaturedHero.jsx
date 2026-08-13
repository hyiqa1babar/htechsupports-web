// client/src/components/FeaturedHero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Clock, ArrowRight, User } from 'lucide-react';
import './FeaturedHero.css';

export default function FeaturedHero({ article }) {
  if (!article) return null;

  const { title, excerpt, image, slug, category, date, readTime, author } = article;

  const formattedDate = date ? new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : 'Recent';

  return (
    <section className="hts-featured-hero">
      <div className="container">
        <div className="hts-hero-card">
          <div className="hts-hero-image-col">
            <img
              src={image || '/assets/images/hero-startup-1.png'}
              alt={title}
              className="hts-hero-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/images/service-pro-av.png';
              }}
            />
            <div className="hts-hero-image-overlay" />
            <div className="hts-featured-pill">
              <Sparkles size={14} className="hts-sparkle-icon" />
              <span>Featured Insight</span>
            </div>
          </div>

          <div className="hts-hero-content-col">
            {category && <span className="hts-hero-category">{category}</span>}

            <h1 className="hts-hero-title">
              <Link to={`/resources/${slug}`}>{title}</Link>
            </h1>

            <p className="hts-hero-excerpt">{excerpt}</p>

            <div className="hts-hero-meta">
              <span className="hts-hero-meta-item">
                <User size={15} />
                {author || 'HTech Team'}
              </span>
              <span className="hts-hero-meta-dot">•</span>
              <span className="hts-hero-meta-item">
                <Calendar size={15} />
                {formattedDate}
              </span>
              <span className="hts-hero-meta-dot">•</span>
              <span className="hts-hero-meta-item">
                <Clock size={15} />
                {readTime || '5 min read'}
              </span>
            </div>

            <div className="hts-hero-actions">
              <Link to={`/resources/${slug}`} className="hts-hero-btn-primary">
                Read Full Article
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
