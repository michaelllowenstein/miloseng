import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '@directives/scroll-animate';
import { ReadableDirective } from '@directives/readable';
import { ExperienceComponent } from '@feature/experience';
import { ResumeButton } from '@ui/resume-button';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ScrollAnimateDirective, ReadableDirective, ExperienceComponent, ResumeButton],
  templateUrl: './index.html',
})
export class AboutMePage {
  quickFacts = [
    { label: 'Location', value: 'Calgary, AB' },
    { label: 'Current Role', value: 'Senior Consultant — Fullstack Principal Engineer @ Norima' },
    { label: 'Concurrent Role', value: 'Lead Backend Software Engineer @ Rogers Communications' },
    { label: 'Primary Stack', value: '.NET Core, TypeScript, Python, Go, Rust' },
    { label: 'Architecture', value: 'Microservices, CQRS, distributed caching, message queues' },
    { label: 'Education', value: 'BSc Computer Science — Software Engineering, U of C' },
    { label: 'Side Work', value: '1280 Labs contractor, OSS tooling, AI evaluator' },
    { label: 'Home Lab', value: 'System76 Thelio Mira, RPi 5 (Kali), Pop!_OS' },
  ];
}