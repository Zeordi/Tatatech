import { useEffect, useState } from 'react';
import { HeartPulse, Laptop, Sprout, Wallet } from 'lucide-react';
import { getCareers } from '../../domain/usecases/getContent.js';
import { SITE } from '../../utils/constants.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { Breadcrumbs } from '../components/layout/Breadcrumbs.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { Section } from '../components/layout/Section.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Card } from '../components/ui/Card.jsx';

const perks = [
  { icon: Laptop, title: 'Remote-friendly', text: 'Work from anywhere in the US with flexible hours.' },
  { icon: Wallet, title: 'Growth budget', text: 'Annual stipend for courses, conferences, and tools.' },
  { icon: Sprout, title: 'Modern stack', text: 'Ship with React, cloud-native infra, and clean architecture.' },
  { icon: HeartPulse, title: 'Health cover', text: 'Medical, dental, and wellness benefits for full-time roles.' },
];

export function CareersPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getCareers().then(setJobs);
  }, []);

  return (
    <>
      {usePageMeta({
        title: 'Careers',
        description: 'Join TATATECH — remote-friendly roles across engineering, design, and infrastructure.',
        path: '/careers',
      })}
      <div className="border-b border-border bg-surface py-12 md:py-16">
        <PageContainer>
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Careers' }]} />
          <h1>Join the team</h1>
          <p className="mt-3 max-w-2xl text-text-secondary">
            Help ambitious companies ship better digital products.
          </p>
        </PageContainer>
      </div>

      <Section>
        <PageContainer>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map(({ icon: Icon, title, text }) => (
              <Card key={title}>
                <Icon className="mb-3 h-6 w-6 text-primary" />
                <h3 className="text-lg">{title}</h3>
                <p className="mt-2 text-sm text-text-secondary">{text}</p>
              </Card>
            ))}
          </div>
        </PageContainer>
      </Section>

      <Section className="bg-surface">
        <PageContainer>
          <h2 className="mb-6 text-2xl">Open roles</h2>
          {jobs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-background px-6 py-12 text-center">
              <p className="text-text-secondary">
                No openings right now — send your CV to{' '}
                <a className="font-semibold text-primary" href={`mailto:${SITE.careersEmail}`}>
                  {SITE.careersEmail}
                </a>
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {jobs.map((job) => (
                <li
                  key={job.id}
                  className="flex flex-col gap-4 rounded-xl border border-border bg-background p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="text-lg">{job.title}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-text-muted">
                      <Badge tone="muted">{job.department}</Badge>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <Button as="a" href={`mailto:${SITE.careersEmail}?subject=Application: ${job.title}`} variant="primary">
                    Apply →
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </PageContainer>
      </Section>
    </>
  );
}
