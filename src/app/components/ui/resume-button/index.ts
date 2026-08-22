import { Component, Input } from '@angular/core';
const html2pdf = await import('html2pdf.js');
@Component({
  selector: 'app-resume-button',
  standalone: true,
  templateUrl: './index.html',
})
export class ResumeButton {
  @Input() variant: 'primary' | 'compact' | 'inline' = 'primary';

  readonly href = 'assets/docs/Resume.pdf';
  readonly filename = 'Michael_Lowenstein_Resume.pdf';

  onDownload(): void {
    // Hook point for analytics tracking
    // e.g. this.analytics.track('resume_download', { variant: this.variant });
  }
}