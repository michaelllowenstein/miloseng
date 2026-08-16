// =============================================================================
// Newsletter — issues, subscribers, and mailing.
// Owned by: NestJS newsletter-api (port 5003).
// =============================================================================

export namespace Newsletter {
  export type ArticleStatus = 'draft' | 'scheduled' | 'sent';
  export type SubscriberStatus = 'pending' | 'active' | 'unsubscribed' | 'bounced';

  export interface Article {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string; // Markdown source
    status: ArticleStatus;
    scheduledFor?: string; // ISO-8601; only set when status = 'scheduled'
    sentAt?: string;
    recipientCount: number;
    openCount: number;
    issueNumber: number;
    createdAt: string;
    updatedAt: string;
  }

  /**
   * POST /issues body.
   * Server owns: id · issueNumber · recipientCount · openCount · sentAt · timestamps.
   */
  export type CreateArticleInput = Pick<
    Article,
    'title' | 'excerpt' | 'content' | 'status' | 'scheduledFor'
  >;

  /** PATCH /issues/:id body. */
  export type UpdateArticleInput = Partial<CreateArticleInput>;

  // ──

  export interface Subscriber {
    id: string;
    email: string;
    name?: string;
    status: SubscriberStatus;
    subscribedAt: string;
    confirmedAt?: string; // set after double opt-in confirmation
    unsubscribedAt?: string;
    unsubscribeToken: string; // one-click unsubscribe token in email footer
    tags: string[];
  }

  export interface SubscribeRequest {
    email: string;
    name?: string;
  }

  export interface UnsubscribeRequest {
    token: string;
  }

  export interface BlogArticle {
    // addDate: string;
    articleId?: string;
    authorsByLine?: string;
    categories?: { name: string }[];
    claim?: string;
    clusterId?: string;
    companies?: { name: string }[];
    author?: string;
    content?: string;
    country?: string;
    description?: string;
    entities?: { data: string; type: string; mentions: number }[];
    imageUrl?: string;
    keywords?: { name: string; weight: number }[];
    labels?: { name: string }[];
    language?: string;
    links?: string[];
    locations?: { country: string }[];
    matchedAuthors?: { id: string; name: string }[];
    medium?: string;
    people?: { name: string }[];
    places?: string[];
    pubDate?: string;
    refreshDate?: string;
    reprint?: boolean;
    reprintGroupId?: string;
    score?: number;
    sentiment?: { positive: number; negative: number; neutral: number };
    source?: {
      domain: string;
      locations: {
        country: string;
        state: string;
        city: string;
        coordinates: { lat: number; long: number };
      };
    };
    summary?: string;
    title?: string;
    topics?: { name: string }[];
    translatedDescription?: string;
    translatedSummary?: string;
    translatedTitle?: string;
    translation?: string;
    url?: string;
    verdict?: string;
    date: Date | string;
    excerpt?: string;
  }

  export interface BlogEntry {
    id: string;
    title: string;
    author: string;
    content: string;
    image: string;
    topics: string[];
  }

  export interface Article {
    title: string;
    description: string;
    url: string;
    image: string;
    publishedAt: string;
    content: string;
    source: { name: string };
  }

  export interface Feed {
    entries?: BlogEntry[];
    articles: BlogArticle[];
    numResults: number;
    status: number;
  }
}

// ── Flat aliases ─────────────────────────────────────────────────────────────
export type ArticleStatus = Newsletter.ArticleStatus;
export type SubscriberStatus = Newsletter.SubscriberStatus;
export type NewsletterIssue = Newsletter.Article;
export type CreateArticleInput = Newsletter.CreateArticleInput;
export type UpdateArticleInput = Newsletter.UpdateArticleInput;
export type Subscriber = Newsletter.Subscriber;
export type SubscribeRequest = Newsletter.SubscribeRequest;
export type UnsubscribeRequest = Newsletter.UnsubscribeRequest;
export type BlogArticle = Newsletter.BlogArticle;
export type Article = Newsletter.Article;
export type BlogEntry = Newsletter.BlogEntry;
export type Feed = Newsletter.Feed;
