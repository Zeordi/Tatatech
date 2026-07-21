import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  getAdjacentProjects,
  getProjectBySlug,
} from '../../domain/usecases/getProjects.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { Breadcrumbs } from '../components/layout/Breadcrumbs.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { Section } from '../components/layout/Section.jsx';
import { Badge } from '../components/ui/Badge.jsx';

export function CaseStudyPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [adjacent, setAdjacent] = useState({ prev: null, next: null });

  useEffect(() => {
    Promise.all([getProjectBySlug(slug), getAdjacentProjects(slug)]).then(
      ([item, nav]) => {
        setProject(item);
        setAdjacent(nav);
      },
    );
  }, [slug]);

  if (!project) {
    return (
      <PageContainer className="py-24">
        <p className="text-text-secondary">Loading case study…</p>
      </PageContainer>
    );
  }

  return (
    <>
      {usePageMeta({
        title: project.title,
        description: project.challenge,
        path: `/portfolio/${project.slug}`,
        image: project.image,
      })}
      <Section className="!pt-10">
        <PageContainer>
          <Breadcrumbs
            items={[
              { label: 'Home', path: '/' },
              { label: 'Portfolio', path: '/portfolio' },
              { label: project.title },
            ]}
          />
          <div className="overflow-hidden rounded-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="aspect-[21/9] w-full object-cover"
            />
          </div>
          <h1 className="mt-8">{project.title}</h1>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-text-secondary">
            <span>Client: {project.client}</span>
            <span>•</span>
            <span>Industry: {project.industry}</span>
            <span>•</span>
            <span>Year: {project.year}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.services.map((service) => (
              <Badge key={service}>{service}</Badge>
            ))}
          </div>
        </PageContainer>
      </Section>

      <Section className="!pt-0">
        <PageContainer className="max-w-3xl space-y-10">
          <div>
            <h2 className="mb-3 text-2xl">Challenge</h2>
            <p className="text-text-secondary">{project.challenge}</p>
          </div>
          <div>
            <h2 className="mb-3 text-2xl">Solution</h2>
            <p className="text-text-secondary">{project.solution}</p>
          </div>
          <div>
            <h2 className="mb-6 text-2xl">Results</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {project.results.map((result) => (
                <div
                  key={result.label}
                  className="rounded-xl border border-border bg-surface p-5 text-center"
                >
                  <p className="font-heading text-3xl font-extrabold text-success">
                    {result.value}
                  </p>
                  <p className="mt-1 text-sm text-text-muted">{result.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-2xl">Gallery</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.gallery.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt={`${project.title} gallery`}
                  loading="lazy"
                  className="aspect-video w-full rounded-xl object-cover"
                />
              ))}
            </div>
          </div>
          {project.testimonial ? (
            <blockquote className="border-l-4 border-primary pl-5 italic text-text-secondary">
              “{project.testimonial.quote}”
              <footer className="mt-3 not-italic text-sm text-text-muted">
                — {project.testimonial.author}, {project.testimonial.role}
              </footer>
            </blockquote>
          ) : null}
          <div className="flex items-center justify-between gap-4 border-t border-border pt-8">
            {adjacent.prev ? (
              <Link to={`/portfolio/${adjacent.prev.slug}`} className="font-semibold text-primary">
                ← {adjacent.prev.title}
              </Link>
            ) : (
              <span />
            )}
            {adjacent.next ? (
              <Link to={`/portfolio/${adjacent.next.slug}`} className="font-semibold text-primary">
                {adjacent.next.title} →
              </Link>
            ) : null}
          </div>
        </PageContainer>
      </Section>
    </>
  );
}
