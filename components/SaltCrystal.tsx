"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SaltCrystal() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const v = video.current;
    const mm = gsap.matchMedia();

    // Motion-sensitive: hold the crystal on its poster frame.
    mm.add("(prefers-reduced-motion: reduce)", () => {
      v?.pause();
    });

    // Copy reveal + transform parallax + a smooth ambient loop that only decodes
    // while the section is on screen. (Scroll-scrubbing the video by seeking every
    // frame was the main source of jank, so the rotation now runs on its own.)
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.utils.toArray<HTMLElement>(".sc-reveal span").forEach((line) => {
          gsap.from(line, {
            yPercent: 110,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: line, start: "top 88%" },
          });
        });
        gsap.fromTo(
          ".sc-media",
          { scale: 1.04, yPercent: -3 },
          { scale: 1.14, yPercent: 3, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } }
        );

        if (!v || !root.current) return;
        v.loop = true;
        const io = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (e.isIntersecting) v.play?.().catch(() => {});
              else v.pause();
            }
          },
          { threshold: 0.01 }
        );
        io.observe(root.current);
        return () => { io.disconnect(); v.pause(); };
      },
      root
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="crystal-sec">
      <div className="crystal-sticky">
        <video
          ref={video}
          className="sc-media"
          src="/video/crystal.mp4"
          poster="/images/salt-macro.jpg"
          aria-label="Black salt crystals turning slowly, catching the last of the ember light"
          muted
          playsInline
          preload="auto"
        />
        <div className="sc-grade" />

        <div className="crystal-copy">
          <h2 className="sc-reveal">
            <span>Black salt,</span>
            <span><em>caught in fire.</em></span>
          </h2>
          <p>
            Every cut is finished by hand with our namesake: crystals of black salt
            drawn across the grain, catching the last of the ember light before they reach you.
          </p>
        </div>
      </div>

      <style jsx>{`
        .crystal-sec {
          position: relative;
          height: 200vh;
          background: var(--black);
        }
        .crystal-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          height: 100svh;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .sc-media {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 70% center;
          will-change: transform;
        }
        .sc-grade {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, var(--black) 8%, rgba(10,10,11,0.65) 38%, transparent 70%),
            radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(10,10,11,0.7) 100%);
        }
        .crystal-copy {
          position: relative;
          z-index: 2;
          max-width: 520px;
          margin-left: clamp(1.5rem, 8vw, 9rem);
          pointer-events: none;
        }
        .crystal-copy h2 {
          font-size: clamp(2.4rem, 6vw, 5rem);
          line-height: 1.02;
          margin: 1.4rem 0 1.6rem;
        }
        .crystal-copy h2 :global(em) { color: var(--ember-2); font-style: italic; }
        .sc-reveal span { display: block; overflow: hidden; }
        .crystal-copy p {
          max-width: 30rem;
          color: var(--muted);
          font-size: clamp(0.9rem, 1.3vw, 1.05rem);
          line-height: 1.85;
        }
        @media (max-width: 760px) {
          .crystal-copy { margin: 0 1.5rem; }
          .sc-grade { background: linear-gradient(180deg, rgba(10,10,11,0.5), rgba(10,10,11,0.85)); }
        }
      `}</style>
    </section>
  );
}
