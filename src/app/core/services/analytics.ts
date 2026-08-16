import { Injectable, inject, resource, signal } from '@angular/core';
import { HttpClient }                           from '@angular/common/http';
import { Router, NavigationEnd }                from '@angular/router';
import { firstValueFrom, filter }               from 'rxjs';
import { env }                                  from '@env/env';
import { AnalyticsEvent, MetricsSummary }       from '@schema/models';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private http      = inject(HttpClient);
  private router    = inject(Router);
  private baseUrl   = env.apiBase.analytics;
  private sessionId = this.generateSessionId();

  // ── Admin: reactive metrics (re-fetches when days range changes) ──────────
  readonly metricsRange = signal<{ days: number }>({ days: 30 });

  readonly metrics = resource<MetricsSummary, { days: number }>({
    params: () => this.metricsRange(),
    loader: ({ params: { days } }) =>
      firstValueFrom(
        this.http.get<MetricsSummary>(`${this.baseUrl}/metrics?days=${days}`)
      ),
  });

  // ── Lifecycle: attach router events on app init ───────────────────────────
  init(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.track('page_view', { page: e.urlAfterRedirects });
      });
  }

  track(eventType: string, metadata: Record<string, unknown> = {}): void {
    const payload: AnalyticsEvent = {
      eventType,
      page:      this.router.url,
      referrer:  document.referrer || undefined,
      sessionId: this.sessionId,
      metadata,
    };
    // fire-and-forget — analytics must never block the UI
    this.http.post(`${this.baseUrl}/events`, payload).subscribe({
      error: () => { /* silently swallow */ },
    });
  }

  trackUtilityUse(utility: string): void { this.track('utility_use', { utility }); }
  trackProjectView(slug: string): void   { this.track('project_view', { projectSlug: slug }); }
  setMetricsRange(days: number): void    { this.metricsRange.set({ days }); }

  private generateSessionId(): string {
    const key = 'portfolio_session';
    let id = sessionStorage.getItem(key);
    if (!id) { id = crypto.randomUUID(); sessionStorage.setItem(key, id); }
    return id;
  }
}