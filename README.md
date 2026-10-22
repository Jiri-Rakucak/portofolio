# Jiří Rakučák | Portfolio

A personal portfolio built with React and TypeScript, combining bilingual project case studies with an interactive Three.js homepage and an experimental desktop environment called **DevOS**.

This is both the source of my portfolio and a place to explore frontend architecture, accessible interactions, and real-time graphics. The public website is the main product; DevOS is an ongoing experiment.

[Getting Started](#getting-started) · [Technical Decisions](#technical-decisions) · [Project Structure](#project-structure) · [Documentation](#documentation)

## Highlights

- **English and Czech:** localized interface and project content, with language switching on the same URLs.
- **Project case studies:** structured stories, technologies, screenshots, and a keyboard-accessible image viewer.
- **Responsive homepage:** shared project and skill sections, a text-first mobile introduction, and an optional desktop atom scene with bounded mouse tilt and reduced-motion support.
- **Personal preferences:** system/light/dark themes, with separate custom color palettes saved for each theme.
- **Shared content:** the website and DevOS Explorer, Browser, Terminal, and project windows read from the same typed content model.
- **DevOS:** draggable and resizable windows, a taskbar, project discovery, a portfolio CLI, and a component lab.

## Built With

| Area | Technologies |
| --- | --- |
| Application | React 19, TypeScript 6, Vite 8 |
| Navigation | React Router 7 |
| Styling and localization | styled-components 6, i18next, react-i18next |
| Graphics | Three.js, React Three Fiber, Drei, React Spring |
| Quality | Vitest, ESLint 10, TypeScript checks |

The ASP.NET shell in `Web.Server/` is parked. The portfolio runs as a static frontend and does not need a backend, database, or API keys.

## Technical Decisions

**One content model, multiple views.** Localized JSON holds project and skill content; typed accessors keep public pages and DevOS consumers aligned. Adding a project does not require adding a route or copying metadata into components.

**Keep optional graphics optional.** DevOS and the Three.js scene have separate lazy boundaries. The homepage scene has an error boundary, so a rendering failure does not remove navigation or the introduction. Orbital timing uses elapsed time rather than display refresh rate.

**Use browser primitives.** Navigation uses native buttons and links. Preferences and the image viewer use native dialogs for modal focus containment. The theme selector uses grouped radio inputs; language controls expose their selected state.

**Respect motion and loading preferences.** Reduced motion disables homepage animation and CSS/view transitions. Images reserve their layout space, load lazily below the fold, and have accessible failure states. Above-the-fold project covers receive explicit loading-priority hints.

**Make the static deployment explicit.** Browser metadata is localized per route. Deployment templates handle SPA deep links, static-asset errors, and caching; uploads publish assets before the HTML entry point and retain older lazy chunks.

## Getting Started

Requirements: **Node.js 20.19+ and npm**, using a version supported by the installed Vite release.

From the repository root:

```bash
cd web.client
npm ci
npm run dev
```

The default port is **60522**. Use the URL printed by Vite: normally `http://localhost:60522/`, or HTTPS when existing local development PEM certificates are available. Set `DEV_HTTPS=false` to force HTTP or `DEV_SERVER_PORT` to change the port.

No .NET SDK or development certificates are needed to build the frontend.

### Checks and Build

Run from `web.client/`:

```bash
npm run lint
npm run test
npm run build
npm run preview
```

The build produces `web.client/dist/`. `npm run preview` serves that build locally; it is not the production hosting setup. Run `npm audit` separately to check dependency advisories.

Tests cover content consistency, route metadata, component markup, theme persistence, motion math and lifecycle policy, and deployment sequencing with fake transports. They do not replace browser, WebGL, or device testing.

## Project Structure

```text
web.client/
  src/
    Components/    Public UI, preferences, DevOS, and Three.js scene
    Pages/         Homepage, projects, skills, and fallback pages
    content/       Typed access to shared portfolio data
    i18n/          English/Czech UI and content JSON
    metadata/      Route-aware browser metadata
    styles/        Theme state, tokens, and shared styles
  public/          Project screenshots, favicon, and font attribution
  tests/           Node-only deployment tests
deploy/            Static-host configuration and upload script
docs/              Development context, source notes, and deployment guide
Web.Server/        Inactive ASP.NET shell
```

For content edits, start with `web.client/src/i18n/locales/{en,cs}/content.json`. Keep project IDs aligned across languages. Contact details live in `web.client/src/content/contact.ts`.

## Current Status

The public portfolio has an initial responsive implementation across mobile and desktop. Narrow project layouts separate media from text, and the carousel supports touch gestures alongside buttons and keyboard navigation. Shared action styles keep public CTAs consistent. Device testing and visual refinements remain in progress. Parts of DevOS and the login/admin routes are prototypes, not a working authentication or content-management system.

Desktop appearance and keyboard operation have been manually reviewed. Native browser verification of the latest motion/media changes and broader device coverage remain ongoing. Route-specific prerendering and permanent social-sharing metadata are not implemented yet.

## Related Work

- [Personal Conversation RAG](https://github.com/Jiri-Rakucak/ragsystem): local-first retrieval over conversation exports and notes, featured in the portfolio.
- [Starbounder](https://jirirakucak.itch.io/starbounder): a 2D Unity graduation prototype, presented as a project case study rather than a finished game.

## Documentation

- [Frontend Guide](web.client/README.md): workflow, content model, localization, and implementation details.
- [Deployment](docs/DEPLOYMENT.md): domain-independent hosting templates, upload procedure, and browser checks.
- [Project Context](docs/CONTEXT.md): current decisions, verification limits, and next work.
- [Starbounder Notes](docs/STARBOUNDER.md): case-study sources and prototype scope.
- [Agent Instructions](AGENTS.md): repository conventions for coding assistants.
- [Publication Checklist](docs/PUBLICATION.md): checks before changing repository visibility.

## Credits and Licensing

The JR favicon uses Inter glyph outlines; the [bundled Inter license](web.client/public/licenses/inter-OFL.txt) records the font attribution. Project screenshots are supporting material for their respective case studies.

A project-wide license has not been selected yet. The font license is not a license for the entire repository.
