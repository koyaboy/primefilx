import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


export const authGuard: CanActivateFn = (route, state) => {
  const auth: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const userData = localStorage.getItem("user");

    if (userData) return true;
    else {
      router.navigate(['/login']);
      return false;
    }
  }

  else return false;
};
