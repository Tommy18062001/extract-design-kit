---
name: extract-design-kit
description: Extract a reusable, implementation-ready design kit from an open-source GitHub repository, a live website, or both. Use when a user provides a repository URL, a live site URL, or both and asks to capture its visual language, create design tokens, catalog components, reproduce its design feel, or generate a portable design system for another project.
---

# Extract Design Kit

Create a local `design-kit/` directory that captures a source project's visual system without copying its product wholesale.

Supports three input modes:

| Mode | Input | Primary evidence | Best for |
|------|-------|------------------|----------|
| **Repository** | GitHub repo URL | Source styles, tokens, components | Open-source projects with clear styling |
| **Live site** | Website URL | Rendered CSS, DOM, screenshots, computed styles | Closed-source sites or URL-only requests |
| **Hybrid** | Repo + live URL | Source first, live site for verification and gaps | Highest fidelity when both exist |

## Input

1. Accept whichever the user provides: repository URL, live URL, or both.
2. If neither is clear, ask for at least one. Prefer both when available.
3. Confirm the destination project directory if it is unclear.
4. Do not require a repository when only a live URL is given. Do not require a live URL when only a repository is given.

Before writing, determine the active mode and record it in `SOURCE.md` and `.extract-design-kit/raw.json`.

## Mode selection

- **Repository mode** — clone or inspect the repo; extract from source. Optionally render locally for verification. Do not invent a live URL.
- **Live-site mode** — fetch and inspect the live site as primary evidence. Follow [references/live-site-extraction.md](references/live-site-extraction.md).
- **Hybrid mode** — inventory the repository first for tokens, fonts, primitives, and component contracts. Use the live site to verify visuals, fill responsive/motion/state gaps, and correct inferences. Prefer explicit source values over live-inferred values when they conflict; document the conflict.

## Boundaries

Treat the source as evidence, not material to copy. Record license and attribution. Do not copy product copy, logos, illustrations, or component implementations unless the license and user explicitly allow it. Re-express the visual system with original code.

For live-only sources, note that license may be unknown or proprietary; default to re-expressing patterns, never copying assets or markup wholesale. Record that caveat in `SOURCE.md`.

## Deliverable

Create this exact structure in the destination project:

```
design-kit/
  README.md
  SOURCE.md
  tokens.css
  tokens.json
  component-inventory.md
  DESIGN_SYSTEM.md
  evidence.md
  examples/
.extract-design-kit/
  raw.json
  normalized.json
  verification.md
```

Use [references/design-kit-schema.md](references/design-kit-schema.md) for file requirements.
Use [references/live-site-extraction.md](references/live-site-extraction.md) whenever a live URL is in scope.

## Extraction workflow

1. **Resolve inputs.** Record mode (`repository` | `live-site` | `hybrid`), URLs, and destination. For repos, capture commit SHA when known.
2. **Inventory evidence.**
   - Repository: style entry points, token files, font loading, layout primitives, components, responsive utilities, state selectors.
   - Live site: HTML/CSS responses, CSS custom properties, computed styles on key nodes, font faces, screenshots at defined viewports, visible component patterns.
   - Write unedited findings to `raw.json` with confidence `verified`, `inferred`, or `unknown`.
3. **Extract before interpreting.** Preserve observed values, selectors, variants, and state rules. Retain duplicates and source-specific names in `raw.json`.
4. **Normalize deliberately.** Map raw evidence to semantic W3C Design Tokens Community Group-style tokens in `normalized.json`, then emit `tokens.json` and `tokens.css`. Preserve explicit values; never invent precise values. Label inferences.
5. **Map components.** Document reusable primitives with anatomy, variants, sizes, states, token usage, responsive behavior, accessibility behavior, and evidence. From live sites, catalog visible patterns (button, input, nav, card, dialog, etc.) and mark API/a11y details unknown when source is unavailable.
6. **Write the design guide.** Describe visual character, hierarchy, density, composition rules, and constraints. Label all inferences and unknowns.
7. **Verify fidelity.**
   - Repository: if safely runnable without secrets, render representative screens and compare.
   - Live site / hybrid: capture screenshots at mobile, tablet, and desktop widths; compare kit-derived compositions against live visuals when possible.
   - Record results in `verification.md`. Inability to verify is a limitation, not a failure.

## Live-site rules of engagement

- Prefer public pages. Stop at auth walls; record the limitation.
- Inspect multiple representative pages when the site has distinct templates (home, content, form, settings), not only the landing page.
- Harvest `:root` / CSS variables, stylesheets, and computed styles — do not scrape only screenshots.
- Capture at least three viewports (for example 375, 768, 1280) unless the user specifies otherwise.
- Exercise hover/focus/open states when browser tooling is available; otherwise mark interaction states as inferred or unknown.
- Never claim pixel-perfect fidelity from a live site alone.

## Quality bar

The kit must let a future agent build a coherent button, card, form, navigation pattern, and page without reopening the source. Every important token and component rule must point to evidence or be explicitly marked as inferred. Keep `.extract-design-kit/` as an audit trail; treat `design-kit/` as the portable product.

At completion, summarize: mode used, sources inspected, evidence coverage, verification status, license caveat, and the defining design decisions.
