import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { useMotionPrefs } from './MotionProvider.jsx';

const MILESTONES = [
  {
    year: 2004,
    title: 'Founded',
    story: 'Opened the first Alexandria office with a mission to unify digital craft.',
    stat: '1 founder',
  },
  {
    year: 2008,
    title: 'First enterprise client',
    story: 'Delivered a multi-system platform that set our delivery bar for scale.',
    stat: 'Enterprise win',
  },
  {
    year: 2012,
    title: '100th project delivered',
    story: 'Crossed a hundred launches spanning web, software, and infrastructure.',
    stat: '100 projects',
  },
  {
    year: 2016,
    title: 'Full-service infrastructure',
    story: 'Expanded into cloud, security, and always-on operations for growing teams.',
    stat: '+Infra pod',
  },
  {
    year: 2019,
    title: 'NFC digital cards',
    story: 'Launched tap-to-share cards that turn networking into measurable pipeline.',
    stat: 'New product',
  },
  {
    year: 2021,
    title: 'LMS + 200th client',
    story: 'Shipped learning platforms and welcomed our two-hundredth partner.',
    stat: '200 clients',
  },
  {
    year: 2024,
    title: '300+ ready apps',
    story: 'Catalog crossed three hundred production-ready business applications.',
    stat: '300+ apps',
  },
  {
    year: 2026,
    title: 'Today',
    story: 'One team for design, software, infrastructure, and growth — your future partner.',
    stat: 'Full-service',
  },
];

export function CinematicTimeline() {
  const containerRef = useRef(null);
  const { reducedMotion } = useMotionPrefs();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const milestones = useMemo(() => MILESTONES, []);

  if (reducedMotion) {
    return (
      <div className="space-y-6">
        {milestones.map((m) => (
          <div key={m.year} className="rounded-xl border border-border bg-background p-5">
            <p className="font-mono text-primary">{m.year}</p>
            <h3 className="mt-1 text-xl">{m.title}</h3>
            <p className="mt-2 text-text-secondary">{m.story}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative md:h-[400vh]">
      <div className="md:sticky md:top-24 md:h-[70vh]">
        <div className="relative mx-auto h-full max-w-4xl">
          <svg className="absolute left-1/2 top-0 hidden h-full w-2 -translate-x-1/2 md:block" aria-hidden="true">
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="rgb(51 65 85)"
              strokeWidth="2"
            />
            <motion.line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="url(#energy)"
              strokeWidth="3"
              style={{ pathLength: line }}
            />
            <defs>
              <linearGradient id="energy" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#2563EB" />
                <stop offset="1" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
          </svg>

          <div className="grid gap-8 py-6 md:grid-cols-1">
            {milestones.map((m, i) => {
              const start = i / milestones.length;
              const end = (i + 0.85) / milestones.length;
              return (
                <TimelineCard
                  key={m.year}
                  milestone={m}
                  index={i}
                  progress={scrollYProgress}
                  start={start}
                  end={end}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineCard({ milestone, index, progress, start, end }) {
  const opacity = useTransform(progress, [start, start + 0.05, end], [0.2, 1, 1]);
  const x = useTransform(
    progress,
    [start, start + 0.08],
    [index % 2 === 0 ? -40 : 40, 0],
  );
  const scale = useTransform(progress, [start, start + 0.08], [0.6, 1]);

  return (
    <motion.div
      style={{ opacity, x }}
      className={`relative rounded-xl border border-border bg-background/90 p-5 shadow-lg backdrop-blur md:w-[46%] ${
        index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
      }`}
    >
      <motion.span
        style={{ scale }}
        className="absolute -left-3 top-6 hidden h-4 w-4 rounded-full bg-hero-gradient shadow-[0_0_20px_rgba(37,99,235,0.7)] md:block"
      />
      <p className="font-mono text-2xl font-bold text-primary">{milestone.year}</p>
      <h3 className="mt-1 text-xl">{milestone.title}</h3>
      <p className="mt-2 text-sm text-text-secondary">{milestone.story}</p>
      <span className="mt-3 inline-flex rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20">
        {milestone.stat}
      </span>
    </motion.div>
  );
}
