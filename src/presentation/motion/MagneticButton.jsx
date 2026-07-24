import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '../../utils/formatters.js';
import { SPRING_MAGNETIC, useMotionPrefs } from './MotionProvider.jsx';

export function MagneticButton({
  children,
  className = '',
  accentBorder = false,
  as: Component = 'button',
  ...props
}) {
  const ref = useRef(null);
  const { reducedMotion, isFinePointer } = useMotionPrefs();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING_MAGNETIC);
  const sy = useSpring(y, SPRING_MAGNETIC);

  const enabled = !reducedMotion && isFinePointer;

  const onMove = (e) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > 80) {
      x.set(0);
      y.set(0);
      return;
    }
    x.set(Math.max(-12, Math.min(12, dx * 0.25)));
    y.set(Math.max(-12, Math.min(12, dy * 0.25)));
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty('--mx', `${px}%`);
    ref.current.style.setProperty('--my', `${py}%`);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      ref={ref}
      style={enabled ? { x: sx, y: sy } : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        'magnetic-btn relative overflow-hidden',
        accentBorder && 'accent-orbit-border',
        className,
      )}
      {...props}
    >
      <span className="liquid-fill pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200" />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </MotionComponent>
  );
}
