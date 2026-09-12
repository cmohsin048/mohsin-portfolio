"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Github } from "lucide-react";
import { projects, site, type Project } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

function Art({ project: p }: { project: Project }) {
  return (
    <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-2xl sm:h-48" style={{ background: `radial-gradient(120% 100% at 0% 0%, hsl(${p.hue} 90% 60% / 0.9), transparent 55%), radial-gradient(90% 90% at 100% 100%, hsl(${(p.hue + 60) % 360} 80% 55% / 0.7), transparent 60%), #1b1b19` }}>
      {p.screenshot ? <Image src={p.screenshot.src} alt={p.screenshot.alt} fill sizes="(min-width: 640px) 504px, 86vw" className="object-contain" /> : <>
        <span aria-hidden className="display absolute -bottom-6 right-4 text-[7rem] leading-none text-paper/10 sm:text-[9rem]">{p.index}</span>
        <div aria-hidden className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:32px_32px]" />
      </>}
    </div>
  );
}

function Card({ p }: { p: Project }) {
  return (
    <article className="work-card flex w-[86vw] shrink-0 flex-col rounded-3xl border border-paper/15 bg-ink-2 p-5 sm:w-[560px] sm:p-7 lg:h-[66vh] lg:min-h-[560px]">
      <Art project={p} />
      <div className="mt-6 flex items-start justify-between gap-4">
        {/* min-w-0 stops flexbox min-width:auto forcing long names (islamicfunds.pk) past the card edge */}
        <div className="min-w-0">
          <h3 className="display break-words text-3xl sm:text-4xl">{p.name}</h3>
          <p className="mt-1 font-mono text-xs opacity-60">{p.year} · {p.role}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" aria-label={`${p.name} on GitHub`} className="rounded-full border border-paper/30 p-2.5 transition hover:bg-paper hover:text-ink"><Github size={16} /></a>}
          {p.live && <a href={p.live} target="_blank" rel="noreferrer" aria-label={`${p.name} live site`} className="rounded-full border border-paper/30 p-2.5 transition hover:bg-lime hover:text-ink"><ArrowUpRight size={16} /></a>}
        </div>
      </div>
      <p className="serif-italic mt-4 text-xl opacity-90 sm:text-2xl">{p.summary}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed opacity-70 sm:text-base">{p.description}</p>
      <ul className="mt-5 flex flex-wrap gap-1.5">
        {p.tags.map((tag) => <li key={tag} className="rounded-full border border-paper/20 px-2.5 py-1 font-mono text-xs opacity-80">{tag}</li>)}
      </ul>
    </article>
  );
}

export function Work({ index }: { index: number }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    const section = ref.current!;
    const track = section.querySelector<HTMLElement>(".work-track")!;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const setHeight = () => { section.style.height = `${window.innerHeight + distance()}px`; };
      setHeight();
      ScrollTrigger.addEventListener("refreshInit", setHeight);
      gsap.to(track, { x: () => -distance(), ease: "none", scrollTrigger: { trigger: section, start: "top top", end: () => `+=${distance()}`, scrub: 0.6, invalidateOnRefresh: true } });
      gsap.to(".work-progress", { scaleX: 1, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: () => `+=${distance()}`, scrub: true, invalidateOnRefresh: true } });
      return () => { ScrollTrigger.removeEventListener("refreshInit", setHeight); section.style.height = ""; };
    });
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const next = section.nextElementSibling as HTMLElement | null;
      if (next) gsap.to(section.querySelector(".work-sticky"), { scale: 0.9, opacity: 0.25, ease: "none", scrollTrigger: { trigger: next, start: () => next.offsetTop - window.innerHeight, end: () => next.offsetTop, scrub: true, invalidateOnRefresh: true } });
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section ref={ref} id="work" className="work relative tone-dark rounded-t-[2.5rem] shadow-[0_-30px_80px_rgba(0,0,0,.35)]" style={{ zIndex: index + 1 }}>
      <div className="work-sticky origin-top lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
        <div className="work-heading flex items-end justify-between px-5 pt-24 sm:px-8 lg:absolute lg:inset-x-0 lg:top-0 lg:z-10">
          <div><p className="eyebrow mb-3">02 — Selected work</p><h2 className="display text-4xl sm:text-6xl">Things I&apos;ve shipped<span className="text-lime">.</span></h2></div>
          <a href={site.github} target="_blank" rel="noreferrer" className="link-line hidden font-mono text-xs uppercase tracking-widest lg:inline">All repos →</a>
        </div>
        <div className="work-track flex flex-col gap-6 px-5 pb-16 pt-10 sm:px-8 lg:h-screen lg:flex-row lg:items-end lg:gap-8 lg:pb-16 lg:pl-8 lg:pr-[10vw] lg:pt-0">
          {projects.map((p) => <Card key={p.name} p={p} />)}
          <a href={site.github} target="_blank" rel="noreferrer" className="work-card flex min-h-[320px] w-[86vw] shrink-0 flex-col items-start justify-between rounded-3xl bg-lime p-7 text-ink transition hover:bg-paper sm:w-[420px] lg:h-[66vh] lg:min-h-[560px]">
            <span className="font-mono text-xs uppercase tracking-widest">And more</span>
            <span className="display text-4xl leading-tight sm:text-5xl">Explore more on GitHub<span className="serif-italic">.</span></span>
            <ArrowUpRight size={40} />
          </a>
        </div>
        <div className="absolute inset-x-8 bottom-8 hidden h-px bg-paper/15 lg:block"><div className="work-progress h-full origin-left scale-x-0 bg-lime" /></div>
      </div>
    </section>
  );
}
