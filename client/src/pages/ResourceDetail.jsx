// client/src/pages/ResourceDetail.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import postsData from '../data/postsData.json';
import { Calendar, Clock, User, ArrowLeft, Share2, Sparkles, ChevronRight, CheckCircle } from 'lucide-react';
import PostCard from '../components/PostCard.jsx';
import './ResourceDetail.css';

export default function ResourceDetail() {
  const { slug } = useParams();
  const [scrollProgress, setScrollProgress] = useState(0);

  const post = useMemo(() => {
    return postsData.find((p) => p.slug === slug) || null;
  }, [slug]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return postsData
      .filter((p) => p.slug !== slug)
      .slice(0, 3);
  }, [post, slug]);

  // Scroll reading progress calculation
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  if (!post) {
    return (
      <div className="hts-detail-not-found">
        <Helmet>
          <title>Article Not Found — HTech Supports</title>
        </Helmet>
        <div className="container">
          <div className="hts-not-found-card">
            <h1>Article Not Found</h1>
            <p>The resource you are looking for does not exist or may have been moved.</p>
            <Link to="/resources" className="hts-detail-btn-primary">
              <ArrowLeft size={16} /> Back to Resources
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Recent';

  return (
    <div className="hts-article-detail-page">
      <Helmet>
        <title>{post.title} — HTech Supports</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | HTech Supports`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
      </Helmet>

      {/* Reading Progress Bar */}
      <div
        className="hts-reading-progress"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Header & Breadcrumb */}
      <header className="hts-article-header">
        <div className="container">
          <nav className="hts-breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <Link to="/resources">Resources</Link>
            <ChevronRight size={14} />
            <span>{post.category || 'Article'}</span>
          </nav>

          {post.category && <span className="hts-article-category-badge">{post.category}</span>}

          <h1 className="hts-article-hero-title">{post.title}</h1>

          <div className="hts-article-meta-row">
            <div className="hts-meta-author">
              <div className="hts-author-avatar">
                <User size={18} />
              </div>
              <div>
                <span className="hts-author-name">{post.author || 'HTech Solutions Team'}</span>
                <span className="hts-author-role">IT Infrastructure Specialists</span>
              </div>
            </div>

            <div className="hts-meta-details">
              <span className="hts-meta-detail-item">
                <Calendar size={15} />
                {formattedDate}
              </span>
              <span className="hts-meta-detail-item">
                <Clock size={15} />
                {post.readTime || '5 min read'}
              </span>
              <button type="button" onClick={handleShare} className="hts-share-btn" title="Share Article">
                <Share2 size={16} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Banner Image */}
      <div className="container">
        <div className="hts-article-banner-wrap">
          <img
            src={post.image || '/assets/images/hero-startup-1.png'}
            alt={post.title}
            className="hts-article-banner-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/images/service-pro-av.png';
            }}
          />
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="container hts-article-container">
        <div className="hts-article-layout">
          {/* Left Column: Article Body */}
          <article className="hts-article-body">
            <div
              className="hts-formatted-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Back to Resources Footer CTA */}
            <div className="hts-article-footer-nav">
              <Link to="/resources" className="hts-back-link">
                <ArrowLeft size={18} />
                <span>Back to Resources & Blog</span>
              </Link>
            </div>
          </article>

          {/* Right Column: Sticky Sidebar */}
          <aside className="hts-article-sidebar">
            <div className="hts-sidebar-cta-card">
              <div className="hts-cta-icon-wrap">
                <Sparkles size={24} />
              </div>
              <h3>Need Global IT Support?</h3>
              <p>
                From dispatch engineering to Ekahau Wi-Fi surveys, HTech Supports delivers Level 1–3 IT support across 50+ countries.
              </p>
              <ul className="hts-cta-features">
                <li><CheckCircle size={15} /> 24/7 Rapid On-Site Support</li>
                <li><CheckCircle size={15} /> Multi-vendor Certified Engineers</li>
                <li><CheckCircle size={15} /> Global FSL & Deployment</li>
              </ul>
              <Link to="/contact" className="hts-sidebar-btn">
                Contact Our Team
              </Link>
            </div>
          </aside>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="hts-related-section">
            <h2 className="hts-related-title">Related Articles & Case Studies</h2>
            <div className="hts-related-grid">
              {relatedPosts.map((rel) => (
                <PostCard key={rel.id || rel.slug} post={rel} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}