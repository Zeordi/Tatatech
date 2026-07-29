import { useDeferredValue, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Clock3, Search } from 'lucide-react';
import { getBlogPosts } from '../../domain/usecases/getContent.js';
import { submitNewsletter } from '../../domain/usecases/submitQuote.js';
import { formatDate } from '../../utils/formatters.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { useToast } from '../hooks/useToast.js';
import { Breadcrumbs } from '../components/layout/Breadcrumbs.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { Section } from '../components/layout/Section.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Input.jsx';
import { cn } from '../../utils/formatters.js';
import { EASE_EXPO, useMotionPrefs } from '../motion/MotionProvider.jsx';

const newsletterSchema = z.object({
  email: z.string().email('Enter a valid email'),
});

export function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const { reducedMotion } = useMotionPrefs();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(newsletterSchema) });

  useEffect(() => {
    getBlogPosts().then(setPosts);
  }, []);

  const categories = ['All', ...new Set(posts.map((p) => p.category))];
  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const filtered = posts.filter((post) => {
    const matchesCategory = category === 'All' || post.category === category;
    const matchesSearch =
      !normalizedQuery ||
      `${post.title} ${post.excerpt} ${post.author} ${post.category}`
        .toLowerCase()
        .includes(normalizedQuery);
    return matchesCategory && matchesSearch;
  });
  const featured = filtered.find((p) => p.featured) || filtered[0];
  const rest = filtered.filter((p) => p.id !== featured?.id);

  const onSubscribe = async (values) => {
    try {
      await submitNewsletter(values.email);
      toast.success('Subscribed — welcome to the list.');
      reset();
    } catch {
      toast.error('Could not subscribe. Try again.');
    }
  };

  return (
    <>
      {usePageMeta({
        title: 'Insights & Updates',
        description: 'Engineering, product, and infrastructure insights from TATATECH.',
        path: '/blog',
      })}
      <div className="border-b border-border bg-surface py-10 sm:py-14 md:py-16">
        <PageContainer>
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Blog' }]} />
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="max-w-3xl">
              <span className="label-caps text-primary">Ideas for digital leaders</span>
              <h1 className="mt-3">Field notes from the people building the work</h1>
              <p className="mt-4 max-w-2xl text-lg text-text-secondary">
                Practical thinking on software delivery, product design, cloud infrastructure, and sustainable growth.
              </p>
            </div>
            <label className="relative block">
              <span className="sr-only">Search articles</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search insights"
                className="min-h-12 w-full rounded-lg border border-border bg-background py-3 pl-12 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-primary"
              />
            </label>
          </div>
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2" aria-label="Article categories">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={cn(
                  'min-h-10 shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                  category === item
                    ? 'bg-primary text-white'
                    : 'border border-border bg-background text-text-secondary hover:border-primary hover:text-primary',
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </PageContainer>
      </div>

      <Section>
        <PageContainer>
          {featured ? (
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE_EXPO }}
            >
            <Link
              to={`/blog/${featured.slug}`}
              className="group mb-12 grid overflow-hidden rounded-lg border border-border bg-background shadow-sm transition-shadow hover:shadow-lg md:grid-cols-[1.1fr_0.9fr]"
            >
              <div className="overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="aspect-[16/10] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025] md:aspect-auto"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <div className="mb-4 flex items-center gap-3">
                  <Badge>{featured.category}</Badge>
                  <span className="label-caps text-text-muted">Editor&apos;s pick</span>
                </div>
                <h2 className="text-2xl sm:text-3xl">{featured.title}</h2>
                <p className="mt-4 text-text-secondary">{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-3 text-sm text-text-muted">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light font-semibold text-primary dark:bg-primary/20">
                    {featured.authorInitials}
                  </span>
                  <div>
                    <p className="font-semibold leading-tight text-text-primary">{featured.author}</p>
                    <p className="text-xs">{formatDate(featured.date)} · {featured.readTime} min read</p>
                  </div>
                </div>
                <span className="mt-7 inline-flex items-center gap-2 font-semibold text-primary">
                  Read article <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
            </motion.div>
          ) : null}

          {rest.length ? (
          <div className="grid gap-x-7 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, index) => (
              <motion.article
                key={post.id}
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.15), ease: EASE_EXPO }}
              >
                <Link to={`/blog/${post.slug}`} className="group block">
                  <div className="overflow-hidden rounded-lg bg-surface">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="pt-5">
                    <div className="flex items-center justify-between gap-3">
                      <Badge>{post.category}</Badge>
                      <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
                        <Clock3 className="h-3.5 w-3.5" /> {post.readTime} min
                      </span>
                    </div>
                    <h3 className="mt-4 line-clamp-2 text-xl transition-colors group-hover:text-primary">{post.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-text-secondary">{post.excerpt}</p>
                    <p className="mt-4 text-xs font-medium text-text-muted">
                      {post.author} · {formatDate(post.date)}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
          ) : !featured ? (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface px-6 text-center">
              <BookOpen className="h-8 w-8 text-text-muted" />
              <h2 className="mt-4 text-xl">No articles found</h2>
              <p className="mt-2 text-sm text-text-secondary">Try a different search or choose another category.</p>
              <Button type="button" variant="outline" className="mt-5" onClick={() => { setQuery(''); setCategory('All'); }}>
                Clear filters
              </Button>
            </div>
          ) : null}

          <form
            onSubmit={handleSubmit(onSubscribe)}
            className="mt-16 grid gap-6 rounded-lg border border-border bg-surface p-6 sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:items-end"
          >
            <div>
              <span className="label-caps text-primary">Briefing</span>
              <h2 className="mt-2 text-2xl">Useful ideas, occasionally delivered</h2>
              <p className="mt-2 text-sm text-text-secondary">No daily noise. Just product, engineering, and infrastructure notes worth keeping.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <Input
                type="email"
                placeholder="you@company.com"
                aria-label="Work email"
                error={errors.email?.message}
                {...register('email')}
              />
              <Button type="submit" variant="accent" loading={isSubmitting} className="shrink-0 sm:w-36">
                Subscribe
              </Button>
            </div>
          </form>
        </PageContainer>
      </Section>
    </>
  );
}
