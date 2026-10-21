import React from 'react';
import { Article } from '../data/articles';
import { EditorialArt } from './EditorialArt';
import { Bookmark, Clock, ArrowRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <article className="group flex flex-col justify-between h-full bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-stone-400 transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      {/* Top Artwork Container */}
      <div
        onClick={() => onSelect(article)}
        className="cursor-pointer overflow-hidden border-b border-stone-100"
      >
        <EditorialArt
          pattern={article.artPattern}
          category={article.category}
          aspect="4:3"
          className="transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      {/* Content Container */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Zero-Pill Unboxed Metadata Line */}
          <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-2.5">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-stone-900 font-semibold uppercase tracking-wider text-[11px]">
                {article.category}
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="flex items-center gap-1 text-stone-500">
                <Clock className="w-3 h-3" />
                {article.readingTime}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(article.id);
              }}
              className="p-1 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
              title={isBookmarked ? 'Remove bookmark' : 'Save article'}
            >
              <Bookmark
                className={`w-4 h-4 ${isBookmarked ? 'fill-stone-900 text-stone-900' : ''}`}
              />
            </button>
          </div>

          {/* Title in Serif font */}
          <h2
            onClick={() => onSelect(article)}
            className="text-xl font-serif font-bold text-stone-900 leading-snug cursor-pointer group-hover:text-stone-700 transition-colors line-clamp-2"
          >
            {article.title}
          </h2>

          {/* Excerpt / Summary */}
          <p className="mt-2.5 text-sm text-stone-600 leading-relaxed line-clamp-3 font-sans">
            {article.summary}
          </p>
        </div>

        {/* Footer / Attribution & Read Action */}
        <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-stone-100 border border-stone-200 text-stone-800 flex items-center justify-center font-serif text-xs font-semibold">
              {article.author.avatarInitials}
            </div>
            <div className="truncate">
              <div className="text-xs font-medium text-stone-900 truncate">
                {article.author.name}
              </div>
              <div className="text-[11px] text-stone-600 truncate">
                {article.publishedAt}
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelect(article)}
            className="text-xs font-semibold text-stone-900 hover:text-stone-600 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer"
          >
            <span>Read</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
