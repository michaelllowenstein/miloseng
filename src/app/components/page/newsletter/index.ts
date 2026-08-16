import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '@directives/scroll-animate';
import { SubscribeComponent } from '@feature/subscribe';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [ScrollAnimateDirective, SubscribeComponent],
  templateUrl: './index.html',
})
export class NewsletterPage {
  topics = [
    { title: 'Architecture Patterns', desc: 'Microservices, event-driven design, and when monoliths actually win.' },
    { title: 'Agentic Coding', desc: "LLM-assisted development: what works, what doesn't, and the metrics to prove it." },
    { title: 'Developer Tooling', desc: 'CLI design, monorepo orchestration, and the art of the productive terminal.' },
    { title: 'Field Reports', desc: 'Real post-mortems and lessons from insurance platform engineering.' },
  ];

  pastIssues = [
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
  ];
}