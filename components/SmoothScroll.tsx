"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Pinned/scrubbed triggers are created before images & fonts settle, so their
    // start/end are measured against a too-short document. Recompute once everything
    // that affects layout height has loaded, otherwise the pinned gallery overlaps Story.
    const refresh = () => ScrollTrigger.refresh();
    const timers = [setTimeout(refresh, 300), setTimeout(refresh, 1200)];
    window.addEventListener("load", refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);

    const imgs = Array.from(document.images).filter((i) => !i.complete);
    imgs.forEach((i) => i.addEventListener("load", refresh, { once: true }));

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
