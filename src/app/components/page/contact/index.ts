import { Component } from '@angular/core';

import { CmsFieldDirective } from '@directives/cms-field';
import { ScrollAnimateDirective } from '@directives/scroll-animate';
import { CONTACT_DEFAULTS } from '@schema/constants/site-defaults';
import { EmailComponent } from '@feature/email';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ScrollAnimateDirective,
    CmsFieldDirective,
    EmailComponent,
  ],
  templateUrl: './index.html',
})
export class ContactMePage {
  readonly channels = CONTACT_DEFAULTS.channels;
  readonly openTo = CONTACT_DEFAULTS.openTo;
}
