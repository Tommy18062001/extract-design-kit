# Live-site extraction

Use this guide whenever the user provides a live website URL (live-site mode or hybrid mode).

## Goal

Recover a usable design system from what the browser actually renders: colors, type, spacing, shape, elevation, breakpoints, motion cues, and recurring UI patterns. Prefer machine-readable CSS and DOM evidence over screenshot guessing.

## Prerequisites

- A public URL the agent can fetch or open.
- Prefer a real browser or headless browser when available (screenshots, computed styles, interaction states).
- Fall back to HTTP fetch of HTML + linked stylesheets when browser tooling is unavailable; record the reduced fidelity.

## Step-by-step

### 1. Scope the crawl

- Always inspect the provided URL.
- If the site exposes clear secondary templates (docs, pricing, blog post, login, app shell), inspect 2–4 representative pages. Do not spider the whole site.
- Skip authenticated, paywalled, or CAPTCHA-gated areas. Note them under limitations.
- Respect `robots.txt` and reasonable request rates. Do not brute-force or bypass access controls.

### 2. Collect raw CSS evidence

From each page, gather:

| Signal | Where to look | Notes |
|--------|---------------|-------|
| Custom properties | `:root`, `[data-theme]`, theme classes | Highest-value token source |
| Stylesheets | `<link rel="stylesheet">`, inline `<style>` | Parse color, font, spacing declarations |
| Font faces | `@font-face`, Google Fonts / Adobe links | Record family, weights, fallbacks |
| Framework hints | Tailwind classnames, Bootstrap, MUI, etc. | Use as clues; still record computed values |
| Inline styles | Critical hero/layout nodes | Often one-off; mark carefully |

Store each observation in `.extract-design-kit/raw.json` with:

- `category` (color, typography, spacing, radius, shadow, layout, motion, breakpoint, component)
- `value`
- `source_url` and optional CSS selector
- `source_location` (stylesheet URL or inline)
- `confidence` (`verified` for explicit CSS values / computed styles; `inferred` for patterns deduced from screenshots or repeated class utilities; `unknown` when missing)

### 3. Sample computed styles

On representative nodes (body, headings h1–h3, paragraph, primary button, secondary button, link, input, card/surface, nav, footer), read computed:

- `color`, `background-color`, `border-*`, `border-radius`, `box-shadow`
- `font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`
- `padding`, `margin`, `gap`
- `max-width` on main layout containers

Deduplicate into candidate scales (type ramp, spacing rhythm, radius set, shadow ladder).

### 4. Capture screenshots

Unless the user specifies otherwise, capture:

- Mobile ≈ 375px wide
- Tablet ≈ 768px wide
- Desktop ≈ 1280px wide

Save under `design-kit/examples/` when license/attribution allows storing screenshots for reference. If storing screenshots is inappropriate, store paths or hashes only in `verification.md` and explain in `examples/README.md`.

Optional: open primary menus, modals, and focus rings when tooling allows.

### 5. Inventory visible components

Catalog patterns you can see, not frameworks you guess:

- Buttons (primary / secondary / ghost / destructive if present)
- Form controls
- Navigation
- Cards / surfaces
- Dialogs / drawers
- Badges / chips
- Tables / lists
- Empty / error / loading affordances

For live-only sources, document **appearance and behavior**, and mark implementation API, internal state machines, and accessibility contracts as `unknown` unless observable (focus outline, `aria-*`, keyboard traps).

### 6. Normalize to tokens

Map repeated values to semantic names (`color.surface.default`, `typography.body.md`, `space.4`, `radius.md`, …). Rules:

- Prefer CSS variables' semantic intent when names are meaningful.
- Prefer source-repo token names in hybrid mode when they exist.
- Do not invent brand-specific names from the live marketing copy.
- Keep competing values; explain the chosen normalization in `normalized.json`.

### 7. Hybrid conflict resolution

When repo and live site disagree:

1. Prefer explicit source tokens/code for named values.
2. Prefer live computed styles for visual verification notes and for gaps the repo does not define (motion timing, responsive collapse, hover chrome).
3. Record every material conflict in `evidence.md` and `verification.md`.

### 8. Verification checklist

- [ ] Mode recorded (`live-site` or `hybrid`)
- [ ] Live URL(s) in `SOURCE.md`
- [ ] CSS variables / stylesheets inspected (not screenshots alone)
- [ ] At least one desktop and one mobile viewport captured or explicitly skipped with reason
- [ ] Tokens and CSS agree
- [ ] Inferences labeled
- [ ] License / attribution caveat stated
- [ ] No wholesale copy of markup, logos, or proprietary assets

## Confidence guidance

| Confidence | Meaning |
|------------|---------|
| `verified` | Read from CSS custom properties, stylesheet declarations, or browser computed style |
| `inferred` | Deduced from repeated visual pattern, utility class clusters, or screenshot measurement |
| `unknown` | Needed for a complete kit but not observable |

## Out of scope

- Bypassing login, paywalls, bot protection, or legal restrictions
- Copying site content, logos, illustrations, or component source
- Claiming the kit is a pixel-perfect clone
- Full-site crawls or scraping personal/user data
