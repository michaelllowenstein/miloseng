// client/src/app/core/interceptors/mock-data.ts
// Realistic seed data that mirrors the PostgreSQL schema's seed rows.
// Used only in development when backend APIs are not running.

import type { Project, Skill, SiteSettings, MetricsSummary, NewsletterIssue } from '@schema/models';

export const MOCK_SETTINGS: SiteSettings = {
  hero: {
    name:    'Milo Seng',
    title:   'Full-Stack Engineer',
    tagline: 'Building things that matter.',
  },
  availability: {
    openToWork: true,
    message:    'Open to new projects — available now',
  },
  socialLinks: {
    github:   'https://github.com/miloseng',
    linkedin: 'https://linkedin.com/in/miloseng',
  },
};

export const MOCK_SKILLS: Skill[] = [
  { id: '1',  name: 'Angular',        category: 'Frontend', proficiency: 5, orderIndex: 1 },
  { id: '2',  name: 'TypeScript',     category: 'Frontend', proficiency: 5, orderIndex: 2 },
  { id: '3',  name: 'TailwindCSS',    category: 'Frontend', proficiency: 5, orderIndex: 3 },
  { id: '4',  name: 'React',          category: 'Frontend', proficiency: 4, orderIndex: 4 },
  { id: '5',  name: 'RxJS',           category: 'Frontend', proficiency: 4, orderIndex: 5 },
  { id: '6',  name: '.NET Core',      category: 'Backend',  proficiency: 5, orderIndex: 1 },
  { id: '7',  name: 'C#',             category: 'Backend',  proficiency: 5, orderIndex: 2 },
  { id: '8',  name: 'NestJS',         category: 'Backend',  proficiency: 4, orderIndex: 3 },
  { id: '9',  name: 'Node.js',        category: 'Backend',  proficiency: 4, orderIndex: 4 },
  { id: '10', name: 'FastAPI',        category: 'Backend',  proficiency: 4, orderIndex: 5 },
  { id: '11', name: 'Python',         category: 'Backend',  proficiency: 4, orderIndex: 6 },
  { id: '12', name: 'PostgreSQL',     category: 'Data',     proficiency: 5, orderIndex: 1 },
  { id: '13', name: 'Firebase',       category: 'Data',     proficiency: 4, orderIndex: 2 },
  { id: '14', name: 'Redis',          category: 'Data',     proficiency: 3, orderIndex: 3 },
  { id: '15', name: 'Docker',         category: 'DevOps',   proficiency: 4, orderIndex: 1 },
  { id: '16', name: 'GCP',            category: 'DevOps',   proficiency: 4, orderIndex: 2 },
  { id: '17', name: 'Vercel',         category: 'DevOps',   proficiency: 4, orderIndex: 3 },
  { id: '18', name: 'GitHub Actions', category: 'DevOps',   proficiency: 4, orderIndex: 4 },
];

const now = new Date().toISOString();
const ago = (days: number) => new Date(Date.now() - days * 86400000).toISOString();

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1', title: 'Portfolio Platform', slug: 'portfolio-platform',
    tagline: 'Full-stack personal portfolio built in public.',
    description: 'A monorepo portfolio platform serving as both a personal site and a live architecture reference. Built with Angular 20, .NET Core 9, NestJS, FastAPI, PostgreSQL, and Firebase.',
    longDescription: 'The platform showcases the Capsule Convention for Angular component structure. Every component is a named folder with an index pair. Services are bare stubs. Models are namespace-split by domain.',
    techStack: ['Angular 20', '.NET Core 9', 'NestJS', 'FastAPI', 'PostgreSQL', 'Firebase'],
    status: 'active', featured: true, orderIndex: 1,
    githubUrl: 'https://github.com/miloseng/portfolio-platform',
    demoUrl: 'https://miloseng.com',
    screenshots: [], metadata: {}, createdAt: ago(30), updatedAt: ago(2),
  },
  {
    id: '2', title: 'fl-legal.ca', slug: 'fl-legal',
    tagline: 'Modern web presence for a Calgary law firm.',
    description: 'A professional website for a Calgary-based law firm. Angular 20 with Capsule Convention, Tailwind CSS, Vercel hosting.',
    techStack: ['Angular 20', 'TailwindCSS', 'Vercel'],
    status: 'active', featured: true, orderIndex: 2,
    demoUrl: 'https://fl-legal.ca',
    screenshots: [], metadata: {}, createdAt: ago(60), updatedAt: ago(10),
  },
  {
    id: '3', title: 'Dev Utilities', slug: 'dev-utilities',
    tagline: 'In-browser developer toolbox backed by a Python API.',
    description: 'JSON formatter, Regex tester, Unit converter (pint), Text analyser (textstat + NLTK), and Hash tools.',
    techStack: ['Angular 20', 'FastAPI', 'Python', 'pint', 'NLTK'],
    status: 'active', featured: false, orderIndex: 3,
    screenshots: [], metadata: {}, createdAt: ago(45), updatedAt: ago(5),
  },
  {
    id: '4', title: 'Analytics Dashboard', slug: 'analytics-dashboard',
    tagline: 'Real-time event pipeline and admin metrics view.',
    description: 'A NestJS analytics API with PostgreSQL backing, surfaced in the admin panel.',
    techStack: ['NestJS', 'PostgreSQL', 'Angular 20', 'TypeScript'],
    status: 'coming_soon', featured: false, orderIndex: 4,
    screenshots: [], metadata: {}, createdAt: ago(15), updatedAt: ago(1),
  },
];

export const MOCK_ISSUES: NewsletterIssue[] = [
  {
    id: '1', title: 'Building a Portfolio in Public', slug: 'building-portfolio-in-public',
    excerpt: 'Why I decided to build my entire portfolio platform from scratch, in public.',
    content: '# Building a Portfolio in Public\n\nMost developers have a portfolio site. Few document the decisions that went into building it.\n\n## What I built\n\nA full-stack monorepo: Angular 20, .NET Core 9, NestJS (×2), FastAPI, PostgreSQL, Firebase.\n\n## Why in public?\n\nThe architecture decisions are more interesting than the end result.',
    status: 'sent', sentAt: ago(14), recipientCount: 12, openCount: 8,
    issueNumber: 1, createdAt: ago(16), updatedAt: ago(14),
    description: '',
    url: '',
    image: '',
    publishedAt: '',
    source: {
      name: ''
    }
  },
  {
    id: '2', title: 'The .NET Core API — Clean Architecture at Scale',
    slug: 'dotnet-api-clean-architecture',
    excerpt: 'How the portfolio-api is structured using Clean Architecture with EF Core 9.',
    content: '# The .NET Core API\n\n*Draft — coming soon.*',
    status: 'draft', recipientCount: 0, openCount: 0,
    issueNumber: 2, createdAt: ago(3), updatedAt: ago(1),
    description: '',
    url: '',
    image: '',
    publishedAt: '',
    source: {
      name: ''
    }
  },
];

function generateViewsByDay(days: number): { date: string; views: number }[] {
  const result = [];
  for (let i = days; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    result.push({
      date: d.toISOString().slice(0, 10),
      views: Math.floor(Math.random() * 40) + 5,
    });
  }
  return result;
}

export const MOCK_METRICS: MetricsSummary = {
  totalViews: 847,
  uniqueSessions: 312,
  topPages: [
    { page: '/',           views: 342 },
    { page: '/projects',   views: 189 },
    { page: '/utilities',  views: 127 },
    { page: '/newsletter', views: 98  },
    { page: '/contact',    views: 91  },
  ],
  viewsByDay: generateViewsByDay(30),
  referrers: [
    { referrer: '',                       count: 198 },
    { referrer: 'https://github.com',     count: 67  },
    { referrer: 'https://linkedin.com',   count: 43  },
    { referrer: 'https://google.com',     count: 31  },
  ],
  utilityUsage: [
    { utility: 'json_formatter', count: 89 },
    { utility: 'hash_tools',     count: 45 },
    { utility: 'regex_tester',   count: 38 },
    { utility: 'unit_converter', count: 22 },
    { utility: 'text_stats',     count: 14 },
  ],
};

export const MOCK_UNIT_CATEGORIES = [
  { name: 'length',      label: 'Length',      units: ['m', 'km', 'mi', 'ft', 'in', 'cm', 'mm'] },
  { name: 'mass',        label: 'Mass',        units: ['kg', 'g', 'lb', 'oz', 'mg', 'ton']      },
  { name: 'temperature', label: 'Temperature', units: ['degC', 'degF', 'K']                      },
  { name: 'volume',      label: 'Volume',      units: ['L', 'mL', 'gal', 'qt', 'cup', 'fl_oz']  },
  { name: 'speed',       label: 'Speed',       units: ['m/s', 'km/h', 'mph', 'knot']             },
  { name: 'time',        label: 'Time',        units: ['s', 'min', 'h', 'day', 'week', 'year']   },
  { name: 'area',        label: 'Area',        units: ['m^2', 'km^2', 'ha', 'acre', 'ft^2']      },
  { name: 'energy',      label: 'Energy',      units: ['J', 'kJ', 'cal', 'kcal', 'kWh', 'BTU']   },
];
