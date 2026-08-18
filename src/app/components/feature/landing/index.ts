import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CmsFieldDirective } from '@directives/cms-field';
import { ScrollAnimateDirective } from '@directives/scroll-animate';
import { LANDING_DEFAULTS } from '@schema/constants/site-defaults';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    RouterLink,
    ScrollAnimateDirective,
    CmsFieldDirective,
  ],
  templateUrl: './index.html',
  styles: [`
    .spacer {
      min-width: 10px !important;
    }
    `]
})
export class LandingComponent {
  readonly capabilities = LANDING_DEFAULTS.capabilities;
  readonly roles = LANDING_DEFAULTS.roles;
}
