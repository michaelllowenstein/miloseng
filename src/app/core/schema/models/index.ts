// =============================================================================
// models/index.ts — barrel re-export.
//
// Two consumption styles are supported simultaneously:
//
// 1. FLAT import (existing code, zero changes required):
//      import type { Project, SiteSettings } from '../shared/models';
//
// 2. NAMESPACE import (explicit domain scope, preferred for new code):
//      import type { Portfolio, Newsletter } from '../shared/models';
//      const p: Portfolio.Project = { … };
//      const s: Newsletter.IssueStatus = 'draft';
//
// Namespaces also work with star imports for full disambiguation:
//      import type * as M from '../shared/models';
//      const p: M.Portfolio.Project = { … };
// =============================================================================

// ── Namespace re-exports ──────────────────────────────────────────────────────
export type { Infra }       from './infra';
export type { Portfolio }   from './portfolio';
export type { Analytics }   from './analytics';
export type { Newsletter }  from './newsletter';
export type { Site }  from './site';

// ── Flat re-exports (backward-compatible aliases) ─────────────────────────────

// Infra
export type { ApiError, PaginatedResponse }                          from './infra';

// Portfolio
export type {
  ProjectStatus, Project, CreateProjectInput, UpdateProjectInput,
  Skill, SkillCategory, HeroSettings, AvailabilitySettings,
  SiteSettings, ContactMessage,
}                                                                     from './portfolio';

// Analytics
export type {
  AnalyticsEvent, DailyViews, PageViewCount, ReferrerCount,
  UtilityUsageCount, MetricsSummary,
}                                                                     from './analytics';

// Newsletter
export type {
  ArticleStatus, SubscriberStatus, NewsletterIssue,CreateArticleInput,
  UpdateArticleInput,
  Subscriber, SubscribeRequest, UnsubscribeRequest, BlogArticle, Article, BlogEntry, Feed
}                                                                     from './newsletter';

// Site 
export type {
  SectionHeader, LandingHero, Capability, QuickFact, Experience, AboutBio, TimelineRole, AboutContent, ContactChannel, ContactContent, ContactHeader, ResponseTime, NewsletterTopic, NewsletterContent, NewsletterHeader, ProjectPreviewContent, ProjectsContent, RoiSection,
  NavLink, FooterContent, SubscribeContent, SiteContent
} from './site';