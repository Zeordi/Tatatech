import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useMotionPrefs } from './MotionProvider.jsx';

const GLYPHS = '█▓▒░ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function ScrambleText({
  text,
  className = '',
  as: Tag = 'span',
  duration = 450,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const { reducedMotion } = useMotionPrefs();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!inView) return undefined;
    if (reducedMotion) {
      setDisplay(text);
      return undefined;
    }

    const target = String(text);
    const start = performance.now();
    let frame = 0;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const reveal = Math.floor(progress * target.length);
      let next = '';
      for (let i = 0; i < target.length; i += 1) {
        if (target[i] === ' ') {
          next += ' ';
        } else if (i < reveal) {
          next += target[i];
        } else {
          next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setDisplay(next);
      if (progress < 1) frame = requestAnimationFrame(tick);
      else setDisplay(target);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, text, duration, reducedMotion]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {display}
    </Tag>
  );
}
