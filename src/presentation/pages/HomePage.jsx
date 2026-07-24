import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Check } from 'lucide-react';
import { getServices } from '../../domain/usecases/getServices.js';
import { getFeaturedProjects } from '../../domain/usecases/getProjects.js';
import {
  getTestimonials,
  getTrustLogos,
} from '../../domain/usecases/getContent.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { Button } from '../components/ui/Button.jsx';
import { SectionHeading } from '../components/shared/SectionHeading.jsx';
import { ServiceCard } from '../components/shared/ServiceCard.jsx';
import { ProjectCard } from '../components/shared/ProjectCard.jsx';
import { TestimonialCard } from '../components/shared/TestimonialCard.jsx';
import { LogoStrip } from '../components/shared/LogoStrip.jsx';
import { CTABanner } from '../components/shared/CTABanner.jsx';
import {
  HeroBoot,
  HeroScene,
  ScrambleText,
  SplitTextReveal,
  Odometer,
  SectionEntrance,
  EntranceHeading,
  EntranceBody,
  EntranceCard,
  ParallaxLayer,
  useMotionPrefs,
} from '../motion/index.js';

const checklist = [
  'Fast Delivery',
  'Enterprise Security',
  'Dedicated Support',
  '300+ Ready Apps',
];

const ROTATING = ['Delivered.', 'Engineered.', 'Automated.', 'Secured.'];

export function HomePage() {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [logos, setLogos] = useState([]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [booted, setBooted] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const { reducedMotion } = useMotionPrefs();
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.92]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.18], [0, 4]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.55]);

  const subtitle =
    'Web design, custom software, infrastructure, NFC digital cards, LMS, and growth marketing — one team in Alexandria, Virginia.';

  useEffect(() => {
    Promise.all([
      getServices(),
      getFeaturedProjects(3),
      getTestimonials(),
      getTrustLogos(),
    ]).then(([s, p, t, l]) => {
      setServices(s);
      setProjects(p);
      setTestimonials(t);
      setLogos(l);
    });
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return undefined;
    const id = window.setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [testimonials.length]);

  useEffect(() => {
    if (!booted || reducedMotion) {
      setTyped(subtitle);
      return undefined;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(subtitle.slice(0, i));
      if (i >= subtitle.length) window.clearInterval(id);
    }, 16);
    return () => window.clearInterval(id);
  }, [booted, reducedMotion, subtitle]);

  useEffect(() => {
    if (!booted || reducedMotion) return undefined;
    const id = window.setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [booted, reducedMotion]);

  return (
    <>
      {usePageMeta({
        title: 'Full-Service Digital Technology',
        description:
          'TATATECH delivers web design, software development, IT infrastructure, NFC cards, LMS, and digital marketing from Alexandria, Virginia.',
        path: '/',
      })}

      <HeroBoot onDone={() => setBooted(true)} />

      <motion.section
        className="relative min-h-[92vh] overflow-hidden"
        style={
          reducedMotion
            ? undefined
            : {
                scale: heroScale,
                opacity: heroOpacity,
                filter: heroBlur.get ? undefined : undefined,
              }
        }
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="hero-aurora absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary/30" />
          <div className="hero-aurora absolute -right-10 top-32 h-80 w-80 rounded-full bg-violet-600/25 [animation-delay:2s]" />
          <div className="hero-beam absolute inset-y-0 w-1/3" />
        </div>
        <PageContainer className="relative grid min-h-[92vh] items-center gap-10 py-20 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex">
              <span className="label-caps relative overflow-hidden rounded-full border border-primary/40 bg-primary-light px-4 py-1.5 text-primary dark:bg-primary/15">
                <ScrambleText text="VIRGINIA-BASED TECH COMPANY" />
                <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
                  <rect
                    x="1"
                    y="1"
                    width="98%"
                    height="90%"
                    rx="999"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    pathLength="1"
                    className="text-primary"
                    style={{
                      strokeDasharray: 1,
                      strokeDashoffset: booted ? 0 : 1,
                      transition: 'stroke-dashoffset 0.9s ease',
                    }}
                  />
                </svg>
              </span>
            </div>
            <h1 className="max-w-3xl">
              <SplitTextReveal text="Full-Service Digital Technology." as="span" className="block" />
              <span className="relative mt-2 inline-block h-[1.15em] overflow-hidden text-gradient">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROTATING[wordIndex]}
                    className="inline-block"
                    initial={{ rotateX: 90, opacity: 0, y: 16 }}
                    animate={{ rotateX: 0, opacity: 1, y: 0 }}
                    exit={{ rotateX: -90, opacity: 0, y: -16 }}
                    transition={{ duration: 0.45 }}
                    style={{
                      textShadow: reducedMotion
                        ? undefined
                        : '1px 0 #22d3ee, -1px 0 #f472b6',
                    }}
                  >
                    {ROTATING[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-text-secondary">
              {typed}
              {!reducedMotion && typed.length < subtitle.length ? (
                <span className="ml-0.5 animate-pulse">▍</span>
              ) : null}
            </p>
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
              initial={reducedMotion ? false : { y: 24, opacity: 0 }}
              animate={booted ? { y: 0, opacity: 1 } : undefined}
              transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.2 }}
            >
              <Button as={Link} to="/contact" variant="accent" size="lg">
                Get a Free Quote →
              </Button>
              <Button as={Link} to="/services" variant="outline" size="lg" magnetic={false}>
                Explore Services
              </Button>
            </motion.div>
            <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
              {[
                { value: 300, label: 'Software Apps' },
                { value: 200, label: 'Projects Done' },
                { value: 50, label: 'Happy Clients' },
                { value: 20, label: 'Years Experience' },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <Odometer
                    value={stat.value}
                    suffix="+"
                    className="font-heading text-3xl font-extrabold text-gradient md:text-4xl"
                  />
                  <ScrambleText
                    text={stat.label.toUpperCase()}
                    className="label-caps mt-2 block text-text-muted"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <HeroScene />
          </div>
        </PageContainer>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 perspective-[600px]">
          <div className="hologram-grid h-full w-full" />
        </div>
      </motion.section>

      <PageContainer>
        <LogoStrip logos={logos} />
      </PageContainer>

      <SectionEntrance className="py-16 md:py-24 lg:py-28">
        <PageContainer>
          <EntranceHeading>
            <SectionHeading
              title="Services built for modern businesses"
              subtitle="Everything you need to design, build, launch, and grow."
              action={{ to: '/services', label: 'View all services →' }}
            />
          </EntranceHeading>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {services.map((service) => (
              <EntranceCard key={service.id}>
                <ServiceCard service={service} />
              </EntranceCard>
            ))}
          </div>
        </PageContainer>
      </SectionEntrance>

      <SectionEntrance className="bg-surface py-16 md:py-24 lg:py-28">
        <PageContainer>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <EntranceBody>
              <SplitTextReveal text="Everything tech, one team" as="h2" />
              <p className="mt-4 max-w-prose text-text-secondary">
                Stop juggling agencies. TATATECH unifies product design, engineering,
                infrastructure, and marketing so you ship faster with fewer handoffs.
              </p>
              <ul className="mt-6 space-y-3">
                {checklist.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-text-secondary">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-success dark:bg-emerald-500/20">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </EntranceBody>
            <div className="relative">
              <ParallaxLayer speed={0.3} className="absolute inset-8 rounded-full bg-hero-gradient opacity-20 blur-3xl" />
              <div className="relative grid gap-4 sm:grid-cols-2">
                {[
                  { label: 'Avg. reply time', value: '24h' },
                  { label: 'Apps ready', value: '300+' },
                  { label: 'Client retention', value: '96%' },
                  { label: 'NPS', value: '72' },
                ].map((stat, i) => (
                  <EntranceCard
                    key={stat.label}
                    className={`rounded-xl border border-border bg-background p-5 shadow-sm ${
                      i % 2 === 1 ? 'sm:translate-y-6' : ''
                    }`}
                  >
                    <p className="font-heading text-3xl font-extrabold text-gradient">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
                  </EntranceCard>
                ))}
              </div>
            </div>
          </div>
        </PageContainer>
      </SectionEntrance>

      <SectionEntrance className="py-16 md:py-24 lg:py-28">
        <PageContainer>
          <EntranceHeading>
            <SectionHeading
              title="Featured work"
              subtitle="Outcomes that move the needle."
              action={{ to: '/portfolio', label: 'View portfolio →' }}
            />
          </EntranceHeading>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {projects.map((project) => (
              <EntranceCard key={project.id}>
                <ProjectCard project={project} />
              </EntranceCard>
            ))}
          </div>
        </PageContainer>
      </SectionEntrance>

      <SectionEntrance className="bg-surface py-16 md:py-24 lg:py-28" data-cursor="Drag">
        <PageContainer>
          <EntranceHeading>
            <SectionHeading
              title="Clients say it best"
              align="center"
              subtitle="Trusted by teams across retail, logistics, education, and healthcare."
            />
          </EntranceHeading>
          <div className="hidden gap-6 lg:grid lg:grid-cols-3">
            {testimonials.map((item) => (
              <EntranceCard key={item.id}>
                <TestimonialCard testimonial={item} />
              </EntranceCard>
            ))}
          </div>
          <div className="lg:hidden" data-cursor="Drag">
            <AnimatePresence mode="wait">
              {testimonials[testimonialIndex] ? (
                <motion.div
                  key={testimonials[testimonialIndex].id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <TestimonialCard testimonial={testimonials[testimonialIndex]} />
                </motion.div>
              ) : null}
            </AnimatePresence>
            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Show testimonial ${index + 1}`}
                  className={`h-2.5 w-2.5 rounded-full ${
                    index === testimonialIndex ? 'bg-primary' : 'bg-border'
                  }`}
                  onClick={() => setTestimonialIndex(index)}
                />
              ))}
            </div>
          </div>
        </PageContainer>
      </SectionEntrance>

      <SectionEntrance className="py-16 md:py-24 lg:py-28">
        <CTABanner
          title="Ready to build something great?"
          subtitle="Free quote, 24-hour reply."
          primary={{ to: '/contact', label: 'Get a Quote →' }}
          secondary={{ to: '/apps', label: 'Browse 300+ Apps' }}
        />
      </SectionEntrance>
    </>
  );
}
