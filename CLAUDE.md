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

## Development

No build process needed. Open `index.html` in a browser or serve with any static file server:

```bash
npx serve .
# or
python3 -m http.server
```
