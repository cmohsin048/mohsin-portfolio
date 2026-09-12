import "server-only";
import { cache } from "react";
import { site } from "@/data/portfolio";
import { parseCalendar, streaks, type Calendar, type Day } from "./github-calendar";
export type { Day } from "./github-calendar";

export type GithubActivity = {
  live: boolean;
  source: "public" | "authenticated" | "unavailable";
  publicRepos: number | null;
  ownedRepos: number | null;
  accessibleRepos: number | null;
  totalLastYear: number | null;
  activeDays: number;
  longestStreak: number;
  currentStreak: number;
  busiest: Day | null;
  days: Day[];
  from: string | null;
  to: string | null;
};

const headers = { "User-Agent": "mohsin-portfolio", Accept: "application/vnd.github+json" };
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

async function api<T>(path: string, authenticated = false): Promise<T> {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: { ...headers, ...(authenticated && token ? { Authorization: `Bearer ${token}` } : {}) },
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`GitHub API ${response.status}`);
  return response.json() as Promise<T>;
}

async function publicCalendar(): Promise<Calendar> {
  const response = await fetch(`https://github.com/users/${site.githubUser}/contributions`, {
    headers: { "User-Agent": headers["User-Agent"], "x-requested-with": "XMLHttpRequest" },
    cache: "no-store", signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`GitHub calendar ${response.status}`);
  return parseCalendar(await response.text());
}

type AuthCalendar = {
  data?: { viewer: { login: string; contributionsCollection: { contributionCalendar: {
    totalContributions: number;
    weeks: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }[];
  } } } };
  errors?: unknown[];
};

async function authenticatedData() {
  const user = await api<{ login: string }>("/user", true);
  if (user.login.toLowerCase() !== site.githubUser.toLowerCase()) throw new Error("GitHub credential belongs to a different account");
  const countRepositories = async () => {
    const repos = new Map<number, string>();
    for (let page = 1; ; page++) {
      const batch = await api<{ id: number; owner: { login: string } }[]>(`/user/repos?visibility=all&affiliation=owner,collaborator,organization_member&per_page=100&page=${page}`, true);
      for (const repo of batch) repos.set(repo.id, repo.owner.login);
      if (batch.length < 100) break;
      if (page === 1000) throw new Error("Repository pagination incomplete");
    }
    return { accessible: repos.size, owned: [...repos.values()].filter((owner) => owner.toLowerCase() === user.login.toLowerCase()).length };
  };
  const loadCalendar = async (): Promise<Calendar> => {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST", headers: { ...headers, Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      cache: "no-store", signal: AbortSignal.timeout(15000),
      body: JSON.stringify({ query: "query { viewer { login contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel } } } } } }" }),
    });
    if (!response.ok) throw new Error(`GitHub GraphQL ${response.status}`);
    const result = await response.json() as AuthCalendar;
    if (result.errors?.length || !result.data || result.data.viewer.login.toLowerCase() !== user.login.toLowerCase()) throw new Error("GitHub calendar unavailable");
    const calendar = result.data.viewer.contributionsCollection.contributionCalendar;
    const levels = ["NONE", "FIRST_QUARTILE", "SECOND_QUARTILE", "THIRD_QUARTILE", "FOURTH_QUARTILE"];
    const days = calendar.weeks.flatMap((week) => week.contributionDays.map((day) => ({ date: day.date, count: day.contributionCount, level: levels.indexOf(day.contributionLevel) }))).sort((a, b) => a.date.localeCompare(b.date));
    if (days.length < 365 || days.length > 371 || days.some((day) => day.level < 0) || days.reduce((sum, day) => sum + day.count, 0) !== calendar.totalContributions) throw new Error("Incomplete authenticated calendar");
    return { days, total: calendar.totalContributions, from: days[0].date, to: days[days.length - 1].date };
  };
  const [repositories, calendar] = await Promise.allSettled([countRepositories(), loadCalendar()]);
  return { repositories: repositories.status === "fulfilled" ? repositories.value : null, calendar: calendar.status === "fulfilled" ? calendar.value : null };
}

/** Request-scoped memoization shares one snapshot across About and GitHub. No made-up fallback counts. */
export const getGithubActivity = cache(async (): Promise<GithubActivity> => {
  const [profileResult, calendarResult, authResult] = await Promise.allSettled([
    api<{ public_repos: number }>(`/users/${site.githubUser}`),
    publicCalendar(),
    token ? authenticatedData() : Promise.resolve(null),
  ]);
  const profile = profileResult.status === "fulfilled" ? profileResult.value : null;
  const auth = authResult.status === "fulfilled" ? authResult.value : null;
  const calendar = auth?.calendar ?? (calendarResult.status === "fulfilled" ? calendarResult.value : null);
  const days = calendar?.days ?? [];
  const active = days.filter((day) => day.count > 0);
  const { longest, current } = streaks(days);
  return {
    live: calendar !== null,
    source: auth?.calendar ? "authenticated" : calendar ? "public" : "unavailable",
    publicRepos: profile?.public_repos ?? null,
    ownedRepos: auth?.repositories?.owned ?? null,
    accessibleRepos: auth?.repositories?.accessible ?? null,
    totalLastYear: calendar?.total ?? null,
    activeDays: active.length, longestStreak: longest, currentStreak: current,
    busiest: active.length ? active.reduce((a, b) => b.count > a.count ? b : a) : null,
    days, from: calendar?.from ?? null, to: calendar?.to ?? null,
  };
});
