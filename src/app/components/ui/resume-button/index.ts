import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resume-button',
  standalone: true,
  templateUrl: './index.html',
})
export class ResumeButton {
  @Input() variant: 'primary' | 'compact' | 'inline' = 'primary';

  readonly href = 'assets/docs/resume.pdf';
  readonly filename = 'Michael_Lowenstein_Resume.pdf';

  onDownload(): void {
    // Hook point for analytics tracking
    // e.g. this.analytics.track('resume_download', { variant: this.variant });
  }
}