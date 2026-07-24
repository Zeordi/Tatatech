import { lazy, Suspense, useEffect, useState } from 'react';
import { useMotionPrefs } from './MotionProvider.jsx';

const HeroSceneCanvas = lazy(() =>
  import('./HeroSceneCanvas.jsx').then((m) => ({ default: m.HeroSceneCanvas })),
);

function CssFallback() {
  return (
    <div className="relative mx-auto h-64 w-64 md:h-80 md:w-80">
      <div className="absolute inset-8 rounded-full border border-primary/40 animate-[spin_12s_linear_infinite]" />
      <div className="absolute inset-4 rounded-full border border-violet-500/30 animate-[spin_8s_linear_infinite_reverse]" />
      <div className="absolute inset-16 rounded-full bg-hero-gradient opacity-30 blur-xl" />
      <div className="absolute inset-20 rounded-full border border-dashed border-primary/50" />
    </div>
  );
}

export function HeroScene() {
  const { reducedMotion } = useMotionPrefs();
  const [webgl, setWebgl] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    try {
      const canvas = document.createElement('canvas');
      const ok = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setWebgl(ok);
    } catch {
      setWebgl(false);
    }
  }, []);

  if (reducedMotion || !webgl || isMobile) return <CssFallback />;

  return (
    <Suspense fallback={<CssFallback />}>
      <HeroSceneCanvas />
    </Suspense>
  );
}
