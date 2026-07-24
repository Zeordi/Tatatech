import { useEffect } from 'react';
import Lenis from 'lenis';
import { useMotionPrefs } from './MotionProvider.jsx';

export function SmoothScroll({ children }) {
  const { reducedMotion } = useMotionPrefs();

  useEffect(() => {
    if (reducedMotion) return undefined;

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1.1,
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    document.documentElement.classList.add('lenis');

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      document.documentElement.classList.remove('lenis');
    };
  }, [reducedMotion]);

  return children;
}
