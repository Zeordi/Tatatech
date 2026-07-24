import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useMotionPrefs } from './MotionProvider.jsx';

export function ParallaxLayer({
  children,
  speed = 0.3,
  className = '',
  as: Component = 'div',
}) {
  const ref = useRef(null);
  const { reducedMotion } = useMotionPrefs();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * -80, speed * 80]);
  const MotionComponent = motion.create(Component);

  if (reducedMotion) {
    return (
      <Component className={className}>
        {children}
      </Component>
    );
  }

  return (
    <MotionComponent ref={ref} style={{ y }} className={className}>
      {children}
    </MotionComponent>
  );
}
