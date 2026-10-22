# Frontend Deployment

## Scope

The owner currently hosts the frontend on an Oracle Free Tier instance using a temporary, unreserved IP over HTTP. No stable origin is assumed in application code. This guide prepares static hosting without a domain; it does not change the live server or backend.

The agent could not connect to the live IP from its sandbox. The supplied Nginx configuration is a template, not a copy of the active server configuration. Nginx is not installed in the agent environment, so validate it on the host before reloading.

## Build

From `web.client/`:

```bash
npm ci
npm run lint
npm run test
npm run build
```

Publish `web.client/dist/`, not the repository, source code, or Vite development server. Builds require Node/npm only, not .NET or development certificates. Local `npm run dev` reuses existing PEM certificates when available, otherwise uses HTTP; `DEV_HTTPS=false` explicitly selects HTTP. The default port remains 60522.

## Server Configuration

Adapt [the server block template](../deploy/nginx.conf) to the existing Nginx installation:

- Match `root` to the actual absolute document-root path. The main Nginx configuration must already load its standard MIME types.
- HTML is revalidated; fingerprinted `/assets/` files cache for a year. Stable-name screenshots/fonts cache for an hour, not indefinitely.
- Missing static media/chunks return HTTP 404, not the SPA entry point. Public deep links fall back to `index.html`.
- Do not add `$uri/` to the SPA fallback: the public `projects/` asset directory must not intercept the `/projects` React route.
- The temporary-IP template sends `X-Robots-Tag: noindex, nofollow`. This is an indexing preference, not access control; the site is still public. Remove it deliberately when publishing on the stable origin.
- Keep existing Oracle network, filesystem, and SELinux protections. Match the document root and access permissions to the existing installation rather than weakening them.

Review/merge the template into the active configuration; do not replace a working server configuration blindly. On the host, validate before applying:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

The SPA fallback still returns HTTP 200 for unknown page routes; React shows the localized 404. Real server-side page-status handling needs a route-aware deployment or prerendering later. Missing assets already receive HTTP 404 in the template. These are different cases.

## Upload

Use the versioned [upload script](../deploy/upload.sh), not the old ignored `web.client/deploy.sh`. The local legacy script deletes the previous build first and can break already-open tabs or leave the site empty after an upload failure. Its private configuration has not been copied into version control.

Set the target explicitly in your shell. Confirm the actual absolute document root on the server; the directory below is only an example:

```bash
export DEPLOY_HOST='opc@YOUR_SERVER_IP'
export DEPLOY_DIR='/home/opc/web-app/dist'
export DEPLOY_SSH_KEY="$HOME/.ssh/your_deploy_key"
export DEPLOY_URL='http://YOUR_SERVER_IP'

bash deploy/upload.sh --dry-run
```

Run this from the repository root. Dry run needs an existing build and only prints commands; it does not build, upload, or contact the host. The private key is optional when using the SSH agent/default identity; `DEPLOY_URL` is optional and enables an HTTP HEAD health check. The script does not source `.env` files or disable SSH host-key checks.

When reviewed, `bash deploy/upload.sh` builds and uploads assets/public files first, then atomically replaces `index.html` through a temporary file. It retains older hashed assets for lazy imports in already-open tabs. Build/upload failures stop before entry-point publication; an HTTP health-check failure after publication is reported as a failed command, without automatic rollback. The check does not prove that JavaScript/WebGL rendered successfully.

Deploy one build at a time. Retained assets accumulate; schedule cleanup separately with a retention/rollback policy, never delete all old files before an upload. This is not a full transactional release system: stable-name public files are updated in place, and rollback is manual.

## Verification

With `BASE_URL` set to the current host, inspect response status, MIME type, and cache/indexing headers:

```bash
curl -I "$BASE_URL/"
curl -I "$BASE_URL/projects"
curl -I "$BASE_URL/projects/unity-graduation-game"
curl -I "$BASE_URL/projects/ragsystem"
curl -I "$BASE_URL/assets/missing.js"
```

The last request must be HTTP 404, not HTML with HTTP 200. Also inspect one real hashed JS file and project screenshot, then refresh a deep link directly in the browser. Test a new deployment with an older tab still open and navigate to a previously unvisited lazy route.

For motion/media checks:

1. In browser rendering tools, emulate `prefers-reduced-motion: reduce`, then change it while the page is open. The homepage atom should remain visible but static: no rotation, orbit animation, mouse tilt, or click acceleration. CSS/view transitions should stop as well.
2. Restore full motion, scroll the hero out of view, and switch tabs. Hero rendering should pause and resume without a large catch-up jump. Verify at both 60 Hz and a high-refresh display if available.
3. Throttle the network and disable cache. The project detail's background cover uses eager/high priority; the inline RAG preview, homepage projects, and gallery thumbnails use lazy loading. Only the active carousel cover gets eager/high hints; inactive slides use lazy/low. Browser lazy-loading thresholds may fetch nearby images early. The opened gallery image is eager/high.
4. Block an image request and confirm the localized accessible fallback appears without losing the reserved preview area. Gallery navigation, Escape, and focus return should still work.

Native lazy loading/priority behavior follows the [image element API](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img); priorities are hints, not guaranteed request ordering. Hero static/paused policies use R3F's [on-demand rendering API](https://r3f.docs.pmnd.rs/advanced/scaling-performance). Template routing/cache semantics follow Nginx's [try_files](https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files) and [expires](https://nginx.org/en/docs/http/ngx_http_headers_module.html#expires) directives.

## Stable Origin Later

- Choose a stable address/domain and configure HTTPS; then remove the temporary host's noindex header.
- Add canonical/OG URLs, sitemap, and a real social preview image only when those addresses/assets are settled. Do not use the temporary IP as permanent metadata.
- Assess prerendering for route-specific sharing previews and page HTTP status codes. Current runtime metadata remains client-side, with a static English homepage fallback.

## Next UI Phase

The owner has accepted desktop spacing/colors and keyboard operation, and inspected ultrawide through browser emulation. That is not a physical-device or automated browser check. Next cover mobile and the intermediate tablet/small-desktop widths, not just two endpoints: approximately 360, 390, 600, 768, 820, 1024, 1280, 1920, and 3440 pixels, including landscape and touch. Keep public navigation, Preferences, project browsing, and galleries usable throughout. DevOS and backend remain separate work.
