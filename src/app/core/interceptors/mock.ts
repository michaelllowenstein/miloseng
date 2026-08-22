// client/src/app/core/interceptors/mock.ts
// Development-only HTTP interceptor that returns mock data for all API endpoints.
// Activated via env.ts when `useMocks: true` — never runs in production.
//
// Pattern: intercept outgoing requests, match URL patterns, return mock responses.
// Falls through to the real network for unmatched URLs.

import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { of, delay } from 'rxjs';
import {
  MOCK_SETTINGS, MOCK_SKILLS, MOCK_PROJECTS, MOCK_ISSUES,
  MOCK_METRICS, MOCK_UNIT_CATEGORIES,
} from './mock-data';

/** Simulated network latency (ms) — makes skeleton states visible */
const LATENCY = 300;

function json<T>(body: T) {
  return of(new HttpResponse({ status: 200, body })).pipe(delay(LATENCY));
}

function json201<T>(body: T) {
  return of(new HttpResponse({ status: 201, body })).pipe(delay(LATENCY));
}

function noContent() {
  return of(new HttpResponse({ status: 204, body: null })).pipe(delay(50));
}

export const mockInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next) => {
  const url = req.url;
  const method = req.method;

  // ── Portfolio API (:5001) ──────────────────────────────────────────────────
  if (url.includes('/projects') && method === 'GET') {
    if (url.includes('featured=true')) {
      return json(MOCK_PROJECTS.filter(p => p.featured));
    }
    // Single project by slug: /projects/portfolio-platform
    const slugMatch = url.match(/\/projects\/([a-z0-9-]+)$/);
    if (slugMatch) {
      const project = MOCK_PROJECTS.find(p => p.slug === slugMatch[1]);
      return project ? json(project) : of(new HttpResponse({ status: 404, body: { message: 'Not found' } }));
    }
    return json(MOCK_PROJECTS);
  }

  if (url.includes('/skills') && method === 'GET') {
    return json(MOCK_SKILLS);
  }

  if (url.includes('/settings') && method === 'GET') {
    return json(MOCK_SETTINGS);
  }

  if (url.includes('/contact') && method === 'POST') {
    console.log('[mock] Contact message received:', req.body);
    return json201({ message: 'Message sent successfully' });
  }

  // Project mutations (admin)
  if (url.includes('/projects') && method === 'POST') {
    return json201({ ...req.body, id: crypto.randomUUID(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  }
  if (url.includes('/projects/') && method === 'PATCH') {
    return json({ ...req.body, updatedAt: new Date().toISOString() });
  }
  if (url.includes('/projects/') && method === 'DELETE') {
    return noContent();
  }

  // ── Analytics API (:5002) ──────────────────────────────────────────────────
  if (url.includes('/events') && method === 'POST') {
    return noContent(); // fire-and-forget
  }

  if (url.includes('/metrics') && method === 'GET') {
    return json(MOCK_METRICS);
  }

  // ── Newsletter API (:5003) ────────────────────────────────────────────────
  if (url.includes('/issues') && method === 'GET') {
    if (url.includes('status=sent')) {
      return json(MOCK_ISSUES.filter(i => i.status === 'sent'));
    }
    // Single issue by slug
    const issueSlug = url.match(/\/issues\/([a-z0-9-]+)$/);
    if (issueSlug) {
      const issue = MOCK_ISSUES.find(i => i.slug === issueSlug[1]);
      return issue ? json(issue) : of(new HttpResponse({ status: 404, body: { message: 'Not found' } }));
    }
    return json(MOCK_ISSUES);
  }

  if (url.includes('/subscribe') && method === 'POST') {
    console.log('[mock] Subscriber:', req.body);
    return json201({ message: 'Check your inbox for confirmation' });
  }

  // Issue mutations (admin)
  if (url.includes('/issues') && method === 'POST') {
    return json201({ ...req.body, id: crypto.randomUUID(), issueNumber: MOCK_ISSUES.length + 1, status: 'draft', recipientCount: 0, openCount: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  }
  if (url.includes('/issues/') && method === 'PATCH') {
    return json({ ...req.body, updatedAt: new Date().toISOString() });
  }
  if (url.includes('/issues/') && method === 'DELETE') {
    return noContent();
  }
  if (url.includes('/send') && method === 'POST') {
    return noContent();
  }

  // ── Utilities API (:5004) ──────────────────────────────────────────────────
  if (url.includes('/units/categories') && method === 'GET') {
    return json(MOCK_UNIT_CATEGORIES);
  }

  // ── Unmatched — pass through to real network ──────────────────────────────
  return next(req);
};
