# TATATECH Website

Production-ready corporate website for TATATECH — a full-service digital technology company based in Alexandria, Virginia.

## Stack

- React 19 + Vite
- Tailwind CSS v3 (class-based dark mode)
- React Router v7
- Framer Motion
- Lucide React
- React Hook Form + Zod
- React Helmet Async

## Architecture

Clean layered architecture:

- `src/app` — providers & router
- `src/domain` — entities & use cases
- `src/data` — repositories & mock sources
- `src/presentation` — UI components, pages, hooks

Data flow: **page → usecase → repository → source**

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Theme

Light/dark mode persists in `localStorage` (`tatatech-theme`) and respects `prefers-color-scheme` on first visit.
