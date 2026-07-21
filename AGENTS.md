# AGENTS.md

## Cursor Cloud specific instructions

TATATECH is a **frontend-only** React 19 + Vite SPA. There is no backend, database, or external service: all data comes from in-repo mock sources (`src/data/sources/*.json.js`) and forms (contact/quote, newsletter) are simulated in memory. No environment variables or secrets are required to run or test it.

Standard commands are defined in `package.json` (`dev`, `build`, `lint`, `preview`) and documented in `README.md`. Run the dev server with `npm run dev` — it serves on Vite's default port **5173** (not overridden in `vite.config.js`).

Notes:
- `npm run lint` (oxlint) reports a few pre-existing warnings/errors (e.g. conditional `usePageMeta` hook calls); these are not caused by environment setup.
- Requires Node 20.19+ / 22.12+ for Vite 8 (the VM's Node 22.x satisfies this).
- Client-side routing uses React Router; deep links (e.g. `/contact`) work under `npm run dev`.
