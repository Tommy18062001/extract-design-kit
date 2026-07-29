# Extract Design Kit

A Codex skill that turns an open-source GitHub repository into a portable design kit for future projects. Version 1 uses repository source code and optional local rendering only; live-site extraction is planned for version 2.

## Install

After publishing this package to npm:

```bash
npx --yes extract-design-kit@latest
```

Restart Codex, then use:

```text
Use $extract-design-kit to create a reusable design kit from this repository: https://github.com/owner/repository
```

To update an installed copy:

```bash
npx --yes extract-design-kit@latest --force
```

## What it produces

The skill generates a portable `design-kit/` plus a private `.extract-design-kit/` evidence trail. It separates raw source evidence from normalized W3C-style tokens, documents components and states, and records whether visual verification was possible.

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

The package is MIT licensed. Review source-repository licenses during every extraction.
