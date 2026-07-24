import { useEffect, useRef } from 'react';
import { useMotionPrefs } from './MotionProvider.jsx';
import { useTheme } from '../hooks/useTheme.js';

export function ParticleField() {
  const canvasRef = useRef(null);
  const { reducedMotion } = useMotionPrefs();
  const { isDark } = useTheme();

  useEffect(() => {
    if (reducedMotion || !isDark) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let raf = 0;
    let running = true;
    let last = 0;
    const lowPower =
      navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    const fpsGap = lowPower ? 1000 / 30 : 1000 / 60;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: 1 + Math.random() * 2,
      color: Math.random() > 0.5 ? '37,99,235' : '124,58,237',
    }));

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onVisibility = () => {
      running = document.visibilityState === 'visible';
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('visibilitychange', onVisibility);

    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      if (!running || now - last < fpsGap) return;
      last = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 100 && dist > 0) {
          p.vx += (dx / dist) * 0.02;
          p.vy += (dy / dist) * 0.02;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        p.vx *= 0.99;
        p.vy *= 0.99;
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.strokeStyle = `rgba(99,102,241,${0.12 * (1 - d / 120)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.fillStyle = `rgba(${p.color},0.7)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reducedMotion, isDark]);

  if (reducedMotion || !isDark) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
      aria-hidden="true"
    />
  );
}
