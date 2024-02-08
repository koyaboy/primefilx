import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const router: Router = inject(Router);
  const auth: AuthService = inject(AuthService);
  const platformId = inject(PLATFORM_ID)

  if (req.url.includes("/refresh-token")) {
    return next(req);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status == 401) {
        return auth.refreshToken()
          .pipe(
            switchMap(() => {
              return next(req)
            }),

            catchError((error: HttpErrorResponse) => {
              if (isPlatformBrowser(platformId)) {
                localStorage?.removeItem("user")
              }
              router.navigate(['/login'])
              return throwError(() => error)
            })
          )
      }

      else {
        return throwError(() => error)
      }
    })
  );
};
