export type Day = { date: string; level: number; count: number };
export type Calendar = { days: Day[]; total: number; from: string; to: string };

export function parseCalendar(html: string): Calendar {
  const attribute = (attrs: string, key: string) => new RegExp(`\\b${key}=["']([^"']*)["']`, "i").exec(attrs)?.[1];
  const counts = new Map<string, number>();
  for (const match of html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/gi)) {
    const id = attribute(match[1], "for");
    const text = match[2].replace(/<[^>]+>/g, "").trim();
    const count = /^(No|[\d,]+)\s+contributions?\b/i.exec(text)?.[1];
    if (id && count) counts.set(id, count.toLowerCase() === "no" ? 0 : Number(count.replace(/,/g, "")));
  }
  const dates = new Map<string, Day>();
  for (const match of html.matchAll(/<td\b([^>]*)>/gi)) {
    const date = attribute(match[1], "data-date");
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;
    const level = Number(attribute(match[1], "data-level"));
    const id = attribute(match[1], "id");
    const count = id ? counts.get(id) : undefined;
    if (!Number.isInteger(level) || level < 0 || level > 4 || count === undefined) throw new Error("Incomplete GitHub calendar");
    if (dates.has(date)) throw new Error("Duplicate GitHub calendar day");
    dates.set(date, { date, level, count });
  }
  const days = [...dates.values()].sort((a, b) => a.date.localeCompare(b.date));
  const totalText = /([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/i.exec(html)?.[1];
  if (!totalText || days.length < 365 || days.length > 371) throw new Error("GitHub did not return a complete year");
  for (let i = 1; i < days.length; i++) {
    if (Date.parse(days[i].date) - Date.parse(days[i - 1].date) !== 86400000) throw new Error("Missing GitHub calendar day");
  }
  const total = Number(totalText.replace(/,/g, ""));
  if (days.reduce((sum, day) => sum + day.count, 0) !== total) throw new Error("GitHub contribution total does not match calendar");
  return { days, total, from: days[0].date, to: days[days.length - 1].date };
}

export function streaks(days: Day[]) {
  let longest = 0, run = 0;
  for (const day of days) { run = day.count > 0 ? run + 1 : 0; longest = Math.max(longest, run); }
  let current = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) current++;
    else if (i !== days.length - 1) break;
  }
  return { longest, current };
}
