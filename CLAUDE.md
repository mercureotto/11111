# GELTION — project memory

Browser-based dark-fantasy MMORPG. This repo currently holds the **landing page**.
The art style locked in here is the **basis for the future game**.

Reply to the user in **Russian**.

## Tech
- Static site, no build step. Open `index.html` directly.
  - `index.html` — full-bleed background + top bar + hero overlay text + Guest nameplate + brand/support.
  - `css/style.css` — all styling. The live layout rules are the `v4` (full-bleed) + `v5` blocks at the bottom; earlier blocks are legacy/overridden.
  - `js/main.js` — dust particles, top-nav active state, region dropdown, sign-in toast.
- `shot.js` — puppeteer screenshot tool (`node shot.js` → `preview.png` + `crop.png`).
  Chrome at `/root/.cache/puppeteer/chrome/linux-131.0.6778.204/chrome-linux64/chrome`
  (install once: `npx puppeteer browsers install chrome` + `npm i puppeteer-core`).
  For video bg add launch arg `--autoplay-policy=no-user-gesture-required`.
- Fonts via Google Fonts (Cinzel, Cinzel Decorative, MedievalSharp, Silkscreen).

## Layout (approved)
- **Full-bleed background** covering the whole page (`object-fit:cover`). No boxed stage.
- Top bar only: nav (Play/Coins/Airdrop/Achievements) + region dropdown + small "Sign in to play".
- Hero text top-left: "Welcome back, adventurer 🍀", "DUNGEONS: NOW LIVE!", short description, status dots (Dungeons/Islands/Gold rush). **No** trophy/keys stat.
- "Guest" nameplate floats above the hero. "GELTION" wordmark + support button bottom-right.
- **Removed for good:** left menu cards, right rail (Guest avatar + PTS), center "Sign in" CTA.

## Art direction (approved — the game's basis)
Detailed **2D pixel-art / hand-painted dark-fantasy** (flat 2D, cel-shaded, NOT 3D, NOT photoreal).
Scene = dungeon hall, head-on flat platformer perspective, fills the frame:
- Centre: a **simple young blonde adventurer** in a cloth tunic — **NOT a knight, no plate armor, NO cape**; clean appealing face (drawn **large/close** so the face reads — small heroes look "derpy").
- Stands on an **aged, muted grey stone pedestal** (cracked/weathered, **NOT bright white**, moderate size).
- Back wall: ornate **heraldic shield + crossed swords** emblem (beautiful).
- Background: **scattered broken/ruined arches** (not rows of standing columns).
- Floor: **blood splatters in several spots**, **scattered gold coins**, a stone ledge along the bottom.
- Warm torches (left/right). **No plants / moss / greenery anywhere.**
- Everything must be ONE consistent style — don't mix pixel + 3D.

## Asset pipeline (Higgsfield MCP, free tier `z_image`)
- Scenes: `generate_image` model **`z_image`**, `aspect_ratio:"16:9"`, count 4 (~0.15 cr each).
  Generate the whole scene (hero baked in) so style is consistent. Pick the best of 4 via a
  comparison grid (puppeteer), download the `min.webp` → `assets/scene.webp` (poster), keep a 2nd as `assets/scene-alt.webp`.
- Animation (fire + hero idle): `generate_video` model **`seedance_1_5`**, 480p, 4s,
  `medias:[{role:"start_image", value:<scene job_id>}]`, prompt = static locked camera, flames flicker,
  hero subtle idle, dust, no warp (~2.4 cr). Download mp4 → `assets/scene.mp4`, set bg to
  `<video autoplay muted loop playsinline poster="assets/scene.webp">`.
- Background cutout: `remove_background` (image). Candidate art files are git-ignored (see `.gitignore`).
- **Credits:** free plan started ~25, now nearly depleted. `z_image` cheap; video ~2.4 each;
  premium models (soul_location etc.) need a paid plan. Check `balance` before spending.

## Status / next
- Landing background is currently a **static** generated scene (`assets/scene.webp`).
- To animate: top up Higgsfield, then run the seedance i2v step above → `scene.mp4` → swap bg to `<video>`.
- Next phase: build the actual game on this art basis.

## Git
- Work on branch `claude/nice-hopper-znxi72` (PR #1). Commit + push after changes.
