import { useEffect, useRef, useState } from 'react';

export function useCounter(target, { duration = 1400, start = 0, enabled = true } = {}) {
  const [value, setValue] = useState(start);
  const frame = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(start + (target - start) * eased));
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [target, duration, start, enabled]);

  return value;
}
