import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '@directives/scroll-animate';
import { EmailComponent } from '@feature/email';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ScrollAnimateDirective, EmailComponent],
  templateUrl: './index.html',
})
export class ContactMePage {
  channels = [
    { icon: '◆', label: 'GitHub',    detail: 'github.com/miloseng',      href: 'https://github.com/miloseng',    external: true },
    { icon: '▦', label: 'LinkedIn',  detail: 'linkedin.com/in/mlo2gs',   href: 'https://linkedin.com/in/mlo2gs', external: true },
    { icon: '◇', label: 'Portfolio', detail: 'miloseng.com',             href: 'https://miloseng.com',            external: true },
    { icon: '▸', label: 'Email',     detail: 'michael&#64;miloseng.com', href: 'mailto:michael@miloseng.com',     external: false },
  ];

  openTo = [
    'Architecture consulting',
    'Developer tooling',
    'Agentic workflows',
    'Technical evaluation',
    'OSS collaboration',
    'Speaking',
  ];
}