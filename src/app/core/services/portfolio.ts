import { Injectable, inject, resource, signal } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { env }           from '@env/env';
import { Project, Skill, SiteSettings, ContactMessage } from '@schema/models';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private http    = inject(HttpClient);
  private baseUrl = env.apiBase.portfolio;

  // ── Static resources: load once on first consumer attach ─────────────────
  readonly projects = resource<Project[], void>({
    loader: () =>
      firstValueFrom(this.http.get<Project[]>(`${this.baseUrl}/projects`)),
  });

  readonly featuredProjects = resource<Project[], void>({
    loader: () =>
      firstValueFrom(
        this.http.get<Project[]>(`${this.baseUrl}/projects?featured=true`)
      ),
  });

  readonly skills = resource<Skill[], void>({
    loader: () =>
      firstValueFrom(this.http.get<Skill[]>(`${this.baseUrl}/skills`)),
  });

  readonly siteSettings = resource<SiteSettings, void>({
    loader: () =>
      firstValueFrom(this.http.get<SiteSettings>(`${this.baseUrl}/settings`)),
  });

  // ── Reactive resource: re-runs whenever projectSlug changes ───────────────
  // undefined → Angular skips the loader (no spurious request on init).
  // string   → loader fires, fetches the project.
  readonly projectSlug = signal<string>('');

  readonly projectDetail = resource<Project, string>({
    params: () => this.projectSlug(),
    loader: ({ params: slug }) =>
      firstValueFrom(this.http.get<Project>(`${this.baseUrl}/projects/${slug}`)),
  });

  loadProject(slug: string): void { this.projectSlug.set(slug); }

  sendContactMessage(msg: ContactMessage) {
    return this.http.post(`${this.baseUrl}/contact`, msg);
  }

  // ── Admin mutations (caller calls resource.reload() after) ────────────────
  createProject(data: Partial<Project>) {
    return this.http.post<Project>(`${this.baseUrl}/projects`, data);
  }
  updateProject(id: string, data: Partial<Project>) {
    return this.http.patch<Project>(`${this.baseUrl}/projects/${id}`, data);
  }
  deleteProject(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/projects/${id}`);
  }
  updateSettings(key: string, value: unknown) {
    return this.http.put(`${this.baseUrl}/settings/${key}`, { value });
  }
}