// src/components/PostGrid.jsx
import React from 'react';
import PostCard from './PostCard.jsx';

export default function PostGrid({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <section className="container py-12 text-center text-gray-500">
        <p>No resources found.</p>
      </section>
    );
  }

  return (
    <section className="container py-12">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
