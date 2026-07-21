import { Helmet } from 'react-helmet-async';
import { buildPageMeta } from '../../utils/seo.js';

export function usePageMeta({ title, description, path, image }) {
  const meta = buildPageMeta({ title, description, path, image });

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.url} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={meta.url} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:site_name" content={meta.siteName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
    </Helmet>
  );
}
