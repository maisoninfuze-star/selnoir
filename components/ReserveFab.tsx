"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ReserveFab() {
  const el = useRef<HTMLAnchorElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const a = el.current;
    const l = label.current;
    if (!a || !l) return;

    const xTo = gsap.quickTo(a, "x", { duration: 0.7, ease: "power3.out" });
    const yTo = gsap.quickTo(a, "y", { duration: 0.7, ease: "power3.out" });
    const lxTo = gsap.quickTo(l, "x", { duration: 0.85, ease: "power3.out" });
    const lyTo = gsap.quickTo(l, "y", { duration: 0.85, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      const r = a.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const reach = Math.max(r.width, r.height) / 2 + 110;
      if (Math.hypot(dx, dy) < reach) {
        xTo(dx * 0.4); yTo(dy * 0.4);
        lxTo(dx * 0.14); lyTo(dy * 0.14);
      } else {
        xTo(0); yTo(0); lxTo(0); lyTo(0);
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <a ref={el} className="reserve-fab" href="#reserve" data-hot>
      <span ref={label} className="reserve-fab-label">Reserve</span>
    </a>
  );
}
