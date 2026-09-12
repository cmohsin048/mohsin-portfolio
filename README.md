# Mohsin Raza — Portfolio

Editorial-style portfolio built with Next.js 15 (App Router), React 19, Tailwind CSS 4, GSAP + ScrollTrigger, Lenis and React Three Fiber. Sections are sticky panels that slide over and dim the previous one as you scroll. Fully responsive, SEO metadata and JSON-LD included.

## Run it

```powershell
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Edit content

Profile copy, links, projects, skills and experience live in `src/data/portfolio.ts`. Edit components for layout and interface labels.

Things to change first:

1. `site.upwork` — paste your real Upwork profile URL.
2. `site.url` — your deployed domain (used for Open Graph and JSON-LD).
3. `projects` — the original horizontal gallery on desktop, stacked cards on mobile. Add `live` or `repo` links as projects go public.
4. For real project screenshots, save WebP or PNG files in `public/projects/`, then add `screenshot: { src: "/projects/bookmi.webp", alt: "Bookmi property search interface" }` to the matching project. Use a consistent 16:10 canvas, approximately 1600 × 1000 pixels, and remove private customer data. Cards without a screenshot remain text-only.
5. Replace `public/Mohsin_Raza_Resume.pdf` whenever your resume changes.

## GitHub section

`src/lib/github.ts` fetches one request-scoped snapshot shared by About and GitHub. The page reads fresh data on each request. The calendar preserves GitHub's full past-year date range, including its leading partial week. It validates dates and daily counts against the headline total. Missing or malformed data is unavailable, never a fabricated zero or fixed fallback count.

Public access can only verify public repository counts and publicly visible contributions. To include private/shared data, configure `GITHUB_TOKEN` in the server's local environment (see `.env.example`) and restart the server. Never use a `NEXT_PUBLIC_` variable. The credential must belong to `site.githubUser`; a different account is rejected. Authenticated contributions come from GitHub GraphQL; repository totals use all pages of `/user/repos`, deduplicated by repository ID, with owned and accessible counts kept separate. Repository access is not evidence of a code contribution.

The token needs appropriate read access to the repositories and organizations being counted; GitHub documents `read:user` for private/internal contribution collection access. Fine-grained tokens, organization approval and SSO can limit coverage. Compare results with the signed-in account before calling these account-wide totals. Browser sign-in alone does not authenticate the site's server. Private repository names are never rendered by this integration; only aggregate counts are shown. On Vercel, set `GITHUB_TOKEN` as a project environment variable rather than committing it.

## Animation stack

| Effect | Where | Implementation |
|---|---|---|
| Smooth scrolling | whole page | Lenis driven by GSAP's ticker (`Providers.tsx`) |
| Sections merge as you scroll | every section | sticky panels + ScrollTrigger scrub scaling and dimming the covered panel (`Panel.tsx`) |
| 3D distorted object that follows the cursor | hero | Three.js via React Three Fiber and drei (`Blob.tsx`) |
| Staggered line reveal | hero | GSAP timeline |
| Word-by-word scroll fill | about | ScrollTrigger scrub (`About.tsx`) |
| Counting stats | about | GSAP tween |
| Pinned horizontal gallery with progress bar | work | GSAP on desktop, vertical cards on mobile and reduced-motion devices, optional real screenshots (`Work.tsx`) |
| Rows slide in, lines draw | experience | ScrollTrigger once |
| Custom cursor with blend mode | everywhere with a mouse | GSAP `quickTo` (`Cursor.tsx`) |
| Magnetic buttons | hero, contact | GSAP (`Magnetic.tsx`) |
| Marquees | hero, skills | CSS keyframes (`Marquee.tsx`) |
| Live Islamabad clock | nav | `Intl.DateTimeFormat` |
| Film grain | overlay | SVG turbulence in CSS |

All motion is disabled for visitors with reduced motion enabled. `window.__ScrollTrigger` is exposed for debugging in the browser console.

## Deploy

Vercel: import the folder as a new project, framework preset Next.js, no env vars needed. Or run `npm run build && npm start` on any Node host.

## Structure

```
src/app/            layout, page, global styles, favicon
src/components/     Nav, Panel, Hero, Blob, About, Work, GithubPanel, Skills, Experience, Contact, Cursor, Magnetic, Marquee, Providers
src/data/           portfolio.ts (all content)
src/lib/            github.ts (repo fetch)
public/             resume PDF, static assets
```
