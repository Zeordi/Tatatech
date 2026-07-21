import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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

const newsletterSchema = z.object({
  email: z.string().email('Enter a valid email'),
});

export function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState('All');
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
  const filtered =
    category === 'All' ? posts : posts.filter((p) => p.category === category);
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
      <div className="border-b border-border bg-surface py-12 md:py-16">
        <PageContainer>
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Blog' }]} />
          <h1>Insights & Updates</h1>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={cn(
                  'min-h-11 rounded-full px-4 py-2 text-sm font-semibold',
                  category === item
                    ? 'bg-primary text-white'
                    : 'border border-border text-text-secondary hover:border-primary',
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
            <Link
              to={`/blog/${featured.slug}`}
              className="mb-12 grid overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition hover:border-primary/40 hover:shadow-lg md:grid-cols-2"
            >
              <img
                src={featured.image}
                alt={featured.title}
                className="aspect-video h-full w-full object-cover md:aspect-auto"
              />
              <div className="flex flex-col justify-center p-6 lg:p-8">
                <Badge className="mb-3 w-fit">{featured.category}</Badge>
                <h2 className="text-2xl lg:text-3xl">{featured.title}</h2>
                <p className="mt-3 text-text-secondary">{featured.excerpt}</p>
                <div className="mt-5 flex items-center gap-3 text-sm text-text-muted">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light font-semibold text-primary dark:bg-primary/20">
                    {featured.authorInitials}
                  </span>
                  <span>
                    {featured.author} · {formatDate(featured.date)} · {featured.readTime} min
                  </span>
                </div>
              </div>
            </Link>
          ) : null}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {rest.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-xl border border-border bg-background shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="aspect-video w-full object-cover"
                />
                <div className="p-5">
                  <Badge className="mb-3">{post.category}</Badge>
                  <h3 className="line-clamp-2 text-lg">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-text-secondary">{post.excerpt}</p>
                  <p className="mt-4 text-xs text-text-muted">
                    {post.author} · {formatDate(post.date)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <form
            onSubmit={handleSubmit(onSubscribe)}
            className="mt-16 rounded-2xl bg-surface p-6 md:p-8"
          >
            <h2 className="text-2xl">Get insights in your inbox</h2>
            <p className="mt-2 text-text-secondary">
              Occasional updates on product, engineering, and infrastructure.
            </p>
            <div className="mt-5 flex flex-col gap-3 lg:flex-row">
              <Input
                type="email"
                placeholder="you@company.com"
                error={errors.email?.message}
                {...register('email')}
              />
              <Button type="submit" variant="accent" loading={isSubmitting} className="lg:w-40">
                Subscribe
              </Button>
            </div>
          </form>
        </PageContainer>
      </Section>
    </>
  );
}
