// src/pages/Resources.jsx
import React, { useEffect, useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import FeaturedHero from '../components/FeaturedHero.jsx';
import ResourceFilters from '../components/ResourceFilters.jsx';
import PostGrid from '../components/PostGrid.jsx';
import NewsletterBanner from '../components/NewsletterBanner.jsx';

export default function Resources() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ search: '', category: '' });

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error('Failed to load posts', err));
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredPosts = posts.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(filter.search.toLowerCase());
    const matchesCategory = filter.category ? p.category === filter.category : true;
    return matchesSearch && matchesCategory;
  });

  const featured = posts[0] || null;

  return (
    <HelmetProvider>
      <Helmet>
        <title>Resources – HTech Supports</title>
        <meta name="description" content="Explore HTech Supports resources, guides, case studies, and blog articles." />
      </Helmet>
      <main id="main-content">
        {featured && <FeaturedHero article={featured} />}
        <ResourceFilters posts={posts} onChange={handleFilterChange} />
        <PostGrid posts={filteredPosts} />
        <NewsletterBanner />
      </main>
    </HelmetProvider>
  );
}
