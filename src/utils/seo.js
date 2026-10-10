import { SITE } from './constants.js';

export const SITE_URL = 'https://tatatech.net';
export const OG_IMAGE = `${SITE_URL}/og-default.svg`;

export function buildPageMeta({
  title,
  description,
  path = '/',
  image = OG_IMAGE,
  imageAlt,
}) {
  const siteName = SITE.name;
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    url,
    image,
    imageAlt: imageAlt ?? title,
    siteName,
  };
}

export function escForJson(value) {
  if (!value) return '';
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/"/g, '\\"');
}

export function jsonLd(obj) {
  return JSON.stringify(obj).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE_URL,
    logo: `${SITE_URL}/TATA.png`,
    sameAs: [
      SITE.social.linkedin,
      SITE.social.x,
      SITE.social.facebook,
      SITE.social.instagram,
      SITE.social.tiktok,
      SITE.social.youtube,
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: SITE.email,
        telephone: SITE.phone.replace(/[^\d+]/g, ''),
        contactType: 'customer service',
        availableLanguage: ['en'],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '5100 Leesburg Pike Ste 306',
      addressLocality: 'Alexandria',
      addressRegion: 'VA',
      postalCode: '22302',
      addressCountry: 'US',
    },
    areaServed: 'US',
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildArticleSchema(post, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/TATA.png`,
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    timeRequired: `PT${post.readTime}min`,
    url,
  };
}

export const ROUTES = {
  home: '/',
  services: '/services',
  portfolio: '/portfolio',
  apps: '/apps',
  about: '/about',
  pricing: '/pricing',
  blog: '/blog',
  contact: '/contact',
  support: '/support',
  careers: '/careers',
  privacy: '/privacy',
  terms: '/terms',
};
