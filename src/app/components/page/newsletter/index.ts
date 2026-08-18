import { Component } from '@angular/core';

import { CmsFieldDirective } from '@directives/cms-field';
import { ScrollAnimateDirective } from '@directives/scroll-animate';
import { NEWSLETTER_DEFAULTS } from '@schema/constants/site-defaults';
import { SubscribeComponent } from '@feature/subscribe';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [
    ScrollAnimateDirective,
    CmsFieldDirective,
    SubscribeComponent,
  ],
  templateUrl: './index.html',
})
export class NewsletterPage {
  readonly topics = NEWSLETTER_DEFAULTS.topics;
  readonly pastIssues = NEWSLETTER_DEFAULTS.pastIssues;
}
