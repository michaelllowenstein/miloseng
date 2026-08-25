/**
 * schema/constants/site-defaults.ts
 *
 * Fallback defaults for every CMS content region.
 * These are used when:
 *   1. Realtime Database is unreachable
 *   2. A CMS node hasn't been created in Realtime Database yet
 *   3. Running in mock mode (env.useMocks: true)
 *
 * Every value here mirrors the Realtime Database seed data 1:1.
 */
import {
  SiteContent,
  LandingContent,
  AboutContent,
  ContactContent,
  NewsletterContent,
  ProjectsContent,
  FooterContent,
  SubscribeContent,
  NavLink,
} from '@schema/models/site';

// ── Landing ──────────────────────────────────────────────────────────────────

export const LANDING_DEFAULTS: LandingContent = {
  hero: {
    badge: 'senior consultant software engineer',
    headlinePre: 'Building ',
    headlineAccent: 'resilient systems',
    headlinePost: ' at scale',
    subline:
      'Full-stack architecture, developer tooling, and delivery quality across polyglot distributed systems.',
    ctaPrimary: 'View portfolio',
    ctaSecondary: 'Get in touch',
  },
  sectionLabel: 'Primary Stack',
  timelineLabel: 'Career Trajectory',
  timelineHeadline: 'From microservices to methodology',
  capabilities: [
    { icon: '⬡', label: '.NET / C#',     detail: '.NET 8/9 microservices, YARP, Entity Framework' },
    { icon: '△', label: 'TypeScript',     detail: 'Angular 20, Node.js, Nx monorepos' },
    { icon: '◈', label: 'Python',         detail: 'PyTorch, LangChain, scikit-learn, Whisper ASR' },
    { icon: '▣', label: 'Infrastructure', detail: 'Docker, Kubernetes, Tailscale, Pi-hole' },
  ],
  roles: [
    {
      period: '2023 – Present',
      title: 'Senior Consultant Software Engineer',
      company: 'MSI — Calgary, AB',
      blurb: 'Architecture decisions and delivery quality across a polyglot P&C insurance platform. .NET, Node.js, Python, and Go on distributed microservices with Docker/K8s.',
    },
    {
      period: '2022 – Present',
      title: 'Contractor / Technical Evaluator',
      company: 'micro1 & mercor',
      blurb: 'Comparative AI coding assistant benchmarks. Evaluating Claude Opus 4.5, GPT-4o, and GPT-5.2 across shared prompt suites in Cursor IDE.',
    },
    {
      period: '2021 – 2023',
      title: 'Software Engineer',
      company: 'Rogers Communications',
      blurb: '.NET microservices architecture, including the SCP-21578 credit check service for telecom billing and provisioning.',
    },
    {
      period: '2019 – 2021',
      title: 'Full-Stack Developer',
      company: 'FullStack Labs / House Analytics / NCAL',
      blurb: 'Full-stack development across client projects. ML regression library for House Analytics residential property valuation, Invoice Automation Platform for NCAL.',
    },
  ],
};

// ── About ────────────────────────────────────────────────────────────────────

export const ABOUT_DEFAULTS: AboutContent = {
  header: {
    breadcrumb: '~/about',
    headline: 'Engineering at the intersection of ',
    headlineAccent: 'architecture and automation',
  },
  bio: {
    paragraphs: [
      "I’m a Software Engineer based in Calgary, AB, currently working as a Fullstack Principal Engineer at Norima Consulting. My background spans backend and full-stack engineering, distributed systems, cloud infrastructure, API design, data architecture, and platform engineering across large-scale enterprise environments. My work focuses on the systems and technical decisions that sit underneath critical products: designing service boundaries, evolving APIs and data models, improving reliability and observability, modernizing legacy platforms, strengthening delivery practices, and helping engineering teams navigate complex architectural and operational challenges. Prior to Norima, I was Lead Backend Software Engineer at Rogers Communications, where I worked on large-scale commerce systems and the services responsible for core platform capabilities. Across consulting and product organizations, I’ve designed and delivered microservices, asynchronous processing systems, authentication infrastructure, data pipelines, developer tooling, CQRS architectures, and cloud-native applications. I remain deeply hands-on technically, while also contributing to architecture, engineering standards, technical planning, mentorship, and cross-team decision-making. I’m most effective in environments where the problems extend beyond a single application or service and require balancing implementation quality, system design, operational reliability, and long-term maintainability.",
    ],
  },
  quickFacts: [
    { label: 'Location',       value: 'Calgary, AB' },
    { label: 'Current Role',   value: 'Senior Consultant — Fullstack Principal Engineer @ Norima' },
    { label: 'Concurrent Role', value: 'Lead Backend Software Engineer @ Rogers Communications' },
    { label: 'Primary Stack',  value: '.NET Core, TypeScript, Python, Go, Rust' },
    { label: 'Architecture',   value: 'Microservices, CQRS, distributed caching, message queues' },
    { label: 'Education',      value: 'BSc Computer Science — Software Engineering, U of C' },
    { label: 'Side Work',      value: '1280 Labs contractor, OSS tooling, AI evaluator' },
    { label: 'Home Lab',       value: 'System76 Thelio Mira, RPi 5 (Kali), Pop!_OS' },
  ],
  experiences: [
    {
      period: '01/2026 – Present',
      location: 'Calgary, AB',
      title: 'Senior Consultant — Fullstack Principal Engineer',
      company: 'Norima (Client: Millennial Specialty Insurance MGA)',
      description:
        'Lead production data-integrity remediation across a multi-generational insurance policy administration platform. Author governed SQL remediation packages through formal DBA review. Investigate complex data corruption clusters spanning payment misapplication, snapshot flag corruption, and endorsement flow failures — categorized into a growing root-cause taxonomy (Clusters A–W). Author and maintain msi-nav, a CLI navigation and compliance scanning tool across five repositories.',
      tech: ['.NET', 'SQL Server', 'Vue', 'Bootstrap 5', 'CLI Tooling', 'DBA Review'],
    },
    {
      period: '11/2025 – Present',
      location: 'Calgary, AB',
      title: 'Lead Backend Software Engineer',
      company: 'Rogers Communications Inc.',
      description:
        'Lead the next-generation eCommerce platform powering Rogers, Fido, and Chatr brands. Design and implement mission-critical commerce services — product catalog, pricing engine, checkout, and order orchestration. Drive platform reliability through distributed caching, asynchronous messaging, and resiliency patterns. Manage and mentor a senior engineering team.',
      tech: ['.NET Core', 'CQRS', 'Redis', 'RabbitMQ', 'Azure', 'Docker'],
    },
    {
      period: '11/2022 – Present',
      location: 'Remote',
      title: 'Senior Software Engineer (Contract)',
      company: '1280 Labs',
      description:
        'Front-end lead for an AI-enabled Talent Management CRM. Prototyping backend services across Go, Rust, Node.js, Python, and .NET Core. House Analytics: ML regression library for residential property valuation.',
      tech: ['Angular', 'Go', 'Rust', 'Node.js', 'Python', '.NET Core', 'ML'],
    },
    {
      period: '05/2021 – 10/2022',
      location: 'Calgary, AB',
      title: 'Full-Stack Developer',
      company: 'FullStack Labs',
      description:
        'Led planning, design, and implementation of front-end systems for a Custom Cabinetry CRM. Authored backend ETL applications using TypeScript, Node.js Express, and NestJS — global invoicing accuracy improved from 95.1% to 99.8%. Co-authored a large-scale migration of 10,000+ users from legacy IdentityServer to Auth0. ML R&D for ETL pipelines with Go and Rust performance comparison.',
      tech: ['TypeScript', 'Node.js', 'NestJS', 'Angular', 'Go', 'Rust', 'Auth0', 'ETL'],
    },
    {
      period: '12/2016 – 12/2021',
      location: 'Calgary, AB',
      title: 'Software Engineer',
      company: 'Peloton Computer Enterprises',
      description:
        'Developed ProdView, a web application for task scheduling and operations in oil and gas. Introduced and led OAuth2 and OIDC authentication across company infrastructure using Angular 7–9. Managed Linux servers, optimized PostgreSQL and FreeBSD systems. Rebuilt legacy systems as polished microservices using NestJS, Python, Go, and Rust. Implemented secure API gateways and rate limiting for financial data access.',
      tech: ['Angular 7–9', '.NET', 'PostgreSQL', 'NestJS', 'Python', 'Go', 'Rust', 'OAuth2/OIDC'],
    },
    {
      period: '12/2015 – 12/2016',
      location: 'Toronto, ON',
      title: 'Software Developer',
      company: 'SIACharts (SIA Wealth Management)',
      description:
        'Rebuilt a legacy financial software application using modern web technologies. Developed a suite of financial market tools using MSSQL Server, ASP.NET (C#), JavaScript, jQuery, Bootstrap, and Python test suites.',
      tech: ['ASP.NET', 'C#', 'MSSQL', 'JavaScript', 'jQuery', 'Bootstrap', 'Python'],
    },
  ],
};

// ── Contact ──────────────────────────────────────────────────────────────────

export const CONTACT_DEFAULTS: ContactContent = {
  header: {
    breadcrumb: '~/contact',
    headline: "Let's connect",
    subline:
      "Whether it's architecture consulting, developer tooling collaboration, or a conversation about agentic coding workflows — I'd enjoy hearing from you.",
  },
  channels: [
    { icon: '◆', label: 'GitHub',    detail: 'github.com/miloseng',    href: 'https://github.com/miloseng',    external: true },
    { icon: '▦', label: 'LinkedIn',  detail: 'linkedin.com/in/mlo2gs', href: 'https://linkedin.com/in/mlo2gs', external: true },
    { icon: '◇', label: 'Portfolio', detail: 'miloseng.com',           href: 'https://miloseng.com',            external: true },
    { icon: '▸', label: 'Email',     detail: 'michael@miloseng.com',   href: 'mailto:michael@miloseng.com',     external: false },
  ],
  openTo: [
    'Architecture consulting',
    'Developer tooling',
    'Agentic workflows',
    'Technical evaluation',
    'OSS collaboration',
    'Speaking',
  ],
  responseTime: {
    value: '< 48h',
    label: 'typical reply',
    description: 'Faster for architecture consulting inquiries and active collaboration threads.',
  },
};

// ── Newsletter ───────────────────────────────────────────────────────────────

export const NEWSLETTER_DEFAULTS: NewsletterContent = {
  header: {
    breadcrumb: '~/newsletter',
    headline: 'Engineering dispatches',
    subline:
      'Occasional deep-dives on distributed systems architecture, developer tooling, agentic coding workflows, and lessons learned from the insurance technology trenches. No spam, no fluff — just the signal.',
  },
  whatYouGet: "What you'll get",
  recentLabel: 'Recent dispatches',
  topics: [
    { title: 'Architecture Patterns', desc: 'Microservices, event-driven design, and when monoliths actually win.' },
    { title: 'Agentic Coding',        desc: "LLM-assisted development: what works, what doesn't, and the metrics to prove it." },
    { title: 'Developer Tooling',     desc: 'CLI design, monorepo orchestration, and the art of the productive terminal.' },
    { title: 'Field Reports',         desc: 'Real post-mortems and lessons from insurance platform engineering.' },
  ],
  pastIssues: [
    {
      title: 'State-Mode Development: A New Methodology for Micro-Frontend MVPs',
      preview: 'How decomposing UI state into explicit modes reduced integration defects by 40% across Angular and React implementations.',
      date: '2026-07',
    },
    {
      title: 'Benchmarking AI Coding Assistants in Production Contexts',
      preview: "Claude Opus 4.5 vs GPT-4o vs GPT-5.2 — a shared prompt suite analysis from the evaluator's chair.",
      date: '2026-06',
    },
    {
      title: 'The 13-Stage Normalization Pipeline: Building ermis-transcriber',
      preview: 'From raw Whisper ASR output to perfectly tagged transcripts — achieving 20/20 on the reference test suite.',
      date: '2026-05',
    },
  ],
};

// ── Projects ─────────────────────────────────────────────────────────────────

export const PROJECTS_DEFAULTS: ProjectsContent = {
  header: {
    breadcrumb: '~/projects',
    headline: 'Ongoing ',
    headlineAccent: 'projects',
  },
  sectionHeading: 'Active Initiatives',
  roi: {
    sectionLabel: 'Metrics',
    headline: 'Agentic Platform ROI',
    description:
      "A comparative analysis of the developer platforms and tooling suites I've built and adopted — measuring velocity uplift, code quality gains, cost savings, and team adoption across five distinct engineering initiatives.",
  },
  previews: [
    {
      id: 'toolbox',
      name: 'Toolbox',
      tagline: 'CLI & developer productivity suite',
      color: '#33FF88',
      status: 'active',
      description:
        'A modular CLI architecture built on aliaser.zsh, dev_tools.zsh, and sandbox_tools.zsh. Cross-machine config sync via dotfiles, SSH identity switching, and rg/fzf/bat pipelines for 3x faster code navigation.',
      tech: ['zsh', 'tmux', 'fzf', 'rg', 'WSL2'],
      preview: {
        label: 'Try Toolbox',
        state: 'active',            // was 'coming-soon'
        message: 'Live at toolbox.miloseng.com',
        url: 'https://toolbox.miloseng.com',
      },
    },
    {
      id: 'workflow',
      name: 'Workflow',
      tagline: 'Agentic development orchestration',
      color: '#3B82F6',
      status: 'active',
      description:
        'State-Mode Development methodology for decomposing UI state into explicit modes. ActivityWatch → local LLM → digest pipeline. Zellij multiplexer with persistent session architecture for cross-project context.',
      tech: ['TypeScript', 'Angular 20', 'Python', 'LLM APIs'],
      preview: {
        label: 'Try Toolbox',
        state: 'active',            // was 'coming-soon'
        message: 'Live at toolbox.miloseng.com',
        url: 'https://toolbox.miloseng.com',
      },
    },
    {
      id: 'autoval',
      name: 'AutoVal',
      tagline: 'AI assistant benchmarking & evaluation',
      color: '#F59E0B',
      status: 'active',
      description:
        'Comparative benchmarks across Claude Opus 4.5, GPT-4o, and GPT-5.2 using a shared frontend/backend prompt suite in Cursor IDE. Includes the judge CLI — an LLM-powered code review tool via the Anthropic API.',
      tech: ['Anthropic API', 'Cursor IDE', 'TypeScript', 'Prompt Engineering'],
      preview: {
        label: 'Try AutoVal',
        state: 'active',            // was 'coming-soon'
        message: 'Live at autoval.miloseng.com',
        url: 'https://autoval.miloseng.com',
      },
    },
    {
      id: 'automation',
      name: 'Automation',
      tagline: 'Infrastructure & pipeline automation',
      color: '#F472B6',
      status: 'maintained',
      description:
        'ProxyMockApi (.NET 8/YARP) for chaos and resilience testing. ScraperJobRunner (Node.js 22) scheduled scraping pipeline. ermis-transcriber: 13-stage Whisper ASR normalization achieving 20/20 on the reference suite.',
      tech: ['.NET 8', 'YARP', 'Node.js 22', 'Whisper', 'Python'],
      preview: {
        label: 'Try Automation',
        state: 'active',            // was 'coming-soon'
        message: 'Live at automation.miloseng.com',
        url: 'https://automation.miloseng.com',
      },
    },
    {
      id: 'onboarded',
      name: 'Onboarded',
      tagline: 'Full-stack monorepo & portal platform',
      color: '#A78BFA',
      status: 'active',
      description:
        'Nx v22 monorepo with Angular 20 portal (@onboarded/portal). Fully scoped Nx CLI syntax with justfile/Makefile tooling. datagen CLI for AI training data generation.',
      tech: ['Nx v22', 'Angular 20', 'Node.js', 'justfile'],
      preview: {
        label: 'Try Onboarded',
        state: 'active',            // was 'coming-soon'
        message: 'Live at onboarded.miloseng.com',
        url: 'https://onboarded.miloseng.com',
      },
    },
  ],
};

// ── Layout ───────────────────────────────────────────────────────────────────

export const FOOTER_DEFAULTS: FooterContent = {
  brandBlurb:
    'Building resilient distributed systems and developer tooling across the insurance technology landscape.',
  copyrightName: 'Michael Lowenstein',
  builtWith: 'Built with Angular 20 · React Islands · TailwindCSS',
  externalLinks: [
    { label: 'GitHub',       href: 'https://github.com/miloseng' },
    { label: 'LinkedIn',     href: 'https://linkedin.com/in/mlo2gs' },
    { label: 'miloseng.com', href: 'https://miloseng.com' },
  ],
};

export const NAVBAR_DEFAULTS: NavLink[] = [
  { path: '/home',       label: 'home',       exact: true },
  { path: '/about',      label: 'about',      exact: false },
  { path: '/projects',   label: 'projects',   exact: false },
  { path: '/newsletter', label: 'newsletter', exact: false },
  { path: '/contact',    label: 'contact',    exact: false },
];

export const SUBSCRIBE_DEFAULTS: SubscribeContent = {
  heading: 'Stay in the loop',
  subline:
    'Architecture deep-dives, tooling breakdowns, and field reports from distributed systems engineering — straight to your inbox.',
  buttonLabel: 'Subscribe',
  disclaimer: 'Unsubscribe anytime. Your data stays private.',
};

// ── Aggregate ────────────────────────────────────────────────────────────────

export const SITE_DEFAULTS: SiteContent = {
  landing:    LANDING_DEFAULTS,
  about:      ABOUT_DEFAULTS,
  contact:    CONTACT_DEFAULTS,
  newsletter: NEWSLETTER_DEFAULTS,
  projects:   PROJECTS_DEFAULTS,
  footer:     FOOTER_DEFAULTS,
  navbar:     NAVBAR_DEFAULTS,
  subscribe:  SUBSCRIBE_DEFAULTS,
};
