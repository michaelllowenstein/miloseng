// =============================================================================
// Analytics — event ingestion and metrics aggregation.
// Owned by: NestJS analytics-api (port 5002).
// =============================================================================

export namespace Analytics {

  /** Written to POST /events. Fire-and-forget — never block UI on this. */
  export interface Event {
    eventType:   string;
    page:        string;
    referrer?:   string;   // document.referrer; absent = direct
    sessionId:   string;   // UUID stored in sessionStorage
    durationMs?: number;
    metadata?:   Record<string, unknown>;
  }

  // ── Sub-types of MetricsSummary ─────────────────────────────────────────

  export interface DailyViews {
    date:  string;    // YYYY-MM-DD
    views: number;
  }

  export interface PageViewCount {
    page:  string;
    views: number;
  }

  export interface ReferrerCount {
    referrer: string;   // empty string = direct / unknown
    count:    number;
  }

  export interface UtilityUsageCount {
    utility: string;
    count:   number;
  }

  /** Returned by GET /metrics?days=N. Drives the admin dashboard. */
  export interface MetricsSummary {
    totalViews:     number;
    uniqueSessions: number;
    topPages:       PageViewCount[];
    viewsByDay:     DailyViews[];
    referrers:      ReferrerCount[];
    utilityUsage:   UtilityUsageCount[];
  }

}

// ── Flat aliases ─────────────────────────────────────────────────────────────
export type AnalyticsEvent       = Analytics.Event;
export type DailyViews           = Analytics.DailyViews;
export type PageViewCount        = Analytics.PageViewCount;
export type ReferrerCount        = Analytics.ReferrerCount;
export type UtilityUsageCount    = Analytics.UtilityUsageCount;
export type MetricsSummary       = Analytics.MetricsSummary;