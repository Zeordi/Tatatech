import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Link2 } from 'lucide-react';
import {
  getBlogPostBySlug,
  getRelatedPosts,
} from '../../domain/usecases/getContent.js';
import { formatDate } from '../../utils/formatters.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { Breadcrumbs } from '../components/layout/Breadcrumbs.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { Section } from '../components/layout/Section.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { LinkedInIcon, XIcon } from '../components/shared/SocialIcons.jsx';

export function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    Promise.all([getBlogPostBySlug(slug), getRelatedPosts(slug)]).then(
      ([item, others]) => {
        setPost(item);
        setRelated(others);
      },
    );
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!post) {
    return (
      <PageContainer className="py-24">
        <p className="text-text-secondary">Loading article…</p>
      </PageContainer>
    );
  }

  const shareUrl = `https://tatatech.net/blog/${post.slug}`;

  return (
    <>
      {usePageMeta({
        title: post.title,
        description: post.excerpt,
        path: `/blog/${post.slug}`,
        image: post.image,
      })}
      <div
        className="fixed left-0 top-0 z-[60] h-1 bg-primary transition-[width]"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      <Section className="!pt-10">
        <PageContainer className="relative max-w-3xl">
          <aside className="absolute -left-24 top-32 hidden flex-col gap-3 xl:flex">
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Share on X"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-text-secondary hover:text-primary"
            >
              <XIcon className="h-4 w-4" />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Share on LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-text-secondary hover:text-primary"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <button
              type="button"
              aria-label="Copy link"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-text-secondary hover:text-primary"
              onClick={() => navigator.clipboard?.writeText(shareUrl)}
            >
              <Link2 className="h-4 w-4" />
            </button>
          </aside>

          <Breadcrumbs
            items={[
              { label: 'Home', path: '/' },
              { label: 'Blog', path: '/blog' },
              { label: post.title },
            ]}
          />
          <Badge className="mb-4">{post.category}</Badge>
          <h1>{post.title}</h1>
          <div className="mt-5 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light font-semibold text-primary dark:bg-primary/20">
              {post.authorInitials}
            </span>
            <div className="text-sm">
              <p className="font-semibold text-text-primary">{post.author}</p>
              <p className="text-text-muted">
                {formatDate(post.date)} · {post.readTime} min read
              </p>
            </div>
          </div>
          <img
            src={post.image}
            alt={post.title}
            className="mt-8 aspect-video w-full rounded-2xl object-cover"
          />
          <article
            className="prose-content mt-10 dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 rounded-xl border border-border bg-surface p-6">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-lg font-bold text-primary dark:bg-primary/20">
                {post.authorInitials}
              </span>
              <div>
                <p className="font-heading text-lg font-bold">{post.author}</p>
                <p className="text-sm text-text-secondary">{post.authorRole}</p>
              </div>
            </div>
          </div>

          <h2 className="mb-6 mt-12 text-2xl">Related posts</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {related.map((item) => (
              <Link key={item.id} to={`/blog/${item.slug}`} className="group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="aspect-video w-full rounded-xl object-cover"
                />
                <h3 className="mt-3 text-base group-hover:text-primary">{item.title}</h3>
              </Link>
            ))}
          </div>
        </PageContainer>
      </Section>
    </>
  );
}
