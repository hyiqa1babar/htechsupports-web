// client/src/components/ResourceFilters.jsx
import React, { useState, useEffect } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import './ResourceFilters.css';

export default function ResourceFilters({ posts = [], onChange, totalFiltered = 0 }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  // Extract unique categories from posts
  useEffect(() => {
    const catCounts = {};
    posts.forEach((p) => {
      if (p.category) {
        catCounts[p.category] = (catCounts[p.category] || 0) + 1;
      }
    });
    setCategories(Object.entries(catCounts));
  }, [posts]);

  // Notify parent on filter change
  useEffect(() => {
    onChange({ search, category });
  }, [search, category, onChange]);

  const handleClearSearch = () => {
    setSearch('');
  };

  return (
    <div className="hts-filters-sticky-wrap">
      <div className="container">
        <div className="hts-filters-bar">
          {/* Search Box */}
          <div className="hts-search-box">
            <Search className="hts-search-icon" size={18} />
            <input
              type="text"
              placeholder="Search resources, articles, guides..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="hts-search-input"
            />
            {search && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="hts-search-clear"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="hts-category-pills">
            <button
              type="button"
              onClick={() => setCategory('')}
              className={`hts-pill ${category === '' ? 'active' : ''}`}
            >
              <span>All Posts</span>
              <span className="hts-pill-count">{posts.length}</span>
            </button>

            {categories.map(([catName, count]) => (
              <button
                key={catName}
                type="button"
                onClick={() => setCategory(catName)}
                className={`hts-pill ${category === catName ? 'active' : ''}`}
              >
                <span>{catName}</span>
                <span className="hts-pill-count">{count}</span>
              </button>
            ))}
          </div>

          <div className="hts-results-count">
            <SlidersHorizontal size={14} />
            <span>Showing {totalFiltered} {totalFiltered === 1 ? 'article' : 'articles'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
