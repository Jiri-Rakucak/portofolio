# Publication Checklist

This is a release checklist for making the portfolio repository public, not a security certification. The repository is still private at the owner's request. Do not change visibility, rewrite history, commit, or push as part of a documentation update.

## Review Scope

The 2026-10-22 review inspected the current tracked/source files and local reachable Git history (12 commits), including historical filenames and a pattern scan of text changes for common private-key/provider-token formats. Backend settings were inspected for embedded credentials. This is not an entropy-based secret-scanner report or a complete binary/media review.

No actual private key, provider token, or populated backend credential was identified in that review. This does not establish that every historical object or external GitHub artifact is safe. Repeat a dedicated secret scan against the final staged tree and full remote history before publication.

The dependency audit could not complete during this review because npm registry DNS resolution failed (`EAI_AGAIN`). No current zero-vulnerability claim is made.

## Resolve Before Switching Visibility

### Historical IDE and Build Data

- [ ] Review/remove the original `.vs/` artifacts from public history, or publish a fresh repository from a reviewed clean snapshot.
- [ ] Include historical `Web.Server/obj/` and `Web.Server/Web.Server.csproj.user` in that cleanup decision.
- [ ] Review historical documentation for machine-specific paths and restricted-repository references as well as the current files.

The original `16d7240` commit contains Visual Studio metadata, `.suo` data, and Copilot/index databases (`.vs/Web/CopilotIndices/.../*.db`). It also contains a Windows workspace path. The later `07eccb3` commit deletes these files from the tree, not from earlier history. Binary IDE databases were not comprehensively examined for cached snippets or other local data. Their presence is a reason to clean the history before publishing, not evidence that a credential was found.

Do not rely on `.gitignore` or a new deletion commit to purge existing history. A history rewrite changes commit IDs and needs a coordinated backup/review plan; a fresh public repository trades away the original commit history. Choose the approach explicitly while the source repository is still private. If a real credential is found, revoke/rotate it before treating a rewrite as remediation. See GitHub's [sensitive-data removal guidance](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository).

### Identity and Contact Details

- [ ] Confirm that the public email, phone number, city, and profile links in `web.client/src/content/contact.ts` are still intended for unrestricted publication.
- [ ] Review both author and committer email addresses in commit metadata. The local history contains personal and school email addresses in addition to the website contact address.

These contact fields were supplied for the public portfolio and have not been removed. They are personal information, not application secrets. Historical values are not repeated here; changing a future Git identity does not change earlier commits.

### Licensing and Media

- [ ] Decide whether and how to license the project code; no project-wide `LICENSE` has been selected or added.
- [ ] Confirm permission/attribution for screenshots and any third-party game assets visible in them.
- [ ] Check screenshots/previews for personal conversations, account identifiers, internal URLs, or unpublished material before adding new media.

The bundled Inter font license applies to that font material, not automatically to this repository or its screenshots. Keep the existing attribution. Public visibility is not itself a project-wide open-source license; see GitHub's [licensing documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository). No license has been chosen on the owner's behalf.

The Starbounder source remains access-restricted; its private URL and local checkout path have been removed from current source notes while the review's provenance/limitations are preserved. Those older strings still exist in prior commits until history is separately addressed. The thesis, signed assignment, and conversation exports are not included in the current tracked file set.

## Keep Private

- [ ] Keep the local legacy `web.client/deploy.sh` ignored. It contains host-specific configuration and is not the recommended upload workflow.
- [ ] Do not add `.env` files, SSH keys, PEM/PFX/P12 certificates, cloud credentials, private conversation exports, or backups.
- [ ] Check the staged file list, not just files currently visible in the editor. Root ignore rules cover common certificate/key filenames, but ignoring a filename is not secret detection.

The new `deploy/upload.sh` reads its target/key path from environment variables; `deploy/nginx.conf` is a generic template. Backend `appsettings*.json` currently contains logging/host configuration, not populated credentials. Never introduce real backend credentials there later. The login/admin pages and client route guard are prototypes, not an authentication system.

## GitHub-Side Checks

- [ ] Review branches/tags, pull-request discussions, releases/attachments, and any Actions logs/artifacts on GitHub. These were not audited from the local workspace.
- [ ] Run a dedicated secret scanner on the final publication candidate and address any findings without copying secret values into issues or logs.
- [ ] Re-run lint/tests/build and dependency auditing. Dependency advisory results change over time; a previous clean result is not a current guarantee.
- [ ] Ensure that the final README, deployment templates, and other new files are actually committed before changing visibility.
- [ ] Add a real portfolio screenshot and stable demo URL when ready; do not label project screenshots as screenshots of the portfolio or use temporary-IP URLs as permanent branding.

GitHub notes that code and Actions history/logs become visible when a repository becomes public. Review its [visibility-change guidance](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility) before making the change. No GitHub-side visibility or history operation has been performed by this review.
