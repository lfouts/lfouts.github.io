# Loren Love — Portfolio

My personal portfolio site, live at [lorenlove.com](https://lorenlove.com).

I built this from scratch as a way to showcase my work and have a little fun with animation and design. It's a single-page React app styled entirely with Tailwind CSS — no UI library, no router, just clean utility classes and smooth-scroll navigation between sections.

## What I used

- **React 18** for the UI
- **Tailwind CSS v3** for all the styling — custom sage green palette, responsive layouts, hover states
- **GitHub Pages** to host it, with a custom domain locked in via `CNAME`
- **Google Analytics (GA4)** to track visits — and yes, I built an [n8n workflow](https://github.com/lfouts/analytics-pipeline) to pipe that data into a live Grafana dashboard

## Things I'm happy with

- The terminal loader on first visit (`npm run portfolio` — types itself out, then fades away)
- The animated blob behind the hero avatar that morphs shape on a loop
- Skill tags that stagger in one by one when you scroll to the About section
- Project stat badges that count up when the cards come into view
- A scroll progress bar at the top of the page
- Fully responsive — the avatar and nav hide gracefully on mobile

## Running it locally

Everything runs from the `loren-love-portfolio/` folder:

```bash
npm start          # Dev server at localhost:3000
npm run build      # Production build
npm run deploy     # Build and push live to GitHub Pages
```

## Tailwind setup note

Tailwind v3 is wired in via `postcss.config.js` alongside CRA's build. Custom colours (sage green shades, cream background) are defined in `tailwind.config.js`. The only CSS file is `src/index.css` — it holds the Tailwind directives and a couple of custom keyframe animations for the blob and cursor blink effects.
