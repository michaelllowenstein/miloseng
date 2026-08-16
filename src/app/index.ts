import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AnalyticsService }  from '@services/analytics';

import { Footer } from '@layout/footer';
import { Navbar } from '@layout/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  template: `
    <div class="relative min-h-screen flex flex-col">
      <!-- Ambient grid background -->
      <div class="fixed inset-0 bg-grid-fine pointer-events-none opacity-60 z-0" aria-hidden="true"></div>
      <div class="fixed inset-0 noise-overlay pointer-events-none z-0" aria-hidden="true"></div>
      <app-navbar />
      <main class="flex-1 relative z-10">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
  styles: [`
    `]
})
export class App {
  protected readonly title = signal('miloseng');
  private analytics: AnalyticsService = inject(AnalyticsService);
  ngOnInit(): void { this.analytics.init(); }
}
