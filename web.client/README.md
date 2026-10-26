# Frontend

Active React/Vite frontend for the portfolio project.

For the project introduction, see the [public-facing root README](../README.md). This guide covers development and implementation details. Before making the source public, review the [publication checklist](../docs/PUBLICATION.md).

## Stack

- React 19
- TypeScript 6
- Vite 8
- React Router 7
- i18next / react-i18next
- styled-components 6
- Three.js, React Three Fiber, Drei
- ESLint 10

## Requirements

- Node.js `>=20.19.0`
- npm

## Commands

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
npm audit
```

The Vite dev server uses existing local HTTPS PEM certificates when available; otherwise it falls back to HTTP. It never generates certificates or invokes .NET. Builds are Node/npm-only. The default port is:

```text
http://localhost:60522/
# https://localhost:60522/ when local PEM certificates are present
```

Set `DEV_HTTPS=false` to force local HTTP, or `DEV_SERVER_PORT` to change the port. For static hosting and the versioned `deploy/upload.sh` / `deploy/nginx.conf` templates, see [Deployment](../docs/DEPLOYMENT.md). The old ignored `web.client/deploy.sh` is local legacy configuration, not the recommended upload path.

## Routing

Routes are defined in `src/Routes/AppRoutes.tsx`.

The app uses React Router 7 in Data Mode:

- `createBrowserRouter` from `react-router`
- `RouterProvider` from `react-router/dom`
- route elements remain component based for now

The DevOS route is lazy-loaded through `src/Routes/DevOsRoute.tsx` so its window manager and Three.js dependencies do not inflate the initial application bundle.

Canonical route paths are lowercase. Legacy mixed-case service and DevOS paths are kept as redirects in `src/Routes/AppRoutes.tsx`.

The project carousel is available at `/projects`. A single `/projects/:projectId` route resolves central project data, so adding a project does not require adding a route. Public details render the same optional case-study content as DevOS ProjectWindow.

## Important Folders

```text
src/
├── Auth/               # Route protection helpers
├── Components/
│   ├── Applications/   # DevOS window contents
│   ├── Desktop/        # Shared responsive home and optional desktop scene
│   ├── DevOS/          # Window manager and taskbar UI
│   ├── Settings/       # Theme settings controls
│   └── Shared/         # Actions, header, footer, forms, typography
├── Contexts/           # DevOS state
├── content/            # Central projects and services data
├── Hooks/              # Shared React hooks
├── i18n/               # Locale config and JSON translation resources
├── Layout/             # Main app layout
├── Pages/              # Route pages
├── Routes/             # Router setup
└── styles/             # Theme and global styles
```

## Performance Notes

- `DesktopHomeLayout` is the shared responsive composition, lazy-loaded from the home page despite its historical name. The separate mobile placeholder has been removed.
- `HomeHero` mounts `HeroScene` only above 1000px, using a live media-query subscription. Compact screens do not request the atom chunk unless it was previously loaded at a wider viewport. Widening the viewport mounts the optional scene without replacing homepage content.
- `AtomScene` is lazy-loaded by `HeroScene`.
- `/devos` is lazy-loaded as a separate route.
- The Three.js scene still creates a large chunk, but it is isolated from the main app bundle.
- The public hero follows reduced motion with a complete static atom and demand rendering. Hidden/offscreen heroes pause the frame loop and pointer tracking; visible full-motion heroes resume with bounded deltas and DPR capped at 1.5. DevOS keeps its own default frame loop, camera, and drag controls.
- Electron orbit speed uses elapsed time rather than display FPS. `Desktop/atomParticles.ts` initializes full trails for a correct first/static frame; `heroActivity.ts` owns visibility/frame policy. Shared `Hooks/useReducedMotion.ts` listens to live preference changes. Global reduced-motion CSS also disables route view transitions.
- `PortfolioImage` defaults to lazy/async decoding. The background detail cover and opened gallery image get eager/high hints; the inline preview and below-fold media stay lazy, and inactive carousel slides use low priority. Stable preview dimensions are unchanged. Browser heuristics may still preload nearby lazy images.

## Content Model

Portfolio projects and services are centralized as localized JSON resources:

- `src/i18n/locales/en/content.json`
- `src/i18n/locales/cs/content.json`

Typed helpers expose that data from `src/content/`:

- `projects.ts`: project metadata, case-study metadata, featured projects, curated homepage selection, DevOS file-system entries, and project lookup helpers
- `services.ts`: service metadata used by the homepage skills list and the service directory
- `contact.ts`: owner name, email, phone, city, and social URLs shared by public contact views and DevOS contact output

Keep new project/service metadata in the locale JSON first, then consume it through the helper functions. This avoids duplicate content between homepage sections, DevOS Explorer, Browser, ProjectWindow, Terminal, the service directory, and detailed service pages.

The shared introduction is rendered by `Components/Desktop/HomeHero.tsx`; its copy lives in `common.json`. Projects are the primary hero action. The atom uses `layout="hero"` only here; default DevOS framing is unchanged. Hero camera projection is implemented with Three.js `setViewOffset` and unit-tested independently of WebGL. The optional scene has an error boundary, so its render failures do not remove the introduction or navigation. At 1000px and below, the same copy becomes a left-aligned, text-first introduction without a live scene.

The homepage atom also follows the mouse with a bounded, damped tilt. `HeroPointerRotation` wraps the existing animated atom rather than replacing its rotation. `heroPointerEvents.ts` listens on the whole hero (including overlaid content), and `heroPointer.ts` maps client coordinates and uses Three.js `MathUtils.clamp`/`damp`. There is no per-frame React state update. Mouse follow respects reduced-motion/input preferences and resets when the pointer leaves or the viewport changes. OrbitControls remain exclusive to the default DevOS window layout.

The header has no logo; its right-aligned dropdown retains the Home link.

`HomeProjects` and `HomeSkills` follow the hero, using open layouts in `HomeSections.styles.ts` rather than service cards. The homepage selection is controlled by `getHomeProjects` in `content/projects.ts` (Starbounder, then RAG), independently of the general `featured` field. Missing selected entries are omitted, never replaced by DevOS.

RAG's owner-provided preview is `public/projects/ragsystem/ragsystem-preview.png`, referenced by `cover: { src, alt, presentation }` in both locale `content.json` files with localized alt text. The homepage and detail consume this central cover; the carousel uses RAG's neutral gray gradient rather than overlapping its own copy with the screenshot text. Gallery images remain separate `caseStudy.assets` entries. Shared fallback gradients live in `styles/projectMedia.ts` and still apply when a cover is missing or cannot load.

Angled content bands share `styles/angledSection.ts`, with a 48px desktop cut and a 32px narrow-screen cut. Consumers reserve top padding beyond `var(--section-cut)` so content is not clipped. Keep public skills/contact copy free of internal implementation notes; backend plans belong in documentation.

Edit owner contact values in `src/content/contact.ts`, not in individual components. Country wording belongs in `footer.location` in `common.json`, interpolating `city`; Terminal contact copy interpolates the same values from `devos.json`.

Optional project case-study fields are supported through the `caseStudy` object:

- `summary`
- `problem`
- `solution`
- `outcome`
- `lessons`
- `sections`
- `assets`

Use these for deeper project stories in DevOS ProjectWindow and public project pages. The `unity-graduation-game` entry presents Starbounder as a graduation prototype, with verified system descriptions and screenshots under `public/projects/unity-graduation-game/`. See [source notes](../docs/STARBOUNDER.md) before expanding its claims or adding a playable embed.

Public project pages support optional localized `cover`, `liveLabel`, and `caseStudy.motivation` metadata. Their gallery, native-dialog viewer, image fallback, and story rendering live in `src/Pages/ProjectsPages/`, separately from DevOS components. Screenshot thumbnails preserve the full frame; technical detail is expandable rather than duplicated in the hero and body.

The optional `cover.presentation` controls public project detail and carousel media:

- `background`: the cover fills the detail hero and carousel behind their copy, with the existing readability overlay. This is the backward-compatible default and Starbounder's explicit setting.
- `inline`: the detail hero uses the normal theme background; the full cover is shown below it, as the first section inside the angled content band. The preview uses a stable 16:9 area with `contain`, no text overlay, darkening, or decorative frame. The carousel omits the screenshot and uses the project gradient. This is RAG's setting.

At 900px and below, background-mode project details and carousel slides put a reserved 16:9 media area above their theme-colored text instead of overlaying it. Inline previews retain their separate detail section. The intro and all slides share overlapping grid cells; hidden slides still size the grid to the tallest content, keeping controls at a stable height without fixed pixel limits or text clipping. The dot row reserves its space even while hidden/inert on the intro, so arrows do not shift horizontally. Carousel controls move below the slide; touch swipes supplement buttons, dots, and arrow keys without intercepting vertical scroll. Desktop carousel height can grow for longer copy. No automatic slide rotation is used.

```json
"cover": {
  "src": "/projects/ragsystem/ragsystem-preview.png",
  "alt": "RAG interface preview with a search field and filters for ChatGPT conversations and notes.",
  "presentation": "inline"
}
```

Keep the path and presentation aligned across locale files and localize `alt`. Homepage cover rendering and DevOS ignore the presentation field and retain their existing layouts. Missing or whitespace-only cover sources render a text-only detail hero and a gradient carousel background; failed inline images use the existing accessible image fallback.

### Page Metadata

All existing routes are wrapped by the pathless `Layout/MetadataLayout.tsx`, which renders one metadata owner outside lazy page boundaries. Routes declare `handle.metadata` via the typed `metadataHandle` helper. The service route factory uses one service ID for both the page and its metadata.

- `src/metadata/pageMetadata.ts`: resolve matched-route metadata using the selected locale; project summaries and service descriptions come from the central content model.
- `src/metadata/PageMetadata.tsx`: observe router matches and the locale, then apply title/description/robots changes.
- `src/metadata/documentMetadata.ts`: reuse/create the managed head tags, remove duplicates of those tags, and leave author/theme/favicon and other metadata alone.
- `metadata` in locale `common.json`: directory/fallback titles and descriptions. No route prefixes or production URLs are introduced.

The fixed locale translator avoids a stale-language metadata update while `LanguageProvider` synchronizes global i18next. Missing pages/projects/services and login/admin get `noindex, follow`; normal public navigation restores `index, follow`. DevOS receives its own title/description but its UI and lazy loading are unchanged.

Tests cover localized resolution, central-content changes, missing IDs, real memory-router navigation, managed DOM API updates, duplicate-tag cleanup, and fallback alignment. Browser DOM integration remains to be checked in an unrestricted environment. The static `index.html` title/description stay as an English homepage fallback for initial loading or clients without JavaScript. This is not per-route SSR/prerendering, authorization, or HTTP status handling. Canonical/hreflang tags and Open Graph/social images are deferred until deployment details are supplied.

### Navigation and Preferences

Public page transitions use the browser's View Transitions API through React Router, with no extra animation dependency. Use `Components/Shared/PublicLink.tsx` for public internal navigation (already used by shared actions, header/footer, and home media links). It defaults to enabled only when the API exists and reduced motion is off; pass `viewTransition={false}` when leaving for DevOS/private routes. Normal Link props, refs, and navigation semantics are preserved.

`styles/pageTransitions.ts` centralizes a 200ms viewport crossfade. Header/footer have separate names and render their new snapshots without opacity or position animation; naming the entire tall main region is intentionally avoided because scroll restoration changes its bounds. `ServiceTitle.ts` names only the title text using `service.viewTransitionName`, shared across homepage skills, directory headings, and detail H1s. Keep those names unique and aligned across locales. Never name the surrounding descriptions/tags or link icons. Project previews do not morph. Global reduced-motion CSS also covers history transitions. See the [native API guide](https://developer.chrome.com/docs/web-platform/view-transitions/same-document) for snapshot separation.

Public CTAs use `Components/Shared/Actions.ts`: natively typed `ActionLink`, `ActionAnchor`, and `ActionButton`, with `primary`, `secondary`, `link`, and `icon` variants. Primary actions are filled, secondary actions outlined, and link actions unframed; icon actions accent the icon on hover. All share focus, wrapping, reduced-motion behavior, and 44px/48px minimum touch targets. `actionContrast.ts` chooses a black/white foreground for solid accent/hover fills; this is not a contrast guarantee for arbitrary custom palettes. Photo-specific secondary colors apply only on wide project heroes. Navigation disclosures, radios, language segments, gallery thumbnails, and parked forms remain specialized controls rather than CTAs. Do not migrate these indiscriminately or change DevOS styles through this module.

The public header uses native disclosure buttons and normal links. `headerNavigationState.ts` distinguishes a temporary mouse-hover preview from click/keyboard activation; `useHeaderNavigation.ts` handles dismissal and focus. Styles are isolated in `Header.styles.ts`.

Preferences use `Components/Settings/PreferencesDrawer.tsx`: a full-height right-side panel, not a centered modal. Its transparent native-dialog host aligns with the navigation's shared 1264px width from `styles/layout.ts`; the actual panel is capped at 440px and fits smaller screens. This keeps it near the navigation on ultrawide monitors. The title and close button stay visible while the body scrolls independently; outside pointer interaction or Escape dismisses it without blur or a heavy backdrop.

The native modal primitive still provides focus containment/inert page behavior. `dialogLifecycle.ts` preserves the body scroll style and returns focus to the visible navigation toggle after closing. The panel slides down from above and exits upward, starting the exit at its current position even if opening is interrupted. Entry CSS and the cancellable Web Animations exit in `drawerMotion.ts` respect reduced motion, and unmount cancels pending close callbacks. `WebSettings` renders only controls; the drawer owns its heading. Controls have associated labels and language choices expose their pressed state. The reset only restores custom colors for the active light/dark palette, not the other palette, theme selection, or language.

Theme selection defaults to `system` and is exposed as a three-position System/Light/Dark switch with visible detents in `ThemeModeSwitch.tsx`. Its native grouped radios preserve keyboard navigation, labels, and checked state. `styles/useThemePreference.ts` uses `useSyncExternalStore` to follow the browser's `prefers-color-scheme` changes live; an explicit light/dark choice overrides them. `themePreference.ts` validates and stores the preference as `portfolio.theme`, reads the legacy `theme` key only when the new key is absent, and tolerates unavailable storage. Without browser/media APIs, the resolved fallback is dark. `ThemeProvider.tsx` owns the palette, root `data-theme`, and native `color-scheme`; the conflicting legacy `AppContext` provider was removed. The detected preference is what the browser reports, not arbitrary browser toolbar themes or extensions.

`styles/themeColors.ts` stores custom overrides as `portfolio.colors`: `{ "version": 1, "light": {...}, "dark": {...} }`. A reducer updates/resets only the resolved active palette; manual theme switching and live system changes select its own saved overrides without clearing either palette. Settings headings and accessible reset labels identify the palette being edited. Only the shared editable-key list (`accent`, `background`, `surface`, `text`) and six-digit HEX values are accepted; stored values are normalized and malformed entries/unknown keys are ignored. Unsupported schemas or invalid JSON fall back to defaults. Resetting the last overrides removes only the color storage key; it never clears the entire localStorage. Blocked storage still allows in-memory edits. This validates data, not custom-palette contrast. Unit tests cover reducer isolation, round-trip persistence, scoped reset, invalid data, storage failure, provider initialization, and bilingual control markup; live browser integration remains to be verified.

The light theme keeps its existing backgrounds, primary text, and accent. Only secondary/muted text tokens are darker to improve readability on gray content bands. Focused default-palette contrast tests cover these text colors on the theme's backgrounds; they do not certify custom overrides or all interactive states. Unit/SSR tests live in `Components/Shared/__tests__/`, `Components/Settings/__tests__/`, and `styles/__tests__/`; native browser interactions and actual ultrawide layout still need browser verification.

DevOS portfolio content is consumed by these views:

- Explorer: project catalog and entry point into ProjectWindow case studies
- Browser: featured project preview surface with route/source actions and address-bar project search
- Terminal: command-driven project and service discovery
- About Me: localized profile document with keyword tooltips
- Component Lab: localized design-system preview with theme tokens, typography, and component states

Future admin direction: the current TypeScript content model can become an API-backed or CMS-backed data source later. An admin page could create and edit projects/services, persist them through the backend, and expose the same shape back to the frontend.

## Localization

The app uses `i18next` and `react-i18next` without language-specific route prefixes. The selected language is stored in `localStorage` under `portfolio.locale`.

Locale files live in:

- `src/i18n/locales/en/common.json`
- `src/i18n/locales/cs/common.json`
- `src/i18n/locales/en/devos.json`
- `src/i18n/locales/cs/devos.json`
- `src/i18n/locales/en/content.json`
- `src/i18n/locales/cs/content.json`

Add new UI strings to `common.json` unless they are DevOS-only. Add portfolio projects and services to both `content.json` files with matching IDs so helpers and tests can keep locale data aligned.

The service directory is rendered by `src/Pages/ServicesPages/ServicePage.tsx` and uses the same localized service content for its compact track list. Detailed service pages are rendered by `src/Pages/ServicesPages/ServiceDetailPage.tsx`; the route only passes a service ID, and title, subtitle, capabilities, stack, and related links come from localized service detail content.

DevOS-only profile copy, tooltip text, Lab copy, and terminal text live in `devos.json`.

## Current Known Gaps

- Initial responsive home/carousel/detail layouts are implemented; real-browser mobile/tablet/landscape acceptance and spacing refinements remain pending.
- Admin, login, and some DevOS apps still contain prototype/demo behavior; client-side route guards are not a working authentication system.
- Service forms are hidden until a real backend or form provider exists; the services page uses direct contact links for now.
- Tests cover central content, homepage/project rendering, contact links, camera projection, and shared section styles. Actual browser and WebGL layout verification remains pending in restricted environments.
