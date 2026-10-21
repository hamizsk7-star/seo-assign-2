/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ARTICLES, Article, CATEGORIES } from './data/articles';
import { Navbar } from './components/Navbar';
import { FeaturedHero } from './components/FeaturedHero';
import { ArticleCard } from './components/ArticleCard';
import { CategoryFilter } from './components/CategoryFilter';
import { ArticleView } from './components/ArticleView';
import { BookmarksModal } from './components/BookmarksModal';
import { NewsletterModal } from './components/NewsletterModal';
import { AboutModal } from './components/AboutModal';
import { Footer } from './components/Footer';
import { BookOpen, Sparkles, Filter, Compass, ArrowDown, Check } from 'lucide-react';

export default function App() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('synthetica_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  const articlesSectionRef = useRef<HTMLDivElement>(null);

  // Sync bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('synthetica_bookmarks', JSON.stringify(bookmarks));
    } catch {
      // ignore in sandboxed environments
    }
  }, [bookmarks]);

  // Handle URL hash routing for direct article deep links and back/forward browser history
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#article/')) {
        const slug = hash.replace('#article/', '');
        const found = ARTICLES.find((a) => a.slug === slug || a.id === slug);
        if (found) {
          setSelectedArticle(found);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      } else if (!hash || hash === '#') {
        setSelectedArticle(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    window.location.hash = `article/${article.slug}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToHome = () => {
    setSelectedArticle(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmark = (articleId: string) => {
    setBookmarks((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId]
    );
  };

  const handleClearBookmarks = () => {
    setBookmarks([]);
  };

  const scrollToArticles = () => {
    articlesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFeatured = () => {
    const el = document.getElementById('featured-hero');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter articles based on Category and Search Query
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        article.title.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.subtitle.toLowerCase().includes(q) ||
        article.author.name.toLowerCase().includes(q) ||
        article.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Featured article (first featured article or first in list)
  const featuredArticle = useMemo(() => {
    return ARTICLES.find((a) => a.featured) || ARTICLES[0];
  }, []);

  const bookmarkedArticleObjects = useMemo(() => {
    return ARTICLES.filter((a) => bookmarks.includes(a.id));
  }, [bookmarks]);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-stone-900 font-sans selection:bg-stone-800 selection:text-white">
      {/* Top Bar Navigation Contract */}
      <Navbar
        onNavigateHome={handleBackToHome}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleBackToHome();
          setTimeout(scrollToArticles, 100);
        }}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onScrollToArticles={scrollToArticles}
        onScrollToFeatured={scrollToFeatured}
        bookmarkCount={bookmarks.length}
      />

      {/* Conditionally render Dedicated Article View OR Homepage */}
      {selectedArticle ? (
        <ArticleView
          article={selectedArticle}
          allArticles={ARTICLES}
          onBack={handleBackToHome}
          onSelectArticle={handleSelectArticle}
          isBookmarked={bookmarks.includes(selectedArticle.id)}
          onToggleBookmark={handleToggleBookmark}
        />
      ) : (
        <main className="flex-1">
          {/* Masthead Headline Ribbon */}
          <div className="border-b border-stone-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
              <div className="inline-block text-xs font-mono tracking-widest text-stone-700 uppercase mb-3">
                FOUNDATIONAL RESEARCH & DISPATCHES · AUTUMN 2026
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight max-w-4xl mx-auto leading-[1.12]">
                The Journal of AI Systems in Digital Marketing
              </h1>
              <p className="mt-4 text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed font-sans">
                Synthetica examines the structural transition from manual marketing guesswork to deterministic, generative, and econometric intelligence across 10 in-depth editorial dispatches.
              </p>
              
              {/* Metric bar */}
              <div className="mt-8 pt-6 border-t border-stone-100 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-mono text-stone-500">
                <div>
                  <span className="font-bold text-stone-900 tabular-nums">10</span> IN-DEPTH DISPATCHES
                </div>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <div>
                  <span className="font-bold text-stone-900 tabular-nums">100%</span> PEER-REVIEWED
                </div>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <div>
                  <span className="font-bold text-stone-900 tabular-nums">42,000+</span> PRACTITIONERS
                </div>
              </div>
            </div>
          </div>

          {/* Marquee Featured Article Section */}
          <FeaturedHero
            article={featuredArticle}
            onSelectArticle={handleSelectArticle}
            isBookmarked={bookmarks.includes(featuredArticle.id)}
            onToggleBookmark={handleToggleBookmark}
          />

          {/* Articles Catalog Section */}
          <div ref={articlesSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header & Controls */}
            <div className="mb-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-stone-600 uppercase tracking-widest">
                    THE COMPLETE COMPENDIUM
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
                    All 10 Editorial Articles
                  </h2>
                </div>
              </div>

              {/* Segmented Filter & Search */}
              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                resultCount={filteredArticles.length}
              />
            </div>

            {/* Articles Grid (Responsive 3-column layout) */}
            {filteredArticles.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-xl border border-stone-200 mt-6">
                <Filter className="w-8 h-8 text-stone-400 mx-auto mb-3" />
                <h3 className="text-lg font-serif font-bold text-stone-800">
                  No Dispatches Found
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-sm mx-auto font-sans">
                  No articles matched your filter criteria for "{searchQuery || selectedCategory}".
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 items-stretch">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onSelect={handleSelectArticle}
                    isBookmarked={bookmarks.includes(article.id)}
                    onToggleBookmark={handleToggleBookmark}
                  />
                ))}
              </div>
            )}

            {/* Editorial Manifesto / Four Pillars Section */}
            <section className="mt-20 p-8 sm:p-12 bg-white border border-stone-200 rounded-2xl shadow-xs">
              <div className="max-w-3xl">
                <div className="text-xs font-mono text-stone-600 uppercase tracking-widest mb-2">
                  THE FOUNDATIONAL HYPOTHESIS
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-snug">
                  Why Modern Growth Demands Algorithmic Discipline
                </h3>
                <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
                  The first generation of digital marketing was characterized by intuition and manual labor: writing ad copy variations by hand, adjusting CPC bids on spreadsheets, and guessing at customer segments. The next decade belongs to integrated cybernetic systems where creative velocity, causal econometrics, and generative retrieval operate in closed feedback loops.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-8 border-t border-stone-100">
                <div>
                  <div className="font-mono text-xs font-bold text-stone-900 mb-1">
                    01. AEO &gt; SEO
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Optimizing for citation authority within neural answer engines rather than ten blue links.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-xs font-bold text-stone-900 mb-1">
                    02. Multi-Agent Ops
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Automated capital deployment governed by programmatic circuit breakers and first-party margin data.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-xs font-bold text-stone-900 mb-1">
                    03. Modular Supply
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Programmatic design tokens and brand-trained adapters replacing static ad shoots.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-xs font-bold text-stone-900 mb-1">
                    04. Causal Truth
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Bayesian MMM and randomized geo-holdout experiments replacing phantom pixel tracking.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      )}

      {/* Global Modals */}
      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedArticles={bookmarkedArticleObjects}
        onSelectArticle={handleSelectArticle}
        onRemoveBookmark={handleToggleBookmark}
        onClearAll={handleClearBookmarks}
      />

      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Quiet Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleBackToHome();
          setTimeout(scrollToArticles, 100);
        }}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onNavigateHome={handleBackToHome}
      />
    </div>
  );
}
