import { Helmet } from 'react-helmet-async';
import { buildPageMeta } from '../../utils/seo.js';

export function usePageMeta({ title, description, path, image, imageAlt, structuredData, noindex }) {
  const meta = buildPageMeta({ title, description, path, image, imageAlt });

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {noindex ? <meta name="robots" content="noindex,nofollow" /> : null}
      <link rel="canonical" href={meta.url} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={meta.url} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:image:alt" content={meta.imageAlt} />
      <meta property="og:site_name" content={meta.siteName} />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      {structuredData
        ? structuredData.map((data, index) => (
            <script key={index} type="application/ld+json">{`${JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026')}`}</script>
          ))
        : null}
    </Helmet>
  );
}
