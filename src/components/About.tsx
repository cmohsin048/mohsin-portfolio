"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { aboutDetail, manifesto, services, stats } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".scrub-word", { opacity: 1 });
        ref.current?.querySelectorAll<HTMLElement>(".stat-num").forEach((el) => {
          el.textContent = Number(el.dataset.value).toLocaleString();
        });
        return;
      }
      const section = ref.current!.closest("section")!;
      // words fill in as this panel slides over the hero
      gsap.to(".scrub-word", {
        opacity: 1,
        stagger: 0.02,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: () => section.offsetTop - window.innerHeight * 0.9,
          end: () => section.offsetTop + 80,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      // stats count up once visible
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = Number(el.dataset.value);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: () => section.offsetTop - window.innerHeight * 0.4, once: true, invalidateOnRefresh: true },
          onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString(); },
        });
      });
      gsap.from(".service-row", {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: () => section.offsetTop - window.innerHeight * 0.5, once: true, invalidateOnRefresh: true },
      });
    },
    { scope: ref },
  );

  const words = manifesto.split(" ");

  return (
    <div ref={ref} className="px-5 py-16 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-4">01 — About</p>
        <p className="display max-w-4xl text-[6.5vw] leading-[1.02] sm:text-[2.5vw]">
          {words.map((w, i) => (
            <span key={i} className="scrub-word">{w}&nbsp;</span>
          ))}
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-4 text-base leading-relaxed opacity-80">
            {aboutDetail.map((p) => <p key={p.slice(0, 16)}>{p}</p>)}
          </div>
          {/* GitHub repo counts live in the GitHub section only - do not duplicate them here */}
          <dl className="self-start">
            {stats.map((s) => (
              <div key={s.label} className="border-t border-ink/20 pt-4">
                <dd className="display text-4xl sm:text-5xl">
                  <span className="stat-num" data-value={s.value}>{s.value.toLocaleString()}</span>{s.suffix}
                </dd>
                <dt className="mt-2 text-sm opacity-70">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <ul className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
          {services.map((s) => (
            <li key={s.n} className="service-row grid gap-1 py-4 sm:grid-cols-[3rem_1fr_1.5fr] sm:items-baseline sm:gap-6">
              <span className="font-mono text-xs opacity-50">{s.n}</span>
              <h3 className="display text-xl sm:text-2xl">{s.title}</h3>
              <p className="text-sm leading-relaxed opacity-75">{s.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
