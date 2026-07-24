import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Eye, Target, HeartHandshake } from 'lucide-react';
import { getTeam } from '../../domain/usecases/getContent.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { Breadcrumbs } from '../components/layout/Breadcrumbs.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { Button } from '../components/ui/Button.jsx';
import { LinkedInIcon } from '../components/shared/SocialIcons.jsx';
import {
  CinematicTimeline,
  Odometer,
  ParallaxLayer,
  ScrambleText,
  SplitTextReveal,
  SectionEntrance,
  EntranceCard,
  useMotionPrefs,
} from '../motion/index.js';

const values = [
  {
    icon: Target,
    title: 'Mission',
    text: 'Make enterprise-grade digital capability accessible to ambitious teams.',
  },
  {
    icon: Eye,
    title: 'Vision',
    text: 'One trusted partner for design, software, infrastructure, and growth.',
  },
  {
    icon: HeartHandshake,
    title: 'Values',
    text: 'Clarity, craft, ownership, and outcomes measured in real business impact.',
  },
];

const eras = [
  { title: 'One founder', detail: 'A single craftsman with a clear thesis.' },
  { title: 'Small team', detail: 'Designers and engineers shipping together.' },
  { title: 'Connected company', detail: 'Pods across product, infra, and growth.' },
  { title: 'Global reach', detail: 'Partners and launches spanning industries.' },
];

export function AboutPage() {
  const [team, setTeam] = useState([]);
  const [era, setEra] = useState(0);
  const { reducedMotion } = useMotionPrefs();
  const { scrollYProgress } = useScroll();
  const ghostY = useTransform(scrollYProgress, [0, 1], [0, 180]);

  useEffect(() => {
    getTeam().then(setTeam);
  }, []);

  const founder = team.find((m) => m.isFounder);
  const members = team.filter((m) => !m.isFounder);

  return (
    <>
      {usePageMeta({
        title: 'About TATATECH',
        description:
          'Two decades of building the future from Alexandria, Virginia.',
        path: '/about',
      })}

      <div className="relative overflow-hidden border-b border-border bg-surface py-12 md:py-20">
        <PageContainer className="relative">
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'About' }]} />
          <ScrambleText
            text="EST. 2004 — ALEXANDRIA, VA"
            className="label-caps mb-4 inline-block text-primary"
          />
          <SplitTextReveal text="Two Decades of Building the Future." as="h1" className="relative z-10 max-w-4xl" />
          <motion.span
            aria-hidden="true"
            style={reducedMotion ? undefined : { y: ghostY }}
            className="pointer-events-none absolute -right-4 top-10 select-none font-heading text-[18rem] font-extrabold leading-none text-text-primary opacity-[0.04]"
          >
            20+
          </motion.span>
        </PageContainer>
      </div>

      <SectionEntrance className="py-16 md:py-24">
        <PageContainer>
          <h2 className="mb-8">
            <SplitTextReveal text="Our timeline" as="span" />
          </h2>
          <CinematicTimeline />
        </PageContainer>
      </SectionEntrance>

      <section className="relative overflow-hidden bg-[#0B1120] py-16 text-white md:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, #2563EB33, transparent 40%), repeating-linear-gradient(0deg, transparent, transparent 12px, #1e293b55 13px)',
          }}
        />
        <PageContainer className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: 20, label: 'Years of Experience' },
            { value: 500, label: 'Projects Shipped' },
            { value: 300, label: 'Ready Apps' },
            { value: 12, label: 'Industries Served' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <Odometer
                value={item.value}
                suffix="+"
                className="font-heading text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400"
              />
              <ScrambleText
                text={item.label.toUpperCase()}
                className="label-caps mt-3 block text-slate-400"
              />
            </div>
          ))}
        </PageContainer>
      </section>

      <SectionEntrance className="py-16 md:py-24">
        <PageContainer>
          <h2 className="mb-10">
            <SplitTextReveal text="How we've grown" as="span" />
          </h2>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              {eras.map((item, i) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setEra(i)}
                  onFocus={() => setEra(i)}
                  className={`block w-full rounded-xl border p-5 text-left transition ${
                    era === i
                      ? 'border-primary bg-background opacity-100'
                      : 'border-border opacity-30'
                  }`}
                >
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="mt-1 text-sm text-text-secondary">{item.detail}</p>
                </button>
              ))}
            </div>
            <div className="relative flex min-h-72 items-center justify-center rounded-2xl border border-border bg-surface">
              <GrowthVisual step={era} />
            </div>
          </div>
        </PageContainer>
      </SectionEntrance>

      <SectionEntrance className="bg-surface py-16 md:py-24">
        <PageContainer>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <HoloCard key={title}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary dark:bg-primary/10">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl">{title}</h3>
                <p className="text-text-secondary">{text}</p>
              </HoloCard>
            ))}
          </div>
        </PageContainer>
      </SectionEntrance>

      <SectionEntrance className="py-16 md:py-24">
        <PageContainer>
          <h2 className="mb-8">
            <SplitTextReveal text="Leadership" as="span" />
          </h2>
          {founder ? (
            <EntranceCard className="relative mb-10 grid gap-6 overflow-hidden rounded-xl border border-border bg-background p-6 md:grid-cols-[200px_1fr] md:items-center lg:p-8">
              <ParallaxLayer speed={0.2} className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
              <img
                src={founder.photo}
                alt={founder.name}
                className="scanline-hover aspect-square w-full rounded-xl object-cover"
              />
              <div>
                <h3 className="text-2xl">{founder.name}</h3>
                <p className="mt-1 text-primary">{founder.title}</p>
                <p className="mt-3 text-text-secondary">{founder.credentials}</p>
                <svg className="mt-4 h-8 w-40 text-primary" viewBox="0 0 160 32" aria-hidden="true">
                  <motion.path
                    d="M4 22 C 30 4, 50 28, 78 14 S 130 6, 156 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                  />
                </svg>
                {founder.linkedin ? (
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                  >
                    <LinkedInIcon className="h-4 w-4" /> LinkedIn
                  </a>
                ) : null}
              </div>
            </EntranceCard>
          ) : null}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((member) => (
              <div key={member.id} className="group">
                <div className="scanline-hover overflow-hidden rounded-xl">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="aspect-square w-full object-cover grayscale transition duration-300 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <div className="overflow-hidden">
                  <h3 className="mt-3 translate-y-2 text-lg transition group-hover:translate-y-0">
                    {member.name}
                  </h3>
                  <p className="translate-y-2 text-sm text-text-muted transition delay-75 group-hover:translate-y-0">
                    {member.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </SectionEntrance>

      <SectionEntrance className="py-16 md:py-24">
        <PageContainer>
          <div className="rounded-3xl bg-cta-gradient px-6 py-14 text-center text-white sm:px-10">
            <h2 className="bg-[linear-gradient(90deg,#fff_40%,#93c5fd_50%,#fff_60%)] bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer-diag_4s_linear_infinite]">
              20 years behind us. Your project ahead.
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button as="a" href="/careers" variant="white">
                View Careers
              </Button>
              <Button as="a" href="/contact" variant="white-outline" className="relative overflow-hidden">
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer-diag_4s_linear_infinite]" />
                Contact
              </Button>
            </div>
          </div>
        </PageContainer>
      </SectionEntrance>
    </>
  );
}

function HoloCard({ children }) {
  const [style, setStyle] = useState({});
  const { reducedMotion, isFinePointer } = useMotionPrefs();

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-border bg-background p-6 shadow-sm transition duration-300 lg:p-8"
      style={style}
      onMouseMove={(e) => {
        if (reducedMotion || !isFinePointer) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        setStyle({
          transform: `perspective(1200px) rotateX(${(0.5 - py) * 10}deg) rotateY(${(px - 0.5) * 10}deg)`,
          backgroundImage: `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.18), transparent 40%)`,
        });
      }}
      onMouseLeave={() => setStyle({ transform: 'perspective(1200px) rotateX(0) rotateY(0)' })}
    >
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-40 [background:conic-gradient(from_0deg,#2563EB33,#7C3AED33,#F59E0B33,#2563EB33)] animate-[orbit-spin_8s_linear_infinite]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function GrowthVisual({ step }) {
  const counts = [1, 8, 30, 48];
  const n = counts[step] || 1;
  return (
    <div className="relative h-56 w-56">
      {Array.from({ length: n }).map((_, i) => {
        const angle = (i / n) * Math.PI * 2;
        const radius = step === 0 ? 0 : 20 + (i % 8) * 8;
        return (
          <motion.span
            key={`${step}-${i}`}
            layout
            className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_12px_rgba(37,99,235,0.8)]"
            animate={{
              x: Math.cos(angle) * radius,
              y: Math.sin(angle) * radius,
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          />
        );
      })}
    </div>
  );
}
