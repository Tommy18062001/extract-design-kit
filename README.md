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

1. Replace `REPLACE_WITH_YOUR_ACCOUNT` in `package.json` with your GitHub account or organization.
2. Check that `extract-design-kit` is available on npm; rename it consistently if needed.
3. Create a public GitHub repository from this folder.
4. Sign in to npm, then run `npm publish`.

The package is MIT licensed. Review source-repository licenses during every extraction.
