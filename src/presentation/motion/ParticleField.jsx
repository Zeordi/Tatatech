import { useEffect, useRef } from 'react';
import { useMotionPrefs } from './MotionProvider.jsx';
import { useTheme } from '../hooks/useTheme.js';

// Colorful technology background: drifting atoms with orbiting electrons,
// floating hexagons, data streams, and a multicolor particle network.
export function ParticleField() {
  const canvasRef = useRef(null);
  const { reducedMotion, isFinePointer } = useMotionPrefs();
  const { isDark } = useTheme();

  useEffect(() => {
    if (reducedMotion || !isFinePointer) return undefined;
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

    // Vibrant tech palette (blue / violet / cyan / emerald / amber / pink)
    const PALETTE = [
      '37,99,235',
      '124,58,237',
      '6,182,212',
      '16,185,129',
      '245,158,11',
      '236,72,153',
    ];
    const dotAlpha = isDark ? 0.75 : 0.5;
    const lineBase = isDark ? 0.14 : 0.11;
    const shapeAlpha = isDark ? 1 : 0.75;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const rand = (min, max) => min + Math.random() * (max - min);
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    /* ------- multicolor particle network ------- */
    const particles = Array.from({ length: lowPower ? 50 : 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: rand(-0.3, 0.3),
      vy: rand(-0.3, 0.3),
      r: rand(1, 3),
      color: pick(PALETTE),
    }));

    /* ------- atoms: nucleus + elliptical electron orbits ------- */
    const atoms = Array.from({ length: lowPower ? 3 : 5 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: rand(-0.12, 0.12),
      vy: rand(-0.12, 0.12),
      size: rand(28, 55),
      spin: rand(-0.02, 0.02) || 0.012,
      angle: rand(0, Math.PI * 2),
      color: pick(PALETTE),
      electronColor: pick(PALETTE),
      rings: 2 + Math.floor(Math.random() * 2), // 2–3 orbits
      pulse: rand(0, Math.PI * 2),
    }));

    /* ------- floating hexagons (circuit nodes) ------- */
    const hexes = Array.from({ length: lowPower ? 4 : 7 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vy: rand(-0.18, -0.05),
      size: rand(12, 30),
      rot: rand(0, Math.PI * 2),
      spin: rand(-0.008, 0.008),
      color: pick(PALETTE),
      alpha: rand(0.15, 0.4),
    }));

    /* ------- vertical data streams (light trails) ------- */
    const streams = Array.from({ length: lowPower ? 5 : 9 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: rand(1.2, 3),
      len: rand(50, 140),
      color: pick(PALETTE),
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

    const drawAtom = (a, t) => {
      ctx.save();
      ctx.translate(a.x, a.y);
      ctx.globalAlpha = shapeAlpha;

      // nucleus with glow pulse
      const pulse = 1 + Math.sin(t / 600 + a.pulse) * 0.25;
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 7 * pulse);
      grad.addColorStop(0, `rgba(${a.color},0.9)`);
      grad.addColorStop(1, `rgba(${a.color},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, 7 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // elliptical orbits + electrons
      for (let r = 0; r < a.rings; r += 1) {
        const tilt = a.angle + (r * Math.PI) / a.rings;
        ctx.save();
        ctx.rotate(tilt);
        ctx.strokeStyle = `rgba(${a.color},0.28)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(0, 0, a.size, a.size * 0.38, 0, 0, Math.PI * 2);
        ctx.stroke();

        // electron on this orbit
        const ea = t / 500 + r * 2.1 + a.pulse;
        const ex = Math.cos(ea) * a.size;
        const ey = Math.sin(ea) * a.size * 0.38;
        const eg = ctx.createRadialGradient(ex, ey, 0, ex, ey, 5);
        eg.addColorStop(0, `rgba(${a.electronColor},1)`);
        eg.addColorStop(1, `rgba(${a.electronColor},0)`);
        ctx.fillStyle = eg;
        ctx.beginPath();
        ctx.arc(ex, ey, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();
    };

    const drawHex = (h) => {
      ctx.save();
      ctx.translate(h.x, h.y);
      ctx.rotate(h.rot);
      ctx.strokeStyle = `rgba(${h.color},${h.alpha * shapeAlpha})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let i = 0; i < 6; i += 1) {
        const a = (i / 6) * Math.PI * 2;
        const px = Math.cos(a) * h.size;
        const py = Math.sin(a) * h.size;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };

    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      if (!running || now - last < fpsGap) return;
      last = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* data streams */
      for (const s of streams) {
        const sg = ctx.createLinearGradient(s.x, s.y - s.len, s.x, s.y);
        sg.addColorStop(0, `rgba(${s.color},0)`);
        sg.addColorStop(1, `rgba(${s.color},${isDark ? 0.4 : 0.28})`);
        ctx.strokeStyle = sg;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - s.len);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
        // bright head
        ctx.fillStyle = `rgba(${s.color},${isDark ? 0.9 : 0.6})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        s.y += s.speed;
        if (s.y - s.len > canvas.height) {
          s.y = -10;
          s.x = Math.random() * canvas.width;
        }
      }

      /* hexagons drifting upward */
      for (const h of hexes) {
        h.y += h.vy;
        h.rot += h.spin;
        if (h.y < -h.size * 2) {
          h.y = canvas.height + h.size;
          h.x = Math.random() * canvas.width;
        }
        drawHex(h);
      }

      /* atoms drifting with wrap-around */
      for (const a of atoms) {
        a.x += a.vx;
        a.y += a.vy;
        a.angle += a.spin;
        if (a.x < -a.size) a.x = canvas.width + a.size;
        if (a.x > canvas.width + a.size) a.x = -a.size;
        if (a.y < -a.size) a.y = canvas.height + a.size;
        if (a.y > canvas.height + a.size) a.y = -a.size;
        drawAtom(a, now);
      }

      /* particle network */
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
            ctx.strokeStyle = `rgba(${a.color},${lineBase * (1 - d / 120)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.fillStyle = `rgba(${p.color},${dotAlpha})`;
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
  }, [isDark, isFinePointer, reducedMotion]);

  if (reducedMotion || !isFinePointer) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-70 dark:opacity-80"
      aria-hidden="true"
    />
  );
}
