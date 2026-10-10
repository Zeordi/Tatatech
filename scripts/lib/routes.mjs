import { servicesData } from '../../src/data/sources/services.json.js';
import { projectsData } from '../../src/data/sources/projects.json.js';
import { blogData } from '../../src/data/sources/content.json.js';

export const STATIC_ROUTES = [
  '/',
  '/services',
  '/portfolio',
  '/apps',
  '/about',
  '/pricing',
  '/blog',
  '/contact',
  '/support',
  '/careers',
  '/privacy',
  '/terms',
];

export function buildRoutes() {
  const routes = [...STATIC_ROUTES];
  for (const s of servicesData) routes.push(`/services/${s.slug}`);
  for (const p of projectsData) routes.push(`/portfolio/${p.slug}`);
  for (const b of blogData) routes.push(`/blog/${b.slug}`);

  const seen = new Set();
  return routes.filter((r) => {
    if (seen.has(r)) return false;
    seen.add(r);
    return true;
  });
}
