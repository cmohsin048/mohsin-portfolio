"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { education, experience } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const section = ref.current!.closest("section")!;
      gsap.from(".xp-row", {
        x: -40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: () => section.offsetTop - window.innerHeight * 0.6, once: true, invalidateOnRefresh: true },
      });
      gsap.from(".xp-line", {
        scaleX: 0,
        transformOrigin: "left",
        stagger: 0.12,
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: { trigger: section, start: () => section.offsetTop - window.innerHeight * 0.6, once: true, invalidateOnRefresh: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-3">05 — Experience</p>
        <h2 className="display text-4xl sm:text-6xl">
          Where I&apos;ve worked<span className="text-lime">.</span>
        </h2>

        <ol className="mt-14">
          {experience.map((e) => (
            <li key={e.company} className="xp-row">
              <div className="xp-line h-px w-full bg-ink/20" />
              <div className="grid gap-4 py-8 md:grid-cols-[10rem_1fr_1.6fr] md:gap-8">
                <p className="font-mono text-xs opacity-60">{e.period}<br />{e.location}</p>
                <div>
                  <h3 className="display text-2xl sm:text-3xl">{e.company}</h3>
                  <p className="serif-italic mt-1 text-lg opacity-80">{e.role}</p>
                </div>
                <ul className="space-y-2 text-sm leading-relaxed opacity-80 sm:text-base">
                  {e.bullets.map((b) => <li key={b}>— {b}</li>)}
                </ul>
              </div>
            </li>
          ))}
          <li className="xp-row">
            <div className="xp-line h-px w-full bg-ink/20" />
            <div className="grid gap-4 py-8 md:grid-cols-[10rem_1fr_1.6fr] md:gap-8">
              <p className="font-mono text-xs opacity-60">Education</p>
              <h3 className="display text-2xl sm:text-3xl">{education.degree}</h3>
              <p className="text-sm opacity-80 sm:text-base">{education.school}</p>
            </div>
            <div className="xp-line h-px w-full bg-ink/20" />
          </li>
        </ol>
      </div>
    </div>
  );
}
