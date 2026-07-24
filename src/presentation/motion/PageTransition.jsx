import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { EASE_EXPO, useMotionPrefs } from './MotionProvider.jsx';

const PANELS = 8;

export function PageTransition() {
  const location = useLocation();
  const { reducedMotion } = useMotionPrefs();
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || reducedMotion) return undefined;
    setActive(true);
    const t = window.setTimeout(() => setActive(false), 620);
    return () => window.clearTimeout(t);
  }, [location.pathname, ready, reducedMotion]);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          key={location.pathname}
          className="pointer-events-none fixed inset-0 z-[95] flex"
          initial="hidden"
          animate="show"
          exit="exit"
          aria-hidden="true"
        >
          {Array.from({ length: PANELS }).map((_, i) => (
            <motion.div
              key={i}
              className="h-full flex-1 bg-gradient-to-b from-primary via-indigo-600 to-violet-600"
              variants={{
                hidden: { y: '100%' },
                show: {
                  y: ['100%', '0%', '0%', '-105%'],
                  transition: {
                    duration: 0.6,
                    times: [0, 0.35, 0.5, 1],
                    delay: i * 0.025,
                    ease: EASE_EXPO,
                  },
                },
              }}
            />
          ))}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.85, 1, 1, 1.05] }}
            transition={{ duration: 0.6, times: [0, 0.3, 0.6, 1] }}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 font-heading text-xl font-extrabold text-white shadow-[0_0_40px_rgba(37,99,235,0.55)]">
              TT
            </span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
