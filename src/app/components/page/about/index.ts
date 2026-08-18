import { Component } from '@angular/core';

import { CmsFieldDirective } from '@directives/cms-field';
import { ReadableDirective } from '@directives/readable';
import { ScrollAnimateDirective } from '@directives/scroll-animate';
import { ABOUT_DEFAULTS } from '@schema/constants/site-defaults';
import { ExperienceComponent } from '@feature/experience';
import { ResumeButton } from '@ui/resume-button';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    ScrollAnimateDirective,
    ReadableDirective,
    CmsFieldDirective,
    ExperienceComponent,
    ResumeButton,
  ],
  templateUrl: './index.html',
})
export class AboutMePage {
  readonly quickFacts = ABOUT_DEFAULTS.quickFacts;
  readonly bioParagraphs = ABOUT_DEFAULTS.bio.paragraphs;
}
