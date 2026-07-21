import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { getServices } from '../../domain/usecases/getServices.js';
import { getFeaturedProjects } from '../../domain/usecases/getProjects.js';
import {
  getTestimonials,
  getTrustLogos,
} from '../../domain/usecases/getContent.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { Section } from '../components/layout/Section.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { SectionHeading } from '../components/shared/SectionHeading.jsx';
import { StatCounter } from '../components/shared/StatCounter.jsx';
import { ServiceCard } from '../components/shared/ServiceCard.jsx';
import { ProjectCard } from '../components/shared/ProjectCard.jsx';
import { TestimonialCard } from '../components/shared/TestimonialCard.jsx';
import { LogoStrip } from '../components/shared/LogoStrip.jsx';
import { CTABanner } from '../components/shared/CTABanner.jsx';

const checklist = [
  'Fast Delivery',
  'Enterprise Security',
  'Dedicated Support',
  '300+ Ready Apps',
];

export function HomePage() {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [logos, setLogos] = useState([]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

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

  return (
    <>
      {usePageMeta({
        title: 'Full-Service Digital Technology',
        description:
          'TATATECH delivers web design, software development, IT infrastructure, NFC cards, LMS, and digital marketing from Alexandria, Virginia.',
        path: '/',
      })}

      <section className="relative min-h-[90vh] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-pattern" />
        <div className="pointer-events-none absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl dark:bg-primary/25" />
        <div className="pointer-events-none absolute right-1/4 top-40 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />
        <PageContainer className="relative flex min-h-[90vh] flex-col items-center justify-center py-20 text-center">
          <Badge className="label-caps mb-6">Virginia-Based Tech Company</Badge>
          <h1 className="max-w-4xl">
            Full-Service Digital Technology.{' '}
            <span className="text-gradient">Delivered.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-text-secondary">
            Web design, custom software, infrastructure, NFC digital cards, LMS,
            and growth marketing — one team in Alexandria, Virginia.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button as={Link} to="/contact" variant="accent" size="lg">
              Get a Free Quote →
            </Button>
            <Button as={Link} to="/services" variant="outline" size="lg">
              Explore Services
            </Button>
          </div>
          <div className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
            <StatCounter value={300} suffix="+" label="Software Apps" />
            <StatCounter value={200} suffix="+" label="Projects Done" />
            <StatCounter value={50} suffix="+" label="Happy Clients" />
            <StatCounter value={5} suffix="+" label="Years Experience" />
          </div>
        </PageContainer>
      </section>

      <PageContainer>
        <LogoStrip logos={logos} />
      </PageContainer>

      <Section>
        <PageContainer>
          <SectionHeading
            title="Services built for modern businesses"
            subtitle="Everything you need to design, build, launch, and grow."
            action={{ to: '/services', label: 'View all services →' }}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </PageContainer>
      </Section>

      <Section className="bg-surface">
        <PageContainer>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2>Everything tech, one team</h2>
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
            </div>
            <div className="relative">
              <div className="absolute inset-8 rounded-full bg-hero-gradient opacity-20 blur-3xl" />
              <div className="relative grid gap-4 sm:grid-cols-2">
                {[
                  { label: 'Avg. reply time', value: '24h' },
                  { label: 'Apps ready', value: '300+' },
                  { label: 'Client retention', value: '96%' },
                  { label: 'NPS', value: '72' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className={`rounded-xl border border-border bg-background p-5 shadow-sm ${
                      i % 2 === 1 ? 'sm:translate-y-6' : ''
                    }`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <p className="font-heading text-3xl font-extrabold text-gradient">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </PageContainer>
      </Section>

      <Section>
        <PageContainer>
          <SectionHeading
            title="Featured work"
            subtitle="Outcomes that move the needle."
            action={{ to: '/portfolio', label: 'View portfolio →' }}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </PageContainer>
      </Section>

      <Section className="bg-surface">
        <PageContainer>
          <SectionHeading
            title="Clients say it best"
            align="center"
            subtitle="Trusted by teams across retail, logistics, education, and healthcare."
          />
          <div className="hidden gap-6 lg:grid lg:grid-cols-3">
            {testimonials.map((item) => (
              <TestimonialCard key={item.id} testimonial={item} />
            ))}
          </div>
          <div className="lg:hidden">
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
      </Section>

      <Section>
        <CTABanner
          title="Ready to build something great?"
          subtitle="Free quote, 24-hour reply."
          primary={{ to: '/contact', label: 'Get a Quote →' }}
          secondary={{ to: '/apps', label: 'Browse 300+ Apps' }}
        />
      </Section>
    </>
  );
}
