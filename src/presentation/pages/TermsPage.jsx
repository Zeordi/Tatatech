import { useMemo } from 'react';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { useScrollSpy } from '../hooks/useScrollSpy.js';
import { Breadcrumbs } from '../components/layout/Breadcrumbs.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { Section } from '../components/layout/Section.jsx';
import { cn } from '../../utils/formatters.js';

const sections = [
  {
    id: 'agreement',
    title: 'Agreement',
    body: 'By accessing the TATATECH website and services, you agree to these Terms of Service.',
  },
  {
    id: 'services',
    title: 'Services',
    body: 'Project scope, timelines, and fees are defined in individual statements of work or order forms.',
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable Use',
    body: 'You agree not to misuse our website, attempt unauthorized access, or interfere with service availability.',
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    body: 'Unless otherwise agreed in writing, deliverables ownership transfers upon full payment. TATATECH retains rights to pre-existing tools and frameworks.',
  },
  {
    id: 'limitation',
    title: 'Limitation of Liability',
    body: 'To the fullest extent permitted by law, TATATECH is not liable for indirect or consequential damages arising from use of the website or services.',
  },
  {
    id: 'governing-law',
    title: 'Governing Law',
    body: 'These terms are governed by the laws of the Commonwealth of Virginia.',
  },
];

export function TermsPage() {
  const ids = useMemo(() => sections.map((s) => s.id), []);
  const activeId = useScrollSpy(ids);

  return (
    <>
      {usePageMeta({
        title: 'Terms of Service',
        description: 'TATATECH terms of service for website use and client engagements.',
        path: '/terms',
      })}
      <Section className="!pt-10">
        <PageContainer>
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Terms of Service' }]} />
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
              <h1>Terms of Service</h1>
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
