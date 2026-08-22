import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { injectDialogClose } from '@factory/dialog/tokens';
import { AuthService } from '@services/auth';

@Component({
  selector: 'app-auth-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './index.html',
  styles: [],
})
export class AuthDialog {
  private readonly auth: AuthService = inject(AuthService);
  readonly close = injectDialogClose<boolean>();

  email    = '';
  password = '';
  loading  = signal(false);
  error    = signal('');

  authenticate(): void {
    if (!this.email.trim() || !this.password.trim()) return;

    this.loading.set(true);
    this.error.set('');

    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.loading.set(false);
        this.close(true);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Invalid credentials');
      },
    });
  }
}
