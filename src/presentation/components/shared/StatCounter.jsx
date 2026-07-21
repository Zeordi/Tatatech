import { useEffect, useRef, useState } from 'react';
import { useCounter } from '../../hooks/useCounter.js';

export function StatCounter({ value, suffix = '', label }) {
  const ref = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const count = useCounter(value, { enabled });

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEnabled(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <p className="font-heading text-3xl font-extrabold text-gradient md:text-4xl">
        {count}
        {suffix}
      </p>
      <p className="label-caps mt-2 text-text-muted">{label}</p>
    </div>
  );
}
