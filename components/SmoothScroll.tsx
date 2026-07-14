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

    // Lenis hijacks scrolling, so native #anchor jumps don't work. Route in-page
    // anchor clicks through Lenis instead (this is what made Reserve / The Room dead).
    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.4, force: true });
      if (history.replaceState) history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onAnchorClick);

    // Pinned/scrubbed triggers AND Lenis's scroll limit are measured before images &
    // fonts settle, against a too-short document. If Lenis keeps a stale (short) limit
    // it clamps scrollTo and can't reach lower sections (Reserve / The Room). Recompute
    // both once everything that affects layout height has loaded.
    const refresh = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    const timers = [setTimeout(refresh, 300), setTimeout(refresh, 1200)];
    window.addEventListener("load", refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);

    const imgs = Array.from(document.images).filter((i) => !i.complete);
    imgs.forEach((i) => i.addEventListener("load", refresh, { once: true }));

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("load", refresh);
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
