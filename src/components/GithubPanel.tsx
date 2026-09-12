import { ArrowUpRight, GitCommitHorizontal, Github } from "lucide-react";
import { site } from "@/data/portfolio";
import { getGithubActivity, type Day } from "@/lib/github";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

function toWeeks(days: Day[]): (Day | null)[][] {
  if (!days.length) return [];
  const pad = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells: (Day | null)[] = [...Array<null>(pad).fill(null), ...days];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function monthLabels(weeks: (Day | null)[][]) {
  const labels: { col: number; text: string }[] = [];
  let last = "";
  weeks.forEach((week, col) => {
    const day = week.find((d) => d);
    if (!day) return;
    const month = day.date.slice(0, 7);
    if (month !== last) labels.push({ col, text: MONTHS[Number(day.date.slice(5, 7)) - 1] });
    last = month;
  });
  // Avoid a month label colliding with the right edge for a final partial week.
  return labels.filter((label, i) => i === 0 || label.col < weeks.length - 1);
}

function pretty(date: string) {
  const d = new Date(`${date}T00:00:00Z`);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export async function GithubPanel() {
  const a = await getGithubActivity();
  const weeks = toWeeks(a.days);
  const labels = monthLabels(weeks);
  const numbers = [
    { value: a.ownedRepos ?? a.publicRepos, label: a.ownedRepos !== null ? "Repositories I own" : "Public repositories" },
    { value: a.accessibleRepos, label: "Repositories I can access" },
    { value: a.live ? a.activeDays : null, label: "Active days" },
    { value: a.live ? a.longestStreak : null, label: "Longest streak", suffix: " days" },
  ];

  return (
    <div className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">03 — GitHub</p>
            <h2 className="display text-4xl sm:text-6xl">A year of building<span className="text-lime">.</span></h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed opacity-75">Code, collaboration and the work behind the projects.</p>
          </div>
          <a href={site.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-ink px-5 py-3 text-sm transition hover:bg-ink hover:text-paper">
            <Github size={17} /> @{site.githubUser} <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-[#30363d] bg-[#0d1117] text-[#e6edf3] shadow-[0_16px_50px_rgba(0,0,0,.12)]">
          <div className="flex flex-wrap items-start justify-between gap-5 border-b border-[#30363d] p-6 sm:p-8">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm text-[#8b949e]"><GitCommitHorizontal size={18} /> Contributions in the last year</div>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <p className="font-sans text-5xl font-semibold tracking-tight sm:text-6xl">{a.totalLastYear?.toLocaleString() ?? "—"}</p>
                <p className="text-sm text-[#8b949e]">{a.source === "authenticated" ? "Account activity" : a.live ? "Publicly visible activity" : "Activity unavailable"}</p>
              </div>
            </div>
            <div className="text-sm sm:text-right">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#30363d] px-3 py-1.5"><span className={`h-2 w-2 rounded-full ${a.live ? "bg-[#39d353]" : "bg-[#8b949e]"}`} />{a.source === "authenticated" ? "Connected account" : "Public view"}</span>
              {a.from && a.to && <p className="mt-3 text-xs text-[#8b949e]">{pretty(a.from)} – {pretty(a.to)}</p>}
            </div>
          </div>

          {weeks.length > 0 ? (
            <div className="p-6 sm:p-8">
              <div tabIndex={0} role="region" aria-label="Contribution calendar. Scroll horizontally on smaller screens to see the full year." className="overflow-x-auto pb-3">
                <div className="min-w-[760px]" style={{ display: "grid", gridTemplateColumns: `36px repeat(${weeks.length}, minmax(0, 1fr))`, gap: "4px" }}>
                  {labels.map((label) => <span key={label.col} className="pb-2 text-xs text-[#8b949e]" style={{ gridColumn: label.col + 2, gridRow: 1 }}>{label.text}</span>)}
                  {[{ label: "Mon", day: 1 }, { label: "Wed", day: 3 }, { label: "Fri", day: 5 }].map(({ label, day }) => <span key={label} aria-hidden className="self-center text-xs text-[#8b949e]" style={{ gridColumn: 1, gridRow: day + 2 }}>{label}</span>)}
                  {weeks.flatMap((week, wi) => Array.from({ length: 7 }, (_, di) => {
                    const day = week[di];
                    const description = day ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${pretty(day.date)}` : undefined;
                    return <span key={`${wi}-${di}`} role={day ? "img" : undefined} aria-label={description} aria-hidden={!day || undefined} title={description} className="aspect-square rounded-[3px] ring-inset hover:ring-1 hover:ring-white/60" style={{ gridColumn: wi + 2, gridRow: di + 2, backgroundColor: day ? COLORS[day.level] : "transparent" }} />;
                  }))}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-[#8b949e]">
                <span>{a.busiest ? `Most active: ${a.busiest.count} contributions on ${pretty(a.busiest.date)}` : "No contributions in this period"}</span>
                <span className="inline-flex items-center gap-1.5">Less {COLORS.map((color) => <span key={color} aria-hidden className="h-3 w-3 rounded-[3px]" style={{ backgroundColor: color }} />)} More</span>
              </div>
            </div>
          ) : <p className="p-6 text-sm text-[#8b949e] sm:p-8">GitHub activity could not be loaded. <a href={site.github} target="_blank" rel="noreferrer" className="underline underline-offset-4">View the calendar on GitHub</a>.</p>}

          <div className="border-t border-[#30363d] px-6 py-4 text-sm leading-relaxed text-[#8b949e] sm:px-8">
            {a.source === "authenticated" ? "Contributions include commits, pull requests, reviews and other activity visible to the connected account." : "This is the public GitHub view. Private contributions may make the total higher when you view your own profile."}
          </div>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {numbers.map((n) => <div key={n.label} className="border-t border-ink/20 pt-5">
            <dd className="display text-4xl sm:text-5xl">{n.value?.toLocaleString() ?? "—"}{n.value !== null && n.suffix && <span className="ml-1 font-sans text-sm font-normal tracking-normal opacity-60">{n.suffix}</span>}</dd>
            <dt className="mt-3 text-sm opacity-70">{n.label}</dt>
          </div>)}
        </dl>
        {a.accessibleRepos === null && <p className="mt-5 text-sm opacity-60">Private and shared repository totals are unavailable in the public view.</p>}
      </div>
    </div>
  );
}
