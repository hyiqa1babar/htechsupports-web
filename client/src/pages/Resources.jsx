// client/src/pages/Resources.jsx
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import FeaturedHero from '../components/FeaturedHero.jsx';
import ResourceFilters from '../components/ResourceFilters.jsx';
import PostGrid from '../components/PostGrid.jsx';
import NewsletterBanner from '../components/NewsletterBanner.jsx';
import postsData from '../data/postsData.json';
import { BookOpen, Sparkles } from 'lucide-react';
import './Resources.css';

export default function Resources() {
  const [posts] = useState(postsData || []);
  const [filter, setFilter] = useState({ search: '', category: '' });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const query = filter.search.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query) ||
        p.content.toLowerCase().includes(query);

      const matchesCategory = filter.category
        ? p.category.toLowerCase() === filter.category.toLowerCase()
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [posts, filter]);

  // Featured article is the post marked featured, or the first post
  const featuredArticle = posts.find((p) => p.featured) || posts[0] || null;
  // Grid posts exclude the featured article when no active search/category filter is applied
  const gridPosts = useMemo(() => {
    if (filter.search || filter.category) {
      return filteredPosts;
    }
    return filteredPosts.filter((p) => p.id !== featuredArticle?.id);
  }, [filteredPosts, filter, featuredArticle]);

  return (
    <div className="hts-resources-page">
      <Helmet>
        <title>Resources & Blog – HTech Supports</title>
        <meta
          name="description"
          content="Explore HTech Supports IT resources, enterprise support guides, Wi-Fi survey insights, and expert case studies."
        />
      </Helmet>

      {/* Page Header */}
      <section className="hts-resources-header">
        <div className="container">
          <div className="hts-header-badge">
            <BookOpen size={16} />
            <span>Knowledge Hub</span>
          </div>
          <h1 className="hts-header-title">
            Resources & <span className="hts-gradient-text">Insights</span>
          </h1>
          <p className="hts-header-subtitle">
            Stay informed with expert insights, technical guides, IT support best practices, and real-world case studies from our global engineering team.
          </p>
        </div>
      </section>

      {/* Featured Hero Article */}
      {!filter.search && !filter.category && featuredArticle && (
        <FeaturedHero article={featuredArticle} />
      )}

      {/* Filter and Search Bar */}
      <ResourceFilters
        posts={posts}
        onChange={handleFilterChange}
        totalFiltered={filteredPosts.length}
      />

      {/* Article Grid */}
      <PostGrid posts={gridPosts} />

      {/* Newsletter / CTA Banner */}
      <NewsletterBanner />
    </div>
  );
}
