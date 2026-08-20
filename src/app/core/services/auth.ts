import { Injectable, inject, signal, computed } from '@angular/core';
import { Router }                               from '@angular/router';
import { Auth, User,
         signInWithEmailAndPassword,
         signOut, onAuthStateChanged }          from '@angular/fire/auth';
import { Observable, from }                     from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser() {
      throw new Error('Method not implemented.');
  }
  private _auth   = inject(Auth);
  private _router = inject(Router);

  private _user    = signal<User | null>(null);
  private _loading = signal<boolean>(true);

  readonly user            = this._user.asReadonly();
  readonly loading         = this._loading.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);

  // RxJS bridge — used only by the functional guard (take(1) pattern)
  readonly isAuthenticated$ = new Observable<boolean>(observer => {
    return onAuthStateChanged(this._auth, user => {
      this._user.set(user);
      this._loading.set(false);
      observer.next(user !== null);
    });
  });

  constructor() {
    // Bootstrap: sync Firebase state into signals on app init
    onAuthStateChanged(this._auth, user => {
      this._user.set(user);
      this._loading.set(false);
    });
  }

  login(email: string, password: string): Observable<void> {
    return from(
      signInWithEmailAndPassword(this._auth, email, password).then(() => {})
    );
  }

  logout(): Observable<boolean> {
    return from(
      signOut(this._auth).then(() => this._router.navigate(['/login']))
    );
  }

  getIdToken(): Observable<string | null> {
    return new Observable(observer => {
      const user = this._user();
      if (!user) { observer.next(null); observer.complete(); return; }
      user.getIdToken()
        .then(token => { observer.next(token); observer.complete(); })
        .catch(err  => observer.error(err));
    });
  }
}