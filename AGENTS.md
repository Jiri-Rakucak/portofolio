# Agent Instructions

This repository is a personal portfolio project with an experimental DevOS-style frontend. Treat the React frontend as the active product and the ASP.NET backend as parked until the owner explicitly asks for backend work.

## Working Rules

- Keep all code and code comments in English.
- Prefer small, focused files under 500 lines.
- Follow the existing React/Vite/styled-components patterns unless a change has a clear payoff.
- Do not commit or push unless explicitly requested.
- Do not revert user changes or unrelated work.
- Use npm for frontend dependencies. Do not add Yarn or pnpm lockfiles.
- Keep generated files out of version control.

## Active Stack

Frontend:

- React 19
- TypeScript 6
- Vite 8
- React Router 7
- i18next / react-i18next
- styled-components 6
- Three.js / React Three Fiber / Drei
- ESLint 10

Backend:

- ASP.NET shell only
- Not part of the current active workflow
- Upgrade to the latest stable LTS before real backend work

## Commands

Run frontend commands from `web.client/`:

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
npm audit
```

Do not run backend upgrades or backend migrations unless the task specifically asks for backend work.

## Routing Notes

- Router setup lives in `web.client/src/Routes/AppRoutes.tsx`.
- `RouterProvider` is imported from `react-router/dom`.
- `createBrowserRouter`, `Link`, `Navigate`, `Outlet`, and `ScrollRestoration` are imported from `react-router`.
- `src/Routes/DevOsRoute.tsx` exists to keep DevOS dependencies lazy-loaded.
- New canonical routes should use lowercase URL paths. Keep redirects only for legacy paths that may already be linked.

## Performance Notes

- DevOS and the Three.js scene are intentionally split into separate lazy chunks.
- Do not reintroduce static imports from route setup to DevOS or Three.js modules.
- Large Three.js chunks are acceptable when isolated from the initial bundle.

## Testing Expectations

Vitest is configured for frontend unit tests. For new functionality, add focused tests when practical:

- expected behavior
- edge case
- error case

Current tests cover the central content model in `web.client/src/content/__tests__/`.

## Content Model

Use `web.client/src/content/` as the source of truth for portfolio metadata:

- `projects.ts` for typed project access and DevOS project file entries
- `services.ts` for typed service access, service directory cards, and detailed service pages

Localized source data lives in:

- `web.client/src/i18n/locales/en/content.json`
- `web.client/src/i18n/locales/cs/content.json`

Keep project and service IDs aligned across locales.

Projects may include optional `caseStudy` content with `summary`, `problem`, `solution`, `outcome`, `lessons`, `sections`, and `assets`. ProjectWindow renders this when present. `unity-graduation-game` is currently a placeholder shell for the Unity graduation project; do not invent gameplay details without source material.

Do not duplicate project/service metadata inside components. If future admin functionality is introduced, preserve the content shape and swap the static exports for API-backed data.

## Localization Notes

- Use `i18next` and `react-i18next` for UI text.
- Do not add `/en` or `/cs` route prefixes unless explicitly requested.
- General UI strings belong in `web.client/src/i18n/locales/*/common.json`.
- DevOS-only UI strings, terminal output, About Me profile copy, and Component Lab copy belong in `web.client/src/i18n/locales/*/devos.json`.
- Language selection is stored in `localStorage` under `portfolio.locale` and controlled from Preferences.

## Documentation Map

- `README.md`: main project overview
- `web.client/README.md`: frontend workflow and structure
- `docs/CONTEXT.md`: current state, decisions, and next work
- `AGENTS.md`: instructions for coding agents

## Known Project State

- Mobile layout is still placeholder-quality.
- Several pages and DevOS apps are still prototype/demo quality.
- Service forms are hidden until a real backend or form provider exists.
- Backend still contains template WeatherForecast code.
- The project has been cleaned of Visual Studio generated metadata and build artifacts.
