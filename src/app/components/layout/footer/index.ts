import { Component, DestroyRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CmsFieldDirective } from '@directives/cms-field';
import { FOOTER_DEFAULTS } from '@schema/constants/site-defaults';
import { CmsService } from '@services/cms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink,
    CmsFieldDirective,
  ],
  templateUrl: './index.html',
})
export class Footer {
  private readonly cms = inject(CmsService);
  private readonly destroyRef = inject(DestroyRef);

  readonly currentYear = new Date().getFullYear();

  readonly copyrightName = this.cms.fieldSignal(
    'layout/footer',
    'copyrightName',
    FOOTER_DEFAULTS.copyrightName,
    this.destroyRef,
  );

  readonly externalLinks = FOOTER_DEFAULTS.externalLinks;
}
