#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../web.client"

DRY_RUN=0
if [[ "${1:-}" == "--dry-run" ]]; then
    DRY_RUN=1
elif [[ $# -gt 0 ]]; then
    printf 'Usage: bash deploy.sh [--dry-run]\n' >&2
    exit 2
fi

: "${DEPLOY_HOST:?Set DEPLOY_HOST to user@host}"
: "${DEPLOY_DIR:?Set DEPLOY_DIR to the absolute remote document root}"
if [[ ! "$DEPLOY_HOST" =~ ^[a-zA-Z0-9_.@-]+$ || "$DEPLOY_HOST" == -* ]]; then
    printf 'DEPLOY_HOST must be a hostname or IPv4 address, optionally prefixed by user@.\n' >&2
    exit 2
fi
if [[ ! "$DEPLOY_DIR" =~ ^/[a-zA-Z0-9_./-]+$ || "$DEPLOY_DIR" =~ ^/+$ || "$DEPLOY_DIR" =~ (^|/)\.\.?(/|$) ]]; then
    printf 'DEPLOY_DIR must be an absolute, non-root path without spaces or dot segments.\n' >&2
    exit 2
fi
DEPLOY_DIR="${DEPLOY_DIR%/}"
if [[ -n "${DEPLOY_URL:-}" && ! "$DEPLOY_URL" =~ ^https?://[^[:space:]]+$ ]]; then
    printf 'DEPLOY_URL must be an HTTP(S) base URL.\n' >&2
    exit 2
fi

SSH_OPTIONS=(-o BatchMode=yes)
if [[ -n "${DEPLOY_SSH_KEY:-}" ]]; then
    SSH_OPTIONS+=(-i "$DEPLOY_SSH_KEY")
fi

run() {
    if [[ "$DRY_RUN" == 1 ]]; then
        printf '%q ' "$@"
        printf '\n'
    else
        "$@"
    fi
}

run npm run build
if [[ ! -f dist/index.html || ! -d dist/assets ]]; then
    printf 'Build output is missing. For a dry run, run npm run build first.\n' >&2
    exit 2
fi

run ssh "${SSH_OPTIONS[@]}" "$DEPLOY_HOST" "mkdir -p -- '$DEPLOY_DIR'"
# Keep old hashed assets so already-open tabs can still load their lazy chunks.
run scp "${SSH_OPTIONS[@]}" -r dist/assets "$DEPLOY_HOST:$DEPLOY_DIR/"
for source in dist/* dist/.[!.]*; do
    [[ -e "$source" ]] || continue
    [[ "$source" == dist/index.html || "$source" == dist/assets ]] && continue
    run scp "${SSH_OPTIONS[@]}" -r "$source" "$DEPLOY_HOST:$DEPLOY_DIR/"
done

# Publish the new entry point only after every referenced resource is uploaded.
ENTRY=".index-upload-$(date +%s)-$$-$RANDOM.html"
run scp "${SSH_OPTIONS[@]}" dist/index.html "$DEPLOY_HOST:$DEPLOY_DIR/$ENTRY"
run ssh "${SSH_OPTIONS[@]}" "$DEPLOY_HOST" "mv -f -- '$DEPLOY_DIR/$ENTRY' '$DEPLOY_DIR/index.html'"

if [[ -n "${DEPLOY_URL:-}" ]]; then
    run curl --fail --head --location --max-redirs 3 --silent --show-error --max-time 20 -- "${DEPLOY_URL%/}/"
fi
