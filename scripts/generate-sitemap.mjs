#!/usr/bin/env node
/* Generates public/sitemap.xml from the verified route/data sources. */
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildRoutes } from './lib/routes.mjs';
import { blogData } from '../src/data/sources/content.json.js';

const SITE_URL = 'https://tatatech.net';

const blogDates = new Map(blogData.map((b) => [b.slug, b.date]));
const routes = buildRoutes();

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((r) => {
    const slug = r.split('/').pop();
    const lastmod = blogDates.get(slug) ? blogDates.get(slug) : null;
    const loc = `${SITE_URL}${r === '/' ? '/' : r}`;
    return `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
  }),
  '</urlset>',
  '',
].join('\n');

const outDir = resolve(fileURLToPath(import.meta.url), '../../public');
writeFileSync(`${outDir}/sitemap.xml`, xml, 'utf8');
console.log(`Wrote ${routes.length} URLs to public/sitemap.xml`);
