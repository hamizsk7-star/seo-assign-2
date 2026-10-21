import React from 'react';
import { X, Award, ShieldCheck, Compass, FileCheck } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50/60">
          <div>
            <div className="text-xs font-mono text-stone-500 uppercase tracking-widest">
              INSTITUTIONAL CHARTER
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-xl mt-0.5">
              Synthetica Review
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 font-sans text-stone-700 text-sm leading-relaxed">
          <div>
            <h4 className="font-serif font-bold text-base text-stone-900 mb-2">
              Our Editorial Charter
            </h4>
            <p>
              Synthetica is an independent analytical publication dedicated to examining the intersection of artificial intelligence, computational linguistics, algorithmic media buying, and enterprise marketing systems.
            </p>
            <p className="mt-2 text-stone-600">
              Unlike traditional industry blogs dominated by sponsored vendor listicles and recycled PR announcements, Synthetica publishes long-form research, empirical case studies, and architectural frameworks authored by active practitioners.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2 border-y border-stone-200">
            <div className="p-3 bg-stone-50 rounded-lg">
              <Award className="w-4 h-4 text-stone-900 mb-1" />
              <div className="font-serif font-bold text-stone-900 text-xs">Empirical Rigor</div>
              <div className="text-[11px] text-stone-500 mt-1">Every claim is grounded in live production telemetry or econometric tests.</div>
            </div>
            <div className="p-3 bg-stone-50 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-stone-900 mb-1" />
              <div className="font-serif font-bold text-stone-900 text-xs">Zero Vendor Bias</div>
              <div className="text-[11px] text-stone-500 mt-1">We do not accept paid tool endorsements or affiliate link placement.</div>
            </div>
            <div className="p-3 bg-stone-50 rounded-lg">
              <Compass className="w-4 h-4 text-stone-900 mb-1" />
              <div className="font-serif font-bold text-stone-900 text-xs">Strategic Depth</div>
              <div className="text-[11px] text-stone-500 mt-1">Written for decision-makers who manage real budgets and technical teams.</div>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-base text-stone-900 mb-2">
              Review Board & Contributors
            </h4>
            <p className="text-stone-600 text-xs sm:text-sm">
              Our 10 dispatches are authored by leading specialists across algorithmic media buying, statistical survival modeling, retrieval-augmented search architecture, and responsible AI governance.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <span className="text-xs font-mono text-stone-400">ESTABLISHED 2026</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
