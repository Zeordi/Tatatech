import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useMotionPrefs } from './MotionProvider.jsx';

export function CustomCursor() {
  const { reducedMotion, isFinePointer } = useMotionPrefs();
  const [label, setLabel] = useState('');
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { damping: 32, stiffness: 900, mass: 0.35 });
  const ry = useSpring(y, { damping: 32, stiffness: 900, mass: 0.35 });

  useEffect(() => {
    if (reducedMotion || !isFinePointer) return undefined;

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target?.closest?.('[data-cursor]');
      if (target) {
        setLabel(target.getAttribute('data-cursor') || '');
        setHovering(true);
      } else {
        setLabel('');
        setHovering(false);
      }
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.documentElement.classList.add('custom-cursor-active');
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [reducedMotion, isFinePointer, x, y]);

  if (reducedMotion || !isFinePointer) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[120] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary mix-blend-difference will-change-transform"
        style={{ x, y, opacity: visible ? 1 : 0 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[119] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/70 mix-blend-difference will-change-transform"
        style={{
          x: rx,
          y: ry,
          opacity: visible ? 1 : 0,
          scale: hovering ? 2.5 : 1,
        }}
      >
        {label ? (
          <span className="text-[8px] font-bold uppercase tracking-wider text-primary">
            {label}
          </span>
        ) : null}
      </motion.div>
    </>
  );
}
