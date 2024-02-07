import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth: AuthService = inject(AuthService)
  const router: Router = inject(Router)

  return auth.isAuthenticated().pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        router.navigate(['/'])
        return true
      }
      else {
        router.navigate(['/login'])
        return false
      }
    })
  )
};
