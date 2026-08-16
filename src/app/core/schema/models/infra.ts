// =============================================================================
// Infra — cross-cutting infrastructure types shared by every domain.
// =============================================================================

export namespace Infra {

  /**
   * Error envelope returned by all three NestJS APIs and the FastAPI service.
   * NestJS sends `message: string[]`; FastAPI sends `message: string`.
   * Callers should normalise with: [].concat(err.message).join(', ')
   */
  export interface ApiError {
    statusCode: number;
    message:    string | string[];
    error?:     string;    // HTTP reason phrase, e.g. "Not Found"
    timestamp?: string;    // ISO-8601
    path?:      string;
  }

  /**
   * Generic paginated envelope.
   * Not yet wired on all endpoints — present so the service layer
   * can type switch endpoints as they graduate from flat arrays.
   */
  export interface PaginatedResponse<T> {
    data:       T[];
    total:      number;
    page:       number;
    pageSize:   number;
    totalPages: number;
  }

}

// ── Flat aliases (backward-compatible, zero changes required in consumers) ──
export type ApiError                         = Infra.ApiError;
export type PaginatedResponse<T>             = Infra.PaginatedResponse<T>;