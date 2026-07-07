"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Wraps an inline element and gives it a magnetic pull toward the cursor as it
 * approaches. The inner content counter-parallaxes slightly for depth. Pointer
 * devices only — touch gets the element untouched. Do not use on position:fixed
 * children (a transformed ancestor breaks fixed positioning).
 */
export default function Magnetic({
  children,
  strength = 0.4,
  radius = 90,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
}) {
  const wrap = useRef<HTMLSpanElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const el = wrap.current;
    const content = inner.current;
    if (!el || !content) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });
    const ixTo = gsap.quickTo(content, "x", { duration: 0.8, ease: "power3.out" });
    const iyTo = gsap.quickTo(content, "y", { duration: 0.8, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const reach = Math.max(r.width, r.height) / 2 + radius;
      if (Math.hypot(dx, dy) < reach) {
        xTo(dx * strength);
        yTo(dy * strength);
        ixTo(dx * strength * 0.35);
        iyTo(dy * strength * 0.35);
      } else {
        xTo(0); yTo(0); ixTo(0); iyTo(0);
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [strength, radius]);

  return (
    <span ref={wrap} className={className} style={{ display: "inline-block", willChange: "transform" }}>
      <span ref={inner} style={{ display: "inline-block", willChange: "transform" }}>
        {children}
      </span>
    </span>
  );
}
