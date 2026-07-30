# Design kit schema

## `design-kit/README.md`

State the kit's purpose, extraction mode (`repository` | `live-site` | `hybrid`), source repository and/or live URL, commit when applicable, extraction date, verification status, and the rule that future UI must consume its tokens and component patterns. Include a short CSS import snippet.

## `design-kit/SOURCE.md`

Record:

- Extraction mode
- Repository URL and commit or release inspected when used
- Live URL(s) and pages inspected when used
- License (or `unknown` / proprietary caveat for live-only sources)
- Attribution note
- Material deliberately not copied (logos, illustrations, markup, proprietary assets)

## `.extract-design-kit/raw.json`

Keep the unedited evidence record. Include top-level `meta` with `mode`, `repository_url`, `live_urls`, and `inspected_at`.

Each item must include `category`, `value`, `confidence`, and provenance:

- Repository evidence: `source_file`, `source_location`, `component_or_selector`, `state` when applicable
- Live-site evidence: `source_url`, `selector` when known, `source_location` (stylesheet URL or `computed-style` / `screenshot`), `viewport` when relevant, `state` when applicable

Retain duplicates and source-specific names here.

## `.extract-design-kit/normalized.json`

Map raw evidence to semantic tokens and component rules. Each entry must include `value`, `source_refs`, and `confidence`. Do not discard competing values: explain the normalization choice. In hybrid mode, note when a live value overrode or merely verified a repo value.

## `design-kit/tokens.json`

Emit W3C Design Tokens Community Group-style JSON. Use nested semantic groups and `$value` / `$type`, for example:

```json
{
  "color": {
    "surface": {
      "default": { "$value": "#ffffff", "$type": "color" }
    }
  }
}
```

Use `color`, `typography`, `spacing`, `border`, `radius`, `shadow`, `dimension`, `duration`, and `cubicBezier` types where appropriate. Keep source and confidence metadata in the audit files rather than bloating portable tokens.

## `design-kit/tokens.css`

Emit a semantic `:root` custom-property mirror of `tokens.json`, grouped by color, typography, spacing, shape, border, shadow, layout, motion, and breakpoints. Keep values exactly aligned with `tokens.json`.

## `design-kit/component-inventory.md`

For each reusable primitive, include purpose, anatomy, variants, sizes, state matrix, token usage, responsive behavior, accessibility behavior, and source evidence. Prioritize buttons, inputs, selects, cards, navigation, dialogs, tables, badges, loading, empty, and error states when present.

For live-site-only inventories, document observable appearance and behavior; mark implementation API and unobserved a11y details as unknown.

## `design-kit/DESIGN_SYSTEM.md`

Include the visual character, color/contrast strategy, typography hierarchy, density and spacing rhythm, layout composition, shape and elevation language, responsive rules, motion principles, component-composition guidance, concise do/don't rules, and every significant unknown or inference.

## `design-kit/evidence.md`

Provide a compact traceability table: design decision, normalized token or rule, raw evidence reference, source file or live URL/selector, and confidence. This is the first file a future agent should use when it questions a rule.

## `.extract-design-kit/verification.md`

Record:

- Whether repository local rendering and/or live-site capture was possible
- Exact viewport sizes tested
- Pages or component states compared
- Material differences found and corrections made
- Remaining limitations (auth walls, missing browser tooling, no repo, etc.)

Inability to verify is a limitation, not a failure.

## `design-kit/examples/`

Include only appropriately licensed source screenshots, live-site reference screenshots when permitted, original comparison screenshots, or annotated notes. If no visual reference was captured, add `README.md` explaining the limitation.
