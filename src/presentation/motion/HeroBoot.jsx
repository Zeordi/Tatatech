import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { EASE_EXPO, useMotionPrefs } from './MotionProvider.jsx';

export function HeroBoot({ onDone }) {
  const { reducedMotion } = useMotionPrefs();
  const [phase, setPhase] = useState(reducedMotion ? 'done' : 'boot');

  useEffect(() => {
    if (reducedMotion) {
      onDone?.();
      return undefined;
    }
    if (sessionStorage.getItem('tt-boot') === '1') {
      setPhase('done');
      onDone?.();
      return undefined;
    }
    const t1 = window.setTimeout(() => setPhase('beam'), 120);
    const t2 = window.setTimeout(() => setPhase('scan'), 450);
    const t3 = window.setTimeout(() => {
      setPhase('done');
      sessionStorage.setItem('tt-boot', '1');
      onDone?.();
    }, 1050);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [reducedMotion, onDone]);

  const skip = () => {
    sessionStorage.setItem('tt-boot', '1');
    setPhase('done');
    onDone?.();
  };

  return (
    <AnimatePresence>
      {phase !== 'done' ? (
        <motion.button
          type="button"
          aria-label="Skip intro"
          onClick={skip}
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-slate-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <motion.div
            className="h-px w-0 bg-gradient-to-r from-transparent via-primary to-transparent"
            animate={{ width: phase === 'boot' ? '0%' : '80%' }}
            transition={{ duration: 0.35, ease: EASE_EXPO }}
          />
          {phase === 'scan' ? (
            <motion.div
              className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-primary/30 to-transparent"
              initial={{ top: '-10%' }}
              animate={{ top: '110%' }}
              transition={{ duration: 0.45, ease: 'linear' }}
            />
          ) : null}
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
