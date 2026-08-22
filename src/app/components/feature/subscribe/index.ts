import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CmsFieldDirective } from '@directives/cms-field';
import { SUBSCRIBE_DEFAULTS } from '@schema/constants/site-defaults';
import { CmsService } from '@services/cms';
import { EnvService } from '@services/env';

@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [
    FormsModule,
    CmsFieldDirective,
  ],
  templateUrl: './index.html',
})
export class SubscribeComponent {
  private readonly cms = inject(CmsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly env = inject(EnvService);

  readonly buttonLabel = this.cms.fieldSignal(
    'layout/subscribe',
    'buttonLabel',
    SUBSCRIBE_DEFAULTS.buttonLabel,
    this.destroyRef,
  );

  /** Show "Fill Test Data" only in non-production environments */
  readonly showTestFill = !this.env.production;

  name = '';
  email = '';
  readonly submitted = signal(false);

  fillTestData(): void {
    this.name = 'Michael Lowenstein';
    this.email = 'michael@lowenstein.ca';
  }

  subscribe(): void {
    if (!this.email.trim()) {
      return;
    }

    this.submitted.set(true);
  }
}
