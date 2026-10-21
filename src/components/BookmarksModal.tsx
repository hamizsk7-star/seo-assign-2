import React from 'react';
import { Article } from '../data/articles';
import { X, Bookmark, ArrowRight, Trash2 } from 'lucide-react';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  bookmarkedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/60">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-stone-900" />
            <h3 className="font-serif font-bold text-stone-900 text-lg">
              Saved Reading List ({bookmarkedArticles.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {bookmarkedArticles.length === 0 ? (
            <div className="text-center py-12">
              <Bookmark className="w-8 h-8 text-stone-300 mx-auto mb-3" />
              <p className="font-serif text-base text-stone-800">
                Your reading list is currently empty.
              </p>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto font-sans">
                Click the bookmark icon on any dispatch card or article to save it for offline or later reading.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {bookmarkedArticles.map((article) => (
                <div
                  key={article.id}
                  className="p-4 rounded-xl border border-stone-200 hover:border-stone-400 transition-colors bg-white flex items-start justify-between gap-3 group"
                >
                  <div
                    onClick={() => {
                      onSelectArticle(article);
                      onClose();
                    }}
                    className="cursor-pointer flex-1"
                  >
                    <div className="text-[11px] font-mono text-stone-500 uppercase">
                      {article.category} · {article.readingTime}
                    </div>
                    <h4 className="text-sm font-serif font-bold text-stone-900 group-hover:text-stone-700 transition-colors mt-0.5 line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-xs text-stone-500 mt-1 font-sans">
                      By {article.author.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onRemoveBookmark(article.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                      title="Remove from list"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {bookmarkedArticles.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-stone-500 hover:text-stone-800 font-medium"
            >
              Clear Reading List
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
