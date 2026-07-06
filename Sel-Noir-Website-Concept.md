# SEL NOIR — Futuristic Website Concept

*Dark-luxe cinematic web experience for a Montreal steakhouse*
Prepared June 2026 · Direction: dark luxe / cinematic · Built around your real Instagram aesthetic

---

## The one-line idea

**The site should feel like the moment the door opens at 1490 Sherbrooke** — black, hushed, lit by a single ember — and the whole experience unfolds like a single uninterrupted camera move through smoke, salt, and fire. Your own marketing copy already promises a "carefully scripted, multidimensional, multi-sensory experience." Right now the website doesn't deliver that. This concept makes the website *itself* the first course.

The name does the creative work for us: **Sel Noir = black salt**. That gives us a built-in visual system — a black canvas, crystalline salt textures, ember/gold light, and rising smoke — that no other steakhouse owns.

---

## 1. Honest review of the current site (selnoir.ca)

What's working: clean, the photography is genuinely good, reservation flow via OpenTable is functional, bilingual (FR/EN), and the copy has a strong voice.

What's holding it back:

- It's a **stock WordPress template** (WP Rocket / generic theme). It looks like a hundred other restaurant sites — nothing signals "premium" or "Montreal's most cinematic steakhouse."
- **Zero motion or atmosphere.** Static hero text, static photos. The page makes promises ("multi-sensory," "transcended into a space") that the design never pays off.
- **Repeated/duplicated sections** (Corporate Events appears twice, Reservation/Location/Contact blocks are doubled) — a tell-tale template artifact that reads as unfinished.
- **The menu is a PDF.** A downloaded PDF is the single biggest "we're a normal restaurant" signal and a conversion/SEO leak.
- **The imagery is under-used.** Your Instagram is far moodier and more luxurious than the website — the website is leaving your best asset on the table.

Translation: the *food and brand are luxury; the website is mid-market.* Closing that gap is the entire opportunity.

---

## 2. What the best restaurant & steakhouse sites do (benchmark)

I reviewed the current best-in-class fine-dining and steakhouse sites and the award galleries (Awwwards, WebAwards, DesignRush, Framer). The patterns that separate the top tier:

- **Full-bleed, edge-to-edge photography and video** — the food fills the screen; chrome (menus, buttons) recedes. (Alinea, Eleven Madison Park, COTE Korean Steakhouse.)
- **A restrained palette** — almost always black/charcoal + white + *one* accent. Discipline reads as expensive.
- **Editorial typography** — large serif or refined display type with generous negative space, treated like a magazine spread.
- **Cinematic scroll** — content reveals as you move; the scroll feels like a story unspooling, not a list of sections.
- **Storytelling over selling** — sourcing, technique, the chef, the room. The reservation is the *result* of the seduction, not the headline.
- **Ruthless performance discipline** — the award-winners that survive are the ones that stay fast. Heavy intro animations and uncompressed images kill page speed (a confirmed Google ranking factor). Every effect below is chosen to be *felt but fast.*

The gap between "nice template" and "Awwwards-worthy" is almost entirely **motion + a single signature 3D moment + obsessive detail.** That's exactly what we'll build.

---

## 3. Creative direction: "Black Salt, Live Fire"

**Mood:** midnight, intimate, expensive, alive. Think a darkened dining room where the only light is candle, ember, and the glint off a knife.

**Palette**
- Base: near-black `#0A0A0B` and charcoal `#141416`
- Surface: warm off-black with a faint film-grain
- Accent 1 (primary): **molten ember / gold** `#C8853C` → `#F0C060` (used sparingly — the single voltage)
- Accent 2 (rare): deep blood-red `#7A1414` for live-fire moments
- Text: warm white `#F4EFE7`

**Type**
- Display: a high-contrast modern serif (e.g. *Canela*, *Ogg*, *PP Editorial New*) for big cinematic headlines.
- Body / UI: a clean grotesque (e.g. *Suisse Int'l*, *Neue Haas*, *Inter*) with wide letter-spacing for labels.

**Texture & light:** subtle film grain over everything, volumetric smoke, drifting salt/ember particles, and warm bloom around light sources. This is the connective tissue that makes a web page feel like a *room*.

**Sound (optional, off by default):** a low room-tone ambience + a soft ember crackle, with a tasteful mute toggle. Sound is the fastest path to "multi-sensory" — but always opt-in.

---

## 4. The site, section by section (with the effects)

### Hero — "The door opens"
A full-screen black frame. Smoke drifts. A single line of light reveals the **SEL NOIR** wordmark letter by letter (your logo's spaced-out lettering is perfect for a kinetic reveal). Behind it, a slow, almost-still loop of one signature dish or the live-fire grill, shot in your existing dark style. As the user makes the first scroll, the camera appears to *push through the smoke into the room*.
**Effects:** WebGL smoke/particle layer, kinetic type reveal, scroll-driven "camera push," cursor that leaves a faint warm glow trail.

### The signature 3D moment — "The Salt Crystal" (the wow)
A photoreal, slowly rotating **black-salt crystal** (or a dry-aged tomahawk on the bone — see options in §5) rendered in real-time 3D, lit by a single moving ember light. As you scroll, it rotates and salt grains lift off and drift across the screen, dissolving into the next section. This is the "blow anybody's mind" centerpiece and the image people screenshot and share.

### Philosophy / Story — "Scripted experience"
Big editorial type on black. Lines fade and rise in sequence as you scroll (scroll-triggered). Pull the existing copy ("locally sourced ingredients, techniques and storytelling") and let it breathe like a film's opening titles.

### The Menu — *interactive, not a PDF*
Replace the PDF with a living menu. Dishes laid out as an editorial list; **hovering a dish summons its photo** (from your IG library) with a soft parallax and a one-line description. Filter by Cuts / Seafood / Cocktails / Sharing with smooth animated transitions. Keep a "download PDF" as a secondary option for accessibility, but the *experience* is on-site. This single change is the biggest conversion + SEO win on the list.

### Signature Dishes — "Cinematic gallery"
Full-bleed, horizontally-scrolling showcase of hero plates: the dry-aged tomahawk, the branzino filet, the burrata with cornflowers, the smoked old-fashioned. Each one a near-full-screen panel with a parallax depth effect and a short caption. This is where your already-excellent Instagram photography finally gets the stage it deserves.

### The Bar — "Live fire"
A darker, redder section for the cocktail program. The smoked-cocktail shots get a literal smoke effect on hover; an ember-orange glow pulses behind the featured drink. Copy from your existing voice ("an explosion of unexpected flavours").

### The Room & Story — exposed stone, candlelight
Use the interior shots (the stone wall, the chef at the pass). A subtle scroll-parallax makes the room feel three-dimensional, as if you're walking through it.

### Reservation — frictionless, on-brand
Keep OpenTable, but wrap it so it doesn't dump the user to a generic page mid-spell. A sticky, elegant "Reserve" that's always one tap away; the booking widget styled into the dark theme rather than bolted on.

### Location & Footer — "the last frame"
Address, hours, valet note, a stylized dark map, and the Instagram feed pulled in live (so the site is never stale). End on the wordmark dissolving back into smoke — closing the cinematic loop.

---

## 5. Three options for the signature 3D centerpiece

Pick one as *the* hero moment (all are real-time WebGL, all stay performant):

1. **The Black Salt Crystal** — most ownable, ties directly to the name, abstract and timeless. Salt grains drift and catch the ember light. *Recommended.*
2. **The Dry-Aged Tomahawk** — most visceral and on-the-nose for a steakhouse; a slowly rotating photoreal cut on the bone with rising heat-haze. High craving-factor.
3. **The Ember / Live Flame** — a real-time fire/smoke simulation behind the wordmark. Most atmospheric, least literal.

A strong combination: **Salt Crystal as the hero**, with **live ember particles** as the ambient texture used site-wide.

---

## 6. The effects & animation toolkit

The "futuristic" feel comes from a *layered* set of effects, each subtle on its own:

- **Smooth/inertia scrolling** (Lenis) so the whole page glides — the single biggest "expensive" upgrade.
- **Scroll-triggered storytelling** (GSAP + ScrollTrigger): text rises, images parallax, the 3D object rotates — all tied to scroll position.
- **WebGL atmosphere** (Three.js / React-Three-Fiber): the 3D centerpiece, drifting salt/ember particles, volumetric smoke, warm bloom.
- **Custom cursor**: a soft warm glow that interacts with hoverable elements (grows over the menu, "ignites" over the bar).
- **Page transitions**: between sections/pages the screen fades through smoke or a wipe of light — no hard cuts, ever.
- **Micro-interactions**: buttons that warm/glow on hover, magnetic "Reserve" button, image reveals with a clip-path wipe, numbers/hours that count up.
- **Film grain + subtle vignette** over the whole site for the cinematic texture.
- **Optional ambient sound** with a tasteful toggle.

Every one of these degrades gracefully: if a device is low-powered or the user prefers reduced motion, effects scale back to a fast, elegant static version.

---

## 7. Recommended build (tech stack)

- **Framework:** Next.js (React) — fast, great SEO, easy to host.
- **3D / WebGL:** Three.js via React-Three-Fiber + Drei (and `@react-three/postprocessing` for bloom/grain).
- **Animation:** GSAP + ScrollTrigger for scroll choreography; Framer Motion for UI micro-interactions.
- **Smooth scroll:** Lenis.
- **CMS (so staff can update menu/photos without a developer):** Sanity or Storyblok.
- **Reservations:** keep OpenTable (embedded/themed).
- **Hosting:** Vercel — one-click deploy, fast globally, easy to ship a live preview.

This stack is exactly what the Awwwards-tier sites are built on, and it keeps you fast.

---

## 8. Performance, mobile & accessibility (so it wins instead of just looks cool)

The fastest way to *lose* the luxury feeling is a site that stutters or loads slowly. Guardrails:

- **Mobile gets a tailored, lighter version** of every effect (most of your reservations come from phones). The 3D centerpiece becomes a pre-rendered video loop on low-end devices.
- **`prefers-reduced-motion` respected** — motion-sensitive users get a calm, static, still-beautiful site.
- **Images compressed and lazy-loaded**; the heavy WebGL loads after first paint so the page feels instant.
- **Target: sub-2.5s load, 90+ Lighthouse.** Cinematic *and* fast is the whole game.
- **Keep it bilingual (FR/EN)** — it's a Montreal must and you already have it.

---

## 9. What we can build — phased

**Phase 1 — Proof of concept (the showpiece homepage)**
A single, jaw-dropping animated homepage: hero with smoke + kinetic logo, the 3D salt-crystal moment, scroll-driven story, and the cinematic dish gallery. This alone leapfrogs every competitor and is what you'd show investors/press.

**Phase 2 — The full site**
Interactive menu (kill the PDF), bar section, room/story, reservation flow, location, live Instagram feed, CMS so your team can update it.

**Phase 3 — Polish & extras**
Ambient sound, custom cursor refinement, page transitions, FR/EN, performance tuning, analytics, and an Awwwards/CSS Design Awards submission (genuinely achievable with this direction).

---

## 10. Recommended next step

The most convincing thing I can do next is **build a live, interactive prototype of the Phase-1 homepage** — real smoke, the rotating 3D salt crystal, scroll choreography, and your actual dishes — that you can open in a browser and feel. Concepts on paper undersell motion; one working hero section will make the case instantly.

Say the word and I'll start on the working demo.

---

### A note on the Instagram photos
Your feed is your strongest asset and already shot in exactly the dark, cinematic style this concept needs — branded plates, the dry-aged cuts, branzino, burrata with cornflowers, smoked cocktails, the exposed-stone room. Instagram blocks automated downloading (login + signed image URLs), so to use these in the build, the cleanest path is for you to export the originals (Instagram → your post → ⋯ → or from your camera roll / Meta Business Suite) and drop them in this folder. I'll handle the rest.

---

*Sources: selnoir.ca · instagram.com/selnoirmtl · industry benchmarks from Awwwards, WebAwards, DesignRush, Framer and SiteBuilderReport restaurant-design galleries (2026).*
