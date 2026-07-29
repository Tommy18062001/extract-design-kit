---
name: extract-design-kit
description: Extract a reusable, implementation-ready design kit from an open-source GitHub repository whose source code is available. Use when a user provides a repository and asks to capture its visual language, create standard design tokens, document component patterns and states, reproduce its design feel, or generate a portable design system for another project.
---

# Extract Design Kit

Create a local `design-kit/` directory from a source repository. V1 is repository-first: use source code and, when safely runnable, its local rendered output. Do not fetch or analyze a separate live website.

## Input and boundaries

Ask for the repository URL and destination only when either is unclear. Inspect the repository's license, styling entry points, tokens, fonts, primitives, component code, responsive rules, and build instructions before writing.

Treat the source as evidence, not material to copy. Record the source commit and license. Do not copy product copy, logos, illustrations, or component implementations unless the license and user explicitly allow it. Re-express the visual system with original code.

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

## Extraction workflow

1. Inventory evidence. Locate the active styles, source token files, font loading, layout primitives, components, responsive utilities, and state selectors. Record file paths and commit in `raw.json`.
2. Extract before interpreting. Preserve observed values, selectors, variants, and state rules in `raw.json`. Classify each item as `verified`, `inferred`, or `unknown`.
3. Normalize deliberately. Convert repeated raw values into semantic W3C Design Tokens Community Group-style tokens in `normalized.json`, then emit equivalent `tokens.json` and `tokens.css`. Preserve source values when explicit; never invent precise values.
4. Map components. Document reusable primitives with anatomy, variants, sizes, states, token usage, responsive behavior, accessibility behavior, and source evidence. Capture focus, hover, active, disabled, loading, empty, error, and modal behavior when code defines them.
5. Write the design guide. Describe the system's visual character, hierarchy, density, composition rules, and constraints. Label all inferences and unknowns.
6. Verify fidelity. If the source repository can run with its documented setup and without requiring secrets or unsafe changes, render representative source screens and a small kit-based composition at matching viewport sizes. Record the biggest differences and corrections in `verification.md`. If it cannot run, record that limitation; do not claim visual verification.

## Quality bar

The kit must let a future agent build a coherent button, card, form, navigation pattern, and page without reopening the source repository. Every important token and component rule must point to evidence or be explicitly marked as inferred. Keep `.extract-design-kit/` as an audit trail; treat `design-kit/` as the portable, human-facing product.

At completion, summarize the source commit, evidence coverage, verification status, license caveat, and the defining design decisions.
