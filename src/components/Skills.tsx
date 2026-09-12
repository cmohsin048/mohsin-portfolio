import { skills } from "@/data/portfolio";
import { Marquee } from "@/components/Marquee";

export function Skills() {
  const all = skills.flatMap((g) => g.items);
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="eyebrow mb-3">04 — Skills</p>
        <h2 className="display text-4xl sm:text-6xl">
          What I work with<span className="text-lime">.</span>
        </h2>
      </div>

      <ul className="mx-auto mt-12 max-w-6xl border-t border-paper/15">
        {skills.map((g, i) => (
          <li key={g.title} className="skill-row border-b border-paper/15">
            <div className="grid gap-2 px-5 py-6 sm:grid-cols-[4rem_14rem_1fr] sm:items-baseline sm:px-8">
              <span className="font-mono text-xs opacity-50">0{i + 1}</span>
              <h3 className="display text-2xl sm:text-3xl">{g.title}</h3>
              <p className="text-sm leading-relaxed opacity-75 sm:text-base">{g.items.join(" · ")}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="display mt-16 space-y-2 text-4xl uppercase sm:text-6xl">
        <Marquee items={all.slice(0, Math.ceil(all.length / 2))} speed={70} className="outline-text" separator="·" />
        <Marquee items={all.slice(Math.ceil(all.length / 2))} reverse speed={80} separator="·" />
      </div>
    </div>
  );
}
