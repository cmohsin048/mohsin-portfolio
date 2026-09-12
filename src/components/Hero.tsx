"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown, FileText } from "lucide-react";
import { site, marqueeWords } from "@/data/portfolio";
import { Marquee } from "@/components/Marquee";
import { Magnetic } from "@/components/Magnetic";

const Blob = dynamic(() => import("@/components/Blob"), { ssr: false });

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-line", { yPercent: 110, duration: 1.1, stagger: 0.12 }, 0.1)
        .from(".hero-sub", { y: 24, opacity: 0, duration: 0.9 }, 0.7)
        .from(".hero-cta", { y: 16, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.95)
        .from(".hero-blob", { scale: 0.6, opacity: 0, duration: 1.4, ease: "expo.out" }, 0.3)
        .from(".hero-marquee", { yPercent: 100, duration: 0.8 }, 1.1);
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative flex min-h-svh flex-col">
      <div className="hero-blob absolute right-[-22%] top-[2%] z-0 h-[46vh] w-[85vw] opacity-80 sm:right-[-4%] sm:top-[6%] sm:h-[80vh] sm:w-[50vw] sm:opacity-100">
        <Blob />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-end px-5 pb-10 pt-32 sm:px-8 sm:pb-14">
        <p className="hero-sub mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
          </span>
          {site.availability} · {site.location}
        </p>

        <h1 className="display text-[16vw] leading-[0.85] sm:text-[13vw]">
          <span className="block overflow-hidden"><span className="hero-line block">{site.firstName}</span></span>
          <span className="block overflow-hidden">
            <span className="hero-line block">
              {site.lastName}<span className="serif-italic text-lime">.</span>
            </span>
          </span>
        </h1>

        <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="hero-sub max-w-xl space-y-3 text-lg leading-relaxed sm:text-xl">
            <p>{site.tagline}</p>
            <p className="text-base text-paper/70">{site.introduction}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Magnetic className="hero-cta">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-paper"
              >
                Explore my work
                <ArrowDown size={16} />
              </a>
            </Magnetic>
            <Magnetic className="hero-cta">
              <a href={site.resume} download className="inline-flex items-center gap-2 rounded-full border border-paper/40 px-6 py-3.5 text-sm transition hover:border-paper">
                Download CV <FileText size={16} />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      <div className="hero-marquee display border-t border-paper/15 py-4 text-3xl uppercase sm:text-5xl">
        <Marquee items={marqueeWords} speed={45} />
      </div>
    </div>
  );
}
