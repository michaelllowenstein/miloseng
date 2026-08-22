import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EnvService } from '@services/env';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './index.html',
})
export class EmailComponent {
  private readonly env = inject(EnvService);

  form = { name: '', email: '', subject: '', message: '' };
  submitted = signal(false);

  /** Show "Fill Test Data" only in non-production environments */
  readonly showTestFill = !this.env.production;

  fillTestData(): void {
    this.form.name = 'Michael Lowenstein';
    this.form.email = 'michael@lowenstein.ca';
    this.form.subject = 'Test inquiry';
    this.form.message = 'This is a test message from the dev environment.';
  }

  send(): void {
    if (!this.form.email.trim() || !this.form.message.trim()) return;
    // In production: POST to portfolio-api /contact
    this.submitted.set(true);
  }
}
