"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;

    // Only stage the theatre once per visit.
    const seen = sessionStorage.getItem("sn-intro");
    if (seen || reduce) {
      setDone(true);
      return;
    }

    window.scrollTo(0, 0);
    lenis?.stop();
    document.body.style.overflow = "hidden";

    // Never let the curtain trap the site: whether the timeline completes or the
    // fail-safe fires first, releasing runs exactly once and always restores scroll.
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      sessionStorage.setItem("sn-intro", "1");
      document.body.style.overflow = "";
      lenis?.start();
      setDone(true);
    };
    const failsafe = setTimeout(release, 9000);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: release });

      gsap.set(".pl-logo", { opacity: 0, scale: 0.94, filter: "blur(7px)" });
      gsap.set(".pl-line", { scaleX: 0 });
      gsap.set([".pl-top", ".pl-bottom"], { opacity: 0, y: 12 });

      tl.to(".pl-top", { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" })
        .to(".pl-logo", { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.3, ease: "power3.out" }, "-=0.35")
        .to(".pl-line", { scaleX: 1, duration: 1, ease: "expo.inOut" }, "-=0.8")
        .to(".pl-bottom", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.7")
        .to({}, { duration: 0.9 })
        // the door opens: curtain lifts to reveal the room beneath
        .to(".pl-inner", { yPercent: -18, opacity: 0, duration: 1.1, ease: "power3.inOut" })
        .to(root.current, { yPercent: -100, duration: 1.2, ease: "expo.inOut" }, "-=0.9");
    }, root);

    return () => {
      clearTimeout(failsafe);
      ctx.revert();
    };
  }, []);

  if (done) return null;

  return (
    <div ref={root} className="preloader" aria-hidden>
      <div className="pl-inner">
        <span className="pl-top">Montréal</span>
        <img className="pl-logo" src="/logo.png" alt="Sel Noir Steakhouse" />
        <div className="pl-line" />
        <span className="pl-bottom">Black salt · Live fire</span>
      </div>

      <style jsx>{`
        .preloader {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background: var(--black);
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform;
        }
        .pl-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.4rem;
          padding: 2rem;
          will-change: transform, opacity;
        }
        .pl-top {
          font-family: var(--grotesk);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: var(--gold);
          padding-left: 0.42em;
        }
        .pl-logo {
          width: clamp(260px, 46vw, 520px);
          height: auto;
          display: block;
          will-change: transform, opacity, filter;
        }
        .pl-line {
          width: min(320px, 60vw);
          height: 1px;
          background: linear-gradient(to right, transparent, var(--gold), transparent);
          transform-origin: center;
        }
        .pl-bottom {
          font-family: var(--grotesk);
          font-size: 0.74rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--muted);
        }
      `}</style>
    </div>
  );
}
