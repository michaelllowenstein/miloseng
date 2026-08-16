import { Component, OnInit, signal } from '@angular/core';
import { ScrollAnimateDirective } from '@directives/scroll-animate';
import { BridgeComponent } from '../../bridge';
import { ProjectComponent, ProjectPreview } from '@feature/project';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ScrollAnimateDirective, BridgeComponent, ProjectComponent],
  templateUrl: './index.html',
})
export class ProjectsPage implements OnInit {
  roiDashboardComponent = signal<any>(null);

  async ngOnInit(): Promise<void> {
    const mod = await import('../../islands/RoiDashboard');
    this.roiDashboardComponent.set(mod.RoiDashboard);
  }

  projects: ProjectPreview[] = [
    {
      id: 'toolbox',
      name: 'Toolbox',
      tagline: 'CLI & developer productivity suite',
      color: '#33FF88',
      status: 'active',
      description:
        'A modular CLI architecture built on aliaser.zsh, dev_tools.zsh, and sandbox_tools.zsh. ' +
        'Cross-machine config sync via dotfiles, SSH identity switching, and rg/fzf/bat pipelines ' +
        'for 3x faster code navigation.',
      tech: ['zsh', 'tmux', 'fzf', 'rg', 'WSL2'],
    },
    {
      id: 'workflow',
      name: 'Workflow',
      tagline: 'Agentic development orchestration',
      color: '#3B82F6',
      status: 'active',
      description:
        'State-Mode Development methodology for decomposing UI state into explicit modes. ' +
        'ActivityWatch → local LLM → digest pipeline. Zellij multiplexer with persistent ' +
        'session architecture for cross-project context.',
      tech: ['TypeScript', 'Angular 20', 'Python', 'LLM APIs'],
    },
    {
      id: 'autoval',
      name: 'AutoVal',
      tagline: 'AI assistant benchmarking & evaluation',
      color: '#F59E0B',
      status: 'active',
      description:
        'Comparative benchmarks across Claude Opus 4.5, GPT-4o, and GPT-5.2 using a shared ' +
        'frontend/backend prompt suite in Cursor IDE. Includes the judge CLI — an LLM-powered ' +
        'code review tool via the Anthropic API.',
      tech: ['Anthropic API', 'Cursor IDE', 'TypeScript', 'Prompt Engineering'],
    },
    {
      id: 'automation',
      name: 'Automation',
      tagline: 'Infrastructure & pipeline automation',
      color: '#F472B6',
      status: 'maintained',
      description:
        'ProxyMockApi (.NET 8/YARP) for chaos and resilience testing. ' +
        'ScraperJobRunner (Node.js 22) scheduled scraping pipeline. ' +
        'ermis-transcriber: 13-stage Whisper ASR normalization achieving 20/20 on the reference suite.',
      tech: ['.NET 8', 'YARP', 'Node.js 22', 'Whisper', 'Python'],
    },
    {
      id: 'onboarded',
      name: 'Onboarded',
      tagline: 'Full-stack monorepo & portal platform',
      color: '#A78BFA',
      status: 'active',
      description:
        'Nx v22 monorepo with Angular 20 portal (@onboarded/portal). Fully scoped Nx CLI syntax ' +
        'with justfile/Makefile tooling. datagen CLI for AI training data generation.',
      tech: ['Nx v22', 'Angular 20', 'Node.js', 'justfile'],
    },
  ];
}