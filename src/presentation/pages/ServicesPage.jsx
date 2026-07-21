import { useEffect, useState } from 'react';
import { getServices } from '../../domain/usecases/getServices.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { Breadcrumbs } from '../components/layout/Breadcrumbs.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { Section } from '../components/layout/Section.jsx';
import { ServiceCard } from '../components/shared/ServiceCard.jsx';

export function ServicesPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  return (
    <>
      {usePageMeta({
        title: 'Our Services',
        description:
          'Explore TATATECH services: web design, software development, IT infrastructure, NFC cards, LMS, and digital marketing.',
        path: '/services',
      })}
      <div className="border-b border-border bg-surface py-12 md:py-16">
        <PageContainer>
          <Breadcrumbs
            items={[
              { label: 'Home', path: '/' },
              { label: 'Services' },
            ]}
          />
          <h1>Our Services</h1>
          <p className="mt-3 max-w-2xl text-text-secondary">
            End-to-end digital capabilities from a single Virginia-based team.
          </p>
        </PageContainer>
      </div>
      <Section>
        <PageContainer>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} variant="detailed" />
            ))}
          </div>
        </PageContainer>
      </Section>
    </>
  );
}
