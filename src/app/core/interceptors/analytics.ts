import { HttpInterceptorFn } from '@angular/common/http';
import { inject }            from '@angular/core';
import { tap }               from 'rxjs/operators';
import { AnalyticsService }  from '@services/analytics';

export const analyticsInterceptor: HttpInterceptorFn = (req, next) => {
  const analytics: AnalyticsService = inject(AnalyticsService);
  const start                       = performance.now();

  if (req.url.includes('/api/analytics')) return next(req);

  return next(req).pipe(
    tap({
      complete: () => {
        const durationMs = Math.round(performance.now() - start);
        if (durationMs > 2000) {
          analytics.track('slow_api_call', { url: req.url, durationMs });
        }
      },
    }),
  );
};
