"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DISHES = [
  { img: "tomahawk", n: "01", name: "Dry-Aged Tomahawk", note: "45 days · black salt · live coal", tag: "The Cut" },
  { img: "branzino", n: "02", name: "Whole Branzino", note: "charred lemon · fennel pollen", tag: "From the Sea" },
  { img: "burrata", n: "03", name: "Burrata & Cornflower", note: "stone-pressed oil · sea salt", tag: "To Begin" },
  { img: "cocktail", n: "04", name: "Smoked Old Fashioned", note: "an explosion of unexpected flavour", tag: "The Bar" },
];

export default function DishGallery() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // matchMedia sets up the horizontal pin only on pointer-capable wide screens, and
    // tears it down automatically if the viewport crosses the breakpoint (rotation,
    // resize). On phones the section falls back to the CSS vertical stack — no pin.
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 761px) and (prefers-reduced-motion: no-preference)",
      () => {
        const t = track.current!;
        const distance = () => t.scrollWidth - window.innerWidth;
        gsap.to(t, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>(".dish-img img").forEach((img) => {
          gsap.fromTo(img, { xPercent: -8 }, {
            xPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: 1,
            },
          });
        });
      },
      root
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="gallery">
      <div ref={track} className="gallery-track">
        <div className="gallery-intro">
          <h2>Eight courses,<br /><em>one camera move.</em></h2>
          <p className="gallery-cue">Scroll <span aria-hidden>→</span></p>
        </div>

        {DISHES.map((d) => (
          <article key={d.n} className="dish">
            <div className="dish-img">
              <img src={`/images/${d.img}.jpg`} alt={d.name} />
            </div>
            <div className="dish-meta">
              <span className="dish-n">{d.n}</span>
              <span className="label">{d.tag}</span>
              <h3>{d.name}</h3>
              <p>{d.note}</p>
            </div>
          </article>
        ))}
      </div>

      <style jsx>{`
        .gallery {
          background: linear-gradient(to bottom, var(--black), #0d0908);
          overflow: hidden;
        }
        .gallery-track {
          display: flex;
          align-items: center;
          gap: clamp(2rem, 5vw, 5rem);
          padding: 8vh clamp(1.5rem, 6vw, 7rem);
          width: max-content;
          min-height: 100vh;
          min-height: 100svh;
        }
        .gallery-intro {
          flex: 0 0 auto;
          width: clamp(280px, 34vw, 460px);
          padding-right: 2rem;
        }
        .gallery-intro h2 {
          font-size: clamp(2.2rem, 4.5vw, 4rem);
          line-height: 1.05;
          margin: 1.2rem 0 1.6rem;
        }
        .gallery-intro :global(em) { color: var(--ember-2); font-style: italic; }
        .gallery-intro p { color: var(--muted); letter-spacing: 0.2em; text-transform: uppercase; font-size: 0.72rem; }
        .dish {
          flex: 0 0 auto;
          width: clamp(300px, 42vw, 560px);
          display: flex;
          flex-direction: column;
        }
        .dish-img {
          position: relative;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border: 1px solid rgba(200, 133, 60, 0.12);
        }
        .dish-img img {
          position: absolute;
          inset: -6% -12%;
          width: 124%;
          height: 112%;
          object-fit: cover;
          filter: saturate(1.05) contrast(1.05);
        }
        .dish-meta {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding-top: 1.4rem;
        }
        .dish-n { font-family: var(--serif); color: var(--ember-1); font-size: 0.9rem; letter-spacing: 0.2em; }
        .dish-meta h3 { font-size: clamp(1.5rem, 2.6vw, 2.3rem); margin-top: 0.2rem; }
        .dish-meta p { color: var(--muted); font-size: 0.92rem; letter-spacing: 0.02em; }

        @media (max-width: 760px) {
          .gallery-track {
            flex-direction: column;
            width: 100%;
            gap: 4rem;
            padding: 12vh 1.5rem;
          }
          .gallery-intro, .dish { width: 100%; }
          .dish-img img { inset: 0; width: 100%; height: 100%; }
        }
      `}</style>
    </section>
  );
}
