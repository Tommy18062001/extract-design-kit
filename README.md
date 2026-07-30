# Extract Design Kit

A Codex skill that turns an open-source GitHub repository, a live website, or both into a portable design kit for future projects.

## Modes

| Mode | What you provide | How it works |
|------|------------------|--------------|
| **Repository** | GitHub URL | Reads source styles, tokens, and components; optional local render for verification |
| **Live site** | Website URL | Harvests CSS variables, stylesheets, computed styles, and screenshots from the live site |
| **Hybrid** | Repo + live URL | Uses source as primary evidence and the live site to verify visuals and fill gaps |

## Install

After publishing this package to npm:

```bash
npx --yes extract-design-kit@latest
```

Restart Codex, then use any of:

```text
Use $extract-design-kit to create a reusable design kit from this repository: https://github.com/owner/repository
```

```text
Use $extract-design-kit to create a reusable design kit from this live website: https://example.com
```

```text
Use $extract-design-kit to create a reusable design kit from this repository and live site:
- repo: https://github.com/owner/repository
- live: https://example.com
```

To update an installed copy:

```bash
npx --yes extract-design-kit@latest --force
```

## What it produces

The skill generates a portable `design-kit/` plus a private `.extract-design-kit/` evidence trail. It separates raw source or live-site evidence from normalized W3C-style tokens, documents components and states, and records whether visual verification was possible.

Live-site extractions prefer CSS and computed styles over screenshot guessing, label inferences explicitly, and never copy logos, markup, or proprietary assets wholesale.

## Publish checklist

1. Check that `extract-design-kit` is available on npm; rename it consistently if needed.
2. Push this repository to GitHub.
3. Sign in to npm, then run `npm publish --access public` once to create the package.
4. In npm package settings, configure **Trusted publishing** for GitHub Actions with this repository and `publish.yml` as the workflow filename.

## Release a new version

Publishing is automated by `.github/workflows/publish.yml`. It runs only when you push a version tag that matches `package.json`, which prevents accidental releases from ordinary pushes.

```bash
npm version patch
git push --follow-tags
```

Use `npm version minor` or `npm version major` when appropriate. The workflow validates the package and publishes through npm trusted publishing, so no `NPM_TOKEN` GitHub secret is required.

The package is MIT licensed. Review source-repository licenses during every extraction. For live-only sources, treat license as unknown or proprietary unless proven otherwise.
