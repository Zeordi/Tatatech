import { useEffect, useState } from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import { getProjects } from '../../domain/usecases/getProjects.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { Breadcrumbs } from '../components/layout/Breadcrumbs.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { Section } from '../components/layout/Section.jsx';
import { ProjectCard } from '../components/shared/ProjectCard.jsx';
import { cn } from '../../utils/formatters.js';

const filters = ['All', 'Web', 'Software', 'Infrastructure', 'NFC', 'LMS'];

export function PortfolioPage() {
  const [category, setCategory] = useState('All');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects(category).then(setProjects);
  }, [category]);

  return (
    <>
      {usePageMeta({
        title: 'Portfolio',
        description: 'Case studies and project outcomes from the TATATECH team.',
        path: '/portfolio',
      })}
      <div className="border-b border-border bg-surface py-12 md:py-16">
        <PageContainer>
          <Breadcrumbs
            items={[
              { label: 'Home', path: '/' },
              { label: 'Portfolio' },
            ]}
          />
          <h1>Portfolio</h1>
          <p className="mt-3 max-w-2xl text-text-secondary">
            Selected work across web, software, infrastructure, NFC, and LMS.
          </p>
        </PageContainer>
      </div>

      <Section>
        <PageContainer>
          <div className="mb-8 flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={cn(
                  'min-h-11 rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                  category === item
                    ? 'bg-primary text-white'
                    : 'border border-border text-text-secondary hover:border-primary',
                )}
              >
                {item}
              </button>
            ))}
          </div>
          <LayoutGroup>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProjectCard project={project} overlay />
                </motion.div>
              ))}
            </div>
          </LayoutGroup>
        </PageContainer>
      </Section>
    </>
  );
}
