// client/src/components/PostGrid.jsx
import React from 'react';
import PostCard from './PostCard.jsx';
import { SearchX } from 'lucide-react';
import './PostGrid.css';

export default function PostGrid({ posts = [] }) {
  if (!posts || posts.length === 0) {
    return (
      <section className="hts-grid-section">
        <div className="container">
          <div className="hts-empty-state">
            <div className="hts-empty-icon-wrap">
              <SearchX size={36} className="hts-empty-icon" />
            </div>
            <h3 className="hts-empty-title">No Articles Found</h3>
            <p className="hts-empty-desc">
              We couldn't find any resources matching your criteria. Try adjusting your search term or selected category.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hts-grid-section">
      <div className="container">
        <div className="hts-posts-grid">
          {posts.map((post) => (
            <PostCard key={post.id || post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
