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
i18n.js             # Internationalization service (zh-CN / en)
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

`i18n.js` provides a global `i18n` object with zh-CN (default) and English support. Templates use `{{'key' | i18n}}`
filter syntax. Language toggle is handled via `i18n.getLang()` / `i18n.setLang()`.

## Development

No build process needed. Open `index.html` in a browser or serve with any static file server:

```bash
npx serve .
# or
python3 -m http.server
```
