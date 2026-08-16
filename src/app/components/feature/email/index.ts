import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './index.html',
})
export class EmailComponent {
  form = { name: '', email: '', subject: '', message: '' };
  submitted = signal(false);

  send(): void {
    if (!this.form.email.trim() || !this.form.message.trim()) return;
    // In production: POST to portfolio-api /contact
    this.submitted.set(true);
  }
}