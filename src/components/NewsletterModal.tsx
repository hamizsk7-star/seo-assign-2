import React, { useState } from 'react';
import { X, CheckCircle, Mail } from 'lucide-react';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [cadence, setCadence] = useState<'weekly' | 'monthly'>('weekly');
  const [isSubscribed, setIsSubscribed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
  };

  const handleResetAndClose = () => {
    setIsSubscribed(false);
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-7">
          {isSubscribed ? (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-serif font-bold text-2xl text-stone-900">
                Subscription Confirmed
              </h3>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed font-sans">
                You have been enrolled into the{' '}
                <span className="font-semibold text-stone-900">Synthetica Editorial Dispatch</span>.
                A confirmation briefing has been queued for{' '}
                <span className="font-mono text-stone-800">{email}</span>.
              </p>
              <button
                onClick={handleResetAndClose}
                className="mt-6 w-full py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors"
              >
                Return to Reading
              </button>
            </div>
          ) : (
            <div>
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-900 mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-stone-400 uppercase tracking-widest mb-1">
                EXECUTIVE BRIEFINGS
              </div>
              <h3 className="font-serif font-bold text-2xl text-stone-900">
                Subscribe to Synthetica
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                Join 42,000+ growth executives, search strategists, and performance architects.
                Curated research on AI systems in modern marketing. Zero promotional fluff.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-stone-600 mb-1.5">
                    Corporate Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@enterprise.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-stone-600 mb-1.5">
                    Dispatch Cadence
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCadence('weekly')}
                      className={`py-2 px-3 text-xs font-medium rounded-lg border transition-colors ${
                        cadence === 'weekly'
                          ? 'border-stone-900 bg-stone-900 text-white'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-400'
                      }`}
                    >
                      Bi-Weekly Briefing
                    </button>
                    <button
                      type="button"
                      onClick={() => setCadence('monthly')}
                      className={`py-2 px-3 text-xs font-medium rounded-lg border transition-colors ${
                        cadence === 'monthly'
                          ? 'border-stone-900 bg-stone-900 text-white'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-400'
                      }`}
                    >
                      Monthly Digest
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors shadow-sm cursor-pointer"
                >
                  Confirm Subscription
                </button>
              </form>
              <p className="mt-3 text-[11px] text-stone-400 text-center font-sans">
                Unsubscribe at any time. We respect zero-party data and privacy rights.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
