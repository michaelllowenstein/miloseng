import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '@directives/scroll-animate';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ScrollAnimateDirective],
  templateUrl: './index.html',
})
export class ExperienceComponent {
  experiences = [
    {
      period: '01/2026 – Present',
      location: 'Calgary, AB',
      title: 'Senior Consultant — Fullstack Principal Engineer',
      company: 'Norima (Client: Millennial Specialty Insurance MGA)',
      description:
        'Lead production data-integrity remediation across a multi-generational insurance policy administration platform (MSI-PAS). Author governed SQL remediation packages through formal DBA review. Investigate complex data corruption clusters spanning payment misapplication, snapshot flag corruption, and endorsement flow failures — categorized into a growing root-cause taxonomy (Clusters A–W). Author and maintain msi-nav, a CLI navigation and compliance scanning tool across five repositories.',
      tech: ['.NET', 'SQL Server', 'Vue', 'Bootstrap 5', 'CLI Tooling', 'DBA Review'],
    },
    {
      period: '11/2025 – Present',
      location: 'Calgary, AB',
      title: 'Lead Backend Software Engineer',
      company: 'Rogers Communications Inc.',
      description:
        'Lead backend engineering for the next-generation Rogers eCommerce platform. Own design and implementation of mission-critical commerce services — product catalog, pricing, checkout, order orchestration. Drive platform reliability through distributed caching, asynchronous messaging, and resiliency patterns. Manage and mentor a senior engineering team. Establish CI/CD practices, observability strategies, and lead technical decision-making on data architecture and API contracts.',
      tech: ['C#', 'ASP.NET Core', 'Microservices', 'Distributed Caching', 'CI/CD', 'Observability'],
    },
    {
      period: '03/2025 – Present',
      location: 'Remote',
      title: 'Independent Contractor — Senior Software Engineer',
      company: '1280 Labs Inc.',
      description:
        'Team Lead on the front-end for an AI-enabled Talent Management CRM. Engineered backend services using Python, Node.js, and Redis. Developed Flutter mobile client and Angular web dashboard. Authored client-side token management with Auth0-based JWT schema. Prototyped backend services across Go, Rust, Node.js, Python, and .NET Core. Architected high-throughput microservices with distributed caching and horizontal scaling.',
      tech: ['Angular', 'Flutter', 'Python', 'Node.js', 'Go', 'Rust', '.NET Core', 'Auth0', 'Redis'],
    },
    {
      period: '09/2024 – 03/2025',
      location: 'Calgary, AB',
      title: 'Senior Back-End Software Engineer',
      company: 'College House at House Analytics',
      description:
        'Designed enterprise-scale .NET Core solutions including CQRS Web APIs, database administration, and AWS infrastructure integrations. Led prototyping of a Message Bus architecture exploring AWS MQ/SQS, RabbitMQ, Redis, and Kafka. Integrated advanced machine learning features into production systems. Collaborated with stakeholders to future-proof analytics products.',
      tech: ['.NET Core', 'CQRS', 'AWS', 'RabbitMQ', 'Kafka', 'Redis', 'Machine Learning'],
    },
    {
      period: '01/2024 – 02/2025',
      location: 'Calgary, AB',
      title: 'Senior Software Engineer',
      company: 'NCAL Engineering',
      description:
        'Implemented ETL processes synchronizing time-tracking APIs with production databases. Built a custom data management warehouse using Angular 16/17, .NET Core, and Node.js microservices. Designed and deployed an Invoice Automation and Analytics Dashboard. Built RBAC authentication infrastructure with Auth0. Saved the Senior Engineer and Founder a full week of hours monthly by streamlining financial workflows.',
      tech: ['Angular 16/17', '.NET Core', 'NestJS', 'Python', 'Go', 'Redis', 'Auth0', 'Docker'],
    },
    {
      period: '12/2021 – 12/2023',
      location: 'Remote',
      title: 'Senior Software Engineer',
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
  ];
}
