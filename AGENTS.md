# Erupt Site

## Project Overview

Static website for [Erupt](https://www.erupt.xyz) — an open-source low-code Java framework that generates admin UIs from
annotations (zero frontend code required).

## Tech Stack

- **AngularJS** (1.x) with `ngRoute` for SPA routing
- **Bootstrap** for styling
- **Vanilla JS** for i18n and utilities
- No build step — pure static files served directly

## File Structure

```
index.html          # Entry point, AngularJS app shell with nav/header
app.js              # AngularJS module, routes, and controllers
app.css             # Custom styles
i18n.js             # Internationalization runtime (fetch + CSV parser)
i18n.csv            # Translation data — source of truth (key, zh-CN, en-US)
assets/             # Third-party libs (Bootstrap, Angular, Prism, fonts)
page/
  home.html         # Home page
  contrast/         # Code examples page
  doc/              # Documentation page
  flow/             # Workflow page
```

## Routing

Routes are hash-based (`#!/path`) defined in `app.js`:

- `/` → `page/home.html`
- `/contrast` → `page/contrast/contrast.html`
- `/doc` → `page/doc/doc.html`
- `/flow` → `page/flow/flow.html`

## Internationalization

**Source of truth: `i18n.csv`** — three-column CSV (`key,zh-CN,en-US`). Add or edit translations here only.

`i18n.js` provides a global `i18n` object that loads the CSV at startup via `fetch('i18n.csv')` and parses it
with a built-in RFC 4180 parser. `init()` returns a Promise; AngularJS is bootstrapped manually
(`angular.bootstrap`) only after the Promise resolves — there is no `ng-app` attribute on `<body>`.

Templates use `{{'key' | i18n}}` filter syntax for plain text, or `ng-bind-html="'key' | i18nHtml"` for values
that contain HTML. Language toggle is handled via `i18n.getLang()` / `i18n.setLang()`.

CSV escaping: fields containing commas or double-quotes must be quoted; literal `"` is escaped as `""`
(standard RFC 4180).

## Design Language — Playful-Brutalist

The whole site uses a **Playful-Brutalist** design language (玩趣新粗野, same family as the
docs.erupt.xyz homepage): warm paper background, ink structural lines, hard offset shadows,
a pastel multi-accent palette, zero border-radius, no gradients / blur / glow.

Core rules (tokens live in `app.css` `:root`):

- **Paper & ink** — page background `--c-bg: #FFFFFF`; cards/windows sit on
  `--c-paper: #FFFFFF`; ink is `--c-text` / `--c-border: #14120B`. Every divider is a visible ink
  line: outer frames (`.fr`, header, footer, standalone cards) use `2px`, inner dividers use `1px`
- **Hard shadows only** — `--c-shadow: 4px 4px 0 var(--c-text)`; never blurred `box-shadow`,
  `text-shadow`, or `backdrop-filter`
- **Pastel accents** — primary `--c-brand: #4FC8EC` (cyan, CTA fills with **ink text**, never white;
  no pink — user vetoed it); supporting `--c-green: #93D655` (success/strings), `--c-purple: #BCA0F2`
  (keywords). Status/data semantics inside product mockups may keep their own colors
- **Dark code windows** — `--c-code-bg: #1A170F` with cream text `--c-code-text: #F0E8D6`;
  syntax: annotations cyan, keywords purple, strings green
- **Square corners** — `border-radius: 0` everywhere; `50%` allowed only for genuine small dots (≤12px)
- **Typography** — headings `font-weight: 800`, tight letter-spacing; `.tag` labels are cyan stamp
  chips (ink uppercase mono text on `--c-cyan`, 2px ink border + `3px 3px 0` shadow, rotated `-1deg`)

Shared layout classes (all in `app.css`):

- **`.fr`** — centered 1200px frame, `2px` black left/right borders
- **`.r`** — horizontal row, separated by `border-bottom`; last child has no border
- **`.g2/.g3/.g4/.g6`** — CSS grid column layouts inside a row; cells (`.c`) use `border-right` + `border-bottom` as
  dividers (no gap)
- **`.g-bg`** — graph-paper grid background (32px) for section heading rows
- **`.ticks`** — brand-cyan triangular tick marks (`::before` left, `::after` right) sitting on each row's top border,
  like
  engineering drawing measurement indicators
- **`.wbtn` / `.wbtn-o`** — brutalist buttons: `2px` ink border + `4px 4px 0` hard shadow; hover lifts
  (`translate(-2px,-2px)`, shadow grows to `6px`), active presses down. `.wbtn-o` is the cyan filled primary
  (ink text). `.nav-cta` is the compact header variant
- **`.clickable`** — `.c` cell hover: `inset 0 0 0 2px` ink outline + faint brand tint; `.git-card` same
- **`.bleed-lines`** — top & bottom 1px `var(--c-border)` lines that extend full viewport width (`width:100vw`) beyond the `.fr` container, creating a 井字 (hashtag-frame) effect; combine with `.r` on the same element

Hero (§1 + §1b) lives inside `.fr` as the first two rows of `page/home.html`. All subsequent sections are numbered §2 onward.

## Development

No build process needed. Open `index.html` in a browser or serve with any static file server:

```bash
npx serve .
# or
python3 -m http.server
```
