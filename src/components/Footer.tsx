import React from 'react';
import { CATEGORIES } from '../data/articles';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenNewsletter: () => void;
  onOpenAbout: () => void;
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenNewsletter,
  onOpenAbout,
  onNavigateHome,
}) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={onNavigateHome}
              className="text-2xl font-serif font-bold text-white tracking-tight flex items-center gap-2 cursor-pointer"
            >
              <span>SYNTHETICA</span>
              <span className="text-xs font-mono font-light tracking-widest text-stone-400">
                / REVIEW
              </span>
            </button>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed font-sans">
              An authoritative digital journal analyzing the intersection of artificial intelligence, search architecture, autonomous ad operations, and predictive marketing economics.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenNewsletter}
                className="px-4 py-2 bg-stone-100 text-stone-900 text-xs font-semibold rounded-lg hover:bg-white transition-colors cursor-pointer"
              >
                Join Executive Dispatch
              </button>
            </div>
          </div>

          {/* Quick Categories Navigation */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-stone-400">
              Curated Research Areas
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              {CATEGORIES.filter((c) => c !== 'All').slice(0, 5).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => onSelectCategory(cat)}
                    className="text-stone-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Editorial & Standards */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-stone-400">
              Publication
            </h4>
            <ul className="space-y-2 text-xs font-sans text-stone-300">
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Editorial Board & Charter
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenNewsletter}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Newsletter Archive
                </button>
              </li>
              <li>
                <span className="text-stone-400">ISSN 2831-904X (Digital)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom quiet legal strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-400">
          <div>
            © {new Date().getFullYear()} Synthetica Review. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Peer-Reviewed Analysis</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Party Data Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
