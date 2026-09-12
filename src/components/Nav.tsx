"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/portfolio";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#github", label: "GitHub" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

function LocalTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: site.timezone, hour12: false });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="font-mono text-xs tabular-nums tracking-wider">
      ISB <span className="opacity-60">{t || "--:--:--"}</span>
    </span>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-[90] mix-blend-difference text-white">
      <nav className="flex items-center justify-between px-5 py-5 sm:px-8">
        <a href="#top" className="display text-lg leading-none">
          {site.firstName}
          <span className="serif-italic ml-1 text-lg font-normal">Raza</span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          <LocalTime />
          <ul className="flex items-center gap-6 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-line">{l.label}</a>
              </li>
            ))}
          </ul>
          <a href={site.resume} download className="rounded-full border border-white px-4 py-2 text-sm transition hover:bg-white hover:text-black">
            Download CV
          </a>
        </div>

        <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((o) => !o)} className="font-mono text-xs uppercase tracking-widest lg:hidden">
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div id="mobile-navigation" className="mx-5 max-h-[calc(100svh-5rem)] overflow-y-auto rounded-2xl bg-white p-6 text-black mix-blend-normal lg:hidden">
          <ul className="space-y-3">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="display text-3xl">{l.label}</a>
              </li>
            ))}
          </ul>
          <a href={site.resume} download className="mt-6 block rounded-full bg-black px-4 py-3 text-center text-sm text-white">
            Download CV
          </a>
        </div>
      )}
    </header>
  );
}
