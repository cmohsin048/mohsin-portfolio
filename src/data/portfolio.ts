/**
 * Portfolio content lives here. Layout and interaction changes belong in components.
 */

export const site = {
  name: "Mohsin Raza",
  firstName: "Mohsin",
  lastName: "Raza",
  role: "MERN Stack Developer",
  tagline: "MERN stack developer building production web apps, AI features and Web3 interfaces.",
  introduction: "Marketplaces, SaaS products, LLM-backed tools and Solana dApps—from the schema and API to the interface and deployment.",
  contactText: "Tell me about your project, timeline and the help you need. We can discuss the scope and next steps over email or Upwork.",
  location: "Islamabad, Pakistan",
  timezone: "Asia/Karachi",
  email: "cmohsin048@gmail.com",
  github: "https://github.com/cmohsin048",
  githubUser: "cmohsin048",
  linkedin: "https://www.linkedin.com/in/mohsinraza048",
  // Replace with your real Upwork profile link.
  upwork: "https://www.upwork.com/freelancers/~mohsinraza",
  resume: "/Mohsin_Raza_Resume.pdf",
  url: "https://mohsinrazadev.vercel.app",
  availability: "Open for freelance work",
};

export const stats = [
  { value: 2, suffix: "+", label: "years shipping production code" },
];

export const manifesto =
  "I build marketplaces, SaaS products and AI-backed tools on the MERN stack — and keep them running after launch.";

export const aboutDetail = [
  "Core stack: MongoDB, Express, React and Node, with TypeScript and Next.js on top. Stripe for payments, Socket.io where things need to be live, and OpenAI where a product genuinely benefits from a model rather than a rule.",
  "I led RAIDS AI, a real-time LLM integrity monitor, and built an MCP server with scoped API tokens so assistants can query an internal system directly. On the Web3 side, Solana wallet authentication and SPL token flows. I ship mobile too — React Native on the same Node API, and native Kotlin with Jetpack Compose.",
];

export type SkillGroup = { title: string; items: string[] };

export const skills: SkillGroup[] = [
  { title: "MERN core", items: ["MongoDB", "Mongoose", "Express.js", "React", "Node.js", "REST APIs", "JWT / OAuth", "Redux Toolkit"] },
  { title: "Frontend", items: ["TypeScript", "Next.js", "Tailwind CSS", "shadcn/ui", "TanStack Query", "Zustand", "GSAP", "Framer Motion"] },
  { title: "Real-time & jobs", items: ["Socket.io", "WebSockets", "BullMQ / Redis", "node-cron", "IMAP / mail parsing"] },
  { title: "AI", items: ["OpenAI API", "LLM features", "MCP servers", "Crisis / content detection", "Prompt design"] },
  { title: "Web3", items: ["Solana web3.js", "Wallet adapters", "SPL Token", "Signature auth", "Solidity", "Hardhat", "Chainlink VRF"] },
  { title: "Data", items: ["MongoDB", "PostgreSQL", "Supabase", "Firebase", "MySQL", "Schema design"] },
  { title: "Mobile", items: ["React Native", "Expo", "Kotlin", "Jetpack Compose", "MVVM + Hilt"] },
  { title: "Integrations", items: ["Stripe", "Twilio Video / Voice", "AWS S3", "Sanity", "Postmark / SendGrid", "Google & Microsoft OAuth"] },
  { title: "DevOps", items: ["Docker", "AWS EC2 / S3", "Vercel", "Linux / PM2 / Nginx", "Git"] },
];

export type Project = {
  index: string;
  name: string;
  summary: string;
  description: string;
  tags: string[];
  live?: string;
  repo?: string;
  role: string;
  year: string;
  hue: number; // retained project accent
  screenshot?: { src: string; alt: string };
};

/** Selected projects shown in the original horizontal gallery. */
export const projects: Project[] = [
  {
    index: "01",
    name: "Bookmi",
    year: "2025–26",
    role: "Core contributor · web, mobile, API",
    summary: "Spot and service booking platform with web and mobile clients.",
    description:
      "Multi-role marketplace for renting venues and hiring services. Hosts, providers, customers and admins; Stripe payments with webhook handling, real-time chat, ratings, shopping cart, Google/Outlook calendar sync and English/Greek localisation. React Native app shares the Express API.",
    tags: ["React", "Node.js", "Express", "MongoDB", "React Native", "Stripe", "Socket.io"],
    live: "https://bookmi.kakushin.io",
    hue: 84,
  },
  {
    index: "02",
    name: "RAIDS AI",
    year: "2024–25",
    role: "Lead developer · frontend and backend",
    summary: "Real-time LLM integrity monitoring.",
    description:
      "Detects rogue behaviours and deviations from established norms in production AI models, helping teams prevent LLM operational risk. I was the primary developer across the React front end and the Express/MongoDB API, with scheduled analysis jobs, Stripe billing and OAuth sign-in.",
    tags: ["React", "Node.js", "Express", "MongoDB", "LLM", "Stripe"],
    hue: 0,
  },
  {
    index: "03",
    name: "Delphora",
    year: "2026",
    role: "Frontend / Web3 developer",
    summary: "Solana prediction market with wallet-based authentication.",
    description:
      "Next.js trading interface with Solana wallet adapters and Phantom support. Signature-based login — the wallet signs a server nonce, no passwords — SPL token transfers, live market updates over Socket.io, and a separate admin dashboard gated on wallet ownership.",
    tags: ["Next.js", "Solana", "web3.js", "SPL Token", "TanStack Query", "Socket.io"],
    hue: 270,
  },
  {
    index: "04",
    name: "Paiback",
    year: "2025",
    role: "Full-stack developer",
    summary: "Flight price tracking that rebooks when the fare drops.",
    description:
      "Monitors ticket prices after purchase and contacts the airline to rebook the same seat at the lower fare. Next.js front end with interactive fare charts and Stripe checkout, Sanity-driven content, and a Python backend handling pricing, refunds and encrypted user data.",
    tags: ["Next.js", "TypeScript", "Python", "Stripe", "Sanity", "Chart.js"],
    hue: 200,
  },
  {
    index: "05",
    name: "AbilityConnect",
    year: "2025–26",
    role: "Full-stack developer",
    summary: "Accessible video interview platform, used by employers including Meta.",
    description:
      "Recruiting platform built to WCAG 2.1 AA. Seven roles including interpreters and booth admins, real-time queue management over Socket.io, Twilio Programmable Video with interpreter support, resume parsing, and S3 media storage on an Express/MongoDB API with Redis. I built job-seeker management, survey and bulk-operation features.",
    tags: ["React", "Node.js", "MongoDB", "Redis", "Twilio Video", "Socket.io", "AWS S3"],
    repo: "https://github.com/chasgharali/ability_V2",
    hue: 210,
  },
  {
    index: "06",
    name: "ColdWave",
    year: "2026",
    role: "Sole developer",
    summary: "Deliverability-first cold email marketing SaaS.",
    description:
      "Multi-tenant Next.js app on MongoDB. Lead import and enrichment, AI-assisted campaign copy, spam checks, mailbox rotation and rate limits, IMAP reply tracking with mail parsing, and a visual sequence builder.",
    tags: ["Next.js", "TypeScript", "MongoDB", "OpenAI", "NextAuth", "IMAP"],
    hue: 24,
  },
  {
    index: "07",
    name: "EventSage",
    year: "2025–26",
    role: "Full-stack developer · lead on backend",
    summary: "Event planning, proposals and supplier management.",
    description:
      "Drag-and-drop planning boards, proposal builder with reusable templates, CSV and XLSX lead import, supplier invoices, referrals and reporting. Twilio voice calling, OTP flows, PDF export and Stripe subscription billing. I led the Python backend and built the billing and lead-import features on the client.",
    tags: ["React", "TypeScript", "Supabase", "Twilio", "Stripe", "Python"],
    live: "https://eventsage-blue.vercel.app",
    hue: 300,
  },
  {
    index: "08",
    name: "islamicfunds.pk",
    year: "2025–26",
    role: "Sole developer",
    summary: "Compare Shariah-compliant mutual funds in Pakistan.",
    description:
      "Fund database with search and filters, SIP return projections comparing two funds side by side, and interactive performance charts. Next.js on Supabase, fed by a scheduled collector that ingests MUFAP NAV data.",
    tags: ["Next.js", "TypeScript", "Supabase", "Recharts", "Vercel"],
    live: "https://investing-mauve.vercel.app",
    hue: 150,
  },
  {
    index: "09",
    name: "Project Vault",
    year: "2026",
    role: "Lead developer",
    summary: "Internal secrets and documentation manager with full audit trail.",
    description:
      "Stores project documentation, credentials and environment files with per-project access control and AES-256-GCM encryption at rest. Database-backed sessions in httpOnly cookies, audit logging down to the acting user, and an MCP server with personal API tokens so AI clients can query the vault directly.",
    tags: ["Next.js", "TypeScript", "MongoDB", "AES-256-GCM", "MCP", "Docker"],
    hue: 262,
  },
  {
    index: "10",
    name: "Enterprise utility app",
    year: "2025–26",
    role: "Android developer",
    summary: "Customer portal for a national electricity provider.",
    description:
      "Kotlin and Jetpack Compose app for billing, supply management, payments and fault reporting. MVVM with clean architecture and Hilt, Retrofit client stack with per-service interceptor chains, Microsoft Entra ID sign-in, encrypted token storage, certificate pinning and a custom JSON localisation layer.",
    tags: ["Kotlin", "Jetpack Compose", "MVVM", "Hilt", "Retrofit", "MSAL"],
    hue: 190,
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    company: "Kakushin",
    role: "Full-Stack Developer",
    period: "2024 – 2026",
    location: "Islamabad",
    bullets: [
      "Built and maintained multiple production apps with Node.js, React, Next.js, Angular and MongoDB across client projects.",
      "Designed REST APIs and integrated Stripe, Twilio, OpenAI, Google Maps and Firebase for booking, recruiting and AI monitoring products.",
      "Shipped RAIDS AI, a real-time LLM integrity monitoring platform, and Web3 wallet and smart contract features for Arena Two.",
      "Deployed and operated services on AWS and Linux with PM2, Nginx and Docker. Scrum teams, Jira.",
    ],
  },
  {
    company: "Eziline Software House",
    role: "MERN Stack Developer, Internship",
    period: "2023",
    location: "Islamabad",
    bullets: ["Full-stack features with MongoDB, Express, React and Node. API work, bug fixing and component optimisation."],
  },
  {
    company: "NextSalution",
    role: "Frontend Developer, Internship",
    period: "2022",
    location: "Islamabad",
    bullets: ["Responsive React UI components and REST API integration with the backend team."],
  },
];

export const education = {
  degree: "BSc Computer Science",
  school: "Institute of Space Technology, Islamabad",
};

export const services = [
  { n: "01", title: "Full-stack web apps", text: "Next.js or React front ends with Node APIs, MongoDB or Postgres, auth, payments and admin dashboards." },
  { n: "02", title: "Android & cross-platform apps", text: "React Native and Expo apps that share your web backend, with maps, camera, payments and push." },
  { n: "03", title: "AI features", text: "OpenAI and LLM integrations, chatbots, AI agents and MCP servers that plug your product into Claude and other assistants." },
  { n: "04", title: "Automation & scraping", text: "Python or Node scrapers, data pipelines, cron jobs and API integrations that feed clean data into your systems." },
];

export const marqueeWords = ["MongoDB", "Express", "React", "Node.js", "Next.js", "TypeScript", "OpenAI", "Solana", "Socket.io", "Stripe", "React Native", "MCP"];
