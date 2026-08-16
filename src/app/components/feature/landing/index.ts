import { Component, OnInit, signal, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ScrollAnimateDirective } from '@directives/scroll-animate';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, ScrollAnimateDirective],
  templateUrl: './index.html'
})
export class LandingComponent {
  capabilities = [
    { icon: '⬡', label: '.NET / C#',      detail: '.NET 8/9 microservices, YARP, Entity Framework' },
    { icon: '△', label: 'TypeScript',      detail: 'Angular 20, Node.js, Nx monorepos' },
    { icon: '◈', label: 'Python',          detail: 'PyTorch, LangChain, scikit-learn, Whisper ASR' },
    { icon: '▣', label: 'Infrastructure',  detail: 'Docker, Kubernetes, Tailscale, Pi-hole' },
  ];

  roles = [
    {
      period: '2023 – Present',
      title: 'Senior Consultant Software Engineer',
      company: 'MSI — Calgary, AB',
      blurb: 'Architecture decisions and delivery quality across a polyglot P&C insurance platform. .NET, Node.js, Python, and Go on distributed microservices with Docker/K8s.',
    },
    {
      period: '2022 – Present',
      title: 'Contractor / Technical Evaluator',
      company: 'micro1',
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
      company: 'FullStack Labs / 1280 Labs',
      blurb: 'Full-stack development across client projects. ML regression library for House Analytics residential property valuation.',
    },
  ];
}