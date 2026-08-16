import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';

const ERROR_MAP: Record<string, string> = {
  'auth/invalid-credential':     'Invalid email or password.',
  'auth/user-not-found':         'No account found with that email.',
  'auth/wrong-password':         'Incorrect password.',
  'auth/too-many-requests':      'Too many attempts. Try again later.',
  'auth/user-disabled':          'This account has been disabled.',
  'auth/network-request-failed': 'Network error. Check your connection.',
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './index.html',
  styles: [],
})
export class LoginPage {
  private auth: AuthService   = inject(AuthService);
  private router: Router = inject(Router);
  private fb: FormBuilder     = inject(FormBuilder);

  readonly loading   = signal(false);
  readonly authError = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  showErr(f: string): boolean {
    const c = this.form.get(f);
    return !!c && c.invalid && (c.dirty || c.touched);
  }

  signIn(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true); this.authError.set(null);
    const { email, password } = this.form.getRawValue();
    this.auth.login(email, password).subscribe({
      next:  () => this.router.navigate(['/admin']),
      error: (err) => {
        this.authError.set(ERROR_MAP[err?.code ?? ''] ?? 'Sign-in failed.');
        this.loading.set(false);
      },
    });
  }
}