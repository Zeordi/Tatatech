import { useMemo } from 'react';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { useScrollSpy } from '../hooks/useScrollSpy.js';
import { Breadcrumbs } from '../components/layout/Breadcrumbs.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { Section } from '../components/layout/Section.jsx';
import { cn } from '../../utils/formatters.js';

const sections = [
  {
    id: 'overview',
    title: 'Overview',
    body: 'This Privacy Policy explains how TATATECH collects, uses, and protects personal information when you use our website and services.',
  },
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    body: 'We collect information you provide (such as name, email, company, and message details) and technical data such as browser type, device, and approximate location.',
  },
  {
    id: 'how-we-use',
    title: 'How We Use Information',
    body: 'We use information to respond to inquiries, deliver services, improve our website, and communicate updates you request.',
  },
  {
    id: 'sharing',
    title: 'Sharing',
    body: 'We do not sell personal information. We may share data with processors who help us operate our business under confidentiality obligations.',
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    body: 'You may request access, correction, or deletion of your personal information by contacting support@tatatech.net.',
  },
  {
    id: 'contact',
    title: 'Contact',
    body: 'Questions about this policy can be sent to support@tatatech.net.',
  },
];

export function PrivacyPage() {
  const ids = useMemo(() => sections.map((s) => s.id), []);
  const activeId = useScrollSpy(ids);

  return (
    <>
      {usePageMeta({
        title: 'Privacy Policy',
        description: 'TATATECH privacy policy — how we collect, use, and protect your information.',
        path: '/privacy',
      })}
      <Section className="!pt-10">
        <PageContainer>
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Privacy Policy' }]} />
          <div className="grid gap-10 xl:grid-cols-[220px_minmax(0,48rem)] xl:justify-center">
            <aside className="hidden xl:block">
              <div className="sticky top-28 space-y-2">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-text-muted">
                  On this page
                </p>
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={cn(
                      'block rounded-lg px-3 py-2 text-sm',
                      activeId === section.id
                        ? 'bg-primary-light font-semibold text-primary dark:bg-primary/20'
                        : 'text-text-secondary hover:text-primary',
                    )}
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </aside>
            <article className="max-w-3xl">
              <h1>Privacy Policy</h1>
              <p className="mt-2 text-sm text-text-muted">Last updated: March 1, 2026</p>
              <div className="prose-content mt-8 space-y-10">
                {sections.map((section) => (
                  <section key={section.id} id={section.id}>
                    <h2>{section.title}</h2>
                    <p>{section.body}</p>
                  </section>
                ))}
              </div>
            </article>
          </div>
        </PageContainer>
      </Section>
    </>
  );
}
