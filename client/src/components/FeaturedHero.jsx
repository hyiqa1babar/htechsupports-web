// src/components/FeaturedHero.jsx
import React from 'react';

export default function FeaturedHero({ article }) {
  const { title, excerpt, image } = article || {};
  return (
    <section className="featured-hero bg-brand-dark text-white py-12">
      <div className="container flex flex-col md:flex-row items-center">
        {image && (
          <img src={image} alt={title} className="w-full md:w-1/2 rounded-md" loading="lazy" />
        )}
        <div className="md:ml-8 mt-6 md:mt-0">
          <h1 className="text-4xl font-bold">{title || 'Featured Article'}</h1>
          <p className="mt-4 text-lg">{excerpt || 'Explore our latest insights and case studies.'}</p>
          {article && article.slug && (
            <a href={`/resources/${article.slug}`} className="inline-block mt-4 bg-brand hover:bg-hover text-white font-medium py-2 px-4 rounded">
              Read More →
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
