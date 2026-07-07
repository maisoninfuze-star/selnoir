"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Kinetic wordmark reveal — letter by letter on a line of light
      const letters = gsap.utils.toArray<HTMLElement>(".hero-letter");
      gsap.set(letters, { yPercent: 120, opacity: 0 });
      gsap.set(".hero-sub", { opacity: 0, y: 20 });
      gsap.set(".hero-scrollcue", { opacity: 0 });

      if (reduce) {
        gsap.set([letters, ".hero-sub", ".hero-scrollcue"], { yPercent: 0, y: 0, opacity: 1 });
        // Motion-sensitive: hold the hero on its still frame instead of looping fire.
        const v = root.current?.querySelector<HTMLVideoElement>(".hero-video");
        v?.pause();
      } else {
        const tl = gsap.timeline({ delay: 0.35 });
        tl.to(letters, {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.075,
        })
          .to(".hero-sub", { opacity: 1, y: 0, duration: 1 }, "-=0.4")
          .to(".hero-scrollcue", { opacity: 1, duration: 1 }, "-=0.3");

        // Scroll-driven camera push through the smoke
        gsap.to(".hero-media", {
          scale: 1.35,
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-content", {
          yPercent: -40,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "60% top", scrub: true },
        });
      }
    }, root);

    // Stop decoding the fire loop once the hero is scrolled away.
    const v = root.current?.querySelector<HTMLVideoElement>(".hero-video");
    let io: IntersectionObserver | undefined;
    if (v && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) v.play?.().catch(() => {});
            else v.pause();
          }
        },
        { threshold: 0.01 }
      );
      io.observe(root.current!);
    }

    return () => { io?.disconnect(); ctx.revert(); };
  }, []);

  const word = "SEL NOIR";

  return (
    <section ref={root} className="hero">
      <div className="hero-media">
        <video
          className="hero-video"
          src="/video/hero.mp4"
          poster="/images/hero-grill.jpg"
          aria-label="A thick steak searing over live fire, smoke rising in a dark room"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="hero-grade" />
      </div>

      <div className="hero-content">
        <div className="hero-wordmark" aria-label="Sel Noir">
          {word.split("").map((ch, i) =>
            ch === " " ? (
              <span key={i} className="hero-space" />
            ) : (
              <span key={i} className="hero-letter-mask">
                <span className="hero-letter">{ch}</span>
              </span>
            )
          )}
        </div>
        <p className="hero-sub">
          Black salt. Live fire. A carefully scripted, multi-sensory evening.
          <br />1490 Sherbrooke, Montréal.
        </p>
      </div>

      <div className="hero-scrollcue">
        <span className="label">Enter</span>
        <span className="hero-scrollline" />
      </div>

      <style jsx>{`
        .hero {
          height: 100vh;
          height: 100svh;
          min-height: 640px;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-media {
          position: absolute;
          inset: 0;
          will-change: transform;
          transform-origin: 50% 60%;
        }
        .hero-media img,
        .hero-media .hero-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 60%;
        }
        .hero-grade {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 62%, rgba(10,10,11,0) 18%, rgba(10,10,11,0.55) 60%, rgba(10,10,11,0.96) 100%),
            linear-gradient(to bottom, rgba(10,10,11,0.7) 0%, transparent 28%, transparent 60%, rgba(10,10,11,0.9) 100%);
        }
        .hero-content {
          position: relative;
          z-index: 3;
          text-align: center;
          padding: 0 1.5rem;
          will-change: transform;
        }
        .hero-wordmark {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          line-height: 0.9;
        }
        .hero-letter-mask {
          display: inline-block;
          overflow: hidden;
        }
        .hero-letter {
          display: inline-block;
          font-family: var(--serif);
          font-weight: 500;
          font-size: clamp(3.2rem, 13vw, 9.5rem);
          letter-spacing: 0.04em;
          color: var(--gold);
          text-shadow: 0 0 55px rgba(232, 196, 137, 0.28), 0 2px 30px rgba(0, 0, 0, 0.55);
        }
        .hero-space { display: inline-block; width: clamp(1.4rem, 5vw, 4rem); }
        .hero-sub {
          margin-top: 1.8rem;
          font-size: clamp(0.82rem, 1.4vw, 1rem);
          line-height: 1.9;
          letter-spacing: 0.04em;
          color: #cdc7bc;
          text-shadow: 0 1px 16px rgba(0, 0, 0, 0.85);
        }
        .hero-scrollcue {
          position: absolute;
          bottom: 2.2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 4;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
        }
        .hero-scrollline {
          width: 1px;
          height: 46px;
          background: linear-gradient(to bottom, var(--ember-2), transparent);
          animation: pulse 2.4s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.7); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1); transform-origin: top; }
        }
      `}</style>
    </section>
  );
}
