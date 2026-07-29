# Design kit schema

## `design-kit/README.md`

State the kit's purpose, source repository and commit, extraction date, verification status, and the rule that future UI must consume its tokens and component patterns. Include a short CSS import snippet.

## `design-kit/SOURCE.md`

Record repository URL, commit or release inspected, license, attribution note, and material deliberately not copied. Do not include a live-site URL in v1.

## `.extract-design-kit/raw.json`

Keep the unedited evidence record. Each item must include `category`, `value`, `source_file`, `source_location` when available, `component_or_selector`, `state` when applicable, and `confidence`. Retain duplicates and source-specific names here.

## `.extract-design-kit/normalized.json`

Map raw evidence to semantic tokens and component rules. Each entry must include `value`, `source_refs`, and `confidence`. Do not discard competing values: explain the normalization choice.

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

## `design-kit/DESIGN_SYSTEM.md`

Include the visual character, color/contrast strategy, typography hierarchy, density and spacing rhythm, layout composition, shape and elevation language, responsive rules, motion principles, component-composition guidance, concise do/don't rules, and every significant unknown or inference.

## `design-kit/evidence.md`

Provide a compact traceability table: design decision, normalized token or rule, raw evidence reference, source file, and confidence. This is the first file a future agent should use when it questions a rule.

## `.extract-design-kit/verification.md`

Record whether local rendering was possible, exact viewport sizes tested, source screens or component states compared, material differences found, corrections made, and remaining limitations. If the source was not runnable, state why without treating that as a failure.

## `design-kit/examples/`

Include only appropriately licensed source screenshots, original comparison screenshots, or annotated notes. If no visual verification was possible, add `README.md` explaining the limitation.
