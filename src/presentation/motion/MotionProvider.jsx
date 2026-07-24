import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const MotionContext = createContext({
  reducedMotion: false,
  isFinePointer: false,
});

export function MotionProvider({ children }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerQuery = window.matchMedia('(pointer: fine)');
    const sync = () => {
      setReducedMotion(motionQuery.matches);
      setIsFinePointer(pointerQuery.matches);
    };
    sync();
    motionQuery.addEventListener('change', sync);
    pointerQuery.addEventListener('change', sync);
    return () => {
      motionQuery.removeEventListener('change', sync);
      pointerQuery.removeEventListener('change', sync);
    };
  }, []);

  const value = useMemo(
    () => ({ reducedMotion, isFinePointer }),
    [reducedMotion, isFinePointer],
  );

  return (
    <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
  );
}

export function useMotionPrefs() {
  return useContext(MotionContext);
}

export const EASE_EXPO = [0.22, 1, 0.36, 1];
export const SPRING_LAYOUT = { type: 'spring', stiffness: 300, damping: 30 };
export const SPRING_MAGNETIC = { type: 'spring', stiffness: 150, damping: 15 };
