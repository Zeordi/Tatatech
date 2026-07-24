import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import {
  getRelatedServices,
  getServiceBySlug,
} from '../../domain/usecases/getServices.js';
import { formatCurrency } from '../../utils/formatters.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { Breadcrumbs } from '../components/layout/Breadcrumbs.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { Section } from '../components/layout/Section.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Button } from '../components/ui/Button.jsx';
import { ServiceCard } from '../components/shared/ServiceCard.jsx';

export function ServiceDetailPage() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    Promise.all([getServiceBySlug(slug), getRelatedServices(slug)]).then(
      ([item, others]) => {
        setService(item);
        setRelated(others);
      },
    );
  }, [slug]);

  if (!service) {
    return (
      <PageContainer className="py-24">
        <p className="text-text-secondary">Loading service…</p>
      </PageContainer>
    );
  }

  return (
    <>
      {usePageMeta({
        title: service.title,
        description: service.shortDescription,
        path: `/services/${service.slug}`,
      })}
      <div className="border-b border-border bg-surface py-10">
        <PageContainer>
          <Breadcrumbs
            items={[
              { label: 'Home', path: '/' },
              { label: 'Services', path: '/services' },
              { label: service.title },
            ]}
          />
          <h1>{service.title}</h1>
          <p className="mt-3 max-w-2xl text-text-secondary">{service.description}</p>
        </PageContainer>
      </div>

      <Section>
        <PageContainer>
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-4 text-2xl">Overview</h2>
              <p className="max-w-prose text-text-secondary">{service.description}</p>

              <h2 className="mb-6 mt-12 text-2xl">Our Process</h2>
              <ol className="relative space-y-8 border-l-2 border-border pl-8">
                <motion.span
                  className="absolute left-[-2px] top-0 w-0.5 origin-top bg-hero-gradient"
                  style={{ height: '100%' }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                />
                {service.process.map((step, index) => (
                  <motion.li
                    key={step.title}
                    className="relative"
                    initial={{ opacity: 0.4 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.7 }}
                  >
                    <motion.span
                      className="absolute -left-[2.55rem] flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-bold text-primary"
                      initial={{ rotateY: 180 }}
                      whileInView={{
                        rotateY: 0,
                        backgroundImage: 'linear-gradient(135deg,#2563EB,#7C3AED)',
                        color: '#fff',
                        borderColor: 'transparent',
                      }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 0.45, delay: index * 0.08 }}
                    >
                      {index + 1}
                      <motion.span
                        className="absolute inset-0 rounded-full border border-primary"
                        initial={{ scale: 1, opacity: 0.6 }}
                        whileInView={{ scale: 1.8, opacity: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      />
                    </motion.span>
                    <h3 className="text-lg">{step.title}</h3>
                    <p className="mt-1 text-text-secondary">{step.description}</p>
                  </motion.li>
                ))}
              </ol>

              <h2 className="mb-4 mt-12 text-2xl">Deliverables</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-text-secondary">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {item}
                  </li>
                ))}
              </ul>

              <h2 className="mb-4 mt-12 text-2xl">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {service.techStack.map((tech) => (
                  <Badge key={tech} tone="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-1">
              <div className="rounded-xl border border-border bg-background p-6 shadow-sm lg:sticky lg:top-24">
                <p className="text-sm text-text-muted">Starting at</p>
                <p className="mt-1 font-heading text-3xl font-extrabold">
                  {formatCurrency(service.startingPrice)}
                </p>
                <p className="mt-3 text-sm text-text-secondary">
                  Typical timeline: {service.timeline}
                </p>
                <Button as={Link} to="/contact" variant="accent" className="mt-6 w-full">
                  Request This Service
                </Button>
                <Link
                  to="/contact"
                  className="mt-3 block text-center text-sm font-semibold text-primary"
                >
                  Talk to us
                </Link>
              </div>
            </aside>
          </div>
        </PageContainer>
      </Section>

      <Section className="bg-surface">
        <PageContainer>
          <h2 className="mb-8 text-2xl">Related services</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <ServiceCard key={item.id} service={item} />
            ))}
          </div>
        </PageContainer>
      </Section>
    </>
  );
}
