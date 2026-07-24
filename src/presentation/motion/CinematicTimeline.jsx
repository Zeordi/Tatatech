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
    offset: ['start 0.75', 'end 0.55'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
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
    <div ref={containerRef} className="relative mx-auto max-w-4xl">
      {/* Base rail */}
      <div className="absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />
      {/* Energy line drawn by scroll */}
      <motion.div
        className="absolute left-4 top-0 h-full w-0.5 origin-top bg-gradient-to-b from-primary via-indigo-500 to-violet-600 shadow-[0_0_12px_rgba(37,99,235,0.8)] will-change-transform md:left-1/2 md:-translate-x-1/2"
        style={{ scaleY: lineScale }}
      />
      <div className="space-y-10 py-4 md:space-y-16">
        {milestones.map((m, i) => (
          <TimelineCard key={m.year} milestone={m} index={i} />
        ))}
      </div>
    </div>
  );
}

function TimelineCard({ milestone, index }) {
  const left = index % 2 === 0;
  return (
    <div className="relative pl-12 md:pl-0">
      {/* Node */}
      <motion.span
        className="absolute left-4 top-6 h-4 w-4 -translate-x-1/2 rounded-full bg-hero-gradient shadow-[0_0_20px_rgba(37,99,235,0.7)] md:left-1/2"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      />
      <motion.div
        initial={{ opacity: 0, x: left ? -36 : 36, y: 12 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`relative rounded-xl border border-border bg-background/90 p-5 shadow-lg backdrop-blur md:w-[46%] ${
          left ? 'md:mr-auto' : 'md:ml-auto'
        }`}
      >
        <p className="font-mono text-2xl font-bold text-primary">{milestone.year}</p>
        <h3 className="mt-1 text-xl">{milestone.title}</h3>
        <p className="mt-2 text-sm text-text-secondary">{milestone.story}</p>
        <span className="mt-3 inline-flex rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20">
          {milestone.stat}
        </span>
      </motion.div>
    </div>
  );
}
