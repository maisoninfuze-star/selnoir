"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LINES = [
  "Locally sourced.",
  "Fire-finished.",
  "Scripted, course by course,",
  "into a single uninterrupted",
  "evening you don't forget.",
];

export default function Story() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    // Lines are readable by default (CSS). Motion just adds the rise + brighten;
    // under reduced motion they simply appear, already lit.
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const lines = gsap.utils.toArray<HTMLElement>(".story-line span");
        lines.forEach((line, i) => {
          const accent = i === lines.length - 1;
          gsap.fromTo(
            line,
            { yPercent: 120, opacity: 0, color: "#38342e" },
            {
              yPercent: 0,
              opacity: 1,
              color: accent ? "#f0c060" : "#f4efe7",
              ease: "none",
              scrollTrigger: { trigger: line, start: "top 92%", end: "top 58%", scrub: 1 },
            }
          );
        });
      },
      root
    );
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="story">
      <div className="wrap">
        <div className="story-lines">
          {LINES.map((l, i) => (
            <p key={i} className="story-line">
              <span>{l}</span>
            </p>
          ))}
        </div>
      </div>

      <style jsx>{`
        .story {
          padding: 22vh 0;
          background: var(--black);
        }
        .story-lines { margin-top: 2.4rem; }
        .story-line {
          overflow: hidden;
          font-family: var(--serif);
          font-weight: 400;
          font-size: clamp(1.9rem, 6vw, 4.6rem);
          line-height: 1.18;
          letter-spacing: -0.01em;
        }
        .story-line span { display: inline-block; color: #f4efe7; }
        .story-line:last-child span { color: var(--gold); }
      `}</style>
    </section>
  );
}
