import React from 'react';
import { Bookmark, Search } from 'lucide-react';

interface NavbarProps {
  onNavigateHome: () => void;
  onSelectCategory: (cat: string) => void;
  onOpenNewsletter: () => void;
  onOpenAbout: () => void;
  onOpenBookmarks: () => void;
  onScrollToArticles: () => void;
  onScrollToFeatured: () => void;
  bookmarkCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateHome,
  onOpenNewsletter,
  onOpenAbout,
  onOpenBookmarks,
  onScrollToArticles,
  onScrollToFeatured,
  bookmarkCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#faf9f6]/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={onNavigateHome}
          className="text-xl font-serif font-bold tracking-tight text-stone-900 hover:text-stone-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
        >
          <span>SYNTHETICA</span>
          <span className="font-sans font-light text-xs tracking-widest text-stone-600 uppercase">
            / REVIEW
          </span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <button
            onClick={() => {
              onNavigateHome();
              setTimeout(onScrollToArticles, 50);
            }}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            All Articles
          </button>
          <button
            onClick={() => {
              onNavigateHome();
              setTimeout(onScrollToFeatured, 50);
            }}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            Lead Analysis
          </button>
          <button
            onClick={onOpenAbout}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            Editorial Board
          </button>
          <button
            onClick={onOpenBookmarks}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 flex items-center gap-1.5"
          >
            <Bookmark className="w-3.5 h-3.5 text-stone-500" />
            <span>Reading List</span>
            {bookmarkCount > 0 && (
              <span className="text-xs font-mono font-semibold text-stone-900">
                ({bookmarkCount})
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenBookmarks}
            className="md:hidden p-2 text-stone-600 hover:text-stone-900 relative"
            aria-label="Reading list"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarkCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-stone-900 rounded-full" />
            )}
          </button>
          <button
            onClick={onOpenNewsletter}
            className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
          >
            Subscribe to Dispatch
          </button>
        </div>
      </div>
    </header>
  );
};
