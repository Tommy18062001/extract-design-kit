---
name: extract-design-kit
description: Extract a reusable, implementation-ready design kit from an open-source GitHub repository and optionally its live website. Use when a user provides a repository or website and asks to capture its visual language, create tokens, catalog components, reproduce its design feel, or generate a portable design system for another project.
---

# Extract Design Kit

Create a local `design-kit/` directory that captures a source project's visual system without copying its product wholesale.

## Input

Ask for the GitHub repository URL. Ask for the live URL only when it exists and visual behavior, screenshots, or rendered output are important. Confirm the destination project directory if it is unclear.

Inspect the repository before writing. Find the active styling approach, global styles, theme or token files, fonts, layout primitives, and representative components. Prefer source code over guessing from a screenshot. Inspect the live site when code alone does not reveal responsive states, motion, or visual hierarchy.

Respect the source license. Record it in `design-kit/SOURCE.md`. Do not copy source components, logos, illustrations, or proprietary-looking assets unless the license and user request permit it. Re-express visual ideas with original code when reuse is uncertain.

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
  examples/
```

Use the detailed file requirements in [references/design-kit-schema.md](references/design-kit-schema.md).

## Extraction workflow

1. Inventory evidence: list style entry points, token definitions, font declarations, component primitives, and responsive utilities.
2. Distill the system: identify semantic colors, typography scale, spacing rhythm, radii, borders, elevation, layout widths, breakpoints, and motion rules. Preserve source values where they are explicit; label inferred values as inferred.
3. Map components: catalog the most reusable components and document variants, states, anatomy, and accessibility behavior. Focus on primitives rather than every page-specific section.
4. Produce tokens: write CSS custom properties and equivalent JSON. Use semantic names, not source-brand names or arbitrary color labels.
5. Write the guide: make `DESIGN_SYSTEM.md` actionable for future agents. State the visual character, constraints, composition rules, and a compact do/don't list.
6. Verify: check CSS and JSON agree, every value has evidence or an inference marker, and future component work can follow the kit without reopening the source repository.

## Quality bar

Make a kit specific enough that a new button, card, form, and page built from it feel coherent with the source. Do not claim pixel-perfect fidelity. Call out missing evidence and choices instead of inventing certainty.

At completion, summarize the source inspected, files created, license caveat, and the two or three most defining design decisions.
