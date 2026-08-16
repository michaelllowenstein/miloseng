import { inject }          from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take }       from 'rxjs/operators';
import { AuthService }     from '../services/auth';

export const authGuard: CanActivateFn = (_route: any, _state: any) => {
  const auth: AuthService   = inject(AuthService);
  const router: Router = inject(Router);

  return auth.isAuthenticated$.pipe(
    take(1),
    map((authenticated: any) => {
      if (authenticated) return true;
      return router.createUrlTree(['/login']);
    }),
  );
};