# Sel Noir

A dark-luxe, cinematic single-page site for **Sel Noir**, a steakhouse at 1490 Sherbrooke, Montréal. The name means *black salt* — the whole experience is built on a black canvas lit by ember, salt, and live fire, and unfolds like one uninterrupted camera move.

## The build

- **Hero** — a live-fire video loop behind a kinetic, gold serif wordmark.
- **Signature** — a scroll-scrubbed black-salt video (rotation driven by scroll on desktop; a smooth ambient loop on phones).
- **Philosophy** — editorial lines that rise and light as you scroll.
- **The Plates** — a horizontally-pinned dish gallery on desktop that stacks vertically on phones.
- **The Room & Footer** — parallax room, reservation, and a dissolving wordmark that closes the loop.

## Stack

- **Next.js 14** (App Router), TypeScript
- **GSAP + ScrollTrigger** for scroll choreography (`gsap.matchMedia` for responsive desktop/mobile setups)
- **Lenis** for smooth scrolling
- Custom CSS + styled-jsx — no component libraries, bespoke and art-directed
- Imagery and video generated with **fal.ai** (flux-pro stills, Kling image-to-video), re-encoded with ffmpeg (720p, seamless boomerang loops). Videos pause when off-screen so only one decodes at a time.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Motion & accessibility

Every scroll animation degrades gracefully: `prefers-reduced-motion` holds videos on a still frame and drops the choreography, content is readable by default (never gated behind a reveal), and heavy video-seeking is swapped for a smooth loop on touch devices. Viewport heights use `svh` to avoid the mobile address-bar jump.

## Regenerating media

`scripts/genvideo.mjs` reproduces the videos from the stills via fal.ai. It reads `FAL_KEY` from the environment; run it from the project root so it resolves `@fal-ai/client`.

---

Concept demo, 2026. Black salt. Live fire.
