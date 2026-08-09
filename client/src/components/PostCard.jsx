// src/components/PostCard.jsx
import React from 'react';

export default function PostCard({ post }) {
  const { title, excerpt, thumbnail, slug, category, date } = post;
  return (
    <article className="bg-white rounded-md shadow-card hover:shadow-cardHover transition-all">
      {thumbnail && (
        <img src={thumbnail} alt={title} className="w-full h-48 object-cover rounded-t-md" loading="lazy" />
      )}
      <div className="p-4">
        {category && (
          <span className="inline-block bg-brand/10 text-brand text-xs px-2 py-0.5 rounded">
            {category}
          </span>
        )}
        <p className="text-sm text-gray-500 mt-1">{new Date(date).toLocaleDateString()}</p>
        <h3 className="mt-2 text-lg font-semibold text-brand-dark line-clamp-2">{title}</h3>
        <p className="mt-1 text-sm text-gray-700 line-clamp-3">{excerpt}</p>
        {slug && (
          <a href={`/resources/${slug}`} className="mt-3 inline-block text-brand hover:underline">
            Read more →
          </a>
        )}
      </div>
    </article>
  );
}
