# Design kit schema

## README.md

State the kit's purpose, source name, extraction date, and the rule that new UI must consume its tokens and follow its component patterns. Include a short usage snippet for importing `tokens.css`.

## SOURCE.md

Record repository URL, optional live URL, commit or release inspected when known, license, and a concise attribution note. List any assets or code deliberately not copied.

## tokens.css

Define only semantic custom properties, grouped in this order: color, typography, spacing, shape, border, shadow, layout, motion, breakpoints. Use a `:root` block. Add comments only for inferred groups or non-obvious source mappings.

## tokens.json

Mirror `tokens.css` as nested JSON with the same semantic names and exact values. Use strings for CSS values. Include a top-level `meta` object with source and confidence notes.

## component-inventory.md

For each reusable primitive, include purpose, anatomy, variants, states, sizing, token usage, responsive behavior, accessibility notes, and evidence location. Prioritize buttons, inputs, selects, cards, navigation, dialogs, tables, badges, and empty states when present.

## DESIGN_SYSTEM.md

Include:

- Design character in three to five concrete adjectives
- Color and contrast strategy
- Typography hierarchy and text-density rules
- Spacing and layout rhythm
- Shape, border, and elevation language
- Interaction and motion rules
- Responsive composition rules
- Component composition guidance
- A compact do/don't list
- Explicit unknowns or inferred rules

## examples/

Place only user-provided or appropriately licensed reference screenshots, annotated notes, or small original example compositions. If no assets are included, add `examples/README.md` explaining that visual reference was not captured.
