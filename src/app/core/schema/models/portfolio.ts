// =============================================================================
// Portfolio — projects, skills, site settings, and contact.
// Owned by: .NET Core 9 portfolio-api (port 5001).
// =============================================================================

export namespace Portfolio {

  export type Status = 'active' | 'archived' | 'coming_soon' | 'stealth';

  export interface Project {
    id:               string;
    title:            string;
    slug:             string;
    tagline:          string;
    description:      string;
    longDescription?: string;
    techStack:        string[];
    status:           Status;
    featured:         boolean;
    orderIndex:       number;
    previewUrl?:      string;
    githubUrl?:       string;
    demoUrl?:         string;
    thumbnailUrl?:    string;
    screenshots:      string[];
    metadata:         Record<string, unknown>;
    createdAt:        string;    // ISO-8601
    updatedAt:        string;
  }

  /**
   * POST /projects body.
   * Server owns: id · createdAt · updatedAt.
   * metadata is optional on write (server sets {} as default).
   */
  export type CreateInput = Omit<Project,
    'id' | 'createdAt' | 'updatedAt' | 'metadata'
  > & {
    metadata?: Record<string, unknown>;
  };

  /** PATCH /projects/:id body — all fields optional. */
  export type UpdateInput = Partial<CreateInput>;

  // ──

  export interface Skill {
    id:          string;
    name:        string;
    category:    string;
    proficiency?: 1 | 2 | 3 | 4 | 5;
    iconUrl?:    string;
    orderIndex:  number;
  }

  /** Computed grouping produced by the skills grid signal in HomeComponent. */
  export interface SkillCategory {
    name:   string;
    skills: Skill[];
  }

  // ──

  export interface HeroSettings {
    name:       string;
    title:      string;
    tagline:    string;
    avatarUrl?: string;
  }

  export interface AvailabilitySettings {
    openToWork: boolean;
    message:    string;
  }

  export interface SiteSettings {
    hero:         HeroSettings;
    socialLinks:  Record<string, string>;  // e.g. { github: 'https://…' }
    availability: AvailabilitySettings;
  }

  // ──

  export interface ContactMessage {
    name:    string;
    email:   string;
    subject: string;
    body:    string;
  }

  export type ProjectPreviewStatus =
  | 'active'
  | 'maintained'
  | 'experimental'
  | 'coming-soon';

  export interface ProjectPreview {
    id: string;
    name: string;
    tagline: string;
    description: string;
    color: string;
    tech: string[];
    status: ProjectPreviewStatus;
  }

  export interface ProjectPreviewSection {
    eyebrow: string;
    title: string;
    body: string;
    bullets?: string[];
  }

  export interface ProjectPreviewDetail extends ProjectPreview {
    summary: string;
    sections: ProjectPreviewSection[];
    preview?: {
      label: string;
      state: 'available' | 'planned' | 'coming-soon';
      message: string;
    };
  }
}

// ── Flat aliases ─────────────────────────────────────────────────────────────
export type ProjectPreview      = Portfolio.ProjectPreview;
export type ProjectPreviewStatus  = Portfolio.ProjectPreviewStatus;
export type ProjectPreviewSection = Portfolio.ProjectPreviewSection;
export type ProjectPreviewDetail = Portfolio.ProjectPreviewDetail;
export type ProjectStatus        = Portfolio.Status;
export type Project              = Portfolio.Project;
export type CreateProjectInput   = Portfolio.CreateInput;
export type UpdateProjectInput   = Portfolio.UpdateInput;
export type Skill                = Portfolio.Skill;
export type SkillCategory        = Portfolio.SkillCategory;
export type HeroSettings         = Portfolio.HeroSettings;
export type AvailabilitySettings = Portfolio.AvailabilitySettings;
export type SiteSettings         = Portfolio.SiteSettings;
export type ContactMessage       = Portfolio.ContactMessage;