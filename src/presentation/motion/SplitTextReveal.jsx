import { motion, useInView } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { EASE_EXPO, useMotionPrefs } from './MotionProvider.jsx';

export function SplitTextReveal({
  text,
  as: Tag = 'h1',
  className = '',
  delay = 0,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const { reducedMotion } = useMotionPrefs();
  const words = useMemo(() => String(text).split(' '), [text]);

  if (reducedMotion) {
    return (
      <Tag className={className}>
        {text}
      </Tag>
    );
  }

  let charIndex = 0;

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char) => {
            const i = charIndex++;
            return (
              <span key={`${wi}-${i}`} className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block origin-bottom"
                  initial={{ y: '110%', rotateX: 90, opacity: 0 }}
                  animate={
                    inView
                      ? { y: '0%', rotateX: 0, opacity: 1 }
                      : { y: '110%', rotateX: 90, opacity: 0 }
                  }
                  transition={{
                    duration: 0.55,
                    delay: delay + i * 0.02,
                    ease: EASE_EXPO,
                  }}
                  style={{ transformPerspective: 600 }}
                >
                  {char}
                </motion.span>
              </span>
            );
          })}
          {wi < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </Tag>
  );
}
