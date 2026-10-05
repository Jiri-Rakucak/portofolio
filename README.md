# Jiri Rakucak Portfolio

Personal portfolio and experimental "DevOS" web experience. The project is currently frontend-first: a modern React/Vite application with an ASP.NET backend shell kept for future API work.

## Current Status

- Frontend is the active product surface.
- Backend is intentionally parked and should not drive current decisions.
- Legacy Visual Studio generated files were removed from version control.
- Package management is standardized on npm.
- React Router remains the routing layer, updated to the current v7 package model.
- Bilingual content is now handled in-app through JSON resources, without `/en` or `/cs` route prefixes.

## Tech Stack

Frontend:

- React 19
- TypeScript 6
- Vite 8
- React Router 7
- i18next / react-i18next
- styled-components 6
- Three.js with React Three Fiber and Drei
- ESLint 10 with React Hooks rules

Backend:

- ASP.NET project shell currently targeting .NET 9
- Contains template/demo code and is not part of the active workflow
- If backend work becomes necessary, upgrade it to the latest stable LTS first

## Repository Structure

```text
.
├── web.client/        # Active React/Vite frontend
├── Web.Server/        # Parked ASP.NET backend shell
├── docs/              # Project context for future development sessions
├── AGENTS.md          # Instructions for coding agents working in this repo
├── Web.sln            # Visual Studio solution
└── README.md          # Main project entry point
```

## Frontend Commands

Run from `web.client/`:

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
npm audit
```

Current local dev URL:

```text
https://localhost:60522/
```

## Development Notes

- Do not use Yarn or pnpm unless the package manager decision is explicitly changed.
- Keep `package-lock.json` as the only frontend lockfile.
- Avoid committing generated directories such as `.vs/`, `bin/`, `obj/`, `dist/`, and `node_modules/`.
- The DevOS and Three.js scene are lazy-loaded to keep the main bundle smaller.
- Portfolio projects and services are loaded from localized JSON resources through `web.client/src/content/`.
- The mobile home layout is still placeholder-quality and needs product/design work.
- The backend still includes template WeatherForecast code and should be treated as inactive.

## Content Model

Project and service metadata are centralized in localized JSON resources:

- `web.client/src/i18n/locales/en/content.json`
- `web.client/src/i18n/locales/cs/content.json`

Typed access helpers live in:

- `web.client/src/content/projects.ts`
- `web.client/src/content/services.ts`

Owner contacts and social URLs are centralized in `web.client/src/content/contact.ts`. The desktop homepage introduces Jiří Rakučák in both languages, keeps projects as the primary action, and retains the atom as a lazy-loaded interactive visual. Further homepage project/skills polish and the mobile redesign remain separate next steps.

The JSON shape is intentionally close to what a future admin UI, backend API, CMS, or local content editor could provide. When admin functionality becomes useful, the project can replace the static JSON imports with fetched content while keeping the consuming UI mostly unchanged.

The DevOS Explorer, Browser, ProjectWindow, About Me document, service directory, and detailed service pages already consume localized content for project discovery, previews, mini case-study views, profile copy, and service copy. Project entries can include optional `caseStudy` content for deeper storytelling. Starbounder, the Unity graduation prototype, has a source-backed case study, a real cover, personal motivation, and a five-image public gallery. See [source notes](docs/STARBOUNDER.md) for its scope and verification limits.

General UI translations live in `web.client/src/i18n/locales/*/common.json`; DevOS-specific UI, terminal output, and About Me profile copy live in `web.client/src/i18n/locales/*/devos.json`. Language selection is stored in `localStorage` and exposed through Preferences.

## Routes

Canonical frontend routes use lowercase paths:

- `/projects`
- `/projects/:projectId`
- `/services`
- `/services/frontend-development`
- `/services/game-and-3d-graphics`
- `/services/backend-and-systems`
- `/services/ux-ui-design`
- `/services/consulting`
- `/devos`

Legacy mixed-case routes redirect to the lowercase equivalents.

## Documentation Index

- [Frontend README](web.client/README.md)
- [Project Context](docs/CONTEXT.md)
- [Agent Instructions](AGENTS.md)

## Next Recommended Work

1. Replace placeholder mobile layout with the real portfolio experience.
2. Expand real portfolio content, case studies, services, and contact flow.
3. Add more tests for shared hooks, routing guards, and core UI behavior.
4. Improve remaining DevOS apps such as Games and Lab.
5. Decide whether the backend is needed; if yes, upgrade it to the latest stable LTS.
