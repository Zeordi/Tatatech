# AGENTS.md

## Cursor Cloud specific instructions

TATATECH is a single, 100% client-side React 19 + Vite marketing website (no backend, database, API, or `.env`). All "backend" behavior (form submissions, content) is mocked in-memory under `src/data/sources/*`.

Standard commands live in `package.json` (`dev`, `build`, `lint`, `preview`); prefer those. Notes:

- Run the app in dev with `npm run dev` (Vite dev server on port `5173`). Use `npm run dev -- --host` if you need it reachable on the VM network interface.
- `npm run lint` (oxlint) currently reports pre-existing `react-hooks(rules-of-hooks)` errors in a few page components and some fast-refresh warnings. These are pre-existing and unrelated to environment setup; the lint command itself runs fine.
- No test framework is configured (no `test` script). "End-to-end testing" means exercising the running SPA in a browser (e.g. submit the Contact form and confirm the "Message sent" success state; toggle light/dark theme).
- Theme persists via the `localStorage` key `tatatech-theme`.
