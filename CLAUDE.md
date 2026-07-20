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
  component/        # Component showcase page
  contrast/         # Code examples page
  extra/            # Extensions/modules page
  doc/              # Documentation page
  flow/             # Workflow page
```

## Routing

Routes are hash-based (`#!/path`) defined in `app.js`:

- `/` → `page/home.html`
- `/component` → `page/component/component.html`
- `/contrast` → `page/contrast/contrast.html`
- `/module` → `page/extra/extra.html`
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

## Design Language — Brutalist-Minimal

The whole site uses a **Brutalist-Minimal** design language (新粗野主义 + 极简): ink-black structural
lines on flat white, one loud accent color, hard offset shadows, zero border-radius, no gradients / blur / glow.

Core rules (tokens live in `app.css` `:root`):

- **Ink lines** — `--c-border: #0A0A0F`; every divider is a visible black line. Outer frames
  (`.fr`, header, footer, standalone cards) use `2px`, inner dividers use `1px`
- **Hard shadows only** — `--c-shadow: 4px 4px 0 var(--c-text)`; never blurred `box-shadow`,
  `text-shadow`, or `backdrop-filter`
- **Single accent** — `--c-brand: #FF5722` is the only accent color for site chrome
  (status/data semantics inside product mockups may keep their own colors)
- **Square corners** — `border-radius: 0` everywhere; `50%` allowed only for genuine small dots (≤12px)
- **Typography** — headings `font-weight: 800`, tight letter-spacing; `.tag` labels are black stamp
  chips (white uppercase mono text on `--c-text` background)

Shared layout classes (all in `app.css`):

- **`.fr`** — centered 1200px frame, `2px` black left/right borders
- **`.r`** — horizontal row, separated by `border-bottom`; last child has no border
- **`.g2/.g3/.g4/.g6`** — CSS grid column layouts inside a row; cells (`.c`) use `border-right` + `border-bottom` as
  dividers (no gap)
- **`.g-bg`** — graph-paper grid background (32px) for section heading rows
- **`.ticks`** — orange triangular tick marks (`::before` left, `::after` right) sitting on each row's top border, like
  engineering drawing measurement indicators
- **`.wbtn` / `.wbtn-o`** — brutalist buttons: `2px` black border + `3px 3px 0` hard shadow; hover lifts
  (`translate(-2px,-2px)`, shadow grows), active presses down. `.wbtn-o` is the brand-orange filled primary.
  `.nav-cta` is the compact header variant
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
