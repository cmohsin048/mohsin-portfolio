import { Nav } from "@/components/Nav";
import { Panel } from "@/components/Panel";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Work } from "@/components/Work";
import { GithubPanel } from "@/components/GithubPanel";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { site, projects } from "@/data/portfolio";
import { getGithubActivity } from "@/lib/github";

export default async function Home() {
  const activity = await getGithubActivity();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    email: `mailto:${site.email}`,
    url: site.url,
    sameAs: [site.github, site.linkedin, site.upwork],
    address: { "@type": "PostalAddress", addressLocality: site.location },
    knowsAbout: ["Next.js", "React", "Node.js", "MongoDB", "React Native", "TypeScript", "OpenAI API", "Stripe"],
    workExample: projects.map((p) => ({ "@type": "CreativeWork", name: p.name, description: p.summary, url: p.live ?? p.repo })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main id="top" className="stack">
        <Panel id="hero" tone="dark" index={0}>
          <Hero />
        </Panel>
        <Panel id="about" tone="paper" index={1}>
          <About publicRepos={activity.publicRepos} ownedRepos={activity.ownedRepos} accessibleRepos={activity.accessibleRepos} />
        </Panel>
        <Work index={2} />
        <Panel id="github" tone="paper" index={3}>
          <GithubPanel />
        </Panel>
        <Panel id="skills" tone="dark" index={4}>
          <Skills />
        </Panel>
        <Panel id="experience" tone="paper" index={5}>
          <Experience />
        </Panel>
        <Panel id="contact" tone="lime" index={6}>
          <Contact />
        </Panel>
      </main>
    </>
  );
}
