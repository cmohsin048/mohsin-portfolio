"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Tone = "dark" | "paper" | "lime";

/**
 * A sticky full-height section. When the next panel scrolls over it, this one scales down and dims,
 * so sections visibly merge into each other instead of just scrolling past.
 */
export function Panel({
  id,
  tone,
  index,
  children,
  className = "",
}: {
  id: string;
  tone: Tone;
  index: number;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  // A panel taller than the screen (short or zoomed-in laptops) would stick at top 0 and the next panel
  // would cover everything below the fold. Stick it by its bottom edge instead, so all of it scrolls past first.
  useEffect(() => {
    const el = ref.current!;
    const inner = el.firstElementChild as HTMLElement;
    const fit = () => {
      // panels are position: relative on mobile / reduced motion, where a negative top would shift them
      const sticky = getComputedStyle(el).position === "sticky";
      const overflow = sticky ? Math.max(0, el.offsetHeight - window.innerHeight) : 0;
      el.style.top = `${-overflow}px`;
      // shrink towards the top of the visible part, not the top of the (offscreen) panel
      inner.style.transformOrigin = `50% ${overflow}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)").matches) return;
      const el = ref.current!;
      const inner = el.querySelector<HTMLElement>(":scope > .panel-inner")!;
      const next = el.nextElementSibling as HTMLElement | null;
      if (!next) return;
      gsap.to(inner, {
        scale: 0.9,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          // offsetTop ignores sticky positioning, so measurements stay correct after resize
          trigger: next,
          start: () => next.offsetTop - window.innerHeight,
          end: () => next.offsetTop,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id={id} className={`panel tone-${tone} ${className}`} style={{ zIndex: index + 1 }}>
      <div className="panel-inner">{children}</div>
    </section>
  );
}
