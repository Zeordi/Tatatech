import { animate, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import { useMotionPrefs } from './MotionProvider.jsx';

export function ScrollProgressHUD() {
  const { scrollYProgress } = useScroll();
  const [pct, setPct] = useState(0);
  const { reducedMotion } = useMotionPrefs();

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setPct(Math.round(v * 100));
  });

  const backToTop = () => {
    if (reducedMotion) {
      window.scrollTo({ top: 0 });
      return;
    }
    const root = document.getElementById('app-scale-root');
    if (root) {
      animate(root, { scale: 0.96, opacity: 0.85 }, { duration: 0.25 }).then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        animate(root, { scale: 1, opacity: 1 }, { duration: 0.55 });
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const r = 18;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] h-0.5 origin-left bg-gradient-to-r from-primary via-indigo-500 to-violet-600"
        style={{ scaleX: scrollYProgress }}
      />
      <button
        type="button"
        onClick={backToTop}
        aria-label="Back to top"
        className="fixed bottom-5 right-5 z-[90] flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/90 shadow-lg backdrop-blur"
      >
        <svg width="44" height="44" viewBox="0 0 44 44" className="-rotate-90">
          <circle
            cx="22"
            cy="22"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-border"
          />
          <circle
            cx="22"
            cy="22"
            r={r}
            fill="none"
            stroke="url(#hudGrad)"
            strokeWidth="2.5"
            strokeDasharray={c}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="hudGrad" x1="0" y1="0" x2="44" y2="44">
              <stop stopColor="#2563EB" />
              <stop offset="1" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute font-mono text-[10px] tabular-nums text-text-secondary">
          {pct}
        </span>
      </button>
    </>
  );
}
