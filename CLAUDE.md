# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

The site at lorenlove.com lives entirely in `loren-love-portfolio/`. All content changes go there.

The React app deploys to lorenlove.com via GitHub Pages using the `gh-pages` package. `public/CNAME` locks the custom domain.

## React App Commands

All commands run from `loren-love-portfolio/`:

```bash
npm start                              # Dev server at localhost:3000
npm run build                          # Production build → build/
npm test                               # Run all tests (Jest via react-scripts)
npm test -- --testPathPattern=App      # Run a single test file
npm run deploy                         # Build + push to gh-pages branch (triggers live deploy)
```

`predeploy` automatically runs `npm run build` before `npm run deploy`.

## Architecture

**`src/App.jsx`** is the entire frontend — one large functional component with no routing library. Navigation uses `scrollIntoView()` for smooth-scroll between sections (About, Projects, Experience, Contact).

Key patterns inside `App.jsx`:
- Custom `useInView` hook wraps `IntersectionObserver` for section fade-in animations
- All styles are inline JS objects; `App.css` / `index.css` are minimal
- Accent color: `#7a9e7e` (sage green), used consistently for highlights and hover states
- Typography uses `clamp()` for fluid sizing with no media query breakpoints

**`public/index.html`** loads Google Analytics (GA4 `G-BQW3GCCYN4`) and the Inter font from Google Fonts. Any third-party scripts belong here, not in `src/`.

