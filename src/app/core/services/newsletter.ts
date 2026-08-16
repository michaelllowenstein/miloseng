import { Injectable, inject, resource } from '@angular/core';
import { HttpClient }                   from '@angular/common/http';
import { firstValueFrom }               from 'rxjs';
import { env } from '@env/env';
import { NewsletterIssue, SubscribeRequest } from '@schema/models';

@Injectable({ providedIn: 'root' })
export class NewsletterService {
  private http    = inject(HttpClient);
  private baseUrl = env.apiBase.newsletter;

  // Public: only sent issues
  readonly publishedIssues = resource<NewsletterIssue[], void>({
    loader: () =>
      firstValueFrom(
        this.http.get<NewsletterIssue[]>(`${this.baseUrl}/issues?status=sent`)
      ),
  });

  // Admin: all issues regardless of status
  readonly allIssues = resource<NewsletterIssue[], void>({
    loader: () =>
      firstValueFrom(this.http.get<NewsletterIssue[]>(`${this.baseUrl}/issues`)),
  });

  getIssueBySlug(slug: string): Promise<NewsletterIssue> {
    return firstValueFrom(
      this.http.get<NewsletterIssue>(`${this.baseUrl}/issues/${slug}`)
    );
  }

  subscribe(req: SubscribeRequest) {
    return this.http.post<{ message: string }>(`${this.baseUrl}/subscribe`, req);
  }
  unsubscribe(token: string) {
    return this.http.post<void>(`${this.baseUrl}/unsubscribe`, { token });
  }
  confirmSubscription(token: string) {
    return this.http.post<void>(`${this.baseUrl}/confirm`, { token });
  }

  // Admin mutations — caller calls allIssues.reload() after
  createIssue(data: Partial<NewsletterIssue>) {
    return this.http.post<NewsletterIssue>(`${this.baseUrl}/issues`, data);
  }
  updateIssue(id: string, data: Partial<NewsletterIssue>) {
    return this.http.patch<NewsletterIssue>(`${this.baseUrl}/issues/${id}`, data);
  }
  deleteIssue(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/issues/${id}`);
  }
  sendIssue(id: string) {
    return this.http.post<void>(`${this.baseUrl}/issues/${id}/send`, {});
  }
}