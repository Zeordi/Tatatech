import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { EASE_EXPO, useMotionPrefs } from './MotionProvider.jsx';

export function SectionEntrance({ children, className = '', id }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const { reducedMotion } = useMotionPrefs();

  if (reducedMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.05 } },
      }}
    >
      {children}
    </motion.section>
  );
}

export function EntranceHeading({ children, className = '' }) {
  const { reducedMotion } = useMotionPrefs();
  if (reducedMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: EASE_EXPO } },
      }}
    >
      {children}
      <motion.span
        className="mt-3 block h-0.5 w-24 origin-left rounded-full bg-hero-gradient"
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { duration: 0.35, ease: EASE_EXPO } },
        }}
      />
    </motion.div>
  );
}

export function EntranceBody({ children, className = '' }) {
  const { reducedMotion } = useMotionPrefs();
  if (reducedMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_EXPO } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function EntranceCard({ children, className = '' }) {
  const { reducedMotion } = useMotionPrefs();
  if (reducedMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      style={{ transformPerspective: 1000 }}
      variants={{
        hidden: { opacity: 0, y: 24, rotateX: 8 },
        show: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          transition: { duration: 0.35, ease: EASE_EXPO },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
