import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/portfolio";
import { Magnetic } from "@/components/Magnetic";

export function Contact() {
  const subject = encodeURIComponent("Project inquiry");
  const body = encodeURIComponent("Hi Mohsin,\n\nI'm looking for help with...\n\nTimeline:\nBudget:\n");

  return (
    <div className="flex min-h-svh flex-col justify-between px-5 pb-8 pt-28 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <p className="eyebrow mb-4">06 — Contact</p>
        <h2 className="display text-[15vw] leading-[0.85] sm:text-[9vw]">
          Let&apos;s build<br />
          <span className="serif-italic font-normal">something</span> real.
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-relaxed opacity-80">
          {site.contactText}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href={site.upwork}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-base font-semibold text-paper transition hover:bg-paper hover:text-ink"
            >
              Hire me on Upwork <ArrowUpRight size={18} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a href={`mailto:${site.email}?subject=${subject}&body=${body}`} className="link-line display text-xl sm:text-2xl">
              {site.email}
            </a>
          </Magnetic>
        </div>
      </div>

      <footer className="mx-auto mt-20 flex w-full max-w-6xl flex-col gap-4 border-t border-ink/20 pt-6 font-mono text-xs uppercase tracking-wider sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {site.name} · {site.location}</p>
        <div className="flex gap-6">
          <a href={site.github} target="_blank" rel="noreferrer" className="link-line">GitHub</a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="link-line">LinkedIn</a>
          <a href={site.resume} download className="link-line">Resume</a>
          <a href="#top" className="link-line">Top ↑</a>
        </div>
      </footer>
    </div>
  );
}
