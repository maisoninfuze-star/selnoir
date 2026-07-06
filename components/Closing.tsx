"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Closing() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    // Content is visible by default; motion is enhancement only.
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.to(".room-bg", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: ".room", start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.from(".room-copy > *", {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".room-copy", start: "top 80%" },
        });
        gsap.from(".foot-mark span", {
          opacity: 0,
          yPercent: 60,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".foot-mark", start: "top 88%" },
        });
      },
      root
    );
    return () => mm.revert();
  }, []);

  return (
    <section ref={root}>
      {/* The room */}
      <div className="room">
        <div className="room-bg">
          <img src="/images/room.jpg" alt="The dining room" />
          <div className="room-grade" />
        </div>
        <div className="wrap room-copy">
          <h2>Exposed stone, a single candle,<br />and the glint off the knife.</h2>
          <p>1490 Sherbrooke Ouest · Montréal · Valet evenings</p>
          <a className="reserve-btn" href="#reserve" data-hot>
            Reserve a table
          </a>
        </div>
      </div>

      {/* Footer / last frame */}
      <footer id="reserve" className="foot">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <span className="label">Reservations</span>
              <p className="foot-lead">Open Tuesday through Sunday, from 5 PM.</p>
              <a className="reserve-btn ghost" href="https://www.opentable.com" target="_blank" rel="noreferrer" data-hot>
                Book on OpenTable
              </a>
            </div>
            <div>
              <span className="label">Find us</span>
              <p className="foot-lead">1490 Rue Sherbrooke O<br />Montréal, QC H3G 1L3</p>
              <p className="foot-small">selnoir.ca · @selnoir</p>
            </div>
          </div>

          <div className="foot-mark" aria-label="Sel Noir">
            {"SEL NOIR".split("").map((c, i) =>
              c === " " ? <em key={i} className="sp" /> : <span key={i}>{c}</span>
            )}
          </div>
          <p className="foot-credit">Black salt. Live fire. Concept demo, June 2026.</p>
        </div>
      </footer>

      <style jsx>{`
        .room {
          position: relative;
          min-height: 100vh;
          min-height: 100svh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }
        .room-bg {
          position: absolute;
          inset: -10% 0 0 0;
          height: 120%;
          z-index: 0;
        }
        .room-bg img { width: 100%; height: 100%; object-fit: cover; }
        .room-grade {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(10,10,11,0.6) 0%, transparent 35%, rgba(10,10,11,0.85) 88%, var(--black) 100%);
        }
        .room-copy { position: relative; z-index: 1; padding-bottom: 12vh; }
        .room-copy h2 { font-size: clamp(1.9rem, 4.5vw, 3.8rem); line-height: 1.1; margin: 1.2rem 0 1.4rem; }
        .room-copy p { color: var(--muted); letter-spacing: 0.04em; margin-bottom: 2rem; }

        .reserve-btn {
          display: inline-block;
          padding: 1rem 2.2rem;
          background: var(--ember-1);
          color: var(--black);
          text-decoration: none;
          font-size: 0.74rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          transition: background 0.3s ease, transform 0.3s ease;
        }
        .reserve-btn:hover { background: var(--ember-2); transform: translateY(-2px); }
        .reserve-btn.ghost { background: transparent; border: 1px solid var(--ember-1); color: var(--ember-2); }
        .reserve-btn.ghost:hover { background: var(--ember-1); color: var(--black); }

        .foot { padding: 14vh 0 6vh; background: var(--black); }
        .foot-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          padding-bottom: 12vh;
          border-bottom: 1px solid rgba(200,133,60,0.14);
        }
        .foot-lead { font-family: var(--serif); font-size: 1.5rem; margin: 1rem 0 1.6rem; line-height: 1.4; }
        .foot-small { color: var(--muted); font-size: 0.85rem; letter-spacing: 0.06em; }
        .foot-mark {
          display: flex;
          justify-content: center;
          gap: 0.04em;
          padding: 10vh 0 2vh;
        }
        .foot-mark span {
          font-family: var(--serif);
          font-weight: 500;
          font-size: clamp(2.6rem, 12vw, 9.5rem);
          letter-spacing: 0.04em;
          color: var(--gold);
          opacity: 0.92;
          text-shadow: 0 0 50px rgba(232, 196, 137, 0.2);
        }
        .foot-mark .sp { display: inline-block; width: clamp(1rem, 4vw, 3rem); }
        .foot-credit { text-align: center; color: #4a453d; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; }

        @media (max-width: 760px) {
          .foot-grid { grid-template-columns: 1fr; gap: 2.4rem; }
        }
      `}</style>
    </section>
  );
}
