# Geltion — Landing

Dark-fantasy landing page for **Geltion**, a browser-based MMORPG with onchain stakes.

Static site, no build step — open `index.html` in a browser.

## Structure
- `index.html` — markup + inline SVG art (dungeon arch, hero & companion sprites, treasure chest)
- `css/style.css` — full styling: layout, menu cards, dungeon atmosphere, glow/animation
- `js/main.js` — floating dust, animated counter, gate detail, character parallax

## Preview (optional)
Renders a screenshot with a headless Chromium:
```bash
npx puppeteer browsers install chrome
npm install puppeteer-core
node shot.js   # -> preview.png
```

All art is drawn by hand in CSS/SVG.
