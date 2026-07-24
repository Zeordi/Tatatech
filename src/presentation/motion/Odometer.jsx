import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useMotionPrefs } from './MotionProvider.jsx';

// Renders the number as a plain text node so gradient text
// (background-clip: text) paints correctly in light & dark mode.
export function Odometer({
  value,
  suffix = '',
  className = '',
  durationDriven = false,
  progress = 1,
  duration = 900,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: !durationDriven, amount: 0.5 });
  const { reducedMotion } = useMotionPrefs();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reducedMotion) {
      setShown(value);
      return undefined;
    }
    if (durationDriven) {
      setShown(Math.round(value * Math.min(1, Math.max(0, progress))));
      return undefined;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      setShown(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reducedMotion, durationDriven, progress, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {shown}
      {suffix}
    </span>
  );
}
