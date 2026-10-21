import React from 'react';
import { Article } from '../data/articles';
import { EditorialArt } from './EditorialArt';
import { ArrowUpRight, Bookmark, Clock } from 'lucide-react';

interface FeaturedHeroProps {
  article: Article;
  onSelectArticle: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const FeaturedHero: React.FC<FeaturedHeroProps> = ({
  article,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <section id="featured-hero" className="border-b border-stone-200 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Editorial Section Kicker */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-8">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-stone-500 uppercase">
            <span>VOL. IV · DISPATCH 10</span>
            <span aria-hidden="true">/</span>
            <span>LEAD ANALYSIS</span>
          </div>
          <span className="text-xs font-mono text-stone-600">Updated Bi-Weekly</span>
        </div>

        {/* 2-Column Balanced Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Headline, Summary & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Zero-Pill Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs font-medium text-stone-700 tracking-wide uppercase mb-3">
                <span className="text-blue-900 font-semibold">{article.category}</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>{article.publishedAt}</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-stone-600" />
                  {article.readingTime}
                </span>
              </div>

              {/* Title with Balanced Wrap */}
              <h1
                onClick={() => onSelectArticle(article)}
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-stone-900 leading-[1.15] cursor-pointer hover:text-stone-700 transition-colors max-w-2xl"
                style={{ textWrap: 'balance' }}
              >
                {article.title}
              </h1>

              {/* Subtitle / Deck */}
              <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl font-sans">
                {article.subtitle}
              </p>

              {/* Author Attribution */}
              <div className="mt-6 flex items-center gap-3 pt-6 border-t border-stone-200/80">
                <div className="w-9 h-9 rounded-full bg-stone-900 text-stone-100 flex items-center justify-center font-serif text-xs font-medium">
                  {article.author.avatarInitials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-stone-900">
                    {article.author.name}
                  </div>
                  <div className="text-xs text-stone-500">
                    {article.author.role}
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-6 border-t border-stone-200/80 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onSelectArticle(article)}
                className="px-6 py-3 bg-stone-900 text-stone-50 text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors inline-flex items-center gap-2 shadow-sm cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Read Full Analysis</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onToggleBookmark(article.id)}
                className={`px-4 py-3 border text-sm font-medium rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 ${
                  isBookmarked
                    ? 'border-stone-900 bg-stone-100 text-stone-900'
                    : 'border-stone-300 text-stone-700 hover:border-stone-400 bg-transparent'
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 ${isBookmarked ? 'fill-stone-900' : ''}`}
                />
                <span>{isBookmarked ? 'Saved to Reading List' : 'Save for Later'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Artwork (5 cols) */}
          <div
            onClick={() => onSelectArticle(article)}
            className="lg:col-span-5 flex flex-col justify-center cursor-pointer group"
          >
            <div className="rounded-xl overflow-hidden border border-stone-200 shadow-sm group-hover:shadow-md transition-shadow">
              <EditorialArt
                pattern={article.artPattern}
                category={article.category}
                aspect="4:3"
                className="transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </div>
            <div className="mt-2.5 flex items-center justify-between text-xs text-stone-500 font-mono">
              <span>FIG. 01 — KNOWLEDGE GRAPH CITATION TOPOLOGY</span>
              <span className="group-hover:text-stone-900 transition-colors">Explore →</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
