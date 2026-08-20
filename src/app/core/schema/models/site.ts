/**
 * schema/models/site.ts
 *
 * Typed content model for all site-editable text regions.
 * Each interface maps to the corresponding subtree under public/siteContent/ in Firebase Realtime Database.
 *
 * Realtime Database logical layout:
 *   siteContent/landing/hero         → LandingHero
 *   siteContent/landing/capabilities → { items: Capability[] }
 *   siteContent/landing/roles        → { items: TimelineRole[] }
 *   siteContent/about/header         → SectionHeader
 *   siteContent/about/bio            → AboutBio
 *   siteContent/about/quickFacts     → { items: QuickFact[] }
 *   siteContent/about/experience     → { items: Experience[] }
 *   siteContent/contact/header       → ContactHeader
 *   siteContent/contact/channels     → { items: ContactChannel[] }
 *   siteContent/contact/openTo       → { items: string[] }
 *   siteContent/contact/responseTime → ResponseTime
 *   siteContent/newsletter/header    → NewsletterHeader
 *   siteContent/newsletter/topics    → { items: NewsletterTopic[] }
 *   siteContent/newsletter/pastIssues → { items: PastIssue[] }
 *   siteContent/projects/header      → SectionHeader
 *   siteContent/projects/roi         → RoiSection
 *   siteContent/projects/previews    → { items: ProjectPreviewContent[] }
 *   siteContent/layout/footer        → FooterContent
 *   siteContent/layout/navbar        → { items: NavLink[] }
 *   siteContent/layout/subscribe     → SubscribeContent
 */

// ── Shared ───────────────────────────────────────────────────────────────────
export namespace Site {
  export interface SectionHeader {
    breadcrumb: string; // e.g. "~/about"
    headline: string; // plain text portion
    headlineAccent: string; // gradient-highlighted portion
  }

  // ── Landing / Home ───────────────────────────────────────────────────────────

  export interface LandingHero {
    badge: string;
    headlinePre: string;
    headlineAccent: string;
    headlinePost: string;
    subline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  }

  export interface Capability {
    icon: string;
    label: string;
    detail: string;
  }

  export interface TimelineRole {
    period: string;
    title: string;
    company: string;
    blurb: string;
  }

  export interface LandingContent {
    hero: LandingHero;
    sectionLabel: string; // "Primary Stack"
    timelineLabel: string; // "Career Trajectory"
    timelineHeadline: string; // "From microservices to methodology"
    capabilities: Capability[];
    roles: TimelineRole[];
  }

  // ── About ────────────────────────────────────────────────────────────────────

  export interface QuickFact {
    label: string;
    value: string;
  }

  export interface Experience {
    period: string;
    location: string;
    title: string;
    company: string;
    description: string;
    tech: string[];
  }

  export interface AboutBio {
    paragraphs: string[];
  }

  export interface AboutContent {
    header: SectionHeader;
    bio: AboutBio;
    quickFacts: QuickFact[];
    experiences: Experience[];
  }

  // ── Contact ──────────────────────────────────────────────────────────────────

  export interface ContactChannel {
    icon: string;
    label: string;
    detail: string;
    href: string;
    external: boolean;
  }

  export interface ResponseTime {
    value: string;
    label: string;
    description: string;
  }

  export interface ContactHeader {
    breadcrumb: string;
    headline: string;
    subline: string;
  }

  export interface ContactContent {
    header: ContactHeader;
    channels: ContactChannel[];
    openTo: string[];
    responseTime: ResponseTime;
  }

  // ── Newsletter ───────────────────────────────────────────────────────────────

  export interface NewsletterTopic {
    title: string;
    desc: string;
  }

  export interface PastIssue {
    title: string;
    preview: string;
    date: string;
  }

  export interface NewsletterHeader {
    breadcrumb: string;
    headline: string;
    subline: string;
  }

  export interface NewsletterContent {
    header: NewsletterHeader;
    whatYouGet: string; // "What you'll get"
    recentLabel: string; // "Recent dispatches"
    topics: NewsletterTopic[];
    pastIssues: PastIssue[];
  }

  // ── Projects ─────────────────────────────────────────────────────────────────

  export interface ProjectPreviewContent {
    id: string;
    name: string;
    tagline: string;
    description: string;
    color: string;
    status: 'active' | 'maintained' | 'experimental';
    tech: string[];
  }

  export interface RoiSection {
    sectionLabel: string;
    headline: string;
    description: string;
  }

  export interface ProjectsContent {
    header: SectionHeader;
    sectionHeading: string; // "Active Initiatives"
    roi: RoiSection;
    previews: ProjectPreviewContent[];
  }

  // ── Layout ───────────────────────────────────────────────────────────────────

  export interface NavLink {
    path: string;
    label: string;
    exact: boolean;
  }

  export interface FooterContent {
    brandBlurb: string;
    copyrightName: string;
    builtWith: string;
    externalLinks: { label: string; href: string }[];
  }

  export interface SubscribeContent {
    heading: string;
    subline: string;
    buttonLabel: string;
    disclaimer: string;
  }

  // ── Top-level aggregate (convenience) ────────────────────────────────────────

  export interface SiteContent {
    landing: LandingContent;
    about: AboutContent;
    contact: ContactContent;
    newsletter: NewsletterContent;
    projects: ProjectsContent;
    footer: FooterContent;
    navbar: NavLink[];
    subscribe: SubscribeContent;
  }
  export type NotificationAudience = 'all' | 'lawyers' | 'editors';
export type NotificationType = 'feature' | 'info' | 'warning';
export type NotificationStatus = 'active' | 'archived';

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  type: NotificationType;
  audience: NotificationAudience;
  status: NotificationStatus;
  cta?: {
    label: string;
    url: string;
  };
  createdAt: string; // ISO
  expiresAt?: string; // ISO — optional TTL
  authorId?: string;
}

/** Shape stored in Firebase under /notificationReads/{uid}/{notifId} */
export interface NotificationReadRecord {
  readAt: string;
  uid: string;
}
 
/** Client-side enriched model */
export interface NotificationViewModel extends AppNotification {
  isRead: boolean;
  isDismissed: boolean; // session-only, not persisted
}
}

export type NotificationViewModel = Site.NotificationViewModel;
export type NotificationStatus = Site.NotificationStatus;
export type NotificationType = Site.NotificationType;
export type AppNotification = Site.AppNotification;
export type NotificationReadRecord = Site.NotificationReadRecord;
export type NotificationAudience = Site.NotificationAudience;
export type AboutBio = Site.AboutBio;
export type AboutContent = Site.AboutContent;
export type Capability = Site.Capability;
export type ContactChannel = Site.ContactChannel;
export type ContactContent = Site.ContactContent;
export type ContactHeader = Site.ContactHeader;
export type Experience = Site.Experience;
export type FooterContent = Site.FooterContent;
export type LandingContent = Site.LandingContent;
export type LandingHero = Site.LandingHero;
export type NavLink = Site.NavLink;
export type NewsletterContent = Site.NewsletterContent;
export type NewsletterHeader = Site.NewsletterHeader;
export type NewsletterTopic = Site.NewsletterTopic;
export type PastIssue = Site.PastIssue;
export type ProjectPreviewContent = Site.ProjectPreviewContent;
export type ProjectsContent = Site.ProjectsContent;
export type QuickFact = Site.QuickFact;
export type ResponseTime = Site.ResponseTime;
export type RoiSection = Site.RoiSection;
export type SectionHeader = Site.SectionHeader;
export type SiteContent = Site.SiteContent;
export type SubscribeContent = Site.SubscribeContent;
export type TimelineRole = Site.TimelineRole;
