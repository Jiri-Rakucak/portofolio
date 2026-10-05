# Jiri Rakucak Portfolio

Personal portfolio with bilingual project case studies, a mouse-responsive Three.js atom, and an experimental desktop-style experience called DevOS. The React/Vite frontend is the active product; the ASP.NET backend shell is reserved for possible future API work.

## Current Status

- Active work focuses on the public desktop portfolio. Mobile redesign and further DevOS work are deferred.
- The homepage follows introduction -> selected projects -> skills, using open sections rather than glass service cards.
- Starbounder and Personal Conversation RAG are the selected homepage projects. The unfinished DevOS portfolio is excluded from that selection.
- English and Czech content use JSON resources and in-app language switching, without `/en` or `/cs` route prefixes.
- Project/service metadata and owner contacts are centralized and shared across the public website and DevOS.
- The backend is inactive; public contact actions use direct links rather than unfinished forms.

## Current Features

- Personal introduction with project browsing as the primary action and DevOS as secondary.
- Lazy-loaded atom scene with smooth, bounded mouse tilt across the homepage hero. Mouse following respects reduced-motion/input preferences; DevOS retains its own drag controls.
- A right-aligned header without a logo, with Home in the dropdown, social links, and Preferences.
- Unframed project previews and a compact text-based skills section, with shared bounded angled transitions across public pages.
- Project carousel at `/projects` and data-driven case studies at `/projects/:projectId`.
- Starbounder: a 2D Unity graduation prototype with a real cover, personal motivation, five-image gallery, image viewer, technical notes, and prototype download link. It is not presented as a finished game.
- Personal Conversation RAG: a local-first Python retrieval project with a case study. Its preview still uses a placeholder gradient; answer generation is planned, not implemented.
- Localized skills directory and detail pages, plus shared email, phone, location, and social contacts.
- Experimental DevOS with draggable/resizable windows, project Explorer and Browser, an interactive portfolio Terminal, About Me, and Component Lab. Other apps remain partly demo-quality.

## Tech Stack

Frontend:

- React 19
- TypeScript 6
- Vite 8
- React Router 7
- i18next / react-i18next
- styled-components 6
- Three.js with React Three Fiber and Drei
- React Spring for atom animation
- Vitest for unit and server-rendered component tests
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
├── docs/              # Current context, project source notes, and ideas
├── AGENTS.md          # Instructions for coding agents working in this repo
├── Web.sln            # Visual Studio solution
└── README.md          # Main project entry point
```

## Frontend Commands

Requirements:

- Node.js `>=20.19.0` and npm.
- The Vite configuration loads local HTTPS PEM certificates. If they are missing, it invokes `dotnet dev-certs`; a .NET SDK must be available for that step. Running the backend itself is not required for the portfolio.

Start the frontend from the repository root:

```bash
cd web.client
npm install
npm run dev
```

The default local URL is [https://localhost:60522/](https://localhost:60522/). Set `DEV_SERVER_PORT` to use another port. Local HTTPS uses a development certificate that may need to be trusted by your browser.

Run quality checks from `web.client/`:

```bash
npm run lint
npm run test
npm run build
npm audit
```

## Development Notes

- Do not use Yarn or pnpm unless the package manager decision is explicitly changed.
- Keep `package-lock.json` as the only frontend lockfile.
- Avoid committing generated directories such as `.vs/`, `bin/`, `obj/`, `dist/`, and `node_modules/`.
- The DevOS and Three.js scene are lazy-loaded to keep the main bundle smaller.
- Production builds still warn about the large isolated Three.js chunk; it is not part of the initial application bundle.
- Portfolio projects and services are loaded from localized JSON resources through `web.client/src/content/`.
- Tests cover central content, homepage and project rendering, contacts, shared section styles, camera framing, mouse tilt, and event cleanup. They do not replace browser/WebGL visual verification.
- The backend still includes template WeatherForecast code and should be treated as inactive.

## Content Model

Project and service metadata are centralized in localized JSON resources:

- `web.client/src/i18n/locales/en/content.json`
- `web.client/src/i18n/locales/cs/content.json`

Typed access helpers live in:

- `web.client/src/content/projects.ts`
- `web.client/src/content/services.ts`

Owner contacts and social URLs are centralized in `web.client/src/content/contact.ts`.

Homepage project selection is controlled by `getHomeProjects` in `projects.ts`, independently of the general `featured` flag used elsewhere. It currently selects Starbounder first, then RAG. Descriptions, status labels, technologies, and covers come from the central content rather than component-local copies.

To replace RAG's placeholder, add its image under `web.client/public/projects/ragsystem/` and supply a `cover` with the same `src` and localized `alt` in both locale entries. The homepage and project carousel will use it automatically. See the [frontend guide](web.client/README.md) for content and gallery details.

The JSON shape is intentionally close to what a future admin UI, backend API, CMS, or local content editor could provide. When admin functionality becomes useful, the project can replace the static JSON imports with fetched content while keeping the consuming UI mostly unchanged.

Public project pages and DevOS Explorer, Browser, Terminal, and ProjectWindow consume the same project data. Optional `caseStudy` content supports the project story, motivation, lessons, technical sections, and media. See [Starbounder source notes](docs/STARBOUNDER.md) for the graduation prototype's scope and verification limits.

General UI translations live in `web.client/src/i18n/locales/*/common.json`; DevOS-specific UI, terminal output, About Me, and Component Lab copy live in `web.client/src/i18n/locales/*/devos.json`. Language selection is stored in `localStorage` under `portfolio.locale` and exposed through Preferences.

## Routes

Canonical frontend routes use lowercase paths:

- `/`
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

`/login` and `/admin` also exist, but still contain prototype/demo behavior. They are not a working content-management solution.

## Known Gaps

- Mobile home remains placeholder-quality; it will be redesigned after the desktop direction is settled.
- RAG still needs real preview media, an anonymized CLI example, an architecture visual, and measured indexing/search results.
- Automated browser verification of the hero, mouse interaction, gallery, and viewport layout remains pending. The current agent sandbox cannot bind the Vite port, and its Chromium installation lacks required shared libraries.
- The browser tab still uses the `DevOs` title and Vite favicon; portfolio/social metadata is not finished.
- Several DevOS apps and the login/admin flow remain prototypes.
- Contact forms, an admin editor, and API-backed content are future possibilities, not implemented features.

## Documentation Index

- [Frontend README](web.client/README.md)
- [Project Context](docs/CONTEXT.md)
- [Agent Instructions](AGENTS.md)
- [Starbounder Source Notes](docs/STARBOUNDER.md)
- [Ideas](docs/ideas.md): inspiration only, not a committed roadmap

## Next Recommended Work

1. Check the desktop experience in a browser and refine spacing and interaction based on the rendered UI.
2. Add real RAG media and concrete examples/results to its case study; consider a Starbounder gameplay clip later.
3. Finish the portfolio title, favicon, and sharing metadata.
4. Return to DevOS and replace the remaining demo behavior in a separate phase.
5. Redesign mobile after the desktop layout is settled.
6. Introduce a backend, forms, or an admin editor only when needed; upgrade the parked backend to the latest stable LTS before real backend work.
