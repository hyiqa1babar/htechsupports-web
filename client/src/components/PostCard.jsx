// client/src/components/PostCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import './PostCard.css';

export default function PostCard({ post }) {
  const { title, excerpt, image, slug, category, date, readTime, author } = post;

  const formattedDate = date ? new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) : 'Recent';

  return (
    <article className="hts-post-card">
      <Link to={`/resources/${slug}`} className="hts-card-image-link" aria-label={title}>
        <div className="hts-card-image-wrap">
          <img
            src={image || '/assets/images/hero-startup-1.png'}
            alt={title}
            className="hts-card-img"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/images/service-pro-av.png';
            }}
          />
          <div className="hts-card-img-overlay" />
          {category && <span className="hts-card-badge">{category}</span>}
        </div>
      </Link>

      <div className="hts-card-body">
        <div className="hts-card-meta">
          <span className="hts-meta-item">
            <Calendar className="hts-meta-icon" size={14} />
            {formattedDate}
          </span>
          <span className="hts-meta-divider">•</span>
          <span className="hts-meta-item">
            <Clock className="hts-meta-icon" size={14} />
            {readTime || '5 min read'}
          </span>
        </div>

        <h3 className="hts-card-title">
          <Link to={`/resources/${slug}`}>{title}</Link>
        </h3>

        <p className="hts-card-excerpt">{excerpt}</p>

        <div className="hts-card-footer">
          <span className="hts-card-author">
            <User size={14} className="hts-author-icon" />
            {author || 'HTech Team'}
          </span>
          <Link to={`/resources/${slug}`} className="hts-card-btn">
            Read Article
            <ArrowRight className="hts-btn-arrow" size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
