// src/components/ResourceFilters.jsx
import React, { useState, useEffect } from 'react';

export default function ResourceFilters({ posts, onChange }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  // Extract unique categories from posts
  useEffect(() => {
    const cats = Array.from(new Set(posts.map((p) => p.category).filter(Boolean)));
    setCategories(cats);
  }, [posts]);

  // Notify parent on filter change
  useEffect(() => {
    onChange({ search, category });
  }, [search, category, onChange]);

  return (
    <section className="sticky top-0 z-10 bg-white shadow-sm py-4">
      <div className="container flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search resources..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
        />
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory('')}
            className={`px-3 py-1 rounded-full text-sm ${category === '' ? 'bg-brand text-white' : 'bg-gray-100 text-gray-800'}`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-full text-sm ${category === cat ? 'bg-brand text-white' : 'bg-gray-100 text-gray-800'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
