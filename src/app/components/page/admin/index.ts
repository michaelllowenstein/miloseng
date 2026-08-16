import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DatePipe }          from '@angular/common';
import { RouterLink }        from '@angular/router';
import { PortfolioService }  from '@services/portfolio';
import { NewsletterService } from '@services/newsletter';
import { AnalyticsService }  from '@services/analytics';
import { AuthService }       from '@services/auth';
import { Project, ProjectStatus, NewsletterIssue, Newsletter } from '@schema/models';

type AdminSection = 'blog' | 'newsletter' | 'analytics';
type ModalKind    = 'project-form' | 'project-delete' | 'issue-form' | 'issue-send' | 'issue-delete';

const ADMIN_NAV: { section: AdminSection; label: string; icon: string }[] = [
  { section: 'blog',       label: 'Blog',       icon: '⬡' },
  { section: 'newsletter', label: 'Newsletter',  icon: '✉' },
  { section: 'analytics',  label: 'Analytics',  icon: '⌬' },
];

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, DatePipe, RouterLink],
  templateUrl: './index.html',
  styles: [],
})
export class AdminPage {
  readonly portfolio: PortfolioService  = inject(PortfolioService);
  readonly newsletter: NewsletterService = inject(NewsletterService);
  readonly analytics: AnalyticsService  = inject(AnalyticsService);
  private  auth: AuthService       = inject(AuthService);
  private  fb: FormBuilder         = inject(FormBuilder);

  readonly nav        = ADMIN_NAV;
  readonly section    = signal<AdminSection>('blog');
  readonly modal      = signal<ModalKind | null>(null);
  readonly saving     = signal(false);
  readonly target     = signal<Project | NewsletterIssue | null>(null);
  readonly rangeDays  = [7, 14, 30, 90];
  protected editId: string | null = null;

  readonly userEmail   = () => this.auth.user()?.email ?? '';
  readonly userInitial = () => this.userEmail()[0]?.toUpperCase() ?? 'A';

  readonly sortedProjects = computed(() =>
    [...(this.portfolio.projects.value() ?? [])].sort((a, b) => a.orderIndex - b.orderIndex));
  readonly sortedIssues   = computed(() =>
    [...(this.newsletter.allIssues.value() ?? [])].sort((a, b) => b.issueNumber - a.issueNumber));
  readonly metrics        = () => this.analytics.metrics.value();

  // ── Project form ──────────────────────────────────────────────────────────
  readonly projectForm = this.fb.nonNullable.group({
    title:        ['', Validators.required],
    slug:         ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
    tagline:      [''],
    description:  [''],
    status:       ['active' as ProjectStatus, Validators.required],
    techStackRaw: [''],
    githubUrl:    [''],
    demoUrl:      [''],
    thumbnailUrl: [''],
    featured:     [false],
  });

  // ── Issue form ────────────────────────────────────────────────────────────
  issueDraft: Partial<NewsletterIssue> = {};

  // ── Actions ───────────────────────────────────────────────────────────────
  setSection(s: AdminSection): void { this.section.set(s); }
  signOut(): void { this.auth.logout().subscribe(); }

  statusClass(s: string): string {
    return ({ active: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
              coming_soon: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
              archived: 'text-slate-400 border-slate-700 bg-slate-800',
              stealth: 'text-violet-400 border-violet-500/30 bg-violet-500/10',
              draft: 'text-slate-400 border-slate-700 bg-slate-800',
              scheduled: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
              sent: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' } as any)[s] ?? '';
  }

  openProjectCreate(): void {
    this.editId = null;
    this.projectForm.reset({ status: 'active', featured: false });
    this.modal.set('project-form');
  }
  openProjectEdit(p: Project): void {
    this.editId = p.id;
    this.projectForm.patchValue({ ...p, techStackRaw: p.techStack.join(', '),
      githubUrl: p.githubUrl ?? '', demoUrl: p.demoUrl ?? '', thumbnailUrl: p.thumbnailUrl ?? '' });
    this.modal.set('project-form');
  }
  confirmProjectDelete(p: Project): void { this.target.set(p); this.modal.set('project-delete'); }
  toggleFeatured(p: Project): void {
    this.portfolio.updateProject(p.id, { featured: !p.featured })
      .subscribe({ next: () => this.portfolio.projects.reload() });
  }
  saveProject(): void {
    if (this.projectForm.invalid) { this.projectForm.markAllAsTouched(); return; }
    this.saving.set(true);
    const { techStackRaw, ...rest } = this.projectForm.getRawValue();
    const payload = { ...rest, techStack: (techStackRaw ?? '').split(',').map(t => t.trim()).filter(Boolean) };
    const req = this.editId ? this.portfolio.updateProject(this.editId, payload) : this.portfolio.createProject(payload);
    req.subscribe({ next: () => { this.portfolio.projects.reload(); this.modal.set(null); this.saving.set(false); },
                    error: () => this.saving.set(false) });
  }
  deleteProject(): void {
    const t = this.target(); if (!t) return;
    this.saving.set(true);
    this.portfolio.deleteProject(t.id).subscribe({
      next: () => { this.portfolio.projects.reload(); this.modal.set(null); this.saving.set(false); },
      error: () => this.saving.set(false) });
  }

  openIssueCreate(): void { this.editId = null; this.issueDraft = { title: '', excerpt: '', content: '' }; this.modal.set('issue-form'); }
  openIssueEdit(i: NewsletterIssue): void { this.editId = i.id; this.issueDraft = { title: i.title, excerpt: i.excerpt, content: i.content }; this.modal.set('issue-form'); }
  confirmIssueSend(i: NewsletterIssue): void   { this.target.set(i); this.modal.set('issue-send'); }
  confirmIssueDelete(i: NewsletterIssue): void { this.target.set(i); this.modal.set('issue-delete'); }
  saveIssue(): void {
    this.saving.set(true);
    const req = this.editId ? this.newsletter.updateIssue(this.editId, this.issueDraft) : this.newsletter.createIssue(this.issueDraft);
    req.subscribe({ next: () => { this.newsletter.allIssues.reload(); this.modal.set(null); this.saving.set(false); },
                    error: () => this.saving.set(false) });
  }
  sendIssue(): void {
    const t = this.target() as NewsletterIssue; if (!t) return;
    this.saving.set(true);
    this.newsletter.sendIssue(t.id).subscribe({
      next: () => { this.newsletter.allIssues.reload(); this.modal.set(null); this.saving.set(false); },
      error: () => this.saving.set(false) });
  }
  deleteIssue(): void {
    const t = this.target() as NewsletterIssue; if (!t) return;
    this.saving.set(true);
    this.newsletter.deleteIssue(t.id).subscribe({
      next: () => { this.newsletter.allIssues.reload(); this.modal.set(null); this.saving.set(false); },
      error: () => this.saving.set(false) });
  }
  closeModal(): void { this.modal.set(null); }

  barHeight(val: number, arr: { count?: number; views?: number }[], key: 'views' | 'count' = 'views'): number {
    const max = Math.max(...arr.map(a => (a as any)[key] ?? 0));
    return max === 0 ? 0 : Math.max((val / max) * 100, 2);
  }
  setRange(days: number): void { this.analytics.setMetricsRange(days); }
}