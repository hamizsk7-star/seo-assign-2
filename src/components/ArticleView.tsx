import React, { useState, useEffect } from 'react';
import { Article } from '../data/articles';
import { EditorialArt } from './EditorialArt';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Clock,
  Check,
  MessageSquare,
  Sparkles,
  Send,
  Type,
  ChevronRight,
} from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  role: string;
  text: string;
  timestamp: string;
}

interface ArticleViewProps {
  article: Article;
  allArticles: Article[];
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  allArticles,
  onBack,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  // Initial comments tailored to this article topic
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c1',
      author: 'David Sterling',
      role: 'Growth Marketing Director, SaaS Velocity',
      text: 'This captures the exact architectural shift we have observed over the past quarter. Relying strictly on platform automation without our own telemetry guardrails was costing us nearly 18% in attribution slippage.',
      timestamp: '2 days ago',
    },
    {
      id: 'c2',
      author: 'Maya Lin',
      role: 'Senior Strategist, Brand & Algorithm Lab',
      text: 'The distinction between keyword density and concept topology in Section 03 is crucial. We have begun re-structuring our knowledge base around verifiable entity definitions and have already seen noticeable citation lift.',
      timestamp: 'Yesterday',
    },
  ]);

  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentRole, setNewCommentRole] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  // Scroll progress listener
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      // Track active section for table of contents
      for (const section of article.sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSectionId(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !newCommentName.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: newCommentName.trim(),
      role: newCommentRole.trim() || 'Marketing Practitioner',
      text: newCommentText.trim(),
      timestamp: 'Just now',
    };

    setComments((prev) => [newComment, ...prev]);
    setNewCommentName('');
    setNewCommentRole('');
    setNewCommentText('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 4000);
  };

  // Find 2 related articles
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  // Font size classes
  const bodyTextClass =
    fontSize === 'xlarge'
      ? 'text-xl leading-[2.1]'
      : fontSize === 'large'
      ? 'text-lg leading-[1.95]'
      : 'text-base leading-[1.85]';

  return (
    <article className="min-h-screen bg-[#faf9f6] text-stone-900 pb-24">
      {/* Scroll Progress Bar at very top */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-stone-200 z-50">
        <div
          className="h-full bg-stone-900 transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sticky Reader Utility Bar */}
      <div className="sticky top-16 z-30 bg-[#faf9f6]/90 backdrop-blur-md border-b border-stone-200/80 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dispatches</span>
          </button>

          {/* Controls: Font size, Bookmark, Share */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Font size toggle */}
            <div className="flex items-center border border-stone-200 rounded-md bg-white p-0.5 text-xs">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                  fontSize === 'normal' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Normal text size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded transition-colors text-sm font-semibold cursor-pointer ${
                  fontSize === 'large' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Comfortable text size"
              >
                A+
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-1.5 border rounded-md transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium ${
                isBookmarked
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
              }`}
              title={isBookmarked ? 'Saved in reading list' : 'Save article'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-white' : ''}`} />
              <span className="hidden sm:inline">
                {isBookmarked ? 'Saved' : 'Save'}
              </span>
            </button>

            {/* Share / Copy button */}
            <button
              onClick={handleShare}
              className="p-1.5 border border-stone-200 bg-white rounded-md hover:border-stone-300 text-stone-700 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
              title="Copy link to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Article Header Container */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-8 text-center sm:text-left">
        {/* Breadcrumb line */}
        <div className="flex items-center gap-2 text-xs font-mono text-stone-500 mb-4 justify-center sm:justify-start">
          <button onClick={onBack} className="hover:underline">
            HOME
          </button>
          <span aria-hidden="true">/</span>
          <span className="text-stone-700 uppercase font-semibold">
            {article.category}
          </span>
          <span aria-hidden="true">/</span>
          <span>DISPATCH</span>
        </div>

        {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
        <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-medium text-stone-500 tracking-wide uppercase mb-4">
          <span className="font-semibold text-stone-900">{article.kicker}</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>{article.publishedAt}</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-stone-600" />
            {article.readingTime}
          </span>
        </div>

        {/* Display Headline */}
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-stone-900 leading-[1.16]"
          style={{ textWrap: 'balance' }}
        >
          {article.title}
        </h1>

        {/* Subtitle / Deck */}
        <p className="mt-5 text-lg sm:text-xl text-stone-600 leading-relaxed font-sans max-w-3xl">
          {article.subtitle}
        </p>

        {/* Author Byline */}
        <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 justify-center sm:justify-start">
            <div className="w-11 h-11 rounded-full bg-stone-900 text-stone-100 flex items-center justify-center font-serif text-sm font-semibold">
              {article.author.avatarInitials}
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-stone-900">
                {article.author.name}
              </div>
              <div className="text-xs text-stone-500">
                {article.author.role}
              </div>
            </div>
          </div>
          <div className="text-xs font-mono text-stone-600 text-center sm:text-right">
            PEER-REVIEWED EDITORIAL DISPATCH
          </div>
        </div>
      </header>

      {/* Marquee Graphic Asset for this Article */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
        <div className="rounded-xl overflow-hidden border border-stone-200 shadow-sm">
          <EditorialArt
            pattern={article.artPattern}
            category={article.category}
            aspect="wide"
          />
        </div>
        <p className="mt-2.5 text-xs font-serif text-stone-500 italic text-center">
          Fig. 1 — Conceptual mapping of algorithmic state flows and empirical feedback loops in modern digital growth systems.
        </p>
      </div>

      {/* Main Two-Column Reading Canvas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Reading Column (8 cols, max-w-prose centered) */}
          <main className="lg:col-span-8 flex flex-col items-center">
            <div className={`w-full max-w-[68ch] font-sans text-stone-800 ${bodyTextClass}`}>
              
              {/* Key Takeaway Callout Box (Subtle hairline, no thick left accent border) */}
              <div className="mb-10 p-6 bg-stone-100/70 border border-stone-200 rounded-xl">
                <div className="flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-widest mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-stone-700" />
                  <span>Executive Thesis</span>
                </div>
                <p className="font-serif italic text-lg sm:text-xl text-stone-900 leading-snug">
                  "{article.keyTakeaway}"
                </p>
              </div>

              {/* Loop through each section */}
              {article.sections.map((section, idx) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="mb-14 scroll-mt-28"
                >
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-stone-900 mb-6 pb-2 border-b border-stone-200">
                    {section.title}
                  </h2>

                  {/* Paragraphs with Drop Cap on the very first paragraph */}
                  {section.paragraphs.map((para, pIdx) => (
                    <p
                      key={pIdx}
                      className={`mb-6 text-stone-700 ${
                        idx === 0 && pIdx === 0
                          ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-stone-900'
                          : ''
                      }`}
                    >
                      {para}
                    </p>
                  ))}

                  {/* Wide Pull Quote with clean top/bottom hairline borders (No thick left border!) */}
                  {section.quote && (
                    <div className="my-10 py-6 border-y border-stone-200 text-center px-4 sm:px-8">
                      <blockquote className="text-xl sm:text-2xl font-serif italic font-normal text-stone-900 leading-relaxed">
                        "{section.quote.text}"
                      </blockquote>
                      <cite className="mt-3 block text-xs font-mono text-stone-500 uppercase tracking-wider not-italic">
                        — {section.quote.source}
                      </cite>
                    </div>
                  )}

                  {/* Framework Checklist Box */}
                  {section.frameworkBox && (
                    <div className="my-10 p-6 bg-white border border-stone-200 rounded-xl shadow-xs">
                      <h3 className="text-base font-bold font-serif text-stone-900 mb-4 pb-2 border-b border-stone-100 flex items-center justify-between">
                        <span>{section.frameworkBox.title}</span>
                        <span className="text-xs font-mono text-stone-400">FRAMEWORK</span>
                      </h3>
                      <div className="space-y-4">
                        {section.frameworkBox.points.map((pt, ptIdx) => (
                          <div key={ptIdx} className="flex items-start gap-3">
                            <span className="font-mono text-xs font-bold text-stone-700 mt-1 shrink-0">
                              0{ptIdx + 1}.
                            </span>
                            <div>
                              <strong className="block text-sm font-semibold text-stone-900">
                                {pt.label}
                              </strong>
                              <p className="mt-0.5 text-xs sm:text-sm text-stone-600 leading-relaxed">
                                {pt.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Data Comparison Table with Tabular Numerals */}
                  {section.table && (
                    <div className="my-10 overflow-x-auto border border-stone-200 rounded-xl bg-white shadow-xs">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-stone-50 border-b border-stone-200 text-stone-900 font-semibold font-serif">
                            {section.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="py-3 px-4">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 font-sans">
                          {section.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-stone-50/60 transition-colors">
                              {row.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  className={`py-3 px-4 text-stone-700 leading-relaxed ${
                                    cIdx === 0 ? 'font-semibold text-stone-900' : ''
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              ))}

              {/* Dedicated Strategic Conclusion */}
              <section className="mt-12 pt-8 border-t border-stone-300">
                <div className="text-xs font-mono text-stone-400 uppercase tracking-widest mb-3">
                  SYNTHESIS & ROADMAP
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-4">
                  Strategic Conclusion
                </h2>
                <p className="text-stone-700 leading-relaxed font-sans">
                  {article.conclusion}
                </p>
              </section>

              {/* Tags / Topics (Zero-Pill unboxed tags) */}
              <div className="mt-10 pt-6 border-t border-stone-200 flex flex-wrap items-center gap-3 text-xs font-mono text-stone-500">
                <span className="font-semibold text-stone-900 uppercase">Filed Under:</span>
                {article.tags.map((tag, tIdx) => (
                  <React.Fragment key={tag}>
                    <span className="hover:text-stone-900 transition-colors cursor-pointer">
                      #{tag}
                    </span>
                    {tIdx < article.tags.length - 1 && <span aria-hidden="true">/</span>}
                  </React.Fragment>
                ))}
              </div>

              {/* Community Commentary Section */}
              <section className="mt-16 pt-10 border-t border-stone-200">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-stone-800" />
                    <h3 className="text-xl font-serif font-bold text-stone-900">
                      Practitioner Dialogue ({comments.length})
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-stone-400">MODERATED DISCUSSIONS</span>
                </div>

                {/* Comment Submission Form */}
                <form
                  onSubmit={handleAddComment}
                  className="mb-10 p-6 bg-white border border-stone-200 rounded-xl"
                >
                  <h4 className="text-sm font-semibold text-stone-900 mb-3 font-serif">
                    Contribute an Empirical Perspective
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={newCommentName}
                      onChange={(e) => setNewCommentName(e.target.value)}
                      className="px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-md text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-800"
                    />
                    <input
                      type="text"
                      placeholder="Title & Organization (e.g., VP of Growth at Acme)"
                      value={newCommentRole}
                      onChange={(e) => setNewCommentRole(e.target.value)}
                      className="px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-md text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-800"
                    />
                  </div>
                  <textarea
                    required
                    rows={3}
                    placeholder="Share observations, data points, or counter-arguments..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-md text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-800 mb-3"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-stone-400 font-sans">
                      Peer-to-peer discourse for growth leaders.
                    </span>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-md hover:bg-stone-800 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Post Reflection</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                  {commentSubmitted && (
                    <div className="mt-3 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 p-2 rounded">
                      Thank you. Your contribution has been published to the thread.
                    </div>
                  )}
                </form>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((c) => (
                    <div
                      key={c.id}
                      className="p-5 bg-white border border-stone-200 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-xs font-bold text-stone-900">
                            {c.author}
                          </span>
                          <span className="text-xs text-stone-500 ml-2">
                            {c.role}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-stone-400">
                          {c.timestamp}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                        {c.text}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </main>

          {/* Sticky Asymmetric Right Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-32 space-y-6">
              
              {/* Interactive Table of Contents */}
              <div className="p-6 bg-white border border-stone-200 rounded-xl">
                <div className="text-xs font-mono text-stone-400 uppercase tracking-widest mb-3">
                  INDEX OF CHAPTERS
                </div>
                <nav className="space-y-2">
                  {article.sections.map((sec, sIdx) => {
                    const isActive = activeSectionId === sec.id;
                    return (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(sec.id);
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className={`block text-xs py-1.5 transition-colors leading-snug cursor-pointer ${
                          isActive
                            ? 'font-bold text-stone-900 pl-2 border-l-2 border-stone-900'
                            : 'text-stone-600 hover:text-stone-900 pl-2'
                        }`}
                      >
                        {sec.title}
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Author Bio Card */}
              <div className="p-6 bg-white border border-stone-200 rounded-xl">
                <div className="text-xs font-mono text-stone-400 uppercase tracking-widest mb-3">
                  ABOUT THE CONTRIBUTOR
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-stone-900 text-stone-50 flex items-center justify-center font-serif text-sm font-semibold">
                    {article.author.avatarInitials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">
                      {article.author.name}
                    </h4>
                    <p className="text-xs text-stone-500">
                      {article.author.role}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {article.author.bio}
                </p>
              </div>

              {/* Quick Reading Stats */}
              <div className="p-5 bg-stone-100/70 border border-stone-200 rounded-xl font-mono text-xs text-stone-600 space-y-2">
                <div className="flex justify-between">
                  <span>ESTIMATED TIME:</span>
                  <span className="text-stone-900 font-semibold">{article.readingTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>DISPATCH NO:</span>
                  <span className="text-stone-900 font-semibold">{article.id.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>STATUS:</span>
                  <span className="text-stone-900 font-semibold">PUBLISHED</span>
                </div>
              </div>

            </div>
          </aside>
        </div>
      </div>

      {/* Related Dispatches Footer Ribbon */}
      <footer className="mt-20 border-t border-stone-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-100">
            <div>
              <div className="text-xs font-mono text-stone-400 uppercase tracking-widest">
                CONTINUE READING
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mt-1">
                Related Dispatches in Strategy & AI
              </h3>
            </div>
            <button
              onClick={onBack}
              className="text-xs font-semibold text-stone-700 hover:text-stone-900 flex items-center gap-1"
            >
              <span>View All 10 Articles</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectArticle(rel)}
                className="group p-6 bg-[#faf9f6] border border-stone-200 rounded-xl hover:border-stone-400 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-stone-500 uppercase mb-2">
                    {rel.category} · {rel.readingTime}
                  </div>
                  <h4 className="text-lg font-serif font-bold text-stone-900 group-hover:text-stone-700 transition-colors">
                    {rel.title}
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-stone-600 line-clamp-2">
                    {rel.summary}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs font-medium text-stone-900 pt-3 border-t border-stone-200/60">
                  <span>By {rel.author.name}</span>
                  <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read Dispatch →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </article>
  );
};
