import React from 'react';

interface EditorialArtProps {
  pattern: string;
  category: string;
  className?: string;
  aspect?: '16:9' | '4:3' | 'wide';
}

export const EditorialArt: React.FC<EditorialArtProps> = ({
  pattern,
  category,
  className = '',
  aspect = '4:3',
}) => {
  const aspectClass =
    aspect === '16:9' ? 'aspect-[16/9]' : aspect === 'wide' ? 'aspect-[21/9]' : 'aspect-[4/3]';

  return (
    <div
      className={`relative w-full overflow-hidden select-none bg-stone-900 ${aspectClass} ${className}`}
    >
      {/* Background radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-stone-800 via-stone-900 to-black opacity-90" />
      
      {/* Dynamic Procedural Graphic based on pattern type */}
      {pattern === 'mesh-orbit' && (
        <svg
          className="absolute inset-0 w-full h-full text-blue-400/20"
          viewBox="0 0 600 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="300" cy="225" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="300" cy="225" r="130" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="300" cy="225" r="70" stroke="currentColor" strokeWidth="1" />
          <ellipse cx="300" cy="225" rx="240" ry="80" stroke="currentColor" strokeWidth="1" strokeDasharray="6 4" transform="rotate(-25 300 225)" />
          <ellipse cx="300" cy="225" rx="240" ry="80" stroke="currentColor" strokeWidth="1" transform="rotate(35 300 225)" />
          {/* Nodes */}
          <circle cx="300" cy="225" r="5" fill="#60a5fa" />
          <circle cx="430" cy="225" r="3.5" fill="#93c5fd" />
          <circle cx="170" cy="225" r="3.5" fill="#93c5fd" />
          <circle cx="300" cy="95" r="4" fill="#3b82f6" />
          <circle cx="300" cy="355" r="3" fill="#60a5fa" />
          <line x1="300" y1="95" x2="430" y2="225" stroke="currentColor" strokeWidth="0.75" />
          <line x1="170" y1="225" x2="300" y2="355" stroke="currentColor" strokeWidth="0.75" />
          <line x1="170" y1="225" x2="300" y2="95" stroke="currentColor" strokeWidth="0.75" />
        </svg>
      )}

      {pattern === 'algorithmic-tree' && (
        <svg
          className="absolute inset-0 w-full h-full text-emerald-400/20"
          viewBox="0 0 600 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="80" y1="360" x2="520" y2="360" stroke="currentColor" strokeWidth="1" />
          <line x1="300" y1="360" x2="300" y2="200" stroke="currentColor" strokeWidth="1.5" />
          <line x1="300" y1="200" x2="200" y2="120" stroke="currentColor" strokeWidth="1.2" />
          <line x1="300" y1="200" x2="400" y2="120" stroke="currentColor" strokeWidth="1.2" />
          <line x1="200" y1="120" x2="140" y2="60" stroke="currentColor" strokeWidth="1" />
          <line x1="200" y1="120" x2="250" y2="60" stroke="currentColor" strokeWidth="1" />
          <line x1="400" y1="120" x2="350" y2="60" stroke="currentColor" strokeWidth="1" />
          <line x1="400" y1="120" x2="470" y2="60" stroke="currentColor" strokeWidth="1" />
          {/* Signal points */}
          <circle cx="300" cy="200" r="4.5" fill="#34d399" />
          <circle cx="200" cy="120" r="4" fill="#6ee7b7" />
          <circle cx="400" cy="120" r="4" fill="#6ee7b7" />
          <circle cx="140" cy="60" r="3" fill="#a7f3d0" />
          <circle cx="250" cy="60" r="3" fill="#a7f3d0" />
          <circle cx="350" cy="60" r="3" fill="#a7f3d0" />
          <circle cx="470" cy="60" r="3" fill="#a7f3d0" />
          <rect x="270" y="340" width="60" height="40" stroke="currentColor" strokeWidth="1" fill="#064e3b" fillOpacity="0.3" />
        </svg>
      )}

      {pattern === 'modular-grid' && (
        <svg
          className="absolute inset-0 w-full h-full text-purple-400/20"
          viewBox="0 0 600 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Grid lines */}
          <line x1="100" y1="80" x2="500" y2="80" stroke="currentColor" strokeWidth="0.75" />
          <line x1="100" y1="180" x2="500" y2="180" stroke="currentColor" strokeWidth="0.75" />
          <line x1="100" y1="280" x2="500" y2="280" stroke="currentColor" strokeWidth="0.75" />
          <line x1="100" y1="380" x2="500" y2="380" stroke="currentColor" strokeWidth="0.75" />
          <line x1="100" y1="80" x2="100" y2="380" stroke="currentColor" strokeWidth="0.75" />
          <line x1="230" y1="80" x2="230" y2="380" stroke="currentColor" strokeWidth="0.75" />
          <line x1="360" y1="80" x2="360" y2="380" stroke="currentColor" strokeWidth="0.75" />
          <line x1="500" y1="80" x2="500" y2="380" stroke="currentColor" strokeWidth="0.75" />
          {/* Highlighted blocks */}
          <rect x="230" y="80" width="130" height="100" fill="#a855f7" fillOpacity="0.15" stroke="#c084fc" strokeWidth="1.5" />
          <rect x="100" y="180" width="130" height="100" fill="#9333ea" fillOpacity="0.1" stroke="#a855f7" strokeWidth="1" />
          <rect x="360" y="280" width="140" height="100" fill="#7e22ce" fillOpacity="0.2" stroke="#d8b4fe" strokeWidth="1.2" />
          <circle cx="295" cy="130" r="4" fill="#e9d5ff" />
          <circle cx="430" cy="330" r="4" fill="#e9d5ff" />
        </svg>
      )}

      {pattern === 'probability-bell' && (
        <svg
          className="absolute inset-0 w-full h-full text-amber-400/20"
          viewBox="0 0 600 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gaussian curve */}
          <path
            d="M 60 360 C 180 360, 220 340, 260 220 C 280 150, 300 90, 320 90 C 340 90, 360 150, 380 220 C 420 340, 460 360, 540 360"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M 120 360 C 200 360, 240 345, 275 250 C 295 190, 320 140, 340 140 C 360 140, 380 190, 400 250 C 435 345, 470 360, 520 360"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            strokeDasharray="4 4"
          />
          <line x1="320" y1="90" x2="320" y2="360" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="60" y1="360" x2="540" y2="360" stroke="currentColor" strokeWidth="1" />
          <circle cx="320" cy="90" r="5" fill="#f59e0b" />
          <circle cx="260" cy="220" r="3" fill="#fcd34d" />
          <circle cx="380" cy="220" r="3" fill="#fcd34d" />
        </svg>
      )}

      {pattern === 'vector-flow' && (
        <svg
          className="absolute inset-0 w-full h-full text-sky-400/20"
          viewBox="0 0 600 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 60 120 Q 220 80, 320 200 T 540 320" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 60 180 Q 200 140, 300 260 T 540 380" stroke="currentColor" strokeWidth="1" strokeDasharray="5 3" />
          <path d="M 60 240 Q 250 200, 360 150 T 540 160" stroke="#38bdf8" strokeWidth="1.75" />
          <path d="M 60 300 Q 240 360, 400 250 T 540 100" stroke="currentColor" strokeWidth="1" />
          <circle cx="360" cy="150" r="4.5" fill="#0284c7" />
          <circle cx="320" cy="200" r="4" fill="#38bdf8" />
          <circle cx="200" cy="140" r="3" fill="#7dd3fc" />
          <circle cx="480" cy="130" r="3.5" fill="#38bdf8" />
        </svg>
      )}

      {pattern === 'causal-matrix' && (
        <svg
          className="absolute inset-0 w-full h-full text-indigo-400/20"
          viewBox="0 0 600 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="120" y="100" width="100" height="70" rx="3" stroke="currentColor" strokeWidth="1.5" fill="#312e81" fillOpacity="0.2" />
          <rect x="380" y="100" width="100" height="70" rx="3" stroke="currentColor" strokeWidth="1.5" fill="#312e81" fillOpacity="0.2" />
          <rect x="250" y="270" width="100" height="70" rx="3" stroke="#818cf8" strokeWidth="1.75" fill="#4338ca" fillOpacity="0.3" />
          
          <path d="M 220 135 L 290 135 Q 300 135, 300 150 L 300 260" stroke="#a5b4fc" strokeWidth="1.2" strokeDasharray="3 3" />
          <path d="M 380 135 L 310 135 Q 300 135, 300 150 L 300 260" stroke="#a5b4fc" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="220" y1="135" x2="380" y2="135" stroke="currentColor" strokeWidth="1" />
          
          <circle cx="170" cy="135" r="4" fill="#818cf8" />
          <circle cx="430" cy="135" r="4" fill="#818cf8" />
          <circle cx="300" cy="305" r="5" fill="#c7d2fe" />
        </svg>
      )}

      {pattern === 'conversational-bubble' && (
        <svg
          className="absolute inset-0 w-full h-full text-emerald-400/20"
          viewBox="0 0 600 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="110" y="90" width="240" height="90" rx="16" stroke="currentColor" strokeWidth="1.5" fill="#064e3b" fillOpacity="0.2" />
          <rect x="250" y="210" width="240" height="90" rx="16" stroke="#34d399" strokeWidth="1.5" fill="#047857" fillOpacity="0.25" />
          <path d="M 140 180 L 140 205 L 170 180 Z" fill="currentColor" opacity="0.4" />
          <path d="M 460 300 L 460 325 L 430 300 Z" fill="#34d399" opacity="0.5" />
          <line x1="140" y1="125" x2="280" y2="125" stroke="currentColor" strokeWidth="1.5" />
          <line x1="140" y1="145" x2="220" y2="145" stroke="currentColor" strokeWidth="1" />
          <line x1="280" y1="245" x2="430" y2="245" stroke="#a7f3d0" strokeWidth="1.5" />
          <line x1="280" y1="265" x2="370" y2="265" stroke="#a7f3d0" strokeWidth="1" />
        </svg>
      )}

      {pattern === 'persona-prism' && (
        <svg
          className="absolute inset-0 w-full h-full text-amber-400/20"
          viewBox="0 0 600 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Prism triangle */}
          <polygon points="300,90 420,320 180,320" stroke="#f59e0b" strokeWidth="1.75" fill="#78350f" fillOpacity="0.2" />
          {/* Light ray in */}
          <line x1="60" y1="210" x2="240" y2="210" stroke="#fef3c7" strokeWidth="2" />
          {/* Dispersed spectrum rays out */}
          <line x1="360" y1="200" x2="540" y2="120" stroke="#ef4444" strokeWidth="1.5" />
          <line x1="370" y1="220" x2="540" y2="180" stroke="#f59e0b" strokeWidth="1.5" />
          <line x1="375" y1="240" x2="540" y2="240" stroke="#10b981" strokeWidth="1.5" />
          <line x1="370" y1="260" x2="540" y2="300" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="360" y1="280" x2="540" y2="360" stroke="#8b5cf6" strokeWidth="1.5" />
        </svg>
      )}

      {pattern === 'dispatch-waves' && (
        <svg
          className="absolute inset-0 w-full h-full text-cyan-400/20"
          viewBox="0 0 600 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 50 180 C 150 120, 220 240, 320 180 C 420 120, 490 240, 550 180" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 50 220 C 150 160, 220 280, 320 220 C 420 160, 490 280, 550 220" stroke="#06b6d4" strokeWidth="1.75" />
          <path d="M 50 260 C 150 200, 220 320, 320 260 C 420 200, 490 320, 550 260" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="320" cy="220" r="5" fill="#22d3ee" />
          <circle cx="185" cy="220" r="3.5" fill="#67e8f9" />
          <circle cx="455" cy="220" r="3.5" fill="#67e8f9" />
        </svg>
      )}

      {pattern === 'safety-shield' && (
        <svg
          className="absolute inset-0 w-full h-full text-rose-400/20"
          viewBox="0 0 600 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 300 90 L 430 140 C 430 260, 380 340, 300 370 C 220 340, 170 260, 170 140 Z"
            stroke="#f43f5e"
            strokeWidth="1.75"
            fill="#881337"
            fillOpacity="0.25"
          />
          <path
            d="M 300 130 L 390 165 C 390 250, 355 305, 300 330 C 245 305, 210 250, 210 165 Z"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <circle cx="300" cy="230" r="6" fill="#fb7185" />
          <line x1="300" y1="180" x2="300" y2="280" stroke="#fda4af" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      )}

      {/* Editorial watermark typography */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono tracking-wider text-stone-400 uppercase pointer-events-none">
        <span className="truncate max-w-[200px]">{category}</span>
        <span className="opacity-60">SYNTHETICA DISPATCH</span>
      </div>
    </div>
  );
};
