import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './index.html',
})
export class SubscribeComponent {
  name = '';
  email = '';
  submitted = signal(false);

  subscribe(): void {
    if (!this.email.trim()) return;
    // In production: POST to newsletter-api
    this.submitted.set(true);
  }
}