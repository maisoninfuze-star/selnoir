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

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("sn-intro", "1");
          document.body.style.overflow = "";
          lenis?.start();
          setDone(true);
        },
      });

      gsap.set(".pl-letter", { yPercent: 120 });
      gsap.set(".pl-line", { scaleX: 0 });
      gsap.set([".pl-top", ".pl-bottom"], { opacity: 0, y: 12 });

      tl.to(".pl-top", { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" })
        .to(".pl-letter", { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.06 }, "-=0.3")
        .to(".pl-line", { scaleX: 1, duration: 1, ease: "expo.inOut" }, "-=0.7")
        .to(".pl-bottom", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.7")
        .to({}, { duration: 0.8 })
        // the door opens: curtain lifts to reveal the room beneath
        .to(".pl-inner", { yPercent: -18, opacity: 0, duration: 1.1, ease: "power3.inOut" })
        .to(root.current, { yPercent: -100, duration: 1.2, ease: "expo.inOut" }, "-=0.9");
    }, root);

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div ref={root} className="preloader" aria-hidden>
      <div className="pl-inner">
        <span className="pl-top">Montréal</span>
        <div className="pl-mark" aria-label="Sel Noir">
          {"SEL NOIR".split("").map((c, i) =>
            c === " " ? (
              <span key={i} className="pl-space" />
            ) : (
              <span key={i} className="pl-letter-mask">
                <span className="pl-letter">{c}</span>
              </span>
            )
          )}
        </div>
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
        .pl-mark {
          display: flex;
          align-items: flex-end;
          line-height: 0.9;
        }
        .pl-letter-mask { display: inline-block; overflow: hidden; }
        .pl-letter {
          display: inline-block;
          font-family: var(--serif);
          font-weight: 500;
          font-size: clamp(2.6rem, 9vw, 6.5rem);
          letter-spacing: 0.05em;
          color: var(--text);
        }
        .pl-space { display: inline-block; width: clamp(1rem, 3.5vw, 2.6rem); }
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
