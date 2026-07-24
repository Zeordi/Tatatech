import { motion, useInView } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useMotionPrefs } from './MotionProvider.jsx';

function DigitWheel({ digit, delay = 0 }) {
  const nums = useMemo(() => Array.from({ length: 10 }, (_, i) => i), []);
  return (
    <span className="relative inline-block h-[1em] w-[0.65em] overflow-hidden align-baseline">
      <motion.span
        className="absolute left-0 top-0 flex flex-col"
        initial={{ y: 0 }}
        animate={{ y: `${-digit * 10}%` }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {nums.map((n) => (
          <span key={n} className="flex h-[1em] items-center justify-center">
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function Odometer({
  value,
  suffix = '',
  className = '',
  durationDriven = false,
  progress = 1,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: !durationDriven, amount: 0.5 });
  const { reducedMotion } = useMotionPrefs();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setShown(value);
      return;
    }
    if (durationDriven) {
      setShown(Math.round(value * Math.min(1, Math.max(0, progress))));
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now) => {
      const t = Math.min((now - start) / 1400, 1);
      const eased = 1 - (1 - t) ** 3;
      setShown(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reducedMotion, durationDriven, progress]);

  const digits = String(shown).split('');

  return (
    <span ref={ref} className={className}>
      {reducedMotion
        ? shown
        : digits.map((d, i) =>
            /\d/.test(d) ? (
              <DigitWheel key={`${i}-${d}`} digit={Number(d)} delay={i * 0.05} />
            ) : (
              <span key={`${i}-${d}`}>{d}</span>
            ),
          )}
      {suffix}
    </span>
  );
}
