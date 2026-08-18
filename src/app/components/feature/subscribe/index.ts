import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CmsFieldDirective } from '@directives/cms-field';
import { SUBSCRIBE_DEFAULTS } from '@schema/constants/site-defaults';
import { CmsService } from '@services/cms';

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

  readonly buttonLabel = this.cms.fieldSignal(
    'layout/subscribe',
    'buttonLabel',
    SUBSCRIBE_DEFAULTS.buttonLabel,
    this.destroyRef,
  );

  name = '';
  email = '';
  readonly submitted = signal(false);

  subscribe(): void {
    if (!this.email.trim()) {
      return;
    }

    this.submitted.set(true);
  }
}
