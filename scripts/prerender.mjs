#!/usr/bin/env node
/*
 * Static prerenderer for the TATATECH SPA.
 *
 * Runs AFTER `vite build`. It serves the production build from dist/ over a
 * local HTTP server with SPA fallback (so React Router can match every route
 * client-side), then drives headless Chromium to render each route to its
 * fully-populated DOM (actual page content + react-helmet-async <head> tags),
 * and writes the result to dist/<route>/index.html.
 *
 * Readiness is detected from real conditions (meaningful main content present
 * and the intro boot overlay dismissed), NOT a synthetic render-complete event.
 *
 * The client app keeps its existing createRoot().render() mount; the prerendered
 * markup is static HTML for crawlers, progressively enhanced on the client.
 */
import { readFileSync, writeFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { resolve, join, extname, parse } from 'node:path';
import { fileURLToPath } from 'node:url';
import http from 'node:http';
import puppeteer from 'puppeteer';
import { buildRoutes } from './lib/routes.mjs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST = resolve(__dirname, '../dist');
const PORT = process.env.PRERENDER_PORT || 4173;
const ORIGIN = `http://localhost:${PORT}`;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

function serveFile(res, filePath) {
  if (!existsSync(filePath) || statSync(filePath).isDirectory()) return false;
  const data = readFileSync(filePath);
  res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
  res.end(data);
  return true;
}

function shellPath() {
  const from200 = join(DIST, '200.html');
  if (existsSync(from200)) return from200;
  return join(DIST, 'index.html');
}

const server = http.createServer((req, res) => {
  const urlPath = new URL(req.url || '/', 'http://x').pathname;
  const filePath = join(DIST, urlPath);

  if (urlPath === '/' || urlPath === '/index.html') {
    if (serveFile(res, join(DIST, 'index.html'))) return;
  }

  if (serveFile(res, filePath)) return;

  // SPA fallback: serve the clean shell so React Router can render the route.
  serveFile(res, shellPath());
});

function startServer() {
  return new Promise((resolveP) => {
    server.listen(PORT, '127.0.0.1', () => resolveP());
  });
}

const routes = buildRoutes();
console.log(`[prerender] routes: ${routes.length}`);
console.log(`[prerender] routes: ${routes.join(' | ')}`);

// Preserve the clean SPA shell produced by Vite. The prerendered home page will
// later overwrite dist/index.html; this clean shell is kept as dist/200.html so
// the production host can use it as the SPA fallback (and so the prerender run
// itself can fall back to a clean shell even if dist/index.html is already the
// prerendered home from a previous run).
const shellFile = existsSync(join(DIST, '200.html'))
  ? join(DIST, '200.html')
  : join(DIST, 'index.html');
const shellHtml = readFileSync(shellFile, 'utf8');

await startServer();
console.log(`[prerender] local server on ${ORIGIN}`);

// Resolve the Chrome executable with a deterministic priority:
//   1. PUPPETEER_EXECUTABLE_PATH (explicit override, e.g. a system Chrome)
//   2. puppeteer's downloaded Chromium (used by `puppeteer.executablePath()`)
//   3. common system Chrome/Chromium paths shipped by the runtime image
//   4. undefined -> let Puppeteer fall back to its bundled default
//
// On Vercel the build image provides Chromium only if its shared-library
// dependencies are installed (see vercel.json build command / .puppeteerrc),
// so the executable itself is resolved here and the OS libs are provisioned
// separately to avoid the "Failed to launch the browser process: Code: 127"
// / "libnspr4.so: cannot open shared object file" failure.
function resolveChromePath() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;
  try {
    const fromPuppeteer = puppeteer.executablePath();
    if (fromPuppeteer && statSync(fromPuppeteer).isFile()) return fromPuppeteer;
  } catch {}
  for (const candidate of [
    '/opt/google/chrome/chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/local/bin/chromium',
    '/snap/bin/chromium',
  ]) {
    try {
      if (statSync(candidate).isFile()) return candidate;
    } catch {}
  }
  return undefined;
}

const executablePath = resolveChromePath();
console.log(`[prerender] chrome executable: ${executablePath || 'default (puppeteer bundled)'}`);

const browser = await puppeteer.launch({
  executablePath,
  headless: 'new',
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--font-render-hinting=none',
  ],
});

const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });

// Block image requests: static HTML/markup (with src + alt) is what matters for
// crawlers, and this avoids sandbox TLS noise on remote image hosts and lets
// networkidle0 settle quickly.
await page.setRequestInterception(true);
page.on('request', (req) => {
  if (req.resourceType() === 'image') {
    req.abort().catch(() => {});
  } else {
    req.continue().catch(() => {});
  }
});

const errors = [];
page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
page.on('console', (msg) => {
  if (msg.type() !== 'error') return;
  const text = msg.text();
  if (
    text.includes('Failed to load resource') ||
    text.includes('net::ERR_') ||
    text.includes('ERR_CERT')
  ) {
    return;
  }
  errors.push(`console: ${text}`);
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Capture all routes into memory first. The static server still serves the
// clean dist/index.html shell as the SPA fallback while capturing, so no route
// accidentally inherits another route's prerendered metadata.
const captures = {};

for (const route of routes) {
  const url = `${ORIGIN}${route}`;
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForFunction(
      () => {
        const boot = document.querySelector('[aria-label="Skip intro"]');
        if (boot) return false;
        const mainText =
          document.querySelector('main')?.textContent ||
          document.body.textContent ||
          '';
        return mainText.length > 100;
      },
      { timeout: 12000 },
    );
    // Let entrance/odometer animations settle so captured numbers are final.
    await sleep(1200);

    captures[route] = await page.content();
    const len = captures[route].length;
    const outPath = route === '/' ? 'index.html' : `${route}/index.html`;
    console.log(`[prerender] captured ${outPath} (html=${len} bytes)`);
  } catch (e) {
    console.error(`[prerender] FAILED ${route}: ${e && e.message ? e.message : e}`);
    errors.push(`route ${route}: ${e && e.message ? e.message : e}`);
  }
}

await browser.close();

// Keep a copy of the clean shell for SPA fallback, then write prerendered pages.
writeFileSync(join(DIST, '200.html'), shellHtml, 'utf8');
console.log('[prerender] wrote 200.html (SPA fallback shell)');

for (const route of routes) {
  if (!(route in captures)) continue;
  const outPath = route === '/' ? 'index.html' : `${route}/index.html`;
  const dir = parse(outPath).dir;
  if (dir && dir !== '.') mkdirSync(join(DIST, dir), { recursive: true });
  const out = join(DIST, outPath);
  writeFileSync(out, captures[route], 'utf8');
}

server.close();
console.log(`[prerender] done. errors=${errors.length}`);
if (errors.length) {
  console.error('[prerender] errors:');
  for (const e of errors) console.error('  -', e);
}
