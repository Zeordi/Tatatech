import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Target, HeartHandshake } from 'lucide-react';
import { getMilestones, getTeam } from '../../domain/usecases/getContent.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { Breadcrumbs } from '../components/layout/Breadcrumbs.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { Section } from '../components/layout/Section.jsx';
import { CTABanner } from '../components/shared/CTABanner.jsx';
import { LinkedInIcon } from '../components/shared/SocialIcons.jsx';
import { Card } from '../components/ui/Card.jsx';

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

export function AboutPage() {
  const [team, setTeam] = useState([]);
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    Promise.all([getTeam(), getMilestones()]).then(([t, m]) => {
      setTeam(t);
      setMilestones(m);
    });
  }, []);

  const founder = team.find((m) => m.isFounder);
  const members = team.filter((m) => !m.isFounder);

  return (
    <>
      {usePageMeta({
        title: 'About TATATECH',
        description:
          'Meet the Alexandria, Virginia team behind TATATECH — full-service digital technology.',
        path: '/about',
      })}
      <div className="border-b border-border bg-surface py-12 md:py-16">
        <PageContainer>
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'About' }]} />
          <h1>One team. Every technology.</h1>
          <p className="mt-3 max-w-2xl text-text-secondary">
            Founded in Alexandria, Virginia, TATATECH helps organizations design, build, and scale digital products.
          </p>
        </PageContainer>
      </div>

      <Section>
        <PageContainer>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl">Our story</h2>
              <p className="max-w-prose text-text-secondary">
                TATATECH began with a simple belief: businesses shouldn’t need five vendors to ship one product.
                From our base in Alexandria, we assembled specialists across design, engineering, infrastructure,
                and marketing into a single delivery team.
              </p>
              <p className="mt-4 max-w-prose text-text-secondary">
                Today we support startups and enterprises with clean architecture, measurable outcomes, and a catalog
                of 300+ ready-to-deploy applications.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-6 rounded-full bg-hero-gradient opacity-25 blur-3xl" />
              <div className="relative grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&h=800&q=80"
                  alt="TATATECH office workspace"
                  className="aspect-[3/4] rounded-2xl object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=800&q=80"
                  alt="TATATECH team collaborating"
                  className="mt-8 aspect-[3/4] rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </PageContainer>
      </Section>

      <Section className="bg-surface">
        <PageContainer>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <Card key={title}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary dark:bg-primary/10">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl">{title}</h3>
                <p className="text-text-secondary">{text}</p>
              </Card>
            ))}
          </div>
        </PageContainer>
      </Section>

      <Section>
        <PageContainer>
          <h2 className="mb-8">Leadership</h2>
          {founder ? (
            <Card className="mb-10 grid gap-6 md:grid-cols-[200px_1fr] md:items-center">
              <img
                src={founder.photo}
                alt={founder.name}
                className="aspect-square w-full rounded-xl object-cover"
              />
              <div>
                <h3 className="text-2xl">{founder.name}</h3>
                <p className="mt-1 text-primary">{founder.title}</p>
                <p className="mt-3 text-text-secondary">{founder.credentials}</p>
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
            </Card>
          ) : null}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((member) => (
              <div key={member.id} className="group">
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="aspect-square w-full object-cover grayscale transition duration-300 group-hover:grayscale-0"
                  />
                </div>
                <h3 className="mt-3 text-lg">{member.name}</h3>
                <p className="text-sm text-text-muted">{member.title}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </Section>

      <Section className="bg-surface">
        <PageContainer>
          <h2 className="mb-6">Milestones</h2>
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
            {milestones.map((item) => (
              <div
                key={item.year}
                className="min-w-[240px] snap-start rounded-xl border border-border bg-background p-5"
              >
                <div className="mb-3 h-3 w-3 rounded-full bg-hero-gradient" />
                <p className="font-heading text-xl font-bold text-primary">{item.year}</p>
                <h3 className="mt-2 text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </Section>

      <Section>
        <PageContainer>
          <p className="label-caps mb-6 text-center text-text-muted">Certifications & partners</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {['AWS Partner', 'Google Cloud', 'Meta Business', 'HubSpot', 'SOC 2 Ready'].map(
              (badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-text-secondary"
                >
                  {badge}
                </span>
              ),
            )}
          </div>
        </PageContainer>
      </Section>

      <Section>
        <CTABanner
          title="Want to work with us?"
          subtitle="Join the team or start a project conversation."
          primary={{ to: '/careers', label: 'View Careers' }}
          secondary={{ to: '/contact', label: 'Contact' }}
        />
      </Section>
    </>
  );
}
