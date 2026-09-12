"use client";

import { useRef, type ReactNode } from "react";
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
